// ============================================================
// PULSEPREP — PREMIUM ACCESS GATE
// ============================================================

(function () {
  "use strict";

  function waitForSupabase(timeout = 15000) {
    return new Promise((resolve) => {
      const start = Date.now();

      const check = () => {
        if (window.pulseprepSupabase) {
          resolve(true);
          return;
        }

        if (Date.now() - start >= timeout) {
          resolve(false);
          return;
        }

        setTimeout(check, 200);
      };

      check();
    });
  }

  function showPremiumLock() {
    const page =
      document.getElementById("pulseprepSubjectPage") ||
      document.body;

    page.innerHTML = `
      <div class="max-w-3xl mx-auto px-4 py-16">
        <div class="bg-white rounded-3xl border border-slate-200
                    shadow-xl p-8 sm:p-12 text-center">

          <div class="text-6xl mb-5">🔒</div>

          <div class="inline-block px-4 py-2 rounded-full
                      bg-amber-100 text-amber-700
                      text-xs font-black mb-4">
            PREMIUM CONTENT
          </div>

          <h2 class="text-3xl font-black text-slate-900">
            Unlock This Subject
          </h2>

          <p class="text-slate-600 mt-4 leading-7">
            This subject contains detailed nursing lessons,
            clinical explanations, practice questions and
            exam preparation materials available to Premium students.
          </p>

          <button
            onclick="document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})"
            class="mt-7 px-7 py-3 rounded-xl
                   bg-teal-600 text-white font-bold
                   hover:bg-teal-700 transition">
            Upgrade to Premium
          </button>

        </div>
      </div>
    `;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function showLoginMessage() {
    alert("Please log in to access PulsePrep Premium subjects.");
  }

  async function openProtectedSubject(subjectId) {
    try {
      const ready = await waitForSupabase();

      if (!ready) {
        alert(
          "PulsePrep is still connecting to the account system. Please wait a moment and try again."
        );
        return;
      }

      if (typeof window.checkPulsePrepPremium !== "function") {
        alert(
          "Premium verification is not available yet. Please refresh the page and try again."
        );
        return;
      }

      const result = await window.checkPulsePrepPremium();

      console.log("PulsePrep Premium Result:", result);

      if (!result || !result.authenticated) {
        showLoginMessage();
        return;
      }

      if (!result.premium) {
        showPremiumLock();
        return;
      }

      if (
        typeof window.__pulsePrepOriginalSubjectPage ===
        "function"
      ) {
        return window.__pulsePrepOriginalSubjectPage(
          subjectId
        );
      }

      alert("Subject page is still loading. Please try again.");

    } catch (error) {
      console.error(
        "PulsePrep Premium verification error:",
        error
      );

      alert(
        "Premium verification failed. Please refresh the page and try again."
      );
    }
  }

  function installGate() {
    if (
      typeof window.openPulsePrepSubjectPage !==
      "function"
    ) {
      setTimeout(installGate, 300);
      return;
    }

    if (
      window.__pulsePrepPremiumGateInstalled
    ) {
      return;
    }

    window.__pulsePrepPremiumGateInstalled = true;

    window.__pulsePrepOriginalSubjectPage =
      window.openPulsePrepSubjectPage;

    window.openPulsePrepSubjectPage =
      openProtectedSubject;

    console.log(
      "✅ PulsePrep Premium Gate installed"
    );
  }

  installGate();

})();
