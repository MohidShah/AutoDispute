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
    const { userId, email, type, title, message, disputeId } = await req.json();

    if (!userId || !email || !type || !title || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
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

    const { error: dbError } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type,
        title,
        message,
        dispute_id: disputeId || null,
      });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const senderEmail = "noreply@autodispute.io";

    if (resendApiKey) {
      const emailBody = getEmailTemplate(type, title, message, disputeId);

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: senderEmail,
          to: email,
          subject: title,
          html: emailBody,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email send error:", await emailResponse.text());
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification sent",
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

function getEmailTemplate(type: string, title: string, message: string, disputeId?: string): string {
  const baseUrl = Deno.env.get("VITE_APP_URL") || "https://autodispute.io";
  const actionUrl = disputeId ? `${baseUrl}/dashboard/dispute/${disputeId}` : baseUrl;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3366FF 0%, #00d4ff 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #3366FF; color: white; text-decoration: none; border-radius: 6px; }
          .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AutoDispute Notification</h1>
          </div>
          <div class="content">
            <h2>${title}</h2>
            <p>${message}</p>
            <a href="${actionUrl}" class="button">View Details</a>
          </div>
          <div class="footer">
            <p>© 2025 AutoDispute. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
