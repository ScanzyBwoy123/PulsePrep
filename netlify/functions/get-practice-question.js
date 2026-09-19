const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

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
    const supabaseUrl =
      process.env.SUPABASE_URL ||
      "https://eskwphjtiogguhvtktmh.supabase.co";

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Server configuration error."
        })
      };
    }

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

    const authHeader =
      event.headers?.authorization ||
      event.headers?.Authorization;

    const token = (authHeader || "")
      .replace(/^Bearer\s+/i, "")
      .trim();

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Authentication required."
        })
      };
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(token);

    if (userError || !user?.email) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid or expired session."
        })
      };
    }

    // ---------------------------------------------
    // PREMIUM CHECK
    // ---------------------------------------------

    const {
      data: subscription,
      error: subscriptionError
    } = await supabase
      .from("subscriptions")
      .select("email, status, paid_at")
      .eq("email", user.email)
      .eq("status", "success")
      .order("paid_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (subscriptionError) {
      console.error(
        "Practice subscription check failed:",
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

    // ---------------------------------------------
    // OPTIONAL FILTERS
    // ---------------------------------------------

    const params =
      event.queryStringParameters || {};

    const subject =
      params.subject?.trim() || null;

    const topic =
      params.topic?.trim() || null;

    // ---------------------------------------------
    // COUNT APPROVED QUESTIONS
    // ---------------------------------------------

    let countQuery = supabase
      .from("exam_vault_questions")
      .select("id", {
        count: "exact",
        head: true
      })
      .eq("status", "approved");

    if (subject) {
      countQuery = countQuery.eq(
        "subject",
        subject
      );
    }

    if (topic) {
      countQuery = countQuery.eq(
        "topic",
        topic
      );
    }

    const {
      count,
      error: countError
    } = await countQuery;

    if (countError) {
      console.error(
        "Practice question count failed:",
        countError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Unable to load practice questions."
        })
      };
    }

    if (!count) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "No approved practice questions are available."
        })
      };
    }

    // ---------------------------------------------
    // RANDOM QUESTION
    // ---------------------------------------------

    const randomOffset =
      Math.floor(Math.random() * count);

    let questionQuery = supabase
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
        difficulty
      `)
      .eq("status", "approved")
      .order("id", {
        ascending: true
      })
      .range(
        randomOffset,
        randomOffset
      );

    if (subject) {
      questionQuery =
        questionQuery.eq(
          "subject",
          subject
        );
    }

    if (topic) {
      questionQuery =
        questionQuery.eq(
          "topic",
          topic
        );
    }

    const {
      data: questions,
      error: questionError
    } = await questionQuery;

    if (
      questionError ||
      !questions?.length
    ) {
      console.error(
        "Practice question retrieval failed:",
        questionError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Unable to retrieve a practice question."
        })
      };
    }

    const q = questions[0];

    // IMPORTANT:
    // correct_answer and explanation are NOT
    // returned here.

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,

        question: {
          id: q.id,
          subject: q.subject,
          topic: q.topic,
          question: q.question,

          options: [
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d
          ],

          difficulty:
            q.difficulty || null
        }
      })
    };

  } catch (error) {
    console.error(
      "Get practice question error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error:
          "Unable to load practice question."
      })
    };
  }
};
