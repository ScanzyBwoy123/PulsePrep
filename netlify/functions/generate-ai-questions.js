const { createClient } = require("@supabase/supabase-js");

const ADMIN_EMAILS = [
  "scanzybwoy8@gmail.com"
];

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Method not allowed."
      })
    };
  }

  try {
    // =========================================================
    // ENVIRONMENT VARIABLES
    // =========================================================

    const supabaseUrl =
      process.env.SUPABASE_URL ||
      "https://eskwphjtiogguhvtktmh.supabase.co";

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const geminiApiKey =
      process.env.GEMINI_API_KEY;

    if (!serviceRoleKey || !geminiApiKey) {
      console.error(
        "Missing SUPABASE_SERVICE_ROLE_KEY or GEMINI_API_KEY."
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Server configuration error."
        })
      };
    }

    // =========================================================
    // SUPABASE
    // =========================================================

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // =========================================================
    // AUTHENTICATION
    // =========================================================

    const authHeader =
      event.headers?.authorization ||
      event.headers?.Authorization;

    const token = (authHeader || "")
      .replace(/^Bearer\s+/i, "")
      .trim();

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Authentication required."
        })
      };
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser(token);

    if (userError || !user?.email) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid or expired session."
        })
      };
    }

    // =========================================================
    // ADMIN CHECK
    // =========================================================

    const userEmail =
      String(user.email)
        .trim()
        .toLowerCase();

    const isAdmin =
      ADMIN_EMAILS
        .map(email => email.toLowerCase())
        .includes(userEmail);

    if (!isAdmin) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Administrator access required."
        })
      };
    }

    // =========================================================
    // PARSE REQUEST
    // =========================================================

    let body = {};

    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Invalid JSON request."
        })
      };
    }

    const subject =
      String(body.subject || "").trim();

    const topic =
      String(body.topic || "").trim();

    const difficulty =
      String(body.difficulty || "medium")
        .trim()
        .toLowerCase();

    const source =
      String(body.source || "PulsePrep AI")
        .trim();

    const school =
      String(body.school || "")
        .trim();

    const academicYear =
      String(body.academic_year || "")
        .trim();

    const requestedCount =
      Number(body.count);

    // =========================================================
    // VALIDATION
    // =========================================================

    if (!subject) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Subject is required."
        })
      };
    }

    if (!["easy", "medium", "hard"].includes(difficulty)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Difficulty must be easy, medium, or hard."
        })
      };
    }

    if (
      !Number.isInteger(requestedCount) ||
      requestedCount < 1 ||
      requestedCount > 50
    ) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Number of questions must be between 1 and 50."
        })
      };
    }

    // =========================================================
    // GEMINI
    // =========================================================

    const model =
      "gemini-3.1-flash-lite";

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const topicInstruction =
      topic
        ? `Focus specifically on the topic: ${topic}.`
        : "Cover important examinable areas within the subject.";

    const prompt = `
You are an expert nursing educator creating high-quality
multiple-choice questions for PulsePrep, a nursing
education platform.

Generate exactly ${requestedCount} original multiple-choice
questions.

SUBJECT:
${subject}

${topicInstruction}

DIFFICULTY:
${difficulty}

Requirements:

1. Questions must be academically useful for nursing students.
2. Questions must test understanding, not just memorization,
   whenever appropriate.
3. Each question must have exactly four options.
4. Only one option must be correct.
5. Options must be labelled A, B, C and D in the JSON field
   correct_answer.
6. Do not include "All of the above" or "None of the above"
   unless genuinely necessary.
7. Avoid duplicate or nearly identical questions.
8. Explanations must clearly explain why the correct answer
   is correct.
9. Do not invent obviously false medical facts.
10. Keep wording clear and suitable for nursing examinations.
11. Return ONLY valid JSON.
12. Do not wrap the JSON in markdown code fences.

Return exactly this structure:

{
  "questions": [
    {
      "question": "Question text",
      "option_a": "Option A",
      "option_b": "Option B",
      "option_c": "Option C",
      "option_d": "Option D",
      "correct_answer": "A",
      "explanation": "Clear educational explanation."
    }
  ]
}
`;

    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text:
              "You are a professional nursing question writer for PulsePrep. " +
              "Create accurate, educational, exam-quality nursing MCQs. " +
              "Follow the requested JSON structure exactly."
          }
        ]
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],

      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    };

    // =========================================================
    // GEMINI REQUEST WITH RETRIES
    // =========================================================

    let response = null;
    let data = null;
    let lastError = null;

    const maxAttempts = 3;

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      try {
        console.log(
          `PulsePrep AI Question Generator: attempt ${attempt}/${maxAttempts}`
        );

        response = await fetch(url, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey
          },

          body: JSON.stringify(requestBody)
        });

        const responseText =
          await response.text();

        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }

        if (response.ok) {
          break;
        }

        const status =
          response.status;

        const errorMessage =
          data?.error?.message ||
          `Gemini returned HTTP ${status}`;

        console.error(
          `Gemini attempt ${attempt} failed:`,
          errorMessage
        );

        lastError =
          new Error(errorMessage);

        const retryable =
          status === 408 ||
          status === 429 ||
          status === 500 ||
          status === 502 ||
          status === 503 ||
          status === 504;

        if (
          !retryable ||
          attempt === maxAttempts
        ) {
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

      const delay =
        Math.min(
          1000 * Math.pow(2, attempt - 1),
          4000
        );

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }

    // =========================================================
    // GEMINI FAILURE
    // =========================================================

    if (!response || !response.ok) {
      const finalError =
        lastError?.message ||
        data?.error?.message ||
        "Gemini service is temporarily unavailable.";

      console.error(
        "AI question generation failed:",
        finalError
      );

      return {
        statusCode:
          response?.status >= 400
            ? response.status
            : 503,

        headers,

        body: JSON.stringify({
          success: false,
          error:
            "AI question generation failed.",
          details: finalError
        })
      };
    }

    // =========================================================
    // EXTRACT GEMINI TEXT
    // =========================================================

    const generatedText =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!generatedText) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Gemini returned an empty response."
        })
      };
    }

    // =========================================================
    // PARSE GENERATED JSON
    // =========================================================

    let generated;

    try {
      generated =
        JSON.parse(generatedText);
    } catch (error) {
      console.error(
        "Gemini returned invalid JSON:",
        generatedText
      );

      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "AI returned invalid question data. Please try again."
        })
      };
    }

    const questions =
      Array.isArray(generated?.questions)
        ? generated.questions
        : [];

    if (!questions.length) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "AI did not generate any questions."
        })
      };
    }

    // =========================================================
    // VALIDATE QUESTIONS
    // =========================================================

    const validQuestions = [];

    for (const item of questions) {
      if (!item || typeof item !== "object") {
        continue;
      }

      const question =
        String(item.question || "").trim();

      const optionA =
        String(item.option_a || "").trim();

      const optionB =
        String(item.option_b || "").trim();

      const optionC =
        String(item.option_c || "").trim();

      const optionD =
        String(item.option_d || "").trim();

      const correctAnswer =
        String(item.correct_answer || "")
          .trim()
          .toUpperCase();

      const explanation =
        String(item.explanation || "").trim();

      if (
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !["A", "B", "C", "D"].includes(
          correctAnswer
        )
      ) {
        continue;
      }

      validQuestions.push({
        subject,
        topic: topic || null,

        question,

        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,

        correct_answer:
          correctAnswer,

        explanation:
          explanation ||
          "No explanation was provided.",

        difficulty,

        source:
          source || "PulsePrep AI",

        school:
          school || null,

        academic_year:
          academicYear || null,

        status: "pending"
      });
    }

    if (!validQuestions.length) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "AI generated questions, but none passed validation."
        })
      };
    }

    // =========================================================
    // SAVE TO EXAM VAULT
    // =========================================================

    const {
      data: insertedQuestions,
      error: insertError
    } = await supabase
      .from("exam_vault_questions")
      .insert(validQuestions)
      .select(`
        id,
        subject,
        topic,
        question,
        difficulty,
        status
      `);

    if (insertError) {
      console.error(
        "AI question database insert failed:",
        insertError
      );

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error:
            "Questions were generated but could not be saved.",
          details:
            insertError.message
        })
      };
    }

    // =========================================================
    // SUCCESS
    // =========================================================

    console.log(
      `PulsePrep AI generated and saved ${insertedQuestions.length} questions.`
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,

        message:
          `${insertedQuestions.length} AI questions generated successfully and saved as pending.`,

        generated:
          insertedQuestions.length,

        status:
          "pending",

        questions:
          insertedQuestions
      })
    };

  } catch (error) {
    console.error(
      "Generate AI questions unexpected error:",
      error
    );

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error:
          "Unable to generate AI questions.",
        details:
          error?.message ||
          "Unknown server error"
      })
    };
  }
};
