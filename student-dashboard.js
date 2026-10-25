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

<!-- LIVE DATE AND TIME -->

<div class="rounded-2xl border border-teal-100
  bg-teal-50 px-4 py-3">

  <div class="flex items-center gap-2 text-teal-700">
    <i class="fa-regular fa-clock"></i>

    <p class="text-xs font-bold uppercase">
      Ghana Time
    </p>
  </div>

  <p id="pulsePrepLiveTime"
    class="text-xl sm:text-2xl font-black
    text-slate-900 mt-1">
    --:--:--
  </p>

  <p id="pulsePrepLiveDate"
    class="text-xs sm:text-sm text-slate-600 mt-1">
    Loading date...
  </p>

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


            <div class="mt-2">
    <p id="pulsePrepGoalValue" class="text-lg font-black text-slate-900">
    10 questions
  </p>

  <button
    type="button"
    id="pulsePrepEditGoal"
    class="mt-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-200">
    <i class="fa-solid fa-pen-to-square"></i> Edit Goal
  </button>
</div>

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


            <p id="pulsePrepStudyStreak"
   class="text-lg font-black text-slate-900">
  Loading...
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


            <p id="pulsePrepQuestionsDone"
   class="text-lg font-black text-slate-900">
  Loading...
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


            <p id="pulsePrepProgressValue"
   class="text-lg font-black text-slate-900">
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
     setupPulsePrepStudyGoal();
     loadPulsePrepQuestionStats();
// LIVE DATE AND TIME — GHANA
function updatePulsePrepClock() {
  const timeElement = document.getElementById("pulsePrepLiveTime");
  const dateElement = document.getElementById("pulsePrepLiveDate");

  if (!timeElement || !dateElement) return;

  const now = new Date();

  timeElement.textContent = new Intl.DateTimeFormat("en-GH", {
    timeZone: "Africa/Accra",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);

  dateElement.textContent = new Intl.DateTimeFormat("en-GH", {
    timeZone: "Africa/Accra",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);
}

updatePulsePrepClock();

if (window.pulsePrepClockInterval) {
  window.clearInterval(window.pulsePrepClockInterval);
}

window.pulsePrepClockInterval =
  window.setInterval(updatePulsePrepClock, 1000);

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
  /* ============================================================
EDITABLE DAILY STUDY GOAL
============================================================ */

function setupPulsePrepStudyGoal() {
const goalValue = document.getElementById("pulsePrepGoalValue");
const editButton = document.getElementById("pulsePrepEditGoal");

if (!goalValue || !editButton) return;
const storageKey = "pulsePrepDailyStudyGoal";
let goal = Number(localStorage.getItem(storageKey)) || 10;
function displayGoal() {
  goalValue.textContent = goal + (goal === 1 ? " question" : " questions");
}
displayGoal();
editButton.addEventListener("click", function () {
  const answer = prompt("Set your daily study goal (1–200 questions):", String(goal));
  if (answer === null) return;
  const newGoal = Number(answer);
  if (!Number.isInteger(newGoal) || newGoal < 1 || newGoal > 200) {
    alert("Please enter a whole number from 1 to 200.");
    return;
  }
  goal = newGoal;
  localStorage.setItem(storageKey, String(goal));
  displayGoal();
  alert("Your daily study goal has been updated!");
});

}
   /* ============================================================
LOAD REAL STUDENT QUESTION STATISTICS
============================================================ */
  /* ============================================================
     LOAD REAL STUDENT STATISTICS AND STUDY STREAK
     ============================================================ */

  async function loadPulsePrepQuestionStats() {
    const counter = document.getElementById("pulsePrepQuestionsDone");
    const streakDisplay = document.getElementById("pulsePrepStudyStreak");

    if (!counter) return;

    try {
      if (
        !window.pulseprepSupabase ||
        typeof window.getPulsePrepUser !== "function"
      ) {
        counter.textContent = "Sign in required";
        if (streakDisplay) streakDisplay.textContent = "—";
        return;
      }

      const authResult = await window.getPulsePrepUser();
      const user =
        authResult?.data?.user ||
        authResult?.user ||
        authResult;

      if (!user || !user.id) {
        counter.textContent = "Sign in required";
        if (streakDisplay) streakDisplay.textContent = "—";
        return;
      }

      const { data, error } = await window.pulseprepSupabase
        .from("student_activity")
        .select("created_at, activity_type")
        .eq("user_id", user.id)
        .eq("activity_type", "question_answered")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) throw error;

      const activities = data || [];

      counter.textContent = String(activities.length);

  const progressDisplay =
    document.getElementById("pulsePrepProgressValue");
  if (progressDisplay) {
    const storageKey = "pulsePrepDailyStudyGoal";
    const savedGoal = Number(localStorage.getItem(storageKey));
    const dailyGoal =
      Number.isInteger(savedGoal) && savedGoal >= 1 && savedGoal <= 200
        ? savedGoal
        : 10;
    const todayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Accra",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
    const todayParts = todayKey.split("-");
    const todayQuestions = activities.filter(function (activity) {
      if (!activity.created_at) return false;
      const activityDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Accra",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(activity.created_at));
      return activityDate === todayKey;
    }).length;
    const percentage = Math.min(
      100,
      Math.round((todayQuestions / dailyGoal) * 100)
    );
    progressDisplay.textContent = percentage + "%";
  }

      if (!streakDisplay) return;

      // Get calendar dates using Ghana time.
      function ghanaDateKey(date) {
        const parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Africa/Accra",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).formatToParts(date);

        const values = {};

        parts.forEach(function (part) {
          values[part.type] = part.value;
        });

        return values.year + "-" + values.month + "-" + values.day;
      }

      const studyDates = new Set();

      activities.forEach(function (activity) {
        if (activity.created_at) {
          studyDates.add(ghanaDateKey(new Date(activity.created_at)));
        }
      });

      const today = ghanaDateKey(new Date());

      // Calculate yesterday using calendar dates, not elapsed hours.
      const todayParts = today.split("-").map(Number);
      const todayDate = new Date(Date.UTC(
        todayParts[0],
        todayParts[1] - 1,
        todayParts[2]
      ));

      todayDate.setUTCDate(todayDate.getUTCDate() - 1);

      const yesterday = todayDate.toISOString().slice(0, 10);

      let currentDate = studyDates.has(today)
        ? today
        : studyDates.has(yesterday)
          ? yesterday
          : null;

      let streak = 0;

      while (currentDate && studyDates.has(currentDate)) {
        streak++;

        const parts = currentDate.split("-").map(Number);
        const date = new Date(Date.UTC(
          parts[0],
          parts[1] - 1,
          parts[2]
        ));

        date.setUTCDate(date.getUTCDate() - 1);
        currentDate = date.toISOString().slice(0, 10);
      }

      streakDisplay.textContent =
        streak + (streak === 1 ? " day" : " days");

    } catch (error) {
      console.error("PulsePrep statistics error:", error);
      counter.textContent = "Unavailable";

      if (streakDisplay) {
        streakDisplay.textContent = "Unavailable";
      }
    }
  }

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
