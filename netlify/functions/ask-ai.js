exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  try {
    // =========================================================
    // CORS / OPTIONS
    // =========================================================

    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers,
        body: ""
      };
    }

    // =========================================================
    // POST ONLY
    // =========================================================

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: "Method not allowed. Use POST."
        })
      };
    }

    // =========================================================
    // GEMINI API KEY
    // =========================================================

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "GEMINI_API_KEY is not configured"
        })
      };
    }

    // =========================================================
    // PARSE REQUEST
    // =========================================================

    let body;

    try {
      body = JSON.parse(event.body || "{}");
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid JSON request"
        })
      };
    }

    const question = String(
      body.message || body.question || ""
    ).trim();

    if (!question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Question is required"
        })
      };
    }

    // =========================================================
    // GEMINI MODEL
    // =========================================================

    const model = "gemini-3.1-flash-lite";

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // =========================================================
    // REQUEST BODY
    // =========================================================

    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text:
              "You are Junior Dangote Pro AI, the nursing study tutor for PulsePrep. " +
              "Help nursing students understand pharmacology, anatomy, physiology, " +
              "microbiology, midwifery, first aid, nursing procedures, and related " +
              "healthcare subjects. Give clear, accurate and educational explanations. " +
              "Use simple language when helpful. " +
              "When appropriate, structure answers with headings, bullet points, " +
              "examples, important points, and exam tips. " +
              "For nursing students, explain difficult concepts in a simple but " +
              "academically useful way. " +
              "Do not diagnose patients, prescribe medication, or replace professional medical care."
          }
        ]
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: question
            }
          ]
        }
      ]
    };

    // =========================================================
    // RETRY SYSTEM
    // =========================================================
    //
    // Temporary Gemini failures can happen because of:
    // - 429 rate limits
    // - 500 server errors
    // - 502/503 temporary service problems
    // - network interruptions
    //
    // We retry those automatically.
    // =========================================================

    const maxAttempts = 3;

    let response = null;
    let data = null;
    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

      try {

        console.log(
          `Junior Dangote Pro AI: Gemini attempt ${attempt}/${maxAttempts}`
        );

        response = await fetch(url, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },

          body: JSON.stringify(requestBody)
        });

        // Try to read Gemini's response.
        const text = await response.text();

        try {
          data = JSON.parse(text);
        } catch (parseError) {
          data = {};
        }

        // =====================================================
        // SUCCESS
        // =====================================================

        if (response.ok) {
          break;
        }

        // =====================================================
        // GEMINI ERROR
        // =====================================================

        const status = response.status;

        const errorMessage =
          data?.error?.message ||
          `Gemini API returned HTTP ${status}`;

        console.error(
          `Gemini attempt ${attempt} failed:`,
          errorMessage
        );

        lastError = new Error(errorMessage);

        // =====================================================
        // ONLY RETRY TEMPORARY ERRORS
        // =====================================================

        const retryable =
          status === 408 ||
          status === 429 ||
          status === 500 ||
          status === 502 ||
          status === 503 ||
          status === 504;

        if (!retryable || attempt === maxAttempts) {
          break;
        }

      } catch (error) {

        console.error(
          `Gemini network attempt ${attempt} failed:`,
          error
        );

        lastError = error;

        if (attempt === maxAttempts) {
          break;
        }
      }

      // =======================================================
      // EXPONENTIAL BACKOFF
      // =======================================================

      const delay =
        Math.min(
          1000 * Math.pow(2, attempt - 1),
          4000
        );

      console.log(
        `Junior Dangote Pro AI: waiting ${delay}ms before retry`
      );

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }

    // =========================================================
    // ALL ATTEMPTS FAILED
    // =========================================================

    if (!response || !response.ok) {

      const finalError =
        lastError?.message ||
        data?.error?.message ||
        "Gemini AI service is temporarily unavailable.";

      console.error(
        "Junior Dangote Pro AI final error:",
        finalError
      );

      return {
        statusCode:
          response?.status >= 400
            ? response.status
            : 503,

        headers,

        body: JSON.stringify({
          error:
            "Junior Dangote Pro AI is temporarily unavailable. Please try again in a moment.",
          details: finalError
        })
      };
    }

    // =========================================================
    // EXTRACT ANSWER
    // =========================================================

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    // =========================================================
    // EMPTY RESPONSE
    // =========================================================

    if (!answer) {

      console.error(
        "Gemini returned no answer:",
        JSON.stringify(data)
      );

      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error:
            "Junior Dangote Pro AI received an empty response. Please try again."
        })
      };
    }

    // =========================================================
    // SUCCESS
    // =========================================================

    console.log(
      "Junior Dangote Pro AI response generated successfully."
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        answer
      })
    };

  } catch (error) {

    console.error(
      "Junior Dangote Pro AI unexpected error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error:
          "Junior Dangote Pro AI encountered a temporary problem. Please try again.",
        details:
          error?.message || "Unknown server error"
      })
    };
  }
};
