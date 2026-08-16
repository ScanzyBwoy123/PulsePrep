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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing");

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

    const question = body.message || body.question || "";

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
      apiKey: apiKey
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions:
        "You are Junior Dangote Pro AI, a helpful nursing study tutor for PulsePrep. Give clear, accurate educational explanations suitable for nursing students. Do not diagnose patients or replace professional medical care.",
      input: question
    });

    const answer = response.output_text || "";

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
    console.error("Junior Dangote Pro AI ERROR:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error:
          error?.message ||
          "OpenAI request failed"
      })
    };
  }
};
