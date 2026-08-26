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
// SUBJECT-SPECIFIC LESSON VIEWER
// ==========================================================

window.openPulsePrepLesson = function (subjectId, lessonNumber) {

  const subject = subjects.find(
    item => String(item.id) === String(subjectId)
  );

  if (!subject) {
    console.error("Subject not found:", subjectId);
    return;
  }

  // ==========================================================
  // LESSON DATABASE
  // ==========================================================

  const lessons = {

    // ========================================================
    // ANATOMY & PHYSIOLOGY
    // ========================================================

    anatomy: [
      {
        title: "Introduction",
        notes: `
          <p>
            Anatomy is the study of the structure of the human body,
            while physiology is the study of how the body and its
            structures function.
          </p>

          <p class="mt-4">
            Anatomy and physiology form an important foundation for
            nursing practice because nurses need to understand normal
            body structure and function before identifying abnormalities.
          </p>
        `,
        points: [
          "Anatomy studies body structure.",
          "Physiology studies body function.",
          "Structure and function are closely related.",
          "Anatomy and physiology are fundamental to nursing."
        ],
        questions: [
          {
            question: "What is anatomy?",
            answer:
              "Anatomy is the study of the structure of the body."
          },
          {
            question: "What is physiology?",
            answer:
              "Physiology is the study of how body structures function."
          }
        ]
      },

      {
        title: "Anatomical Terminology",
        notes: `
          <p>
            Anatomical terminology provides healthcare professionals
            with a standardized way of describing body structures,
            positions and relationships.
          </p>

          <p class="mt-4">
            Important directional terms include superior, inferior,
            anterior, posterior, medial, lateral, proximal and distal.
          </p>
        `,
        points: [
          "Superior means toward the head.",
          "Inferior means toward the feet.",
          "Anterior means toward the front.",
          "Posterior means toward the back.",
          "Medial means toward the midline.",
          "Lateral means away from the midline.",
          "Proximal means closer to the point of attachment.",
          "Distal means farther from the point of attachment."
        ],
        questions: [
          {
            question: "What does medial mean?",
            answer:
              "Medial means toward the body's midline."
          },
          {
            question: "What does distal mean?",
            answer:
              "Distal means farther from the point of attachment."
          }
        ]
      },

      {
        title: "Cells & Tissues",
        notes: `
          <p>
            The cell is the basic structural and functional unit of
            life. Cells work together to form tissues.
          </p>

          <p class="mt-4">
            Tissues combine to form organs, and organs work together
            in organ systems.
          </p>
        `,
        points: [
          "Cells are the basic units of life.",
          "Similar cells form tissues.",
          "Tissues form organs.",
          "Organs form organ systems.",
          "The major tissue types include epithelial, connective, muscle and nervous tissue."
        ],
        questions: [
          {
            question:
              "What is the basic structural and functional unit of life?",
            answer: "The cell."
          },
          {
            question:
              "Name the four major tissue types.",
            answer:
              "Epithelial, connective, muscle and nervous tissue."
          }
        ]
      },

      {
        title: "Skeletal System",
        notes: `
          <p>
            The skeletal system provides support and protection for
            the body and contributes to movement.
          </p>

          <p class="mt-4">
            Bones also store minerals and contain bone marrow,
            which is involved in blood cell production.
          </p>
        `,
        points: [
          "Bones support the body.",
          "Bones protect internal organs.",
          "Bones assist movement.",
          "Bones store minerals.",
          "Bone marrow is involved in blood cell production."
        ],
        questions: [
          {
            question:
              "How many bones are normally found in the adult skeleton?",
            answer: "206 bones."
          },
          {
            question:
              "Give one function of the skeletal system.",
            answer:
              "Support, protection, movement, mineral storage or blood cell production."
          }
        ]
      },

      {
        title: "Muscular System",
        notes: `
          <p>
            The muscular system produces movement, helps maintain
            posture and contributes to heat production.
          </p>

          <p class="mt-4">
            The three major types of muscle tissue are skeletal,
            cardiac and smooth muscle.
          </p>
        `,
        points: [
          "Skeletal muscle is generally voluntary.",
          "Cardiac muscle is found in the heart.",
          "Smooth muscle is found in many internal organs.",
          "Muscle contraction produces movement.",
          "Muscles contribute to heat production."
        ],
        questions: [
          {
            question:
              "Where is cardiac muscle found?",
            answer: "In the heart."
          },
          {
            question:
              "What are the three major types of muscle?",
            answer:
              "Skeletal, cardiac and smooth muscle."
          }
        ]
      },

      {
        title: "Cardiovascular System",
        notes: `
          <p>
            The cardiovascular system consists of the heart, blood
            and blood vessels.
          </p>

          <p class="mt-4">
            Its major functions include transporting oxygen,
            nutrients, hormones and waste products throughout the body.
          </p>
        `,
        points: [
          "The heart pumps blood.",
          "Arteries generally carry blood away from the heart.",
          "Veins generally carry blood toward the heart.",
          "Capillaries are important sites of exchange.",
          "Blood transports oxygen and nutrients."
        ],
        questions: [
          {
            question:
              "What organ pumps blood throughout the body?",
            answer: "The heart."
          },
          {
            question:
              "What is the major function of capillaries?",
            answer:
              "They allow exchange between blood and surrounding tissues."
          }
        ]
      },

      {
        title: "Respiratory System",
        notes: `
          <p>
            The respiratory system enables the body to obtain oxygen
            and eliminate carbon dioxide.
          </p>

          <p class="mt-4">
            Gas exchange occurs primarily between the alveoli and
            pulmonary capillaries.
          </p>
        `,
        points: [
          "The respiratory system supplies oxygen.",
          "It removes carbon dioxide.",
          "The lungs contain alveoli.",
          "Gas exchange occurs at the alveoli.",
          "The diaphragm plays an important role in breathing."
        ],
        questions: [
          {
            question:
              "Where does most gas exchange occur?",
            answer: "At the alveoli."
          },
          {
            question:
              "Which major muscle helps drive breathing?",
            answer: "The diaphragm."
          }
        ]
      },

      {
        title: "Nervous System",
        notes: `
          <p>
            The nervous system receives information, processes it
            and coordinates responses throughout the body.
          </p>

          <p class="mt-4">
            The central nervous system consists of the brain and
            spinal cord. The peripheral nervous system consists
            mainly of nerves outside the CNS.
          </p>
        `,
        points: [
          "The brain and spinal cord form the CNS.",
          "The peripheral nervous system contains nerves outside the CNS.",
          "Neurons transmit signals.",
          "The nervous system coordinates body functions."
        ],
        questions: [
          {
            question:
              "What structures make up the central nervous system?",
            answer:
              "The brain and spinal cord."
          },
          {
            question:
              "What is the basic functional cell of the nervous system?",
            answer: "The neuron."
          }
        ]
      },

      {
        title: "Digestive System",
        notes: `
          <p>
            The digestive system breaks food down into substances
            that can be absorbed and used by the body.
          </p>

          <p class="mt-4">
            The digestive tract includes the mouth, esophagus,
            stomach, small intestine and large intestine.
          </p>
        `,
        points: [
          "Digestion begins in the mouth.",
          "The stomach contributes to digestion.",
          "Most nutrient absorption occurs in the small intestine.",
          "The large intestine absorbs water.",
          "The liver and pancreas assist digestion."
        ],
        questions: [
          {
            question:
              "Where does most nutrient absorption occur?",
            answer: "In the small intestine."
          },
          {
            question:
              "What is one function of the large intestine?",
            answer:
              "Absorption of water and formation of feces."
          }
        ]
      },

      {
        title: "Urinary System",
        notes: `
          <p>
            The urinary system removes metabolic wastes and helps
            regulate fluid, electrolyte and acid-base balance.
          </p>

          <p class="mt-4">
            The kidneys produce urine. The ureters transport urine
            to the bladder, where it is stored before elimination
            through the urethra.
          </p>
        `,
        points: [
          "The kidneys produce urine.",
          "The ureters transport urine.",
          "The bladder stores urine.",
          "The urethra carries urine out of the body.",
          "The kidneys help regulate fluid and electrolytes."
        ],
        questions: [
          {
            question:
              "Which organs produce urine?",
            answer: "The kidneys."
          },
          {
            question:
              "What is the function of the bladder?",
            answer:
              "It stores urine before elimination."
          }
        ]
      },

      {
        title: "Reproductive System",
        notes: `
          <p>
            The reproductive system produces reproductive cells
            and supports human reproduction.
          </p>

          <p class="mt-4">
            The male reproductive system produces sperm, while the
            female reproductive system produces ova and supports
            fertilization and pregnancy.
          </p>
        `,
        points: [
          "The testes produce sperm and testosterone.",
          "The ovaries produce ova and reproductive hormones.",
          "The reproductive system supports reproduction.",
          "Fertilization involves sperm and ovum.",
          "The female reproductive system supports pregnancy."
        ],
        questions: [
          {
            question:
              "What is the male reproductive cell?",
            answer: "Sperm."
          },
          {
            question:
              "Which organs produce ova?",
            answer: "The ovaries."
          }
        ]
      },

      {
        title: "Endocrine System",
        notes: `
          <p>
            The endocrine system consists of glands and tissues
            that produce hormones.
          </p>

          <p class="mt-4">
            Hormones act as chemical messengers and help regulate
            metabolism, growth, reproduction and other body functions.
          </p>
        `,
        points: [
          "Endocrine glands produce hormones.",
          "Hormones are chemical messengers.",
          "The pituitary gland regulates many endocrine functions.",
          "The thyroid has important effects on metabolism.",
          "The pancreas produces insulin."
        ],
        questions: [
          {
            question:
              "What are hormones?",
            answer:
              "Hormones are chemical messengers produced by endocrine tissues or glands."
          },
          {
            question:
              "Which hormone helps lower blood glucose?",
            answer: "Insulin."
          }
        ]
      }
    ],


    // ========================================================
    // MICROBIOLOGY
    // ========================================================

    microbiology: [
      {
        title: "Introduction to Microbiology",
        notes: `
          <p>
            Microbiology is the study of microorganisms and their
            interactions with humans, animals, plants and the environment.
          </p>

          <p class="mt-4">
            Microorganisms include bacteria, viruses, fungi, protozoa
            and certain microscopic parasites.
          </p>
        `,
        points: [
          "Microbiology studies microorganisms.",
          "Some microorganisms cause disease.",
          "Some microorganisms are beneficial.",
          "Microbiology is important in infection prevention and nursing."
        ],
        questions: [
          {
            question:
              "What is microbiology?",
            answer:
              "It is the study of microorganisms."
          },
          {
            question:
              "Name two types of microorganisms.",
            answer:
              "Examples include bacteria, viruses, fungi and protozoa."
          }
        ]
      },

      {
        title: "Bacteria",
        notes: `
          <p>
            Bacteria are single-celled prokaryotic microorganisms.
            They can be found in soil, water, food and on or within
            the human body.
          </p>

          <p class="mt-4">
            Some bacteria are harmless or beneficial, while others
            can cause infectious diseases.
          </p>
        `,
        points: [
          "Bacteria are prokaryotic cells.",
          "Bacteria are generally single-celled.",
          "Some bacteria are beneficial.",
          "Some bacteria cause disease.",
          "Bacteria reproduce by binary fission."
        ],
        questions: [
          {
            question:
              "Are bacteria prokaryotic or eukaryotic?",
            answer: "Prokaryotic."
          },
          {
            question:
              "How do many bacteria reproduce?",
            answer: "By binary fission."
          }
        ]
      },

      {
        title: "Viruses",
        notes: `
          <p>
            Viruses are infectious agents that require living host
            cells to replicate.
          </p>

          <p class="mt-4">
            Unlike bacteria, viruses are not cellular organisms.
            Examples of viral diseases include influenza and measles.
          </p>
        `,
        points: [
          "Viruses require host cells for replication.",
          "Viruses are not cellular organisms.",
          "Viral infections can affect many body systems.",
          "Vaccination can prevent some viral infections."
        ],
        questions: [
          {
            question:
              "Can viruses reproduce independently without host cells?",
            answer:
              "No. Viruses require suitable host cells for replication."
          },
          {
            question:
              "Give one example of a viral disease.",
            answer:
              "Influenza, measles, hepatitis or another viral infection."
          }
        ]
      },

      {
        title: "Fungi",
        notes: `
          <p>
            Fungi are eukaryotic organisms that include yeasts and molds.
            Some fungi can cause infections in humans.
          </p>
        `,
        points: [
          "Fungi are eukaryotic organisms.",
          "Yeasts and molds are types of fungi.",
          "Some fungal infections affect skin and mucous membranes.",
          "Fungal infections are called mycoses."
        ],
        questions: [
          {
            question:
              "Are fungi prokaryotic or eukaryotic?",
            answer: "Eukaryotic."
          },
          {
            question:
              "What are two common forms of fungi?",
            answer: "Yeasts and molds."
          }
        ]
      },

      {
        title: "Protozoa",
        notes: `
          <p>
            Protozoa are microscopic single-celled eukaryotic organisms.
            Some species can cause disease in humans.
          </p>
        `,
        points: [
          "Protozoa are eukaryotic.",
          "They are generally single-celled.",
          "Some protozoa are parasitic.",
          "Some protozoal infections are transmitted through contaminated food or water."
        ],
        questions: [
          {
            question:
              "Are protozoa prokaryotic or eukaryotic?",
            answer: "Eukaryotic."
          },
          {
            question:
              "Can protozoa cause human disease?",
            answer: "Yes."
          }
        ]
      },

      {
        title: "Infection & Disease",
        notes: `
          <p>
            Infection occurs when microorganisms enter a host,
            survive and multiply. Disease may occur when the
            infection causes tissue damage or disrupts normal function.
          </p>
        `,
        points: [
          "Infection involves microorganisms entering and multiplying in a host.",
          "Not every exposure results in disease.",
          "The immune system helps defend against infection.",
          "Infection control reduces transmission."
        ],
        questions: [
          {
            question:
              "What is an infection?",
            answer:
              "An infection occurs when microorganisms enter and multiply in a host."
          },
          {
            question:
              "Why is infection prevention important in nursing?",
            answer:
              "It helps reduce transmission of infectious organisms and protect patients and healthcare workers."
          }
        ]
      },

      {
        title: "Sterilization & Disinfection",
        notes: `
          <p>
            Sterilization destroys or removes all forms of microbial
            life from an object or environment. Disinfection reduces
            or eliminates many pathogenic microorganisms on inanimate
            surfaces.
          </p>
        `,
        points: [
          "Sterilization is more comprehensive than disinfection.",
          "Cleaning removes dirt and organic material.",
          "Disinfection is commonly used on environmental surfaces.",
          "Sterilization is required for appropriate critical instruments."
        ],
        questions: [
          {
            question:
              "What is sterilization?",
            answer:
              "A process that destroys or removes all forms of microbial life."
          },
          {
            question:
              "Is sterilization more comprehensive than disinfection?",
            answer: "Yes."
          }
        ]
      },

      {
        title: "Immunity",
        notes: `
          <p>
            Immunity is the body's ability to resist or respond to
            infectious agents and other foreign substances.
          </p>

          <p class="mt-4">
            Immunity can involve innate defenses and adaptive immune
            responses.
          </p>
        `,
        points: [
          "Innate immunity provides broad, immediate defenses.",
          "Adaptive immunity develops specific responses.",
          "Antibodies are produced by B lymphocytes and their descendants.",
          "Vaccination can produce protective immune memory."
        ],
        questions: [
          {
            question:
              "What is immunity?",
            answer:
              "The body's ability to resist or respond to infectious agents and other foreign substances."
          },
          {
            question:
              "What is one purpose of vaccination?",
            answer:
              "To stimulate protective immune responses and immune memory."
          }
        ]
      }
    ]

  };


  // ==========================================================
  // GET THE CORRECT SUBJECT LESSONS
  // ==========================================================

  const subjectKey =
    String(subject.id)
      .toLowerCase()
      .trim();

  const subjectLessons =
    lessons[subjectKey];


  // ==========================================================
  // IMPORTANT:
  // DO NOT SHOW ANATOMY CONTENT FOR ANOTHER SUBJECT
  // ==========================================================

  if (!subjectLessons) {

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

      <div class="max-w-5xl mx-auto px-4 py-8">

        <button
          onclick="openPulsePrepSubjectPage('${escapeHTML(subject.id)}')"
          class="mb-6 px-4 py-2 rounded-xl
                 bg-white border border-slate-200
                 text-slate-700 font-bold
                 hover:bg-slate-50"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Subject
        </button>

        <div
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-8 text-center"
        >

          <div
            class="w-16 h-16
                   mx-auto
                   rounded-2xl
                   bg-teal-50
                   text-teal-600
                   flex items-center
                   justify-center"
          >
            <i class="fa-solid fa-book-open text-2xl"></i>
          </div>

          <h1
            class="text-2xl
                   font-black
                   text-slate-900
                   mt-5"
          >
            ${escapeHTML(subject.name)}
          </h1>

          <p
            class="text-slate-500
                   mt-3"
          >
            Lessons for this subject are being prepared.
          </p>

          <p
            class="text-sm
                   text-slate-400
                   mt-2"
          >
            No other subject's lessons will be displayed here.
          </p>

        </div>

      </div>

    `;

    if (typeof window.showTab === "function") {
      window.showTab("subject-page");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  // ==========================================================
  // GET SELECTED LESSON
  // ==========================================================

  const lesson =
    subjectLessons[lessonNumber - 1];

  if (!lesson) {
    console.error(
      "Lesson not found:",
      subjectId,
      lessonNumber
    );
    return;
  }


  // ==========================================================
  // SUBJECT PAGE CONTAINER
  // ==========================================================

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
    lessonNumber < subjectLessons.length
      ? lessonNumber + 1
      : null;


  const progress =
    Math.round(
      (lessonNumber /
        subjectLessons.length) * 100
    );


  // ==========================================================
  // RENDER LESSON
  // ==========================================================

  page.innerHTML = `

    <div
      class="max-w-5xl
             mx-auto
             px-4
             py-6"
    >

      <!-- Back -->
      <button
        onclick="
          openPulsePrepSubjectPage(
            '${escapeHTML(subject.id)}'
          )
        "
        class="mb-6
               px-4 py-2
               rounded-xl
               bg-white
               border border-slate-200
               text-slate-700
               font-bold
               hover:bg-slate-50"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Back to Lessons
      </button>


      <!-- Header -->
      <div
        class="bg-gradient-to-r
               from-slate-900
               to-teal-700
               rounded-3xl
               p-7 sm:p-10
               text-white
               shadow-xl"
      >

        <div
          class="text-xs
                 uppercase
                 tracking-wider
                 font-bold
                 text-teal-200"
        >
          ${escapeHTML(subject.name)}
        </div>

        <h1
          class="text-3xl sm:text-4xl
                 font-black
                 mt-2"
        >
          ${escapeHTML(lesson.title)}
        </h1>

        <p
          class="text-slate-200
                 mt-3"
        >
          Lesson ${lessonNumber}
          of
          ${subjectLessons.length}
        </p>


        <!-- Progress -->
        <div class="mt-6">

          <div
            class="flex
                   justify-between
                   text-xs
                   font-bold
                   text-teal-100
                   mb-2"
          >
            <span>
              Course Progress
            </span>

            <span>
              ${progress}%
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
              style="width:${progress}%"
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

        <div
          class="flex
                 items-center
                 gap-3
                 mb-5"
        >

          <div
            class="w-11 h-11
                   rounded-xl
                   bg-teal-50
                   text-teal-600
                   flex
                   items-center
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

        <div
          class="flex
                 items-center
                 gap-3
                 mb-5"
        >

          <div
            class="w-11 h-11
                   rounded-xl
                   bg-amber-50
                   text-amber-600
                   flex
                   items-center
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
              class="flex
                     gap-3
                     items-start"
            >

              <span
                class="mt-1
                       w-6 h-6
                       rounded-full
                       bg-teal-50
                       text-teal-600
                       flex
                       items-center
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

        <div
          class="flex
                 items-center
                 gap-3
                 mb-5"
        >

          <div
            class="w-11 h-11
                   rounded-xl
                   bg-purple-50
                   text-purple-600
                   flex
                   items-center
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
                  type="button"
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
                  class="hidden
                         mt-4
                         p-4
                         rounded-xl
                         bg-teal-50
                         border border-teal-100
                         text-teal-900"
                >
                  <strong>
                    Answer:
                  </strong>

                  ${escapeHTML(item.answer)}

                </div>

              </div>

            `
          ).join("")}

        </div>

      </section>


      <!-- Lesson Navigation -->
      <div
        class="flex
               flex-col
               sm:flex-row
               gap-3
               justify-between
               mt-6"
      >

        ${
          previousLesson
            ? `
              <button
                type="button"
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
                <i
                  class="fa-solid
                         fa-arrow-left
                         mr-2"
                ></i>

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
                type="button"
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

                <i
                  class="fa-solid
                         fa-arrow-right
                         ml-2"
                ></i>

              </button>
            `
            : `
              <button
                type="button"
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

                <i
                  class="fa-solid
                         fa-check
                         mr-2"
                ></i>

                Complete Course

              </button>
            `
        }

      </div>

    </div>

  `;


  // ==========================================================
  // PRESERVE EXISTING NAVIGATION
  // ==========================================================

  if (typeof window.showTab === "function") {
    window.showTab("subject-page");
  }


  // Always start lesson at top.
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};



})();
