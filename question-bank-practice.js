(function () {
  "use strict";

  const state = {
    currentQuestion: null,
    answered: 0,
    score: 0,
    busy: false
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  function mount() {
    const container =
      document.getElementById("questionBankContent");

    if (
      !container ||
      document.getElementById("pulsePrepDynamicPractice")
    ) {
      return;
    }

    const wrapper = document.createElement("div");

    wrapper.id = "pulsePrepDynamicPractice";
    wrapper.className = "mb-10";

    wrapper.innerHTML = `
      <div class="rounded-3xl border border-teal-100 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white p-6 sm:p-8 shadow-xl">

        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <div>

            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-extrabold uppercase">
              <i class="fa-solid fa-bolt"></i>
              Endless Practice Mode
            </div>

            <h3 class="text-2xl sm:text-3xl font-extrabold mt-3">
              Practice one question at a time
            </h3>

            <p class="text-slate-300 mt-2 max-w-2xl leading-6">
              Answer a question, see the result and explanation immediately,
              then continue. Questions come dynamically from the approved
              Question Bank.
            </p>

          </div>

          <div class="grid grid-cols-3 gap-2 min-w-[240px]">

            <div class="rounded-2xl bg-white/10 p-3 text-center">
              <p class="text-xs text-slate-300">Score</p>
              <p id="practiceScore" class="text-xl font-extrabold mt-1">
                0
              </p>
            </div>

            <div class="rounded-2xl bg-white/10 p-3 text-center">
              <p class="text-xs text-slate-300">Answered</p>
              <p id="practiceAnswered" class="text-xl font-extrabold mt-1">
                0
              </p>
            </div>

            <div class="rounded-2xl bg-white/10 p-3 text-center">
              <p class="text-xs text-slate-300">Accuracy</p>
              <p id="practiceAccuracy" class="text-xl font-extrabold mt-1">
                0%
              </p>
            </div>

          </div>

        </div>

        <div class="mt-5 flex flex-wrap gap-2 text-xs">

          <span class="px-3 py-1 rounded-full bg-white/10">
            Subject:
            <strong id="practiceSubjectLabel">—</strong>
          </span>

          <span class="px-3 py-1 rounded-full bg-white/10">
            Topic:
            <strong id="practiceTopicLabel">—</strong>
          </span>

          <span class="px-3 py-1 rounded-full bg-white/10">
            Level:
            <strong id="practiceDifficultyLabel">—</strong>
          </span>

        </div>

      </div>

      <div class="mt-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">

        <div id="practiceQuestion" class="min-h-[100px]"></div>

        <div id="practiceOptions" class="space-y-3 mt-5"></div>

        <div id="practiceResult" class="hidden mt-5"></div>

        <div
          id="practiceStatus"
          class="mt-4 p-3 rounded-xl text-sm bg-slate-50 text-slate-600 border border-slate-200">
        </div>

      </div>
    `;

    container.insertBefore(wrapper, container.firstChild);

    loadQuestion();
  }

  function updateStats() {
    const answered =
      document.getElementById("practiceAnswered");

    const score =
      document.getElementById("practiceScore");

    const accuracy =
      document.getElementById("practiceAccuracy");

    if (answered) {
      answered.textContent = state.answered;
    }

    if (score) {
      score.textContent = state.score;
    }

    if (accuracy) {
      accuracy.textContent = state.answered
        ? Math.round(
            (state.score / state.answered) * 100
          ) + "%"
        : "0%";
    }
  }

  async function getSession() {
    if (!window.pulseprepSupabase) {
      return null;
    }

    const result =
      await window.pulseprepSupabase.auth.getSession();

    return result.data?.session || null;
  }

  async function loadQuestion() {
    if (state.busy) {
      return;
    }

    const questionElement =
      document.getElementById("practiceQuestion");

    const optionsElement =
      document.getElementById("practiceOptions");

    const resultElement =
      document.getElementById("practiceResult");

    const statusElement =
      document.getElementById("practiceStatus");

    if (!questionElement || !optionsElement) {
      return;
    }

    state.busy = true;

    if (resultElement) {
      resultElement.classList.add("hidden");
      resultElement.innerHTML = "";
    }

    optionsElement.innerHTML = "";

    questionElement.innerHTML = `
      <div class="py-10 text-center text-slate-500">
        <i class="fa-solid fa-spinner fa-spin mr-2"></i>
        Loading your next question...
      </div>
    `;

    try {
      const session = await getSession();

      if (!session) {
        throw new Error(
          "Please log in to use Endless Practice Mode."
        );
      }

      const response = await fetch(
        "/.netlify/functions/get-practice-question",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer " + session.access_token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Unable to load a question."
        );
      }

      state.currentQuestion = data.question;

      document.getElementById(
        "practiceSubjectLabel"
      ).textContent =
        state.currentQuestion.subject ||
        "Nursing";

      document.getElementById(
        "practiceTopicLabel"
      ).textContent =
        state.currentQuestion.topic ||
        "General";

      document.getElementById(
        "practiceDifficultyLabel"
      ).textContent =
        state.currentQuestion.difficulty ||
        "Mixed";

      questionElement.innerHTML = `
        <div class="text-xs font-extrabold uppercase tracking-wider text-teal-600 mb-3">
          Question
        </div>

        <h3 class="text-xl sm:text-2xl font-extrabold leading-8 text-slate-900">
          ${escapeHtml(
            state.currentQuestion.question
          )}
        </h3>
      `;

      state.currentQuestion.options.forEach(
        (option, index) => {
          const button =
            document.createElement("button");

          button.type = "button";

          button.className =
            "w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 transition font-medium text-slate-800";

          button.innerHTML = `
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-extrabold mr-3">
              ${String.fromCharCode(65 + index)}
            </span>
            ${escapeHtml(option)}
          `;

          button.onclick = () =>
            submitAnswer(index);

          optionsElement.appendChild(button);
        }
      );

      if (statusElement) {
        statusElement.textContent =
          "Choose the answer you think is correct.";
      }

    } catch (error) {

      questionElement.innerHTML = `
        <div class="py-10 text-center text-red-600">
          ${escapeHtml(error.message)}
        </div>
      `;

      if (statusElement) {
        statusElement.textContent =
          error.message;
      }

    } finally {
      state.busy = false;
    }
  }

  async function submitAnswer(index) {
    if (
      !state.currentQuestion ||
      state.busy
    ) {
      return;
    }

    const optionsElement =
      document.getElementById(
        "practiceOptions"
      );

    const buttons =
      [...optionsElement.querySelectorAll("button")];

    buttons.forEach(
      (button) => {
        button.disabled = true;
      }
    );

    try {
      const session = await getSession();

      if (!session) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const response = await fetch(
        "/.netlify/functions/submit-practice-answer",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              "Bearer " +
              session.access_token
          },

          body: JSON.stringify({
            question_id:
              state.currentQuestion.id,

            selected_answer:
              String.fromCharCode(
                65 + index
              )
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Unable to check your answer."
        );
      }

      state.answered++;

      if (data.correct) {
        state.score++;
      }

      updateStats();

      const correctIndex =
        data.correctAnswer
          ? data.correctAnswer
              .charCodeAt(0) - 65
          : -1;

      buttons.forEach(
        (button, buttonIndex) => {

          button.classList.remove(
            "bg-white",
            "border-slate-200",
            "hover:bg-teal-50",
            "hover:border-teal-300"
          );

          if (buttonIndex === correctIndex) {

            button.classList.add(
              "border-emerald-400",
              "bg-emerald-50"
            );

          } else if (
            buttonIndex === index &&
            !data.correct
          ) {

            button.classList.add(
              "border-red-400",
              "bg-red-50"
            );

          } else {

            button.classList.add(
              "bg-slate-50",
              "border-slate-200"
            );
          }
        }
      );

      const resultElement =
        document.getElementById(
          "practiceResult"
        );

      resultElement.className =
        "mt-5 rounded-2xl border p-5 " +
        (
          data.correct
            ? "border-emerald-200 bg-emerald-50"
            : "border-red-200 bg-red-50"
        );

      resultElement.innerHTML = `
        <div class="font-extrabold text-lg ${
          data.correct
            ? "text-emerald-800"
            : "text-red-800"
        }">
          ${
            data.correct
              ? "✓ Correct!"
              : "✕ Incorrect"
          }
        </div>

        <p class="mt-2 text-slate-800">
          <strong>Correct answer:</strong>
          ${escapeHtml(
            data.correctAnswer
          )}.
          ${escapeHtml(
            data.correctAnswerText
          )}
        </p>

        <p class="mt-2 text-slate-700 leading-6">
          <strong>Explanation:</strong>
          ${escapeHtml(
            data.explanation
          )}
        </p>

        <button
          id="practiceNextQuestion"
          type="button"
          class="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white font-extrabold hover:bg-teal-700">

          <i class="fa-solid fa-arrow-right"></i>
          Next Question

        </button>
      `;

      resultElement.classList.remove(
        "hidden"
      );

      if (
        typeof window.recordPulsePrepActivity ===
        "function"
      ) {
        window.recordPulsePrepActivity({
          questionId:
            state.currentQuestion.id,

          subject:
            state.currentQuestion.subject ||
            "Nursing",

          isCorrect:
            Boolean(data.correct)
        });
      }

      document.getElementById(
        "practiceNextQuestion"
      ).onclick = loadQuestion;

    } catch (error) {

      buttons.forEach(
        (button) => {
          button.disabled = false;
        }
      );

      const statusElement =
        document.getElementById(
          "practiceStatus"
        );

      if (statusElement) {
        statusElement.textContent =
          error.message;
      }
    }
  }

  window.initializePulsePrepPractice =
    mount;

})();
