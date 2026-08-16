const OpenAI = require("openai");

exports.handler = async () => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "OPENAI_API_KEY is missing"
        })
      };
    }

    const client = new OpenAI({
      apiKey: apiKey
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: "Reply with exactly: OpenAI connection works."
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        answer: response.output_text
      })
    };

  } catch (error) {
    console.error("OpenAI diagnostic error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: false,
        error: error.message || "Unknown OpenAI error"
      })
    };
  }
};
