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

   const prompt = `
You are a senior nursing educator and examination item-writer
creating high-quality nursing MCQs for PulsePrep.

Generate exactly ${requestedCount} original questions.

SUBJECT:
${subject}

${topicInstruction}

DIFFICULTY:
${difficulty}

ASSESSMENT STANDARD:

1. CLINICAL SCENARIOS
For clinical subjects, including Medicine / Medical Nursing,
Medical-Surgical Nursing, Pharmacology, Pathophysiology,
Paediatric Nursing, Midwifery, Maternal and Child Health,
Emergency Care and Health Assessment, aim for at least 70%
patient-based clinical scenarios.

Use realistic patient presentations containing relevant details
such as age, presenting complaints, medical history, medication
history, vital signs, examination findings or laboratory results
when appropriate.

Ask students to interpret findings, identify complications,
prioritize nursing care, select safe interventions, evaluate
treatment outcomes or provide appropriate patient education.

Do not force irrelevant scenarios into questions that are better
answered by testing a fundamental concept.

2. QUESTION DIFFICULTY
EASY:
Test essential nursing knowledge and understanding in clear,
accessible questions.

MEDIUM:
Require students to apply knowledge to clinical situations,
interpret findings and select appropriate nursing actions.

HARD:
Require deeper clinical reasoning, prioritization, analysis
of patient findings or discrimination between plausible options.

Difficult questions must remain fair, clinically accurate and
unambiguous.

3. PLAUSIBLE ANSWER OPTIONS
Every question must have exactly four options: A, B, C and D.

There must be one clearly best answer.

All four options must be believable and relevant to the question.
Incorrect options should represent realistic misconceptions,
clinical errors or less appropriate decisions.

Do not include ridiculous, unrelated or obviously false options
simply to make the correct answer easy to identify.

Keep options similar in length, detail, grammatical structure
and level of specificity.

The correct answer must not stand out because it is much longer,
more detailed, more technical or the only sensible-sounding option.

Do not repeat distinctive wording from the question only in
the correct answer.

Avoid grammatical clues, giveaway phrases and predictable
answer patterns.

Do not use "All of the above" or "None of the above".

4. NURSING CLINICAL REASONING
Questions should assess different skills, as appropriate:
- Patient assessment and interpretation of findings.
- Recognition of deterioration and complications.
- Prioritization of nursing interventions.
- Safe medication administration and monitoring.
- Appropriate nursing actions and escalation of care.
- Evaluation of patient response to treatment.
- Infection prevention and patient safety.
- Patient education and discharge planning.
- Clinical decision-making and evidence-based practice.

Do not make every question ask the same type of thing.

5. MEDICINE AND MEDICAL NURSING
Use clinically realistic patient presentations.

Test whether students can connect symptoms, history, physical
findings and investigation results to appropriate nursing care.

Ask what the nurse should assess, do first, monitor, report,
teach or evaluate when relevant.

Use laboratory values and vital signs accurately, with appropriate
units and clinically meaningful interpretations.

Do not make the correct answer obvious by including three
unrealistic or unsafe alternatives.

6. PHARMACOLOGY AND MEDICATION SAFETY
Use accurate information about medication indications,
contraindications, adverse effects, interactions and monitoring.

Do not invent medication doses or recommend unsafe medication
administration.

Respect nursing scope of practice, prescriptions, patient allergies,
contraindications and institutional protocols where relevant.

7. CLINICAL ACCURACY
Use accepted nursing and clinical principles.

Do not invent diagnoses, medical facts, laboratory interpretations
or treatment recommendations.

Questions must be consistent with the information provided in
the stem.

If a question depends on a specific clinical protocol, prescription
or local guideline, provide sufficient context.

8. EXPLANATIONS
Every question must include a meaningful explanation.

Explain why the correct answer is the best choice using appropriate
clinical or theoretical reasoning.

Where useful, briefly explain why the most tempting alternative
is less appropriate.

Avoid explanations that merely repeat the correct answer.

The explanation must agree with the question, options and
correct answer.

9. ANSWER-LETTER DISTRIBUTION
Distribute correct answers across A, B, C and D as evenly as
reasonably possible across the complete set.

Avoid obvious patterns, such as repeatedly making option B
correct or following a predictable A-B-C-D sequence.

Never change a clinically correct answer just to balance letters.
Instead, construct the options so the correct answer appears
in varied positions naturally.

10. VARIETY AND ORIGINALITY
Avoid duplicate and near-duplicate questions.

Vary the patient situations, clinical findings, question wording,
tested learning objectives and correct-answer positions.

Use both positively and negatively phrased questions only when
appropriate. Make words such as NOT or EXCEPT clear when used.

11. FINAL QUALITY CHECK
Before returning the questions, review every item and verify:

- The question tests a meaningful learning objective.
- The clinical facts are accurate.
- The stem contains enough information to answer fairly.
- There is one clearly best answer.
- All four options are plausible and comparable.
- The correct answer does not stand out through wording or length.
- The explanation supports the keyed answer.
- The questions are not repetitive.
- Correct-answer positions are reasonably balanced.
- The requested number of questions is generated exactly.

12. OUTPUT FORMAT
Return ONLY valid JSON.
Do not use Markdown code fences.
Do not include introductory commentary.

Return exactly this structure:

{
  "questions": [
    {
      "question": "Question text",
      "option_a": "Plausible option A",
      "option_b": "Plausible option B",
      "option_c": "Plausible option C",
      "option_d": "Plausible option D",
      "correct_answer": "A",
      "explanation": "A clinically accurate explanation of why the answer is best."
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
