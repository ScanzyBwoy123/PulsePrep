(function () {
  "use strict";

  function renderPulsePrepSubjects() {
    const container = document.getElementById("pulseprepSubjects");

    if (!container) return;

    if (
      !Array.isArray(window.PULSEPREP_SUBJECTS) ||
      window.PULSEPREP_SUBJECTS.length === 0
    ) {
      container.innerHTML = `
        <p class="text-sm text-slate-500">
          No subjects available yet.
        </p>
      `;
      return;
    }

    container.innerHTML = window.PULSEPREP_SUBJECTS.map(function (subject) {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-5
                    hover:shadow-md transition-shadow">

          <div class="w-12 h-12 rounded-xl bg-teal-50
                      text-teal-600 flex items-center justify-center text-xl">
            <i class="fa-solid ${subject.icon}"></i>
          </div>

          <h3 class="font-bold text-lg mt-4">
            ${subject.name}
          </h3>

          <p class="text-sm text-slate-500 mt-2">
            ${subject.description}
          </p>

          <button
            type="button"
            onclick="openPulsePrepSubject('${subject.id}')"
            class="mt-4 w-full bg-medical-600 hover:bg-medical-700
                   text-white py-2.5 rounded-xl font-semibold">
            Study Subject
          </button>

        </div>
      `;
    }).join("");
  }

  window.openPulsePrepSubject = function (subjectId) {
  const subject = window.PULSEPREP_SUBJECTS.find(function (item) {
    return item.id === subjectId;
  });

  if (!subject) return;

  alert(
    subject.name +
    "\n\nSubject content will be added to PulsePrep."
  );
};

  function initializeSubjects() {
    if (window.PULSEPREP_SUBJECTS) {
      renderPulsePrepSubjects();
      return;
    }

    setTimeout(initializeSubjects, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSubjects);
  } else {
    initializeSubjects();
  }
})();
