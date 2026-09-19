// ============================================================
// PULSEPREP — PREMIUM SUBJECT GATE
// ============================================================

(function () {
  "use strict";

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ==========================================================
  // PREMIUM SUBJECT LOCK
  // ==========================================================

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

    const payment =
      document.getElementById("payment");

    if (payment) {

      document.querySelectorAll(".tab").forEach(function (tab) {
        tab.style.display = "none";
      });

      payment.style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }

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

      return;
    }

    console.warn(
      "PulsePrep: payment/pricing section was not found."
    );
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
  // INSTALL PREMIUM SUBJECT GATE
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

    if (original.__pulsePrepPremiumWrapped) {
      return;
    }

    async function protectedSubjectOpen(subjectId) {

      console.log(
        "PulsePrep Premium Gate checking:",
        subjectId
      );

      try {

        let attempts = 0;

        while (
          !window.pulseprepSupabase &&
          attempts < 50
        ) {

          await wait(100);
          attempts++;
        }

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

        if (
          !status ||
          status.premium !== true
        ) {

          showPremiumLock();
          return;
        }

        return original(subjectId);

      } catch (error) {

        console.error(
          "PulsePrep Premium verification error:",
          error
        );

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
  // START SUBJECT GATE
  // ==========================================================

  installGate();

})();


// ============================================================
// PULSEPREP — APPROVED PAST EXAMINATION PAPERS / QUESTION BANK
// ============================================================

(function () {
  "use strict";

  let pastPapersLoaded = false;
  let loadingPastPapers = false;

  // ==========================================================
  // QUESTION BANK FRESH LOGIN PROTECTION
  // ==========================================================

  let questionBankUnlocked = false;
  let questionBankAuthWatcherStarted = false;

  function setupQuestionBankAuthGuard() {

    if (questionBankAuthWatcherStarted) {
      return;
    }

    questionBankAuthWatcherStarted = true;

    let attempts = 0;

    const timer = setInterval(() => {

      attempts++;

      if (!window.pulseprepSupabase) {

        if (attempts > 100) {
          clearInterval(timer);
          questionBankAuthWatcherStarted = false;
        }

        return;
      }

      clearInterval(timer);

      // Check the session that already exists
      // before waiting for a new SIGNED_IN event.

      window.pulseprepSupabase.auth.getSession()
        .then(({ data, error }) => {

          if (error) {

            console.error(
              "PulsePrep Question Bank initial session check error:",
              error
            );

            return;
          }

          const currentSession =
            data?.session;

          if (currentSession) {

            questionBankUnlocked = true;

            pastPapersLoaded = false;

            console.log(
              "PulsePrep Question Bank unlocked from existing login."
            );

            setTimeout(
              loadApprovedPastPapers,
              100
            );
          }

        })
        .catch(error => {

          console.error(
            "PulsePrep Question Bank initial auth check failed:",
            error
          );

        });

      window.pulseprepSupabase.auth.onAuthStateChange(
        (event, session) => {

          console.log(
            "PulsePrep Question Bank auth event:",
            event
          );

          // --------------------------------------------------
          // FRESH LOGIN
          // --------------------------------------------------

          if (
            event === "SIGNED_IN" &&
            session
          ) {

            questionBankUnlocked = true;

            pastPapersLoaded = false;

            const container =
              document.getElementById(
                "questionBankContent"
              );

            if (container) {

              const loginHeading =
                Array.from(
                  container.querySelectorAll("h3")
                ).find(
                  heading =>
                    heading.textContent.trim() ===
                    "Login Required"
                );

              if (loginHeading) {

                const loginCard =
                  loginHeading.closest(".max-w-xl");

                if (loginCard) {
                  loginCard.remove();
                }
              }
            }

            console.log(
              "PulsePrep Question Bank unlocked after fresh login."
            );

            setTimeout(
              loadApprovedPastPapers,
              100
            );
          }

          // --------------------------------------------------
          // LOGOUT
          // --------------------------------------------------

          if (
            event === "SIGNED_OUT"
          ) {

            questionBankUnlocked = false;
            pastPapersLoaded = false;

            const container =
              document.getElementById(
                "questionBankContent"
              );

            if (container) {
              container.innerHTML = "";
            }

            console.log(
              "PulsePrep Question Bank locked after logout."
            );
          }

        }
      );

    }, 100);
  }

  // ==========================================================
  // HTML SAFETY
  // ==========================================================

  function escapeHtml(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================================
  // LOAD APPROVED QUESTIONS
  // ==========================================================

  async function loadApprovedPastPapers() {

    if (loadingPastPapers) {
      return;
    }

    const container =
      document.getElementById(
        "questionBankContent"
      );

    if (!container) {
      return;
    }

    loadingPastPapers = true;

    try {

      // ------------------------------------------------------
      // WAIT FOR SUPABASE
      // ------------------------------------------------------

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

        container.innerHTML = `
          <div class="text-center py-10">

            <div class="text-4xl mb-3">
              ⏳
            </div>

            <h3 class="text-xl font-extrabold text-slate-900">
              PulsePrep is still loading
            </h3>

            <p class="text-slate-500 mt-2">
              Please wait a moment and try again.
            </p>

          </div>
        `;

        return;
      }

      // ------------------------------------------------------
      // GET CURRENT SESSION
      // ------------------------------------------------------

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

        container.innerHTML = `
          <div class="text-center py-10">

            <div class="text-4xl mb-3">
              ⚠️
            </div>

            <h3 class="text-xl font-extrabold text-slate-900">
              Unable to check your login
            </h3>

            <p class="text-slate-500 mt-2">
              Please refresh the page and try again.
            </p>

          </div>
        `;

        return;
      }

      const session =
        sessionData?.session;

      // ------------------------------------------------------
      // FRESH LOGIN REQUIRED
      // ------------------------------------------------------

      if (!questionBankUnlocked) {

        container.innerHTML = `
          <div class="max-w-xl mx-auto py-10">

            <div class="bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        shadow-sm
                        p-8
                        text-center">

              <div class="w-16 h-16
                          mx-auto
                          rounded-2xl
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          text-3xl">

                🔐

              </div>

              <h3 class="text-2xl
                         font-extrabold
                         text-slate-900
                         mt-5">

                Login Required

              </h3>

              <p class="text-slate-500
                        mt-2
                        leading-6">

                Please log in again to access the PulsePrep
                Question Bank.

              </p>

              <button
                type="button"
                onclick="showTab('account')"
                class="mt-6
                       inline-flex
                       items-center
                       justify-center
                       gap-2
                       px-6
                       py-3
                       rounded-xl
                       bg-blue-600
                       text-white
                       font-bold
                       hover:bg-blue-700
                       transition">

                <i class="fa-solid fa-right-to-bracket"></i>

                Login to PulsePrep

              </button>

            </div>

          </div>
        `;

        return;
      }

      // ------------------------------------------------------
      // SESSION REQUIRED
      // ------------------------------------------------------

      if (!session) {

        console.warn(
          "PulsePrep: No active session."
        );

        container.innerHTML = `
          <div class="max-w-xl mx-auto py-10">

            <div class="bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        shadow-sm
                        p-8
                        text-center">

              <div class="w-16 h-16
                          mx-auto
                          rounded-2xl
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          text-3xl">

                🔐

              </div>

              <h3 class="text-2xl
                         font-extrabold
                         text-slate-900
                         mt-5">

                Login Required

              </h3>

              <p class="text-slate-500
                        mt-2
                        leading-6">

                Please log in with your email and password
                to access the PulsePrep Question Bank.

              </p>

              <button
                type="button"
                onclick="showTab('account')"
                class="mt-6
                       inline-flex
                       items-center
                       justify-center
                       gap-2
                       px-6
                       py-3
                       rounded-xl
                       bg-blue-600
                       text-white
                       font-bold
                       hover:bg-blue-700
                       transition">

                <i class="fa-solid fa-right-to-bracket"></i>

                Login to PulsePrep

              </button>

            </div>

          </div>
        `;

        return;
      }

      // ------------------------------------------------------
      // LOAD ALL APPROVED EXAM VAULT QUESTIONS
      // ------------------------------------------------------

      let allQuestions = [];

      let page = 1;

      const limit = 100;

      let totalPages = 1;

      do {

        const url =
          `/.netlify/functions/get-exam-vault-questions?page=${page}&limit=${limit}`;

        console.log(
          `PulsePrep: Loading Exam Vault page ${page}...`
        );

        const response =
          await fetch(
            url,
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

          result =
            await response.json();

        } catch (error) {

          console.error(
            "PulsePrep: Invalid Exam Vault response.",
            error
          );

          container.innerHTML = `
            <div class="text-center py-10">

              <div class="text-4xl mb-3">
                ⚠️
              </div>

              <h3 class="text-xl font-extrabold text-slate-900">
                Unable to load Question Bank
              </h3>

              <p class="text-slate-500 mt-2">
                The server returned an invalid response.
                Please try again.
              </p>

            </div>
          `;

          return;
        }

        // ----------------------------------------------------
        // SERVER ERROR
        // ----------------------------------------------------

        if (!response.ok) {

          console.error(
            "PulsePrep Exam Vault request failed:",
            result
          );

          // --------------------------------------------------
          // PREMIUM REQUIRED
          // --------------------------------------------------

          if (
            response.status === 403 &&
            result.premiumRequired
          ) {

            container.innerHTML = `
              <div class="max-w-xl mx-auto py-10">

                <div class="bg-white
                            rounded-2xl
                            border
                            border-amber-200
                            shadow-sm
                            p-8
                            text-center">

                  <div class="w-16 h-16
                              mx-auto
                              rounded-2xl
                              bg-amber-50
                              text-amber-600
                              flex
                              items-center
                              justify-center
                              text-3xl">

                    👑

                  </div>

                  <h3 class="text-2xl
                             font-extrabold
                             text-slate-900
                             mt-5">

                    Premium Access Required

                  </h3>

                  <p class="text-slate-500
                            mt-2
                            leading-6">

                    The PulsePrep Question Bank is available
                    to Premium students. Upgrade your account
                    to access all approved exam questions.

                  </p>

                  <button
                    type="button"
                    onclick="showTab('payment')"
                    class="mt-6
                           inline-flex
                           items-center
                           justify-center
                           gap-2
                           px-6
                           py-3
                           rounded-xl
                           bg-amber-500
                           text-white
                           font-bold
                           hover:bg-amber-600
                           transition">

                    <i class="fa-solid fa-crown"></i>

                    Upgrade to Premium

                  </button>

                </div>

              </div>
            `;

            return;
          }

          // --------------------------------------------------
          // EXPIRED SESSION
          // --------------------------------------------------

          if (response.status === 401) {

            container.innerHTML = `
              <div class="max-w-xl mx-auto py-10">

                <div class="bg-white
                            rounded-2xl
                            border
                            border-red-200
                            shadow-sm
                            p-8
                            text-center">

                  <div class="text-4xl mb-3">
                    🔐
                  </div>

                  <h3 class="text-2xl
                             font-extrabold
                             text-slate-900">

                    Session Expired

                  </h3>

                  <p class="text-slate-500 mt-2">

                    Please log in again to continue
                    using the Question Bank.

                  </p>

                  <button
                    type="button"
                    onclick="showTab('account')"
                    class="mt-6
                           inline-flex
                           items-center
                           justify-center
                           gap-2
                           px-6
                           py-3
                           rounded-xl
                           bg-blue-600
                           text-white
                           font-bold
                           hover:bg-blue-700
                           transition">

                    <i class="fa-solid fa-right-to-bracket"></i>

                    Log In Again

                  </button>

                </div>

              </div>
            `;

            return;
          }

          // --------------------------------------------------
          // OTHER SERVER ERROR
          // --------------------------------------------------

          container.innerHTML = `
            <div class="text-center py-10">

              <div class="text-4xl mb-3">
                ⚠️
              </div>

              <h3 class="text-xl font-extrabold text-slate-900">
                Question Bank Unavailable
              </h3>

              <p class="text-slate-500 mt-2">
                ${
                  escapeHtml(
                    result.error ||
                    "Unable to load the approved questions right now."
                  )
                }
              </p>

            </div>
          `;

          return;
        }

        // ----------------------------------------------------
        // RECEIVE QUESTIONS
        // ----------------------------------------------------

        const questions =
          Array.isArray(result.questions)
            ? result.questions
            : [];

        allQuestions =
          allQuestions.concat(questions);

        totalPages =
          Number(result.totalPages || 1);

        console.log(
          `PulsePrep: Exam Vault page ${page}/${totalPages} loaded.`
        );

        page++;

        // Safety protection
        if (page > 1000) {

          console.error(
            "PulsePrep: Pagination safety limit reached."
          );

          break;
        }

      } while (page <= totalPages);

      // ------------------------------------------------------
      // REMOVE DUPLICATES
      // ------------------------------------------------------

      const uniqueQuestions = [];

      const seenIds =
        new Set();

      allQuestions.forEach(question => {

        const id =
          question?.id;

        if (
          id !== undefined &&
          id !== null
        ) {

          if (seenIds.has(id)) {
            return;
          }

          seenIds.add(id);
        }

        uniqueQuestions.push(
          question
        );

      });

      const papers =
        uniqueQuestions;

      console.log(
        `PulsePrep: ${papers.length} approved Exam Vault questions loaded.`
      );

      // ------------------------------------------------------
      // CREATE / FIND DISPLAY SECTION
      // ------------------------------------------------------

      const loadingPlaceholder =
        container.querySelector("h3");

      if (
        loadingPlaceholder &&
        loadingPlaceholder.textContent.includes(
          "Loading Question Bank"
        )
      ) {

        const placeholderWrapper =
          loadingPlaceholder.closest(
            ".text-center"
          );

        if (placeholderWrapper) {
          placeholderWrapper.remove();
        }
      }

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

        container.appendChild(
          section
        );
      }

      section.innerHTML = "";

      // ------------------------------------------------------
      // NO APPROVED QUESTIONS
      // ------------------------------------------------------

      if (papers.length === 0) {

        section.innerHTML = `
          <div class="bg-white
                      rounded-2xl
                      border
                      border-slate-200
                      p-6">

            <div class="flex items-center gap-3">

              <div class="w-12 h-12
                          rounded-xl
                          bg-slate-100
                          flex
                          items-center
                          justify-center">

                <i class="fa-solid
                          fa-circle-question
                          text-slate-500
                          text-xl"></i>

              </div>

              <div>

                <h3 class="text-xl
                           font-extrabold
                           text-slate-800">

                  Exam Vault

                </h3>

                <p class="text-sm
                          text-slate-500
                          mt-1">

                  No approved Exam Vault questions
                  are available yet.

                </p>

              </div>

            </div>

          </div>
        `;

        pastPapersLoaded = true;

        return;
      }

      // ------------------------------------------------------
      // GROUP QUESTIONS BY SUBJECT
      // ------------------------------------------------------

      const grouped = {};

      papers.forEach(question => {

        const subject =
          String(
            question?.subject ||
            "Other"
          ).trim() || "Other";

        if (!grouped[subject]) {
          grouped[subject] = [];
        }

        grouped[subject].push(
          question
        );

      });

      // ------------------------------------------------------
      // RENDER EXAM VAULT
      // ------------------------------------------------------

      section.innerHTML = `

        <div class="mb-6">

          <div class="inline-flex
                      items-center
                      gap-2
                      px-3
                      py-1
                      rounded-full
                      bg-emerald-50
                      text-emerald-700
                      text-xs
                      font-extrabold
                      uppercase">

            <i class="fa-solid fa-shield-check"></i>

            Exam Vault

          </div>

          <h3 class="text-2xl
                     font-extrabold
                     text-slate-900
                     mt-3">

            Approved Exam Questions

          </h3>

          <p class="text-slate-500 mt-1">

            ${papers.length} approved questions
            available for Premium students.

          </p>

        </div>

        <div class="space-y-6">

          ${Object.entries(grouped)
            .map(
              ([subject, questions]) => `

                <div class="bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            shadow-sm
                            overflow-hidden">

                  <div class="px-5 py-4
                              bg-slate-50
                              border-b
                              border-slate-200">

                    <div class="flex
                                items-center
                                justify-between
                                gap-3">

                      <h4 class="font-extrabold
                                 text-slate-800">

                        ${escapeHtml(subject)}

                      </h4>

                      <span class="px-3 py-1
                                   rounded-full
                                   bg-teal-50
                                   text-teal-700
                                   text-xs
                                   font-bold">

                        ${questions.length}
                        questions

                      </span>

                    </div>

                  </div>

                  <div class="divide-y
                              divide-slate-100">

                    ${questions
                      .map(
                        (question, index) => `

                          <div class="p-5">

                            <div class="flex
                                        items-start
                                        gap-3">

                              <div class="w-8 h-8
                                          rounded-lg
                                          bg-teal-50
                                          text-teal-700
                                          flex
                                          items-center
                                          justify-center
                                          font-bold
                                          text-sm
                                          flex-shrink-0">

                                ${index + 1}

                              </div>

                              <div class="min-w-0
                                          flex-1">

                                <p class="font-bold
                                          text-slate-800
                                          leading-7">

                                  ${escapeHtml(
                                    question.question ||
                                    ""
                                  )}

                                </p>

                                <div class="grid
                                            grid-cols-1
                                            sm:grid-cols-2
                                            gap-2
                                            mt-4">

                                  <div class="p-3
                                              rounded-xl
                                              bg-slate-50
                                              border
                                              border-slate-100">

                                    <strong>A.</strong>

                                    ${escapeHtml(
                                      question.option_a ||
                                      ""
                                    )}

                                  </div>

                                  <div class="p-3
                                              rounded-xl
                                              bg-slate-50
                                              border
                                              border-slate-100">

                                    <strong>B.</strong>

                                    ${escapeHtml(
                                      question.option_b ||
                                      ""
                                    )}

                                  </div>

                                  <div class="p-3
                                              rounded-xl
                                              bg-slate-50
                                              border
                                              border-slate-100">

                                    <strong>C.</strong>

                                    ${escapeHtml(
                                      question.option_c ||
                                      ""
                                    )}

                                  </div>

                                  <div class="p-3
                                              rounded-xl
                                              bg-slate-50
                                              border
                                              border-slate-100">

                                    <strong>D.</strong>

                                    ${escapeHtml(
                                      question.option_d ||
                                      ""
                                    )}

                                  </div>

                                </div>

                                <div class="flex
                                            flex-wrap
                                            gap-2
                                            mt-4">

                                  ${
                                    question.topic
                                      ? `
                                        <span
                                          class="px-2.5
                                                 py-1
                                                 rounded-lg
                                                 bg-blue-50
                                                 text-blue-700
                                                 text-xs
                                                 font-semibold">

                                          ${escapeHtml(
                                            question.topic
                                          )}

                                        </span>
                                      `
                                      : ""
                                  }

                                  ${
                                    question.difficulty
                                      ? `
                                        <span
                                          class="px-2.5
                                                 py-1
                                                 rounded-lg
                                                 bg-purple-50
                                                 text-purple-700
                                                 text-xs
                                                 font-semibold">

                                          ${escapeHtml(
                                            question.difficulty
                                          )}

                                        </span>
                                      `
                                      : ""
                                  }

                                  ${
                                    question.academic_year
                                      ? `
                                        <span
                                          class="px-2.5
                                                 py-1
                                                 rounded-lg
                                                 bg-amber-50
                                                 text-amber-700
                                                 text-xs
                                                 font-semibold">

                                          ${escapeHtml(
                                            question.academic_year
                                          )}

                                        </span>
                                      `
                                      : ""
                                  }

                                </div>

                                ${
                                  question.explanation
                                    ? `
                                      <div
                                        class="mt-4
                                               p-4
                                               rounded-xl
                                               bg-emerald-50
                                               border
                                               border-emerald-100">

                                        <p class="text-sm
                                                  font-bold
                                                  text-emerald-800
                                                  mb-1">

                                          Explanation

                                        </p>

                                        <p class="text-sm
                                                  text-emerald-900
                                                  leading-6">

                                          ${escapeHtml(
                                            question.explanation
                                          )}

                                        </p>

                                      </div>
                                    `
                                    : ""
                                }

                              </div>

                            </div>

                          </div>

                        `
                      )
                      .join("")}

                  </div>

                </div>

              `
            )
            .join("")}

        </div>
      `;

      // ======================================================
      // QUESTION BANK SEARCH + FILTERS
      //
      // IMPORTANT:
      // This MUST run AFTER section.innerHTML has rendered
      // the questions.
      // ======================================================

      (function setupPulsePrepQuestionBankFilters() {

        const existingFilters =
          document.getElementById(
            "pulsePrepQuestionBankFilters"
          );

        if (existingFilters) {
          existingFilters.remove();
        }

        // ----------------------------------------------------
        // COLLECT FILTER VALUES
        // ----------------------------------------------------

        const subjects =
          new Set();

        const topics =
          new Set();

        const difficulties =
          new Set();

        papers.forEach(question => {

          const subject =
            String(
              question?.subject ||
              "Other"
            ).trim();

          const topic =
            String(
              question?.topic ||
              ""
            ).trim();

          const difficulty =
            String(
              question?.difficulty ||
              ""
            ).trim();

          if (subject) {
            subjects.add(subject);
          }

          if (topic) {
            topics.add(topic);
          }

          if (difficulty) {
            difficulties.add(difficulty);
          }

        });

        // ----------------------------------------------------
        // CREATE FILTER BAR
        // ----------------------------------------------------

        const filterBar =
          document.createElement("div");

        filterBar.id =
          "pulsePrepQuestionBankFilters";

        filterBar.className =
          "mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5";

        filterBar.innerHTML = `
          <div class="flex flex-col gap-4">

            <div>

              <h4 class="text-lg font-extrabold text-slate-900">
                Find Questions
              </h4>

              <p class="text-sm text-slate-500 mt-1">
                Search or filter the approved Question Bank.
              </p>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

              <!-- SEARCH -->

              <div>

                <label
                  for="pulsePrepQuestionSearch"
                  class="block text-xs font-bold text-slate-600 mb-1">

                  Search

                </label>

                <div class="relative">

                  <i
                    class="fa-solid
                           fa-magnifying-glass
                           absolute
                           left-3
                           top-1/2
                           -translate-y-1/2
                           text-slate-400">
                  </i>

                  <input
                    id="pulsePrepQuestionSearch"
                    type="search"
                    placeholder="Search questions..."
                    autocomplete="off"
                    class="w-full
                           rounded-xl
                           border
                           border-slate-300
                           pl-10
                           pr-4
                           py-3
                           text-sm
                           outline-none
                           focus:ring-2
                           focus:ring-teal-500
                           focus:border-teal-500"
                  />

                </div>

              </div>

              <!-- SUBJECT -->

              <div>

                <label
                  for="pulsePrepQuestionSubjectFilter"
                  class="block text-xs font-bold text-slate-600 mb-1">

                  Subject

                </label>

                <select
                  id="pulsePrepQuestionSubjectFilter"
                  class="w-full
                         rounded-xl
                         border
                         border-slate-300
                         bg-white
                         px-4
                         py-3
                         text-sm
                         outline-none
                         focus:ring-2
                         focus:ring-teal-500">

                  <option value="">
                    All Subjects
                  </option>

                </select>

              </div>

              <!-- TOPIC -->

              <div>

                <label
                  for="pulsePrepQuestionTopicFilter"
                  class="block text-xs font-bold text-slate-600 mb-1">

                  Topic

                </label>

                <select
                  id="pulsePrepQuestionTopicFilter"
                  class="w-full
                         rounded-xl
                         border
                         border-slate-300
                         bg-white
                         px-4
                         py-3
                         text-sm
                         outline-none
                         focus:ring-2
                         focus:ring-teal-500">

                  <option value="">
                    All Topics
                  </option>

                </select>

              </div>

              <!-- DIFFICULTY -->

              <div>

                <label
                  for="pulsePrepQuestionDifficultyFilter"
                  class="block text-xs font-bold text-slate-600 mb-1">

                  Difficulty

                </label>

                <select
                  id="pulsePrepQuestionDifficultyFilter"
                  class="w-full
                         rounded-xl
                         border
                         border-slate-300
                         bg-white
                         px-4
                         py-3
                         text-sm
                         outline-none
                         focus:ring-2
                         focus:ring-teal-500">

                  <option value="">
                    All Difficulties
                  </option>

                </select>

              </div>

            </div>

            <!-- RESULT COUNT + CLEAR -->

            <div class="flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3">

              <div
                id="pulsePrepQuestionBankFilterCount"
                class="text-sm font-bold text-slate-600">

              </div>

              <button
                type="button"
                id="pulsePrepClearQuestionFilters"
                class="inline-flex
                       items-center
                       justify-center
                       gap-2
                       px-4
                       py-2.5
                       rounded-xl
                       border
                       border-slate-300
                       text-slate-700
                       font-bold
                       hover:bg-slate-50
                       transition">

                <i class="fa-solid fa-rotate-left"></i>

                Clear Filters

              </button>

            </div>

          </div>
        `;

        // ----------------------------------------------------
        // INSERT FILTER BAR
        // ----------------------------------------------------

        const questionBankSection =
          document.getElementById(
            "pulsePrepPastPapers"
          );

        if (!questionBankSection) {

          console.warn(
            "PulsePrep: Question Bank section not found for filters."
          );

          return;
        }

        const sectionHeader =
          questionBankSection.firstElementChild;

        if (sectionHeader) {

          sectionHeader.insertAdjacentElement(
            "afterend",
            filterBar
          );

        } else {

          questionBankSection.prepend(
            filterBar
          );

        }

        // ----------------------------------------------------
        // GET FILTER ELEMENTS
        // ----------------------------------------------------

        const searchInput =
          document.getElementById(
            "pulsePrepQuestionSearch"
          );

        const subjectFilter =
          document.getElementById(
            "pulsePrepQuestionSubjectFilter"
          );

        const topicFilter =
          document.getElementById(
            "pulsePrepQuestionTopicFilter"
          );

        const difficultyFilter =
          document.getElementById(
            "pulsePrepQuestionDifficultyFilter"
          );

        const countDisplay =
          document.getElementById(
            "pulsePrepQuestionBankFilterCount"
          );

        const clearButton =
          document.getElementById(
            "pulsePrepClearQuestionFilters"
          );

        if (
          !searchInput ||
          !subjectFilter ||
          !topicFilter ||
          !difficultyFilter ||
          !countDisplay ||
          !clearButton
        ) {

          console.warn(
            "PulsePrep: Question Bank filter elements were not created correctly."
          );

          return;
        }

        // ----------------------------------------------------
        // SUBJECT OPTIONS
        // ----------------------------------------------------

        Array.from(subjects)
          .sort((a, b) =>
            a.localeCompare(b)
          )
          .forEach(subject => {

            const option =
              document.createElement(
                "option"
              );

            option.value =
              subject.toLowerCase();

            option.textContent =
              subject;

            subjectFilter.appendChild(
              option
            );

          });

        // ----------------------------------------------------
        // TOPIC OPTIONS
        // ----------------------------------------------------

        Array.from(topics)
          .sort((a, b) =>
            a.localeCompare(b)
          )
          .forEach(topic => {

            const option =
              document.createElement(
                "option"
              );

            option.value =
              topic.toLowerCase();

            option.textContent =
              topic;

            topicFilter.appendChild(
              option
            );

          });

        // ----------------------------------------------------
        // DIFFICULTY OPTIONS
        // ----------------------------------------------------

        Array.from(difficulties)
          .sort((a, b) =>
            a.localeCompare(b)
          )
          .forEach(difficulty => {

            const option =
              document.createElement(
                "option"
              );

            option.value =
              difficulty.toLowerCase();

            option.textContent =
              difficulty;

            difficultyFilter.appendChild(
              option
            );

          });

        // ----------------------------------------------------
        // FIND RENDERED QUESTION CARDS
        // ----------------------------------------------------

        const questionCards =
          [];

        const renderedGroups =
          Array.from(
            questionBankSection.querySelectorAll(
              ".divide-y"
            )
          );

        renderedGroups.forEach(group => {

          const subjectContainer =
            group.closest(
              ".bg-white"
            );

          const subjectHeading =
            subjectContainer?.querySelector(
              "h4"
            );

          const subject =
            String(
              subjectHeading?.textContent ||
              "Other"
            ).trim();

          Array.from(
            group.children
          ).forEach(card => {

            if (
              !card ||
              !card.querySelector
            ) {
              return;
            }

            const text =
              String(
                card.textContent ||
                ""
              ).trim();

            if (!text) {
              return;
            }

            const topic =
              Array.from(
                card.querySelectorAll(
                  "span"
                )
              )
              .find(span =>
                span.className.includes(
                  "bg-blue-50"
                )
              )
              ?.textContent
              ?.trim() || "";

            const difficulty =
              Array.from(
                card.querySelectorAll(
                  "span"
                )
              )
              .find(span =>
                span.className.includes(
                  "bg-purple-50"
                )
              )
              ?.textContent
              ?.trim() || "";

            questionCards.push({

              card,

              group,

              subject:
                subject.toLowerCase(),

              topic:
                topic.toLowerCase(),

              difficulty:
                difficulty.toLowerCase(),

              searchText:
                (
                  text +
                  " " +
                  subject +
                  " " +
                  topic +
                  " " +
                  difficulty
                ).toLowerCase()

            });

          });

        });

        const totalQuestions =
          questionCards.length;

        // ----------------------------------------------------
        // NO RESULTS MESSAGE
        // ----------------------------------------------------

        const noResults =
          document.createElement(
            "div"
          );

        noResults.id =
          "pulsePrepQuestionBankNoResults";

        noResults.className =
          "hidden bg-white rounded-2xl border border-slate-200 p-8 text-center";

        noResults.innerHTML = `
          <div class="text-4xl mb-3">
            🔎
          </div>

          <h3 class="text-xl
                     font-extrabold
                     text-slate-900">

            No Questions Found

          </h3>

          <p class="text-slate-500 mt-2">

            Try another search or clear your filters.

          </p>
        `;

        questionBankSection.appendChild(
          noResults
        );

        // ----------------------------------------------------
        // APPLY FILTERS
        // ----------------------------------------------------

        function applyQuestionBankFilters() {

          const search =
            String(
              searchInput.value ||
              ""
            )
            .trim()
            .toLowerCase();

          const selectedSubject =
            String(
              subjectFilter.value ||
              ""
            )
            .toLowerCase();

          const selectedTopic =
            String(
              topicFilter.value ||
              ""
            )
            .toLowerCase();

          const selectedDifficulty =
            String(
              difficultyFilter.value ||
              ""
            )
            .toLowerCase();

          let visibleCount = 0;

          const visibleGroups =
            new Set();

          questionCards.forEach(
            item => {

              const matchesSearch =
                !search ||
                item.searchText.includes(
                  search
                );

              const matchesSubject =
                !selectedSubject ||
                item.subject ===
                  selectedSubject;

              const matchesTopic =
                !selectedTopic ||
                item.topic ===
                  selectedTopic;

              const matchesDifficulty =
                !selectedDifficulty ||
                item.difficulty ===
                  selectedDifficulty;

              const visible =
                matchesSearch &&
                matchesSubject &&
                matchesTopic &&
                matchesDifficulty;

              item.card.style.display =
                visible
                  ? ""
                  : "none";

              if (visible) {

                visibleCount++;

                visibleGroups.add(
                  item.group
                );

              }

            }
          );

          // Hide subjects with no matching questions
          renderedGroups.forEach(
            group => {

              group.style.display =
                visibleGroups.has(
                  group
                )
                  ? ""
                  : "none";

            }
          );

          countDisplay.textContent =
            `Showing ${visibleCount} of ${totalQuestions} questions`;

          noResults.classList.toggle(
            "hidden",
            visibleCount !== 0
          );
        }

        // ----------------------------------------------------
        // LIVE SEARCH
        // ----------------------------------------------------

        searchInput.addEventListener(
          "input",
          applyQuestionBankFilters
        );

        // ----------------------------------------------------
        // SUBJECT FILTER
        // ----------------------------------------------------

        subjectFilter.addEventListener(
          "change",
          applyQuestionBankFilters
        );

        // ----------------------------------------------------
        // TOPIC FILTER
        // ----------------------------------------------------

        topicFilter.addEventListener(
          "change",
          applyQuestionBankFilters
        );

        // ----------------------------------------------------
        // DIFFICULTY FILTER
        // ----------------------------------------------------

        difficultyFilter.addEventListener(
          "change",
          applyQuestionBankFilters
        );

        // ----------------------------------------------------
        // CLEAR FILTERS
        // ----------------------------------------------------

        clearButton.addEventListener(
          "click",
          function () {

            searchInput.value = "";

            subjectFilter.value = "";

            topicFilter.value = "";

            difficultyFilter.value = "";

            applyQuestionBankFilters();

          }
        );

        // ----------------------------------------------------
        // INITIAL FILTER STATE
        // ----------------------------------------------------

        applyQuestionBankFilters();

        console.log(
          `PulsePrep: Question Bank Search + Filters enabled for ${totalQuestions} rendered questions.`
        );

      })();

      // ------------------------------------------------------
      // FINISHED LOADING
      // ------------------------------------------------------

      pastPapersLoaded = true;

if (
  typeof window.initializePulsePrepPractice === "function"
) {
  window.initializePulsePrepPractice();
}

console.log(
  `PulsePrep: Question Bank finished rendering ${papers.length} questions.`
);

    } catch (error) {

      console.error(
        "PulsePrep Exam Vault loading error:",
        error
      );

      container.innerHTML = `
        <div class="text-center py-10">

          <div class="text-4xl mb-3">
            ⚠️
          </div>

          <h3 class="text-xl
                     font-extrabold
                     text-slate-900">

            Something went wrong

          </h3>

          <p class="text-slate-500 mt-2">

            We could not load the Question Bank.
            Please try again.

          </p>

        </div>
      `;

    } finally {

      loadingPastPapers = false;
    }
  }

  // ==========================================================
  // OPEN APPROVED PAST PAPER
  // ==========================================================

  window.openPulsePrepPastPaper =
    async function (paperId) {

      const paperWindow =
        window.open(
          "about:blank",
          "_blank"
        );

      try {

        if (!paperId) {

          if (paperWindow) {
            paperWindow.close();
          }

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

          if (paperWindow) {
            paperWindow.close();
          }

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

          if (paperWindow) {
            paperWindow.close();
          }

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

        let result = {};

        try {

          result =
            await response.json();

        } catch (jsonError) {

          console.error(
            "Invalid past-paper response:",
            jsonError
          );

          if (paperWindow) {
            paperWindow.close();
          }

          alert(
            "The past paper service returned an invalid response."
          );

          return;
        }

        if (!response.ok) {

          if (paperWindow) {
            paperWindow.close();
          }

          if (response.status === 403) {

            alert(
              "Premium access is required to open this past paper."
            );

            if (
              typeof window.showTab ===
              "function"
            ) {

              window.showTab(
                "payment"
              );
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

              window.showTab(
                "account"
              );
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
          result.success !== true ||
          !result.url
        ) {

          console.error(
            "Past paper signed URL missing:",
            result
          );

          if (paperWindow) {
            paperWindow.close();
          }

          alert(
            "The past paper file could not be opened."
          );

          return;
        }

        if (paperWindow) {

          paperWindow.location.href =
            result.url;

        } else {

          window.location.href =
            result.url;
        }

      } catch (error) {

        console.error(
          "PulsePrep open past paper error:",
          error
        );

        if (paperWindow) {
          paperWindow.close();
        }

        alert(
          "Unable to open the past paper right now. Please try again."
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

        // ----------------------------------------------------
        // INITIAL LOAD
        // ----------------------------------------------------

        loadApprovedPastPapers();

        // ----------------------------------------------------
        // WATCH QUESTION BANK CHANGES
        // ----------------------------------------------------

        const observer =
          new MutationObserver(() => {

            if (
              questionBankUnlocked &&
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

  // ==========================================================
  // START QUESTION BANK WATCHERS
  // ==========================================================

  setupQuestionBankAuthGuard();

  setupQuestionBankWatcher();

  // ==========================================================
  // LOAD WHEN QUESTION BANK TAB IS OPENED
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
          tabName ===
          "question-bank"
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

  // ==========================================================
  // HTML SAFETY FOR PAST PAPERS
  // ==========================================================

  function escapePastPaperHtml(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();
