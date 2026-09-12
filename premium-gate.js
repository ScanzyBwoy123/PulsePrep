// ============================================================
// PULSEPREP PREMIUM GATE + QUESTION BANK
// ============================================================

(function () {
  "use strict";

  // ------------------------------------------------------------
  // CONFIG
  // ------------------------------------------------------------

  const QUESTION_API =
    "/.netlify/functions/get-exam-vault-questions";

  const PAGE_LIMIT = 100;

  // ------------------------------------------------------------
  // PREMIUM CHECK
  // ------------------------------------------------------------

  async function isPulsePrepPremium() {
    try {
      if (typeof window.checkPulsePrepPremium === "function") {
        return await window.checkPulsePrepPremium();
      }

      // If the premium checker is not available yet,
      // do not block the application.
      return true;
    } catch (error) {
      console.error("Premium check failed:", error);
      return false;
    }
  }

  // ------------------------------------------------------------
  // SHOW PREMIUM MESSAGE
  // ------------------------------------------------------------

  function showPremiumRequired(container, title, message) {
    if (!container) return;

    container.innerHTML = `
      <div class="max-w-xl mx-auto text-center py-12 px-6">
        <div class="text-5xl mb-4">🔒</div>

        <h3 class="text-2xl font-extrabold text-slate-900 mb-3">
          ${title || "Premium Access Required"}
        </h3>

        <p class="text-slate-500 mb-6">
          ${
            message ||
            "Upgrade your PulsePrep account to access this learning content."
          }
        </p>

        <button
          type="button"
          onclick="window.openPulsePrepPremium?.()"
          class="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
        >
          Upgrade to Premium
        </button>
      </div>
    `;
  }

  // ------------------------------------------------------------
  // WAIT FOR SUPABASE
  // ------------------------------------------------------------

  async function waitForSupabase(timeout = 10000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (window.pulseprepSupabase) {
        return window.pulseprepSupabase;
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return null;
  }

  // ------------------------------------------------------------
  // LOAD APPROVED QUESTIONS
  // ------------------------------------------------------------

  async function fetchApprovedQuestions() {
    const allQuestions = [];
    const seenIds = new Set();

    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const url =
        `${QUESTION_API}?page=${page}&limit=${PAGE_LIMIT}`;

      console.log(
        `PulsePrep Question Bank: loading page ${page}...`
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;

        try {
          const errorData = await response.json();

          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch (_) {}

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();

      const questions = Array.isArray(data)
        ? data
        : Array.isArray(data.questions)
        ? data.questions
        : Array.isArray(data.data)
        ? data.data
        : [];

      if (data && Number.isFinite(Number(data.totalPages))) {
        totalPages = Number(data.totalPages);
      } else if (
        data &&
        Number.isFinite(Number(data.total_pages))
      ) {
        totalPages = Number(data.total_pages);
      } else if (
        data &&
        Number.isFinite(Number(data.total))
      ) {
        totalPages = Math.max(
          1,
          Math.ceil(Number(data.total) / PAGE_LIMIT)
        );
      } else {
        totalPages = page;
      }

      for (const question of questions) {
        const id =
          question.id !== undefined &&
          question.id !== null
            ? String(question.id)
            : null;

        if (id) {
          if (seenIds.has(id)) {
            continue;
          }

          seenIds.add(id);
        }

        allQuestions.push(question);
      }

      if (questions.length === 0) {
        break;
      }

      page++;
    }

    console.log(
      `PulsePrep Question Bank: ${allQuestions.length} approved questions loaded.`
    );

    return allQuestions;
  }

  // ------------------------------------------------------------
  // QUESTION HELPERS
  // ------------------------------------------------------------

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getQuestionLevel(question) {
    return question.difficulty || "Not specified";
  }

  function getExamType(question) {
    return question.source || "General";
  }

  function getSubject(question) {
    return question.subject || "Uncategorized";
  }

  function getOption(question, letter) {
    const key = `option_${letter}`;

    return question[key] ?? "";
  }

  function getCorrectAnswer(question) {
    return (
      question.correct_answer ||
      question.correctAnswer ||
      ""
    );
  }

  // ------------------------------------------------------------
  // BUILD FILTER OPTIONS
  // ------------------------------------------------------------

  function uniqueSorted(values) {
    return [...new Set(values)]
      .filter(Boolean)
      .sort((a, b) =>
        String(a).localeCompare(String(b))
      );
  }

  // ------------------------------------------------------------
  // RENDER QUESTION BANK
  // ------------------------------------------------------------

  function renderQuestionBank(questions) {
    const container =
      document.getElementById("questionBankContent");

    if (!container) {
      console.error(
        "PulsePrep: #questionBankContent was not found."
      );
      return;
    }

    if (!questions.length) {
      container.innerHTML = `
        <div class="text-center py-12 px-6">
          <div class="text-5xl mb-4">📚</div>

          <h3 class="text-xl font-extrabold text-slate-900">
            No approved questions found
          </h3>

          <p class="text-slate-500 mt-2">
            There are currently no approved questions available in the Question Bank.
          </p>
        </div>
      `;

      return;
    }

    const subjects = uniqueSorted(
      questions.map(getSubject)
    );

    const levels = uniqueSorted(
      questions.map(getQuestionLevel)
    );

    const examTypes = uniqueSorted(
      questions.map(getExamType)
    );

    container.innerHTML = `
      <div class="space-y-6">

        <!-- HEADER -->

        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                Question Bank
              </h2>

              <p class="text-slate-500 mt-1">
                Practice approved nursing questions from PulsePrep.
              </p>
            </div>

            <div class="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold">
              ${questions.length} Questions
            </div>

          </div>

        </div>

        <!-- FILTERS -->

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">
                Search
              </label>

              <input
                id="pulseprepQuestionSearch"
                type="text"
                placeholder="Search questions..."
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">
                Subject
              </label>

              <select
                id="pulseprepQuestionSubject"
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>

                ${subjects
                  .map(
                    (subject) => `
                      <option value="${escapeHtml(subject)}">
                        ${escapeHtml(subject)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">
                Level
              </label>

              <select
                id="pulseprepQuestionLevel"
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>

                ${levels
                  .map(
                    (level) => `
                      <option value="${escapeHtml(level)}">
                        ${escapeHtml(level)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">
                Exam Type
              </label>

              <select
                id="pulseprepQuestionExamType"
                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>

                ${examTypes
                  .map(
                    (type) => `
                      <option value="${escapeHtml(type)}">
                        ${escapeHtml(type)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>

          </div>

        </div>

        <!-- QUESTIONS -->

        <div id="pulseprepQuestionList" class="space-y-5"></div>

      </div>
    `;

    const searchInput =
      document.getElementById(
        "pulseprepQuestionSearch"
      );

    const subjectSelect =
      document.getElementById(
        "pulseprepQuestionSubject"
      );

    const levelSelect =
      document.getElementById(
        "pulseprepQuestionLevel"
      );

    const examTypeSelect =
      document.getElementById(
        "pulseprepQuestionExamType"
      );

    function applyFilters() {
      const search =
        searchInput?.value
          ?.trim()
          .toLowerCase() || "";

      const subject =
        subjectSelect?.value || "";

      const level =
        levelSelect?.value || "";

      const examType =
        examTypeSelect?.value || "";

      const filtered = questions.filter((question) => {
        const questionText =
          String(question.question || "")
            .toLowerCase();

        const topic =
          String(question.topic || "")
            .toLowerCase();

        const matchesSearch =
          !search ||
          questionText.includes(search) ||
          topic.includes(search);

        const matchesSubject =
          !subject ||
          getSubject(question) === subject;

        const matchesLevel =
          !level ||
          getQuestionLevel(question) === level;

        const matchesExamType =
          !examType ||
          getExamType(question) === examType;

        return (
          matchesSearch &&
          matchesSubject &&
          matchesLevel &&
          matchesExamType
        );
      });

      renderQuestionCards(filtered);
    }

    function renderQuestionCards(filteredQuestions) {
      const list =
        document.getElementById(
          "pulseprepQuestionList"
        );

      if (!list) return;

      if (!filteredQuestions.length) {
        list.innerHTML = `
          <div class="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <div class="text-4xl mb-3">🔎</div>

            <h3 class="text-lg font-extrabold text-slate-900">
              No matching questions
            </h3>

            <p class="text-slate-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        `;

        return;
      }

      list.innerHTML = filteredQuestions
        .map((question, index) => {
          const options = ["a", "b", "c", "d"];

          const correct =
            String(getCorrectAnswer(question))
              .trim()
              .toLowerCase();

          return `
            <article class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              <div class="p-5 border-b border-slate-100">

                <div class="flex flex-wrap gap-2 mb-4">

                  <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    ${escapeHtml(getSubject(question))}
                  </span>

                  <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    ${escapeHtml(getQuestionLevel(question))}
                  </span>

                  <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    ${escapeHtml(getExamType(question))}
                  </span>

                </div>

                <div class="flex gap-3">

                  <div class="font-extrabold text-blue-600">
                    ${index + 1}.
                  </div>

                  <div class="flex-1">

                    <h3 class="font-bold text-slate-900 leading-7">
                      ${escapeHtml(question.question)}
                    </h3>

                    ${
                      question.topic
                        ? `
                          <p class="text-xs text-slate-500 mt-2">
                            Topic: ${escapeHtml(question.topic)}
                          </p>
                        `
                        : ""
                    }

                  </div>

                </div>

              </div>

              <div class="p-5 space-y-3">

                ${options
                  .map((letter) => {
                    const optionValue =
                      getOption(question, letter);

                    const isCorrect =
                      correct === letter ||
                      correct === `option_${letter}` ||
                      correct === `option ${letter}` ||
                      correct === `${letter}.` ||
                      correct === `${letter})`;

                    return `
                      <div
                        class="rounded-xl border ${
                          isCorrect
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200 bg-slate-50"
                        } p-4"
                      >

                        <div class="flex gap-3">

                          <span class="font-extrabold ${
                            isCorrect
                              ? "text-emerald-700"
                              : "text-slate-600"
                          }">
                            ${letter.toUpperCase()}.
                          </span>

                          <span class="text-slate-800">
                            ${escapeHtml(optionValue)}
                          </span>

                        </div>

                      </div>
                    `;
                  })
                  .join("")}

              </div>

              ${
                question.explanation
                  ? `
                    <div class="mx-5 mb-5 rounded-xl bg-blue-50 border border-blue-100 p-4">

                      <div class="font-extrabold text-blue-800 mb-1">
                        Explanation
                      </div>

                      <p class="text-sm text-slate-700 leading-6">
                        ${escapeHtml(question.explanation)}
                      </p>

                    </div>
                  `
                  : ""
              }

            </article>
          `;
        })
        .join("");
    }

    searchInput?.addEventListener(
      "input",
      applyFilters
    );

    subjectSelect?.addEventListener(
      "change",
      applyFilters
    );

    levelSelect?.addEventListener(
      "change",
      applyFilters
    );

    examTypeSelect?.addEventListener(
      "change",
      applyFilters
    );

    renderQuestionCards(questions);
  }

  // ------------------------------------------------------------
  // MAIN QUESTION BANK LOADER
  // ------------------------------------------------------------

  async function loadApprovedPastPapers() {
    const container =
      document.getElementById("questionBankContent");

    if (!container) {
      console.warn(
        "PulsePrep: questionBankContent not found."
      );
      return;
    }

    container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-4xl mb-3">📚</div>

        <h3 class="text-xl font-extrabold text-slate-900">
          Loading Question Bank...
        </h3>

        <p class="text-slate-500 mt-2">
          Loading all approved questions.
        </p>
      </div>
    `;

    try {
      const premium =
        await isPulsePrepPremium();

      if (!premium) {
        showPremiumRequired(
          container,
          "Premium Question Bank",
          "The Question Bank is available to PulsePrep Premium students."
        );

        return;
      }

      await waitForSupabase();

      const questions =
        await fetchApprovedQuestions();

      renderQuestionBank(questions);

    } catch (error) {
      console.error(
        "PulsePrep Question Bank error:",
        error
      );

      if (error.status === 403) {
        showPremiumRequired(
          container,
          "Premium Access Required",
          "Please upgrade your PulsePrep account to access the approved Question Bank."
        );

        return;
      }

      container.innerHTML = `
        <div class="max-w-xl mx-auto text-center py-12 px-6">

          <div class="text-5xl mb-4">⚠️</div>

          <h3 class="text-xl font-extrabold text-slate-900">
            Unable to load Question Bank
          </h3>

          <p class="text-slate-500 mt-2">
            ${escapeHtml(
              error?.message ||
                "Something went wrong while loading the approved questions."
            )}
          </p>

          <button
            type="button"
            onclick="window.PulsePrepLoadApprovedQuestions?.()"
            class="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            Try Again
          </button>

        </div>
      `;
    }
  }

  // ------------------------------------------------------------
  // EXPOSE LOADER
  // ------------------------------------------------------------

  window.PulsePrepLoadApprovedQuestions =
    loadApprovedPastPapers;

  // Backward compatibility
  window.loadApprovedPastPapers =
    loadApprovedPastPapers;

  // ------------------------------------------------------------
  // LOAD WHEN QUESTION BANK TAB OPENS
  // ------------------------------------------------------------

  function hookQuestionBankTab() {
    const originalShowTab =
      window.showTab;

    if (
      typeof originalShowTab !== "function" ||
      originalShowTab.__pulsePrepWrapped
    ) {
      return;
    }

    function wrappedShowTab(tabId, ...args) {
      const result =
        originalShowTab.call(
          this,
          tabId,
          ...args
        );

      if (
        tabId === "question-bank" ||
        tabId === "questionBank"
      ) {
        setTimeout(() => {
          loadApprovedPastPapers();
        }, 50);
      }

      return result;
    }

    wrappedShowTab.__pulsePrepWrapped = true;

    window.showTab = wrappedShowTab;
  }

  // ------------------------------------------------------------
  // INITIALIZE
  // ------------------------------------------------------------

  function initializePulsePrepPremiumGate() {
    hookQuestionBankTab();

    const questionBank =
      document.getElementById(
        "question-bank"
      );

    if (
      questionBank &&
      questionBank.classList.contains("active")
    ) {
      loadApprovedPastPapers();
    }
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializePulsePrepPremiumGate
    );
  } else {
    initializePulsePrepPremiumGate();
  }

})();
