// ============================================================
// PULSEPREP — CLASS DISCUSSIONS PREMIUM CHECK
// ============================================================

const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  // ==========================================================
  // OPTIONS
  // ==========================================================

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }

  // ==========================================================
  // ONLY GET
  // ==========================================================

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        authenticated: false,
        premium: false,
        error: "Method not allowed."
      })
    };
  }

  try {

    // ========================================================
    // SUPABASE CONFIGURATION
    // ========================================================

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
        headers,
        body: JSON.stringify({
          authenticated: false,
          premium: false,
          error:
            "Premium verification is not configured correctly."
        })
      };
    }

    // ========================================================
    // CREATE ADMIN SUPABASE CLIENT
    // ========================================================

    const supabaseAdmin =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

    // ========================================================
    // GET AUTHORIZATION HEADER
    // ========================================================

    const authHeader =
      event.headers?.authorization ||
      event.headers?.Authorization;

    if (!authHeader) {

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          authenticated: false,
          premium: false,
          email: null,
          plan: null,
          paidAt: null
        })
      };
    }

    // ========================================================
    // EXTRACT TOKEN
    // ========================================================

    const accessToken =
      authHeader
        .replace(/^Bearer\s+/i, "")
        .trim();

    if (!accessToken) {

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          authenticated: false,
          premium: false,
          email: null,
          plan: null,
          paidAt: null
        })
      };
    }

    // ========================================================
    // VERIFY USER
    // ========================================================

    const {
      data: userData,
      error: userError
    } =
      await supabaseAdmin.auth.getUser(
        accessToken
      );

    if (
      userError ||
      !userData?.user
    ) {

      console.error(
        "CHECK PREMIUM USER ERROR:",
        userError
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          authenticated: false,
          premium: false,
          email: null,
          plan: null,
          paidAt: null
        })
      };
    }

    // ========================================================
    // USER EMAIL
    // ========================================================

    const email =
      userData.user.email
        ?.trim()
        .toLowerCase();

    if (!email) {

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          authenticated: true,
          premium: false,
          email: null,
          plan: null,
          paidAt: null
        })
      };
    }

    console.log(
      "CHECK PREMIUM FOR:",
      email
    );

    // ========================================================
    // CHECK SUBSCRIPTION
    // ========================================================

    /*
     * We use ilike instead of eq for the email so that
     * uppercase/lowercase differences cannot prevent
     * a genuine Premium student from being recognized.
     */

    const {
      data: subscriptions,
      error: subscriptionError
    } =
      await supabaseAdmin
        .from("subscriptions")
        .select(
         "email, reference, amount, status, plan, paid_at, expires_at"
        )
        .ilike(
          "email",
          email
        )
        .eq(
          "status",
          "success"
        )
        .order(
          "paid_at",
          {
            ascending: false
          }
        )
        .limit(1);

    // ========================================================
    // DATABASE ERROR
    // ========================================================

    if (subscriptionError) {

      console.error(
        "CHECK PREMIUM SUBSCRIPTION ERROR:",
        subscriptionError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          authenticated: true,
          premium: false,
          email: email,
          plan: null,
          paidAt: null,
          error:
            "Unable to check your Premium subscription.",
          details:
            subscriptionError.message
        })
      };
    }

    // ========================================================
    // FIND SUBSCRIPTION
    // ========================================================

    const subscription =
      Array.isArray(subscriptions) &&
      subscriptions.length > 0
        ? subscriptions[0]
        : null;

    // ========================================================
    // PREMIUM RESULT
    // ========================================================

    const expiresAt =
  subscription?.expires_at
    ? new Date(subscription.expires_at)
    : null;

const premium =
  subscription !== null &&
  expiresAt !== null &&
  !Number.isNaN(expiresAt.getTime()) &&
  expiresAt > new Date();

    console.log(
      "CHECK PREMIUM RESULT:",
      {
        email: email,
        premium: premium,
        plan: subscription?.plan || null
      }
    );

    // ========================================================
    // RETURN RESULT
    // ========================================================

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({

        authenticated: true,

        premium: premium,

        email: email,

       plan:
  subscription?.plan ||
  null,

paidAt:
  subscription?.paid_at ||
  null,

expiresAt:
  subscription?.expires_at ||
  null 

      })
    };

  } catch (error) {

    console.error(
      "CHECK PREMIUM CRASH:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        authenticated: false,
        premium: false,
        error:
          "Internal Premium verification error.",
        details:
          error?.message ||
          "Unknown error"
      })
    };
  }
};
