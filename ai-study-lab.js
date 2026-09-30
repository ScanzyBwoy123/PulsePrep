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
      instruction:
        "Explain the notes in very simple language as if teaching a beginner. Do not remove important nursing terminology. Define difficult terms immediately."
    },

    breakdown: {
      title: "Break Down Every Key Point",
      icon: "🔎",
      instruction:
        "Break the notes down point-by-point. Identify every important fact, definition, mechanism, cause, sign, symptom, complication, investigation, treatment, nursing intervention, prevention point and exam-relevant detail when applicable. Do not skip small but important points."
    },

    mcq: {
      title: "Create MCQs",
      icon: "📝",
      instruction:
        "Create nursing multiple-choice questions from the notes. Give four options A-D, identify the correct answer, explain why it is correct, and explain why each other option is incorrect. Test understanding rather than simply copying sentences."
    },

    theory: {
      title: "Theory Questions",
      icon: "📚",
      instruction:
        "Create theory/essay questions from the notes. Provide a model answer for each question and list important marking points students should remember."
    },

    flashcards: {
      title: "Flashcards",
      icon: "🧠",
      instruction:
        "Turn the notes into useful nursing revision flashcards. Each flashcard should have a clear question on the front and a concise but accurate answer on the back."
    },

    complete: {
      title: "Complete Study Pack",
      icon: "📦",
      instruction:
        "Create a complete nursing study pack containing: a simple overview, detailed point-by-point explanation, key terminology, important facts, mechanisms/causes/signs/symptoms/complications/management where applicable, exam tips, MCQs with answers and rationales, theory questions with model answers, and flashcards."
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

IMPORTANT RULES:

1. Use ONLY the student's supplied notes as the main source.
2. Correct obvious wording or spelling problems when necessary.
3. Do not skip important information.
4. Preserve important nursing terminology.
5. Define difficult terminology in simple language.
6. Organize the answer with clear headings.
7. Make the material useful for nursing examinations.
8. Highlight high-yield exam facts.
9. Do not diagnose a real patient.
10. Do not prescribe medication for a real patient.
11. This is educational nursing study material.
12. If the notes contain unsafe or incorrect medical information, clearly identify it rather than presenting it as fact.
13. Keep the answer structured and easy to revise.

STUDENT NOTES:

${noteText}

Now create the requested ${selectedMode.title} study material.
`;


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
                message: instruction
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
