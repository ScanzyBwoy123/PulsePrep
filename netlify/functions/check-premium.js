const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  try {

    /*
     * Only GET requests are allowed.
     */
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

    /*
     * ---------------------------------------------------------
     * GET ACCESS TOKEN
     * ---------------------------------------------------------
     */
    const authHeader =
      event.headers?.authorization ||
      event.headers?.Authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
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

    const accessToken =
      authHeader.substring(7).trim();

    if (!accessToken) {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Missing access token"
        })
      };
    }

    /*
     * ---------------------------------------------------------
     * SUPABASE CONFIGURATION
     * ---------------------------------------------------------
     *
     * Use the existing PulsePrep Supabase project.
     *
     * SUPABASE_URL is supported if it exists.
     * The fallback keeps this function tied to the
     * existing PulsePrep project.
     */
    const supabaseUrl =
      process.env.SUPABASE_URL ||
      "https://eskwphjtiogguhvtktmh.supabase.co";

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {

      console.error(
        "CHECK PREMIUM: SUPABASE_SERVICE_ROLE_KEY is missing."
      );

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error:
            "Premium verification is not configured correctly."
        })
      };
    }

    /*
     * ---------------------------------------------------------
     * ADMIN SUPABASE CLIENT
     * ---------------------------------------------------------
     */
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

    /*
     * ---------------------------------------------------------
     * VERIFY LOGGED-IN USER
     * ---------------------------------------------------------
     */
    const {
      data: userData,
      error: userError
    } =
      await supabaseAdmin.auth.getUser(
        accessToken
      );

    if (userError || !userData?.user) {

      console.error(
        "CHECK PREMIUM USER ERROR:",
        userError
      );

      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error:
            "Invalid or expired login session."
        })
      };
    }

    const user =
      userData.user;

    const email =
      user.email
        ?.trim()
        .toLowerCase();

    if (!email) {

      return {
        statusCode: 403,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error:
            "Your account does not have an email address."
        })
      };
    }

    /*
     * ---------------------------------------------------------
     * CHECK PREMIUM SUBSCRIPTION
     * ---------------------------------------------------------
     *
     * A successful subscription for the logged-in
     * student's email gives Premium access.
     */
    const {
      data: subscriptions,
      error: subscriptionError
    } =
      await supabaseAdmin
        .from("subscriptions")
        .select(
          "email, reference, amount, status, plan, paid_at"
        )
        .eq("email", email)
        .eq("status", "success")
        .order("paid_at", {
          ascending: false
        })
        .limit(1);

    if (subscriptionError) {

      console.error(
        "CHECK PREMIUM SUBSCRIPTION ERROR:",
        subscriptionError
      );

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error:
            "Unable to check your Premium subscription.",
          details:
            subscriptionError.message
        })
      };
    }

    const subscription =
      subscriptions?.[0] || null;

    const premium =
      subscription !== null;

    /*
     * ---------------------------------------------------------
     * RETURN PREMIUM STATUS
     * ---------------------------------------------------------
     */
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        authenticated: true,
        premium: premium,
        email: email,
        plan:
          subscription?.plan || null,
        paidAt:
          subscription?.paid_at || null
      })
    };

  } catch (error) {

    console.error(
      "CHECK PREMIUM CRASH:",
      error
    );

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error:
          "Internal Premium verification error.",
        details:
          error?.message || "Unknown error"
      })
    };
  }
};
