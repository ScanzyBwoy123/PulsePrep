// ============================================================
// PULSEPREP — INDIVIDUAL SUBJECT PAGE
// FINAL SUBJECT-SPECIFIC LESSON ENGINE
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // HELPERS
  // ==========================================================

  function getSubjects() {
    return Array.isArray(window.PULSEPREP_SUBJECTS)
      ? window.PULSEPREP_SUBJECTS
      : [];
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getPage() {
    return document.getElementById("pulseprepSubjectPage");
  }

  function goToSubjectPageTab() {
    if (typeof window.showTab === "function") {
      window.showTab("subject-page");
    }
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // ==========================================================
  // CURRICULUM
  // ==========================================================

  const curriculum = {

    // ========================================================
    // 1. ANATOMY & PHYSIOLOGY
    // ========================================================
"anatomy-physiology": [

  // ======================================================
  // 1. INTRODUCTION TO ANATOMY & PHYSIOLOGY
  // ======================================================
  {
    title: "Introduction to Anatomy & Physiology",

    notes: `
      <h3 class="text-xl font-black mb-3">What are Anatomy and Physiology?</h3>

      <p class="mb-4">
        <strong>Anatomy</strong> is the study of the structure of the human body,
        while <strong>physiology</strong> is the study of how the body and its
        parts function.
      </p>

      <p class="mb-4">
        Anatomy and physiology are closely related. The structure of a body part
        usually determines how it performs its function.
      </p>

      <h3 class="text-xl font-black mb-3">Levels of Organization</h3>

      <ol class="list-decimal ml-6 space-y-2">
        <li>Chemical level — atoms and molecules.</li>
        <li>Cellular level — cells, the basic units of life.</li>
        <li>Tissue level — groups of similar cells performing a function.</li>
        <li>Organ level — two or more tissues forming an organ.</li>
        <li>Organ-system level — organs working together.</li>
        <li>Organism level — the complete human being.</li>
      </ol>

      <h3 class="text-xl font-black mt-6 mb-3">Homeostasis</h3>

      <p class="mb-4">
        <strong>Homeostasis</strong> is the maintenance of a relatively stable
        internal environment despite changes inside or outside the body.
      </p>

      <p>
        The nervous and endocrine systems play major roles in maintaining
        homeostasis.
      </p>
    `,

    keyPoints: [
      "Anatomy studies body structure.",
      "Physiology studies body function.",
      "Structure and function are closely related.",
      "The human body is organized from chemicals to cells, tissues, organs and systems.",
      "Homeostasis keeps the internal environment relatively stable."
    ],

    nursing: `
      Nurses need a strong understanding of anatomy and physiology to assess
      patients, recognize abnormal findings, understand disease processes and
      provide safe nursing care.
    `,

    questions: [
      {
        question: "What is the study of body structure called?",
        options: [
          "Physiology",
          "Anatomy",
          "Pathology",
          "Pharmacology"
        ],
        answer: 1,
        explanation: "Anatomy is the study of the structure of the body."
      },
      {
        question: "What does physiology primarily study?",
        options: [
          "Body function",
          "Drug names",
          "Disease classification",
          "Medical equipment"
        ],
        answer: 0,
        explanation: "Physiology focuses on how body parts function."
      },
      {
        question: "What is homeostasis?",
        options: [
          "Growth of bones",
          "Maintenance of a stable internal environment",
          "Movement of blood only",
          "Production of hormones only"
        ],
        answer: 1,
        explanation: "Homeostasis is the maintenance of a relatively stable internal environment."
      }
    ]
  },


  // ======================================================
  // 2. ANATOMICAL TERMINOLOGY
  // ======================================================
  {
    title: "Anatomical Terminology",

    notes: `
      <h3 class="text-xl font-black mb-3">Anatomical Position</h3>

      <p class="mb-4">
        The standard anatomical position is standing upright, facing forward,
        with the arms at the sides and palms facing forward.
      </p>

      <h3 class="text-xl font-black mb-3">Directional Terms</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Superior:</strong> toward the head.</li>
        <li><strong>Inferior:</strong> away from the head.</li>
        <li><strong>Anterior:</strong> toward the front.</li>
        <li><strong>Posterior:</strong> toward the back.</li>
        <li><strong>Medial:</strong> toward the body's midline.</li>
        <li><strong>Lateral:</strong> away from the midline.</li>
        <li><strong>Proximal:</strong> closer to the point of attachment.</li>
        <li><strong>Distal:</strong> farther from the point of attachment.</li>
        <li><strong>Superficial:</strong> closer to the surface.</li>
        <li><strong>Deep:</strong> farther from the surface.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Body Planes</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Sagittal:</strong> divides the body into right and left portions.</li>
        <li><strong>Frontal:</strong> divides the body into anterior and posterior portions.</li>
        <li><strong>Transverse:</strong> divides the body into superior and inferior portions.</li>
      </ul>
    `,

    keyPoints: [
      "Anatomical position provides a standard reference.",
      "Medial means toward the midline.",
      "Lateral means away from the midline.",
      "Proximal means closer to the point of attachment.",
      "Distal means farther from the point of attachment.",
      "Sagittal, frontal and transverse are major body planes."
    ],

    nursing: `
      Anatomical terminology allows nurses and other healthcare professionals
      to communicate patient findings accurately and consistently.
    `,

    questions: [
      {
        question: "Which term means toward the body's midline?",
        options: [
          "Lateral",
          "Medial",
          "Distal",
          "Posterior"
        ],
        answer: 1,
        explanation: "Medial means toward the body's midline."
      },
      {
        question: "The elbow is what in relation to the wrist?",
        options: [
          "Distal",
          "Proximal",
          "Inferior",
          "Lateral"
        ],
        answer: 1,
        explanation: "The elbow is closer to the point of attachment of the upper limb than the wrist, so it is proximal."
      },
      {
        question: "Which plane divides the body into superior and inferior portions?",
        options: [
          "Sagittal",
          "Frontal",
          "Transverse",
          "Oblique"
        ],
        answer: 2,
        explanation: "The transverse plane divides the body into superior and inferior portions."
      }
    ]
  },


  // ======================================================
  // 3. CELLS & TISSUES
  // ======================================================
  {
    title: "Cells & Tissues",

    notes: `
      <h3 class="text-xl font-black mb-3">The Cell</h3>

      <p class="mb-4">
        The cell is the basic structural and functional unit of the human body.
        Cells contain specialized structures called organelles.
      </p>

      <h3 class="text-xl font-black mb-3">Major Cell Structures</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Nucleus:</strong> contains genetic material and controls many cellular activities.</li>
        <li><strong>Cell membrane:</strong> controls movement of substances into and out of the cell.</li>
        <li><strong>Cytoplasm:</strong> contains organelles and is the site of many chemical reactions.</li>
        <li><strong>Mitochondria:</strong> produce most of the cell's usable energy.</li>
        <li><strong>Ribosomes:</strong> produce proteins.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Four Major Tissue Types</h3>

      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Epithelial tissue:</strong> covers surfaces and lines body cavities.</li>
        <li><strong>Connective tissue:</strong> supports, connects and protects body structures.</li>
        <li><strong>Muscle tissue:</strong> produces movement.</li>
        <li><strong>Nervous tissue:</strong> receives and transmits electrical signals.</li>
      </ol>
    `,

    keyPoints: [
      "The cell is the basic unit of life.",
      "The nucleus contains genetic material.",
      "Mitochondria are important for energy production.",
      "Ribosomes are involved in protein synthesis.",
      "The four major tissues are epithelial, connective, muscle and nervous tissue."
    ],

    nursing: `
      Understanding cells and tissues helps nurses understand wound healing,
      infection, inflammation, cancer and many other disease processes.
    `,

    questions: [
      {
        question: "Which organelle contains most of the cell's genetic material?",
        options: [
          "Mitochondrion",
          "Nucleus",
          "Ribosome",
          "Cell membrane"
        ],
        answer: 1,
        explanation: "The nucleus contains most of the cell's DNA."
      },
      {
        question: "Which tissue type is specialized for contraction and movement?",
        options: [
          "Epithelial",
          "Connective",
          "Muscle",
          "Nervous"
        ],
        answer: 2,
        explanation: "Muscle tissue contracts to produce movement."
      },
      {
        question: "Which organelle is primarily associated with protein synthesis?",
        options: [
          "Ribosome",
          "Lysosome",
          "Nucleus",
          "Mitochondrion"
        ],
        answer: 0,
        explanation: "Ribosomes are responsible for protein synthesis."
      }
    ]
  },


  // ======================================================
  // 4. SKELETAL SYSTEM
  // ======================================================
  {
    title: "Skeletal System",

    notes: `
      <h3 class="text-xl font-black mb-3">Functions of the Skeletal System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Provides support and body shape.</li>
        <li>Protects internal organs.</li>
        <li>Allows movement together with muscles.</li>
        <li>Stores minerals such as calcium and phosphorus.</li>
        <li>Produces blood cells in red bone marrow.</li>
        <li>Stores energy in yellow bone marrow.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Major Divisions</h3>

      <p class="mb-4">
        The skeleton is divided into the <strong>axial skeleton</strong> and
        <strong>appendicular skeleton</strong>.
      </p>

      <p class="mb-4">
        The axial skeleton includes the skull, vertebral column and thoracic
        cage. The appendicular skeleton includes the limbs and the bones that
        attach them to the axial skeleton.
      </p>

      <h3 class="text-xl font-black mb-3">Joints</h3>

      <p>
        Joints are locations where two or more bones meet. They provide
        stability and, depending on their structure, allow different amounts
        of movement.
      </p>
    `,

    keyPoints: [
      "Bones provide support and protection.",
      "Bone marrow is involved in blood-cell production.",
      "Calcium and phosphorus are stored in bones.",
      "The skeleton has axial and appendicular divisions.",
      "Joints connect bones and allow movement."
    ],

    nursing: `
      Knowledge of the skeletal system is important when assessing fractures,
      mobility, posture, falls, osteoporosis and musculoskeletal injuries.
    `,

    questions: [
      {
        question: "Which is a major function of the skeletal system?",
        options: [
          "Producing insulin",
          "Protecting internal organs",
          "Digesting proteins",
          "Producing bile"
        ],
        answer: 1,
        explanation: "Bones protect important organs such as the brain, heart and lungs."
      },
      {
        question: "Which division includes the skull and vertebral column?",
        options: [
          "Appendicular skeleton",
          "Axial skeleton",
          "Peripheral skeleton",
          "Muscular skeleton"
        ],
        answer: 1,
        explanation: "The skull and vertebral column are part of the axial skeleton."
      },
      {
        question: "What is the location where two or more bones meet called?",
        options: [
          "Tendon",
          "Joint",
          "Ligament",
          "Cartilage only"
        ],
        answer: 1,
        explanation: "A joint is where two or more bones meet."
      }
    ]
  },


  // ======================================================
  // 5. MUSCULAR SYSTEM
  // ======================================================
  {
    title: "Muscular System",

    notes: `
      <h3 class="text-xl font-black mb-3">Functions of Muscles</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Produce body movement.</li>
        <li>Maintain posture.</li>
        <li>Generate heat.</li>
        <li>Support and stabilize joints.</li>
        <li>Move substances through certain organs.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Three Types of Muscle</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Skeletal muscle:</strong> usually under voluntary control and attached to bones.</li>
        <li><strong>Cardiac muscle:</strong> found in the heart and contracts involuntarily.</li>
        <li><strong>Smooth muscle:</strong> found in many internal organs and blood vessels.</li>
      </ul>

      <p class="mt-4">
        Muscle contraction requires energy and depends on interactions between
        specialized proteins within muscle cells.
      </p>
    `,

    keyPoints: [
      "Skeletal muscle is generally voluntary.",
      "Cardiac muscle is found in the heart.",
      "Smooth muscle is found in internal organs and blood vessels.",
      "Muscles produce movement and help maintain posture.",
      "Muscle activity contributes to heat production."
    ],

    nursing: `
      Nurses assess muscle strength, mobility, movement and signs of weakness
      when evaluating neurological and musculoskeletal function.
    `,

    questions: [
      {
        question: "Which type of muscle is found in the heart?",
        options: [
          "Skeletal",
          "Smooth",
          "Cardiac",
          "Connective"
        ],
        answer: 2,
        explanation: "Cardiac muscle forms the muscular wall of the heart."
      },
      {
        question: "Which muscle type is generally under voluntary control?",
        options: [
          "Cardiac",
          "Skeletal",
          "Smooth",
          "Visceral"
        ],
        answer: 1,
        explanation: "Skeletal muscle is generally controlled voluntarily."
      },
      {
        question: "Which is a function of muscle tissue?",
        options: [
          "Movement",
          "Producing urine",
          "Filtering blood",
          "Producing bile"
        ],
        answer: 0,
        explanation: "Muscle contraction produces movement."
      }
    ]
  },


  // ======================================================
  // 6. CARDIOVASCULAR SYSTEM
  // ======================================================
  {
    title: "Cardiovascular System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The cardiovascular system consists mainly of the <strong>heart, blood
        and blood vessels</strong>.
      </p>

      <h3 class="text-xl font-black mb-3">The Heart</h3>

      <p class="mb-4">
        The heart is a muscular organ that pumps blood through the circulation.
        It has four chambers: right atrium, right ventricle, left atrium and
        left ventricle.
      </p>

      <h3 class="text-xl font-black mb-3">Blood Vessels</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Arteries:</strong> carry blood away from the heart.</li>
        <li><strong>Veins:</strong> carry blood toward the heart.</li>
        <li><strong>Capillaries:</strong> are small vessels where exchange occurs between blood and tissues.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Circulation</h3>

      <p>
        Pulmonary circulation carries blood between the heart and lungs.
        Systemic circulation carries blood between the heart and the rest of
        the body.
      </p>
    `,

    keyPoints: [
      "The cardiovascular system includes the heart, blood and blood vessels.",
      "The heart has four chambers.",
      "Arteries carry blood away from the heart.",
      "Veins carry blood toward the heart.",
      "Capillaries are major sites of exchange.",
      "Pulmonary circulation involves the lungs."
    ],

    nursing: `
      Cardiovascular knowledge is essential for assessing pulse, blood pressure,
      circulation, chest symptoms, edema and signs of poor tissue perfusion.
    `,

    questions: [
      {
        question: "How many chambers does the normal human heart have?",
        options: [
          "Two",
          "Three",
          "Four",
          "Five"
        ],
        answer: 2,
        explanation: "The heart has four chambers: two atria and two ventricles."
      },
      {
        question: "Which vessels carry blood away from the heart?",
        options: [
          "Veins",
          "Arteries",
          "Capillaries",
          "Venules"
        ],
        answer: 1,
        explanation: "Arteries carry blood away from the heart."
      },
      {
        question: "Where does much exchange between blood and tissues occur?",
        options: [
          "Large arteries",
          "Large veins",
          "Capillaries",
          "Heart valves"
        ],
        answer: 2,
        explanation: "Capillaries have thin walls that allow exchange between blood and tissues."
      }
    ]
  },


  // ======================================================
  // 7. RESPIRATORY SYSTEM
  // ======================================================
  {
    title: "Respiratory System",

    notes: `
      <h3 class="text-xl font-black mb-3">Main Function</h3>

      <p class="mb-4">
        The respiratory system brings oxygen into the body and removes carbon
        dioxide. It also contributes to regulation of blood pH.
      </p>

      <h3 class="text-xl font-black mb-3">Major Structures</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Nose and nasal cavity</li>
        <li>Pharynx</li>
        <li>Larynx</li>
        <li>Trachea</li>
        <li>Bronchi</li>
        <li>Bronchioles</li>
        <li>Lungs</li>
        <li>Alveoli</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Gas Exchange</h3>

      <p>
        Gas exchange occurs mainly in the alveoli. Oxygen moves from inhaled
        air into the blood, while carbon dioxide moves from the blood into the
        alveolar air to be exhaled.
      </p>

      <h3 class="text-xl font-black mt-6 mb-3">Ventilation</h3>

      <p>
        Ventilation is the movement of air into and out of the lungs. The
        diaphragm is a major muscle involved in breathing.
      </p>
    `,

    keyPoints: [
      "The respiratory system supplies oxygen and removes carbon dioxide.",
      "Gas exchange occurs mainly in the alveoli.",
      "The trachea divides into the bronchi.",
      "The diaphragm is important in breathing.",
      "Ventilation moves air into and out of the lungs."
    ],

    nursing: `
      Respiratory anatomy is essential when assessing respiratory rate, oxygen
      saturation, breath sounds, breathing difficulty and airway problems.
    `,

    questions: [
      {
        question: "Where does most gas exchange occur?",
        options: [
          "Trachea",
          "Bronchi",
          "Alveoli",
          "Pharynx"
        ],
        answer: 2,
        explanation: "Gas exchange between air and blood occurs mainly across the alveoli."
      },
      {
        question: "Which muscle is especially important for normal breathing?",
        options: [
          "Biceps",
          "Diaphragm",
          "Triceps",
          "Deltoid"
        ],
        answer: 1,
        explanation: "The diaphragm is the major muscle of normal inspiration."
      },
      {
        question: "Which gas is primarily removed from the body during exhalation?",
        options: [
          "Oxygen",
          "Nitrogen",
          "Carbon dioxide",
          "Helium"
        ],
        answer: 2,
        explanation: "Carbon dioxide is produced by metabolism and removed through exhalation."
      }
    ]
  },


  // ======================================================
  // 8. NERVOUS SYSTEM
  // ======================================================
  {
    title: "Nervous System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The nervous system controls and coordinates many activities of the body.
        It receives information, processes it and produces appropriate responses.
      </p>

      <h3 class="text-xl font-black mb-3">Central Nervous System</h3>

      <p class="mb-4">
        The <strong>central nervous system (CNS)</strong> consists of the
        brain and spinal cord.
      </p>

      <h3 class="text-xl font-black mb-3">Peripheral Nervous System</h3>

      <p class="mb-4">
        The <strong>peripheral nervous system (PNS)</strong> consists of nerves
        and structures outside the brain and spinal cord.
      </p>

      <h3 class="text-xl font-black mb-3">Neurons</h3>

      <p>
        Neurons are specialized cells that receive and transmit electrical and
        chemical signals.
      </p>

      <h3 class="text-xl font-black mt-6 mb-3">Autonomic Nervous System</h3>

      <p>
        The autonomic nervous system regulates many involuntary functions,
        including heart rate, digestion and blood-vessel activity.
      </p>
    `,

    keyPoints: [
      "The CNS consists of the brain and spinal cord.",
      "The PNS includes nerves outside the CNS.",
      "Neurons transmit information.",
      "The nervous system coordinates body functions.",
      "The autonomic nervous system regulates many involuntary activities."
    ],

    nursing: `
      Nurses assess neurological status through consciousness, pupils, movement,
      sensation, reflexes and other neurological observations.
    `,

    questions: [
      {
        question: "Which structures make up the central nervous system?",
        options: [
          "Brain and spinal cord",
          "Heart and brain",
          "Spinal nerves only",
          "Muscles and nerves"
        ],
        answer: 0,
        explanation: "The CNS consists of the brain and spinal cord."
      },
      {
        question: "What is the main function of neurons?",
        options: [
          "Store calcium",
          "Transmit information",
          "Produce bile",
          "Filter urine"
        ],
        answer: 1,
        explanation: "Neurons are specialized for receiving and transmitting signals."
      },
      {
        question: "Which system regulates many involuntary body functions?",
        options: [
          "Autonomic nervous system",
          "Skeletal system",
          "Digestive system",
          "Skeletal nervous system"
        ],
        answer: 0,
        explanation: "The autonomic nervous system controls many involuntary functions."
      }
    ]
  },


  // ======================================================
  // 9. DIGESTIVE SYSTEM
  // ======================================================
  {
    title: "Digestive System",

    notes: `
      <h3 class="text-xl font-black mb-3">Purpose of Digestion</h3>

      <p class="mb-4">
        The digestive system breaks food into smaller substances that can be
        absorbed and used by the body. It also eliminates undigested material.
      </p>

      <h3 class="text-xl font-black mb-3">Major Organs</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Mouth</li>
        <li>Pharynx</li>
        <li>Esophagus</li>
        <li>Stomach</li>
        <li>Small intestine</li>
        <li>Large intestine</li>
        <li>Rectum</li>
        <li>Anus</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Accessory Organs</h3>

      <p class="mb-4">
        The liver, gallbladder and pancreas assist digestion.
      </p>

      <h3 class="text-xl font-black mb-3">Small Intestine</h3>

      <p>
        Much of the digestion and absorption of nutrients occurs in the small
        intestine. Its large surface area helps maximize absorption.
      </p>
    `,

    keyPoints: [
      "Digestion breaks food into usable components.",
      "The stomach performs mechanical and chemical digestion.",
      "The small intestine is a major site of nutrient absorption.",
      "The large intestine absorbs water and forms feces.",
      "The liver, gallbladder and pancreas assist digestion."
    ],

    nursing: `
      Digestive-system knowledge helps nurses assess appetite, swallowing,
      abdominal symptoms, bowel function, nutrition and hydration.
    `,

    questions: [
      {
        question: "Where does most nutrient absorption occur?",
        options: [
          "Stomach",
          "Small intestine",
          "Esophagus",
          "Large intestine"
        ],
        answer: 1,
        explanation: "The small intestine is the major site of nutrient absorption."
      },
      {
        question: "Which organ produces bile?",
        options: [
          "Pancreas",
          "Liver",
          "Stomach",
          "Kidney"
        ],
        answer: 1,
        explanation: "The liver produces bile, which assists in fat digestion."
      },
      {
        question: "What is a major function of the large intestine?",
        options: [
          "Absorb water",
          "Pump blood",
          "Produce insulin only",
          "Exchange oxygen"
        ],
        answer: 0,
        explanation: "The large intestine absorbs water and helps form feces."
      }
    ]
  },


  // ======================================================
  // 10. URINARY SYSTEM
  // ======================================================
  {
    title: "Urinary System",

    notes: `
      <h3 class="text-xl font-black mb-3">Major Functions</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Remove metabolic waste from the blood.</li>
        <li>Regulate water balance.</li>
        <li>Help regulate electrolytes.</li>
        <li>Contribute to acid-base balance.</li>
        <li>Assist in regulation of blood pressure.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Major Organs</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Kidneys:</strong> filter blood and form urine.</li>
        <li><strong>Ureters:</strong> transport urine from kidneys to bladder.</li>
        <li><strong>Urinary bladder:</strong> stores urine.</li>
        <li><strong>Urethra:</strong> carries urine out of the body.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Nephrons</h3>

      <p>
        The nephron is the functional unit of the kidney. Processes including
        filtration, reabsorption and secretion contribute to urine formation.
      </p>
    `,

    keyPoints: [
      "The kidneys filter blood and form urine.",
      "Ureters carry urine to the bladder.",
      "The bladder stores urine.",
      "The urethra carries urine out of the body.",
      "Nephrons are functional units of the kidneys."
    ],

    nursing: `
      Understanding the urinary system is important when monitoring urine output,
      hydration, kidney function, fluid balance and urinary problems.
    `,

    questions: [
      {
        question: "Which organs form urine?",
        options: [
          "Lungs",
          "Kidneys",
          "Liver",
          "Heart"
        ],
        answer: 1,
        explanation: "The kidneys filter blood and form urine."
      },
      {
        question: "Where is urine stored before elimination?",
        options: [
          "Ureter",
          "Kidney",
          "Bladder",
          "Nephron"
        ],
        answer: 2,
        explanation: "The urinary bladder stores urine."
      },
      {
        question: "What is the functional unit of the kidney?",
        options: [
          "Alveolus",
          "Neuron",
          "Nephron",
          "Osteon"
        ],
        answer: 2,
        explanation: "The nephron is the functional unit of the kidney."
      }
    ]
  },


  // ======================================================
  // 11. REPRODUCTIVE SYSTEM
  // ======================================================
  {
    title: "Reproductive System",

    notes: `
      <h3 class="text-xl font-black mb-3">Purpose</h3>

      <p class="mb-4">
        The reproductive system is responsible for producing reproductive cells,
        supporting reproduction and producing reproductive hormones.
      </p>

      <h3 class="text-xl font-black mb-3">Male Reproductive System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Testes</li>
        <li>Epididymis</li>
        <li>Vas deferens</li>
        <li>Seminal vesicles</li>
        <li>Prostate gland</li>
        <li>Penis</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Female Reproductive System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Ovaries</li>
        <li>Fallopian tubes</li>
        <li>Uterus</li>
        <li>Cervix</li>
        <li>Vagina</li>
      </ul>

      <p class="mt-4">
        The ovaries produce ova and reproductive hormones. The testes produce
        sperm and testosterone.
      </p>
    `,

    keyPoints: [
      "The reproductive system supports reproduction.",
      "Testes produce sperm and testosterone.",
      "Ovaries produce ova and reproductive hormones.",
      "The uterus is the organ where pregnancy develops.",
      "The reproductive system is influenced by hormones."
    ],

    nursing: `
      Reproductive anatomy is important in sexual-health assessment, antenatal
      care, family planning, reproductive health education and clinical assessment.
    `,

    questions: [
      {
        question: "Which organs produce sperm?",
        options: [
          "Ovaries",
          "Testes",
          "Uterus",
          "Prostate only"
        ],
        answer: 1,
        explanation: "The testes produce sperm."
      },
      {
        question: "Which organ is the usual site of pregnancy development?",
        options: [
          "Ovary",
          "Uterus",
          "Vagina",
          "Fallopian tube"
        ],
        answer: 1,
        explanation: "Pregnancy normally develops in the uterus."
      },
      {
        question: "Which organs produce ova?",
        options: [
          "Testes",
          "Ovaries",
          "Kidneys",
          "Adrenal glands"
        ],
        answer: 1,
        explanation: "The ovaries produce ova and reproductive hormones."
      }
    ]
  },


  // ======================================================
  // 12. ENDOCRINE SYSTEM
  // ======================================================
  {
    title: "Endocrine System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The endocrine system consists of glands that produce hormones.
        Hormones are chemical messengers that travel through the blood to
        influence target cells and organs.
      </p>

      <h3 class="text-xl font-black mb-3">Major Endocrine Glands</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Pituitary gland:</strong> regulates several other endocrine glands and body functions.</li>
        <li><strong>Thyroid gland:</strong> produces hormones involved in metabolism.</li>
        <li><strong>Parathyroid glands:</strong> help regulate calcium levels.</li>
        <li><strong>Adrenal glands:</strong> produce hormones involved in stress responses and other functions.</li>
        <li><strong>Pancreas:</strong> produces hormones including insulin and glucagon.</li>
        <li><strong>Ovaries and testes:</strong> produce reproductive hormones.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Hormonal Regulation</h3>

      <p>
        Hormones help regulate metabolism, growth, reproduction, stress responses,
        blood glucose and many other body processes.
      </p>

      <p class="mt-4">
        Many endocrine systems use <strong>negative feedback</strong> to help
        maintain stable hormone levels.
      </p>
    `,

    keyPoints: [
      "Endocrine glands produce hormones.",
      "Hormones act as chemical messengers.",
      "The thyroid contributes to regulation of metabolism.",
      "Insulin helps regulate blood glucose.",
      "The endocrine system works closely with the nervous system.",
      "Negative feedback helps maintain physiological balance."
    ],

    nursing: `
      Endocrine knowledge helps nurses understand conditions such as diabetes,
      thyroid disorders and hormonal disturbances and recognize important
      clinical findings.
    `,

    questions: [
      {
        question: "What do endocrine glands produce?",
        options: [
          "Hormones",
          "Urine",
          "Bile",
          "Red blood cells only"
        ],
        answer: 0,
        explanation: "Endocrine glands produce hormones that act as chemical messengers."
      },
      {
        question: "Which hormone helps lower blood glucose?",
        options: [
          "Insulin",
          "Adrenaline",
          "Thyroxine",
          "Melatonin"
        ],
        answer: 0,
        explanation: "Insulin promotes processes that lower blood glucose."
      },
      {
        question: "Which gland is strongly associated with regulation of metabolism?",
        options: [
          "Thyroid",
          "Sweat gland",
          "Salivary gland",
          "Sebaceous gland"
        ],
        answer: 0,
        explanation: "The thyroid produces hormones that have major effects on metabolism."
      }
    ]
  }

],

  // ======================================================
  // 2. ANATOMICAL TERMINOLOGY
  // ======================================================
  {
    title: "Anatomical Terminology",

    notes: `
      <h3 class="text-xl font-black mb-3">Anatomical Position</h3>

      <p class="mb-4">
        The standard anatomical position is standing upright, facing forward,
        with the arms at the sides and palms facing forward.
      </p>

      <h3 class="text-xl font-black mb-3">Directional Terms</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Superior:</strong> toward the head.</li>
        <li><strong>Inferior:</strong> away from the head.</li>
        <li><strong>Anterior:</strong> toward the front.</li>
        <li><strong>Posterior:</strong> toward the back.</li>
        <li><strong>Medial:</strong> toward the body's midline.</li>
        <li><strong>Lateral:</strong> away from the midline.</li>
        <li><strong>Proximal:</strong> closer to the point of attachment.</li>
        <li><strong>Distal:</strong> farther from the point of attachment.</li>
        <li><strong>Superficial:</strong> closer to the surface.</li>
        <li><strong>Deep:</strong> farther from the surface.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Body Planes</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Sagittal:</strong> divides the body into right and left portions.</li>
        <li><strong>Frontal:</strong> divides the body into anterior and posterior portions.</li>
        <li><strong>Transverse:</strong> divides the body into superior and inferior portions.</li>
      </ul>
    `,

    keyPoints: [
      "Anatomical position provides a standard reference.",
      "Medial means toward the midline.",
      "Lateral means away from the midline.",
      "Proximal means closer to the point of attachment.",
      "Distal means farther from the point of attachment.",
      "Sagittal, frontal and transverse are major body planes."
    ],

    nursing: `
      Anatomical terminology allows nurses and other healthcare professionals
      to communicate patient findings accurately and consistently.
    `,

    questions: [
      {
        question: "Which term means toward the body's midline?",
        options: [
          "Lateral",
          "Medial",
          "Distal",
          "Posterior"
        ],
        answer: 1,
        explanation: "Medial means toward the body's midline."
      },
      {
        question: "The elbow is what in relation to the wrist?",
        options: [
          "Distal",
          "Proximal",
          "Inferior",
          "Lateral"
        ],
        answer: 1,
        explanation: "The elbow is closer to the point of attachment of the upper limb than the wrist, so it is proximal."
      },
      {
        question: "Which plane divides the body into superior and inferior portions?",
        options: [
          "Sagittal",
          "Frontal",
          "Transverse",
          "Oblique"
        ],
        answer: 2,
        explanation: "The transverse plane divides the body into superior and inferior portions."
      }
    ]
  },


  // ======================================================
  // 3. CELLS & TISSUES
  // ======================================================
  {
    title: "Cells & Tissues",

    notes: `
      <h3 class="text-xl font-black mb-3">The Cell</h3>

      <p class="mb-4">
        The cell is the basic structural and functional unit of the human body.
        Cells contain specialized structures called organelles.
      </p>

      <h3 class="text-xl font-black mb-3">Major Cell Structures</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Nucleus:</strong> contains genetic material and controls many cellular activities.</li>
        <li><strong>Cell membrane:</strong> controls movement of substances into and out of the cell.</li>
        <li><strong>Cytoplasm:</strong> contains organelles and is the site of many chemical reactions.</li>
        <li><strong>Mitochondria:</strong> produce most of the cell's usable energy.</li>
        <li><strong>Ribosomes:</strong> produce proteins.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Four Major Tissue Types</h3>

      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Epithelial tissue:</strong> covers surfaces and lines body cavities.</li>
        <li><strong>Connective tissue:</strong> supports, connects and protects body structures.</li>
        <li><strong>Muscle tissue:</strong> produces movement.</li>
        <li><strong>Nervous tissue:</strong> receives and transmits electrical signals.</li>
      </ol>
    `,

    keyPoints: [
      "The cell is the basic unit of life.",
      "The nucleus contains genetic material.",
      "Mitochondria are important for energy production.",
      "Ribosomes are involved in protein synthesis.",
      "The four major tissues are epithelial, connective, muscle and nervous tissue."
    ],

    nursing: `
      Understanding cells and tissues helps nurses understand wound healing,
      infection, inflammation, cancer and many other disease processes.
    `,

    questions: [
      {
        question: "Which organelle contains most of the cell's genetic material?",
        options: [
          "Mitochondrion",
          "Nucleus",
          "Ribosome",
          "Cell membrane"
        ],
        answer: 1,
        explanation: "The nucleus contains most of the cell's DNA."
      },
      {
        question: "Which tissue type is specialized for contraction and movement?",
        options: [
          "Epithelial",
          "Connective",
          "Muscle",
          "Nervous"
        ],
        answer: 2,
        explanation: "Muscle tissue contracts to produce movement."
      },
      {
        question: "Which organelle is primarily associated with protein synthesis?",
        options: [
          "Ribosome",
          "Lysosome",
          "Nucleus",
          "Mitochondrion"
        ],
        answer: 0,
        explanation: "Ribosomes are responsible for protein synthesis."
      }
    ]
  },


  // ======================================================
  // 4. SKELETAL SYSTEM
  // ======================================================
  {
    title: "Skeletal System",

    notes: `
      <h3 class="text-xl font-black mb-3">Functions of the Skeletal System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Provides support and body shape.</li>
        <li>Protects internal organs.</li>
        <li>Allows movement together with muscles.</li>
        <li>Stores minerals such as calcium and phosphorus.</li>
        <li>Produces blood cells in red bone marrow.</li>
        <li>Stores energy in yellow bone marrow.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Major Divisions</h3>

      <p class="mb-4">
        The skeleton is divided into the <strong>axial skeleton</strong> and
        <strong>appendicular skeleton</strong>.
      </p>

      <p class="mb-4">
        The axial skeleton includes the skull, vertebral column and thoracic
        cage. The appendicular skeleton includes the limbs and the bones that
        attach them to the axial skeleton.
      </p>

      <h3 class="text-xl font-black mb-3">Joints</h3>

      <p>
        Joints are locations where two or more bones meet. They provide
        stability and, depending on their structure, allow different amounts
        of movement.
      </p>
    `,

    keyPoints: [
      "Bones provide support and protection.",
      "Bone marrow is involved in blood-cell production.",
      "Calcium and phosphorus are stored in bones.",
      "The skeleton has axial and appendicular divisions.",
      "Joints connect bones and allow movement."
    ],

    nursing: `
      Knowledge of the skeletal system is important when assessing fractures,
      mobility, posture, falls, osteoporosis and musculoskeletal injuries.
    `,

    questions: [
      {
        question: "Which is a major function of the skeletal system?",
        options: [
          "Producing insulin",
          "Protecting internal organs",
          "Digesting proteins",
          "Producing bile"
        ],
        answer: 1,
        explanation: "Bones protect important organs such as the brain, heart and lungs."
      },
      {
        question: "Which division includes the skull and vertebral column?",
        options: [
          "Appendicular skeleton",
          "Axial skeleton",
          "Peripheral skeleton",
          "Muscular skeleton"
        ],
        answer: 1,
        explanation: "The skull and vertebral column are part of the axial skeleton."
      },
      {
        question: "What is the location where two or more bones meet called?",
        options: [
          "Tendon",
          "Joint",
          "Ligament",
          "Cartilage only"
        ],
        answer: 1,
        explanation: "A joint is where two or more bones meet."
      }
    ]
  },


  // ======================================================
  // 5. MUSCULAR SYSTEM
  // ======================================================
  {
    title: "Muscular System",

    notes: `
      <h3 class="text-xl font-black mb-3">Functions of Muscles</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Produce body movement.</li>
        <li>Maintain posture.</li>
        <li>Generate heat.</li>
        <li>Support and stabilize joints.</li>
        <li>Move substances through certain organs.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Three Types of Muscle</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Skeletal muscle:</strong> usually under voluntary control and attached to bones.</li>
        <li><strong>Cardiac muscle:</strong> found in the heart and contracts involuntarily.</li>
        <li><strong>Smooth muscle:</strong> found in many internal organs and blood vessels.</li>
      </ul>

      <p class="mt-4">
        Muscle contraction requires energy and depends on interactions between
        specialized proteins within muscle cells.
      </p>
    `,

    keyPoints: [
      "Skeletal muscle is generally voluntary.",
      "Cardiac muscle is found in the heart.",
      "Smooth muscle is found in internal organs and blood vessels.",
      "Muscles produce movement and help maintain posture.",
      "Muscle activity contributes to heat production."
    ],

    nursing: `
      Nurses assess muscle strength, mobility, movement and signs of weakness
      when evaluating neurological and musculoskeletal function.
    `,

    questions: [
      {
        question: "Which type of muscle is found in the heart?",
        options: [
          "Skeletal",
          "Smooth",
          "Cardiac",
          "Connective"
        ],
        answer: 2,
        explanation: "Cardiac muscle forms the muscular wall of the heart."
      },
      {
        question: "Which muscle type is generally under voluntary control?",
        options: [
          "Cardiac",
          "Skeletal",
          "Smooth",
          "Visceral"
        ],
        answer: 1,
        explanation: "Skeletal muscle is generally controlled voluntarily."
      },
      {
        question: "Which is a function of muscle tissue?",
        options: [
          "Movement",
          "Producing urine",
          "Filtering blood",
          "Producing bile"
        ],
        answer: 0,
        explanation: "Muscle contraction produces movement."
      }
    ]
  },


  // ======================================================
  // 6. CARDIOVASCULAR SYSTEM
  // ======================================================
  {
    title: "Cardiovascular System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The cardiovascular system consists mainly of the <strong>heart, blood
        and blood vessels</strong>.
      </p>

      <h3 class="text-xl font-black mb-3">The Heart</h3>

      <p class="mb-4">
        The heart is a muscular organ that pumps blood through the circulation.
        It has four chambers: right atrium, right ventricle, left atrium and
        left ventricle.
      </p>

      <h3 class="text-xl font-black mb-3">Blood Vessels</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Arteries:</strong> carry blood away from the heart.</li>
        <li><strong>Veins:</strong> carry blood toward the heart.</li>
        <li><strong>Capillaries:</strong> are small vessels where exchange occurs between blood and tissues.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Circulation</h3>

      <p>
        Pulmonary circulation carries blood between the heart and lungs.
        Systemic circulation carries blood between the heart and the rest of
        the body.
      </p>
    `,

    keyPoints: [
      "The cardiovascular system includes the heart, blood and blood vessels.",
      "The heart has four chambers.",
      "Arteries carry blood away from the heart.",
      "Veins carry blood toward the heart.",
      "Capillaries are major sites of exchange.",
      "Pulmonary circulation involves the lungs."
    ],

    nursing: `
      Cardiovascular knowledge is essential for assessing pulse, blood pressure,
      circulation, chest symptoms, edema and signs of poor tissue perfusion.
    `,

    questions: [
      {
        question: "How many chambers does the normal human heart have?",
        options: [
          "Two",
          "Three",
          "Four",
          "Five"
        ],
        answer: 2,
        explanation: "The heart has four chambers: two atria and two ventricles."
      },
      {
        question: "Which vessels carry blood away from the heart?",
        options: [
          "Veins",
          "Arteries",
          "Capillaries",
          "Venules"
        ],
        answer: 1,
        explanation: "Arteries carry blood away from the heart."
      },
      {
        question: "Where does much exchange between blood and tissues occur?",
        options: [
          "Large arteries",
          "Large veins",
          "Capillaries",
          "Heart valves"
        ],
        answer: 2,
        explanation: "Capillaries have thin walls that allow exchange between blood and tissues."
      }
    ]
  },


  // ======================================================
  // 7. RESPIRATORY SYSTEM
  // ======================================================
  {
    title: "Respiratory System",

    notes: `
      <h3 class="text-xl font-black mb-3">Main Function</h3>

      <p class="mb-4">
        The respiratory system brings oxygen into the body and removes carbon
        dioxide. It also contributes to regulation of blood pH.
      </p>

      <h3 class="text-xl font-black mb-3">Major Structures</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Nose and nasal cavity</li>
        <li>Pharynx</li>
        <li>Larynx</li>
        <li>Trachea</li>
        <li>Bronchi</li>
        <li>Bronchioles</li>
        <li>Lungs</li>
        <li>Alveoli</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Gas Exchange</h3>

      <p>
        Gas exchange occurs mainly in the alveoli. Oxygen moves from inhaled
        air into the blood, while carbon dioxide moves from the blood into the
        alveolar air to be exhaled.
      </p>

      <h3 class="text-xl font-black mt-6 mb-3">Ventilation</h3>

      <p>
        Ventilation is the movement of air into and out of the lungs. The
        diaphragm is a major muscle involved in breathing.
      </p>
    `,

    keyPoints: [
      "The respiratory system supplies oxygen and removes carbon dioxide.",
      "Gas exchange occurs mainly in the alveoli.",
      "The trachea divides into the bronchi.",
      "The diaphragm is important in breathing.",
      "Ventilation moves air into and out of the lungs."
    ],

    nursing: `
      Respiratory anatomy is essential when assessing respiratory rate, oxygen
      saturation, breath sounds, breathing difficulty and airway problems.
    `,

    questions: [
      {
        question: "Where does most gas exchange occur?",
        options: [
          "Trachea",
          "Bronchi",
          "Alveoli",
          "Pharynx"
        ],
        answer: 2,
        explanation: "Gas exchange between air and blood occurs mainly across the alveoli."
      },
      {
        question: "Which muscle is especially important for normal breathing?",
        options: [
          "Biceps",
          "Diaphragm",
          "Triceps",
          "Deltoid"
        ],
        answer: 1,
        explanation: "The diaphragm is the major muscle of normal inspiration."
      },
      {
        question: "Which gas is primarily removed from the body during exhalation?",
        options: [
          "Oxygen",
          "Nitrogen",
          "Carbon dioxide",
          "Helium"
        ],
        answer: 2,
        explanation: "Carbon dioxide is produced by metabolism and removed through exhalation."
      }
    ]
  },


  // ======================================================
  // 8. NERVOUS SYSTEM
  // ======================================================
  {
    title: "Nervous System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The nervous system controls and coordinates many activities of the body.
        It receives information, processes it and produces appropriate responses.
      </p>

      <h3 class="text-xl font-black mb-3">Central Nervous System</h3>

      <p class="mb-4">
        The <strong>central nervous system (CNS)</strong> consists of the
        brain and spinal cord.
      </p>

      <h3 class="text-xl font-black mb-3">Peripheral Nervous System</h3>

      <p class="mb-4">
        The <strong>peripheral nervous system (PNS)</strong> consists of nerves
        and structures outside the brain and spinal cord.
      </p>

      <h3 class="text-xl font-black mb-3">Neurons</h3>

      <p>
        Neurons are specialized cells that receive and transmit electrical and
        chemical signals.
      </p>

      <h3 class="text-xl font-black mt-6 mb-3">Autonomic Nervous System</h3>

      <p>
        The autonomic nervous system regulates many involuntary functions,
        including heart rate, digestion and blood-vessel activity.
      </p>
    `,

    keyPoints: [
      "The CNS consists of the brain and spinal cord.",
      "The PNS includes nerves outside the CNS.",
      "Neurons transmit information.",
      "The nervous system coordinates body functions.",
      "The autonomic nervous system regulates many involuntary activities."
    ],

    nursing: `
      Nurses assess neurological status through consciousness, pupils, movement,
      sensation, reflexes and other neurological observations.
    `,

    questions: [
      {
        question: "Which structures make up the central nervous system?",
        options: [
          "Brain and spinal cord",
          "Heart and brain",
          "Spinal nerves only",
          "Muscles and nerves"
        ],
        answer: 0,
        explanation: "The CNS consists of the brain and spinal cord."
      },
      {
        question: "What is the main function of neurons?",
        options: [
          "Store calcium",
          "Transmit information",
          "Produce bile",
          "Filter urine"
        ],
        answer: 1,
        explanation: "Neurons are specialized for receiving and transmitting signals."
      },
      {
        question: "Which system regulates many involuntary body functions?",
        options: [
          "Autonomic nervous system",
          "Skeletal system",
          "Digestive system",
          "Skeletal nervous system"
        ],
        answer: 0,
        explanation: "The autonomic nervous system controls many involuntary functions."
      }
    ]
  },


  // ======================================================
  // 9. DIGESTIVE SYSTEM
  // ======================================================
  {
    title: "Digestive System",

    notes: `
      <h3 class="text-xl font-black mb-3">Purpose of Digestion</h3>

      <p class="mb-4">
        The digestive system breaks food into smaller substances that can be
        absorbed and used by the body. It also eliminates undigested material.
      </p>

      <h3 class="text-xl font-black mb-3">Major Organs</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Mouth</li>
        <li>Pharynx</li>
        <li>Esophagus</li>
        <li>Stomach</li>
        <li>Small intestine</li>
        <li>Large intestine</li>
        <li>Rectum</li>
        <li>Anus</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Accessory Organs</h3>

      <p class="mb-4">
        The liver, gallbladder and pancreas assist digestion.
      </p>

      <h3 class="text-xl font-black mb-3">Small Intestine</h3>

      <p>
        Much of the digestion and absorption of nutrients occurs in the small
        intestine. Its large surface area helps maximize absorption.
      </p>
    `,

    keyPoints: [
      "Digestion breaks food into usable components.",
      "The stomach performs mechanical and chemical digestion.",
      "The small intestine is a major site of nutrient absorption.",
      "The large intestine absorbs water and forms feces.",
      "The liver, gallbladder and pancreas assist digestion."
    ],

    nursing: `
      Digestive-system knowledge helps nurses assess appetite, swallowing,
      abdominal symptoms, bowel function, nutrition and hydration.
    `,

    questions: [
      {
        question: "Where does most nutrient absorption occur?",
        options: [
          "Stomach",
          "Small intestine",
          "Esophagus",
          "Large intestine"
        ],
        answer: 1,
        explanation: "The small intestine is the major site of nutrient absorption."
      },
      {
        question: "Which organ produces bile?",
        options: [
          "Pancreas",
          "Liver",
          "Stomach",
          "Kidney"
        ],
        answer: 1,
        explanation: "The liver produces bile, which assists in fat digestion."
      },
      {
        question: "What is a major function of the large intestine?",
        options: [
          "Absorb water",
          "Pump blood",
          "Produce insulin only",
          "Exchange oxygen"
        ],
        answer: 0,
        explanation: "The large intestine absorbs water and helps form feces."
      }
    ]
  },


  // ======================================================
  // 10. URINARY SYSTEM
  // ======================================================
  {
    title: "Urinary System",

    notes: `
      <h3 class="text-xl font-black mb-3">Major Functions</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Remove metabolic waste from the blood.</li>
        <li>Regulate water balance.</li>
        <li>Help regulate electrolytes.</li>
        <li>Contribute to acid-base balance.</li>
        <li>Assist in regulation of blood pressure.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Major Organs</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Kidneys:</strong> filter blood and form urine.</li>
        <li><strong>Ureters:</strong> transport urine from kidneys to bladder.</li>
        <li><strong>Urinary bladder:</strong> stores urine.</li>
        <li><strong>Urethra:</strong> carries urine out of the body.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Nephrons</h3>

      <p>
        The nephron is the functional unit of the kidney. Processes including
        filtration, reabsorption and secretion contribute to urine formation.
      </p>
    `,

    keyPoints: [
      "The kidneys filter blood and form urine.",
      "Ureters carry urine to the bladder.",
      "The bladder stores urine.",
      "The urethra carries urine out of the body.",
      "Nephrons are functional units of the kidneys."
    ],

    nursing: `
      Understanding the urinary system is important when monitoring urine output,
      hydration, kidney function, fluid balance and urinary problems.
    `,

    questions: [
      {
        question: "Which organs form urine?",
        options: [
          "Lungs",
          "Kidneys",
          "Liver",
          "Heart"
        ],
        answer: 1,
        explanation: "The kidneys filter blood and form urine."
      },
      {
        question: "Where is urine stored before elimination?",
        options: [
          "Ureter",
          "Kidney",
          "Bladder",
          "Nephron"
        ],
        answer: 2,
        explanation: "The urinary bladder stores urine."
      },
      {
        question: "What is the functional unit of the kidney?",
        options: [
          "Alveolus",
          "Neuron",
          "Nephron",
          "Osteon"
        ],
        answer: 2,
        explanation: "The nephron is the functional unit of the kidney."
      }
    ]
  },


  // ======================================================
  // 11. REPRODUCTIVE SYSTEM
  // ======================================================
  {
    title: "Reproductive System",

    notes: `
      <h3 class="text-xl font-black mb-3">Purpose</h3>

      <p class="mb-4">
        The reproductive system is responsible for producing reproductive cells,
        supporting reproduction and producing reproductive hormones.
      </p>

      <h3 class="text-xl font-black mb-3">Male Reproductive System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Testes</li>
        <li>Epididymis</li>
        <li>Vas deferens</li>
        <li>Seminal vesicles</li>
        <li>Prostate gland</li>
        <li>Penis</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Female Reproductive System</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li>Ovaries</li>
        <li>Fallopian tubes</li>
        <li>Uterus</li>
        <li>Cervix</li>
        <li>Vagina</li>
      </ul>

      <p class="mt-4">
        The ovaries produce ova and reproductive hormones. The testes produce
        sperm and testosterone.
      </p>
    `,

    keyPoints: [
      "The reproductive system supports reproduction.",
      "Testes produce sperm and testosterone.",
      "Ovaries produce ova and reproductive hormones.",
      "The uterus is the organ where pregnancy develops.",
      "The reproductive system is influenced by hormones."
    ],

    nursing: `
      Reproductive anatomy is important in sexual-health assessment, antenatal
      care, family planning, reproductive health education and clinical assessment.
    `,

    questions: [
      {
        question: "Which organs produce sperm?",
        options: [
          "Ovaries",
          "Testes",
          "Uterus",
          "Prostate only"
        ],
        answer: 1,
        explanation: "The testes produce sperm."
      },
      {
        question: "Which organ is the usual site of pregnancy development?",
        options: [
          "Ovary",
          "Uterus",
          "Vagina",
          "Fallopian tube"
        ],
        answer: 1,
        explanation: "Pregnancy normally develops in the uterus."
      },
      {
        question: "Which organs produce ova?",
        options: [
          "Testes",
          "Ovaries",
          "Kidneys",
          "Adrenal glands"
        ],
        answer: 1,
        explanation: "The ovaries produce ova and reproductive hormones."
      }
    ]
  },


  // ======================================================
  // 12. ENDOCRINE SYSTEM
  // ======================================================
  {
    title: "Endocrine System",

    notes: `
      <h3 class="text-xl font-black mb-3">Overview</h3>

      <p class="mb-4">
        The endocrine system consists of glands that produce hormones.
        Hormones are chemical messengers that travel through the blood to
        influence target cells and organs.
      </p>

      <h3 class="text-xl font-black mb-3">Major Endocrine Glands</h3>

      <ul class="list-disc ml-6 space-y-2">
        <li><strong>Pituitary gland:</strong> regulates several other endocrine glands and body functions.</li>
        <li><strong>Thyroid gland:</strong> produces hormones involved in metabolism.</li>
        <li><strong>Parathyroid glands:</strong> help regulate calcium levels.</li>
        <li><strong>Adrenal glands:</strong> produce hormones involved in stress responses and other functions.</li>
        <li><strong>Pancreas:</strong> produces hormones including insulin and glucagon.</li>
        <li><strong>Ovaries and testes:</strong> produce reproductive hormones.</li>
      </ul>

      <h3 class="text-xl font-black mt-6 mb-3">Hormonal Regulation</h3>

      <p>
        Hormones help regulate metabolism, growth, reproduction, stress responses,
        blood glucose and many other body processes.
      </p>

      <p class="mt-4">
        Many endocrine systems use <strong>negative feedback</strong> to help
        maintain stable hormone levels.
      </p>
    `,

    keyPoints: [
      "Endocrine glands produce hormones.",
      "Hormones act as chemical messengers.",
      "The thyroid contributes to regulation of metabolism.",
      "Insulin helps regulate blood glucose.",
      "The endocrine system works closely with the nervous system.",
      "Negative feedback helps maintain physiological balance."
    ],

    nursing: `
      Endocrine knowledge helps nurses understand conditions such as diabetes,
      thyroid disorders and hormonal disturbances and recognize important
      clinical findings.
    `,

    questions: [
      {
        question: "What do endocrine glands produce?",
        options: [
          "Hormones",
          "Urine",
          "Bile",
          "Red blood cells only"
        ],
        answer: 0,
        explanation: "Endocrine glands produce hormones that act as chemical messengers."
      },
      {
        question: "Which hormone helps lower blood glucose?",
        options: [
          "Insulin",
          "Adrenaline",
          "Thyroxine",
          "Melatonin"
        ],
        answer: 0,
        explanation: "Insulin promotes processes that lower blood glucose."
      },
      {
        question: "Which gland is strongly associated with regulation of metabolism?",
        options: [
          "Thyroid",
          "Sweat gland",
          "Salivary gland",
          "Sebaceous gland"
        ],
        answer: 0,
        explanation: "The thyroid produces hormones that have major effects on metabolism."
      }
    ]
  }

],

    // ========================================================
    // 2. MICROBIOLOGY
    // ========================================================

    "microbiology": [
      [
        "Introduction to Microbiology",
        "Study microorganisms and their importance to human health.",
        "Define microbiology and identify major groups of microorganisms."
      ],
      [
        "Bacteria",
        "Study bacterial structure, classification and reproduction.",
        "Describe basic bacterial structure and binary fission."
      ],
      [
        "Viruses",
        "Study viruses, their structure and replication.",
        "Explain why viruses require host cells for replication."
      ],
      [
        "Fungi",
        "Study yeasts, molds and medically important fungal infections.",
        "Differentiate common forms of fungi."
      ],
      [
        "Protozoa & Parasites",
        "Study medically important protozoa and parasites.",
        "Explain how selected parasites can cause human disease."
      ],
      [
        "Normal Microbiota",
        "Study microorganisms that normally live on and inside the human body.",
        "Explain beneficial and harmful effects of normal microbiota."
      ],
      [
        "Infection & Disease",
        "Study the relationship between microorganisms, infection and disease.",
        "Explain the basic chain of infection."
      ],
      [
        "Sterilization & Disinfection",
        "Study cleaning, disinfection, antisepsis and sterilization.",
        "Differentiate sterilization from disinfection."
      ],
      [
        "Immunity",
        "Study innate and adaptive immune defenses.",
        "Explain the basic mechanisms of immune protection."
      ],
      [
        "Infection Prevention",
        "Study methods used to prevent transmission of microorganisms.",
        "Explain the importance of standard precautions."
      ]
    ],

    // ========================================================
    // 3. FIRST AID
    // ========================================================

    "first-aid": [
      [
        "Introduction to First Aid",
        "Study the principles and priorities of immediate care.",
        "Explain the purpose of first aid."
      ],
      [
        "Primary Assessment",
        "Learn how to rapidly assess an injured or ill person.",
        "Identify immediate life-threatening problems."
      ],
      [
        "Basic Life Support",
        "Study basic approaches to cardiopulmonary emergencies.",
        "Describe the basic sequence of emergency response."
      ],
      [
        "Bleeding & Wounds",
        "Study first aid management of bleeding and wounds.",
        "Explain basic bleeding-control principles."
      ],
      [
        "Fractures & Sprains",
        "Study immediate care for musculoskeletal injuries.",
        "Describe appropriate first-aid measures for suspected fractures."
      ],
      [
        "Burns",
        "Study first aid for thermal and other burns.",
        "Identify important initial care principles for burns."
      ],
      [
        "Shock",
        "Study recognition and immediate management of shock.",
        "Identify common signs of shock."
      ],
      [
        "Choking",
        "Study emergency response to airway obstruction.",
        "Recognize the signs of choking and appropriate emergency action."
      ]
    ],

    // ========================================================
    // 4. FUNDAMENTALS OF NURSING
    // ========================================================

    "fundamentals-nursing": [
      [
        "Introduction to Nursing",
        "Study the role, purpose and principles of professional nursing.",
        "Explain the major responsibilities of a nurse."
      ],
      [
        "Nursing Process",
        "Study assessment, diagnosis, planning, implementation and evaluation.",
        "Describe the five major steps of the nursing process."
      ],
      [
        "Vital Signs",
        "Study temperature, pulse, respiration, blood pressure and oxygen saturation.",
        "Explain correct measurement and documentation of vital signs."
      ],
      [
        "Patient Hygiene",
        "Study principles of personal hygiene and comfort care.",
        "Explain the nurse's role in maintaining patient hygiene."
      ],
      [
        "Patient Safety",
        "Study principles for preventing falls, errors and avoidable harm.",
        "Identify common nursing safety measures."
      ],
      [
        "Communication",
        "Study therapeutic and professional communication.",
        "Differentiate therapeutic communication from ineffective communication."
      ],
      [
        "Documentation",
        "Study accurate, timely and professional nursing documentation.",
        "Explain principles of safe clinical documentation."
      ],
      [
        "Basic Clinical Skills",
        "Study essential bedside nursing skills.",
        "Explain the importance of correct technique and infection prevention."
      ]
    ],

    // ========================================================
    // 5. MEDICAL-SURGICAL NURSING
    // ========================================================

    "medical-surgical": [
      [
        "Introduction to Medical-Surgical Nursing",
        "Study nursing care of adults with common medical and surgical conditions.",
        "Explain the role of the medical-surgical nurse."
      ],
      [
        "Patient Assessment",
        "Study systematic assessment of adult patients.",
        "Identify important components of patient assessment."
      ],
      [
        "Respiratory Disorders",
        "Study nursing care for common respiratory conditions.",
        "Identify important respiratory assessment findings."
      ],
      [
        "Cardiovascular Disorders",
        "Study common cardiovascular conditions and nursing care.",
        "Explain major nursing priorities in cardiovascular care."
      ],
      [
        "Gastrointestinal Disorders",
        "Study common gastrointestinal problems.",
        "Identify important nursing considerations for gastrointestinal disorders."
      ],
      [
        "Renal Disorders",
        "Study common kidney and urinary conditions.",
        "Explain major nursing considerations for renal patients."
      ],
      [
        "Postoperative Nursing Care",
        "Study nursing care before and after surgery.",
        "Identify important postoperative nursing priorities."
      ],
      [
        "Pain Management",
        "Study assessment and management of patient pain.",
        "Explain the importance of pain assessment."
      ]
    ],

    // ========================================================
    // 6. PHARMACOLOGY
    // ========================================================

    "pharmacology": [
      [
        "Introduction to Pharmacology",
        "Study basic principles of medicines and drug therapy.",
        "Define pharmacology and explain its importance to nursing."
      ],
      [
        "Drug Names & Classification",
        "Study generic names, brand names and drug classes.",
        "Differentiate generic and brand drug names."
      ],
      [
        "Pharmacokinetics",
        "Study absorption, distribution, metabolism and excretion.",
        "Explain the four major processes of pharmacokinetics."
      ],
      [
        "Pharmacodynamics",
        "Study how medicines produce effects in the body.",
        "Explain the relationship between drugs and their targets."
      ],
      [
        "Routes of Administration",
        "Study oral, topical, parenteral and other medication routes.",
        "Compare common routes of medication administration."
      ],
      [
        "Medication Safety",
        "Study safe medication administration and error prevention.",
        "Identify important medication-safety principles."
      ],
      [
        "Adverse Drug Reactions",
        "Study unwanted and harmful responses to medicines.",
        "Differentiate common adverse effects from serious reactions."
      ],
      [
        "Nursing Responsibilities",
        "Study nursing responsibilities before, during and after medication administration.",
        "Explain the nurse's role in safe medication therapy."
      ]
    ],

    // ========================================================
    // 7. PATHOPHYSIOLOGY
    // ========================================================

    "pathophysiology": [
      [
        "Introduction to Pathophysiology",
        "Study how disease alters normal body function.",
        "Define pathophysiology."
      ],
      [
        "Cellular Injury",
        "Study how cells respond to stress and injury.",
        "Identify basic causes of cellular injury."
      ],
      [
        "Inflammation",
        "Study the body's inflammatory response.",
        "Describe the basic features of inflammation."
      ],
      [
        "Fluid & Electrolyte Imbalance",
        "Study disturbances of body fluids and electrolytes.",
        "Identify common signs of fluid imbalance."
      ],
      [
        "Infection & Disease",
        "Study how disease processes develop from infection.",
        "Explain basic mechanisms of infectious disease."
      ],
      [
        "Immune Disorders",
        "Study abnormal immune responses.",
        "Differentiate basic immune dysfunctions."
      ],
      [
        "Neoplasia",
        "Study abnormal cell growth and cancer.",
        "Explain basic concepts of neoplasia."
      ],
      [
        "Systemic Disease Processes",
        "Review how pathological processes affect body systems.",
        "Relate disease mechanisms to clinical findings."
      ]
    ],

    // ========================================================
    // 8. COMMUNITY HEALTH
    // ========================================================

    "community-health": [
      [
        "Introduction to Community Health Nursing",
        "Study nursing care delivered to individuals, families and communities.",
        "Define community health nursing."
      ],
      [
        "Community Assessment",
        "Study systematic assessment of community health needs.",
        "Identify important components of community assessment."
      ],
      [
        "Primary Health Care",
        "Study essential principles of primary health care.",
        "Explain the importance of accessible primary care."
      ],
      [
        "Disease Prevention",
        "Study primary, secondary and tertiary prevention.",
        "Differentiate the levels of disease prevention."
      ],
      [
        "Maternal & Child Community Care",
        "Study community services for mothers and children.",
        "Explain the importance of maternal and child health services."
      ],
      [
        "Environmental Health",
        "Study environmental factors affecting health.",
        "Identify common environmental health risks."
      ],
      [
        "Health Education",
        "Study effective community health education.",
        "Explain principles of effective health education."
      ],
      [
        "Community Nursing Practice",
        "Apply community health principles to nursing practice.",
        "Explain the nurse's role in community-based care."
      ]
    ],

    // ========================================================
    // 9. MATERNAL & CHILD HEALTH
    // ========================================================

    "maternal-child-health": [
      [
        "Introduction to Maternal & Child Health",
        "Study health care of women, newborns and children.",
        "Explain the scope of maternal and child health."
      ],
      [
        "Antenatal Care",
        "Study care provided during pregnancy.",
        "Identify major components of antenatal care."
      ],
      [
        "Normal Pregnancy",
        "Study normal physiological changes during pregnancy.",
        "Describe common changes associated with pregnancy."
      ],
      [
        "Labour & Birth",
        "Study the basic processes of labour and childbirth.",
        "Identify the major stages of labour."
      ],
      [
        "Postnatal Care",
        "Study care of the mother after childbirth.",
        "Identify important postnatal assessments."
      ],
      [
        "Newborn Care",
        "Study immediate and continuing care of the newborn.",
        "Identify essential newborn-care principles."
      ],
      [
        "Child Growth & Development",
        "Study normal physical, cognitive and social development.",
        "Explain the importance of developmental assessment."
      ],
      [
        "Maternal & Child Health Promotion",
        "Study strategies for improving maternal and child health.",
        "Explain preventive approaches in maternal and child health."
      ]
    ],

    // ========================================================
    // 10. MIDWIFERY
    // ========================================================

    "midwifery": [
      [
        "Introduction to Midwifery",
        "Study the role and responsibilities of the midwife.",
        "Explain the scope of midwifery practice."
      ],
      [
        "Antenatal Care",
        "Study assessment and care during pregnancy.",
        "Identify important antenatal-care activities."
      ],
      [
        "Normal Pregnancy",
        "Study physiological changes during pregnancy.",
        "Describe common maternal changes during pregnancy."
      ],
      [
        "First Stage of Labour",
        "Study assessment and management during the first stage of labour.",
        "Identify important observations during labour."
      ],
      [
        "Second & Third Stages of Labour",
        "Study birth and placental delivery.",
        "Explain the major events surrounding birth and placental delivery."
      ],
      [
        "Postpartum Care",
        "Study maternal care after delivery.",
        "Identify important postpartum assessments."
      ],
      [
        "Newborn Care",
        "Study essential care immediately after birth.",
        "Explain basic newborn-care priorities."
      ],
      [
        "Midwifery Emergencies",
        "Study recognition of important obstetric emergencies.",
        "Identify the importance of early recognition and referral."
      ]
    ],

    // ========================================================
    // 11. PAEDIATRIC NURSING
    // ========================================================

    "paediatric-nursing": [
      [
        "Introduction to Paediatric Nursing",
        "Study nursing care of infants, children and adolescents.",
        "Explain the principles of paediatric nursing."
      ],
      [
        "Growth & Development",
        "Study normal growth and developmental milestones.",
        "Explain why developmental assessment is important."
      ],
      [
        "Paediatric Assessment",
        "Study assessment of children at different developmental stages.",
        "Identify important paediatric assessment principles."
      ],
      [
        "Nutrition in Children",
        "Study nutritional requirements during childhood.",
        "Explain the importance of adequate childhood nutrition."
      ],
      [
        "Common Childhood Illnesses",
        "Study common conditions affecting children.",
        "Identify important nursing considerations for childhood illnesses."
      ],
      [
        "Medication Safety in Children",
        "Study safe medication principles in paediatric patients.",
        "Explain why medication dosing requires special attention in children."
      ],
      [
        "Child Safety",
        "Study injury prevention and safeguarding.",
        "Identify common safety risks for children."
      ],
      [
        "Family-Centred Care",
        "Study the role of families in paediatric nursing.",
        "Explain family-centred nursing care."
      ]
    ],

    // ========================================================
    // 12. MENTAL HEALTH
    // ========================================================

    "mental-health": [
      [
        "Introduction to Mental Health Nursing",
        "Study principles of psychiatric and mental health nursing.",
        "Define mental health and mental illness."
      ],
      [
        "Therapeutic Communication",
        "Study communication techniques used in mental health care.",
        "Identify therapeutic communication techniques."
      ],
      [
        "Mental Health Assessment",
        "Study systematic assessment of mental status.",
        "Identify major components of mental status assessment."
      ],
      [
        "Anxiety Disorders",
        "Study common anxiety-related conditions.",
        "Identify common features of anxiety disorders."
      ],
      [
        "Depression",
        "Study depressive disorders and nursing care.",
        "Identify important features requiring nursing attention."
      ],
      [
        "Psychosis",
        "Study psychotic symptoms and nursing care.",
        "Differentiate common psychotic symptoms."
      ],
      [
        "Crisis & Suicide Prevention",
        "Study recognition and response to mental health crises.",
        "Explain the importance of safety assessment."
      ],
      [
        "Mental Health Nursing Care",
        "Apply nursing principles to patients with mental health conditions.",
        "Explain major nursing priorities in psychiatric care."
      ]
    ],

    // ========================================================
    // 13. NUTRITION & DIETETICS
    // ========================================================

    "nutrition-dietetics": [
      [
        "Introduction to Nutrition",
        "Study the relationship between nutrition and health.",
        "Define nutrition and explain its importance."
      ],
      [
        "Carbohydrates",
        "Study dietary carbohydrates and their functions.",
        "Explain the major functions of carbohydrates."
      ],
      [
        "Proteins",
        "Study proteins and amino acids.",
        "Explain the importance of protein in the body."
      ],
      [
        "Fats",
        "Study dietary fats and their functions.",
        "Differentiate major types of dietary fat."
      ],
      [
        "Vitamins",
        "Study essential vitamins and their roles.",
        "Explain why vitamins are required for normal body function."
      ],
      [
        "Minerals",
        "Study essential minerals and their functions.",
        "Identify important dietary minerals."
      ],
      [
        "Balanced Diet",
        "Study principles of healthy and balanced eating.",
        "Explain the components of a balanced diet."
      ],
      [
        "Therapeutic Nutrition",
        "Study nutritional considerations in disease.",
        "Explain how diet may be modified for patient needs."
      ]
    ],

    // ========================================================
    // 14. HEALTH ASSESSMENT
    // ========================================================

    "health-assessment": [
      [
        "Introduction to Health Assessment",
        "Study systematic assessment of patients.",
        "Explain the purpose of health assessment."
      ],
      [
        "Health History",
        "Study collection of subjective patient information.",
        "Identify important components of a health history."
      ],
      [
        "General Survey",
        "Study the first visual assessment of a patient.",
        "Explain the importance of the general survey."
      ],
      [
        "Vital Signs",
        "Study measurement and interpretation of vital signs.",
        "Identify the major vital signs."
      ],
      [
        "Head-to-Toe Assessment",
        "Study systematic physical assessment.",
        "Explain the importance of a systematic assessment sequence."
      ],
      [
        "Respiratory Assessment",
        "Study assessment of the respiratory system.",
        "Identify important respiratory assessment findings."
      ],
      [
        "Cardiovascular Assessment",
        "Study cardiovascular assessment.",
        "Identify important cardiovascular assessment components."
      ],
      [
        "Documentation & Reporting",
        "Study documentation and communication of assessment findings.",
        "Explain principles of accurate clinical reporting."
      ]
    ],

    // ========================================================
    // 15. NURSING ETHICS
    // ========================================================

    "nursing-ethics": [
      [
        "Introduction to Nursing Ethics",
        "Study ethical principles that guide professional nursing.",
        "Define nursing ethics."
      ],
      [
        "Patient Autonomy",
        "Study respect for patient choices and self-determination.",
        "Explain the principle of autonomy."
      ],
      [
        "Beneficence & Nonmaleficence",
        "Study the ethical duties to benefit patients and avoid harm.",
        "Differentiate beneficence and nonmaleficence."
      ],
      [
        "Confidentiality",
        "Study protection of patient information.",
        "Explain why confidentiality is essential."
      ],
      [
        "Informed Consent",
        "Study ethical principles surrounding informed consent.",
        "Explain the purpose of informed consent."
      ],
      [
        "Professional Boundaries",
        "Study appropriate professional relationships.",
        "Identify the importance of professional boundaries."
      ],
      [
        "Patient Rights",
        "Study fundamental rights of patients.",
        "Identify important patient rights."
      ],
      [
        "Professional Practice",
        "Study accountability, professionalism and ethical nursing practice.",
        "Explain professional responsibility in nursing."
      ]
    ],

    // ========================================================
    // 16. RESEARCH METHODS
    // ========================================================

    "research-methods": [
      [
        "Introduction to Nursing Research",
        "Study the purpose and role of research in nursing.",
        "Define nursing research."
      ],
      [
        "Research Problems",
        "Study how research problems and questions are developed.",
        "Identify characteristics of a good research problem."
      ],
      [
        "Literature Review",
        "Study searching, evaluating and synthesizing existing evidence.",
        "Explain the purpose of a literature review."
      ],
      [
        "Research Designs",
        "Study quantitative and qualitative research designs.",
        "Differentiate common research designs."
      ],
      [
        "Sampling",
        "Study methods of selecting research participants.",
        "Explain the basic concept of sampling."
      ],
      [
        "Data Collection",
        "Study common methods of collecting research data.",
        "Identify common data-collection methods."
      ],
      [
        "Research Ethics",
        "Study ethical principles governing research.",
        "Explain why research participants require protection."
      ],
      [
        "Research Reporting",
        "Study interpretation and presentation of research findings.",
        "Identify major sections of a research report."
      ]
    ],

    // ========================================================
    // 17. BIOSTATISTICS
    // ========================================================

    "biostatistics": [
      [
        "Introduction to Biostatistics",
        "Study the use of statistics in health and nursing.",
        "Define biostatistics."
      ],
      [
        "Data Types",
        "Study qualitative and quantitative health data.",
        "Differentiate common data types."
      ],
      [
        "Measures of Central Tendency",
        "Study mean, median and mode.",
        "Define mean, median and mode."
      ],
      [
        "Measures of Variation",
        "Study range, variance and standard deviation.",
        "Explain why variability is important."
      ],
      [
        "Tables & Graphs",
        "Study presentation of health data.",
        "Identify appropriate ways to display data."
      ],
      [
        "Probability",
        "Study basic concepts of probability.",
        "Explain the meaning of probability."
      ],
      [
        "Research Statistics",
        "Study statistics commonly used in health research.",
        "Explain the role of statistics in research."
      ],
      [
        "Interpreting Health Data",
        "Apply basic statistical reasoning to health information.",
        "Explain how statistics can support nursing decisions."
      ]
    ],

    // ========================================================
    // 18. PUBLIC HEALTH
    // ========================================================

    "public-health": [
      [
        "Introduction to Public Health",
        "Study population-level approaches to health.",
        "Define public health."
      ],
      [
        "Population Health",
        "Study factors affecting the health of populations.",
        "Explain the concept of population health."
      ],
      [
        "Epidemiology",
        "Study patterns and causes of disease in populations.",
        "Define epidemiology."
      ],
      [
        "Disease Surveillance",
        "Study monitoring of diseases and health events.",
        "Explain the purpose of disease surveillance."
      ],
      [
        "Health Promotion",
        "Study strategies for improving population health.",
        "Explain the role of health promotion."
      ],
      [
        "Disease Prevention",
        "Study prevention strategies at population level.",
        "Differentiate levels of prevention."
      ],
      [
        "Environmental Health",
        "Study environmental influences on population health.",
        "Identify important environmental health factors."
      ],
      [
        "Public Health Nursing",
        "Study the role of nurses in population health.",
        "Explain the contribution of nursing to public health."
      ]
    ],

    // ========================================================
    // 19. HEALTH PROMOTION
    // ========================================================

    "health-promotion": [
      [
        "Introduction to Health Promotion",
        "Study strategies that enable individuals and communities to improve health.",
        "Define health promotion."
      ],
      [
        "Health Education",
        "Study methods of communicating health information.",
        "Explain principles of effective health education."
      ],
      [
        "Healthy Lifestyle",
        "Study behaviours that support physical and mental health.",
        "Identify major components of a healthy lifestyle."
      ],
      [
        "Exercise & Physical Activity",
        "Study the health benefits of physical activity.",
        "Explain the importance of regular physical activity."
      ],
      [
        "Nutrition & Healthy Eating",
        "Study healthy dietary behaviours.",
        "Explain the role of nutrition in health promotion."
      ],
      [
        "Disease Prevention",
        "Study strategies for preventing illness.",
        "Identify primary prevention strategies."
      ],
      [
        "Behaviour Change",
        "Study factors that influence health behaviours.",
        "Explain why behaviour change can be challenging."
      ],
      [
        "Community Health Promotion",
        "Study population approaches to improving health.",
        "Explain the role of community participation."
      ]
    ],

    // ========================================================
    // 20. INFECTION PREVENTION & CONTROL
    // ========================================================

    "infection-control": [
      [
        "Introduction to Infection Prevention",
        "Study principles of preventing healthcare-associated infections.",
        "Explain the purpose of infection prevention and control."
      ],
      [
        "Chain of Infection",
        "Study the links involved in transmission of infection.",
        "Identify the major links in the chain of infection."
      ],
      [
        "Standard Precautions",
        "Study precautions used for all patients.",
        "Explain the purpose of standard precautions."
      ],
      [
        "Hand Hygiene",
        "Study hand hygiene principles and indications.",
        "Explain why hand hygiene is central to infection prevention."
      ],
      [
        "Personal Protective Equipment",
        "Study appropriate selection and use of PPE.",
        "Identify common types of PPE."
      ],
      [
        "Transmission-Based Precautions",
        "Study precautions for different modes of transmission.",
        "Differentiate common transmission-based precautions."
      ],
      [
        "Healthcare-Associated Infections",
        "Study prevention of infections associated with healthcare.",
        "Identify common strategies for reducing healthcare-associated infections."
      ],
      [
        "Cleaning, Disinfection & Sterilization",
        "Study methods for reducing or eliminating microorganisms.",
        "Differentiate cleaning, disinfection and sterilization."
      ]
    ]
  };

  // ==========================================================
  // OPEN SUBJECT
  // ==========================================================

  window.openPulsePrepSubjectPage = function (subjectId) {

    const subjects = getSubjects();

    const subject = subjects.find(function (item) {
      return String(item.id) === String(subjectId);
    });

    if (!subject) {
      console.error("PulsePrep: Subject not found:", subjectId);
      return;
    }

    const page = getPage();

    if (!page) {
      console.error(
        "PulsePrep: #pulseprepSubjectPage was not found."
      );
      return;
    }

    const lessons = curriculum[subject.id];

    if (!Array.isArray(lessons) || lessons.length === 0) {
      page.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 py-8">

          <button
            type="button"
            onclick="showTab('subject-library')"
            class="mb-6 px-4 py-2 rounded-xl
                   bg-white border border-slate-200
                   text-slate-700 font-bold
                   hover:bg-slate-50"
          >
            <i class="fa-solid fa-arrow-left mr-2"></i>
            Back to Subjects
          </button>

          <div
            class="bg-white rounded-3xl
                   border border-slate-200
                   shadow-sm p-8 text-center"
          >
            <h1 class="text-2xl font-black text-slate-900">
              ${escapeHTML(subject.name)}
            </h1>

            <p class="text-slate-500 mt-3">
              Lesson content is being prepared.
            </p>
          </div>

        </div>
      `;

      goToSubjectPageTab();
      scrollTop();
      return;
    }

    // ========================================================
    // SUBJECT HEADER + REAL SUBJECT-SPECIFIC LESSONS
    // ========================================================

    page.innerHTML = `

      <div class="max-w-6xl mx-auto px-4 py-6">

        <button
          type="button"
          onclick="showTab('subject-library')"
          class="mb-6 px-4 py-2 rounded-xl
                 bg-white border border-slate-200
                 text-slate-700 font-bold
                 hover:bg-slate-50"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Subjects
        </button>

        <!-- SUBJECT HEADER -->

        <div
          class="bg-gradient-to-r
                 from-slate-900
                 to-teal-700
                 rounded-3xl
                 p-7 sm:p-10
                 text-white
                 shadow-xl"
        >

          <div class="flex flex-col sm:flex-row gap-5 sm:items-center">

            <div
              class="w-16 h-16 rounded-2xl
                     bg-white/10
                     flex items-center justify-center"
            >
              <i
                class="fa-solid ${escapeHTML(subject.icon || "fa-book")}
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

        <!-- CONTENT -->

        <div class="grid lg:grid-cols-3 gap-6 mt-7">

          <!-- LESSONS -->

          <div
            class="lg:col-span-2
                   bg-white
                   rounded-3xl
                   border border-slate-200
                   shadow-sm
                   p-6"
          >

            <div class="mb-5">

              <h2
                class="text-xl font-black
                       text-slate-900"
              >
                Learning Modules
              </h2>

              <p class="text-sm text-slate-500 mt-1">
                ${lessons.length} lessons available in
                ${escapeHTML(subject.name)}.
              </p>

            </div>

            <div class="space-y-3">

              ${lessons.map(function (lesson, index) {

                const number = index + 1;

                return `

                  <button
                    type="button"
                    onclick="
                      openPulsePrepLesson(
                        '${escapeHTML(subject.id)}',
                        ${number}
                      )
                    "
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
                      class="w-11 h-11
                             flex-shrink-0
                             rounded-xl
                             bg-teal-50
                             text-teal-600
                             flex items-center
                             justify-center
                             font-black"
                    >
                      ${number}
                    </div>

                    <div class="flex-1 min-w-0">

                      <p
                        class="font-bold
                               text-slate-800"
                      >
                        ${escapeHTML(lesson[0])}
                      </p>

                      <p
                        class="text-xs
                               text-slate-500
                               mt-1"
                      >
                        Lesson ${number}
                      </p>

                    </div>

                    <i
                      class="fa-solid
                             fa-chevron-right
                             text-slate-400"
                    ></i>

                  </button>

                `;
              }).join("")}

            </div>

          </div>

          <!-- PROGRESS -->

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

              <div
                class="p-4 rounded-xl
                       bg-teal-50
                       text-teal-800"
              >
                <div class="font-bold">
                  ${lessons.length} Lessons
                </div>

                <div class="text-xs mt-1">
                  Complete lessons to build your progress.
                </div>
              </div>

              <div
                class="p-4 rounded-xl
                       bg-slate-50
                       text-slate-700"
              >
                <div class="font-bold">
                  Study + Practice
                </div>

                <div class="text-xs mt-1">
                  Each lesson contains study notes,
                  key points and a practice question.
                </div>
              </div>

            </div>

          </aside>

        </div>

      </div>
    `;

    goToSubjectPageTab();
    scrollTop();
  };

  // ==========================================================
  // OPEN LESSON
  // ==========================================================

  window.openPulsePrepLesson = function (subjectId, lessonNumber) {

    const subjects = getSubjects();

    const subject = subjects.find(function (item) {
      return String(item.id) === String(subjectId);
    });

    if (!subject) {
      console.error("PulsePrep: Subject not found:", subjectId);
      return;
    }

    const lessons = curriculum[subject.id];

    // Never allow a lesson from another subject.
    if (!Array.isArray(lessons)) {
      console.error(
        "PulsePrep: No curriculum found for:",
        subject.id
      );
      return;
    }

    const lessonIndex = Number(lessonNumber) - 1;

    if (
      !Number.isInteger(lessonIndex) ||
      lessonIndex < 0 ||
      lessonIndex >= lessons.length
    ) {
      console.error(
        "PulsePrep: Invalid lesson:",
        subject.id,
        lessonNumber
      );
      return;
    }

    const lesson = lessons[lessonIndex];

    const page = getPage();

    if (!page) {
      console.error(
        "PulsePrep: #pulseprepSubjectPage was not found."
      );
      return;
    }

    const currentLesson = Number(lessonNumber);
    const totalLessons = lessons.length;

    const previousLesson =
      currentLesson > 1
        ? currentLesson - 1
        : null;

    const nextLesson =
      currentLesson < totalLessons
        ? currentLesson + 1
        : null;

    const progress = Math.round(
      (currentLesson / totalLessons) * 100
    );

    page.innerHTML = `

      <div class="max-w-5xl mx-auto px-4 py-6">

        <!-- BACK -->

        <button
          type="button"
          onclick="
            openPulsePrepSubjectPage(
              '${escapeHTML(subject.id)}'
            )
          "
          class="mb-6 px-4 py-2 rounded-xl
                 bg-white border border-slate-200
                 text-slate-700 font-bold
                 hover:bg-slate-50"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Lessons
        </button>

        <!-- HEADER -->

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
            class="text-xs uppercase
                   tracking-wider
                   font-bold text-teal-200"
          >
            ${escapeHTML(subject.name)}
          </div>

          <h1
            class="text-3xl sm:text-4xl
                   font-black mt-2"
          >
            ${escapeHTML(lesson[0])}
          </h1>

          <p class="text-slate-200 mt-3">
            Lesson ${currentLesson}
            of
            ${totalLessons}
          </p>

          <div class="mt-6">

            <div
              class="flex justify-between
                     text-xs font-bold
                     text-teal-100 mb-2"
            >
              <span>Course Progress</span>
              <span>${progress}%</span>
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

        <!-- STUDY NOTES -->

        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div
            class="flex items-center
                   gap-3 mb-5"
          >

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

            <p>
              ${escapeHTML(lesson[1])}
            </p>

            <p class="mt-4">
              This lesson focuses on
              <strong>
                ${escapeHTML(lesson[0])}
              </strong>
              as part of
              <strong>
                ${escapeHTML(subject.name)}
              </strong>.
            </p>

          </div>

        </section>

        <!-- KEY POINTS -->

        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div
            class="flex items-center
                   gap-3 mb-5"
          >

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

            <li class="flex gap-3 items-start">

              <span
                class="w-6 h-6 mt-1
                       rounded-full
                       bg-teal-50
                       text-teal-600
                       flex items-center
                       justify-center
                       flex-shrink-0"
              >
                <i
                  class="fa-solid fa-check text-xs"
                ></i>
              </span>

              <span class="text-slate-700">
                Understand the main concepts of
                ${escapeHTML(lesson[0])}.
              </span>

            </li>

            <li class="flex gap-3 items-start">

              <span
                class="w-6 h-6 mt-1
                       rounded-full
                       bg-teal-50
                       text-teal-600
                       flex items-center
                       justify-center
                       flex-shrink-0"
              >
                <i
                  class="fa-solid fa-check text-xs"
                ></i>
              </span>

              <span class="text-slate-700">
                Relate the topic to
                ${escapeHTML(subject.name)}
                and nursing practice.
              </span>

            </li>

            <li class="flex gap-3 items-start">

              <span
                class="w-6 h-6 mt-1
                       rounded-full
                       bg-teal-50
                       text-teal-600
                       flex items-center
                       justify-center
                       flex-shrink-0"
              >
                <i
                  class="fa-solid fa-check text-xs"
                ></i>
              </span>

              <span class="text-slate-700">
                Review the lesson before attempting
                the practice question.
              </span>

            </li>

          </ul>

        </section>

        <!-- PRACTICE QUESTION -->

        <section
          class="bg-white
                 rounded-3xl
                 border border-slate-200
                 shadow-sm
                 p-6 sm:p-8
                 mt-6"
        >

          <div
            class="flex items-center
                   gap-3 mb-5"
          >

            <div
              class="w-11 h-11
                     rounded-xl
                     bg-purple-50
                     text-purple-600
                     flex items-center
                     justify-center"
            >
              <i
                class="fa-solid
                       fa-circle-question"
              ></i>
            </div>

            <h2
              class="text-2xl
                     font-black
                     text-slate-900"
            >
              Practice Question
            </h2>

          </div>

          <div
            class="rounded-2xl
                   border border-slate-200
                   p-5"
          >

            <p
              class="font-bold
                     text-slate-800"
            >
              What is the main purpose of studying
              ${escapeHTML(lesson[0])}
              in ${escapeHTML(subject.name)}?
            </p>

            <button
              type="button"
              onclick="
                this.nextElementSibling
                  .classList.toggle('hidden')
              "
              class="mt-4 px-4 py-2
                     rounded-xl
                     bg-slate-900
                     text-white
                     text-sm font-bold
                     hover:bg-teal-600"
            >
              <i class="fa-solid fa-eye mr-2"></i>
              Show Answer
            </button>

            <div
              class="hidden mt-4 p-4
                     rounded-xl
                     bg-teal-50
                     border border-teal-100
                     text-teal-900"
            >

              <strong>Answer:</strong>

              ${escapeHTML(lesson[2])}

            </div>

          </div>

        </section>

        <!-- LESSON NAVIGATION -->

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
                  type="button"
                  onclick="
                    openPulsePrepLesson(
                      '${escapeHTML(subject.id)}',
                      ${previousLesson}
                    )
                  "
                  class="flex-1 py-4
                         rounded-xl
                         border border-slate-200
                         bg-white
                         text-slate-700
                         font-bold"
                >
                  <i
                    class="fa-solid
                           fa-arrow-left mr-2"
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
                  class="flex-1 py-4
                         rounded-xl
                         bg-teal-600
                         text-white
                         font-bold
                         hover:bg-teal-700"
                >
                  Next Lesson
                  <i
                    class="fa-solid
                           fa-arrow-right ml-2"
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
                  class="flex-1 py-4
                         rounded-xl
                         bg-teal-600
                         text-white
                         font-bold"
                >
                  <i
                    class="fa-solid
                           fa-check mr-2"
                  ></i>
                  Back to Course
                </button>
              `
          }

        </div>

      </div>
    `;

    goToSubjectPageTab();
    scrollTop();
  };

})();
