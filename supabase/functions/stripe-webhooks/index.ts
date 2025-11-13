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
    const signature = req.headers.get("Stripe-Signature") || "";
    const body = await req.text();
    const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!secret) {
      throw new Error("Stripe webhook secret not configured");
    }

    const isValidSignature = await verifyStripeSignature(body, signature, secret);
    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const event = JSON.parse(body);
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    switch (event.type) {
      case "charge.dispute.created":
        await handleDisputeCreated(event.data.object, supabase);
        break;
      case "charge.dispute.updated":
        await handleDisputeUpdated(event.data.object, supabase);
        break;
      case "charge.dispute.closed":
        await handleDisputeClosed(event.data.object, supabase);
        break;
    }

    return new Response(
      JSON.stringify({ success: true }),
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

async function verifyStripeSignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const timestamp = signature.split(",")[0].split("t=")[1];
  const signed_content = `${timestamp}.${body}`;

  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signed_content)
  );
  const computed_sig = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const signatures = signature.split(",");
  for (const s of signatures) {
    if (s.includes(`v1=${computed_sig}`)) {
      return true;
    }
  }

  return false;
}

async function handleDisputeCreated(dispute: any, supabase: any): Promise<void> {
  const { error } = await supabase.from("disputes_stripe").insert({
    stripe_dispute_id: dispute.id,
    charge_id: dispute.charge,
    amount: dispute.amount / 100,
    currency: dispute.currency.toUpperCase(),
    reason: dispute.reason,
    status: mapDisputeStatus(dispute.status),
    evidence_due_at: dispute.evidence_details?.due_by
      ? new Date(dispute.evidence_details.due_by * 1000).toISOString()
      : null,
  });

  if (error) {
    console.error("Error creating dispute:", error);
  }
}

async function handleDisputeUpdated(dispute: any, supabase: any): Promise<void> {
  const { error } = await supabase
    .from("disputes_stripe")
    .update({
      status: mapDisputeStatus(dispute.status),
      evidence_submitted_at: dispute.evidence_details?.submission_count
        ? new Date().toISOString()
        : null,
    })
    .eq("stripe_dispute_id", dispute.id);

  if (error) {
    console.error("Error updating dispute:", error);
  }
}

async function handleDisputeClosed(dispute: any, supabase: any): Promise<void> {
  const finalStatus = dispute.status === "won" ? "won" : "lost";

  const { error } = await supabase
    .from("disputes_stripe")
    .update({
      status: finalStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_dispute_id", dispute.id);

  if (error) {
    console.error("Error closing dispute:", error);
  }
}

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
