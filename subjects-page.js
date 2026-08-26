"use strict";

/*
============================================================
PULSEPREP — SUBJECTS PAGE
============================================================

This file is responsible for:

1. Rendering the subject cards
2. Handling "Start Learning"
3. Opening the correct subject page
4. Creating the subject-page container when necessary
5. Connecting subjects-page.js with subject-page.js
6. Preventing the old "Subject content will be added..." alert
============================================================
*/

(function () {

  /*
  ============================================================
  GET SUBJECT DATA
  ============================================================
  */

  function getSubjects() {
    if (
      Array.isArray(window.PULSEPREP_SUBJECTS)
    ) {
      return window.PULSEPREP_SUBJECTS;
    }

    return [];
  }


  /*
  ============================================================
  ESCAPE HTML
  ============================================================
  */

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /*
  ============================================================
  FIND SUBJECT
  ============================================================
  */

  function findSubject(subjectId) {

    const subjects = getSubjects();

    return subjects.find(function (subject) {
      return String(subject.id) === String(subjectId);
    });

  }


  /*
  ============================================================
  CREATE SUBJECT PAGE CONTAINER
  ============================================================
  */

  function ensureSubjectPage() {

    let subjectPage =
      document.getElementById("subject-page");

    /*
     * If subject-page already exists, use it.
     */

    if (!subjectPage) {

      subjectPage =
        document.createElement("section");

      subjectPage.id = "subject-page";

      subjectPage.className =
        "tab hidden min-h-screen bg-slate-50";

      document.body.appendChild(subjectPage);
    }


    /*
     * Find or create the actual content container.
     */

    let content =
      document.getElementById("pulseprepSubjectPage");

    if (!content) {

      content =
        document.createElement("div");

      content.id =
        "pulseprepSubjectPage";

      content.className =
        "min-h-screen";

      subjectPage.appendChild(content);
    }


    return {
      page: subjectPage,
      content: content
    };

  }


  /*
  ============================================================
  SHOW TAB
  ============================================================
  */

  function showSubjectPage() {

    /*
     * Use PulsePrep's existing showTab() when available.
     */

    if (typeof window.showTab === "function") {

      try {

        window.showTab("subject-page");

        return;

      } catch (error) {

        console.warn(
          "PulsePrep showTab failed:",
          error
        );

      }

    }


    /*
     * Fallback tab switching.
     */

    const tabs =
      document.querySelectorAll(".tab");

    tabs.forEach(function (tab) {

      tab.classList.add("hidden");

    });


    const subjectPage =
      document.getElementById("subject-page");

    if (subjectPage) {

      subjectPage.classList.remove("hidden");

    }

  }


  /*
  ============================================================
  RENDER SUBJECT CARDS
  ============================================================
  */

  function renderPulsePrepSubjects() {

    /*
     * Try the known subject containers.
     */

    let container =
      document.getElementById("pulseprepSubjectGrid");


    if (!container) {

      container =
        document.getElementById("subjects-container");

    }


    if (!container) {

      container =
        document.getElementById("subjectGrid");

    }


    /*
     * If the existing HTML doesn't have a grid,
     * don't destroy anything.
     */

    if (!container) {

      console.warn(
        "PulsePrep: subject grid container not found."
      );

      return;

    }


    const subjects =
      getSubjects();


    /*
     * No subject data.
     */

    if (!subjects.length) {

      container.innerHTML = `
        <div class="col-span-full
                    text-center
                    py-12
                    text-slate-500">

          <i class="fa-solid fa-book-open
                    text-4xl
                    mb-4
                    opacity-50"></i>

          <p class="font-semibold">
            No subjects available yet.
          </p>

        </div>
      `;

      return;

    }


    /*
     * Build subject cards.
     */

    container.innerHTML =
      subjects.map(function (subject, index) {

        const id =
          escapeHTML(subject.id);

        const name =
          escapeHTML(subject.name);

        const description =
          escapeHTML(subject.description);

        const icon =
          escapeHTML(subject.icon);


        return `

          <article
            class="group
                   bg-white
                   rounded-3xl
                   border
                   border-slate-200
                   shadow-sm
                   hover:shadow-xl
                   transition-all
                   duration-300
                   overflow-hidden"
          >

            <div class="p-6">

              <!-- ICON -->

              <div
                class="w-14
                       h-14
                       rounded-2xl
                       bg-teal-50
                       text-teal-600
                       flex
                       items-center
                       justify-center
                       mb-5
                       group-hover:scale-110
                       transition-transform"
              >

                <i
                  class="fa-solid ${icon} text-2xl"
                ></i>

              </div>


              <!-- SUBJECT NUMBER -->

              <div
                class="text-xs
                       font-bold
                       text-teal-600
                       uppercase
                       tracking-wider
                       mb-2"
              >

                Subject ${index + 1}

              </div>


              <!-- SUBJECT NAME -->

              <h3
                class="text-xl
                       font-extrabold
                       text-slate-900
                       leading-tight"
              >

                ${name}

              </h3>


              <!-- DESCRIPTION -->

              <p
                class="text-sm
                       text-slate-500
                       leading-relaxed
                       mt-3
                       min-h-[60px]"
              >

                ${description}

              </p>


              <!-- PROGRESS -->

              <div class="mt-5">

                <div
                  class="flex
                         justify-between
                         text-xs
                         font-semibold
                         text-slate-500
                         mb-2"
                >

                  <span>
                    Progress
                  </span>

                  <span>
                    0%
                  </span>

                </div>


                <div
                  class="h-2
                         bg-slate-100
                         rounded-full
                         overflow-hidden"
                >

                  <div
                    class="h-full
                           w-0
                           bg-teal-500
                           rounded-full"
                  ></div>

                </div>

              </div>


              <!-- START BUTTON -->

              <button
                type="button"
                class="w-full
                       mt-6
                       py-3
                       px-4
                       rounded-xl
                       bg-teal-600
                       hover:bg-teal-700
                       active:scale-[0.98]
                       text-white
                       font-bold
                       transition-all
                       cursor-pointer"
                data-subject-id="${id}"
                onclick="openPulsePrepSubject(this.dataset.subjectId)"
              >

                <i
                  class="fa-solid fa-book-open mr-2"
                ></i>

                Start Learning

              </button>

            </div>

          </article>

        `;

      }).join("");

  }


  /*
  ============================================================
  OPEN SUBJECT
  ============================================================
  */

  window.openPulsePrepSubject =
    function (subjectId) {

      console.log(
        "PulsePrep: Opening subject:",
        subjectId
      );


      /*
       * Find subject.
       */

      const subject =
        findSubject(subjectId);


      if (!subject) {

        console.error(
          "PulsePrep: Subject not found:",
          subjectId
        );

        return;

      }


      /*
       * Make sure subject-page exists.
       */

      const elements =
        ensureSubjectPage();


      /*
       * ======================================================
       * IMPORTANT
       * ======================================================
       *
       * subject-page.js is responsible for displaying the
       * actual lessons/questions.
       *
       * Try all known renderer function names.
       * ======================================================
       */


      let opened = false;


      /*
       * Main renderer.
       */

      if (
        typeof window.openPulsePrepSubjectPage ===
        "function"
      ) {

        try {

          window.openPulsePrepSubjectPage(
            subject.id
          );

          opened = true;

        } catch (error) {

          console.error(
            "PulsePrep: openPulsePrepSubjectPage failed:",
            error
          );

        }

      }


      /*
       * Alternative renderer names.
       */

      if (
        !opened &&
        typeof window.renderSubjectPage ===
        "function"
      ) {

        try {

          window.renderSubjectPage(
            subject.id
          );

          opened = true;

        } catch (error) {

          console.error(
            "PulsePrep: renderSubjectPage failed:",
            error
          );

        }

      }


      if (
        !opened &&
        typeof window.openSubjectPage ===
        "function"
      ) {

        try {

          window.openSubjectPage(
            subject.id
          );

          opened = true;

        } catch (error) {

          console.error(
            "PulsePrep: openSubjectPage failed:",
            error
          );

        }

      }


      /*
       * If the subject-page.js renderer isn't loaded yet,
       * display a useful fallback instead of an alert.
       */

      if (!opened) {

        elements.content.innerHTML = `

          <div
            class="max-w-5xl
                   mx-auto
                   px-4
                   py-8"
          >

            <button
              type="button"
              onclick="window.showPulsePrepSubjects()"
              class="mb-6
                     px-4
                     py-2
                     rounded-xl
                     bg-white
                     border
                     border-slate-200
                     text-slate-700
                     font-bold
                     hover:bg-slate-50"
            >

              <i
                class="fa-solid fa-arrow-left mr-2"
              ></i>

              Back to Subjects

            </button>


            <div
              class="bg-white
                     rounded-3xl
                     border
                     border-slate-200
                     shadow-sm
                     p-8"
            >

              <div
                class="w-16
                       h-16
                       rounded-2xl
                       bg-teal-50
                       text-teal-600
                       flex
                       items-center
                       justify-center
                       mb-5"
              >

                <i
                  class="fa-solid ${escapeHTML(subject.icon)}
                         text-2xl"
                ></i>

              </div>


              <h1
                class="text-3xl
                       font-black
                       text-slate-900"
              >

                ${escapeHTML(subject.name)}

              </h1>


              <p
                class="text-slate-500
                       mt-3"
              >

                ${escapeHTML(subject.description)}

              </p>


              <div
                class="mt-8
                       rounded-2xl
                       bg-amber-50
                       border
                       border-amber-200
                       p-5"
              >

                <p
                  class="font-bold
                         text-amber-800"
                >

                  Loading subject content...

                </p>

                <p
                  class="text-sm
                         text-amber-700
                         mt-1"
                >

                  The subject page renderer is still loading.

                </p>

              </div>

            </div>

          </div>

        `;

      }


      /*
       * Show the subject page.
       */

      showSubjectPage();


      /*
       * Scroll to top.
       */

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  /*
  ============================================================
  BACK TO SUBJECTS
  ============================================================
  */

  window.showPulsePrepSubjects =
    function () {

      if (
        typeof window.showTab ===
        "function"
      ) {

        try {

          window.showTab(
            "subject-library"
          );

        } catch (error) {

          console.warn(
            "PulsePrep: unable to switch to subject-library.",
            error
          );

        }

      }


      /*
       * Fallback.
       */

      document
        .querySelectorAll(".tab")
        .forEach(function (tab) {

          tab.classList.add("hidden");

        });


      const library =
        document.getElementById(
          "subject-library"
        );


      if (library) {

        library.classList.remove("hidden");

      }


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  /*
  ============================================================
  GLOBAL ALIAS
  ============================================================
  */

  window.renderSubjects =
    renderPulsePrepSubjects;

  window.renderPulsePrepSubjects =
    renderPulsePrepSubjects;


  /*
  ============================================================
  INITIALIZATION
  ============================================================
  */

  function initializeSubjects() {

    /*
     * subject data may load after this file.
     * Try again until it becomes available.
     */

    if (
      !Array.isArray(
        window.PULSEPREP_SUBJECTS
      )
    ) {

      setTimeout(
        initializeSubjects,
        100
      );

      return;

    }


    renderPulsePrepSubjects();

  }


  /*
  ============================================================
  START
  ============================================================
  */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeSubjects
    );

  } else {

    initializeSubjects();

  }


})();
