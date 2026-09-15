// ============================================================
// PULSEPREP — SECURE CLASS DISCUSSION POSTS
// ============================================================
// Only authenticated Premium students can retrieve
// Class Discussion posts.
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
        success: false,
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
        "Missing SUPABASE_SERVICE_ROLE_KEY."
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Server configuration error."
        })
      };
    }

    // ========================================================
    // SERVER-SIDE SUPABASE CLIENT
    // ========================================================

    const supabase =
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
    // AUTHORIZATION HEADER
    // ========================================================

    const authHeader =
      event.headers?.authorization ||
      event.headers?.Authorization;

    if (!authHeader) {

      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Authentication required."
        })
      };
    }

    // ========================================================
    // EXTRACT TOKEN
    // ========================================================

    const token =
      authHeader
        .replace(/^Bearer\s+/i, "")
        .trim();

    if (!token) {

      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid authentication token."
        })
      };
    }

    // ========================================================
    // VERIFY USER
    // ========================================================

    const {
      data: { user },
      error: userError
    } =
      await supabase.auth.getUser(token);

    if (userError || !user) {

      console.error(
        "Discussion user authentication failed:",
        userError
      );

      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid or expired session."
        })
      };
    }

    // ========================================================
    // CHECK EMAIL
    // ========================================================

    const email =
      user.email?.trim().toLowerCase();

    if (!email) {

      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: "No account email found."
        })
      };
    }

    // ========================================================
    // CHECK PREMIUM SUBSCRIPTION
    // ========================================================

    const {
  data: subscriptions,
  error: subscriptionError
} =
  await supabase
    .from("subscriptions")
    .select(
  "email, reference, amount, status, paid_at"
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

if (subscriptionError) {

  console.error(
    "Discussion subscription check failed:",
    subscriptionError
  );

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      success: false,
      error: "Unable to verify Premium access.",
details: subscriptionError?.message || "Unknown subscription database error"
    })
  };
}

const subscription =
  Array.isArray(subscriptions) &&
  subscriptions.length > 0
    ? subscriptions[0]
    : null;
    // ========================================================
    // PREMIUM REQUIRED
    // ========================================================

    if (!subscription) {

      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Premium subscription required.",
          premiumRequired: true
        })
      };
    }

    // ========================================================
    // LOAD DISCUSSION POSTS
    // ========================================================

    const {
      data: posts,
      error: postsError
    } =
      await supabase
        .from("discussion_posts")
        .select("*")
        .or(
          "is_hidden.eq.false,is_hidden.is.null"
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );

    if (postsError) {

      console.error(
        "Discussion posts retrieval failed:",
        postsError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Unable to load Class Discussions."
        })
      };
    }

    // ========================================================
    // SUCCESS
    // ========================================================

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        premium: true,
        email: email,
        plan: subscription.plan || null,
        count: Array.isArray(posts)
          ? posts.length
          : 0,
        posts: Array.isArray(posts)
          ? posts
          : []
      })
    };

  } catch (error) {

    console.error(
      "Discussion unexpected error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "An unexpected server error occurred."
      })
    };
  }
};
