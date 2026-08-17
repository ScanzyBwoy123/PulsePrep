exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
  try {
    // Handle browser preflight request
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers,
        body: ""
      };
    }
    // Only POST is allowed
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: "Method not allowed. Use POST."
        })
      };
    }
    // Get Gemini API key from Netlify
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
    // Parse request body
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
    // Current Gemini model
    const model = "gemini-3.1-flash-lite";
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text:
                "You are Junior Dangote Pro AI, the nursing study tutor for PulsePrep. " +
                "Help nursing students understand pharmacology, anatomy, physiology, " +
                "microbiology, midwifery, first aid, nursing procedures, and related " +
                "healthcare subjects. Give clear, accurate and educational explanations. " +
                "Use simple language when helpful. Do not diagnose patients, prescribe " +
                "medication, or replace professional medical care."
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
      })
    });
    const data = await response.json();
    // Gemini returned an error
    if (!response.ok) {
      console.error(
        "Gemini API error:",
        JSON.stringify(data)
      );
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error:
            data?.error?.message ||
            "Gemini API request failed"
        })
      };
    }
    // Extract Gemini response
    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();
    if (!answer) {
      console.error(
        "Gemini returned no answer:",
        JSON.stringify(data)
      );
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Gemini returned an empty response"
        })
      };
    }
    // Successful response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        answer
      })
    };
  } catch (error) {
    console.error(
      "Junior Dangote Pro Gemini error:",
      error
    );
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error:
          error?.message ||
          "Gemini request failed"
      })
    };
  }
};
