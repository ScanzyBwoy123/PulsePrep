// ============================================================
// PULSEPREP — SECURE EXAM VAULT QUESTIONS
// ============================================================
// Authenticated PREMIUM students can retrieve approved
// Exam Vault questions.
//
// Supports pagination so more than 100 approved questions
// can be loaded safely.
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
        success: false,
        error: "Method not allowed."
      })
    };
  }

  try {
    // --------------------------------------------------------
    // ENVIRONMENT VARIABLES
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
          success: false,
          error: "Server configuration error."
        })
      };
    }

    // --------------------------------------------------------
    // SERVER-SIDE SUPABASE CLIENT
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
    // AUTHORIZATION HEADER
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // EXTRACT BEARER TOKEN
    // --------------------------------------------------------

    const token = authHeader
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

    // --------------------------------------------------------
    // VERIFY USER
    // --------------------------------------------------------

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error(
        "User authentication failed:",
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

    // --------------------------------------------------------
    // CHECK USER EMAIL
    // --------------------------------------------------------

    const email = user.email;

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

    // --------------------------------------------------------
    // CHECK PREMIUM SUBSCRIPTION
    // --------------------------------------------------------

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
          success: false,
          error: "Unable to verify premium access."
        })
      };
    }

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

    // --------------------------------------------------------
    // QUERY PARAMETERS
    // --------------------------------------------------------

    const params =
      event.queryStringParameters || {};

    const subject =
      params.subject?.trim() || null;

    const topic =
      params.topic?.trim() || null;

    // --------------------------------------------------------
    // PAGINATION
    // --------------------------------------------------------
    //
    // page=1, page=2, page=3...
    //
    // limit can be up to 100 per request.
    //
    // This allows the frontend to retrieve:
    // 202 questions
    // 500 questions
    // 1000 questions
    // etc.
    // --------------------------------------------------------

    let page =
      parseInt(params.page || "1", 10);

    let limit =
      parseInt(params.limit || "100", 10);

    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    if (
      Number.isNaN(limit) ||
      limit < 1
    ) {
      limit = 100;
    }

    // Never allow more than 100 questions
    // in one database request.
    limit = Math.min(limit, 100);

    const from =
      (page - 1) * limit;

    const to =
      from + limit - 1;

    // --------------------------------------------------------
    // BUILD QUERY
    // --------------------------------------------------------

    let query = supabase
      .from("exam_vault_questions")
      .select(
        `
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
        `,
        {
          count: "exact"
        }
      )
      .eq("status", "approved")
      .order("id", {
        ascending: true
      })
      .range(from, to);

    // --------------------------------------------------------
    // SUBJECT FILTER
    // --------------------------------------------------------

    if (subject) {
      query = query.eq(
        "subject",
        subject
      );
    }

    // --------------------------------------------------------
    // TOPIC FILTER
    // --------------------------------------------------------

    if (topic) {
      query = query.eq(
        "topic",
        topic
      );
    }

    // --------------------------------------------------------
    // FETCH QUESTIONS
    // --------------------------------------------------------

    const {
      data: questions,
      error: questionsError,
      count
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
          success: false,
          error:
            "Unable to load Exam Vault questions."
        })
      };
    }

    // --------------------------------------------------------
    // PAGINATION INFORMATION
    // --------------------------------------------------------

    const total =
      typeof count === "number"
        ? count
        : questions?.length || 0;

    const totalPages =
      Math.max(
        1,
        Math.ceil(total / limit)
      );

    const currentQuestions =
      Array.isArray(questions)
        ? questions
        : [];

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        premium: true,

        count: currentQuestions.length,

        total: total,

        page: page,

        limit: limit,

        totalPages: totalPages,

        hasNextPage:
          page < totalPages,

        hasPreviousPage:
          page > 1,

        questions:
          currentQuestions
      })
    };

  } catch (error) {
    console.error(
      "Exam Vault unexpected error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error:
          "An unexpected server error occurred."
      })
    };
  }
};
