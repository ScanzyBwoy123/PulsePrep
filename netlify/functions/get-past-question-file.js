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

    // Verify premium subscription
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

    // Get the requested question ID
    const questionId =
      event.queryStringParameters?.id;

    if (!questionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Question ID is required."
        })
      };
    }

    // Only allow approved questions
    const { data: question, error: questionError } =
      await supabase
        .from("past_question_submissions")
        .select("id,file_path,file_name,status")
        .eq("id", questionId)
        .eq("status", "approved")
        .single();

    if (questionError || !question) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Past question not found."
        })
      };
    }

    // Create a temporary signed URL.
    // The original Supabase storage bucket remains private.
    const { data: signedFile, error: signedUrlError } =
      await supabase.storage
        .from("past-questions")
        .createSignedUrl(
          question.file_path,
          300
        );

    if (signedUrlError || !signedFile?.signedUrl) {
      console.error(signedUrlError);

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Unable to open the question file."
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
        fileName: question.file_name,
        url: signedFile.signedUrl
      })
    };

  } catch (error) {
    console.error(
      "get-past-question-file error:",
      error
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error while opening question file."
      })
    };
  }
};
