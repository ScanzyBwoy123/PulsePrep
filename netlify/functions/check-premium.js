const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const authHeader =
      event.headers.authorization ||
      event.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Authentication required"
        })
      };
    }

    const accessToken = authHeader.substring(7);

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables");

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
        })
      };
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const {
      data: { user },
      error: userError
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      console.error("USER VERIFICATION ERROR:", userError);

      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Invalid or expired session",
          details: userError?.message || "No user returned"
        })
      };
    }

    const email = user.email?.trim().toLowerCase();

    if (!email) {
      return {
        statusCode: 403,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Account email not available"
        })
      };
    }

    const {
      data: subscription,
      error: subscriptionError
    } = await supabaseAdmin
      .from("subscriptions")
      .select(
        "email, reference, amount, status, plan, paid_at"
      )
      .eq("email", email)
      .eq("status", "success")
      .order("paid_at", {
        ascending: false
      })
      .limit(1)
      .maybeSingle();

    if (subscriptionError) {
      console.error(
        "SUBSCRIPTION ERROR:",
        subscriptionError
      );

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Subscription lookup failed",
          details: subscriptionError.message
        })
      };
    }

    const premium = !!subscription;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        authenticated: true,
        premium,
        email,
        plan: subscription?.plan || null,
        paidAt: subscription?.paid_at || null
      })
    };

  } catch (error) {
    console.error("CHECK PREMIUM CRASH:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Internal server error",
        details: error.message
      })
    };
  }
};
