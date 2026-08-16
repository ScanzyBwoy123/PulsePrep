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
          error: "OPENAI_API_KEY is not configured"
        })
      };
    }

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

    const question = body.question || body.message || "";

    if (!question.trim()) {
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

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions:
        "You are Junior Dangote Pro AI, a helpful nursing study tutor for PulsePrep. Give clear, accurate educational explanations suitable for nursing students. Do not diagnose patients or replace professional medical care.",
      input: question
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
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
        error: "Unable to connect to Junior Dangote Pro AI"
      })
    };
  }
};
