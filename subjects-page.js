// ============================================================
// PULSEPREP — PREMIUM SUBJECT LIBRARY
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

  function renderSubjects(containerId = "pulseprepSubjectGrid") {

    const container =
      document.getElementById(containerId);

    if (!container) return;

    if (!subjects.length) {
      container.innerHTML = `
        <div class="col-span-full text-center p-10">
          <p class="text-slate-500">
            No subjects available yet.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = subjects.map((subject, index) => {

      const name =
        escapeHTML(subject.name);

      const description =
        escapeHTML(subject.description);

      const icon =
        escapeHTML(subject.icon);

      return `
        <article
          class="group relative bg-white rounded-3xl
                 border border-slate-200
                 shadow-sm hover:shadow-xl
                 transition-all duration-300
                 overflow-hidden"
        >

          <!-- Premium ribbon -->
          <div
            class="absolute top-0 right-0
                   px-3 py-1
                   bg-gradient-to-r from-amber-400 to-yellow-500
                   text-white text-[10px]
                   font-extrabold uppercase
                   tracking-wider
                   rounded-bl-xl"
          >
            Premium
          </div>

          <!-- Subject icon -->
          <div class="p-6">

            <div
              class="w-14 h-14
                     rounded-2xl
                     bg-teal-50
                     text-teal-600
                     flex items-center justify-center
                     mb-5
                     group-hover:scale-110
                     transition-transform"
            >
              <i class="fa-solid ${icon} text-2xl"></i>
            </div>

            <div class="text-xs font-bold text-teal-600 mb-2">
              SUBJECT ${String(index + 1).padStart(2, "0")}
            </div>

            <h3
              class="text-lg font-extrabold
                     text-slate-900
                     leading-tight"
            >
              ${name}
            </h3>

            <p
              class="text-sm text-slate-500
                     leading-relaxed
                     mt-3 min-h-[65px]"
            >
              ${description}
            </p>

            <!-- Progress -->
            <div class="mt-5">

              <div
                class="flex justify-between
                       text-xs font-semibold
                       text-slate-500 mb-2"
              >
                <span>Progress</span>
                <span>0%</span>
              </div>

              <div
                class="h-2
                       bg-slate-100
                       rounded-full
                       overflow-hidden"
              >
                <div
                  class="h-full w-0
                         bg-teal-500
                         rounded-full"
                ></div>
              </div>

            </div>

            <!-- Open button -->
            <button
             onclick="openPulsePrepSubjectPage('${escapeHTML(subject.id)}')" 
              class="w-full mt-6
                     py-3
                     rounded-xl
                     bg-slate-900
                     hover:bg-teal-600
                     text-white
                     font-bold
                     transition-colors"
            >
              <i class="fa-solid fa-book-open mr-2"></i>
              Start Learning
            </button>

          </div>

        </article>
      `;

    }).join("");
  }


  // ==========================================================
  // OPEN SUBJECT
  // ==========================================================

  window.openPulsePrepSubject =
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

      window.dispatchEvent(
        new CustomEvent(
          "pulseprep:subject-selected",
          {
            detail: subject
          }
        )
      );

      if (typeof window.showTab === "function") {
        window.showTab("subject");
      }
    };


  // ==========================================================
  // INITIALIZE
  // ==========================================================

  window.renderPulsePrepSubjects =
    renderSubjects;

})();
