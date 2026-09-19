const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
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
        "Practice answer subscription check failed:",
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
    // REQUEST BODY
    // ---------------------------------------------

    let body = {};

    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid request body."
        })
      };
    }

    const questionId = body.question_id;
    const selectedAnswer = body.selected_answer;

    if (
      questionId === undefined ||
      questionId === null ||
      selectedAnswer === undefined ||
      selectedAnswer === null
    ) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Question ID and selected answer are required."
        })
      };
    }

    // ---------------------------------------------
    // GET THE REAL ANSWER FROM DATABASE
    // ---------------------------------------------

    const {
      data: question,
      error: questionError
    } = await supabase
      .from("exam_vault_questions")
      .select(`
        id,
        subject,
        topic,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        explanation
      `)
      .eq("id", questionId)
      .eq("status", "approved")
      .maybeSingle();

    if (questionError) {
      console.error(
        "Practice answer question lookup failed:",
        questionError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Unable to validate the answer."
        })
      };
    }

    if (!question) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Question not found."
        })
      };
    }

    // ---------------------------------------------
    // NORMALIZE ANSWERS
    // ---------------------------------------------

    const normalize = value =>
      String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/^option\s*/i, "")
        .replace(/^[a-d][.)\-:]\s*/i, "")
        .replace(/\s+/g, " ");

    const letters = ["a", "b", "c", "d"];

    const options = [
      question.option_a,
      question.option_b,
      question.option_c,
      question.option_d
    ];

    let selected =
      normalize(selectedAnswer);

    let correct =
      normalize(question.correct_answer);

    // Numeric answers: 0,1,2,3
    if (/^[0-3]$/.test(selected)) {
      selected =
        letters[Number(selected)];
    }

    if (/^[0-3]$/.test(correct)) {
      correct =
        letters[Number(correct)];
    }

    // If correct_answer is full option text,
    // convert it to A/B/C/D.
    if (!/^[a-d]$/.test(correct)) {

      const matchedIndex =
        options.findIndex(
          option =>
            normalize(option) === correct
        );

      if (matchedIndex >= 0) {
        correct =
          letters[matchedIndex];
      }
    }

    const isCorrect =
      selected === correct;

    const correctIndex =
      letters.indexOf(correct);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,

        correct: isCorrect,

        selectedAnswer:
          selected,

        correctAnswer:
          correct.toUpperCase(),

        correctAnswerText:
          correctIndex >= 0
            ? options[correctIndex]
            : question.correct_answer,

        explanation:
          question.explanation ||
          "No explanation has been added yet.",

        subject:
          question.subject ||
          "Nursing",

        topic:
          question.topic ||
          null
      })
    };

  } catch (error) {

    console.error(
      "Submit practice answer error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error:
          "Unable to validate the answer."
      })
    };
  }
};
