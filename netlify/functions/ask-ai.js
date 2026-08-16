exports.handler = async (event) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    // Get Gemini API key from Netlify environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "GEMINI_API_KEY is not configured"
        })
      };
    }

    // Read the request body
    let body;

    try {
      body = JSON.parse(event.body || "{}");
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Invalid JSON request"
        })
      };
    }

    // Get student's question
    const question = String(
      body.message || body.question || ""
    ).trim();

    if (!question) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Question is required"
        })
      };
    }

    // Send request to Gemini
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
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
                  "You are Junior Dangote Pro AI, the nursing study tutor for PulsePrep. Give clear, accurate and educational explanations suitable for nursing students. Help students understand nursing, pharmacology, anatomy, physiology, microbiology and related subjects. Do not diagnose patients or replace professional medical care."
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
      }
    );

    // Read Gemini response
    const data = await geminiResponse.json();

    // Gemini returned an error
    if (!geminiResponse.ok) {
      console.error(
        "Gemini API error:",
        JSON.stringify(data)
      );

      return {
        statusCode: geminiResponse.status,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          error:
            data?.error?.message ||
            "Gemini API request failed"
        })
      };
    }

    // Extract Gemini answer
    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return {
        statusCode: 502,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          error:
            "Gemini returned an empty response"
        })
      };
    }

    // Send answer back to PulsePrep
    return {
      statusCode: 200,

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        answer: answer
      })
    };

  } catch (error) {
    console.error(
      "Junior Dangote Pro Gemini error:",
      error
    );

    return {
      statusCode: 500,

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        error:
          error?.message ||
          "Gemini request failed"
      })
    };
  }
};
