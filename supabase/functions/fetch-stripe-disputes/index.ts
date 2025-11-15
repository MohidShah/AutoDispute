import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { stripeConnectionId } = await req.json();

    if (!stripeConnectionId) {
      return new Response(
        JSON.stringify({ error: "Missing stripeConnectionId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { data: connection, error: connError } = await supabase
      .from("stripe_connections")
      .select("*")
      .eq("id", stripeConnectionId)
      .single();

    if (connError || !connection) {
      throw new Error("Stripe connection not found");
    }

    const stripeUrl = "https://api.stripe.com/v1/disputes";
    const params = new URLSearchParams({
      limit: "100",
    });

    const response = await fetch(`${stripeUrl}?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${connection.stripe_access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Stripe API error: ${response.statusText}`);
    }

    const disputes = await response.json();

    for (const dispute of disputes.data || []) {
      const { error: upsertError } = await supabase
        .from("disputes_stripe")
        .upsert(
          {
            user_id: connection.user_id,
            stripe_connection_id: stripeConnectionId,
            stripe_dispute_id: dispute.id,
            charge_id: dispute.charge || "",
            amount: dispute.amount / 100,
            currency: dispute.currency.toUpperCase(),
            reason: dispute.reason,
            status: mapDisputeStatus(dispute.status),
            evidence_due_at: dispute.evidence_details?.due_by
              ? new Date(dispute.evidence_details.due_by * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "stripe_connection_id,stripe_dispute_id",
          }
        );

      if (upsertError) {
        console.error("Upsert error:", upsertError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: disputes.data?.length || 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function mapDisputeStatus(stripeStatus: string): string {
  const statusMap: { [key: string]: string } = {
    warning_under_review: "warning_under_review",
    warning_closed: "warning_closed",
    under_review: "under_review",
    charge_refunded: "charge_refunded",
    won: "won",
    lost: "lost",
    warning_needs_response: "warning_needs_response",
  };
  return statusMap[stripeStatus] || "under_review";
}
