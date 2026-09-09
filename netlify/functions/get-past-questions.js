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

    const accessToken = authHeader
      .substring(7)
      .trim();

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verify logged-in user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      console.error(
        "USER VERIFICATION ERROR:",
        userError
      );

      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Invalid or expired login session."
        })
      };
    }

    // Normalize email exactly like the working Premium system
    const email = user.email?.trim().toLowerCase();

    if (!email) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "Account email not available."
        })
      };
    }

    // Use the same simple subscription lookup
    // used by the original working Question/Premium system.
    const {
      data: subscriptions,
      error: subscriptionError
    } = await supabase
      .from("subscriptions")
      .select("email,status")
      .eq("email", email)
      .eq("status", "success")
      .limit(1);

    if (subscriptionError) {
      console.error(
        "SUBSCRIPTION ERROR:",
        subscriptionError
      );

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

    // Only approved past questions are returned.
    const {
      data: questions,
      error: questionsError
    } = await supabase
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
      console.error(
        "QUESTIONS ERROR:",
        questionsError
      );

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
        premium: true,
        questions: questions || []
      })
    };

  } catch (error) {

    console.error(
      "get-past-questions error:",
      error
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error while loading questions."
      })
    };

  }

};
