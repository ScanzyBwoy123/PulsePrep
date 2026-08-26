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
// REAL LESSON VIEWER
// ==========================================================

window.openPulsePrepLesson =
  function (subjectId, lessonNumber) {

    const subject =
      subjects.find(
        item => String(item.id) === String(subjectId)
      );

    if (!subject) {
      console.error("Subject not found:", subjectId);
      return;
    }

    // ========================================================
    // ANATOMY & PHYSIOLOGY LESSONS
    // ========================================================

    const anatomyLessons = [

      {
        title: "Introduction",
        notes: `
          <p>
            Anatomy is the study of the structure of the human body,
            while physiology is the study of how those structures function.
          </p>

          <p class="mt-4">
            Understanding anatomy and physiology is essential for nursing
            because nurses need to understand normal body structure and
            function before they can recognize abnormalities and disease.
          </p>
        `,
        points: [
          "Anatomy studies body structure.",
          "Physiology studies body function.",
          "Structure and function are closely related.",
          "Anatomy and physiology provide the foundation for nursing practice."
        ],
        questions: [
          {
            question: "What is anatomy?",
            answer: "Anatomy is the study of the structure of the body."
          },
          {
            question: "What is physiology?",
            answer: "Physiology is the study of how the body and its structures function."
          }
        ]
      },

      {
        title: "Anatomical Terminology",
        notes: `
          <p>
            Anatomical terminology provides healthcare professionals with
            a standardized language for describing body structures,
            positions and movements.
          </p>

          <p class="mt-4">
            Important terms include anatomical position, superior,
            inferior, anterior, posterior, medial, lateral, proximal
            and distal.
          </p>
        `,
        points: [
          "Anatomical position is the standard reference position.",
          "Superior means toward the head.",
          "Inferior means toward the feet.",
          "Medial means toward the midline.",
          "Lateral means away from the midline.",
          "Proximal means closer to the point of attachment.",
          "Distal means farther from the point of attachment."
        ],
        questions: [
          {
            question: "What does medial mean?",
            answer: "Medial means toward the body's midline."
          },
          {
            question: "What does distal mean?",
            answer: "Distal means farther from the point of attachment."
          }
        ]
      },

      {
        title: "Cells & Tissues",
        notes: `
          <p>
            The cell is the basic structural and functional unit of life.
            Cells combine to form tissues, tissues form organs, and organs
            work together in organ systems.
          </p>

          <p class="mt-4">
            The major tissue types are epithelial, connective, muscle
            and nervous tissue.
          </p>
        `,
        points: [
          "Cells are the basic units of life.",
          "Similar cells form tissues.",
          "Tissues combine to form organs.",
          "Organs work together in organ systems.",
          "The four major tissue types are epithelial, connective, muscle and nervous tissue."
        ],
        questions: [
          {
            question: "What is the basic structural unit of the human body?",
            answer: "The cell."
          },
          {
            question: "Name the four major tissue types.",
            answer: "Epithelial, connective, muscle and nervous tissue."
          }
        ]
      },

      {
        title: "Skeletal System",
        notes: `
          <p>
            The skeletal system provides support and protection for the
            body. It also assists with movement, mineral storage and
            blood cell production.
          </p>

          <p class="mt-4">
            The adult human skeleton normally contains 206 bones.
          </p>
        `,
        points: [
          "The skeleton supports the body.",
          "Bones protect internal organs.",
          "Bones help produce blood cells.",
          "Bones store minerals such as calcium and phosphorus.",
          "The adult skeleton normally contains 206 bones."
        ],
        questions: [
          {
            question: "How many bones are normally found in an adult human skeleton?",
            answer: "206 bones."
          },
          {
            question: "Give one major function of the skeletal system.",
            answer: "Support, protection, movement, mineral storage or blood cell production."
          }
        ]
      },

      {
        title: "Muscular System",
        notes: `
          <p>
            The muscular system allows the body to move and helps maintain
            posture. Muscles also generate heat during contraction.
          </p>

          <p class="mt-4">
            The three major types of muscle tissue are skeletal, cardiac
            and smooth muscle.
          </p>
        `,
        points: [
          "Skeletal muscle is generally under voluntary control.",
          "Cardiac muscle is found in the heart.",
          "Smooth muscle is found in many internal organs.",
          "Muscle contraction produces movement.",
          "Muscles also contribute to heat production."
        ],
        questions: [
          {
            question: "Where is cardiac muscle found?",
            answer: "In the heart."
          },
          {
            question: "Name the three major types of muscle tissue.",
            answer: "Skeletal, cardiac and smooth muscle."
          }
        ]
      },

      {
        title: "Cardiovascular System",
        notes: `
          <p>
            The cardiovascular system consists primarily of the heart,
            blood and blood vessels. It transports oxygen, nutrients,
            hormones and waste products throughout the body.
          </p>

          <p class="mt-4">
            The heart acts as a muscular pump that circulates blood
            through pulmonary and systemic circulation.
          </p>
        `,
        points: [
          "The heart pumps blood.",
          "Arteries generally carry blood away from the heart.",
          "Veins generally carry blood toward the heart.",
          "Capillaries allow exchange between blood and tissues.",
          "The cardiovascular system transports oxygen and nutrients."
        ],
        questions: [
          {
            question: "What organ pumps blood throughout the body?",
            answer: "The heart."
          },
          {
            question: "What is the function of capillaries?",
            answer: "They allow exchange of substances between blood and surrounding tissues."
          }
        ]
      },

      {
        title: "Respiratory System",
        notes: `
          <p>
            The respiratory system allows the body to obtain oxygen and
            eliminate carbon dioxide.
          </p>

          <p class="mt-4">
            Major structures include the nose, pharynx, larynx, trachea,
            bronchi and lungs. Gas exchange occurs primarily in the
            alveoli of the lungs.
          </p>
        `,
        points: [
          "The respiratory system supplies oxygen.",
          "It removes carbon dioxide.",
          "The lungs contain millions of alveoli.",
          "Gas exchange occurs at the alveoli.",
          "The diaphragm plays an important role in breathing."
        ],
        questions: [
          {
            question: "Where does most gas exchange occur in the lungs?",
            answer: "At the alveoli."
          },
          {
            question: "Which muscle is especially important for breathing?",
            answer: "The diaphragm."
          }
        ]
      },

      {
        title: "Nervous System",
        notes: `
          <p>
            The nervous system controls and coordinates many activities
            of the body. It receives information, processes it and
            produces appropriate responses.
          </p>

          <p class="mt-4">
            The central nervous system consists of the brain and spinal
            cord. The peripheral nervous system consists of nerves outside
            the brain and spinal cord.
          </p>
        `,
        points: [
          "The brain and spinal cord form the central nervous system.",
          "The peripheral nervous system contains nerves outside the CNS.",
          "Neurons transmit electrical and chemical signals.",
          "The nervous system helps coordinate body functions.",
          "The brain is the major control center."
        ],
        questions: [
          {
            question: "What structures make up the central nervous system?",
            answer: "The brain and spinal cord."
          },
          {
            question: "What is the basic functional cell of the nervous system?",
            answer: "The neuron."
          }
        ]
      },

      {
        title: "Digestive System",
        notes: `
          <p>
            The digestive system breaks food down into substances that
            can be absorbed and used by the body.
          </p>

          <p class="mt-4">
            Major organs include the mouth, esophagus, stomach, small
            intestine and large intestine. The liver, pancreas and
            gallbladder also support digestion.
          </p>
        `,
        points: [
          "Digestion begins in the mouth.",
          "The stomach helps digest food.",
          "Most nutrient absorption occurs in the small intestine.",
          "The large intestine absorbs water and forms feces.",
          "The liver and pancreas assist digestion."
        ],
        questions: [
          {
            question: "Where does most nutrient absorption occur?",
            answer: "In the small intestine."
          },
          {
            question: "What is one major function of the large intestine?",
            answer: "Absorption of water and formation of feces."
          }
        ]
      },

      {
        title: "Urinary System",
        notes: `
          <p>
            The urinary system helps maintain the body's internal
            environment by removing waste products and regulating water,
            electrolytes and acid-base balance.
          </p>

          <p class="mt-4">
            The kidneys filter the blood and produce urine. Urine travels
            through the ureters to the bladder and leaves the body through
            the urethra.
          </p>
        `,
        points: [
          "The kidneys produce urine.",
          "The ureters carry urine to the bladder.",
          "The bladder stores urine.",
          "The urethra carries urine out of the body.",
          "The kidneys help regulate fluid and electrolyte balance."
        ],
        questions: [
          {
            question: "Which organs produce urine?",
            answer: "The kidneys."
          },
          {
            question: "What is the function of the urinary bladder?",
            answer: "It stores urine before it is eliminated."
          }
        ]
      },

      {
        title: "Reproductive System",
        notes: `
          <p>
            The reproductive system is responsible for producing
            reproductive cells and supporting reproduction.
          </p>

          <p class="mt-4">
            The male reproductive system produces sperm, while the female
            reproductive system produces ova and provides the structures
            needed for fertilization and pregnancy.
          </p>
        `,
        points: [
          "The testes produce sperm and testosterone.",
          "The ovaries produce ova and reproductive hormones.",
          "The reproductive system supports human reproduction.",
          "Fertilization normally involves the fusion of sperm and ovum.",
          "The female reproductive system supports pregnancy."
        ],
        questions: [
          {
            question: "What is the male reproductive cell?",
            answer: "The sperm cell."
          },
          {
            question: "Which organs produce ova?",
            answer: "The ovaries."
          }
        ]
      },

      {
        title: "Endocrine System",
        notes: `
          <p>
            The endocrine system consists of glands that produce hormones.
            Hormones are chemical messengers that regulate many processes
            throughout the body.
          </p>

          <p class="mt-4">
            Important endocrine glands include the pituitary, thyroid,
            parathyroid, adrenal glands, pancreas, ovaries and testes.
          </p>
        `,
        points: [
          "The endocrine system produces hormones.",
          "Hormones act as chemical messengers.",
          "The pituitary gland regulates many other endocrine functions.",
          "The thyroid influences metabolism.",
          "The pancreas produces hormones including insulin."
        ],
        questions: [
          {
            question: "What are hormones?",
            answer: "Hormones are chemical messengers produced by endocrine tissues or glands."
          },
          {
            question: "Which hormone helps regulate blood glucose?",
            answer: "Insulin is a major hormone involved in lowering blood glucose."
          }
        ]
      }

    ];

    // ========================================================
    // SELECT LESSON
    // ========================================================

    const lesson =
      anatomyLessons[lessonNumber - 1];

    if (!lesson) {
      console.error(
        "Lesson not found:",
        lessonNumber
      );
      return;
    }

    // ========================================================
    // CREATE LESSON PAGE
    // ========================================================

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

    const previousLesson =
      lessonNumber > 1
        ? lessonNumber - 1
        : null;

    const nextLesson =
      lessonNumber < anatomyLessons.length
        ? lessonNumber + 1
        : null;

    page.innerHTML = `

      <div class="max-w-5xl mx-auto px-4 py-6">

        <!-- Back -->
        <button
          onclick="openPulsePrepSubjectPage('${escapeHTML(subject.id)}')"
          class="mb-6 px-4 py-2 rounded-xl
                 bg-white border border-slate-200
                 text-slate-700 font-bold
                 hover:bg-slate-50"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Lessons
        </button>


        <!-- Lesson Header -->
        <div
          class="bg-gradient-to-r
                 from-slate-900
                 to-teal-700
                 rounded-3xl
                 p-7 sm:p-10
                 text-white
                 shadow-xl"
        >

          <div class="text-xs uppercase
                      tracking-wider
                      font-bold
                      text-teal-200">
            ${escapeHTML(subject.name)}
          </div>

          <h1
            class="text-3xl sm:text-4xl
                   font-black mt-2"
          >
            ${escapeHTML(lesson.title)}
          </h1>

          <p class="text-slate-200 mt-3">
            Lesson ${lessonNumber} of ${anatomyLessons.length}
          </p>

          <!-- Progress -->
          <div class="mt-6">

            <div
              class="flex justify-between
                     text-xs font-bold
                     text-teal-100 mb-2"
            >
              <span>Course Progress</span>
              <span>
                ${Math.round(
                  (lessonNumber /
                    anatomyLessons.length) * 100
                )}%
              </span>
            </div>

            <div
              class="h-2
                     bg-white/20
                     rounded-full
                     overflow-hidden"
            >

              <div
                class="h-full
                       bg-white
                       rounded-full"
                style="
                  width:${Math.round(
                    (lessonNumber /
                      anatomyLessons.length) * 100
                  )}%
                "
              ></div>

            </div>

          </div>

        </div>


        <!-- Study Notes -->
        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div class="flex items-center gap-3 mb-5">

            <div
              class="w-11 h-11
                     rounded-xl
                     bg-teal-50
                     text-teal-600
                     flex items-center
                     justify-center"
            >
              <i class="fa-solid fa-book-open"></i>
            </div>

            <h2
              class="text-2xl
                     font-black
                     text-slate-900"
            >
              Study Notes
            </h2>

          </div>

          <div
            class="text-slate-700
                   leading-8"
          >
            ${lesson.notes}
          </div>

        </section>


        <!-- Key Points -->
        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div class="flex items-center gap-3 mb-5">

            <div
              class="w-11 h-11
                     rounded-xl
                     bg-amber-50
                     text-amber-600
                     flex items-center
                     justify-center"
            >
              <i class="fa-solid fa-brain"></i>
            </div>

            <h2
              class="text-2xl
                     font-black
                     text-slate-900"
            >
              Key Points
            </h2>

          </div>

          <ul class="space-y-3">

            ${lesson.points.map(point => `

              <li
                class="flex gap-3
                       items-start"
              >

                <span
                  class="mt-1
                         w-6 h-6
                         rounded-full
                         bg-teal-50
                         text-teal-600
                         flex items-center
                         justify-center
                         flex-shrink-0"
                >
                  <i
                    class="fa-solid
                           fa-check
                           text-xs"
                  ></i>
                </span>

                <span
                  class="text-slate-700
                         leading-relaxed"
                >
                  ${escapeHTML(point)}
                </span>

              </li>

            `).join("")}

          </ul>

        </section>


        <!-- Practice Questions -->
        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div class="flex items-center gap-3 mb-5">

            <div
              class="w-11 h-11
                     rounded-xl
                     bg-purple-50
                     text-purple-600
                     flex items-center
                     justify-center"
            >
              <i class="fa-solid fa-circle-question"></i>
            </div>

            <h2
              class="text-2xl
                     font-black
                     text-slate-900"
            >
              Practice Questions
            </h2>

          </div>


          <div class="space-y-5">

            ${lesson.questions.map(
              (item, index) => `

              <div
                class="rounded-2xl
                       border border-slate-200
                       p-5"
              >

                <p
                  class="font-bold
                         text-slate-800"
                >
                  ${index + 1}.
                  ${escapeHTML(item.question)}
                </p>

                <button
                  onclick="
                    this.nextElementSibling
                      .classList.toggle('hidden')
                  "
                  class="mt-4
                         px-4 py-2
                         rounded-xl
                         bg-slate-900
                         text-white
                         text-sm
                         font-bold
                         hover:bg-teal-600"
                >
                  <i class="fa-solid fa-eye mr-2"></i>
                  Show Answer
                </button>

                <div
                  class="hidden mt-4
                         p-4
                         rounded-xl
                         bg-teal-50
                         border border-teal-100
                         text-teal-900"
                >
                  <strong>Answer:</strong>
                  ${escapeHTML(item.answer)}
                </div>

              </div>

            `
            ).join("")}

          </div>

        </section>


        <!-- Navigation -->
        <div
          class="flex flex-col
                 sm:flex-row
                 gap-3
                 justify-between
                 mt-6"
        >

          ${
            previousLesson
              ? `
                <button
                  onclick="
                    openPulsePrepLesson(
                      '${escapeHTML(subject.id)}',
                      ${previousLesson}
                    )
                  "
                  class="flex-1
                         py-4
                         rounded-xl
                         border border-slate-200
                         bg-white
                         text-slate-700
                         font-bold
                         hover:bg-slate-50"
                >
                  <i class="fa-solid fa-arrow-left mr-2"></i>
                  Previous Lesson
                </button>
              `
              : `
                <div class="flex-1"></div>
              `
          }


          ${
            nextLesson
              ? `
                <button
                  onclick="
                    openPulsePrepLesson(
                      '${escapeHTML(subject.id)}',
                      ${nextLesson}
                    )
                  "
                  class="flex-1
                         py-4
                         rounded-xl
                         bg-teal-600
                         text-white
                         font-bold
                         hover:bg-teal-700"
                >
                  Next Lesson
                  <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
              `
              : `
                <button
                  onclick="
                    openPulsePrepSubjectPage(
                      '${escapeHTML(subject.id)}'
                    )
                  "
                  class="flex-1
                         py-4
                         rounded-xl
                         bg-teal-600
                         text-white
                         font-bold
                         hover:bg-teal-700"
                >
                  <i class="fa-solid fa-check mr-2"></i>
                  Complete Course
                </button>
              `
          }

        </div>

      </div>
    `;

    // Keep the existing navigation system.
    if (typeof window.showTab === "function") {
      window.showTab("subject-page");
    }

    // Scroll to the top of the lesson.
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

})();
