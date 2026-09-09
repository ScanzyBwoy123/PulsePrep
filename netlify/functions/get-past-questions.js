const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Method not allowed"
      })
    };
  }

  try {
    const authHeader =
      event.headers.authorization ||
      event.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "You must be logged in."
        })
      };
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verify the logged-in user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Invalid or expired login session."
        })
      };
    }

    // Check whether the user has an active premium subscription
    const { data: subscriptions, error: subscriptionError } =
      await supabase
        .from("subscriptions")
        .select("email,status")
        .eq("email", user.email)
        .eq("status", "success")
        .limit(1);

    if (subscriptionError) {
      console.error(subscriptionError);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Unable to verify premium access."
        })
      };
    }

    if (!subscriptions || subscriptions.length === 0) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "Premium access required."
        })
      };
    }

    // Only approved past questions are returned
    const { data: questions, error: questionsError } =
      await supabase
        .from("past_question_submissions")
        .select(`
          id,
          school,
          programme,
          level,
          subject,
          question_type,
          academic_year,
          semester,
          exam_type,
          file_name,
          additional_information,
          created_at
        `)
        .eq("status", "approved")
        .order("created_at", {
          ascending: false
        });

    if (questionsError) {
      console.error(questionsError);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Unable to load past questions."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        success: true,
        questions: questions || []
      })
    };

  } catch (error) {
    console.error("get-past-questions error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error while loading questions."
      })
    };
  }
};
