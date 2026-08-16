const OpenAI = require("openai");

exports.handler = async (event) => {
  try {
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

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "OPENAI_API_KEY is not configured in Netlify."
        })
      };
    }

    let body;

    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Invalid request."
        })
      };
    }

    const message = String(body.message || "").trim();

    if (!message) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Please enter a question."
        })
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions:
        "You are Junior Dangote Pro, the AI nursing tutor inside PulsePrep. Explain nursing, pharmacology, NCLEX-style concepts, anatomy, physiology, microbiology, and related healthcare topics clearly for a student. Give educational information, explain rationales, and encourage the student to consult qualified healthcare professionals for real patient-care decisions.",
      input: message
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        answer: response.output_text
      })
    };

  } catch (error) {
    console.error("Junior Dangote Pro AI error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: error.message || "Junior Dangote Pro AI could not respond."
      })
    };
  }
};
