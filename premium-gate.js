// ============================================================
// PULSEP﻿REP — PREMIUM SUBJECT GATE
// ============================================================

(function () {
  "use strict";

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function showPremiumLock() {
    const page =
      document.getElementById("pulseprepSubjectPage") ||
      document.getElementById("subject-page");

    if (!page) return;

    page.innerHTML = `
      <div class="min-h-[60vh] flex items-center justify-center px-4 py-10">
        <div class="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 text-center">

          <div class="mx-auto mb-6 w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
            <i class="fa-solid fa-lock"></i>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wide mb-4">
            <i class="fa-solid fa-crown"></i>
            Premium Learning Library
          </div>

          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Premium Subject Locked
          </h2>

          <p class="text-slate-600 leading-7 mb-7">
            This subject is available to PulsePrep Premium students.
            Upgrade your account to unlock the complete lessons,
            detailed explanations, clinical applications, key points
            and practice questions.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">

            <div class="rounded-2xl bg-slate-50 p-4">
              <i class="fa-solid fa-book-open text-teal-600 mr-2"></i>
              Full lessons
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <i class="fa-solid fa-circle-question text-teal-600 mr-2"></i>
              Practice questions
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <i class="fa-solid fa-stethoscope text-teal-600 mr-2"></i>
              Clinical applications
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <i class="fa-solid fa-bolt text-teal-600 mr-2"></i>
              New premium content
            </div>

          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">

            <button
              type="button"
              onclick="PulsePrepOpenPremiumPlans()"
              class="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition"
            >
              <i class="fa-solid fa-crown mr-2"></i>
              Upgrade to Premium
            </button>

            <button
              type="button"
              onclick="PulsePrepReturnToSubjects()"
              class="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold transition"
            >
              Back to Subjects
            </button>

          </div>

        </div>
      </div>
    `;

    if (typeof window.showTab === "function") {
      try {
        window.showTab("subject-page");
      } catch (error) {
        console.warn(error);
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  // ==========================================================
  // PREMIUM PLANS
  // ==========================================================

  window.PulsePrepOpenPremiumPlans = function () {

  if (typeof window.showTab === "function") {
    try {
      window.showTab("payment");
      return;
    } catch (error) {
      console.warn(error);
    }
  }

  const payment = document.getElementById("payment");

  if (payment) {

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.style.display = "none";
    });

    payment.style.display = "block";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
};

    const pricing =
      document.getElementById("pricing");

    if (pricing) {

      document.querySelectorAll(".tab").forEach(function (tab) {
        tab.style.display = "none";
      });

      pricing.style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };


  // ==========================================================
  // RETURN TO SUBJECT LIBRARY
  // ==========================================================

  window.PulsePrepReturnToSubjects = function () {

    if (typeof window.showTab === "function") {
      try {
        window.showTab("subjects");
        return;
      } catch (error) {
        console.warn(error);
      }
    }

    const subjects =
      document.getElementById("subjects") ||
      document.getElementById("subject-library");

    if (subjects) {

      document.querySelectorAll(".tab").forEach(function (tab) {
        tab.style.display = "none";
      });

      subjects.style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };


  // ==========================================================
  // INSTALL THE GATE
  // ==========================================================

  function installGate() {

    const original =
      window.openPulsePrepSubjectPage;

    if (typeof original !== "function") {
      console.warn(
        "PulsePrep Premium Gate: subject engine not ready yet."
      );

      setTimeout(installGate, 300);

      return;
    }

    // Prevent installing the wrapper twice.
    if (original.__pulsePrepPremiumWrapped) {
      return;
    }

    async function protectedSubjectOpen(subjectId) {

      console.log(
        "PulsePrep Premium Gate checking:",
        subjectId
      );

      try {

        // Wait for Supabase to finish loading.
        let attempts = 0;

        while (
          !window.pulseprepSupabase &&
          attempts < 50
        ) {

          await wait(100);

          attempts++;
        }


        // If the premium checker is unavailable,
        // do NOT expose the subject.
        if (
          typeof window.checkPulsePrepPremium !==
          "function"
        ) {

          showPremiumLock();

          return;
        }


        const status =
          await window.checkPulsePrepPremium();


        console.log(
          "PulsePrep Premium status:",
          status
        );


        // Only TRUE premium users can enter.
        if (
          !status ||
          status.premium !== true
        ) {

          showPremiumLock();

          return;
        }


        // Premium user:
        // use the original subject renderer.
        return original(subjectId);

      } catch (error) {

        console.error(
          "PulsePrep Premium verification error:",
          error
        );

        // Fail closed.
        // If verification fails, don't expose
        // premium content.
        showPremiumLock();
      }
    }


    protectedSubjectOpen.__pulsePrepPremiumWrapped = true;


    window.openPulsePrepSubjectPage =
      protectedSubjectOpen;

    window.openSubjectPage =
      protectedSubjectOpen;

    window.renderSubjectPage =
      protectedSubjectOpen;


    console.log(
      "PulsePrep Premium Subject Gate enabled."
    );
  }


  // ==========================================================
  // WAIT FOR SUBJECT ENGINE
  // ==========================================================

  installGate();

})();
// ============================================================
// PULSEP﻿REP — APPROVED PAST EXAMINATION PAPERS
// ============================================================

(function () {
  "use strict";

  let pastPapersLoaded = false;
  let loadingPastPapers = false;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function loadApprovedPastPapers() {

    if (loadingPastPapers) return;

    const container =
      document.getElementById("questionBankContent");

    if (!container) return;

    loadingPastPapers = true;

    try {

      // Wait for Supabase
      let attempts = 0;

      while (
        !window.pulseprepSupabase &&
        attempts < 50
      ) {
        await new Promise(resolve =>
          setTimeout(resolve, 100)
        );

        attempts++;
      }

      if (!window.pulseprepSupabase) {
        console.warn(
          "PulsePrep: Supabase client not ready."
        );
        return;
      }

      const {
        data: sessionData,
        error: sessionError
      } =
        await window.pulseprepSupabase.auth.getSession();

      if (sessionError) {
        console.error(
          "PulsePrep session error:",
          sessionError
        );
        return;
      }

      const session =
        sessionData?.session;

      if (!session) {
        return;
      }

      const response = await fetch(
        "/.netlify/functions/get-past-questions",
        {
          method: "GET",

          headers: {
            "Authorization":
              `Bearer ${session.access_token}`
          }
        }
      );

      let result = {};

      try {
        result = await response.json();
      } catch (error) {
        console.error(
          "PulsePrep: invalid past-paper response.",
          error
        );
        return;
      }

      if (!response.ok) {

        console.error(
          "PulsePrep past-paper request failed:",
          result
        );

        return;
      }

      const papers =
        Array.isArray(result.questions)
          ? result.questions
          : [];

      let section =
        document.getElementById(
          "pulsePrepPastPapers"
        );

      if (!section) {

        section =
          document.createElement("div");

        section.id =
          "pulsePrepPastPapers";

        section.className =
          "mt-10";

        container.appendChild(section);
      }

      // Remove previous content before rebuilding.
      section.innerHTML = "";

      // No approved papers
      if (papers.length === 0) {

        section.innerHTML = `
          <div class="bg-white rounded-2xl
                      border border-slate-200
                      p-6">

            <div class="flex items-center gap-3">

              <div class="w-12 h-12 rounded-xl
                          bg-slate-100
                          flex items-center
                          justify-center">

                <i class="fa-solid fa-file-pdf
                          text-slate-500
                          text-xl"></i>

              </div>

              <div>

                <h3 class="text-xl font-extrabold
                           text-slate-800">

                  Past Examination Papers

                </h3>

                <p class="text-sm text-slate-500 mt-1">

                  No approved past examination
                  papers are available yet.

                </p>

              </div>

            </div>

          </div>
        `;

        pastPapersLoaded = true;
        return;
      }

      // Render approved papers
      section.innerHTML = `

        <div class="mb-5">

          <div class="inline-flex items-center
                      gap-2 px-3 py-1
                      rounded-full
                      bg-emerald-50
                      text-emerald-700
                      text-xs font-extrabold
                      uppercase">

            <i class="fa-solid fa-file-pdf"></i>

            Past Examination Papers

          </div>

          <h3 class="text-2xl font-extrabold
                     text-slate-900 mt-3">

            Approved Past Papers

          </h3>

          <p class="text-slate-500 mt-1">

            Practice with approved past
            examination papers.

          </p>

        </div>

        <div class="grid grid-cols-1
                    md:grid-cols-2
                    gap-5">

          ${papers.map((paper) => `

            <div
              class="bg-white rounded-2xl
                     border border-slate-200
                     shadow-sm
                     p-5"
            >

              <div class="flex items-start gap-3">

                <div
                  class="w-12 h-12 rounded-xl
                         bg-red-50
                         text-red-600
                         flex items-center
                         justify-center
                         flex-shrink-0"
                >

                  <i class="fa-solid
                            fa-file-pdf
                            text-xl"></i>

                </div>

                <div class="min-w-0">

                  <h4
                    class="font-extrabold
                           text-slate-800
                           break-words"
                  >
                    ${escapeHtml(
                      paper.file_name ||
                      "Past Examination Paper"
                    )}
                  </h4>

                  <p
                    class="text-sm
                           text-slate-500
                           mt-1"
                  >
                    ${escapeHtml(
                      paper.school ||
                      "Nursing School"
                    )}
                  </p>

                </div>

              </div>

              <div class="flex flex-wrap gap-2 mt-4">

                ${
                  paper.subject
                    ? `
                      <span
                        class="px-2.5 py-1
                               rounded-lg
                               bg-blue-50
                               text-blue-700
                               text-xs
                               font-semibold"
                      >
                        ${escapeHtml(
                          paper.subject
                        )}
                      </span>
                    `
                    : ""
                }

                ${
                  paper.level
                    ? `
                      <span
                        class="px-2.5 py-1
                               rounded-lg
                               bg-purple-50
                               text-purple-700
                               text-xs
                               font-semibold"
                      >
                        ${escapeHtml(
                          paper.level
                        )}
                      </span>
                    `
                    : ""
                }

                ${
                  paper.exam_type
                    ? `
                      <span
                        class="px-2.5 py-1
                               rounded-lg
                               bg-amber-50
                               text-amber-700
                               text-xs
                               font-semibold"
                      >
                        ${escapeHtml(
                          paper.exam_type
                        )}
                      </span>
                    `
                    : ""
                }

                ${
                  paper.academic_year
                    ? `
                      <span
                        class="px-2.5 py-1
                               rounded-lg
                               bg-slate-100
                               text-slate-700
                               text-xs
                               font-semibold"
                      >
                        ${escapeHtml(
                          paper.academic_year
                        )}
                      </span>
                    `
                    : ""
                }

              </div>

              ${
                paper.programme
                  ? `
                    <p
                      class="text-sm
                             text-slate-500
                             mt-4"
                    >
                      <strong>Programme:</strong>
                      ${escapeHtml(
                        paper.programme
                      )}
                    </p>
                  `
                  : ""
              }

              <button
                type="button"
                class="w-full mt-5
                       bg-teal-600
                       hover:bg-teal-700
                       text-white
                       py-3
                       rounded-xl
                       font-bold
                       transition"
                onclick="openPulsePrepPastPaper('${escapeHtml(
                  paper.id
                )}')"
              >

                <i class="fa-solid
                          fa-folder-open
                          mr-2"></i>

                Open Past Paper

              </button>

            </div>

          `).join("")}

        </div>
      `;

      pastPapersLoaded = true;

      console.log(
        "PulsePrep: approved past papers loaded:",
        papers.length
      );

    } catch (error) {

      console.error(
        "PulsePrep past-paper loading error:",
        error
      );

    } finally {

      loadingPastPapers = false;
    }
  }


  // ==========================================================
  // OPEN PAST PAPER
  // ==========================================================

  window.openPulsePrepPastPaper =
    async function (paperId) {

      try {

        if (!paperId) {
          alert(
            "Past paper ID is missing."
          );
          return;
        }

        let attempts = 0;

        while (
          !window.pulseprepSupabase &&
          attempts < 50
        ) {

          await new Promise(resolve =>
            setTimeout(resolve, 100)
          );

          attempts++;
        }

        if (!window.pulseprepSupabase) {

          alert(
            "PulsePrep is still loading. Please try again."
          );

          return;
        }

        const {
          data: sessionData,
          error: sessionError
        } =
          await window.pulseprepSupabase.auth.getSession();

        if (
          sessionError ||
          !sessionData?.session
        ) {

          alert(
            "Please log in to open this past paper."
          );

          return;
        }

        const token =
          sessionData.session.access_token;

        const response =
          await fetch(
            `/.netlify/functions/get-past-question-file?id=${encodeURIComponent(
              paperId
            )}`,
            {
              method: "GET",

              headers: {
                "Authorization":
                  `Bearer ${token}`
              }
            }
          );

        const result =
          await response.json();

        if (!response.ok) {

          if (response.status === 403) {

            alert(
              "Premium access is required to open this past paper."
            );

            if (
              typeof window.showTab ===
              "function"
            ) {
              window.showTab("payment");
            }

            return;
          }

          if (response.status === 401) {

            alert(
              "Your login session has expired. Please log in again."
            );

            if (
              typeof window.showTab ===
              "function"
            ) {
              window.showTab("account");
            }

            return;
          }

          alert(
            result.error ||
            "Unable to open this past paper."
          );

          return;
        }

        if (
          !result ||
          !result.success ||
          !result.url
        ) {

          alert(
            "The past paper file could not be opened."
          );

          return;
        }

        window.open(
          result.url,
          "_blank",
          "noopener,noreferrer"
        );

      } catch (error) {

        console.error(
          "PulsePrep open past paper error:",
          error
        );

        alert(
          "Unable to open the past paper right now."
        );
      }
    };


  // ==========================================================
  // WATCH FOR QUESTION BANK
  // ==========================================================

  function setupQuestionBankWatcher() {

    let attempts = 0;

    const timer =
      setInterval(() => {

        attempts++;

        const container =
          document.getElementById(
            "questionBankContent"
          );

        if (!container) {

          if (attempts > 120) {
            clearInterval(timer);
          }

          return;
        }

        clearInterval(timer);

        /*
         * Load immediately if the Question Bank
         * already exists.
         */
        loadApprovedPastPapers();

        /*
         * Watch the Question Bank for changes.
         *
         * The main Question Bank renderer can
         * rebuild its HTML. When that happens,
         * make sure the past-paper section is
         * still present.
         */
        const observer =
          new MutationObserver(() => {

            if (
              document.getElementById(
                "questionBankContent"
              ) &&
              !document.getElementById(
                "pulsePrepPastPapers"
              )
            ) {

              if (!loadingPastPapers) {
                loadApprovedPastPapers();
              }

            }

          });

        observer.observe(
          container,
          {
            childList: true,
            subtree: true
          }
        );

      }, 250);
  }


  setupQuestionBankWatcher();


  // ==========================================================
  // ALSO LOAD WHEN QUESTION BANK TAB IS OPENED
  // ==========================================================

  function watchShowTab() {

    if (
      typeof window.showTab !==
      "function"
    ) {

      setTimeout(
        watchShowTab,
        300
      );

      return;
    }

    if (
      window.showTab
        .__pulsePrepPastPaperWrapped
    ) {
      return;
    }

    const originalShowTab =
      window.showTab;

    window.showTab =
      function () {

        const result =
          originalShowTab.apply(
            this,
            arguments
          );

        const tabName =
          arguments[0];

        if (
          tabName === "question-bank"
        ) {

          setTimeout(
            loadApprovedPastPapers,
            300
          );

          setTimeout(
            loadApprovedPastPapers,
            1000
          );
        }

        return result;
      };

    window.showTab
      .__pulsePrepPastPaperWrapped = true;
  }


  watchShowTab();

})();
  // ==========================================================
  // OPEN APPROVED PAST PAPER
  // ==========================================================
  window.openPulsePrepPastPaper =
    async function (paperId) {
      try {
        if (!paperId) {
          alert(
            "Past paper ID is missing."
          );
          return;
        }
        let attempts = 0;
        while (
          !window.pulseprepSupabase &&
          attempts < 50
        ) {
          await new Promise(resolve =>
            setTimeout(resolve, 100)
          );
          attempts++;
        }
        if (!window.pulseprepSupabase) {
          alert(
            "PulsePrep is still loading. Please try again."
          );
          return;
        }
        const {
          data: sessionData,
          error: sessionError
        } =
          await window.pulseprepSupabase.auth.getSession();
        if (
          sessionError ||
          !sessionData?.session?.access_token
        ) {
          alert(
            "Please log in to open this past paper."
          );
          return;
        }
        const token =
          sessionData.session.access_token;
        const response = await fetch(
          `/.netlify/functions/get-past-question-file?id=${encodeURIComponent(
            paperId
          )}`,
          {
            method: "GET",
            headers: {
              "Authorization":
                `Bearer ${token}`
            }
          }
        );
        const result =
          await response.json();
        if (!response.ok) {
          alert(
            result.error ||
            "Unable to open this past paper."
          );
          return;
        }
        if (!result.url) {
          alert(
            "The past paper file could not be opened."
          );
          return;
        }
        window.open(
          result.url,
          "_blank",
          "noopener,noreferrer"
        );
      } catch (error) {
        console.error(
          "Open past paper error:",
          error
        );
        alert(
          "Unable to open the past paper. Please try again."
        );
      }
    };
  // ==========================================================
  // HTML SAFETY
  // ==========================================================
  function escapePastPaperHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  // ==========================================================
  // AUTOMATICALLY LOAD PAST PAPERS
  // ==========================================================
  function installPastPaperLoader() {
    if (
      typeof window.loadQuestionBank !==
      "function"
    ) {
      setTimeout(
        installPastPaperLoader,
        500
      );
      return;
    }
    if (
      window.loadQuestionBank
        .__pulsePrepPastPapersWrapped
    ) {
      return;
    }
    const originalLoadQuestionBank =
      window.loadQuestionBank;
    async function combinedQuestionBankLoader() {
      await originalLoadQuestionBank();
      await loadApprovedPastPapers();
    }
    combinedQuestionBankLoader
      .__pulsePrepPastPapersWrapped = true;
    window.loadQuestionBank =
      combinedQuestionBankLoader;
  }
  installPastPaperLoader();
})();
