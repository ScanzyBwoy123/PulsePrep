// ============================================================
// PULSEPREP — AI STUDY LAB
// ============================================================

(function () {

  const SUPABASE_URL =
    "https://eskwphjtiogguhvtktmh.supabase.co";

  const STUDY_MODES = {

  simple: {
    title: "Explain Like I'm 10",
    icon: "🧒",
    instruction: `
Explain the student's notes in very simple language as if teaching a beginner.

Do NOT create MCQs.
Do NOT create theory questions.
Do NOT create flashcards.

Instead:
- Explain every important concept.
- Define difficult nursing and medical terminology.
- Give simple examples where helpful.
- Explain mechanisms and processes where applicable.
- Highlight important nursing facts.
- Preserve important nursing terminology.
`
  },


  breakdown: {
    title: "Break Down Every Key Point",
    icon: "🔎",
    instruction: `
Break the student's notes down point-by-point.

Do NOT create MCQs.
Do NOT create theory questions.
Do NOT create flashcards.

Identify and explain:
- Every important fact
- Definitions
- Terminology
- Causes
- Mechanisms
- Signs and symptoms
- Complications
- Investigations
- Treatment
- Nursing interventions
- Prevention
- Exam-relevant information

Do not skip small but important details.
`
  },


  mcq: {
    title: "Create MCQs",
    icon: "📝",
    instruction: `
CREATE MULTIPLE-CHOICE QUESTIONS ONLY.

The student has selected [MCQ_COUNT] questions.

You MUST generate exactly [MCQ_COUNT] separate MCQs.

Number them continuously:

1.
2.
3.
4.
5.
Continue until [MCQ_COUNT].

EVERY MCQ must contain:

Question:

A. Option
B. Option
C. Option
D. Option

Correct Answer:

Explanation:

Why A is incorrect:

Why B is incorrect:

Why C is incorrect:

Why D is incorrect:

Do NOT create theory questions.
Do NOT create essay questions.
Do NOT create flashcards.

Do NOT stop early.

The final number must be exactly [MCQ_COUNT].
`
  },


  theory: {
    title: "Theory Questions",
    icon: "📚",
    instruction: `
CREATE THEORY AND ESSAY QUESTIONS ONLY.

Do NOT create MCQs.
Do NOT use A, B, C, D multiple-choice options.
Do NOT create flashcards.

Create nursing theory questions based on the student's notes.

For every theory question, provide:

Question:

Model Answer:

Important Marking Points:

The model answer should be detailed enough for a nursing student preparing for an examination.

Where applicable, include:
- Definitions
- Causes
- Mechanisms
- Signs and symptoms
- Complications
- Investigations
- Treatment
- Nursing management
- Prevention
- Important examination points

The questions should test understanding, not simply copy sentences from the notes.
`
  },


  flashcards: {
    title: "Flashcards",
    icon: "🧠",
    instruction: `
CREATE FLASHCARDS ONLY.

Do NOT create MCQs.
Do NOT create theory or essay questions.

Turn the important information in the student's notes into nursing revision flashcards.

Use this format:

Flashcard 1
Question:
Answer:

Flashcard 2
Question:
Answer:

Continue until the important information has been covered.

Answers must be concise, accurate and useful for examination revision.
`
  },


  complete: {
    title: "Complete Study Pack",
    icon: "📦",
    instruction: `
CREATE A COMPLETE NURSING STUDY PACK.

The study pack MUST contain these sections in this order:

1. SIMPLE OVERVIEW

Explain the topic clearly for a beginner.

2. KEY TERMINOLOGY

Define important nursing and medical terms.

3. DETAILED POINT-BY-POINT EXPLANATION

Explain every important point from the student's notes.

4. IMPORTANT EXAM FACTS

List high-yield facts students should remember.

5. MCQs

Create exactly [MCQ_COUNT] MCQs.

Each MCQ MUST contain:
- Question
- A, B, C and D options
- Correct answer
- Explanation of the correct answer
- Explanation of why each incorrect option is wrong

Number the MCQs from 1 to [MCQ_COUNT].

Do NOT stop before reaching [MCQ_COUNT].

6. THEORY QUESTIONS

Create genuine theory/essay questions.

DO NOT turn the theory questions into MCQs.

For each theory question provide:
- Question
- Model Answer
- Important Marking Points

7. FLASHCARDS

Create revision flashcards covering the important information.

Do not replace one section with another.
`
  }

};


  // ----------------------------------------------------------
  // GET SUPABASE SESSION
  // ----------------------------------------------------------

  async function getSession() {

    if (!window.pulseprepSupabase) {

      if (window.pulsePrepAuthReady) {
        try {
          await window.pulsePrepAuthReady;
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (!window.pulseprepSupabase) {
      throw new Error(
        "PulsePrep is still connecting to Supabase. Please try again."
      );
    }

    const {
      data,
      error
    } =
      await window.pulseprepSupabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data?.session || null;
  }


  // ----------------------------------------------------------
  // GENERATE STUDY MATERIAL
  // ----------------------------------------------------------

  async function generateStudyMaterial() {

    const notes =
      document.getElementById("studyLabNotes");

    const mode =
      document.getElementById("studyLabMode");

    const button =
      document.getElementById("studyLabGenerateBtn");

    const result =
      document.getElementById("studyLabResult");

    const status =
      document.getElementById("studyLabStatus");


    if (!notes || !mode || !result) {
      return;
    }


    const noteText =
      notes.value.trim();

    const selectedMode =
      STUDY_MODES[mode.value];
const mcqCount =
  Number(
    document.getElementById("studyLabMcqCount")?.value || 20
  );

    if (!noteText) {

      showStudyLabStatus(
        "Please paste your nursing notes first.",
        "error"
      );

      notes.focus();

      return;
    }


    if (!selectedMode) {

      showStudyLabStatus(
        "Please select a study mode.",
        "error"
      );

      return;
    }


    if (noteText.length < 20) {

      showStudyLabStatus(
        "Please provide more notes so the AI can create useful study material.",
        "error"
      );

      return;
    }


    if (button) {

      button.disabled = true;

      button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generating...';
    }


    showStudyLabStatus(
      "Junior Dangote Pro AI is studying your notes...",
      "loading"
    );


    result.innerHTML = `
      <div class="text-center py-10 text-slate-500">
        <div class="text-4xl mb-3">🧠</div>
        <p class="font-semibold">
          Preparing your study material...
        </p>
        <p class="text-sm mt-1">
          This may take a few seconds.
        </p>
      </div>
    `;


    try {

      const session =
        await getSession();


      
const instruction = `

You are creating study material for a nursing student using PulsePrep AI Study Lab.

STUDY MODE:
${selectedMode.title}

MODE INSTRUCTION:
${selectedMode.instruction}

MCQ COUNT:
${mcqCount}

IMPORTANT RULES:

1. Follow the selected study mode exactly.
2. Do NOT mix different study modes.
3. If the mode is "Theory Questions", produce genuine theory/essay questions, NOT MCQs.
4. If the mode is "Create MCQs", produce MCQs only.
5. If the mode is "Flashcards", produce flashcards only.
6. If the mode is "Explain Like I'm 10", explain the notes without creating questions.
7. If the mode is "Break Down Every Key Point", provide a detailed point-by-point explanation.
8. If the mode is "Complete Study Pack", include all requested sections.
9. When MCQs are requested, the required number is EXACTLY ${mcqCount}.
10. Never generate fewer MCQs than requested.
11. Number every MCQ sequentially from 1 to ${mcqCount}.
12. Before finishing, verify that the MCQ count is exactly ${mcqCount}.
13. Use the student's supplied notes as the main source.
14. Do not skip important information.
15. Preserve important nursing terminology.
16. Define difficult terminology clearly.
17. Keep the material structured and easy to revise.
18. This is educational nursing study material.

STUDENT NOTES:

${noteText}

Now create the requested ${selectedMode.title} study material.
`;
const finalInstruction =
  instruction.replace(
    /\[MCQ_COUNT\]/g,
    String(mcqCount)
  );
      const response =
        await fetch(
          `${SUPABASE_URL}/functions/v1/ask-ai`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              ...(session?.access_token
                ? {
                    Authorization:
                      `Bearer ${session.access_token}`
                  }
                : {})
            },

            body:
  JSON.stringify({
    message: finalInstruction
  })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.error ||
          "The AI Study Lab could not generate your material."
        );
      }


      if (!data?.answer) {

        throw new Error(
          "The AI returned an empty response."
        );
      }


      result.innerHTML =
        formatStudyLabAnswer(
          data.answer
        );


      showStudyLabStatus(
        "Study material generated successfully.",
        "success"
      );


    } catch (error) {

      console.error(
        "PulsePrep AI Study Lab error:",
        error
      );


      result.innerHTML = `
        <div class="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-700">
          <div class="font-extrabold mb-1">
            AI Study Lab Error
          </div>

          <div class="text-sm">
            ${escapeStudyLabHTML(
              error?.message ||
              "Unable to generate study material."
            )}
          </div>
        </div>
      `;


      showStudyLabStatus(
        "Something went wrong. Please try again.",
        "error"
      );


    } finally {

      if (button) {

        button.disabled = false;

        button.innerHTML =
          '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>Generate Study Material';
      }
    }
  }


  // ----------------------------------------------------------
  // FORMAT AI RESPONSE
  // ----------------------------------------------------------

  function formatStudyLabAnswer(text) {

    let safe =
      escapeStudyLabHTML(text);


    safe =
      safe.replace(
        /^### (.*)$/gm,
        '<h3 class="text-xl font-extrabold text-slate-900 mt-6 mb-3">$1</h3>'
      );


    safe =
      safe.replace(
        /^## (.*)$/gm,
        '<h2 class="text-2xl font-extrabold text-medical-800 mt-8 mb-4">$1</h2>'
      );


    safe =
      safe.replace(
        /^# (.*)$/gm,
        '<h1 class="text-3xl font-black text-slate-900 mt-2 mb-5">$1</h1>'
      );


    safe =
      safe.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );


    safe =
      safe.replace(
        /^\* (.*)$/gm,
        '<li class="ml-5 list-disc mb-2">$1</li>'
      );


    safe =
      safe.replace(
        /^- (.*)$/gm,
        '<li class="ml-5 list-disc mb-2">$1</li>'
      );


    safe =
      safe.replace(
        /\n\n/g,
        '<div class="h-3"></div>'
      );


    safe =
      safe.replace(
        /\n/g,
        '<br>'
      );


    return `
      <div class="prose max-w-none text-slate-700 leading-7">
        ${safe}
      </div>
    `;
  }


  // ----------------------------------------------------------
  // STATUS
  // ----------------------------------------------------------

  function showStudyLabStatus(
    message,
    type
  ) {

    const status =
      document.getElementById(
        "studyLabStatus"
      );

    if (!status) return;


    const styles = {

      success:
        "bg-green-50 border-green-200 text-green-700",

      error:
        "bg-red-50 border-red-200 text-red-700",

      loading:
        "bg-blue-50 border-blue-200 text-blue-700"
    };


    status.className =
      `mt-4 p-4 rounded-xl border text-sm ${
        styles[type] ||
        styles.loading
      }`;

    status.textContent =
      message;

    status.classList.remove(
      "hidden"
    );
  }


  // ----------------------------------------------------------
  // ESCAPE HTML
  // ----------------------------------------------------------

  function escapeStudyLabHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  // ----------------------------------------------------------
  // EXPOSE FUNCTION
  // ----------------------------------------------------------

  window.generatePulsePrepStudyMaterial =
    generateStudyMaterial;


})();
