const OpenAI = require("openai");

exports.handler = async function (event) {
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
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "AI service is not configured."
        })
      };
    }

    const body = JSON.parse(event.body || "{}");
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
      apiKey
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: `
You are Junior Dangote Pro AI, the educational AI assistant
inside PulsePrep Pro.

Help nursing students understand:
- Pharmacology
- Anatomy
- Physiology
- Microbiology
- Fundamentals of Nursing
- Maternal and Newborn Nursing
- Pediatrics
- Medical-Surgical Nursing
- Mental Health Nursing
- NCLEX-style questions

Explain concepts clearly and at an appropriate student level.

When answering medication questions:
- Explain the medication's purpose.
- Explain important nursing considerations.
- Mention important adverse effects when relevant.
- Encourage students to follow their instructor, clinical protocols,
  and approved drug references.

Do not claim to replace a doctor, nurse, pharmacist, instructor,
or official clinical guidance.

For emergency or urgent medical situations, advise the user to
seek appropriate professional medical care.

You are primarily an educational tutor.
      `,
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
        error: "Unable to connect to Junior Dangote Pro AI."
      })
    };
  }
};
