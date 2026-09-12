// ============================================================
// PULSEPREP — SECURE EXAM VAULT QUESTIONS
// ============================================================
// Only authenticated PREMIUM students can retrieve
// approved Exam Vault OBJ questions.
//
// File:
// netlify/functions/get-exam-vault-questions.js
// ============================================================

const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  // ----------------------------------------------------------
  // CORS
  // ----------------------------------------------------------

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };

  // ----------------------------------------------------------
  // OPTIONS REQUEST
  // ----------------------------------------------------------

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }

  // ----------------------------------------------------------
  // ONLY GET REQUESTS
  // ----------------------------------------------------------

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: "Method not allowed."
      })
    };
  }

  try {
    // --------------------------------------------------------
    // CHECK ENVIRONMENT VARIABLES
    // --------------------------------------------------------

    const supabaseUrl =
  process.env.SUPABASE_URL ||
  "https://eskwphjtiogguhvtktmh.supabase.co";

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY environment variable."
  );

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      error: "Server configuration error."
    })
  };
}
      console.error(
        "Missing Supabase environment variables."
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server configuration error."
        })
      };
    }

    // --------------------------------------------------------
    // CREATE SERVER-SIDE SUPABASE CLIENT
    // --------------------------------------------------------

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // --------------------------------------------------------
    // GET AUTHORIZATION HEADER
    // --------------------------------------------------------

    const authHeader =
      event.headers.authorization ||
      event.headers.Authorization;

    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: "Authentication required."
        })
      };
    }

    // --------------------------------------------------------
    // EXTRACT BEARER TOKEN
    // --------------------------------------------------------

    const token = authHeader.replace(
      /^Bearer\s+/i,
      ""
    ).trim();

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: "Invalid authentication token."
        })
      };
    }

    // --------------------------------------------------------
    // VERIFY USER WITH SUPABASE
    // --------------------------------------------------------

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: "Invalid or expired session."
        })
      };
    }

    // --------------------------------------------------------
    // CHECK PREMIUM SUBSCRIPTION
    // --------------------------------------------------------
    //
    // We use the user's authenticated email to check the
    // existing subscriptions table.
    //
    // IMPORTANT:
    // This does NOT trust the browser to tell us whether
    // the student is premium.
    // --------------------------------------------------------

    const email = user.email;

    if (!email) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: "No account email found."
        })
      };
    }

    const {
      data: subscription,
      error: subscriptionError
    } = await supabase
      .from("subscriptions")
      .select("email, status, paid_at")
      .eq("email", email)
      .eq("status", "success")
      .order("paid_at", {
        ascending: false
      })
      .limit(1)
      .maybeSingle();

    if (subscriptionError) {
      console.error(
        "Subscription check failed:",
        subscriptionError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Unable to verify premium access."
        })
      };
    }

    if (!subscription) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: "Premium subscription required.",
          premiumRequired: true
        })
      };
    }

    // --------------------------------------------------------
    // READ QUERY PARAMETERS
    // --------------------------------------------------------

    const params = event.queryStringParameters || {};

    const subject = params.subject || null;
    const topic = params.topic || null;

    let limit = parseInt(params.limit || "20", 10);

    // Prevent somebody from requesting an unlimited amount
    // of questions in one request.
    if (Number.isNaN(limit)) {
      limit = 20;
    }

    limit = Math.min(
      Math.max(limit, 1),
      100
    );

    // --------------------------------------------------------
    // BUILD QUESTION QUERY
    // --------------------------------------------------------

    let query = supabase
      .from("exam_vault_questions")
      .select(`
        id,
        subject,
        topic,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        explanation,
        difficulty,
        source,
        school,
        academic_year
      `)
      .eq("status", "approved")
      .limit(limit);

    // --------------------------------------------------------
    // OPTIONAL SUBJECT FILTER
    // --------------------------------------------------------

    if (subject) {
      query = query.eq("subject", subject);
    }

    // --------------------------------------------------------
    // OPTIONAL TOPIC FILTER
    // --------------------------------------------------------

    if (topic) {
      query = query.eq("topic", topic);
    }

    // --------------------------------------------------------
    // FETCH APPROVED QUESTIONS
    // --------------------------------------------------------

    const {
      data: questions,
      error: questionsError
    } = await query;

    if (questionsError) {
      console.error(
        "Question retrieval failed:",
        questionsError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Unable to load Exam Vault questions."
        })
      };
    }

    // --------------------------------------------------------
    // RETURN QUESTIONS
    // --------------------------------------------------------

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        premium: true,
        count: questions.length,
        questions
      })
    };

  } catch (error) {
    console.error(
      "Exam Vault error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "An unexpected server error occurred."
      })
    };
  }
};
