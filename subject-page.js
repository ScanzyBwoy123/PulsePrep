// ============================================================
// PULSEPREP — INDIVIDUAL SUBJECT PAGE
// ============================================================

(function () {
  "use strict";

  const subjects =
    window.PULSEPREP_SUBJECTS || [];

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  // ==========================================================
  // OPEN SUBJECT PAGE
  // ==========================================================

  window.openPulsePrepSubjectPage =
    function (subjectId) {

      const subject =
        subjects.find(
          item => item.id === subjectId
        );

      if (!subject) {
        console.error(
          "Subject not found:",
          subjectId
        );
        return;
      }

      const page =
        document.getElementById(
          "pulseprepSubjectPage"
        );

      if (!page) {
        console.error(
          "Subject page container not found."
        );
        return;
      }

      page.innerHTML = `

        <div class="max-w-6xl mx-auto px-4 py-6">

          <!-- Back -->
          <button
            onclick="showTab('subject-library')"
            class="mb-6 px-4 py-2 rounded-xl
                   bg-white border border-slate-200
                   text-slate-700 font-bold
                   hover:bg-slate-50"
          >
            <i class="fa-solid fa-arrow-left mr-2"></i>
            Back to Subjects
          </button>


          <!-- Subject Header -->
          <div
            class="bg-gradient-to-r
                   from-slate-900
                   to-teal-700
                   rounded-3xl
                   p-7 sm:p-10
                   text-white
                   shadow-xl"
          >

            <div class="flex flex-col sm:flex-row
                        gap-5 sm:items-center">

              <div
                class="w-16 h-16
                       rounded-2xl
                       bg-white/10
                       flex items-center justify-center"
              >
                <i
                  class="fa-solid ${escapeHTML(subject.icon)}
                         text-3xl"
                ></i>
              </div>

              <div>

                <div
                  class="text-xs font-bold
                         text-teal-200
                         uppercase tracking-wider"
                >
                  PulsePrep Subject
                </div>

                <h1
                  class="text-3xl sm:text-4xl
                         font-black mt-1"
                >
                  ${escapeHTML(subject.name)}
                </h1>

                <p
                  class="text-slate-200
                         mt-3 max-w-3xl"
                >
                  ${escapeHTML(subject.description)}
                </p>

              </div>

            </div>

          </div>


          <!-- Learning Content -->
          <div class="grid lg:grid-cols-3
                      gap-6 mt-7">

            <!-- Chapters -->
            <div
              class="lg:col-span-2
                     bg-white
                     rounded-3xl
                     border border-slate-200
                     shadow-sm
                     p-6"
            >

              <div
                class="flex items-center
                       justify-between mb-5"
              >

                <div>

                  <h2
                    class="text-xl font-black
                           text-slate-900"
                  >
                    Learning Modules
                  </h2>

                  <p
                    class="text-sm text-slate-500 mt-1"
                  >
                    Build your knowledge step by step.
                  </p>

                </div>

                <span
                  class="px-3 py-1 rounded-full
                         bg-amber-50
                         text-amber-700
                         text-xs font-bold"
                >
                  PREMIUM
                </span>

              </div>


              <div class="space-y-3">

                ${[
                  "Introduction",
                  "Core Concepts",
                  "Clinical Knowledge",
                  "Nursing Assessment",
                  "Nursing Management",
                  "Patient Education",
                  "Clinical Practice",
                  "Revision & Summary"
                ].map((module, index) => `

                  <button
                    onclick="openPulsePrepLesson(
                      '${escapeHTML(subject.id)}',
                      ${index + 1}
                    )"
                    class="w-full
                           flex items-center
                           gap-4
                           p-4
                           rounded-2xl
                           border border-slate-200
                           hover:border-teal-300
                           hover:bg-teal-50
                           transition
                           text-left"
                  >

                    <div
                      class="w-10 h-10
                             rounded-xl
                             bg-teal-50
                             text-teal-600
                             flex items-center
                             justify-center
                             font-black"
                    >
                      ${index + 1}
                    </div>

                    <div class="flex-1">

                      <p
                        class="font-bold
                               text-slate-800"
                      >
                        ${module}
                      </p>

                      <p
                        class="text-xs
                               text-slate-500
                               mt-1"
                      >
                        Lesson ${index + 1}
                      </p>

                    </div>

                    <i
                      class="fa-solid
                             fa-chevron-right
                             text-slate-400"
                    ></i>

                  </button>

                `).join("")}

              </div>

            </div>


            <!-- Progress -->
            <aside
              class="bg-white
                     rounded-3xl
                     border border-slate-200
                     shadow-sm
                     p-6
                     h-fit"
            >

              <h3
                class="font-black
                       text-slate-900"
              >
                Your Progress
              </h3>

              <div
                class="mt-5
                       w-28 h-28
                       mx-auto
                       rounded-full
                       border-8
                       border-teal-100
                       flex items-center
                       justify-center"
              >

                <span
                  class="text-2xl
                         font-black
                         text-teal-600"
                >
                  0%
                </span>

              </div>

              <div class="mt-6 space-y-3">

                <button
                  class="w-full py-3
                         rounded-xl
                         bg-teal-600
                         text-white
                         font-bold
                         hover:bg-teal-700"
                >
                  <i class="fa-solid fa-book-open mr-2"></i>
                  Study Notes
                </button>

                <button
                  class="w-full py-3
                         rounded-xl
                         border border-slate-200
                         text-slate-700
                         font-bold
                         hover:bg-slate-50"
                >
                  <i class="fa-solid fa-brain mr-2"></i>
                  Practice MCQs
                </button>

              </div>

            </aside>

          </div>

        </div>
      `;
            if (typeof window.showTab === "function") {
        window.showTab("subject-page");
      }
    };


  // ==========================================================
  // LESSON PLACEHOLDER
  // ==========================================================

  window.openPulsePrepLesson =
    function (subjectId, lessonNumber) {

      console.log(
        "Opening lesson:",
        subjectId,
        lessonNumber
      );

      alert(
        "Lesson content will be added next."
      );
    };

})();
