(function () {
  "use strict";

  // ============================================================
  // PULSEPREP — LEGACY SUBJECT COMPATIBILITY
  // ============================================================

  window.openPulsePrepSubject = function (subjectId) {

    if (
      typeof window.openPulsePrepSubjectPage === "function"
    ) {
      window.openPulsePrepSubjectPage(subjectId);
      return;
    }

    console.error(
      "PulsePrep: openPulsePrepSubjectPage is not available."
    );
  };

})();
