// PulsePrep Premium Gate
(() => {
  const LOCK_MESSAGE = `
    <div style="
      max-width:700px;
      margin:40px auto;
      padding:40px 25px;
      text-align:center;
      background:#fff;
      border-radius:20px;
      box-shadow:0 10px 35px rgba(0,0,0,.10);
    ">
      <div style="font-size:55px;">🔒</div>
      <h2 style="margin:15px 0 10px;">Premium Content</h2>
      <p style="color:#666;line-height:1.7;">
        This subject is available to PulsePrep Premium students.
        Upgrade your account to unlock the complete lessons,
        explanations and practice questions.
      </p>

      <button onclick="window.location.href='#pricing'"
        style="
          border:0;
          padding:13px 24px;
          border-radius:10px;
          background:#111827;
          color:white;
          cursor:pointer;
          font-weight:600;
          margin-top:15px;
        ">
        Upgrade to Premium
      </button>
    </div>
  `;

  function showPremiumLock() {
    let container =
      document.getElementById("subject-page") ||
      document.getElementById("subjectPage") ||
      document.querySelector(".subject-page");

    if (!container) {
      container = document.body;
    }

    container.innerHTML = LOCK_MESSAGE;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function openProtectedSubject(subjectKey) {
    try {
      if (typeof window.checkPulsePrepPremium !== "function") {
        alert("Premium verification is not ready yet. Please try again.");
        return;
      }

      const result = await window.checkPulsePrepPremium();

      if (!result || !result.authenticated) {
        alert("Please log in to access PulsePrep subjects.");
        return;
      }

      if (!result.premium) {
        showPremiumLock();
        return;
      }

      if (typeof window.__pulsePrepOriginalSubjectPage === "function") {
        return window.__pulsePrepOriginalSubjectPage(subjectKey);
      }

      alert("Subject page is still loading. Please try again.");
    } catch (error) {
      console.error("Premium Gate Error:", error);
      alert("Unable to verify Premium access. Please try again.");
    }
  }

  function installGate() {
    if (
      window.__pulsePrepPremiumGateInstalled ||
      typeof window.openPulsePrepSubjectPage !== "function"
    ) {
      if (!window.__pulsePrepPremiumGateInstalled) {
        setTimeout(installGate, 200);
      }
      return;
    }

    window.__pulsePrepPremiumGateInstalled = true;

    window.__pulsePrepOriginalSubjectPage =
      window.openPulsePrepSubjectPage;

    window.openPulsePrepSubjectPage = openProtectedSubject;

    console.log("PulsePrep Premium Gate installed.");
  }

  installGate();
})();
