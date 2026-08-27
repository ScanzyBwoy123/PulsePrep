"use strict";

/*
 * ============================================================
 * PULSEPREP — SUBJECT PAGE
 * ============================================================
 *
 * This file:
 *   1. Stores subject lesson content.
 *   2. Opens a selected subject.
 *   3. Renders its lessons.
 *   4. Renders key points.
 *   5. Renders nursing connections.
 *   6. Renders practice questions.
 *
 * IMPORTANT:
 * Keep your existing curriculum objects inside
 * window.PULSEPREP_CURRICULUM.
 * ============================================================
 */

(function () {

  /* ==========================================================
     1. CURRICULUM
     ========================================================== */

  window.PULSEPREP_CURRICULUM = window.PULSEPREP_CURRICULUM || {};

  /*
   * IMPORTANT:
   * KEEP ALL YOUR EXISTING SUBJECT CONTENT HERE.
   *
   * Example:
   *
   * window.PULSEPREP_CURRICULUM["anatomy-physiology"] = [
   *   {
   *     title: "Introduction to Anatomy & Physiology",
   *     notes: `...`,
   *     keyPoints: [...],
   *     nursing: `...`,
   *     questions: [...]
   *   }
   * ];
   *
   * Do not delete your existing lesson data.
   */


  /* ==========================================================
     2. HELPERS
     ========================================================== */

  function getSubjects() {

    if (
      Array.isArray(window.PULSEPREP_SUBJECTS)
    ) {
      return window.PULSEPREP_SUBJECTS;
    }

    return [];
  }


  function getSubject(subjectId) {

    var list = getSubjects();

    return list.find(function (subject) {

      return String(subject.id) === String(subjectId);

    }) || null;
  }


  function escapeHTML(value) {

    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function getCurriculum(subjectId) {

    var curriculum =
      window.PULSEPREP_CURRICULUM;

    if (
      curriculum &&
      Array.isArray(curriculum[subjectId])
    ) {
      return curriculum[subjectId];
    }

    /*
     * Compatibility with possible existing global
     * curriculum objects.
     */

    if (
      window.PULSEPREP_LESSONS &&
      Array.isArray(window.PULSEPREP_LESSONS[subjectId])
    ) {
      return window.PULSEPREP_LESSONS[subjectId];
    }

    return [];
  }


  /* ==========================================================
     3. FIND SUBJECT PAGE
     ========================================================== */

  function getSubjectPage() {

    var page =
      document.getElementById(
        "pulseprepSubjectPage"
      );

    if (page) {
      return page;
    }

    var existing =
      document.getElementById(
        "subject-page"
      );

    if (!existing) {

      existing =
        document.createElement("section");

      existing.id = "subject-page";

      existing.className =
        "tab hidden min-h-screen bg-slate-50";

      document.body.appendChild(existing);

    }

    page =
      document.createElement("div");

    page.id =
      "pulseprepSubjectPage";

    page.className =
      "min-h-screen";

    existing.appendChild(page);

    return page;
  }


  /* ==========================================================
     4. SHOW SUBJECT TAB
     ========================================================== */

  function showSubjectTab() {

    /*
     * Use the existing PulsePrep navigation system
     * whenever available.
     */

    if (
      typeof window.showTab === "function"
    ) {

      try {

        window.showTab(
          "subject-page"
        );

        return true;

      } catch (error) {

        console.warn(
          "PulsePrep showTab error:",
          error
        );

      }

    }


    /*
     * Fallback navigation.
     */

    document
      .querySelectorAll(".tab")
      .forEach(function (tab) {

        tab.classList.add("hidden");

      });


    var page =
      document.getElementById(
        "subject-page"
      );

    if (page) {

      page.classList.remove(
        "hidden"
      );

      return true;

    }

    return false;
  }


  /* ==========================================================
     5. RENDER QUESTIONS
     ========================================================== */

  function renderQuestions(
    questions
  ) {

    if (
      !Array.isArray(questions) ||
      questions.length === 0
    ) {

      return "";

    }


    return `

      <section class="mt-10">

        <h3
          class="text-2xl font-black text-slate-900 mb-5"
        >
          Practice Questions
        </h3>

        <div class="space-y-5">

          ${questions.map(function (q, index) {

            var options =
              Array.isArray(q.options)
                ? q.options
                : [];

            return `

              <div
                class="question-card bg-white
                       border border-slate-200
                       rounded-2xl p-5"
              >

                <p
                  class="font-bold text-slate-900 mb-4"
                >
                  ${index + 1}.
                  ${escapeHTML(q.question)}
                </p>


                <div class="space-y-2">

                  ${options.map(function (
                    option,
                    optionIndex
                  ) {

                    return `

                      <button
                        type="button"
                        class="pulseprep-option
                               w-full text-left
                               border border-slate-200
                               rounded-xl px-4 py-3
                               hover:bg-slate-50
                               transition"
                        data-correct="${
                          optionIndex === q.answer
                        }"
                        data-explanation="${
                          escapeHTML(
                            q.explanation || ""
                          )
                        }"
                      >

                        <span
                          class="font-bold mr-2"
                        >
                          ${String.fromCharCode(
                            65 + optionIndex
                          )}.
                        </span>

                        ${escapeHTML(option)}

                      </button>

                    `;

                  }).join("")}

                </div>


                <div
                  class="pulseprep-feedback
                         hidden mt-4
                         rounded-xl p-4
                         text-sm font-semibold"
                ></div>

              </div>

            `;

          }).join("")}

        </div>

      </section>

    `;

  }


  /* ==========================================================
     6. RENDER LESSON
     ========================================================== */

  function renderLesson(
    lesson,
    lessonIndex,
    totalLessons,
    subject
  ) {

    var keyPoints =
      Array.isArray(lesson.keyPoints)
        ? lesson.keyPoints
        : [];


    return `

      <article
        class="bg-white
               rounded-3xl
               border border-slate-200
               shadow-sm
               p-6 md:p-8"
      >

        <div
          class="flex flex-wrap
                 justify-between
                 items-center
                 gap-3 mb-5"
        >

          <span
            class="text-sm font-bold
                   text-teal-600
                   uppercase
                   tracking-wide"
          >
            Lesson ${lessonIndex + 1}
            of ${totalLessons}
          </span>


          <span
            class="text-xs font-semibold
                   text-slate-400"
          >
            ${escapeHTML(subject.name)}
          </span>

        </div>


        <h2
          class="text-2xl md:text-3xl
                 font-black
                 text-slate-900
                 mb-6"
        >
          ${escapeHTML(
            lesson.title || "Lesson"
          )}
        </h2>


        <div
          class="pulseprep-notes
                 text-slate-700
                 leading-relaxed"
        >

          ${
            lesson.notes ||
            "<p>Lesson notes are not available yet.</p>"
          }

        </div>


        ${
          keyPoints.length
            ? `

              <div
                class="mt-8
                       rounded-2xl
                       bg-teal-50
                       border border-teal-100
                       p-5"
              >

                <h3
                  class="font-black
                         text-teal-900
                         mb-3"
                >
                  Key Points
                </h3>


                <ul
                  class="list-disc
                         ml-5
                         space-y-2
                         text-teal-900"
                >

                  ${keyPoints.map(function (
                    point
                  ) {

                    return `
                      <li>
                        ${escapeHTML(point)}
                      </li>
                    `;

                  }).join("")}

                </ul>

              </div>

            `
            : ""
        }


        ${
          lesson.nursing
            ? `

              <div
                class="mt-6
                       rounded-2xl
                       bg-blue-50
                       border border-blue-100
                       p-5"
              >

                <h3
                  class="font-black
                         text-blue-900
                         mb-2"
                >
                  Nursing Connection
                </h3>


                <div
                  class="text-blue-900
                         leading-relaxed"
                >
                  ${lesson.nursing}
                </div>

              </div>

            `
            : ""
        }


        ${renderQuestions(
          lesson.questions
        )}

      </article>

    `;

  }


  /* ==========================================================
     7. QUESTION INTERACTION
     ========================================================== */

  function activateQuestions(page) {

    page
      .querySelectorAll(
        ".pulseprep-option"
      )
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            var card =
              button.closest(
                ".question-card"
              );

            if (!card) {
              return;
            }


            var buttons =
              card.querySelectorAll(
                ".pulseprep-option"
              );


            var feedback =
              card.querySelector(
                ".pulseprep-feedback"
              );


            var correct =
              button.dataset.correct ===
              "true";


            buttons.forEach(
              function (item) {

                item.disabled = true;

              }
            );


            if (correct) {

              button.classList.add(
                "bg-green-50",
                "border-green-300"
              );

            } else {

              button.classList.add(
                "bg-red-50",
                "border-red-300"
              );

            }


            if (feedback) {

              feedback.classList.remove(
                "hidden"
              );


              feedback.classList.add(
                correct
                  ? "bg-green-50"
                  : "bg-red-50"
              );


              feedback.textContent =
                correct
                  ? "Correct! " +
                    (
                      button.dataset.explanation ||
                      ""
                    )
                  : "Incorrect. " +
                    (
                      button.dataset.explanation ||
                      ""
                    );

            }

          }
        );

      });

  }


  /* ==========================================================
     8. OPEN SUBJECT
     ========================================================== */

  window.openPulsePrepSubject =
    function (subjectId) {

      console.log(
        "PulsePrep: opening subject:",
        subjectId
      );


      var subject =
        getSubject(subjectId);


      if (!subject) {

        console.error(
          "PulsePrep: subject not found:",
          subjectId
        );

        return false;

      }


      var page =
        getSubjectPage();


      var lessons =
        getCurriculum(
          subject.id
        );


      console.log(
        "PulsePrep: lessons found:",
        lessons.length
      );


      var content;


      if (lessons.length > 0) {

        content =
          lessons.map(
            function (
              lesson,
              index
            ) {

              return renderLesson(
                lesson,
                index,
                lessons.length,
                subject
              );

            }
          ).join("");

      } else {

        content = `

          <div
            class="bg-white
                   rounded-3xl
                   border border-slate-200
                   shadow-sm
                   p-8"
          >

            <h2
              class="text-2xl
                     font-black
                     text-slate-900"
            >
              ${escapeHTML(subject.name)}
            </h2>


            <p
              class="mt-3
                     text-slate-600"
            >
              Subject content is currently
              being prepared.
            </p>

          </div>

        `;

      }


      page.innerHTML = `

        <div
          class="max-w-5xl
                 mx-auto
                 px-4
                 py-8"
        >

          <button
            type="button"
            id="pulseprepBackToSubjects"
            class="mb-6
                   px-4 py-2.5
                   rounded-xl
                   bg-white
                   border border-slate-200
                   text-slate-700
                   font-bold
                   hover:bg-slate-50"
          >

            <i
              class="fa-solid
                     fa-arrow-left
                     mr-2"
            ></i>

            Back to Subjects

          </button>


          <header
            class="rounded-3xl
                   bg-gradient-to-r
                   from-teal-600
                   to-cyan-600
                   text-white
                   p-6 md:p-8
                   mb-6
                   shadow-sm"
          >

            <div
              class="flex
                     items-start
                     gap-4"
            >

              <div
                class="w-14 h-14
                       rounded-2xl
                       bg-white/15
                       flex
                       items-center
                       justify-center"
              >

                <i
                  class="fa-solid
                         ${escapeHTML(
                           subject.icon || ""
                         )}
                         text-2xl"
                ></i>

              </div>


              <div>

                <p
                  class="text-sm
                         font-bold
                         uppercase
                         tracking-wide
                         text-white/80"
                >
                  PulsePrep Subject
                </p>


                <h1
                  class="text-3xl
                         md:text-4xl
                         font-black
                         mt-1"
                >
                  ${escapeHTML(
                    subject.name
                  )}
                </h1>


                <p
                  class="mt-2
                         text-white/85"
                >
                  ${escapeHTML(
                    subject.description || ""
                  )}
                </p>

              </div>

            </div>

          </header>


          <div
            class="space-y-6"
          >

            ${content}

          </div>

        </div>

      `;


      var backButton =
        document.getElementById(
          "pulseprepBackToSubjects"
        );


      if (backButton) {

        backButton.addEventListener(
          "click",
          function () {

            if (
              typeof window.showTab ===
              "function"
            ) {

              try {

                window.showTab(
                  "subjects"
                );

                return;

              } catch (error) {

                console.warn(error);

              }

            }


            if (
              typeof window.showTab ===
              "function"
            ) {

              try {

                window.showTab(
                  "subject-library"
                );

                return;

              } catch (error) {

                console.warn(error);

              }

            }

          }
        );

      }


      activateQuestions(page);

      showSubjectTab();


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });


      return true;

    };


  /* ==========================================================
     9. COMPATIBILITY ALIASES
     ========================================================== */

  window.openSubjectPage =
    window.openPulsePrepSubject;


  window.renderSubjectPage =
    window.openPulsePrepSubject;


  /* ==========================================================
     10. STARTUP
     ========================================================== */

  function initializeSubjectPage() {

    console.log(
      "PulsePrep: subject-page.js loaded."
    );


    /*
     * Do NOT automatically open a subject.
     *
     * The subjects page should call:
     *
     * openPulsePrepSubject(subjectId)
     *
     * when the user clicks "Study Subject".
     */

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeSubjectPage
    );

  } else {

    initializeSubjectPage();

  }

})();
