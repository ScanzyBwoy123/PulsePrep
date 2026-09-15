/* ============================================================
   PULSEPREP STUDENT DASHBOARD 2.0
   STAGE A — VISUAL DASHBOARD ONLY

   IMPORTANT:
   This dashboard does NOT change:
   - Authentication
   - Supabase
   - Payments
   - Question Bank
   - Exam Vault
   - Class Discussions
   - AI

   STAGE A ONLY:
   - Visual dashboard
   - Navigation buttons
   - Static statistics
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     PREVENT DUPLICATE DASHBOARD
     ============================================================ */

  function removeExistingDashboard() {
    const existing = document.getElementById("pulseprepDashboardV2");

    if (existing) {
      existing.remove();
    }
  }


  /* ============================================================
     FIND DASHBOARD CONTAINER
     ============================================================ */

  function getDashboardContainer() {

    /*
      We expect the existing PulsePrep page to already contain
      an element with id="dashboard".

      This code does NOT create or replace the existing dashboard.
    */

    const dashboard = document.getElementById("dashboard");

    if (!dashboard) {
      console.warn(
        "PulsePrep Student Dashboard: #dashboard container was not found."
      );

      return null;
    }

    return dashboard;
  }


  /* ============================================================
     SAFE TAB NAVIGATION
     ============================================================ */

  function openPulsePrepTab(tabId) {

    try {

      /*
        Use the existing PulsePrep showTab() function
        if it already exists.
      */

      if (typeof window.showTab === "function") {

        window.showTab(tabId);

        return;
      }


      /*
        Fallback navigation if showTab() is not available.
        This only changes visible tabs and does not touch data.
      */

      const tabs = document.querySelectorAll(".tab");

      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });


      const target = document.getElementById(tabId);

      if (target) {
        target.classList.add("active");
      }

    } catch (error) {

      console.error(
        "PulsePrep Dashboard navigation error:",
        error
      );

    }
  }


  /* ============================================================
     EXPOSE NAVIGATION SAFELY
     ============================================================ */

  window.pulsePrepOpenTab = openPulsePrepTab;


  /* ============================================================
     RENDER STUDENT DASHBOARD
     ============================================================ */

  function renderStudentDashboard() {

    const dashboard = getDashboardContainer();

    if (!dashboard) {
      return;
    }


    /*
      Remove an older copy if one exists.
      This prevents duplicate dashboards after reloads.
    */

    removeExistingDashboard();


    /* ============================================================
       DASHBOARD SECTION
       ============================================================ */

    const section = document.createElement("div");

    section.id = "pulseprepDashboardV2";

    section.className = "mt-6";


    /* ============================================================
       DASHBOARD HTML
       ============================================================ */

    section.innerHTML = `

      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">

        <!-- =====================================================
             HEADER
             ===================================================== -->

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <span class="inline-flex items-center gap-2
              px-3 py-1 rounded-full
              bg-teal-50 text-teal-700
              text-xs font-extrabold uppercase">

              <i class="fa-solid fa-gauge-high"></i>

              Student Dashboard

            </span>


            <h3 class="text-2xl sm:text-3xl font-black text-slate-900 mt-3">

              Your Study Center

            </h3>


            <p class="text-slate-500 mt-1">

              Keep your nursing preparation organized and focused.

            </p>

          </div>


          <!-- CURRENT PLAN -->

          <div class="flex items-center gap-2
            bg-slate-50 rounded-2xl px-4 py-3">

            <div class="w-10 h-10 rounded-full
              bg-teal-100 text-teal-700
              flex items-center justify-center">

              <i class="fa-solid fa-user-graduate"></i>

            </div>


            <div>

              <p class="text-xs text-slate-500">

                Current plan

              </p>


              <p class="font-extrabold text-slate-900">

                Student

              </p>

            </div>

          </div>

        </div>


        <!-- =====================================================
             STATISTICS
             ===================================================== -->

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">


          <!-- STUDY GOAL -->

          <div class="rounded-2xl
            bg-slate-50
            border border-slate-100
            p-4">

            <div class="w-10 h-10 rounded-xl
              bg-blue-100 text-blue-700
              flex items-center justify-center">

              <i class="fa-solid fa-bullseye"></i>

            </div>


            <p class="text-xs text-slate-500 mt-3">

              Study Goal

            </p>


            <p class="text-lg font-black text-slate-900">

              Get Started

            </p>

          </div>


          <!-- STUDY STREAK -->

          <div class="rounded-2xl
            bg-slate-50
            border border-slate-100
            p-4">

            <div class="w-10 h-10 rounded-xl
              bg-amber-100 text-amber-700
              flex items-center justify-center">

              <i class="fa-solid fa-fire"></i>

            </div>


            <p class="text-xs text-slate-500 mt-3">

              Study Streak

            </p>


            <p class="text-lg font-black text-slate-900">

              0 days

            </p>

          </div>


          <!-- QUESTIONS -->

          <div class="rounded-2xl
            bg-slate-50
            border border-slate-100
            p-4">

            <div class="w-10 h-10 rounded-xl
              bg-emerald-100 text-emerald-700
              flex items-center justify-center">

              <i class="fa-solid fa-circle-check"></i>

            </div>


            <p class="text-xs text-slate-500 mt-3">

              Questions Done

            </p>


            <p class="text-lg font-black text-slate-900">

              0

            </p>

          </div>


          <!-- PROGRESS -->

          <div class="rounded-2xl
            bg-slate-50
            border border-slate-100
            p-4">

            <div class="w-10 h-10 rounded-xl
              bg-purple-100 text-purple-700
              flex items-center justify-center">

              <i class="fa-solid fa-chart-line"></i>

            </div>


            <p class="text-xs text-slate-500 mt-3">

              Progress

            </p>


            <p class="text-lg font-black text-slate-900">

              0%

            </p>

          </div>

        </div>


        <!-- =====================================================
             LOWER DASHBOARD AREA
             ===================================================== -->

        <div class="grid lg:grid-cols-2 gap-5 mt-5">


          <!-- ===================================================
               CONTINUE LEARNING
               =================================================== -->

          <div class="rounded-2xl
            border border-slate-200
            p-5">

            <div class="flex items-center justify-between gap-3">

              <div>

                <h4 class="font-black text-slate-900">

                  Continue Learning

                </h4>


                <p class="text-sm text-slate-500 mt-1">

                  Choose where you want to study next.

                </p>

              </div>


              <i class="fa-solid fa-book-open
                text-teal-600 text-xl">
              </i>

            </div>


            <div class="grid sm:grid-cols-2 gap-3 mt-4">


              <!-- NURSING SUBJECTS -->

              <button
                type="button"
                id="pulsePrepSubjectsButton"
                class="text-left rounded-xl
                bg-teal-50
                hover:bg-teal-100
                p-4 transition">

                <i class="fa-solid fa-book-medical
                  text-teal-700">
                </i>


                <p class="font-bold text-slate-900 mt-2">

                  Nursing Subjects

                </p>


                <p class="text-xs text-slate-500 mt-1">

                  Explore your subjects

                </p>

              </button>


              <!-- PRACTICE MCQS -->

              <button
                type="button"
                id="pulsePrepMcqButton"
                class="text-left rounded-xl
                bg-blue-50
                hover:bg-blue-100
                p-4 transition">

                <i class="fa-solid fa-circle-question
                  text-blue-700">
                </i>


                <p class="font-bold text-slate-900 mt-2">

                  Practice MCQs

                </p>


                <p class="text-xs text-slate-500 mt-1">

                  Test your knowledge

                </p>

              </button>

            </div>

          </div>


          <!-- ===================================================
               NEXT STEP
               =================================================== -->

          <div class="rounded-2xl
            border border-slate-200
            p-5">

            <div class="flex items-center justify-between gap-3">

              <div>

                <h4 class="font-black text-slate-900">

                  Your Next Step

                </h4>


                <p class="text-sm text-slate-500 mt-1">

                  Build a consistent nursing study routine.

                </p>

              </div>


              <i class="fa-solid fa-arrow-trend-up
                text-purple-600 text-xl">
              </i>

            </div>


            <div class="mt-4
              rounded-xl
              bg-purple-50
              p-4">

              <p class="text-xs font-bold
                text-purple-700 uppercase">

                Recommended

              </p>


              <p class="font-black
                text-slate-900 mt-1">

                Start with 10 practice questions

              </p>


              <p class="text-sm
                text-slate-600 mt-1">

                Your activity tracking will be connected
                in a later stage.

              </p>

            </div>

          </div>

        </div>

      </div>

    `;


    /* ============================================================
       ADD DASHBOARD TO EXISTING PAGE
       ============================================================ */

    dashboard.appendChild(section);


    /* ============================================================
       SUBJECT BUTTON
       ============================================================ */

    const subjectsButton =
      document.getElementById("pulsePrepSubjectsButton");


    if (subjectsButton) {

      subjectsButton.addEventListener(
        "click",
        function () {

          openPulsePrepTab("subject-library");

        }
      );

    }


    /* ============================================================
       MCQ BUTTON
       ============================================================ */

    const mcqButton =
      document.getElementById("pulsePrepMcqButton");


    if (mcqButton) {

      mcqButton.addEventListener(
        "click",
        function () {

          openPulsePrepTab("mcq");

        }
      );

    }

  }


  /* ============================================================
     WAIT FOR EXISTING PULSEPREP PAGE
     ============================================================ */

  function startDashboard() {

    /*
      Small delay allows the existing PulsePrep page to finish
      creating its dashboard container before we insert ours.
    */

    setTimeout(function () {

      renderStudentDashboard();

    }, 100);

  }


  /* ============================================================
     INITIALIZE
     ============================================================ */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      startDashboard
    );

  } else {

    startDashboard();

  }


})();
