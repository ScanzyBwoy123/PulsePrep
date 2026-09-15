/* ============================================================
   PULSEPREP STUDENT ACTIVITY TRACKER
   Safe add-on: records authenticated student question activity.
   Does not replace Question Bank, Exam Vault, Premium, or Auth.
   ============================================================ */

(function () {
  "use strict";

  async function recordPulsePrepActivity({
    questionId,
    subject = null,
    isCorrect = null,
    activityType = "question_answered"
  } = {}) {
    try {
      if (!questionId) return false;
      if (!window.pulseprepSupabase) return false;

      const user =
        typeof window.getPulsePrepUser === "function"
          ? await window.getPulsePrepUser()
          : null;

      // Only authenticated students are tracked.
      if (!user?.id) return false;

      const { error } = await window.pulseprepSupabase
        .from("student_activity")
        .insert({
          user_id: user.id,
          question_id: String(questionId),
          subject: subject ? String(subject) : null,
          activity_type: String(activityType),
          is_correct:
            typeof isCorrect === "boolean" ? isCorrect : null
        });

      if (error) {
        console.error(
          "PulsePrep activity recording failed:",
          error
        );
        return false;
      }

      return true;

    } catch (error) {

      // Activity tracking must never break the question system.
      console.error(
        "PulsePrep activity tracker error:",
        error
      );

      return false;
    }
  }

  window.recordPulsePrepActivity =
    recordPulsePrepActivity;

})();
