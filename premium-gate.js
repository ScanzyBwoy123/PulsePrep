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
        window.showTab("pricing");
        return;
      } catch (error) {
        console.warn(error);
      }
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
