// ============================================================
// PULSEPREP — INDIVIDUAL SUBJECT PAGE
// COMPLETE CORRECTED SUBJECT ENGINE
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // HELPERS
  // ==========================================================

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getSubjects() {
    return Array.isArray(window.PULSEPREP_SUBJECTS)
      ? window.PULSEPREP_SUBJECTS
      : [];
  }

  function getSubject(subjectId) {
    return getSubjects().find(function (subject) {
      return String(subject.id) === String(subjectId);
    });
  }

  function getPage() {
    return document.getElementById("pulseprepSubjectPage");
  }

  function ensurePage() {
    let page = getPage();

    if (page) {
      return page;
    }

    page = document.createElement("div");
    page.id = "pulseprepSubjectPage";
    page.className = "w-full";

    const subjectTab = document.getElementById("subject-page");

    if (subjectTab) {
      subjectTab.innerHTML = "";
      subjectTab.appendChild(page);
    } else {
      document.body.appendChild(page);
    }

    return page;
  }

  function showSubjectTab() {
    if (typeof window.showTab === "function") {
      try {
        window.showTab("subject-page");
        return;
      } catch (error) {
        console.warn("PulsePrep showTab error:", error);
      }
    }

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(function (tab) {
      tab.style.display = "none";
    });

    const subjectTab = document.getElementById("subject-page");

    if (subjectTab) {
      subjectTab.style.display = "block";
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // ==========================================================
  // SUBJECT CONTENT
  // ==========================================================

  const SUBJECT_CONTENT = {

    // ========================================================
    // 1. ANATOMY & PHYSIOLOGY
    // ========================================================

  "anatomy-physiology": {
  title: "Anatomy & Physiology",
  description:
    "A comprehensive nursing-focused study of the structure and function of the human body, including cells, tissues, organs, body systems, homeostasis and their clinical importance.",

  lessons: [

    {
      title: "Module 1 — Introduction to Anatomy & Physiology",
      explanation: `
        <p><strong>Anatomy</strong> is the study of the structure of the human body, while
        <strong>physiology</strong> is the study of how those structures function.</p>

        <p>For nursing students, anatomy and physiology provide the foundation for understanding
        almost every other nursing subject. A nurse needs to understand what a normal body
        looks like and how it normally functions before abnormal findings can be recognized.</p>

        <p>The human body is organized from simple structures into increasingly complex structures.
        Cells form tissues, tissues form organs, organs work together as organ systems, and all
        systems work together to maintain life.</p>

        <p>The major organ systems include the integumentary, skeletal, muscular, nervous,
        endocrine, cardiovascular, lymphatic/immune, respiratory, digestive, urinary and
        reproductive systems.</p>

        <p>Although each system has specialized functions, none works completely independently.
        For example, the respiratory system supplies oxygen, the cardiovascular system transports
        oxygen, and the cells use oxygen to produce energy.</p>
      `,
      clinicalApplication: `
        <p>A nurse who understands normal anatomy and physiology can recognize when a patient's
        condition is abnormal. For example, understanding normal respiratory physiology helps
        the nurse recognize abnormal breathing, oxygen saturation changes and signs of respiratory
        distress.</p>
      `,
      keyPoints: [
        "Anatomy = structure.",
        "Physiology = function.",
        "Cells are the basic structural and functional units of the body.",
        "Body systems work together to maintain life.",
        "Knowledge of normal function is essential for recognizing abnormalities."
      ],
      examAlert:
        "Remember the difference: anatomy asks 'What is it and where is it?' while physiology asks 'How does it work?'",
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
          explanation:
            "Anatomy is the study of the structure and physical organization of the body."
        },
        {
          question: "What is physiology primarily concerned with?",
          options: [
            "Body structure",
            "Disease classification",
            "How body structures function",
            "Drug preparation"
          ],
          answer: 2,
          explanation:
            "Physiology explains how cells, tissues, organs and body systems function."
        },
        {
          question: "Why is anatomy and physiology important to nursing?",
          options: [
            "It replaces clinical practice.",
            "It helps nurses understand normal and abnormal body function.",
            "It is only needed by surgeons.",
            "It is unrelated to patient care."
          ],
          answer: 1,
          explanation:
            "Nurses use knowledge of normal structure and function to assess patients and identify abnormalities."
        },
        {
          question: "Which level of organization comes immediately after cells?",
          options: [
            "Organ systems",
            "Organs",
            "Tissues",
            "Organisms"
          ],
          answer: 2,
          explanation:
            "Similar cells group together to form tissues."
        },
        {
          question: "Which statement is most accurate?",
          options: [
            "Body systems function independently.",
            "Only the nervous system maintains life.",
            "Body systems interact to maintain normal body function.",
            "Organs have no relationship with other systems."
          ],
          answer: 2,
          explanation:
            "The body is an integrated system. Different organs and systems continuously interact."
        }
      ]
    },

    {
      title: "Module 2 — Anatomical Position and Directional Terms",
      explanation: `
        <p>The <strong>anatomical position</strong> is the standard reference position used when
        describing the location of structures in the human body. In anatomical position, the
        person stands upright, faces forward, keeps the arms at the sides, has the palms facing
        forward and has the feet directed forward.</p>

        <p>Nurses use directional terms to communicate accurately. Important terms include
        superior, inferior, anterior, posterior, medial, lateral, proximal, distal, superficial
        and deep.</p>

        <p><strong>Superior</strong> means toward the head, while <strong>inferior</strong> means
        toward the feet. <strong>Anterior</strong> means toward the front of the body and
        <strong>posterior</strong> means toward the back.</p>

        <p><strong>Medial</strong> means closer to the body's midline, while
        <strong>lateral</strong> means farther from the midline.</p>

        <p><strong>Proximal</strong> means closer to the point of attachment, while
        <strong>distal</strong> means farther away from the point of attachment.</p>

        <p><strong>Superficial</strong> describes a structure closer to the body's surface.
        <strong>Deep</strong> describes a structure farther from the surface.</p>
      `,
      clinicalApplication: `
        <p>Directional terminology is important when documenting wounds, injuries, swelling,
        pain and other physical findings. Accurate terminology prevents confusion between
        healthcare professionals.</p>
      `,
      keyPoints: [
        "Superior = toward the head.",
        "Inferior = toward the feet.",
        "Anterior = front.",
        "Posterior = back.",
        "Medial = toward the midline.",
        "Lateral = away from the midline.",
        "Proximal = closer to attachment.",
        "Distal = farther from attachment."
      ],
      examAlert:
        "Proximal and distal are especially important when describing structures of the limbs.",
      questions: [
        {
          question: "Which term means toward the head?",
          options: [
            "Inferior",
            "Superior",
            "Distal",
            "Lateral"
          ],
          answer: 1,
          explanation:
            "Superior means above or toward the head."
        },
        {
          question: "The heart is medial to the lungs. What does medial mean?",
          options: [
            "Farther from the midline",
            "Closer to the midline",
            "Closer to the skin",
            "Toward the feet"
          ],
          answer: 1,
          explanation:
            "Medial means closer to the body's midline."
        },
        {
          question: "The wrist is distal to the elbow. What does distal mean?",
          options: [
            "Closer to the point of attachment",
            "Farther from the point of attachment",
            "Toward the head",
            "Toward the midline"
          ],
          answer: 1,
          explanation:
            "Distal means farther away from the point of attachment."
        },
        {
          question: "Which term means toward the front of the body?",
          options: [
            "Posterior",
            "Anterior",
            "Inferior",
            "Deep"
          ],
          answer: 1,
          explanation:
            "Anterior refers to the front of the body."
        },
        {
          question: "Which term describes a structure farther from the body's surface?",
          options: [
            "Superficial",
            "Deep",
            "Lateral",
            "Anterior"
          ],
          answer: 1,
          explanation:
            "Deep describes a structure farther from the body's surface."
        }
      ]
    },

    {
      title: "Module 3 — Body Planes, Sections and Cavities",
      explanation: `
        <p>Healthcare professionals use imaginary planes to describe sections of the body.
        The three major anatomical planes are the <strong>sagittal, frontal and transverse</strong>
        planes.</p>

        <p>A <strong>sagittal plane</strong> divides the body into right and left portions.
        A midsagittal plane divides the body into equal right and left halves.</p>

        <p>A <strong>frontal or coronal plane</strong> divides the body into anterior and
        posterior portions.</p>

        <p>A <strong>transverse plane</strong> divides the body into superior and inferior
        portions.</p>

        <p>The body also contains major cavities. The cranial cavity contains the brain.
        The vertebral cavity contains the spinal cord. The thoracic cavity contains organs
        such as the heart and lungs. The abdominal cavity contains many digestive organs,
        while the pelvic cavity contains organs including the urinary bladder and reproductive
        organs.</p>
      `,
      clinicalApplication: `
        <p>Understanding body planes and cavities helps nurses interpret imaging reports,
        describe locations of injuries and understand the position of organs.</p>
      `,
      keyPoints: [
        "Sagittal = right and left.",
        "Frontal = anterior and posterior.",
        "Transverse = superior and inferior.",
        "Cranial cavity contains the brain.",
        "Vertebral cavity contains the spinal cord.",
        "Thoracic cavity contains the heart and lungs."
      ],
      examAlert:
        "A transverse section separates the body into upper and lower portions.",
      questions: [
        {
          question: "Which plane divides the body into superior and inferior portions?",
          options: [
            "Sagittal",
            "Frontal",
            "Transverse",
            "Oblique"
          ],
          answer: 2,
          explanation:
            "The transverse plane divides the body into superior and inferior portions."
        },
        {
          question: "Which cavity contains the brain?",
          options: [
            "Thoracic",
            "Abdominal",
            "Cranial",
            "Pelvic"
          ],
          answer: 2,
          explanation:
            "The brain is located in the cranial cavity."
        },
        {
          question: "The frontal plane divides the body into:",
          options: [
            "Right and left",
            "Upper and lower",
            "Anterior and posterior",
            "Medial and lateral"
          ],
          answer: 2,
          explanation:
            "The frontal plane separates anterior and posterior portions."
        },
        {
          question: "Which cavity contains the spinal cord?",
          options: [
            "Cranial",
            "Vertebral",
            "Thoracic",
            "Abdominal"
          ],
          answer: 1,
          explanation:
            "The spinal cord is located within the vertebral cavity."
        },
        {
          question: "Which organs are major contents of the thoracic cavity?",
          options: [
            "Kidneys and bladder",
            "Heart and lungs",
            "Stomach and intestines only",
            "Brain and spinal cord"
          ],
          answer: 1,
          explanation:
            "The thoracic cavity contains the heart and lungs among other structures."
        }
      ]
    },

    {
      title: "Module 4 — Levels of Organization",
      explanation: `
        <p>The human body is organized into several levels of increasing complexity.</p>

        <p>The simplest level is the <strong>chemical level</strong>, which includes atoms and
        molecules. Chemicals combine to form structures necessary for life.</p>

        <p>The <strong>cellular level</strong> consists of cells, which are the basic structural
        and functional units of life.</p>

        <p>Groups of similar cells form <strong>tissues</strong>. Groups of tissues form
        <strong>organs</strong>. Organs that work together form <strong>organ systems</strong>.
        All organ systems together make the complete human organism.</p>

        <p>The four major tissue types are epithelial, connective, muscle and nervous tissue.</p>
      `,
      clinicalApplication: `
        <p>Understanding organization helps nurses understand why damage at the cellular level
        can eventually affect tissues, organs and entire body systems.</p>
      `,
      keyPoints: [
        "Chemical → cellular → tissue → organ → organ system → organism.",
        "Cells are the basic unit of life.",
        "Four major tissues are epithelial, connective, muscle and nervous."
      ],
      examAlert:
        "Know the order of biological organization from simplest to most complex.",
      questions: [
        {
          question: "What is the basic structural and functional unit of the body?",
          options: [
            "Organ",
            "Tissue",
            "Cell",
            "System"
          ],
          answer: 2,
          explanation:
            "The cell is the basic structural and functional unit of the human body."
        },
        {
          question: "Which level comes immediately after tissue?",
          options: [
            "Cell",
            "Organ",
            "Chemical",
            "Organism"
          ],
          answer: 1,
          explanation:
            "Groups of tissues form organs."
        },
        {
          question: "Which is NOT one of the four major tissue types?",
          options: [
            "Epithelial",
            "Connective",
            "Muscle",
            "Vascular"
          ],
          answer: 3,
          explanation:
            "The four major tissue types are epithelial, connective, muscle and nervous tissue."
        },
        {
          question: "Several organs working together form a:",
          options: [
            "Cell",
            "Tissue",
            "Organ system",
            "Molecule"
          ],
          answer: 2,
          explanation:
            "Organs that work together to perform major body functions form organ systems."
        },
        {
          question: "Which level is the most complex?",
          options: [
            "Cellular",
            "Tissue",
            "Organ",
            "Organism"
          ],
          answer: 3,
          explanation:
            "The organism represents the complete living human being."
        }
      ]
    },

    {
      title: "Module 5 — Cells and Cell Structure",
      explanation: `
        <p>The cell is the basic unit of life. Although cells vary greatly in shape and function,
        most cells contain structures that allow them to survive and perform specialized tasks.</p>

        <p>The <strong>cell membrane</strong> surrounds the cell and controls movement of substances
        into and out of the cell. It helps maintain the internal environment of the cell.</p>

        <p>The <strong>cytoplasm</strong> contains the organelles and is the location of many
        chemical reactions.</p>

        <p>The <strong>nucleus</strong> contains most of the cell's genetic material and helps
        control cellular activities.</p>

        <p><strong>Mitochondria</strong> produce much of the cell's usable energy in the form
        of ATP.</p>

        <p><strong>Ribosomes</strong> are involved in protein synthesis. The endoplasmic
        reticulum helps synthesize and transport substances, while the Golgi apparatus modifies,
        sorts and packages proteins and other materials.</p>

        <p>Lysosomes contain enzymes that help break down waste and cellular materials.</p>
      `,
      clinicalApplication: `
        <p>Cellular injury occurs in conditions such as hypoxia, infection, poisoning and
        inadequate nutrition. Nurses should understand that severe cellular damage can result
        in tissue and organ dysfunction.</p>
      `,
      keyPoints: [
        "Cell membrane controls movement of substances.",
        "Nucleus contains genetic material.",
        "Mitochondria produce ATP.",
        "Ribosomes synthesize proteins.",
        "Golgi apparatus modifies and packages substances.",
        "Lysosomes help break down cellular materials."
      ],
      examAlert:
        "Mitochondria are commonly described as the major energy-producing organelles of the cell.",
      questions: [
        {
          question: "Which organelle contains most of the cell's genetic material?",
          options: [
            "Ribosome",
            "Nucleus",
            "Golgi apparatus",
            "Lysosome"
          ],
          answer: 1,
          explanation:
            "The nucleus contains most of the cell's DNA."
        },
        {
          question: "Which organelle is mainly associated with ATP production?",
          options: [
            "Mitochondrion",
            "Lysosome",
            "Ribosome",
            "Golgi apparatus"
          ],
          answer: 0,
          explanation:
            "Mitochondria produce most of the ATP used by cells."
        },
        {
          question: "What is the main function of the cell membrane?",
          options: [
            "Produce bones",
            "Control movement of substances into and out of the cell",
            "Store urine",
            "Pump blood"
          ],
          answer: 1,
          explanation:
            "The cell membrane regulates movement of substances between the cell and its environment."
        },
        {
          question: "Which structure is responsible for protein synthesis?",
          options: [
            "Ribosome",
            "Lysosome",
            "Nucleus only",
            "Centrosome"
          ],
          answer: 0,
          explanation:
            "Ribosomes are the primary sites of protein synthesis."
        },
        {
          question: "Which organelle modifies and packages proteins?",
          options: [
            "Golgi apparatus",
            "Mitochondrion",
            "Nucleus",
            "Cell membrane"
          ],
          answer: 0,
          explanation:
            "The Golgi apparatus modifies, sorts and packages proteins and other cellular products."
        }
      ]
    },

    {
      title: "Module 6 — Cell Transport and Homeostasis",
      explanation: `
        <p>Cells constantly exchange substances with their environment. Transport across the
        cell membrane may occur through passive or active processes.</p>

        <p><strong>Diffusion</strong> is the movement of particles from an area of higher
        concentration to an area of lower concentration.</p>

        <p><strong>Osmosis</strong> is the movement of water across a selectively permeable
        membrane toward an area with a higher concentration of solutes.</p>

        <p><strong>Active transport</strong> requires energy because substances are moved against
        their concentration gradient.</p>

        <p>The body's ability to maintain a relatively stable internal environment is called
        <strong>homeostasis</strong>. Examples include regulation of body temperature, blood
        glucose, blood pressure, fluid balance and blood pH.</p>

        <p>Homeostasis is maintained through feedback mechanisms. Negative feedback works to
        reverse a change and restore normal conditions.</p>
      `,
      clinicalApplication: `
        <p>Fluid balance, electrolyte balance, temperature and glucose monitoring are important
        nursing responsibilities because changes in these variables can threaten homeostasis.</p>
      `,
      keyPoints: [
        "Diffusion moves substances from high to low concentration.",
        "Osmosis involves movement of water.",
        "Active transport requires energy.",
        "Homeostasis maintains internal stability.",
        "Negative feedback reverses changes and promotes stability."
      ],
      examAlert:
        "Osmosis = water movement. Diffusion = particle movement from high concentration to low concentration.",
      questions: [
        {
          question: "What is osmosis?",
          options: [
            "Movement of proteins using ATP",
            "Movement of water across a selectively permeable membrane",
            "Production of ATP",
            "Cell division"
          ],
          answer: 1,
          explanation:
            "Osmosis is the movement of water across a selectively permeable membrane."
        },
        {
          question: "Which transport process requires energy?",
          options: [
            "Simple diffusion",
            "Osmosis",
            "Active transport",
            "Passive diffusion"
          ],
          answer: 2,
          explanation:
            "Active transport uses cellular energy to move substances against their concentration gradient."
        },
        {
          question: "What is homeostasis?",
          options: [
            "Destruction of cells",
            "Maintenance of a relatively stable internal environment",
            "Formation of tissues",
            "Production of antibodies only"
          ],
          answer: 1,
          explanation:
            "Homeostasis refers to maintaining relatively stable internal conditions."
        },
        {
          question: "A substance moving from high concentration to low concentration is demonstrating:",
          options: [
            "Active transport",
            "Diffusion",
            "Endocytosis",
            "Phagocytosis"
          ],
          answer: 1,
          explanation:
            "Diffusion moves particles down their concentration gradient."
        },
        {
          question: "Negative feedback generally:",
          options: [
            "Makes the original change stronger",
            "Reverses a change to restore balance",
            "Stops all cellular activity",
            "Destroys the cell membrane"
          ],
          answer: 1,
          explanation:
            "Negative feedback counteracts changes and helps return the body toward normal conditions."
        }
      ]
    },

    {
      title: "Module 7 — Tissues of the Human Body",
      explanation: `
        <p>A tissue is a group of similar cells that work together to perform a specific function.
        The body has four major tissue types.</p>

        <p><strong>Epithelial tissue</strong> covers body surfaces, lines cavities and forms
        glands. It provides protection and can also perform absorption and secretion.</p>

        <p><strong>Connective tissue</strong> supports, connects and protects body structures.
        Examples include bone, cartilage, blood, adipose tissue and tendons.</p>

        <p><strong>Muscle tissue</strong> produces movement. Skeletal muscle is generally
        voluntary, while cardiac and smooth muscles are involuntary.</p>

        <p><strong>Nervous tissue</strong> is specialized for communication and rapid transmission
        of electrical signals. It is found mainly in the brain, spinal cord and peripheral nerves.</p>
      `,
      clinicalApplication: `
        <p>Knowledge of tissue types helps nurses understand wounds, burns, pressure injuries,
        muscle damage, nerve injuries and healing.</p>
      `,
      keyPoints: [
        "Epithelial tissue covers and lines structures.",
        "Connective tissue supports and connects.",
        "Muscle tissue produces movement.",
        "Nervous tissue communicates through electrical signals.",
        "Blood is a connective tissue."
      ],
      examAlert:
        "Remember: epithelial protects and lines; connective supports; muscle moves; nervous communicates.",
      questions: [
        {
          question: "Which tissue type covers body surfaces?",
          options: [
            "Muscle",
            "Nervous",
            "Epithelial",
            "Connective"
          ],
          answer: 2,
          explanation:
            "Epithelial tissue covers surfaces and lines many internal structures."
        },
        {
          question: "Blood is classified as which type of tissue?",
          options: [
            "Muscle",
            "Connective",
            "Epithelial",
            "Nervous"
          ],
          answer: 1,
          explanation:
            "Blood is considered a specialized connective tissue."
        },
        {
          question: "Which tissue is primarily responsible for movement?",
          options: [
            "Muscle",
            "Epithelial",
            "Connective",
            "Nervous"
          ],
          answer: 0,
          explanation:
            "Muscle tissue contracts to produce movement."
        },
        {
          question: "Which tissue is specialized for rapid communication?",
          options: [
            "Epithelial",
            "Nervous",
            "Adipose",
            "Bone"
          ],
          answer: 1,
          explanation:
            "Nervous tissue transmits electrical signals and coordinates body activities."
        },
        {
          question: "Which is an example of connective tissue?",
          options: [
            "Bone",
            "Epidermis",
            "Neuron",
            "Skeletal muscle"
          ],
          answer: 0,
          explanation:
            "Bone is a specialized connective tissue."
        }
      ]
    },

    {
      title: "Module 8 — Skeletal System",
      explanation: `
        <p>The skeletal system provides support, protects internal organs, allows movement and
        stores minerals. It also contains bone marrow, which is involved in blood cell formation.</p>

        <p>The adult human skeleton normally contains approximately 206 bones. The skeleton can
        be divided into the <strong>axial skeleton</strong> and the <strong>appendicular
        skeleton</strong>.</p>

        <p>The axial skeleton includes the skull, vertebral column and thoracic cage. The
        appendicular skeleton includes the bones of the limbs and the structures that attach
        the limbs to the axial skeleton.</p>

        <p>Bones are living tissues. They contain blood vessels and undergo continuous remodeling.
        Calcium and phosphate are important minerals stored in bone.</p>

        <p>Joints are locations where bones meet. Joints provide different degrees of movement
        depending on their structure.</p>
      `,
      clinicalApplication: `
        <p>Nurses frequently care for patients with fractures, osteoporosis, arthritis,
        amputations and mobility problems. Understanding skeletal anatomy supports safe movement,
        positioning and assessment.</p>
      `,
      keyPoints: [
        "Skeleton provides support and protection.",
        "Bone marrow participates in blood cell production.",
        "Axial skeleton forms the central framework.",
        "Appendicular skeleton includes limbs and their attachments.",
        "Bones store minerals such as calcium and phosphate."
      ],
      examAlert:
        "The axial skeleton is the central skeleton; the appendicular skeleton consists mainly of the limbs and their supporting structures.",
      questions: [
        {
          question: "Which is a major function of the skeletal system?",
          options: [
            "Producing urine",
            "Supporting and protecting the body",
            "Digesting proteins",
            "Producing bile"
          ],
          answer: 1,
          explanation:
            "The skeleton provides support, protection and contributes to movement."
        },
        {
          question: "Which structure belongs to the axial skeleton?",
          options: [
            "Femur",
            "Humerus",
            "Vertebral column",
            "Radius"
          ],
          answer: 2,
          explanation:
            "The vertebral column is part of the axial skeleton."
        },
        {
          question: "Which mineral is strongly associated with bone storage?",
          options: [
            "Calcium",
            "Sodium only",
            "Chloride only",
            "Iodine"
          ],
          answer: 0,
          explanation:
            "Bone is an important storage site for calcium and phosphate."
        },
        {
          question: "Where does much blood cell formation occur?",
          options: [
            "Bone marrow",
            "Cartilage",
            "Tendons",
            "Ligaments"
          ],
          answer: 0,
          explanation:
            "Red bone marrow is an important site of blood cell production."
        },
        {
          question: "The femur is located in the:",
          options: [
            "Upper arm",
            "Forearm",
            "Thigh",
            "Lower leg"
          ],
          answer: 2,
          explanation:
            "The femur is the major bone of the thigh."
        }
      ]
    },

    {
      title: "Module 9 — Muscular System",
      explanation: `
        <p>The muscular system allows movement, maintains posture and contributes to heat
        production. Muscle tissue has the ability to contract.</p>

        <p>There are three major types of muscle: <strong>skeletal, cardiac and smooth muscle</strong>.</p>

        <p>Skeletal muscle is attached to bones and is generally under voluntary control.
        It allows activities such as walking, lifting and maintaining posture.</p>

        <p>Cardiac muscle is found in the heart. It contracts rhythmically and is involuntary.</p>

        <p>Smooth muscle is found in structures such as the intestines, blood vessels and urinary
        tract. It is generally involuntary.</p>

        <p>Muscle contraction requires energy. Skeletal muscle also works closely with the
        skeletal system to produce movement.</p>
      `,
      clinicalApplication: `
        <p>Muscle weakness, paralysis, muscle injury and reduced mobility can affect a patient's
        ability to perform activities of daily living. Nurses assess mobility and help prevent
        complications of immobility.</p>
      `,
      keyPoints: [
        "Skeletal muscle is generally voluntary.",
        "Cardiac muscle is involuntary and found in the heart.",
        "Smooth muscle is involuntary.",
        "Muscles produce movement and heat.",
        "Muscle activity requires energy."
      ],
      examAlert:
        "Cardiac muscle is found only in the heart and works involuntarily.",
      questions: [
        {
          question: "Which type of muscle is generally under voluntary control?",
          options: [
            "Cardiac",
            "Smooth",
            "Skeletal",
            "Visceral"
          ],
          answer: 2,
          explanation:
            "Skeletal muscle is generally controlled voluntarily."
        },
        {
          question: "Where is cardiac muscle found?",
          options: [
            "Stomach",
            "Heart",
            "Bones",
            "Skin"
          ],
          answer: 1,
          explanation:
            "Cardiac muscle forms the muscular wall of the heart."
        },
        {
          question: "Smooth muscle is commonly found in the:",
          options: [
            "Intestinal wall",
            "Biceps only",
            "Skull",
            "Bone marrow"
          ],
          answer: 0,
          explanation:
            "Smooth muscle is found in many hollow organs including the intestines."
        },
        {
          question: "Which is a function of muscle tissue?",
          options: [
            "Movement",
            "Producing urine",
            "Storing genetic information",
            "Filtering blood"
          ],
          answer: 0,
          explanation:
            "Muscle contraction produces movement and also contributes to posture and heat production."
        },
        {
          question: "Which muscle type is involuntary?",
          options: [
            "Cardiac",
            "Skeletal",
            "Voluntary skeletal",
            "None"
          ],
          answer: 0,
          explanation:
            "Cardiac muscle functions involuntarily."
        }
      ]
    },

    {
      title: "Module 10 — Cardiovascular System",
      explanation: `
        <p>The cardiovascular system consists mainly of the heart, blood and blood vessels.
        Its major functions include transporting oxygen, nutrients, hormones and waste products.</p>

        <p>The heart is a muscular organ located in the thoracic cavity. It has four chambers:
        the right atrium, right ventricle, left atrium and left ventricle.</p>

        <p>The right side of the heart receives deoxygenated blood from the body and pumps it
        toward the lungs. The left side receives oxygenated blood from the lungs and pumps it
        to the body.</p>

        <p>Blood vessels include arteries, veins and capillaries. Arteries generally carry blood
        away from the heart, while veins generally return blood toward the heart. Capillaries
        are small vessels where exchange occurs between blood and tissues.</p>

        <p>The cardiovascular system is essential for maintaining tissue oxygenation and
        transporting substances throughout the body.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess pulse, blood pressure, capillary refill, peripheral circulation,
        oxygenation and signs of shock. Cardiovascular knowledge is essential when caring for
        patients with hypertension, heart failure, myocardial infarction and circulatory problems.</p>
      `,
      keyPoints: [
        "Heart has four chambers.",
        "Right side pumps blood toward the lungs.",
        "Left side pumps oxygenated blood to the body.",
        "Arteries generally carry blood away from the heart.",
        "Veins generally return blood to the heart.",
        "Capillaries are major exchange sites."
      ],
      examAlert:
        "Remember: arteries carry blood AWAY from the heart; veins carry blood TOWARD the heart.",
      questions: [
        {
          question: "How many chambers does the human heart normally have?",
          options: [
            "Two",
            "Three",
            "Four",
            "Five"
          ],
          answer: 2,
          explanation:
            "The heart has four chambers: two atria and two ventricles."
        },
        {
          question: "Which chamber pumps oxygenated blood into systemic circulation?",
          options: [
            "Right atrium",
            "Right ventricle",
            "Left atrium",
            "Left ventricle"
          ],
          answer: 3,
          explanation:
            "The left ventricle pumps oxygenated blood into the systemic circulation."
        },
        {
          question: "Which blood vessels generally carry blood away from the heart?",
          options: [
            "Veins",
            "Arteries",
            "Capillaries",
            "Venules only"
          ],
          answer: 1,
          explanation:
            "Arteries generally carry blood away from the heart."
        },
        {
          question: "Where does much exchange between blood and tissues occur?",
          options: [
            "Capillaries",
            "Large arteries",
            "Large veins",
            "Heart valves"
          ],
          answer: 0,
          explanation:
            "Capillary walls allow exchange of gases, nutrients and waste products."
        },
        {
          question: "The right side of the heart primarily sends blood toward the:",
          options: [
            "Brain",
            "Kidneys",
            "Lungs",
            "Liver"
          ],
          answer: 2,
          explanation:
            "The right ventricle pumps deoxygenated blood to the lungs through the pulmonary circulation."
        }
      ]
    },

    {
      title: "Module 11 — Blood and Blood Components",
      explanation: `
        <p>Blood is a specialized connective tissue that circulates through the cardiovascular
        system. It consists of plasma and formed elements.</p>

        <p><strong>Plasma</strong> is the liquid portion of blood. It carries water, proteins,
        electrolytes, nutrients, hormones and waste products.</p>

        <p><strong>Red blood cells</strong> contain hemoglobin and transport oxygen. They also
        help transport carbon dioxide.</p>

        <p><strong>White blood cells</strong> participate in immune defense. Different types
        of white blood cells have specialized roles in protecting the body.</p>

        <p><strong>Platelets</strong> are cell fragments that play an important role in blood
        clotting.</p>

        <p>Blood groups are clinically important because incompatible transfusions can produce
        serious reactions.</p>
      `,
      clinicalApplication: `
        <p>Nurses monitor hemoglobin, hematocrit, white blood cell counts and platelet counts
        when assessing patients. Abnormal results may suggest anemia, infection, inflammation
        or bleeding risk.</p>
      `,
      keyPoints: [
        "Plasma is the liquid portion of blood.",
        "Red blood cells transport oxygen.",
        "Hemoglobin carries oxygen.",
        "White blood cells help defend against infection.",
        "Platelets contribute to clot formation."
      ],
      examAlert:
        "Platelets are essential for clotting, while red blood cells are primarily responsible for oxygen transport.",
      questions: [
        {
          question: "Which blood component primarily transports oxygen?",
          options: [
            "Platelets",
            "Red blood cells",
            "Plasma only",
            "White blood cells"
          ],
          answer: 1,
          explanation:
            "Red blood cells contain hemoglobin, which binds and transports oxygen."
        },
        {
          question: "What is the main role of platelets?",
          options: [
            "Oxygen transport",
            "Blood clotting",
            "Producing insulin",
            "Digesting food"
          ],
          answer: 1,
          explanation:
            "Platelets are important in the formation of blood clots."
        },
        {
          question: "Which blood component is most directly involved in immune defense?",
          options: [
            "White blood cells",
            "Red blood cells",
            "Platelets",
            "Hemoglobin"
          ],
          answer: 0,
          explanation:
            "White blood cells participate in immune responses."
        },
        {
          question: "What is plasma?",
          options: [
            "The liquid portion of blood",
            "A type of bone",
            "A heart valve",
            "A type of muscle"
          ],
          answer: 0,
          explanation:
            "Plasma is the liquid component in which blood cells and many dissolved substances are carried."
        },
        {
          question: "Which substance in red blood cells binds oxygen?",
          options: [
            "Insulin",
            "Hemoglobin",
            "Bile",
            "Keratin"
          ],
          answer: 1,
          explanation:
            "Hemoglobin is the oxygen-binding protein found inside red blood cells."
        }
      ]
    },

    {
      title: "Module 12 — Respiratory System",
      explanation: `
        <p>The respiratory system is responsible for bringing oxygen into the body and removing
        carbon dioxide. It includes the nose, nasal cavity, pharynx, larynx, trachea, bronchi,
        bronchioles and lungs.</p>

        <p>Air travels through the respiratory passages until it reaches the alveoli.
        <strong>Alveoli</strong> are tiny air sacs where gas exchange occurs between air and blood.</p>

        <p>Oxygen moves from the alveoli into the blood, while carbon dioxide moves from the
        blood into the alveoli to be exhaled.</p>

        <p>Ventilation refers to the movement of air into and out of the lungs. Breathing depends
        on coordinated action of respiratory muscles, especially the diaphragm.</p>

        <p>Respiration is closely linked to cardiovascular function because oxygen must be
        transported from the lungs to tissues.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess respiratory rate, depth, rhythm, oxygen saturation, breath sounds,
        work of breathing and signs of respiratory distress.</p>
      `,
      keyPoints: [
        "Respiratory system brings oxygen into the body.",
        "Carbon dioxide is removed through exhalation.",
        "Gas exchange occurs mainly in the alveoli.",
        "The diaphragm is an important muscle of breathing.",
        "Respiratory and cardiovascular systems work closely together."
      ],
      examAlert:
        "The alveoli are the primary sites of gas exchange.",
      questions: [
        {
          question: "Where does most gas exchange occur?",
          options: [
            "Trachea",
            "Bronchi",
            "Alveoli",
            "Nasal cavity"
          ],
          answer: 2,
          explanation:
            "Gas exchange between air and blood occurs mainly across the alveolar-capillary membrane."
        },
        {
          question: "Which gas is primarily taken into the body during inhalation?",
          options: [
            "Oxygen",
            "Carbon monoxide",
            "Nitrogen only",
            "Carbon dioxide"
          ],
          answer: 0,
          explanation:
            "Oxygen enters the body through inhalation and is then transported to tissues."
        },
        {
          question: "Which gas is removed from the body during exhalation?",
          options: [
            "Oxygen only",
            "Carbon dioxide",
            "Glucose",
            "Insulin"
          ],
          answer: 1,
          explanation:
            "Carbon dioxide produced by cellular metabolism is transported to the lungs and exhaled."
        },
        {
          question: "Which muscle is especially important for normal breathing?",
          options: [
            "Diaphragm",
            "Biceps",
            "Triceps",
            "Masseter"
          ],
          answer: 0,
          explanation:
            "The diaphragm contracts and relaxes to help produce normal ventilation."
        },
        {
          question: "Which assessment finding may indicate respiratory distress?",
          options: [
            "Normal breathing",
            "Increased work of breathing",
            "Normal oxygen saturation",
            "Relaxed posture"
          ],
          answer: 1,
          explanation:
            "Increased work of breathing can be a warning sign of respiratory difficulty."
        }
      ]
    },

    {
      title: "Module 13 — Digestive System",
      explanation: `
        <p>The digestive system breaks food into nutrients that can be absorbed and used by the
        body. It also eliminates undigested waste.</p>

        <p>The digestive tract includes the mouth, pharynx, esophagus, stomach, small intestine,
        large intestine, rectum and anus.</p>

        <p>Digestion begins in the mouth. The stomach mechanically and chemically processes food.
        Most nutrient absorption occurs in the small intestine.</p>

        <p>The large intestine absorbs water and contributes to formation of feces.</p>

        <p>Accessory organs include the liver, gallbladder and pancreas. The liver produces bile,
        the gallbladder stores bile, and the pancreas produces digestive enzymes and hormones
        such as insulin.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess nutritional status, bowel function, abdominal pain, vomiting, diarrhea,
        constipation and signs of gastrointestinal bleeding.</p>
      `,
      keyPoints: [
        "Digestion begins in the mouth.",
        "The stomach processes food.",
        "Most nutrient absorption occurs in the small intestine.",
        "The large intestine absorbs water.",
        "The liver produces bile.",
        "The gallbladder stores bile.",
        "The pancreas produces digestive enzymes and insulin."
      ],
      examAlert:
        "The small intestine is the major site of nutrient absorption.",
      questions: [
        {
          question: "Where does most nutrient absorption occur?",
          options: [
            "Stomach",
            "Small intestine",
            "Large intestine",
            "Esophagus"
          ],
          answer: 1,
          explanation:
            "Most nutrients are absorbed through the lining of the small intestine."
        },
        {
          question: "Which organ produces bile?",
          options: [
            "Gallbladder",
            "Liver",
            "Stomach",
            "Kidney"
          ],
          answer: 1,
          explanation:
            "The liver produces bile."
        },
        {
          question: "What is a major function of the large intestine?",
          options: [
            "Gas exchange",
            "Water absorption",
            "Pumping blood",
            "Producing urine"
          ],
          answer: 1,
          explanation:
            "The large intestine absorbs water and helps form feces."
        },
        {
          question: "Which organ stores bile?",
          options: [
            "Liver",
            "Gallbladder",
            "Pancreas",
            "Stomach"
          ],
          answer: 1,
          explanation:
            "The gallbladder stores and concentrates bile produced by the liver."
        },
        {
          question: "Which organ produces digestive enzymes and insulin?",
          options: [
            "Pancreas",
            "Spleen",
            "Kidney",
            "Lung"
          ],
          answer: 0,
          explanation:
            "The pancreas has both digestive and endocrine functions."
        }
      ]
    },

    {
      title: "Module 14 — Urinary System",
      explanation: `
        <p>The urinary system helps maintain fluid, electrolyte and acid-base balance while
        removing metabolic waste from the blood.</p>

        <p>The main organs are the kidneys, ureters, urinary bladder and urethra.</p>

        <p>The kidneys filter blood and produce urine. The functional unit of the kidney is the
        <strong>nephron</strong>.</p>

        <p>Urine travels from the kidneys through the ureters to the urinary bladder, where it
        is stored temporarily. It leaves the body through the urethra.</p>

        <p>The kidneys also contribute to regulation of blood pressure, red blood cell production
        and calcium balance through hormonal mechanisms.</p>
      `,
      clinicalApplication: `
        <p>Nurses monitor urine output, urine characteristics, hydration status, edema,
        electrolyte abnormalities and renal function in many patients.</p>
      `,
      keyPoints: [
        "Kidneys produce urine.",
        "Nephron is the functional unit of the kidney.",
        "Ureters carry urine to the bladder.",
        "Bladder stores urine.",
        "Urethra carries urine out of the body.",
        "Kidneys help regulate fluid and electrolyte balance."
      ],
      examAlert:
        "Urine pathway: kidneys → ureters → bladder → urethra.",
      questions: [
        {
          question: "What is the functional unit of the kidney?",
          options: [
            "Alveolus",
            "Neuron",
            "Nephron",
            "Osteon"
          ],
          answer: 2,
          explanation:
            "The nephron is the functional unit responsible for urine formation."
        },
        {
          question: "Which structures carry urine from the kidneys to the bladder?",
          options: [
            "Urethra",
            "Ureters",
            "Arteries",
            "Bronchi"
          ],
          answer: 1,
          explanation:
            "The ureters transport urine from each kidney to the bladder."
        },
        {
          question: "Where is urine stored before elimination?",
          options: [
            "Kidney",
            "Ureter",
            "Bladder",
            "Urethra"
          ],
          answer: 2,
          explanation:
            "The urinary bladder stores urine temporarily."
        },
        {
          question: "Which organ produces urine?",
          options: [
            "Liver",
            "Kidney",
            "Stomach",
            "Lung"
          ],
          answer: 1,
          explanation:
            "The kidneys filter blood and form urine."
        },
        {
          question: "A nurse is monitoring renal function. Which observation is especially important?",
          options: [
            "Urine output",
            "Hair length",
            "Nail color only",
            "Height"
          ],
          answer: 0,
          explanation:
            "Urine output is an important indicator of kidney function and fluid balance."
        }
      ]
    },

    {
      title: "Module 15 — Nervous System",
      explanation: `
        <p>The nervous system provides rapid communication and coordination throughout the body.
        It allows the body to detect changes, process information and respond appropriately.</p>

        <p>The nervous system is divided into the <strong>central nervous system (CNS)</strong>
        and <strong>peripheral nervous system (PNS)</strong>.</p>

        <p>The CNS consists of the brain and spinal cord. The PNS consists mainly of nerves
        connecting the CNS with the rest of the body.</p>

        <p>The basic functional cell of nervous tissue is the <strong>neuron</strong>. Neurons
        receive, process and transmit electrical signals.</p>

        <p>The nervous system contributes to movement, sensation, memory, thinking, reflexes,
        regulation of organs and communication with the environment.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess level of consciousness, pupils, sensation, movement, strength, reflexes,
        speech and orientation when performing neurological assessments.</p>
      `,
      keyPoints: [
        "CNS = brain and spinal cord.",
        "PNS connects the CNS with the rest of the body.",
        "Neurons transmit signals.",
        "The nervous system provides rapid communication.",
        "Neurological assessment is important in detecting changes in patient condition."
      ],
      examAlert:
        "CNS consists of the brain and spinal cord.",
      questions: [
        {
          question: "What structures make up the central nervous system?",
          options: [
            "Brain and spinal cord",
            "Only nerves",
            "Heart and brain",
            "Muscles and nerves"
          ],
          answer: 0,
          explanation:
            "The CNS consists of the brain and spinal cord."
        },
        {
          question: "What is the main functional cell of nervous tissue?",
          options: [
            "Neuron",
            "Platelet",
            "Osteocyte",
            "Erythrocyte"
          ],
          answer: 0,
          explanation:
            "Neurons are specialized to receive and transmit nervous signals."
        },
        {
          question: "Which is part of the CNS?",
          options: [
            "Spinal cord",
            "Femur",
            "Kidney",
            "Biceps"
          ],
          answer: 0,
          explanation:
            "The spinal cord is part of the central nervous system."
        },
        {
          question: "Which assessment is important in neurological nursing?",
          options: [
            "Level of consciousness",
            "Shoe size",
            "Hair length",
            "Height only"
          ],
          answer: 0,
          explanation:
            "Level of consciousness is an important component of neurological assessment."
        },
        {
          question: "The peripheral nervous system primarily:",
          options: [
            "Connects the CNS with the rest of the body",
            "Produces bile",
            "Filters blood",
            "Produces urine"
          ],
          answer: 0,
          explanation:
            "The PNS provides communication pathways between the CNS and peripheral structures."
        }
      ]
    },

    {
      title: "Module 16 — Endocrine System",
      explanation: `
        <p>The endocrine system regulates many body processes through hormones. Hormones are
        chemical messengers released by endocrine glands into the bloodstream.</p>

        <p>Important endocrine glands include the pituitary gland, thyroid gland, parathyroid
        glands, adrenal glands, pancreas, ovaries and testes.</p>

        <p>The pituitary gland is often called the 'master gland' because it influences several
        other endocrine glands, although its function itself is regulated by the hypothalamus
        and other feedback mechanisms.</p>

        <p>The thyroid gland produces hormones involved in regulation of metabolism. The
        parathyroid glands help regulate calcium levels.</p>

        <p>The adrenal glands produce hormones involved in stress responses, blood pressure and
        electrolyte regulation.</p>

        <p>The pancreas has both endocrine and digestive functions. Its endocrine portion
        produces hormones including insulin and glucagon.</p>
      `,
      clinicalApplication: `
        <p>Nurses encounter endocrine disorders such as diabetes mellitus, thyroid disorders,
        adrenal disorders and disturbances in calcium regulation.</p>
      `,
      keyPoints: [
        "Hormones are chemical messengers.",
        "Pituitary influences several endocrine functions.",
        "Thyroid hormones influence metabolism.",
        "Parathyroid hormones regulate calcium.",
        "Pancreatic insulin lowers blood glucose.",
        "Glucagon helps raise blood glucose."
      ],
      examAlert:
        "Insulin generally decreases blood glucose by promoting glucose uptake and storage.",
      questions: [
        {
          question: "What is a hormone?",
          options: [
            "A type of bone",
            "A chemical messenger",
            "A blood cell",
            "A digestive organ"
          ],
          answer: 1,
          explanation:
            "Hormones are chemical messengers released by endocrine tissues."
        },
        {
          question: "Which hormone generally lowers blood glucose?",
          options: [
            "Insulin",
            "Glucagon",
            "Adrenaline",
            "Thyroxine"
          ],
          answer: 0,
          explanation:
            "Insulin promotes glucose uptake and storage, generally lowering blood glucose."
        },
        {
          question: "Which gland is associated with regulation of metabolism?",
          options: [
            "Thyroid",
            "Sweat gland",
            "Salivary gland",
            "Sebaceous gland"
          ],
          answer: 0,
          explanation:
            "Thyroid hormones have major effects on metabolic activity."
        },
        {
          question: "Which hormone generally increases blood glucose?",
          options: [
            "Insulin",
            "Glucagon",
            "Melatonin",
            "Calcitonin"
          ],
          answer: 1,
          explanation:
            "Glucagon promotes processes that increase blood glucose."
        },
        {
          question: "Which organ has both endocrine and digestive functions?",
          options: [
            "Pancreas",
            "Kidney only",
            "Lung",
            "Spleen"
          ],
          answer: 0,
          explanation:
            "The pancreas produces digestive enzymes and endocrine hormones."
        }
      ]
    },

    {
      title: "Module 17 — Lymphatic and Immune System",
      explanation: `
        <p>The lymphatic and immune systems help defend the body against harmful organisms and
        abnormal cells. The lymphatic system also helps return excess tissue fluid to the blood.</p>

        <p>Lymph is a fluid that moves through lymphatic vessels. Lymph nodes filter lymph and
        contain immune cells.</p>

        <p>Important lymphatic structures include lymph nodes, spleen, thymus and tonsils.</p>

        <p>The immune system recognizes and responds to foreign substances called antigens.
        White blood cells such as lymphocytes play important roles in immune defense.</p>

        <p>Immunity may involve innate defenses that are present from birth and adaptive responses
        that develop after exposure to specific antigens.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess patients for signs of infection, inflammation, enlarged lymph nodes,
        fever and immune-related problems. Infection prevention practices are closely connected
        with immune protection.</p>
      `,
      keyPoints: [
        "Lymphatic system returns excess tissue fluid.",
        "Lymph nodes filter lymph.",
        "White blood cells participate in immune defense.",
        "Innate immunity is present from birth.",
        "Adaptive immunity develops specific responses."
      ],
      examAlert:
        "Lymph nodes are important sites for filtering lymph and housing immune cells.",
      questions: [
        {
          question: "What is one major function of the lymphatic system?",
          options: [
            "Return excess tissue fluid to circulation",
            "Produce urine",
            "Pump blood",
            "Digest food"
          ],
          answer: 0,
          explanation:
            "The lymphatic system helps return excess interstitial fluid to the bloodstream."
        },
        {
          question: "What do lymph nodes do?",
          options: [
            "Filter lymph",
            "Pump oxygenated blood",
            "Produce bile",
            "Store urine"
          ],
          answer: 0,
          explanation:
            "Lymph nodes filter lymph and contain immune cells."
        },
        {
          question: "Which cells are important in immune defense?",
          options: [
            "White blood cells",
            "Red blood cells only",
            "Platelets only",
            "Bone cells"
          ],
          answer: 0,
          explanation:
            "White blood cells perform many important immune functions."
        },
        {
          question: "Adaptive immunity is characterized by:",
          options: [
            "Specific immune responses",
            "Only skin protection",
            "No immune memory",
            "Absence of immune cells"
          ],
          answer: 0,
          explanation:
            "Adaptive immunity produces specific responses to particular antigens."
        },
        {
          question: "Which organ is part of the lymphatic system?",
          options: [
            "Spleen",
            "Stomach",
            "Femur",
            "Trachea"
          ],
          answer: 0,
          explanation:
            "The spleen is an important lymphatic and immune organ."
        }
      ]
    },

    {
      title: "Module 18 — Reproductive System",
      explanation: `
        <p>The reproductive system is responsible for reproduction and production of reproductive
        hormones and cells.</p>

        <p>The male reproductive system produces sperm and testosterone. Major structures include
        the testes, epididymis, vas deferens, prostate gland and penis.</p>

        <p>The female reproductive system produces ova and reproductive hormones. Major structures
        include the ovaries, fallopian tubes, uterus, cervix and vagina.</p>

        <p>The ovaries produce ova and hormones including estrogen and progesterone.</p>

        <p>The uterus is the organ where implantation and development of the fetus occur during
        pregnancy.</p>
      `,
      clinicalApplication: `
        <p>Knowledge of reproductive anatomy supports nursing care in reproductive health,
        antenatal care, childbirth, family planning and reproductive disorders.</p>
      `,
      keyPoints: [
        "Testes produce sperm and testosterone.",
        "Ovaries produce ova, estrogen and progesterone.",
        "Fallopian tubes connect the ovaries region with the uterus.",
        "The uterus supports fetal development during pregnancy.",
        "The cervix forms the lower portion of the uterus."
      ],
      examAlert:
        "The uterus is the primary site where the fetus develops during pregnancy.",
      questions: [
        {
          question: "Which organ produces sperm?",
          options: [
            "Ovary",
            "Testes",
            "Uterus",
            "Prostate"
          ],
          answer: 1,
          explanation:
            "The testes produce sperm and testosterone."
        },
        {
          question: "Which organ produces ova?",
          options: [
            "Ovaries",
            "Uterus",
            "Cervix",
            "Vagina"
          ],
          answer: 0,
          explanation:
            "The ovaries produce ova and reproductive hormones."
        },
        {
          question: "Where does fetal development normally occur?",
          options: [
            "Ovary",
            "Uterus",
            "Vagina",
            "Fallopian tube"
          ],
          answer: 1,
          explanation:
            "The fetus develops within the uterus during pregnancy."
        },
        {
          question: "Which hormones are produced by the ovaries?",
          options: [
            "Estrogen and progesterone",
            "Insulin and glucagon",
            "Adrenaline and cortisol",
            "Thyroxine and calcitonin"
          ],
          answer: 0,
          explanation:
            "The ovaries produce estrogen and progesterone among other hormones."
        },
        {
          question: "Which structure forms the lower part of the uterus?",
          options: [
            "Cervix",
            "Ovary",
            "Fallopian tube",
            "Endometrium only"
          ],
          answer: 0,
          explanation:
            "The cervix is the lower portion of the uterus and connects toward the vagina."
        }
      ]
    },

    {
      title: "Module 19 — Integumentary System",
      explanation: `
        <p>The integumentary system includes the skin, hair, nails and associated glands. The
        skin is the largest organ of the human body and performs several important functions.</p>

        <p>The skin provides protection against physical injury, microorganisms and excessive
        water loss. It also contributes to temperature regulation and sensation.</p>

        <p>The skin has major layers including the epidermis and dermis. Beneath the skin is
        subcutaneous tissue, which contains adipose tissue and other structures.</p>

        <p>Sweat glands contribute to temperature regulation. Sebaceous glands produce sebum,
        which helps lubricate the skin and hair.</p>
      `,
      clinicalApplication: `
        <p>Nurses assess skin color, temperature, moisture, integrity, wounds, pressure injuries,
        rashes and signs of infection. Skin assessment is an important part of routine nursing care.</p>
      `,
      keyPoints: [
        "Skin provides protection.",
        "Skin contributes to temperature regulation.",
        "Skin contains sensory receptors.",
        "Epidermis is the outer layer.",
        "Dermis contains important structures such as blood vessels and nerves."
      ],
      examAlert:
        "The skin is an important barrier against infection and fluid loss.",
      questions: [
        {
          question: "What is the largest organ of the human body?",
          options: [
            "Heart",
            "Skin",
            "Liver",
            "Lung"
          ],
          answer: 1,
          explanation:
            "The skin is generally considered the largest organ of the human body."
        },
        {
          question: "Which is a function of the skin?",
          options: [
            "Protection",
            "Pumping blood",
            "Producing urine",
            "Gas exchange in alveoli"
          ],
          answer: 0,
          explanation:
            "The skin protects the body from injury, pathogens and excessive fluid loss."
        },
        {
          question: "Which is the outermost major layer of skin?",
          options: [
            "Dermis",
            "Epidermis",
            "Subcutaneous tissue",
            "Muscle"
          ],
          answer: 1,
          explanation:
            "The epidermis forms the outer layer of the skin."
        },
        {
          question: "Sweat glands help with:",
          options: [
            "Temperature regulation",
            "Blood clotting",
            "Bone formation",
            "Urine formation"
          ],
          answer: 0,
          explanation:
            "Sweating helps the body lose heat and regulate temperature."
        },
        {
          question: "Why is skin assessment important in nursing?",
          options: [
            "It can help identify wounds and infection.",
            "It replaces all other assessments.",
            "It is only needed for cosmetic reasons.",
            "It has no clinical value."
          ],
          answer: 0,
          explanation:
            "Skin assessment can reveal pressure injuries, infection, dehydration and other clinical problems."
        }
      ]
    },

    {
      title: "Module 20 — Body Fluid and Electrolyte Balance",
      explanation: `
        <p>Water is essential for nearly every body process. Body fluid is distributed between
        intracellular and extracellular compartments.</p>

        <p><strong>Intracellular fluid</strong> is found inside cells. <strong>Extracellular
        fluid</strong> is found outside cells and includes interstitial fluid and blood plasma.</p>

        <p>Electrolytes are minerals that carry an electrical charge when dissolved in body fluids.
        Important electrolytes include sodium, potassium, calcium, magnesium and chloride.</p>

        <p>Sodium is an important extracellular electrolyte and plays a major role in fluid
        balance and nerve function. Potassium is particularly important for normal nerve and
        muscle function, including cardiac activity.</p>

        <p>The kidneys play an important role in maintaining fluid and electrolyte balance by
        regulating water and electrolyte excretion.</p>
      `,
      clinicalApplication: `
        <p>Nurses monitor intake and output, daily weight, edema, dehydration, electrolyte
        laboratory results and signs of fluid imbalance.</p>
      `,
      keyPoints: [
        "Intracellular fluid is inside cells.",
        "Extracellular fluid is outside cells.",
        "Sodium is a major extracellular electrolyte.",
        "Potassium is important for nerve, muscle and cardiac function.",
        "Kidneys help regulate fluid and electrolytes."
      ],
      examAlert:
        "Changes in potassium levels can have serious effects on cardiac function.",
      questions: [
        {
          question: "Where is intracellular fluid located?",
          options: [
            "Inside cells",
            "Only inside blood vessels",
            "Outside all cells",
            "Only in the lungs"
          ],
          answer: 0,
          explanation:
            "Intracellular fluid is the fluid contained within cells."
        },
        {
          question: "Which is a major extracellular electrolyte?",
          options: [
            "Sodium",
            "DNA",
            "Hemoglobin",
            "Insulin"
          ],
          answer: 0,
          explanation:
            "Sodium is the major cation in extracellular fluid."
        },
        {
          question: "Which electrolyte is especially important for cardiac electrical activity?",
          options: [
            "Potassium",
            "Keratin",
            "Bile",
            "Hemoglobin"
          ],
          answer: 0,
          explanation:
            "Potassium is essential for normal electrical activity of nerves and muscles, including the heart."
        },
        {
          question: "Which organ is especially important for regulating fluid balance?",
          options: [
            "Kidneys",
            "Lungs only",
            "Skin only",
            "Stomach"
          ],
          answer: 0,
          explanation:
            "The kidneys regulate water and electrolyte excretion and therefore play a major role in fluid balance."
        },
        {
          question: "Which nursing observation can help assess fluid status?",
          options: [
            "Daily weight",
            "Hair style",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Daily weight can provide useful information about changes in body fluid volume."
        }
      ]
    },

    {
      title: "Module 21 — Homeostasis and Integrated Body Systems",
      explanation: `
        <p>Homeostasis is one of the most important concepts in physiology. The human body
        continuously adjusts its internal environment to keep conditions within a range that
        supports normal cellular function.</p>

        <p>Examples include regulation of temperature, blood glucose, blood pressure, oxygen,
        carbon dioxide, fluid volume and blood pH.</p>

        <p>The nervous and endocrine systems are major coordinating systems. The nervous system
        produces rapid responses, while endocrine hormones often produce slower but longer-lasting
        effects.</p>

        <p>The cardiovascular system transports substances. The respiratory system exchanges
        gases. The kidneys regulate fluid and electrolyte balance. The digestive system provides
        nutrients. The liver processes substances and contributes to metabolism. These systems
        constantly cooperate.</p>

        <p>When one system fails, other systems may be affected. For example, severe respiratory
        failure can reduce oxygen delivery to tissues, eventually affecting the heart, brain,
        kidneys and other organs.</p>
      `,
      clinicalApplication: `
        <p>This integrated view is essential in nursing. A patient should not be assessed as
        a collection of isolated organs. Nurses consider how problems in one system may affect
        the entire patient.</p>
      `,
      keyPoints: [
        "Homeostasis keeps the internal environment relatively stable.",
        "Nervous and endocrine systems coordinate many functions.",
        "Body systems are interdependent.",
        "Failure of one system can affect other systems.",
        "Nursing assessment should consider the whole patient."
      ],
      examAlert:
        "Always think about how a change in one body system can affect other systems.",
      questions: [
        {
          question: "What is the main purpose of homeostasis?",
          options: [
            "To keep internal conditions relatively stable",
            "To stop all body changes",
            "To prevent all diseases",
            "To stop cellular metabolism"
          ],
          answer: 0,
          explanation:
            "Homeostasis maintains internal conditions within ranges that support normal function."
        },
        {
          question: "Which systems are major regulators and coordinators of body function?",
          options: [
            "Nervous and endocrine",
            "Digestive and skeletal only",
            "Urinary and integumentary only",
            "Muscular and skeletal only"
          ],
          answer: 0,
          explanation:
            "The nervous and endocrine systems coordinate many physiological activities."
        },
        {
          question: "What happens when body systems fail to work together effectively?",
          options: [
            "Only one organ is affected",
            "The entire body's function can be affected",
            "Nothing changes",
            "Homeostasis always improves"
          ],
          answer: 1,
          explanation:
            "Because body systems are interconnected, dysfunction in one system can affect many others."
        },
        {
          question: "Why should nurses understand integrated body systems?",
          options: [
            "Patients have completely independent organs.",
            "Changes in one system may affect other systems.",
            "Only doctors need this knowledge.",
            "It is unrelated to assessment."
          ],
          answer: 1,
          explanation:
            "Nursing care requires understanding how physiological systems interact."
        },
        {
          question: "Which statement best describes the human body?",
          options: [
            "A collection of independent organs",
            "An integrated system of interacting structures",
            "Only a group of cells",
            "A system controlled by one organ only"
          ],
          answer: 1,
          explanation:
            "The body is an integrated organism in which systems continuously interact."
        }
      ]
    },

    {
      title: "Module 22 — Clinical Anatomy & Physiology Revision",
      explanation: `
        <p>This final module brings together the major concepts covered throughout the course.
        Nursing students should be able to identify major organs, explain their functions and
        connect normal physiology with clinical assessment.</p>

        <p>When studying any body system, ask five questions:</p>

        <ol>
          <li>What structures make up the system?</li>
          <li>Where are those structures located?</li>
          <li>What does the system normally do?</li>
          <li>How does the system interact with other systems?</li>
          <li>What clinical signs might appear when the system is not functioning normally?</li>
        </ol>

        <p>For examinations, focus on structure-function relationships. For example, know that
        alveoli are specialized for gas exchange, nephrons form urine, the left ventricle pumps
        systemic blood, and the pancreas has both endocrine and digestive functions.</p>

        <p>Do not memorize isolated facts only. Try to understand the reason behind each function.
        Understanding makes it easier to answer application-based nursing questions.</p>
      `,
      clinicalApplication: `
        <p>During patient assessment, nurses constantly apply anatomy and physiology. Vital signs,
        neurological findings, respiratory findings, cardiovascular findings, urine output and
        nutritional status all provide information about physiological function.</p>
      `,
      keyPoints: [
        "Understand structure-function relationships.",
        "Know the major organs and their functions.",
        "Understand how systems interact.",
        "Connect physiology to clinical assessment.",
        "Use understanding rather than memorization alone."
      ],
      examAlert:
        "Application questions often test whether you can connect a patient's finding with the underlying body system.",
      questions: [
        {
          question: "Which structure is primarily responsible for gas exchange?",
          options: [
            "Alveoli",
            "Trachea",
            "Esophagus",
            "Ureter"
          ],
          answer: 0,
          explanation:
            "Alveoli provide the thin surface across which oxygen and carbon dioxide are exchanged."
        },
        {
          question: "Which structure is the functional unit of the kidney?",
          options: [
            "Neuron",
            "Nephron",
            "Alveolus",
            "Osteon"
          ],
          answer: 1,
          explanation:
            "The nephron is the functional unit of the kidney."
        },
        {
          question: "Which chamber pumps blood into systemic circulation?",
          options: [
            "Right atrium",
            "Right ventricle",
            "Left atrium",
            "Left ventricle"
          ],
          answer: 3,
          explanation:
            "The left ventricle pumps oxygenated blood into systemic circulation."
        },
        {
          question: "Which organ has both endocrine and digestive functions?",
          options: [
            "Pancreas",
            "Lung",
            "Heart",
            "Spleen"
          ],
          answer: 0,
          explanation:
            "The pancreas produces digestive enzymes and hormones including insulin and glucagon."
        },
        {
          question: "A nurse wants to assess neurological function. Which finding is especially useful?",
          options: [
            "Level of consciousness",
            "Shoe size",
            "Hair length",
            "Height"
          ],
          answer: 0,
          explanation:
            "Level of consciousness is an important indicator of neurological function."
        },
        {
          question: "Which system is primarily responsible for transporting oxygen from the lungs to tissues?",
          options: [
            "Cardiovascular system",
            "Digestive system",
            "Skeletal system",
            "Urinary system"
          ],
          answer: 0,
          explanation:
            "The respiratory system obtains oxygen, while the cardiovascular system transports it to tissues."
        },
        {
          question: "Which organ is primarily responsible for filtering blood and producing urine?",
          options: [
            "Kidney",
            "Liver",
            "Lung",
            "Stomach"
          ],
          answer: 0,
          explanation:
            "The kidneys filter blood and form urine."
        },
        {
          question: "Which system provides rapid communication throughout the body?",
          options: [
            "Nervous system",
            "Digestive system",
            "Skeletal system",
            "Urinary system"
          ],
          answer: 0,
          explanation:
            "The nervous system provides rapid electrical communication and coordination."
        },
        {
          question: "Which blood component is mainly responsible for clot formation?",
          options: [
            "Platelets",
            "Red blood cells",
            "Plasma only",
            "Neurons"
          ],
          answer: 0,
          explanation:
            "Platelets are important in the clotting process."
        },
        {
          question: "Which concept describes maintenance of a stable internal environment?",
          options: [
            "Homeostasis",
            "Diffusion",
            "Digestion",
            "Respiration"
          ],
          answer: 0,
          explanation:
            "Homeostasis is the maintenance of relatively stable internal conditions."
        }
      ]
    }

  ]
},
    // ========================================================
    // 2. MICROBIOLOGY
    // ========================================================

  "microbiology": {
  title: "Microbiology",
  description:
    "A comprehensive nursing-focused study of microorganisms, infection, immunity, laboratory principles, antimicrobial therapy and infection prevention.",

  lessons: [

    {
      title: "Module 1 — Introduction to Microbiology",
      explanation: `
        <p><strong>Microbiology</strong> is the scientific study of microorganisms. Microorganisms
        are living organisms or biological agents that are generally too small to be seen clearly
        without magnification.</p>

        <p>Microbiology is extremely important in nursing because microorganisms can cause infection,
        but many microorganisms are also harmless or beneficial. Nurses need to understand how
        microorganisms enter the body, multiply, spread and cause disease.</p>

        <p>The major groups studied in medical microbiology include <strong>bacteria, viruses,
        fungi and parasites</strong>. Some microorganisms normally live on or inside the human
        body without causing disease. These organisms are part of the body's normal microbiota.</p>

        <p>Microbiology also helps healthcare workers understand sterilization, disinfection,
        specimen collection, antimicrobial treatment and infection prevention.</p>
      `,
      clinicalApplication: `
        <p>Nurses apply microbiology when performing hand hygiene, collecting specimens, caring
        for wounds, administering antibiotics, preventing cross-infection and educating patients
        about infection prevention.</p>
      `,
      keyPoints: [
        "Microbiology studies microorganisms and related biological agents.",
        "Important groups include bacteria, viruses, fungi and parasites.",
        "Not every microorganism causes disease.",
        "Normal microbiota can live on or inside the body.",
        "Microbiology supports infection prevention and patient safety."
      ],
      examAlert:
        "Do not assume every microorganism is harmful. Some are harmless or beneficial.",
      questions: [
        {
          question: "What is microbiology?",
          options: [
            "The study of medications only",
            "The study of microorganisms",
            "The study of bones",
            "The study of nutrition only"
          ],
          answer: 1,
          explanation:
            "Microbiology is the scientific study of microorganisms and related biological agents."
        },
        {
          question: "Which is an important group studied in medical microbiology?",
          options: [
            "Bacteria",
            "Bones",
            "Muscles",
            "Joints"
          ],
          answer: 0,
          explanation:
            "Bacteria are one of the major groups studied in medical microbiology."
        },
        {
          question: "Are all microorganisms harmful?",
          options: [
            "Yes",
            "No",
            "Only bacteria are harmless",
            "Only fungi are harmless"
          ],
          answer: 1,
          explanation:
            "Many microorganisms are harmless or beneficial, while others can cause disease."
        },
        {
          question: "Why is microbiology important to nurses?",
          options: [
            "It helps prevent and control infection.",
            "It replaces patient assessment.",
            "It is only useful to laboratory scientists.",
            "It has no relationship with nursing."
          ],
          answer: 0,
          explanation:
            "Nurses use microbiology knowledge in infection prevention, specimen collection and patient care."
        },
        {
          question: "Which microorganism group includes organisms that require host cells for replication?",
          options: [
            "Viruses",
            "Bacteria",
            "Fungi",
            "Protozoa"
          ],
          answer: 0,
          explanation:
            "Viruses depend on host cells for replication."
        }
      ]
    },

    {
      title: "Module 2 — Classification and Naming of Microorganisms",
      explanation: `
        <p>Microorganisms can be classified according to their structure, genetic characteristics,
        metabolism and other biological features.</p>

        <p>Bacteria are prokaryotic cells. Fungi are eukaryotic organisms. Viruses are acellular
        infectious agents that contain genetic material surrounded by protein and sometimes a
        lipid envelope.</p>

        <p>Parasites include organisms such as protozoa and helminths. Their life cycles can
        involve humans, animals and environmental sources.</p>

        <p>Scientific naming allows microorganisms to be identified consistently. Bacterial names
        are commonly written using a genus and species format.</p>

        <p>Classification is important because different microorganisms require different methods
        of diagnosis, treatment and prevention.</p>
      `,
      clinicalApplication: `
        <p>Correct identification of an infectious organism helps healthcare professionals select
        appropriate treatment and infection-control measures.</p>
      `,
      keyPoints: [
        "Bacteria are prokaryotic.",
        "Fungi are eukaryotic.",
        "Viruses are acellular infectious agents.",
        "Parasites include protozoa and helminths.",
        "Identification helps guide treatment and prevention."
      ],
      examAlert:
        "A virus is not a typical cell. It requires a host cell for replication.",
      questions: [
        {
          question: "Bacteria are generally classified as:",
          options: [
            "Prokaryotes",
            "Multicellular animals",
            "Human tissues",
            "Viruses"
          ],
          answer: 0,
          explanation:
            "Bacteria are prokaryotic organisms."
        },
        {
          question: "Which group is eukaryotic?",
          options: [
            "Fungi",
            "Viruses",
            "Bacteria only",
            "Viroids only"
          ],
          answer: 0,
          explanation:
            "Fungi are eukaryotic organisms."
        },
        {
          question: "Why is microorganism identification important?",
          options: [
            "It can help guide appropriate treatment.",
            "It eliminates the need for hygiene.",
            "It makes all antibiotics unnecessary.",
            "It prevents every infection automatically."
          ],
          answer: 0,
          explanation:
            "Identifying the causative organism can help clinicians choose appropriate management."
        },
        {
          question: "Parasites can include:",
          options: [
            "Protozoa and helminths",
            "Only bacteria",
            "Only viruses",
            "Only fungi"
          ],
          answer: 0,
          explanation:
            "Protozoa and helminths are major categories of parasites."
        },
        {
          question: "Viruses depend on what for replication?",
          options: [
            "Host cells",
            "Bone marrow",
            "Red blood cells only",
            "Soil alone"
          ],
          answer: 0,
          explanation:
            "Viruses use host-cell machinery to replicate."
        }
      ]
    },

    {
      title: "Module 3 — Bacterial Structure",
      explanation: `
        <p>Bacteria have structures that allow them to survive, reproduce and interact with their
        environment. Important structures include the cell wall, cell membrane, cytoplasm,
        ribosomes and genetic material.</p>

        <p>Some bacteria possess <strong>capsules</strong> that can help protect them from host
        defenses. Some have <strong>flagella</strong> that assist movement.</p>

        <p><strong>Pili</strong> can help bacteria attach to surfaces and may participate in
        genetic exchange.</p>

        <p>The bacterial cell wall provides structural support. Gram staining is commonly used
        in clinical microbiology to classify bacteria based on differences in their cell walls.</p>

        <p>Understanding bacterial structure is useful because many antibiotics target specific
        bacterial structures or processes.</p>
      `,
      clinicalApplication: `
        <p>Understanding bacterial structure helps nurses appreciate why certain antibiotics
        work against particular organisms and why laboratory identification is important.</p>
      `,
      keyPoints: [
        "Bacteria have a cell membrane and genetic material.",
        "The cell wall provides structural support.",
        "Capsules can protect bacteria.",
        "Flagella can assist movement.",
        "Gram staining differentiates bacteria based on cell-wall characteristics."
      ],
      examAlert:
        "Gram-positive and Gram-negative bacteria differ in their cell-wall structures.",
      questions: [
        {
          question: "What provides structural support to many bacterial cells?",
          options: [
            "Cell wall",
            "Nucleus",
            "Lung",
            "Mitochondrion"
          ],
          answer: 0,
          explanation:
            "The bacterial cell wall provides structural support."
        },
        {
          question: "What structure may help some bacteria move?",
          options: [
            "Flagellum",
            "Ribosome",
            "Capsule only",
            "Cell membrane only"
          ],
          answer: 0,
          explanation:
            "Flagella can provide bacterial motility."
        },
        {
          question: "What is one purpose of Gram staining?",
          options: [
            "Differentiate bacteria based on cell-wall characteristics",
            "Measure blood pressure",
            "Measure blood glucose",
            "Identify bones"
          ],
          answer: 0,
          explanation:
            "Gram staining helps classify bacteria based on differences in cell-wall structure."
        },
        {
          question: "Which structure may help bacteria attach to surfaces?",
          options: [
            "Pili",
            "Alveoli",
            "Nephrons",
            "Platelets"
          ],
          answer: 0,
          explanation:
            "Pili can assist bacterial attachment and some forms of genetic exchange."
        },
        {
          question: "Why is bacterial structure clinically important?",
          options: [
            "Some treatments target bacterial structures or processes.",
            "It has no effect on treatment.",
            "It prevents every infection.",
            "It replaces laboratory testing."
          ],
          answer: 0,
          explanation:
            "Several antimicrobial agents act against specific bacterial structures or functions."
        }
      ]
    },

    {
      title: "Module 4 — Bacterial Growth and Reproduction",
      explanation: `
        <p>Many bacteria reproduce through <strong>binary fission</strong>. During this process,
        one bacterial cell grows and divides to produce two daughter cells.</p>

        <p>Bacterial growth is affected by temperature, nutrients, moisture, oxygen availability
        and pH.</p>

        <p>Some bacteria require oxygen, while others grow without oxygen. Some can survive under
        different oxygen conditions.</p>

        <p>Bacteria can form populations that grow rapidly under favorable conditions. This is why
        proper food storage, environmental cleaning and infection-control practices are important.</p>

        <p>Some bacteria can form resistant structures called <strong>endospores</strong>.
        Endospores can survive harsh environmental conditions and may require special methods
        for destruction.</p>
      `,
      clinicalApplication: `
        <p>Understanding bacterial growth helps nurses understand why contaminated equipment,
        poor hand hygiene and inappropriate storage conditions can increase infection risk.</p>
      `,
      keyPoints: [
        "Binary fission is a common bacterial reproduction method.",
        "Temperature affects bacterial growth.",
        "Nutrients and moisture affect growth.",
        "Oxygen requirements differ among bacteria.",
        "Some bacteria form endospores."
      ],
      examAlert:
        "Endospores are highly resistant structures and require effective sterilization methods.",
      questions: [
        {
          question: "How do many bacteria reproduce?",
          options: [
            "Binary fission",
            "Pregnancy",
            "Budding only",
            "Photosynthesis"
          ],
          answer: 0,
          explanation:
            "Binary fission is a common form of bacterial reproduction."
        },
        {
          question: "Which factor can affect bacterial growth?",
          options: [
            "Temperature",
            "Hair color",
            "Height",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Temperature is an important factor influencing microbial growth."
        },
        {
          question: "What is an endospore?",
          options: [
            "A resistant bacterial structure",
            "A human red blood cell",
            "A type of antibody",
            "A blood clot"
          ],
          answer: 0,
          explanation:
            "Some bacteria produce resistant structures called endospores."
        },
        {
          question: "Why is bacterial growth important in infection control?",
          options: [
            "Rapid growth can increase contamination and infection risk.",
            "Growth has no clinical significance.",
            "Growth eliminates bacteria.",
            "Growth prevents transmission."
          ],
          answer: 0,
          explanation:
            "Favorable conditions can allow bacteria to multiply and increase the risk of infection."
        },
        {
          question: "Which environmental factor can influence bacterial growth?",
          options: [
            "Moisture",
            "Eye color",
            "Height",
            "Blood type"
          ],
          answer: 0,
          explanation:
            "Moisture is one of several environmental factors that influence bacterial growth."
        }
      ]
    },

    {
      title: "Module 5 — Viruses",
      explanation: `
        <p>Viruses are infectious agents composed of genetic material surrounded by a protein
        structure called a <strong>capsid</strong>. Some viruses also have a lipid envelope.</p>

        <p>Unlike bacteria, viruses do not independently reproduce in the same way living cells do.
        They enter host cells and use host-cell machinery to make new viral components.</p>

        <p>Viral infections include influenza, measles, hepatitis, HIV infection and many others.</p>

        <p>Some viral diseases can be prevented through vaccination. Other measures include hand
        hygiene, respiratory hygiene, safe injection practices, appropriate use of personal
        protective equipment and isolation when indicated.</p>

        <p>Antibiotics do not treat viral infections because antibiotics target bacterial
        structures or processes.</p>
      `,
      clinicalApplication: `
        <p>Nurses play important roles in vaccination, isolation precautions, patient education,
        symptom monitoring and prevention of viral transmission.</p>
      `,
      keyPoints: [
        "Viruses contain genetic material.",
        "A capsid surrounds viral genetic material.",
        "Some viruses have an envelope.",
        "Viruses depend on host cells for replication.",
        "Antibiotics do not treat viral infections."
      ],
      examAlert:
        "Do not automatically give antibiotics for a viral infection. Antibiotics act against bacteria, not viruses.",
      questions: [
        {
          question: "What do viruses require for replication?",
          options: [
            "Host cells",
            "Only water",
            "Only oxygen",
            "Bone tissue"
          ],
          answer: 0,
          explanation:
            "Viruses depend on host cells for replication."
        },
        {
          question: "Which structure surrounds viral genetic material?",
          options: [
            "Capsid",
            "Nephron",
            "Alveolus",
            "Platelet"
          ],
          answer: 0,
          explanation:
            "The capsid is the protein structure surrounding viral genetic material."
        },
        {
          question: "Do antibiotics normally treat viral infections?",
          options: [
            "Yes",
            "No",
            "Only all respiratory viruses",
            "Only HIV"
          ],
          answer: 1,
          explanation:
            "Antibiotics target bacteria and are not used to treat viral infections themselves."
        },
        {
          question: "Which is an important method of preventing some viral diseases?",
          options: [
            "Vaccination",
            "Avoiding all water",
            "Using antibiotics continuously",
            "Skipping hand hygiene"
          ],
          answer: 0,
          explanation:
            "Vaccination can provide protection against several viral diseases."
        },
        {
          question: "Some viruses possess a:",
          options: [
            "Lipid envelope",
            "Bone marrow",
            "Nephron",
            "Joint capsule"
          ],
          answer: 0,
          explanation:
            "Some viruses have a lipid envelope surrounding the capsid."
        }
      ]
    },

    {
      title: "Module 6 — Fungi",
      explanation: `
        <p>Fungi are eukaryotic organisms. They include yeasts and molds. Some fungi are useful
        in food production and medicine, while others can cause human disease.</p>

        <p><strong>Candida</strong> is an important yeast that can cause infections, particularly
        when normal defenses are disrupted.</p>

        <p>Fungal infections can affect the skin, nails, mouth, genital tract or internal organs
        depending on the organism and the patient's condition.</p>

        <p>Risk factors for serious fungal infections can include weakened immunity, prolonged
        antibiotic exposure and certain medical conditions.</p>

        <p>Antifungal medications are used to treat fungal infections. Treatment depends on the
        type and location of infection.</p>
      `,
      clinicalApplication: `
        <p>Nurses should recognize possible fungal infections and understand that unnecessary
        antibiotic use can disrupt normal microbiota and contribute to some fungal overgrowth.</p>
      `,
      keyPoints: [
        "Fungi are eukaryotic organisms.",
        "Yeasts and molds are types of fungi.",
        "Candida can cause human infection.",
        "Some fungal infections affect skin and mucous membranes.",
        "Antifungal drugs are used for fungal infections."
      ],
      examAlert:
        "Fungal infections require antifungal therapy rather than antibacterial antibiotics.",
      questions: [
        {
          question: "Fungi are:",
          options: [
            "Eukaryotic organisms",
            "Always viruses",
            "Always bacteria",
            "Human tissues"
          ],
          answer: 0,
          explanation:
            "Fungi are eukaryotic organisms."
        },
        {
          question: "Which is an example of a yeast that can cause infection?",
          options: [
            "Candida",
            "Plasmodium",
            "Influenza virus",
            "E. coli only"
          ],
          answer: 0,
          explanation:
            "Candida is a yeast that can cause infections."
        },
        {
          question: "Which type of medication is used against fungal infections?",
          options: [
            "Antifungal medication",
            "Antacid",
            "Anticoagulant",
            "Bronchodilator"
          ],
          answer: 0,
          explanation:
            "Antifungal agents are used to treat fungal infections."
        },
        {
          question: "Which can increase the risk of some fungal infections?",
          options: [
            "Weakened immunity",
            "Normal immunity only",
            "Good hygiene only",
            "Adequate nutrition only"
          ],
          answer: 0,
          explanation:
            "Immunosuppression can increase susceptibility to certain fungal infections."
        },
        {
          question: "Why can prolonged antibiotic use contribute to some fungal infections?",
          options: [
            "It can disrupt normal bacterial microbiota.",
            "It always kills fungi directly.",
            "It increases bone growth.",
            "It prevents all microorganisms."
          ],
          answer: 0,
          explanation:
            "Antibiotics can disrupt normal bacterial flora, allowing some fungi to overgrow."
        }
      ]
    },

    {
      title: "Module 7 — Parasites",
      explanation: `
        <p>Parasites are organisms that live in or on a host and obtain nutrients or other
        benefits at the host's expense.</p>

        <p>Important human parasites include protozoa and helminths. Some parasites are transmitted
        through contaminated food or water, while others are transmitted through vectors such as
        mosquitoes.</p>

        <p><strong>Malaria</strong> is caused by Plasmodium parasites and is transmitted through
        the bites of infected female Anopheles mosquitoes.</p>

        <p>Parasitic diseases can cause fever, anemia, gastrointestinal symptoms, malnutrition
        and other complications depending on the organism.</p>

        <p>Prevention may involve safe water, food hygiene, sanitation, vector control and
        appropriate personal protective measures.</p>
      `,
      clinicalApplication: `
        <p>Nurses provide education about sanitation, safe water, mosquito prevention,
        medication adherence and recognition of complications of parasitic diseases.</p>
      `,
      keyPoints: [
        "Parasites depend on hosts.",
        "Protozoa and helminths are major parasite groups.",
        "Malaria is caused by Plasmodium.",
        "Anopheles mosquitoes transmit malaria.",
        "Sanitation and vector control help prevent parasitic diseases."
      ],
      examAlert:
        "Malaria is caused by Plasmodium parasites and transmitted by infected female Anopheles mosquitoes.",
      questions: [
        {
          question: "Malaria is caused by:",
          options: [
            "Plasmodium parasites",
            "Influenza virus",
            "Candida",
            "Staphylococcus only"
          ],
          answer: 0,
          explanation:
            "Malaria is caused by parasites of the genus Plasmodium."
        },
        {
          question: "Which mosquito transmits malaria?",
          options: [
            "Female Anopheles mosquito",
            "Housefly",
            "Tick only",
            "Flea only"
          ],
          answer: 0,
          explanation:
            "Human malaria is transmitted by infected female Anopheles mosquitoes."
        },
        {
          question: "Which is a major group of parasites?",
          options: [
            "Helminths",
            "Platelets",
            "Neurons",
            "Alveoli"
          ],
          answer: 0,
          explanation:
            "Helminths are parasitic worms."
        },
        {
          question: "Which can help prevent many parasitic infections?",
          options: [
            "Safe water and sanitation",
            "Poor food hygiene",
            "Avoiding all treatment",
            "Sharing needles"
          ],
          answer: 0,
          explanation:
            "Safe water, sanitation and food hygiene reduce exposure to many parasites."
        },
        {
          question: "Parasites generally:",
          options: [
            "Depend on a host",
            "Always live independently",
            "Are always bacteria",
            "Are human cells"
          ],
          answer: 0,
          explanation:
            "Parasites live in or on hosts and obtain resources from them."
        }
      ]
    },

    {
      title: "Module 8 — Normal Microbiota",
      explanation: `
        <p>The human body normally carries microorganisms on the skin, in the mouth, intestines
        and other body sites. These microorganisms are collectively referred to as normal
        microbiota.</p>

        <p>Normal microbiota can compete with harmful organisms and contribute to certain
        physiological processes. However, an organism that is harmless in one location may cause
        disease if it enters a normally sterile body site.</p>

        <p>For example, bacteria that normally live in the intestine can cause serious infection
        if they enter the urinary tract, bloodstream or another inappropriate location.</p>

        <p>Changes in microbiota can occur after antibiotics, illness, changes in diet or other
        factors.</p>
      `,
      clinicalApplication: `
        <p>Nurses should understand that infection prevention is not about eliminating every
        microorganism. It is about preventing harmful transmission and protecting vulnerable
        body sites and patients.</p>
      `,
      keyPoints: [
        "Normal microbiota live naturally on and inside the body.",
        "Some microbiota can protect against pathogens.",
        "Location matters when determining whether an organism causes disease.",
        "Antibiotics can alter normal microbiota.",
        "Not every microorganism found on a patient indicates infection."
      ],
      examAlert:
        "Colonization does not always mean infection.",
      questions: [
        {
          question: "What is normal microbiota?",
          options: [
            "Microorganisms normally living on or in the body",
            "Only disease-causing bacteria",
            "Only viruses",
            "Only parasites"
          ],
          answer: 0,
          explanation:
            "Normal microbiota are microorganisms that normally inhabit body sites."
        },
        {
          question: "Can normal microbiota ever cause disease?",
          options: [
            "Yes, especially if they enter inappropriate body sites.",
            "Never",
            "Only viruses can",
            "Only fungi can"
          ],
          answer: 0,
          explanation:
            "Normally harmless organisms can cause disease if they enter normally sterile sites or the patient's defenses are impaired."
        },
        {
          question: "What can alter normal microbiota?",
          options: [
            "Antibiotic use",
            "Only exercise",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Antibiotics can significantly alter normal microbial communities."
        },
        {
          question: "Colonization means:",
          options: [
            "Presence of microorganisms without necessarily causing disease",
            "Always severe infection",
            "Death of the patient",
            "Complete absence of microbes"
          ],
          answer: 0,
          explanation:
            "Colonization refers to microorganisms being present without necessarily producing disease."
        },
        {
          question: "Why is body location important?",
          options: [
            "An organism harmless in one location may cause disease in another.",
            "Location never matters.",
            "All body sites contain the same organisms.",
            "Only skin matters."
          ],
          answer: 0,
          explanation:
            "Microorganisms can cause disease when they enter sites where they are not normally found."
        }
      ]
    },

    {
      title: "Module 9 — Infection and Disease",
      explanation: `
        <p>An <strong>infection</strong> occurs when microorganisms enter the body and establish
        themselves in a way that can result in an interaction with the host.</p>

        <p>Infection does not always produce symptoms. When an infectious organism causes tissue
        damage and clinical manifestations, the patient may develop an infectious disease.</p>

        <p>The body's response to infection may include inflammation, fever and activation of
        immune defenses.</p>

        <p>Signs of infection can include redness, warmth, swelling, pain, purulent drainage,
        fever and changes in laboratory findings, depending on the condition.</p>
      `,
      clinicalApplication: `
        <p>Nurses monitor patients for changes that may indicate infection and report significant
        findings promptly.</p>
      `,
      keyPoints: [
        "Infection involves interaction between microorganisms and the host.",
        "Infection does not always produce symptoms.",
        "Inflammation is an important response to injury and infection.",
        "Fever may occur during infection.",
        "Early recognition is important in patient care."
      ],
      examAlert:
        "A patient can have an infection without obvious symptoms, especially if immunocompromised.",
      questions: [
        {
          question: "Does every infection cause obvious symptoms?",
          options: [
            "Yes",
            "No",
            "Only bacterial infections",
            "Only fungal infections"
          ],
          answer: 1,
          explanation:
            "Some infections may be asymptomatic, particularly in certain patients."
        },
        {
          question: "Which is a possible sign of local infection?",
          options: [
            "Redness and warmth",
            "Normal skin",
            "Normal temperature only",
            "Improved wound healing"
          ],
          answer: 0,
          explanation:
            "Redness and warmth can be signs of inflammation or infection."
        },
        {
          question: "Fever can occur as part of:",
          options: [
            "The body's response to infection",
            "Normal bone growth only",
            "Hair growth",
            "Nail formation"
          ],
          answer: 0,
          explanation:
            "Fever can occur as part of the body's response to infection."
        },
        {
          question: "Why should nurses recognize infection early?",
          options: [
            "Early recognition can support timely treatment.",
            "It has no effect on outcomes.",
            "It eliminates the need for treatment.",
            "It prevents all disease."
          ],
          answer: 0,
          explanation:
            "Prompt recognition allows appropriate assessment, reporting and management."
        },
        {
          question: "Which finding may indicate infection at a wound?",
          options: [
            "Purulent drainage",
            "Normal healing",
            "Intact clean skin only",
            "No inflammation"
          ],
          answer: 0,
          explanation:
            "Purulent drainage can indicate infection and should be assessed appropriately."
        }
      ]
    },

    {
      title: "Module 10 — Chain of Infection",
      explanation: `
        <p>The <strong>chain of infection</strong> describes how infectious organisms move from
        a source to a susceptible person.</p>

        <p>The six links are commonly described as the infectious agent, reservoir, portal of
        exit, mode of transmission, portal of entry and susceptible host.</p>

        <p>Breaking any link can reduce transmission. Hand hygiene, appropriate personal protective
        equipment, cleaning and disinfection, safe injection practices and respiratory hygiene
        are examples of measures that can break the chain.</p>

        <p>Understanding the chain helps nurses identify where infection-control interventions
        should be applied.</p>
      `,
      clinicalApplication: `
        <p>For example, covering a cough can reduce the release of respiratory droplets, while
        hand hygiene can reduce transfer of microorganisms between patients and surfaces.</p>
      `,
      keyPoints: [
        "The chain has six major links.",
        "Infectious agent is the microorganism capable of causing disease.",
        "Reservoir is where the organism lives or multiplies.",
        "Portal of exit allows the organism to leave.",
        "Mode of transmission describes how it spreads.",
        "Portal of entry allows it to enter another host.",
        "Susceptible host can develop infection."
      ],
      examAlert:
        "Breaking any link in the chain can help prevent infection.",
      questions: [
        {
          question: "Which is one link in the chain of infection?",
          options: [
            "Reservoir",
            "Blood pressure",
            "Heart rate",
            "Digestion"
          ],
          answer: 0,
          explanation:
            "Reservoir is one of the six links in the chain of infection."
        },
        {
          question: "What is a reservoir?",
          options: [
            "A place where an infectious organism lives or multiplies",
            "A type of medication",
            "A blood cell",
            "A body plane"
          ],
          answer: 0,
          explanation:
            "A reservoir is a source or environment where an infectious agent can live and multiply."
        },
        {
          question: "Hand hygiene can break which part of infection transmission?",
          options: [
            "It can interrupt transmission between people and surfaces.",
            "It creates pathogens.",
            "It increases susceptibility.",
            "It produces antibiotics."
          ],
          answer: 0,
          explanation:
            "Hand hygiene reduces transfer of microorganisms and therefore interrupts transmission."
        },
        {
          question: "What is the portal of entry?",
          options: [
            "The route through which an organism enters a new host",
            "The place where blood is produced",
            "The location of the heart",
            "A type of antibody"
          ],
          answer: 0,
          explanation:
            "A portal of entry is the route through which an infectious agent enters a susceptible host."
        },
        {
          question: "What is an effective general strategy for preventing infection?",
          options: [
            "Break one or more links in the chain.",
            "Ignore hygiene.",
            "Share needles.",
            "Avoid cleaning equipment."
          ],
          answer: 0,
          explanation:
            "Infection prevention works by interrupting one or more links in the chain."
        }
      ]
    },

    {
      title: "Module 11 — Modes of Transmission",
      explanation: `
        <p>Microorganisms can spread through different routes. Common modes include direct
        contact, indirect contact, droplet transmission, airborne transmission, vehicle
        transmission and vector transmission.</p>

        <p><strong>Direct contact</strong> occurs through physical contact between an infected or
        colonized person and another person.</p>

        <p><strong>Indirect contact</strong> involves contaminated objects or surfaces.</p>

        <p><strong>Droplet transmission</strong> involves respiratory droplets generated during
        activities such as coughing, sneezing or talking.</p>

        <p><strong>Vector transmission</strong> occurs through organisms such as mosquitoes and
        ticks that carry infectious agents.</p>
      `,
      clinicalApplication: `
        <p>Nurses select precautions according to the suspected mode of transmission and the
        clinical condition of the patient.</p>
      `,
      keyPoints: [
        "Transmission can occur through several routes.",
        "Direct contact involves person-to-person contact.",
        "Indirect contact involves contaminated objects.",
        "Droplets can transmit some respiratory infections.",
        "Vectors include mosquitoes and ticks."
      ],
      examAlert:
        "The route of transmission determines which infection-control measures are appropriate.",
      questions: [
        {
          question: "Transmission through a contaminated object is called:",
          options: [
            "Indirect contact transmission",
            "Direct contact only",
            "Genetic transmission",
            "Hormonal transmission"
          ],
          answer: 0,
          explanation:
            "Indirect contact involves contaminated objects or surfaces."
        },
        {
          question: "Mosquitoes can act as:",
          options: [
            "Vectors",
            "Antibodies",
            "Antibiotics",
            "Platelets"
          ],
          answer: 0,
          explanation:
            "Mosquitoes can transmit infectious agents and therefore act as vectors."
        },
        {
          question: "Droplet transmission can occur through:",
          options: [
            "Respiratory droplets",
            "Bone fractures",
            "Urine production",
            "Blood cell formation"
          ],
          answer: 0,
          explanation:
            "Respiratory droplets can transmit certain infectious organisms."
        },
        {
          question: "Why is the mode of transmission important?",
          options: [
            "It helps determine appropriate infection-control precautions.",
            "It has no relevance.",
            "It identifies blood type.",
            "It replaces diagnosis."
          ],
          answer: 0,
          explanation:
            "Knowing how an organism spreads helps healthcare workers choose appropriate precautions."
        },
        {
          question: "Direct contact transmission involves:",
          options: [
            "Physical contact between people",
            "Only contaminated water",
            "Only mosquitoes",
            "Only food"
          ],
          answer: 0,
          explanation:
            "Direct contact occurs through physical contact between individuals."
        }
      ]
    },

    {
      title: "Module 12 — Specimen Collection and Laboratory Diagnosis",
      explanation: `
        <p>Microbiological diagnosis often depends on collecting an appropriate specimen and
        transporting it correctly to the laboratory.</p>

        <p>Examples of specimens include blood, urine, sputum, stool, wound swabs and other
        body fluids.</p>

        <p>The specimen should be collected using the correct technique, placed in the appropriate
        container, labeled accurately and transported according to laboratory requirements.</p>

        <p>Whenever possible, specimens should be collected before antimicrobial therapy is started,
        when clinically appropriate, because treatment can reduce the number of organisms and
        affect test results.</p>

        <p>Incorrect collection can produce contamination and misleading results.</p>
      `,
      clinicalApplication: `
        <p>Nurses frequently collect urine, blood, wound and respiratory specimens. Correct
        technique is essential for reliable laboratory results.</p>
      `,
      keyPoints: [
        "Use the correct specimen for the suspected infection.",
        "Use the correct collection technique.",
        "Label specimens accurately.",
        "Transport specimens correctly.",
        "Collect before antimicrobial therapy when appropriate.",
        "Avoid contamination."
      ],
      examAlert:
        "Poor specimen collection can produce inaccurate laboratory results.",
      questions: [
        {
          question: "Why is proper specimen collection important?",
          options: [
            "It improves the reliability of laboratory results.",
            "It makes contamination more likely.",
            "It eliminates the need for treatment.",
            "It prevents every infection."
          ],
          answer: 0,
          explanation:
            "Correct collection helps ensure that laboratory results accurately represent the patient's condition."
        },
        {
          question: "A specimen should be:",
          options: [
            "Correctly labeled",
            "Left unlabeled",
            "Placed in any container",
            "Mixed with unrelated specimens"
          ],
          answer: 0,
          explanation:
            "Accurate labeling is essential for patient safety and laboratory processing."
        },
        {
          question: "When clinically appropriate, cultures are often collected before antibiotics because:",
          options: [
            "Antibiotics may reduce detectable organisms.",
            "Antibiotics increase bacterial growth.",
            "Antibiotics create new organisms.",
            "Antibiotics have no effect."
          ],
          answer: 0,
          explanation:
            "Antimicrobial treatment can reduce the number of organisms and potentially affect culture results."
        },
        {
          question: "What can contamination of a specimen cause?",
          options: [
            "Misleading laboratory results",
            "Perfect diagnosis",
            "Guaranteed cure",
            "Improved immunity"
          ],
          answer: 0,
          explanation:
            "Contamination can introduce organisms that are not actually causing the patient's infection."
        },
        {
          question: "Which is an example of a microbiological specimen?",
          options: [
            "Urine",
            "Hair style",
            "Height",
            "Blood pressure"
          ],
          answer: 0,
          explanation:
            "Urine can be collected and tested for microorganisms and other abnormalities."
        }
      ]
    },

    {
      title: "Module 13 — Sterilization",
      explanation: `
        <p><strong>Sterilization</strong> is a process that destroys or eliminates all forms of
        microbial life, including bacterial spores.</p>

        <p>One common method is steam sterilization under pressure using an autoclave. Other
        sterilization methods can include dry heat, certain chemicals and specialized physical
        methods depending on the equipment.</p>

        <p>The appropriate method depends on the material being sterilized. Heat-sensitive
        equipment may require alternative methods.</p>

        <p>Effective sterilization requires appropriate time, temperature, pressure or other
        validated parameters depending on the method.</p>
      `,
      clinicalApplication: `
        <p>Sterilization is critical for instruments and equipment that must be free of viable
        microorganisms before use in invasive procedures.</p>
      `,
      keyPoints: [
        "Sterilization aims to eliminate all forms of microbial life.",
        "Bacterial spores are included.",
        "Autoclaving uses pressurized steam.",
        "The method depends on the equipment.",
        "Correct parameters are essential."
      ],
      examAlert:
        "Sterilization is different from disinfection because sterilization aims to eliminate all microbial life.",
      questions: [
        {
          question: "What does sterilization aim to achieve?",
          options: [
            "Eliminate all forms of microbial life",
            "Remove only visible dirt",
            "Kill only viruses",
            "Reduce microorganisms without a defined endpoint"
          ],
          answer: 0,
          explanation:
            "Sterilization is intended to eliminate all forms of microbial life, including spores."
        },
        {
          question: "Which method uses pressurized steam?",
          options: [
            "Autoclaving",
            "Hand washing",
            "Dry wiping",
            "Refrigeration"
          ],
          answer: 0,
          explanation:
            "An autoclave uses pressurized steam to sterilize appropriate equipment."
        },
        {
          question: "Are bacterial spores included in the goal of sterilization?",
          options: [
            "Yes",
            "No",
            "Only viruses",
            "Only fungi"
          ],
          answer: 0,
          explanation:
            "Sterilization includes destruction or elimination of bacterial spores."
        },
        {
          question: "Why must sterilization parameters be controlled?",
          options: [
            "To ensure the process is effective",
            "To make contamination easier",
            "To reduce safety",
            "To avoid documentation"
          ],
          answer: 0,
          explanation:
            "Time, temperature, pressure and other parameters determine whether sterilization is effective."
        },
        {
          question: "The appropriate sterilization method depends partly on:",
          options: [
            "The equipment or material being processed",
            "Patient height",
            "Eye color",
            "Blood group only"
          ],
          answer: 0,
          explanation:
            "Different materials tolerate different sterilization methods."
        }
      ]
    },

    {
      title: "Module 14 — Disinfection and Antisepsis",
      explanation: `
        <p><strong>Disinfection</strong> reduces or destroys many pathogenic microorganisms on
        inanimate objects. It does not necessarily destroy all microbial life or bacterial spores.</p>

        <p><strong>Antisepsis</strong> refers to the use of antimicrobial substances on living
        tissues such as skin.</p>

        <p>Cleaning should generally occur before disinfection because organic material and dirt
        can interfere with the effectiveness of disinfectants.</p>

        <p>The correct disinfectant, concentration, contact time and method should be used
        according to approved healthcare procedures.</p>
      `,
      clinicalApplication: `
        <p>Nurses use antiseptics for skin preparation and work with disinfected equipment and
        surfaces as part of infection prevention.</p>
      `,
      keyPoints: [
        "Disinfection is mainly used on inanimate objects.",
        "Antisepsis is used on living tissue.",
        "Cleaning should precede disinfection when appropriate.",
        "Correct concentration and contact time matter.",
        "Disinfection is not the same as sterilization."
      ],
      examAlert:
        "Antiseptic = living tissue. Disinfectant = generally inanimate surfaces.",
      questions: [
        {
          question: "Antisepsis refers to antimicrobial treatment of:",
          options: [
            "Living tissue",
            "Floors only",
            "Metal instruments only",
            "Hospital walls only"
          ],
          answer: 0,
          explanation:
            "Antiseptics are used on living tissues such as skin."
        },
        {
          question: "Disinfection is generally performed on:",
          options: [
            "Inanimate objects",
            "Internal organs",
            "Blood",
            "Living tissue only"
          ],
          answer: 0,
          explanation:
            "Disinfection is commonly used on inanimate objects and surfaces."
        },
        {
          question: "Why is cleaning important before disinfection?",
          options: [
            "Organic material can interfere with disinfectant effectiveness.",
            "Cleaning creates pathogens.",
            "Cleaning replaces all disinfection.",
            "Cleaning makes equipment sterile automatically."
          ],
          answer: 0,
          explanation:
            "Dirt and organic material can reduce the effectiveness of disinfectants."
        },
        {
          question: "Disinfection and sterilization are:",
          options: [
            "Different processes",
            "Exactly the same",
            "Both methods of vaccination",
            "Both methods of nutrition"
          ],
          answer: 0,
          explanation:
            "Sterilization has a more comprehensive endpoint and includes elimination of spores."
        },
        {
          question: "What can affect disinfectant effectiveness?",
          options: [
            "Concentration and contact time",
            "Patient height",
            "Eye color",
            "Blood group"
          ],
          answer: 0,
          explanation:
            "Concentration, contact time and other factors influence disinfectant performance."
        }
      ]
    },

    {
      title: "Module 15 — Antimicrobial Drugs",
      explanation: `
        <p>Antimicrobial drugs are medications used to treat infections caused by microorganisms.
        Different classes act against different organisms.</p>

        <p><strong>Antibiotics</strong> are used against bacteria. Antiviral drugs act against
        specific viruses. Antifungal drugs treat fungal infections, while antiparasitic drugs
        target parasites.</p>

        <p>Antimicrobial therapy should be based on the suspected or confirmed organism,
        susceptibility, infection site, patient factors and appropriate clinical guidance.</p>

        <p>Nurses must administer antimicrobial medications safely, monitor therapeutic response,
        observe for adverse reactions and educate patients about adherence.</p>
      `,
      clinicalApplication: `
        <p>Patients should generally take antimicrobial medications exactly as prescribed and
        should not share leftover antibiotics with other people.</p>
      `,
      keyPoints: [
        "Antibiotics target bacteria.",
        "Antivirals target specific viruses.",
        "Antifungals target fungi.",
        "Antiparasitic drugs target parasites.",
        "Nurses monitor response and adverse effects."
      ],
      examAlert:
        "The word antimicrobial is broad; antibiotic specifically refers to drugs used against bacteria.",
      questions: [
        {
          question: "Antibiotics are primarily used against:",
          options: [
            "Bacteria",
            "All viruses",
            "All parasites",
            "All fungi"
          ],
          answer: 0,
          explanation:
            "Antibiotics are drugs used against bacterial infections."
        },
        {
          question: "Which medication group treats fungal infections?",
          options: [
            "Antifungals",
            "Antacids",
            "Anticoagulants",
            "Antihypertensives"
          ],
          answer: 0,
          explanation:
            "Antifungal drugs are used to treat fungal infections."
        },
        {
          question: "What should a nurse monitor during antimicrobial therapy?",
          options: [
            "Therapeutic response and adverse reactions",
            "Only the patient's height",
            "Only hair color",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Nurses monitor effectiveness, adverse reactions and other patient-specific concerns."
        },
        {
          question: "Should patients share leftover antibiotics?",
          options: [
            "No",
            "Yes",
            "Only with friends",
            "Only when symptoms are mild"
          ],
          answer: 0,
          explanation:
            "Antibiotics should be prescribed and used for the appropriate patient and infection."
        },
        {
          question: "Why is antimicrobial selection important?",
          options: [
            "Different drugs act against different microorganisms.",
            "All drugs work against every organism.",
            "Microorganisms are identical.",
            "Treatment never depends on the organism."
          ],
          answer: 0,
          explanation:
            "Antimicrobial activity varies according to the organism and the medication."
        }
      ]
    },

    {
      title: "Module 16 — Antimicrobial Resistance",
      explanation: `
        <p><strong>Antimicrobial resistance</strong> occurs when microorganisms develop the
        ability to survive exposure to drugs that would normally inhibit or kill them.</p>

        <p>Resistance can develop through genetic changes and can spread between microorganisms.
        Misuse and overuse of antimicrobial drugs can contribute to the development and spread
        of resistance.</p>

        <p>Important contributors include unnecessary antibiotic use, inappropriate drug choice,
        incorrect dosing and failure to follow appropriate treatment guidance.</p>

        <p>Healthcare workers help combat resistance through antimicrobial stewardship, infection
        prevention, appropriate prescribing and patient education.</p>
      `,
      clinicalApplication: `
        <p>Nurses contribute by administering medications correctly, supporting adherence,
        monitoring cultures and educating patients about responsible antimicrobial use.</p>
      `,
      keyPoints: [
        "Resistance makes infections harder to treat.",
        "Microorganisms can develop resistance.",
        "Misuse and overuse contribute to resistance.",
        "Infection prevention reduces the spread of resistant organisms.",
        "Antimicrobial stewardship promotes responsible use."
      ],
      examAlert:
        "Antibiotic resistance is resistance of bacteria—not the patient's body—to antibiotics.",
      questions: [
        {
          question: "What is antimicrobial resistance?",
          options: [
            "Ability of microorganisms to survive drugs that would normally affect them",
            "Patient resistance to exercise",
            "A type of immunity only",
            "A type of allergy"
          ],
          answer: 0,
          explanation:
            "Antimicrobial resistance occurs when microorganisms can survive antimicrobial exposure."
        },
        {
          question: "Which can contribute to antibiotic resistance?",
          options: [
            "Unnecessary antibiotic use",
            "Appropriate hand hygiene",
            "Vaccination",
            "Correct prescribing"
          ],
          answer: 0,
          explanation:
            "Unnecessary or inappropriate antibiotic use can contribute to resistance."
        },
        {
          question: "What is antimicrobial stewardship?",
          options: [
            "Responsible and appropriate use of antimicrobial medications",
            "Giving antibiotics to everyone",
            "Avoiding all laboratory testing",
            "Sharing medications"
          ],
          answer: 0,
          explanation:
            "Stewardship aims to optimize antimicrobial use while reducing unnecessary exposure."
        },
        {
          question: "Why is infection prevention important in antimicrobial resistance?",
          options: [
            "It reduces opportunities for resistant organisms to spread.",
            "It creates resistant bacteria.",
            "It eliminates the need for hygiene.",
            "It increases unnecessary antibiotic use."
          ],
          answer: 0,
          explanation:
            "Preventing infections reduces the need for antimicrobial treatment and limits transmission."
        },
        {
          question: "Resistance occurs in:",
          options: [
            "Microorganisms",
            "Only nurses",
            "Only patients",
            "Only medications"
          ],
          answer: 0,
          explanation:
            "Resistance is a characteristic of microorganisms that survive antimicrobial exposure."
        }
      ]
    },

    {
      title: "Module 17 — Healthcare-Associated Infections",
      explanation: `
        <p>A <strong>healthcare-associated infection (HAI)</strong> is an infection acquired
        during the process of receiving healthcare.</p>

        <p>Patients may be at increased risk because of invasive procedures, weakened immunity,
        prolonged hospitalization, surgical wounds, urinary catheters, intravenous devices
        and other factors.</p>

        <p>Common examples include catheter-associated urinary tract infections, surgical-site
        infections and infections associated with vascular devices.</p>

        <p>Prevention depends on hand hygiene, aseptic technique, appropriate device care,
        environmental cleaning and removal of invasive devices when no longer necessary.</p>
      `,
      clinicalApplication: `
        <p>Nurses have a major role in preventing HAIs through hand hygiene, aseptic technique,
        device care and early recognition of infection.</p>
      `,
      keyPoints: [
        "HAIs occur in association with healthcare.",
        "Invasive devices can increase infection risk.",
        "Hand hygiene is fundamental.",
        "Aseptic technique helps prevent contamination.",
        "Unnecessary devices should be removed when appropriate."
      ],
      examAlert:
        "Invasive devices can create pathways for microorganisms to enter the body.",
      questions: [
        {
          question: "What does HAI stand for?",
          options: [
            "Healthcare-associated infection",
            "High airway inflammation",
            "Human antibody index",
            "Hospital allergy illness"
          ],
          answer: 0,
          explanation:
            "HAI means healthcare-associated infection."
        },
        {
          question: "Which can increase the risk of an HAI?",
          options: [
            "Invasive devices",
            "Hand hygiene",
            "Aseptic technique",
            "Appropriate cleaning"
          ],
          answer: 0,
          explanation:
            "Invasive devices such as catheters can provide a route for microorganisms to enter."
        },
        {
          question: "Which practice helps prevent HAIs?",
          options: [
            "Hand hygiene",
            "Sharing equipment without cleaning",
            "Breaking aseptic technique",
            "Poor environmental cleaning"
          ],
          answer: 0,
          explanation:
            "Hand hygiene is one of the most important infection-prevention practices."
        },
        {
          question: "Why should unnecessary invasive devices be removed?",
          options: [
            "To reduce infection risk.",
            "To increase contamination.",
            "To increase hospital stay.",
            "To eliminate hand hygiene."
          ],
          answer: 0,
          explanation:
            "The longer an unnecessary invasive device remains, the greater the opportunity for infection."
        },
        {
          question: "Which is an example of an HAI?",
          options: [
            "Catheter-associated urinary tract infection",
            "A healed old scar",
            "Normal skin microbiota",
            "Normal digestion"
          ],
          answer: 0,
          explanation:
            "Catheter-associated urinary tract infection is a recognized healthcare-associated infection."
        }
      ]
    },

    {
      title: "Module 18 — Standard Precautions and Personal Protective Equipment",
      explanation: `
        <p><strong>Standard precautions</strong> are infection-prevention practices applied to
        patient care based on the principle that blood and certain body fluids may contain
        infectious agents.</p>

        <p>Important measures include hand hygiene, appropriate use of gloves, gowns, masks,
        eye protection and safe handling of sharps.</p>

        <p>Personal protective equipment (PPE) should be selected according to the anticipated
        exposure.</p>

        <p>Gloves do not replace hand hygiene. Hands should be cleaned before and after appropriate
        patient contact and after glove removal.</p>
      `,
      clinicalApplication: `
        <p>Nurses must assess the expected exposure before selecting PPE and must dispose of
        contaminated materials safely.</p>
      `,
      keyPoints: [
        "Standard precautions apply broadly to patient care.",
        "PPE is selected according to exposure risk.",
        "Gloves do not replace hand hygiene.",
        "Sharps must be handled safely.",
        "Hand hygiene remains fundamental."
      ],
      examAlert:
        "Wearing gloves does not eliminate the need for hand hygiene.",
      questions: [
        {
          question: "Do gloves replace hand hygiene?",
          options: [
            "Yes",
            "No",
            "Only during surgery",
            "Only when gloves are clean"
          ],
          answer: 1,
          explanation:
            "Hand hygiene remains necessary even when gloves are used."
        },
        {
          question: "PPE should be selected based on:",
          options: [
            "Expected exposure risk",
            "Patient height",
            "Patient's favorite color",
            "Nurse's preference only"
          ],
          answer: 0,
          explanation:
            "PPE should match the type of exposure anticipated."
        },
        {
          question: "Which is an example of PPE?",
          options: [
            "Gloves",
            "Stethoscope only",
            "Blood pressure",
            "Urinalysis"
          ],
          answer: 0,
          explanation:
            "Gloves are a form of personal protective equipment."
        },
        {
          question: "Why must sharps be handled carefully?",
          options: [
            "They can cause injuries and transmit bloodborne infections.",
            "They are harmless.",
            "They improve hand hygiene.",
            "They sterilize themselves."
          ],
          answer: 0,
          explanation:
            "Sharps injuries can expose healthcare workers to bloodborne pathogens."
        },
        {
          question: "Standard precautions are used:",
          options: [
            "Broadly during patient care",
            "Only for one disease",
            "Only in laboratories",
            "Only when a patient looks sick"
          ],
          answer: 0,
          explanation:
            "Standard precautions are applied according to the risk of exposure during patient care."
        }
      ]
    },

    {
      title: "Module 19 — Bloodborne Pathogens",
      explanation: `
        <p>Bloodborne pathogens are infectious organisms that can be transmitted through exposure
        to infected blood or certain body fluids.</p>

        <p>Examples of important bloodborne viruses include hepatitis B virus, hepatitis C virus
        and HIV.</p>

        <p>Healthcare workers can be exposed through needlestick injuries, cuts, splashes to
        mucous membranes or other occupational exposures.</p>

        <p>Prevention includes safe injection practices, appropriate PPE, safe sharps handling,
        vaccination where available and immediate reporting and evaluation after exposure.</p>
      `,
      clinicalApplication: `
        <p>A needlestick or other significant exposure should be managed promptly according to
        institutional exposure protocols.</p>
      `,
      keyPoints: [
        "Blood can transmit infectious pathogens.",
        "Hepatitis B, hepatitis C and HIV are important bloodborne infections.",
        "Needlestick injuries are occupational risks.",
        "Safe sharps handling reduces risk.",
        "Significant exposure requires prompt reporting and evaluation."
      ],
      examAlert:
        "Never recap a used needle in a way that creates unnecessary needlestick risk.",
      questions: [
        {
          question: "Which is a bloodborne pathogen?",
          options: [
            "Hepatitis B virus",
            "A normal skin cell",
            "Hemoglobin",
            "Insulin"
          ],
          answer: 0,
          explanation:
            "Hepatitis B virus can be transmitted through infected blood and certain body fluids."
        },
        {
          question: "Which occupational event can expose a healthcare worker to bloodborne pathogens?",
          options: [
            "Needlestick injury",
            "Reading a chart",
            "Taking a patient's temperature",
            "Washing hands"
          ],
          answer: 0,
          explanation:
            "A needlestick can result in exposure to infected blood."
        },
        {
          question: "What should happen after a significant occupational exposure?",
          options: [
            "Prompt reporting and medical evaluation",
            "Ignore it",
            "Wait several weeks",
            "Continue working without reporting"
          ],
          answer: 0,
          explanation:
            "Prompt evaluation allows appropriate risk assessment and possible post-exposure management."
        },
        {
          question: "Which helps reduce sharps injury risk?",
          options: [
            "Safe sharps handling",
            "Leaving needles on beds",
            "Passing exposed needles by hand",
            "Ignoring disposal procedures"
          ],
          answer: 0,
          explanation:
            "Safe handling and disposal of sharps reduce injury risk."
        },
        {
          question: "Which is another important bloodborne infection?",
          options: [
            "Hepatitis C",
            "Common cold only",
            "Athlete's foot only",
            "Malaria only"
          ],
          answer: 0,
          explanation:
            "Hepatitis C is a major bloodborne viral infection."
        }
      ]
    },

    {
      title: "Module 20 — Vaccination and Immunization",
      explanation: `
        <p>Vaccination is an important method of preventing infectious diseases. Vaccines
        stimulate the immune system to develop protection against specific pathogens or their
        components.</p>

        <p>Vaccines can reduce the risk of infection, severe disease and transmission of certain
        infections.</p>

        <p>Healthcare workers have important responsibilities in vaccine education, administration,
        documentation and monitoring for adverse events.</p>

        <p>Vaccination schedules vary according to age, health status, vaccine type and national
        recommendations.</p>
      `,
      clinicalApplication: `
        <p>Nurses educate patients about the benefits and expected effects of vaccination,
        verify vaccine information and monitor patients appropriately after administration.</p>
      `,
      keyPoints: [
        "Vaccines stimulate immune protection.",
        "Vaccination can prevent serious infectious diseases.",
        "Schedules depend on age and health factors.",
        "Nurses provide education and administration support.",
        "Vaccination contributes to public health."
      ],
      examAlert:
        "Vaccination is a major prevention strategy against many infectious diseases.",
      questions: [
        {
          question: "What is a major purpose of vaccination?",
          options: [
            "Stimulate protective immune responses",
            "Cause every infection",
            "Replace all antibiotics",
            "Destroy all normal microbiota"
          ],
          answer: 0,
          explanation:
            "Vaccines stimulate the immune system to develop protection against specific infections."
        },
        {
          question: "Vaccination can help reduce:",
          options: [
            "Risk of severe infectious disease",
            "All injuries",
            "All genetic diseases",
            "All chronic conditions"
          ],
          answer: 0,
          explanation:
            "Vaccines can significantly reduce the risk of certain infectious diseases and severe outcomes."
        },
        {
          question: "What is an important nursing responsibility related to vaccines?",
          options: [
            "Patient education",
            "Ignoring documentation",
            "Giving every vaccine to every person",
            "Skipping safety checks"
          ],
          answer: 0,
          explanation:
            "Nurses play important roles in education, safe administration and documentation."
        },
        {
          question: "Vaccination schedules can depend on:",
          options: [
            "Age and health status",
            "Hair color",
            "Height only",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Vaccination recommendations depend on factors such as age, health status and vaccine type."
        },
        {
          question: "Why is vaccination important to public health?",
          options: [
            "It helps prevent and reduce infectious disease.",
            "It causes all diseases.",
            "It eliminates sanitation.",
            "It replaces hand hygiene."
          ],
          answer: 0,
          explanation:
            "Vaccination is an important population-level strategy for preventing infectious diseases."
        }
      ]
    },

    {
      title: "Module 21 — Infection Prevention and Control in Nursing",
      explanation: `
        <p>Infection prevention and control is a core nursing responsibility. The goal is to
        protect patients, healthcare workers and the community from preventable transmission
        of infectious organisms.</p>

        <p>Important practices include hand hygiene, appropriate PPE, environmental cleaning,
        safe injection practices, correct specimen collection, respiratory hygiene, appropriate
        isolation precautions and safe waste disposal.</p>

        <p>Nurses should also recognize that vulnerable patients may have a higher risk of
        infection because of age, illness, immunosuppression, invasive procedures or other
        factors.</p>

        <p>Effective infection control requires consistent application of evidence-based
        procedures rather than relying only on whether a patient appears infectious.</p>
      `,
      clinicalApplication: `
        <p>Every patient interaction can involve infection-control decisions. Nurses should
        maintain appropriate hand hygiene and use precautions according to the clinical situation.</p>
      `,
      keyPoints: [
        "Infection prevention is a core nursing responsibility.",
        "Hand hygiene is fundamental.",
        "Use PPE according to exposure risk.",
        "Follow appropriate transmission-based precautions.",
        "Protect vulnerable patients.",
        "Safe practices should be consistent."
      ],
      examAlert:
        "Infection prevention is everyone's responsibility in the healthcare environment.",
      questions: [
        {
          question: "Which practice is fundamental to infection prevention?",
          options: [
            "Hand hygiene",
            "Sharing needles",
            "Skipping cleaning",
            "Reusing contaminated equipment"
          ],
          answer: 0,
          explanation:
            "Hand hygiene is one of the most important infection-prevention measures."
        },
        {
          question: "Why are some patients more vulnerable to infection?",
          options: [
            "Their immune defenses may be reduced.",
            "They cannot develop infections.",
            "They always have strong immunity.",
            "Microorganisms avoid them."
          ],
          answer: 0,
          explanation:
            "Age, illness, immunosuppression and invasive procedures can increase infection risk."
        },
        {
          question: "PPE should be used:",
          options: [
            "According to anticipated exposure",
            "Only when convenient",
            "Only during surgery",
            "Never"
          ],
          answer: 0,
          explanation:
            "PPE should be selected based on the type of exposure expected."
        },
        {
          question: "Why are consistent infection-control practices important?",
          options: [
            "They reduce preventable transmission.",
            "They increase contamination.",
            "They replace diagnosis.",
            "They have no benefit."
          ],
          answer: 0,
          explanation:
            "Consistent infection-control practices reduce opportunities for microorganisms to spread."
        },
        {
          question: "Who is responsible for infection prevention?",
          options: [
            "All healthcare workers",
            "Only laboratory staff",
            "Only doctors",
            "Only cleaners"
          ],
          answer: 0,
          explanation:
            "Infection prevention requires cooperation among all members of the healthcare team."
        }
      ]
    },

    {
      title: "Module 22 — Comprehensive Microbiology Revision",
      explanation: `
        <p>Microbiology becomes easier when the major concepts are connected rather than memorized
        as isolated facts.</p>

        <p>When approaching an infection-related question, think about the organism, its structure,
        how it is transmitted, how the body responds, how it is diagnosed, how it can be treated
        and how transmission can be prevented.</p>

        <p>For nursing examinations, pay particular attention to the differences between bacteria,
        viruses, fungi and parasites; sterilization versus disinfection; colonization versus
        infection; standard precautions; the chain of infection; antimicrobial resistance and
        proper specimen collection.</p>

        <p>Remember that infection prevention protects both patients and healthcare workers.
        Correct nursing technique can interrupt transmission at multiple points.</p>
      `,
      clinicalApplication: `
        <p>Strong microbiology knowledge allows nurses to make safer decisions about specimen
        collection, medication administration, isolation, PPE and patient education.</p>
      `,
      keyPoints: [
        "Know the major microorganism groups.",
        "Understand the chain of infection.",
        "Know the difference between sterilization and disinfection.",
        "Understand antimicrobial resistance.",
        "Use appropriate infection-control practices.",
        "Collect specimens correctly."
      ],
      examAlert:
        "Microbiology questions often test differences between organisms and the correct infection-control response.",
      questions: [
        {
          question: "Which organism requires host cells for replication?",
          options: [
            "Virus",
            "Bacterium",
            "Fungus",
            "Helminth"
          ],
          answer: 0,
          explanation:
            "Viruses depend on host cells to replicate."
        },
        {
          question: "Which process aims to eliminate all forms of microbial life?",
          options: [
            "Sterilization",
            "Routine cleaning",
            "Hand washing only",
            "Dusting"
          ],
          answer: 0,
          explanation:
            "Sterilization aims to eliminate all forms of microbial life, including spores."
        },
        {
          question: "Which is an important way to interrupt the chain of infection?",
          options: [
            "Hand hygiene",
            "Sharing equipment without cleaning",
            "Poor waste disposal",
            "Ignoring PPE"
          ],
          answer: 0,
          explanation:
            "Hand hygiene interrupts transmission and therefore can break the chain of infection."
        },
        {
          question: "What contributes to antimicrobial resistance?",
          options: [
            "Inappropriate antimicrobial use",
            "Appropriate infection prevention",
            "Vaccination",
            "Correct prescribing"
          ],
          answer: 0,
          explanation:
            "Inappropriate or unnecessary antimicrobial use can promote resistance."
        },
        {
          question: "Which statement is correct?",
          options: [
            "Colonization does not necessarily mean infection.",
            "Every microorganism causes disease.",
            "Antibiotics treat all viruses.",
            "Disinfection always means sterilization."
          ],
          answer: 0,
          explanation:
            "Microorganisms can colonize a person without causing disease, so colonization and infection are not synonymous."
        },
        {
          question: "Which organism causes malaria?",
          options: [
            "Plasmodium",
            "Candida",
            "Influenza virus",
            "Staphylococcus"
          ],
          answer: 0,
          explanation:
            "Malaria is caused by Plasmodium parasites."
        },
        {
          question: "Which bloodborne infection is caused by a virus?",
          options: [
            "HIV infection",
            "Malaria",
            "Candidiasis",
            "Ringworm"
          ],
          answer: 0,
          explanation:
            "HIV infection is caused by the human immunodeficiency virus."
        },
        {
          question: "What should a nurse prioritize when collecting a microbiological specimen?",
          options: [
            "Correct technique and prevention of contamination",
            "Using any available container",
            "Leaving the specimen unlabeled",
            "Delaying transport unnecessarily"
          ],
          answer: 0,
          explanation:
            "Correct collection, labeling and handling are essential for reliable microbiological results."
        },
        {
          question: "Which medication class treats fungal infections?",
          options: [
            "Antifungal",
            "Antibiotic",
            "Antacid",
            "Anticoagulant"
          ],
          answer: 0,
          explanation:
            "Antifungal medications are used to treat fungal infections."
        },
        {
          question: "Which statement about gloves is correct?",
          options: [
            "Gloves do not replace hand hygiene.",
            "Gloves eliminate all infection risk.",
            "Hand hygiene is unnecessary after glove removal.",
            "Gloves can always be reused."
          ],
          answer: 0,
          explanation:
            "Gloves reduce exposure risk but do not replace proper hand hygiene."
        }
      ]
    }

  ]
},
    // ========================================================
    // 3. FIRST AID
    // ========================================================
"first-aid": {
  title: "First Aid & Emergency Care",
  description:
    "A comprehensive nursing-focused study of first aid, emergency assessment, trauma care, basic life support, shock, bleeding, burns, poisoning and other common emergencies.",

  lessons: [

    {
      title: "Module 1 — Introduction to First Aid",
      explanation: `
        First aid is the immediate assistance given to a person who is injured or suddenly becomes ill before full medical treatment is available.

        The main purpose of first aid is to preserve life, prevent the condition from becoming worse, promote recovery, and provide comfort until appropriate healthcare is available.

        A first aider should remain calm, assess the situation, protect themselves and the casualty from further danger, and call for appropriate emergency assistance.

        First aid does not replace professional medical care. It is the immediate care provided during the critical period before definitive treatment.
      `,
      clinicalApplication: `
        In a hospital, a nurse may encounter a patient who suddenly collapses, develops severe bleeding, has difficulty breathing, or sustains an injury. The nurse must recognize the emergency quickly and begin appropriate first-response measures while activating the emergency team.
      `,
      keyPoints: [
        "First aid is immediate care provided before definitive medical treatment.",
        "Preserving life is the first priority.",
        "Prevent further injury or deterioration.",
        "Stay calm and call for appropriate help.",
        "Do not perform procedures beyond your level of training."
      ],
      examAlert:
        "Remember the major aims of first aid: preserve life, prevent deterioration, promote recovery and obtain appropriate medical assistance.",
      questions: [
        {
          question:
            "What is the primary purpose of first aid?",
          options: [
            "To replace hospital treatment",
            "To preserve life and prevent deterioration",
            "To diagnose every medical condition",
            "To provide long-term rehabilitation"
          ],
          answer: 1,
          explanation:
            "The immediate priority of first aid is to preserve life, prevent further deterioration and obtain appropriate professional help."
        },
        {
          question:
            "Which action should a first aider take before approaching a casualty?",
          options: [
            "Give medication",
            "Assess the safety of the scene",
            "Move the casualty immediately",
            "Give food and water"
          ],
          answer: 1,
          explanation:
            "Scene safety should be assessed before approaching so that the first aider does not become another casualty."
        },
        {
          question:
            "Which principle is most important when providing first aid?",
          options: [
            "Remain calm and act systematically",
            "Perform every procedure you know",
            "Ignore the surroundings",
            "Wait for the casualty to recover"
          ],
          answer: 0,
          explanation:
            "Remaining calm and following a systematic approach reduces errors and improves emergency care."
        }
      ]
    },

    {
      title: "Module 2 — Scene Safety and Initial Assessment",
      explanation: `
        Before providing care, the first aider should determine whether the environment is safe.

        Potential hazards may include traffic, fire, electricity, chemicals, violence, collapsed structures, or dangerous equipment.

        Once the scene is safe, the casualty should be assessed rapidly. The first aider should determine whether the person is responsive and whether there are immediate problems with airway, breathing or circulation.

        A systematic assessment helps identify life-threatening problems before less urgent injuries are treated.
      `,
      clinicalApplication: `
        A nurse responding to a road traffic accident should not immediately run into moving traffic. The area must first be secured, then the patient can be assessed for responsiveness, breathing and major bleeding.
      `,
      keyPoints: [
        "Check scene safety first.",
        "Use appropriate personal protective equipment when available.",
        "Identify immediate life threats.",
        "Assess responsiveness.",
        "Activate emergency assistance early."
      ],
      examAlert:
        "Scene safety comes before casualty assessment. A rescuer must not become a second victim.",
      questions: [
        {
          question:
            "What should be assessed first at an emergency scene?",
          options: [
            "The patient's temperature",
            "Scene safety",
            "The patient's diet",
            "The patient's past medical history"
          ],
          answer: 1,
          explanation:
            "The rescuer must first determine whether it is safe to approach the casualty."
        },
        {
          question:
            "Why is scene safety important?",
          options: [
            "It prevents the rescuer from becoming injured",
            "It guarantees the patient will recover",
            "It eliminates the need for assessment",
            "It replaces emergency services"
          ],
          answer: 0,
          explanation:
            "A dangerous environment can injure the rescuer and prevent effective assistance."
        },
        {
          question:
            "Which problem should receive immediate attention?",
          options: [
            "Minor bruising",
            "Life-threatening airway obstruction",
            "Old scar",
            "Mild itching"
          ],
          answer: 1,
          explanation:
            "Life-threatening airway obstruction must be addressed immediately."
        }
      ]
    },

    {
      title: "Module 3 — Primary Survey: ABCDE",
      explanation: `
        The primary survey is a rapid assessment used to identify life-threatening problems.

        A common framework is ABCDE:

        A — Airway
        B — Breathing
        C — Circulation
        D — Disability
        E — Exposure/Environment

        Airway assessment determines whether air can move freely into the lungs. Breathing assessment looks for normal breathing, respiratory distress and other signs of inadequate ventilation.

        Circulation includes assessing major bleeding and signs of poor perfusion. Disability involves a rapid neurological assessment such as responsiveness and level of consciousness.

        Exposure means examining the casualty sufficiently to identify important injuries while protecting the person from unnecessary heat loss and maintaining dignity.
      `,
      clinicalApplication: `
        A patient who has fallen from a height may have several injuries. The nurse should first identify and manage life-threatening airway, breathing and circulation problems before concentrating on less urgent injuries.
      `,
      keyPoints: [
        "A = Airway.",
        "B = Breathing.",
        "C = Circulation.",
        "D = Disability.",
        "E = Exposure/Environment.",
        "Life-threatening problems are treated as they are identified."
      ],
      examAlert:
        "ABCDE is a major emergency assessment framework. Do not become distracted by obvious but non-life-threatening injuries.",
      questions: [
        {
          question: "What does the A in ABCDE represent?",
          options: [
            "Assessment",
            "Airway",
            "Alertness",
            "Anatomy"
          ],
          answer: 1,
          explanation:
            "A represents airway assessment."
        },
        {
          question: "What is assessed under circulation?",
          options: [
            "Hair colour",
            "Major bleeding and perfusion",
            "Vision only",
            "Dietary intake"
          ],
          answer: 1,
          explanation:
            "Circulation assessment includes major bleeding and signs of inadequate perfusion."
        },
        {
          question: "What does D commonly represent?",
          options: [
            "Diet",
            "Disability",
            "Disinfection",
            "Diagnosis"
          ],
          answer: 1,
          explanation:
            "D represents disability, including a rapid neurological assessment."
        }
      ]
    },

    {
      title: "Module 4 — Airway Emergencies",
      explanation: `
        Airway obstruction occurs when something prevents air from passing normally into the lungs.

        Causes may include the tongue falling backward in an unconscious person, food, vomitus, blood, swelling, trauma or foreign objects.

        Signs of airway obstruction may include inability to speak normally, noisy breathing, coughing, choking, cyanosis or loss of consciousness.

        The priority is to recognize obstruction quickly and provide appropriate emergency intervention according to the person's condition and the rescuer's level of training.
      `,
      clinicalApplication: `
        An unconscious patient may lose airway patency because the tongue falls backward. Appropriate positioning and airway-opening techniques can help maintain airway patency while emergency assistance is obtained.
      `,
      keyPoints: [
        "Airway obstruction can rapidly become fatal.",
        "Recognize choking and airway compromise early.",
        "Unconscious patients may lose airway patency.",
        "Call for emergency assistance.",
        "Use trained airway-opening techniques appropriately."
      ],
      examAlert:
        "Airway obstruction is a time-critical emergency because prolonged lack of oxygen can cause brain injury and death.",
      questions: [
        {
          question:
            "Which finding may indicate severe airway obstruction?",
          options: [
            "Normal speech",
            "Inability to speak or breathe normally",
            "Normal skin colour",
            "Mild hunger"
          ],
          answer: 1,
          explanation:
            "Inability to speak or breathe normally may indicate severe airway obstruction."
        },
        {
          question:
            "Why is airway obstruction an emergency?",
          options: [
            "It causes hunger",
            "It prevents adequate oxygen from reaching the body",
            "It always causes fever",
            "It causes hypertension"
          ],
          answer: 1,
          explanation:
            "Airway obstruction can prevent oxygen from reaching the lungs and ultimately the brain and other organs."
        },
        {
          question:
            "Which patient is particularly at risk of airway obstruction?",
          options: [
            "A fully alert patient",
            "An unconscious patient",
            "A patient walking normally",
            "A patient eating slowly"
          ],
          answer: 1,
          explanation:
            "An unconscious patient may lose airway patency because of reduced muscle tone and tongue position."
        }
      ]
    },

    {
      title: "Module 5 — Choking and Foreign Body Airway Obstruction",
      explanation: `
        Choking occurs when a foreign object blocks the airway.

        Mild obstruction may allow the person to cough and breathe. Severe obstruction may prevent effective coughing, speaking or breathing.

        A conscious adult or child with severe choking requires immediate emergency assistance using appropriate choking first-aid techniques according to current training and guidelines.

        If the person becomes unresponsive, emergency resuscitation procedures should be started and emergency medical services activated.
      `,
      clinicalApplication: `
        Nurses may encounter choking in wards, outpatient areas, schools, community settings or during feeding. Early recognition is essential because complete airway obstruction can lead to cardiac arrest.
      `,
      keyPoints: [
        "Encourage effective coughing when appropriate for mild obstruction.",
        "Recognize severe obstruction quickly.",
        "Activate emergency assistance.",
        "Use appropriate choking interventions according to training.",
        "Begin resuscitation if the casualty becomes unresponsive."
      ],
      examAlert:
        "A person who cannot speak, cough effectively or breathe normally may have severe airway obstruction.",
      questions: [
        {
          question:
            "What may a person with mild airway obstruction be able to do?",
          options: [
            "Cough effectively",
            "Remain completely silent and unable to breathe",
            "Always lose consciousness",
            "Always develop a fever"
          ],
          answer: 0,
          explanation:
            "Effective coughing can occur when the obstruction is not complete."
        },
        {
          question:
            "Which finding suggests severe choking?",
          options: [
            "Effective coughing",
            "Normal breathing",
            "Inability to speak or breathe",
            "Normal conversation"
          ],
          answer: 2,
          explanation:
            "Inability to speak or breathe normally suggests severe airway obstruction."
        },
        {
          question:
            "What should happen if a choking casualty becomes unresponsive?",
          options: [
            "Leave them alone",
            "Activate emergency response and begin appropriate resuscitation",
            "Give them food",
            "Ask them to walk"
          ],
          answer: 1,
          explanation:
            "An unresponsive choking casualty requires emergency response and resuscitation according to current protocols."
        }
      ]
    },

    {
      title: "Module 6 — Basic Life Support and Cardiac Arrest",
      explanation: `
        Cardiac arrest occurs when the heart stops effectively pumping blood to the brain and other organs.

        Early recognition, activation of emergency medical services, high-quality cardiopulmonary resuscitation (CPR), and rapid access to an automated external defibrillator (AED) when indicated are major components of basic life support.

        CPR combines chest compressions with rescue breaths when the rescuer is trained and able to provide them.

        High-quality chest compressions require appropriate rate, depth, recoil and minimal interruptions.
      `,
      clinicalApplication: `
        If a patient suddenly collapses and is unresponsive with abnormal or absent normal breathing, the nurse should activate the emergency response system and begin appropriate resuscitation without unnecessary delay.
      `,
      keyPoints: [
        "Recognize cardiac arrest quickly.",
        "Activate emergency assistance.",
        "Begin CPR promptly.",
        "Use an AED as soon as available when appropriate.",
        "Minimize interruptions in chest compressions."
      ],
      examAlert:
        "Early CPR and early defibrillation, when indicated, are critical links in the chain of survival.",
      questions: [
        {
          question:
            "What should be done when cardiac arrest is suspected?",
          options: [
            "Wait several minutes",
            "Activate emergency response and begin CPR",
            "Give oral medication",
            "Offer food"
          ],
          answer: 1,
          explanation:
            "Cardiac arrest is time-critical. Emergency response should be activated and CPR started promptly."
        },
        {
          question: "What is an AED used for?",
          options: [
            "Measuring temperature",
            "Delivering a defibrillation shock when indicated",
            "Measuring blood pressure only",
            "Giving oral medication"
          ],
          answer: 1,
          explanation:
            "An AED analyzes cardiac rhythm and can deliver a shock when an appropriate shockable rhythm is detected."
        },
        {
          question:
            "Why should interruptions in chest compressions be minimized?",
          options: [
            "To maintain blood flow during CPR",
            "To reduce hunger",
            "To increase body temperature",
            "To treat infection"
          ],
          answer: 0,
          explanation:
            "Minimizing interruptions helps maintain circulation generated by chest compressions."
        }
      ]
    },

    {
      title: "Module 7 — Recovery Position",
      explanation: `
        The recovery position is used for an unresponsive person who is breathing normally and does not require immediate CPR.

        The position helps maintain airway patency and allows fluids such as vomitus to drain from the mouth rather than obstructing the airway.

        The casualty should continue to be monitored because their condition can change.
      `,
      clinicalApplication: `
        A patient who becomes unconscious but continues to breathe normally may be placed in an appropriate recovery position while awaiting emergency assistance, provided there is no reason that moving them would cause additional harm.
      `,
      keyPoints: [
        "Used for an unresponsive person who is breathing normally.",
        "Helps maintain airway patency.",
        "Reduces risk of aspiration from secretions or vomitus.",
        "Continue monitoring breathing and responsiveness."
      ],
      examAlert:
        "An unresponsive person who is not breathing normally requires resuscitation, not simply the recovery position.",
      questions: [
        {
          question:
            "When is the recovery position generally appropriate?",
          options: [
            "For an unresponsive person breathing normally",
            "For a person without normal breathing",
            "For every trauma patient",
            "Only for conscious patients"
          ],
          answer: 0,
          explanation:
            "The recovery position is generally used for an unresponsive person who is breathing normally."
        },
        {
          question:
            "What is one purpose of the recovery position?",
          options: [
            "Maintain airway patency",
            "Treat fractures",
            "Stop all bleeding",
            "Lower blood glucose"
          ],
          answer: 0,
          explanation:
            "The position helps maintain an open airway and allows fluids to drain from the mouth."
        },
        {
          question:
            "What should be done after placing the casualty in the recovery position?",
          options: [
            "Leave immediately",
            "Continue monitoring them",
            "Give food",
            "Give alcohol"
          ],
          answer: 1,
          explanation:
            "The casualty should continue to be monitored because their condition may deteriorate."
        }
      ]
    },

    {
      title: "Module 8 — Bleeding and Haemorrhage",
      explanation: `
        Severe bleeding is a life-threatening emergency because significant blood loss can cause shock and death.

        The first priority is to control external bleeding using appropriate direct pressure and other trained techniques when necessary.

        The first aider should use gloves or other barrier protection when available.

        Internal bleeding may not be visible. Signs can include weakness, pale or clammy skin, rapid pulse, dizziness, abdominal swelling or altered consciousness depending on the location and severity of bleeding.
      `,
      clinicalApplication: `
        A patient with a deep wound may lose a significant amount of blood. The nurse should apply appropriate pressure, activate emergency assistance and monitor for signs of shock.
      `,
      keyPoints: [
        "Severe bleeding is life-threatening.",
        "Apply appropriate direct pressure.",
        "Use barrier protection.",
        "Look for signs of shock.",
        "Internal bleeding may occur without visible blood."
      ],
      examAlert:
        "Uncontrolled severe haemorrhage can cause hypovolaemic shock and death.",
      questions: [
        {
          question:
            "What is the immediate priority for severe external bleeding?",
          options: [
            "Give food",
            "Control the bleeding",
            "Take a detailed family history",
            "Encourage walking"
          ],
          answer: 1,
          explanation:
            "Controlling life-threatening bleeding is an immediate priority."
        },
        {
          question:
            "Which finding may indicate significant blood loss?",
          options: [
            "Pale clammy skin",
            "Normal strong pulse",
            "Improved alertness",
            "Warm dry skin only"
          ],
          answer: 0,
          explanation:
            "Pale, clammy skin may occur with significant blood loss and shock."
        },
        {
          question:
            "Can serious internal bleeding occur without visible external blood?",
          options: [
            "Yes",
            "No",
            "Only in children",
            "Only during sleep"
          ],
          answer: 0,
          explanation:
            "Internal bleeding can occur within body cavities and may not be externally visible."
        }
      ]
    },

    {
      title: "Module 9 — Wounds and Soft Tissue Injuries",
      explanation: `
        Wounds are breaks or damage to the skin or underlying tissues.

        Common types include cuts, abrasions, puncture wounds, lacerations and penetrating injuries.

        First aid includes controlling bleeding, protecting the wound from contamination, assessing for serious injury and obtaining professional care when necessary.

        Deep, contaminated, puncture or heavily bleeding wounds may require medical assessment, tetanus protection and other treatment.
      `,
      clinicalApplication: `
        A nursing student who sustains a puncture wound from a contaminated object should not simply cover the wound and ignore it. The injury should be assessed and appropriate medical care sought.
      `,
      keyPoints: [
        "Control bleeding.",
        "Protect wounds from contamination.",
        "Assess wound depth and mechanism.",
        "Consider infection and tetanus risk.",
        "Refer serious wounds for professional assessment."
      ],
      examAlert:
        "Puncture wounds can appear small externally but may cause significant deep tissue injury or infection.",
      questions: [
        {
          question:
            "Which wound may have significant deep tissue damage despite a small skin opening?",
          options: [
            "Puncture wound",
            "Minor superficial abrasion",
            "Simple bruise",
            "Mild sunburn"
          ],
          answer: 0,
          explanation:
            "Puncture wounds can penetrate deeply despite a relatively small external opening."
        },
        {
          question:
            "What is an important concern with contaminated wounds?",
          options: [
            "Infection",
            "Improved immunity",
            "Increased appetite",
            "Better circulation"
          ],
          answer: 0,
          explanation:
            "Contaminated wounds have increased risk of infection."
        },
        {
          question:
            "Which wound generally requires professional assessment?",
          options: [
            "Severe deep wound",
            "Very minor superficial scratch",
            "Intact skin",
            "Normal skin"
          ],
          answer: 0,
          explanation:
            "Deep or severe wounds may involve deeper structures and require professional treatment."
        }
      ]
    },

    {
      title: "Module 10 — Shock",
      explanation: `
        Shock is a state in which the body's tissues do not receive adequate oxygen and nutrients because circulation is insufficient.

        Major causes include severe blood loss, severe dehydration, cardiac problems, infection, allergic reactions and spinal injury.

        Signs may include pale or cool skin, sweating, rapid pulse, weakness, dizziness, anxiety, confusion and reduced consciousness.

        First aid focuses on treating the underlying emergency when possible, obtaining urgent medical help, controlling major bleeding and supporting the casualty while avoiding unnecessary movement.
      `,
      clinicalApplication: `
        A patient with severe bleeding may develop hypovolaemic shock. Early recognition and rapid control of bleeding are essential while emergency treatment is arranged.
      `,
      keyPoints: [
        "Shock is a life-threatening emergency.",
        "Identify and treat the cause where possible.",
        "Control major bleeding.",
        "Activate emergency assistance.",
        "Monitor consciousness and breathing."
      ],
      examAlert:
        "Shock can progress rapidly to organ failure and death if not treated.",
      questions: [
        {
          question: "What is shock?",
          options: [
            "Adequate tissue perfusion",
            "Inadequate tissue oxygenation due to circulatory failure",
            "Normal digestion",
            "A minor skin injury"
          ],
          answer: 1,
          explanation:
            "Shock occurs when circulation is inadequate to meet tissue oxygen and metabolic needs."
        },
        {
          question:
            "Which patient is at high risk of hypovolaemic shock?",
          options: [
            "A patient with severe blood loss",
            "A patient with a small healed scar",
            "A healthy person drinking water",
            "A patient with normal circulation"
          ],
          answer: 0,
          explanation:
            "Severe blood loss reduces circulating blood volume and can cause hypovolaemic shock."
        },
        {
          question:
            "Which finding may occur in shock?",
          options: [
            "Pale clammy skin",
            "Improved circulation",
            "Normal strength with no symptoms",
            "Increased appetite"
          ],
          answer: 0,
          explanation:
            "Pale, cool or clammy skin is a common sign of circulatory compromise."
        }
      ]
    },

    {
      title: "Module 11 — Burns",
      explanation: `
        Burns can result from heat, chemicals, electricity, radiation or friction.

        The severity of a burn depends on factors such as depth, size, location, cause and the person's age and health status.

        Immediate first aid for a thermal burn includes stopping the burning process and cooling the affected area with cool running water for an appropriate period according to current first-aid guidance.

        Ice, very cold substances, butter, oils and other inappropriate materials should not be applied directly to the burn.

        Serious burns require urgent medical assessment.
      `,
      clinicalApplication: `
        A patient who spills hot liquid on the arm should have the heat source removed and the burn cooled appropriately while the nurse assesses its severity and determines whether further medical treatment is required.
      `,
      keyPoints: [
        "Stop the burning process.",
        "Cool thermal burns appropriately.",
        "Do not apply ice directly.",
        "Assess burn size, depth and location.",
        "Serious burns require urgent medical care."
      ],
      examAlert:
        "Burns involving the face, airway, major joints, genital area, hands, large body areas or deep tissue require particular concern.",
      questions: [
        {
          question:
            "What is an appropriate immediate measure for a thermal burn?",
          options: [
            "Apply butter",
            "Cool the burn with cool running water",
            "Apply ice directly",
            "Rub the burn vigorously"
          ],
          answer: 1,
          explanation:
            "Cooling the burn with cool running water helps reduce ongoing thermal injury."
        },
        {
          question:
            "Which should generally not be applied directly to a fresh burn?",
          options: [
            "Cool running water",
            "Ice",
            "Appropriate sterile covering when indicated",
            "Clean water"
          ],
          answer: 1,
          explanation:
            "Direct ice application can cause additional tissue injury."
        },
        {
          question:
            "Which burn requires urgent assessment?",
          options: [
            "A large or deep burn",
            "A tiny superficial area with no symptoms",
            "An old healed scar",
            "Normal skin"
          ],
          answer: 0,
          explanation:
            "Large or deep burns can cause serious fluid loss, tissue damage and complications."
        }
      ]
    },

    {
      title: "Module 12 — Fractures",
      explanation: `
        A fracture is a break or disruption in the continuity of a bone.

        Fractures may be closed or open. An open fracture occurs when there is an associated wound that communicates with the fracture area.

        Signs may include pain, swelling, deformity, bruising, inability to use the affected limb and abnormal movement.

        First aid focuses on preventing further injury, supporting the injured area, controlling associated bleeding and obtaining appropriate medical assessment.
      `,
      clinicalApplication: `
        After a fall, a patient may have a painful and deformed limb. The nurse should avoid unnecessary manipulation and support the limb while arranging appropriate assessment and imaging.
      `,
      keyPoints: [
        "Suspect fracture after significant trauma.",
        "Do not unnecessarily manipulate the injured limb.",
        "Support the injured area.",
        "Control bleeding in open injuries.",
        "Arrange appropriate medical assessment."
      ],
      examAlert:
        "Do not attempt to straighten a visibly deformed limb unless specifically trained and required by an emergency protocol.",
      questions: [
        {
          question: "What is a fracture?",
          options: [
            "A bone break",
            "A skin infection",
            "A muscle contraction",
            "A normal joint movement"
          ],
          answer: 0,
          explanation:
            "A fracture is a break or disruption in bone continuity."
        },
        {
          question:
            "Which finding may suggest a fracture?",
          options: [
            "Deformity and severe pain",
            "Normal painless movement",
            "Normal strength",
            "No swelling or tenderness"
          ],
          answer: 0,
          explanation:
            "Pain, swelling and deformity are possible signs of fracture."
        },
        {
          question:
            "What should a first aider avoid with a suspected fracture?",
          options: [
            "Supporting the limb",
            "Unnecessary movement or manipulation",
            "Calling for help",
            "Monitoring the casualty"
          ],
          answer: 1,
          explanation:
            "Unnecessary movement may worsen tissue, nerve or blood vessel damage."
        }
      ]
    },

    {
      title: "Module 13 — Sprains, Strains and Dislocations",
      explanation: `
        A sprain is an injury to a ligament, while a strain involves a muscle or tendon.

        A dislocation occurs when the normal relationship between joint surfaces is lost.

        These injuries may cause pain, swelling, bruising and restricted movement.

        The injured area should be protected and assessed. A suspected dislocation should not be forcefully pushed back into place by an untrained person.
      `,
      clinicalApplication: `
        An athlete who twists an ankle may develop a sprain. Appropriate early care and professional assessment help determine the severity and reduce the risk of complications.
      `,
      keyPoints: [
        "Sprain = ligament injury.",
        "Strain = muscle or tendon injury.",
        "Dislocation = abnormal separation of joint surfaces.",
        "Protect the injured area.",
        "Do not forcefully reduce a suspected dislocation."
      ],
      examAlert:
        "A suspected dislocation should be treated as a significant injury and assessed professionally.",
      questions: [
        {
          question: "A sprain primarily involves injury to a:",
          options: [
            "Ligament",
            "Bone marrow",
            "Lung",
            "Kidney"
          ],
          answer: 0,
          explanation:
            "A sprain is primarily a ligament injury."
        },
        {
          question: "A strain commonly affects a:",
          options: [
            "Muscle or tendon",
            "Tooth only",
            "Lung only",
            "Bone marrow only"
          ],
          answer: 0,
          explanation:
            "Strains affect muscles or tendons."
        },
        {
          question:
            "What should not be done to a suspected dislocation by an untrained person?",
          options: [
            "Support it",
            "Seek medical assessment",
            "Forcefully push it back into position",
            "Monitor the patient"
          ],
          answer: 2,
          explanation:
            "Forceful reduction can damage nerves, blood vessels and other tissues."
        }
      ]
    },

    {
      title: "Module 14 — Head, Neck and Spinal Injuries",
      explanation: `
        Head and spinal injuries can result from falls, road traffic accidents, sports injuries, violence and other trauma.

        Serious injury may occur even when external signs are minimal.

        Warning signs include loss of consciousness, confusion, repeated vomiting, severe headache, weakness, abnormal sensation, seizures or fluid/blood from the nose or ears.

        The casualty should be protected from unnecessary movement, especially when significant trauma is suspected, while airway and breathing are managed.
      `,
      clinicalApplication: `
        After a road traffic accident, a patient complaining of neck pain should not be casually moved or asked to walk. The emergency team should be activated and spinal precautions maintained according to current protocols.
      `,
      keyPoints: [
        "Consider spinal injury after significant trauma.",
        "Avoid unnecessary movement.",
        "Monitor airway and breathing.",
        "Watch for neurological changes.",
        "Seek urgent professional assessment."
      ],
      examAlert:
        "Airway and breathing remain priorities even when spinal injury is suspected.",
      questions: [
        {
          question:
            "Which finding may indicate serious head injury?",
          options: [
            "Repeated vomiting and altered consciousness",
            "Normal alertness",
            "Normal speech and movement",
            "No symptoms"
          ],
          answer: 0,
          explanation:
            "Repeated vomiting and altered consciousness can indicate significant head injury."
        },
        {
          question:
            "What should be avoided when spinal injury is suspected?",
          options: [
            "Unnecessary movement",
            "Monitoring",
            "Calling emergency services",
            "Airway assessment"
          ],
          answer: 0,
          explanation:
            "Unnecessary movement can worsen spinal injury."
        },
        {
          question:
            "What remains a priority even when spinal injury is suspected?",
          options: [
            "Airway and breathing",
            "Hair care",
            "Meal planning",
            "Routine paperwork"
          ],
          answer: 0,
          explanation:
            "Life-threatening airway and breathing problems must be addressed."
        }
      ]
    },

    {
      title: "Module 15 — Poisoning and Toxic Exposure",
      explanation: `
        Poisoning can occur after ingestion, inhalation, injection or skin/eye exposure to harmful substances.

        The substance, amount, route and time of exposure influence the severity of poisoning.

        The first aider should protect themselves, remove the casualty from ongoing exposure when safe, activate emergency assistance and seek specialist poison-control or medical advice.

        Vomiting should not be induced unless specifically instructed by an appropriate medical or poison-control professional.
      `,
      clinicalApplication: `
        A child who accidentally swallows a household chemical requires urgent assessment. The container or product information should be kept if possible because it may help healthcare professionals identify the substance.
      `,
      keyPoints: [
        "Protect the rescuer from exposure.",
        "Identify the substance if possible.",
        "Seek urgent medical advice.",
        "Do not induce vomiting unless specifically instructed.",
        "Monitor airway, breathing and consciousness."
      ],
      examAlert:
        "Never assume that making a poisoning victim vomit is safe. Some substances can cause additional injury during vomiting.",
      questions: [
        {
          question:
            "What should be avoided unless specifically instructed by a professional in poisoning?",
          options: [
            "Calling emergency services",
            "Inducing vomiting",
            "Identifying the substance",
            "Monitoring breathing"
          ],
          answer: 1,
          explanation:
            "Inducing vomiting can worsen injury with certain poisons and should only be done when specifically directed."
        },
        {
          question:
            "Why should the poison container be kept when possible?",
          options: [
            "It can help identify the substance",
            "It guarantees recovery",
            "It prevents all symptoms",
            "It replaces medical assessment"
          ],
          answer: 0,
          explanation:
            "The product information can help healthcare professionals determine appropriate management."
        },
        {
          question:
            "What should be monitored in a severely poisoned patient?",
          options: [
            "Airway, breathing and consciousness",
            "Hair colour",
            "Food preference only",
            "Height only"
          ],
          answer: 0,
          explanation:
            "Poisoning can impair consciousness and breathing, making ABC assessment essential."
        }
      ]
    },

    {
      title: "Module 16 — Electrical Injuries",
      explanation: `
        Electrical injuries can cause burns, internal tissue damage, cardiac arrhythmias and cardiac arrest.

        The rescuer must ensure the electrical source is disconnected before touching the casualty.

        The severity of injury may not be obvious from the skin appearance.

        Any significant electrical injury should receive appropriate medical assessment because serious internal effects may occur.
      `,
      clinicalApplication: `
        If a person is receiving an electrical shock, a nurse or first aider must not touch them while they remain connected to the electrical source. The power must be safely disconnected first.
      `,
      keyPoints: [
        "Ensure electrical safety before touching the casualty.",
        "Electrical injury can cause cardiac arrest.",
        "External burns may underestimate internal injury.",
        "Seek appropriate medical assessment."
      ],
      examAlert:
        "Never become part of the electrical circuit by touching a casualty who is still connected to a live source.",
      questions: [
        {
          question:
            "What should be done before touching a person receiving an electrical shock?",
          options: [
            "Disconnect the electrical source safely",
            "Touch them immediately",
            "Pour oil on them",
            "Give them water"
          ],
          answer: 0,
          explanation:
            "The electrical source must be safely disconnected before approaching the casualty."
        },
        {
          question:
            "Electrical injury can cause:",
          options: [
            "Cardiac arrest",
            "Only mild itching",
            "Only hunger",
            "Improved circulation"
          ],
          answer: 0,
          explanation:
            "Electrical injuries can interfere with cardiac rhythm and may cause cardiac arrest."
        },
        {
          question:
            "Why can electrical injuries be dangerous even with small visible burns?",
          options: [
            "Internal tissue damage may be present",
            "Small burns always heal instantly",
            "Electricity affects only skin",
            "There is never internal damage"
          ],
          answer: 0,
          explanation:
            "Electrical current can travel through deeper tissues and cause internal injury."
        }
      ]
    },

    {
      title: "Module 17 — Drowning and Water Emergencies",
      explanation: `
        Drowning occurs when respiratory impairment results from submersion or immersion in liquid.

        The rescuer must consider their own safety and should avoid entering dangerous water unless appropriately trained and equipped.

        Once the casualty is safely removed, breathing and responsiveness should be assessed and appropriate resuscitation started when required.

        Hypothermia may also occur after prolonged exposure to cold water.
      `,
      clinicalApplication: `
        A person rescued from a swimming pool may appear conscious but still require assessment because respiratory complications can develop after a drowning event.
      `,
      keyPoints: [
        "Rescuer safety is essential.",
        "Remove the casualty from danger safely.",
        "Assess breathing and responsiveness.",
        "Begin appropriate resuscitation when required.",
        "Consider hypothermia."
      ],
      examAlert:
        "Do not place yourself in danger during a water rescue.",
      questions: [
        {
          question:
            "What is an important consideration before attempting a water rescue?",
          options: [
            "Rescuer safety",
            "Giving food",
            "Taking photographs",
            "Ignoring the environment"
          ],
          answer: 0,
          explanation:
            "The rescuer must avoid becoming another casualty."
        },
        {
          question:
            "After safely removing a drowning casualty, what should be assessed?",
          options: [
            "Responsiveness and breathing",
            "Hair colour",
            "Food preference",
            "Height"
          ],
          answer: 0,
          explanation:
            "Breathing and responsiveness determine the immediate emergency response."
        },
        {
          question:
            "What additional problem may occur after cold-water immersion?",
          options: [
            "Hypothermia",
            "Improved body temperature",
            "Hypertension only",
            "Better circulation"
          ],
          answer: 0,
          explanation:
            "Prolonged exposure to cold water can result in hypothermia."
        }
      ]
    },

    {
      title: "Module 18 — Heat Emergencies",
      explanation: `
        Heat-related illnesses occur when the body is exposed to excessive heat and cannot adequately regulate temperature.

        Heat exhaustion may involve heavy sweating, weakness, dizziness, headache, nausea and thirst.

        Heat stroke is a medical emergency characterized by severe impairment of thermoregulation and potentially altered mental status.

        The person should be moved away from the heat, cooled appropriately and urgent medical assistance obtained when heat stroke is suspected.
      `,
      clinicalApplication: `
        Outdoor workers, athletes, children and older adults may be vulnerable to heat-related illness. Nurses should recognize worsening symptoms early and initiate appropriate emergency management.
      `,
      keyPoints: [
        "Heat exhaustion can progress to heat stroke.",
        "Heat stroke is a medical emergency.",
        "Move the person away from heat.",
        "Begin appropriate cooling.",
        "Obtain urgent medical assistance for suspected heat stroke."
      ],
      examAlert:
        "Altered mental status in a severely overheated person is a major warning sign requiring emergency action.",
      questions: [
        {
          question:
            "Which condition is a medical emergency?",
          options: [
            "Heat stroke",
            "Mild thirst",
            "Normal sweating",
            "Mild hunger"
          ],
          answer: 0,
          explanation:
            "Heat stroke can rapidly cause brain and organ damage and requires emergency treatment."
        },
        {
          question:
            "Which finding may occur with heat exhaustion?",
          options: [
            "Weakness and heavy sweating",
            "Perfectly normal condition",
            "Improved strength",
            "Low body temperature from cold exposure"
          ],
          answer: 0,
          explanation:
            "Heat exhaustion commonly causes weakness, sweating, dizziness and other symptoms."
        },
        {
          question:
            "What is an important action during heat illness?",
          options: [
            "Move the person away from excessive heat",
            "Keep them in direct sunlight",
            "Give alcohol",
            "Encourage strenuous exercise"
          ],
          answer: 0,
          explanation:
            "Removing the person from heat is an important first step."
        }
      ]
    },

    {
      title: "Module 19 — Hypothermia and Cold Emergencies",
      explanation: `
        Hypothermia occurs when the body's core temperature falls dangerously low.

        It may occur after prolonged exposure to cold weather, cold water or inadequate protection.

        Early symptoms may include shivering, cold skin, fatigue and confusion. As hypothermia worsens, shivering may stop and consciousness can deteriorate.

        The casualty should be moved to a warmer environment, wet clothing removed when appropriate, and gentle rewarming provided while urgent medical assistance is obtained for significant hypothermia.
      `,
      clinicalApplication: `
        A patient rescued after prolonged exposure to cold water may require careful assessment for hypothermia, especially if they are confused or becoming less responsive.
      `,
      keyPoints: [
        "Hypothermia is dangerous.",
        "Move the person away from cold exposure.",
        "Remove wet clothing when appropriate.",
        "Rewarm gradually and appropriately.",
        "Severe hypothermia requires urgent medical care."
      ],
      examAlert:
        "Stopping of shivering in a severely hypothermic patient can indicate deterioration rather than improvement.",
      questions: [
        {
          question: "What is hypothermia?",
          options: [
            "Dangerously low body temperature",
            "High blood glucose",
            "High body temperature",
            "Normal temperature"
          ],
          answer: 0,
          explanation:
            "Hypothermia occurs when core body temperature falls below the normal range to a dangerous level."
        },
        {
          question:
            "Which finding can occur in early hypothermia?",
          options: [
            "Shivering",
            "Severe sweating from heat",
            "High fever",
            "Normal warm skin"
          ],
          answer: 0,
          explanation:
            "Shivering is a common early response to cold exposure."
        },
        {
          question:
            "Why can stopping of shivering be concerning in severe hypothermia?",
          options: [
            "It may indicate worsening temperature regulation",
            "It always means full recovery",
            "It means the patient is hungry",
            "It means the patient is cured"
          ],
          answer: 0,
          explanation:
            "Severe hypothermia can impair the body's ability to shiver, indicating deterioration."
        }
      ]
    },

    {
      title: "Module 20 — Seizures",
      explanation: `
        A seizure is a sudden episode of abnormal electrical activity in the brain.

        During a generalized seizure, the person may lose consciousness, stiffen, jerk and become temporarily unresponsive.

        The first aider should protect the person from injury, remove nearby hazards and allow the seizure to run its course without restraining the person or placing objects in their mouth.

        After the seizure, the person's airway and breathing should be assessed and appropriate medical assistance obtained when indicated.
      `,
      clinicalApplication: `
        A patient experiencing a seizure in a ward should be protected from nearby hazards. Staff should not attempt to force objects into the patient's mouth.
      `,
      keyPoints: [
        "Protect the person from injury.",
        "Do not restrain seizure movements.",
        "Do not put objects in the mouth.",
        "Monitor breathing after the seizure.",
        "Seek emergency assistance when appropriate."
      ],
      examAlert:
        "Never put a spoon, finger or other object into the mouth of a person having a seizure.",
      questions: [
        {
          question:
            "What should a first aider do during a seizure?",
          options: [
            "Protect the person from injury",
            "Force the mouth open",
            "Put an object in the mouth",
            "Restrain all movements"
          ],
          answer: 0,
          explanation:
            "The priority is to protect the person from injury while allowing the seizure to occur safely."
        },
        {
          question:
            "Which action should be avoided during a seizure?",
          options: [
            "Removing nearby hazards",
            "Protecting the head",
            "Putting an object in the person's mouth",
            "Monitoring the person"
          ],
          answer: 2,
          explanation:
            "Objects should not be placed in the mouth because this can cause injury or airway problems."
        },
        {
          question:
            "What should be assessed after a seizure?",
          options: [
            "Airway and breathing",
            "Hair length",
            "Food preference only",
            "Height"
          ],
          answer: 0,
          explanation:
            "Airway and breathing should be assessed after the seizure."
        }
      ]
    },

    {
      title: "Module 21 — Fainting and Loss of Consciousness",
      explanation: `
        Fainting, or syncope, is a temporary loss of consciousness caused by reduced blood flow to the brain.

        It can result from prolonged standing, dehydration, emotional stress, pain, low blood pressure or other medical conditions.

        A person who faints should be assessed for injuries and monitored for recovery.

        Loss of consciousness can also result from serious conditions such as cardiac problems, stroke, seizures, hypoglycaemia or head injury, so unexplained or prolonged unconsciousness requires medical evaluation.
      `,
      clinicalApplication: `
        If a student suddenly faints during a clinical session, the nurse should assess responsiveness, breathing and possible injury rather than assuming that the episode is harmless.
      `,
      keyPoints: [
        "Fainting is temporary loss of consciousness.",
        "Assess breathing and responsiveness.",
        "Check for injuries.",
        "Identify possible underlying causes.",
        "Unexplained or prolonged unconsciousness needs medical assessment."
      ],
      examAlert:
        "Do not automatically assume every collapse is simple fainting. Serious medical conditions can present with loss of consciousness.",
      questions: [
        {
          question: "What is syncope?",
          options: [
            "Temporary loss of consciousness",
            "Permanent paralysis",
            "Skin infection",
            "Bone fracture"
          ],
          answer: 0,
          explanation:
            "Syncope is a temporary loss of consciousness caused by transient reduction in cerebral perfusion."
        },
        {
          question:
            "What should be assessed after a person faints?",
          options: [
            "Responsiveness, breathing and possible injuries",
            "Hair colour",
            "Clothing brand",
            "Food preference only"
          ],
          answer: 0,
          explanation:
            "The patient should be assessed for immediate life threats and injuries."
        },
        {
          question:
            "Why should unexplained loss of consciousness be taken seriously?",
          options: [
            "It may have a serious underlying cause",
            "It is always harmless",
            "It always means hunger",
            "It never requires assessment"
          ],
          answer: 0,
          explanation:
            "Loss of consciousness can be caused by serious cardiovascular, neurological or metabolic conditions."
        }
      ]
    },

    {
      title: "Module 22 — Anaphylaxis and Severe Allergic Reactions",
      explanation: `
        Anaphylaxis is a severe, potentially life-threatening allergic reaction.

        It may cause difficulty breathing, swelling of the lips or tongue, wheezing, widespread skin reactions, dizziness, collapse and shock.

        Anaphylaxis requires immediate emergency treatment. If the person has a prescribed adrenaline auto-injector and is trained to use it, it should be used according to instructions while emergency medical assistance is activated.

        The casualty should be monitored closely because symptoms can progress rapidly.
      `,
      clinicalApplication: `
        A patient may develop anaphylaxis after medication administration, insect stings or exposure to certain foods. Rapid recognition and immediate emergency management can be lifesaving.
      `,
      keyPoints: [
        "Anaphylaxis is life-threatening.",
        "Airway and breathing problems are major concerns.",
        "Activate emergency medical assistance immediately.",
        "Use prescribed emergency adrenaline according to appropriate training and instructions.",
        "Monitor continuously."
      ],
      examAlert:
        "Anaphylaxis can progress rapidly. Do not delay emergency treatment while waiting for symptoms to disappear.",
      questions: [
        {
          question: "What is anaphylaxis?",
          options: [
            "A severe potentially life-threatening allergic reaction",
            "A minor skin condition",
            "A fracture",
            "A normal immune response"
          ],
          answer: 0,
          explanation:
            "Anaphylaxis is a severe systemic allergic reaction that can rapidly become fatal."
        },
        {
          question:
            "Which finding may suggest anaphylaxis?",
          options: [
            "Difficulty breathing and swelling of the tongue",
            "Normal breathing",
            "Normal skin with no symptoms",
            "Mild hunger"
          ],
          answer: 0,
          explanation:
            "Airway swelling and respiratory difficulty are important signs of anaphylaxis."
        },
        {
          question:
            "What is important when anaphylaxis is suspected?",
          options: [
            "Delay treatment",
            "Activate emergency assistance promptly",
            "Ask the patient to exercise",
            "Give alcohol"
          ],
          answer: 1,
          explanation:
            "Anaphylaxis is time-critical and requires immediate emergency response."
        }
      ]
    },

    {
      title: "Module 23 — Stroke Recognition",
      explanation: `
        A stroke occurs when blood flow to part of the brain is interrupted or when bleeding occurs within the brain.

        Stroke symptoms often begin suddenly. Important warning signs include facial weakness, arm weakness, speech difficulty, sudden vision problems, severe dizziness or sudden severe headache.

        A simple recognition approach is FAST:

        F — Face drooping
        A — Arm weakness
        S — Speech difficulty
        T — Time to seek emergency help

        Rapid recognition is important because some stroke treatments are time-dependent.
      `,
      clinicalApplication: `
        If a patient suddenly develops facial drooping and difficulty speaking, the nurse should treat the situation as an emergency and activate the appropriate stroke pathway.
      `,
      keyPoints: [
        "Stroke symptoms often begin suddenly.",
        "Recognize facial weakness.",
        "Check for arm weakness.",
        "Assess speech.",
        "Time is critical."
      ],
      examAlert:
        "FAST is a useful memory aid for recognizing common stroke symptoms.",
      questions: [
        {
          question: "What does the F in FAST represent?",
          options: [
            "Fever",
            "Face drooping",
            "Fluid",
            "Fracture"
          ],
          answer: 1,
          explanation:
            "F represents facial drooping."
        },
        {
          question: "What does the S in FAST represent?",
          options: [
            "Shock",
            "Speech difficulty",
            "Skin",
            "Spine"
          ],
          answer: 1,
          explanation:
            "S represents speech difficulty."
        },
        {
          question:
            "Why is rapid stroke recognition important?",
          options: [
            "Some treatments are time-dependent",
            "Stroke always resolves immediately",
            "It prevents all diseases",
            "It replaces hospital care"
          ],
          answer: 0,
          explanation:
            "Some stroke treatments are most effective when given within specific time windows."
        }
      ]
    },

    {
      title: "Module 24 — Diabetic Emergencies",
      explanation: `
        People with diabetes can develop emergencies involving very low or very high blood glucose.

        Hypoglycaemia may cause sweating, trembling, hunger, dizziness, confusion, behavioural changes, seizures or unconsciousness.

        A conscious person who is able to swallow may require a rapidly absorbed source of glucose according to their diabetes care plan and current clinical guidance.

        An unconscious person should not be given food or drink by mouth because of the risk of aspiration. Emergency medical assistance is required.
      `,
      clinicalApplication: `
        A diabetic patient who becomes confused and sweaty during a clinical session may have hypoglycaemia. Blood glucose should be checked when appropriate and immediate management initiated according to the patient's condition and clinical protocol.
      `,
      keyPoints: [
        "Hypoglycaemia can become life-threatening.",
        "Recognize sweating, tremor and confusion.",
        "Treat conscious patients who can safely swallow according to protocol.",
        "Do not give oral food or fluids to an unconscious patient.",
        "Seek emergency help when severe symptoms occur."
      ],
      examAlert:
        "Never give food or drink by mouth to an unconscious patient because of aspiration risk.",
      questions: [
        {
          question:
            "Which finding may indicate hypoglycaemia?",
          options: [
            "Sweating and trembling",
            "Normal alertness with no symptoms",
            "Improved concentration",
            "Warm dry skin only"
          ],
          answer: 0,
          explanation:
            "Sweating, tremor and confusion are common symptoms of low blood glucose."
        },
        {
          question:
            "What should not be given orally to an unconscious diabetic patient?",
          options: [
            "Food or drink",
            "Nothing",
            "Emergency medical assistance",
            "Monitoring"
          ],
          answer: 0,
          explanation:
            "Oral food or drink can be aspirated by an unconscious patient."
        },
        {
          question:
            "Why is severe hypoglycaemia dangerous?",
          options: [
            "The brain depends heavily on glucose",
            "It always causes infection",
            "It increases bone strength",
            "It improves oxygenation"
          ],
          answer: 0,
          explanation:
            "The brain requires glucose for normal function, so severe hypoglycaemia can cause seizures, coma and death."
        }
      ]
    },

    {
      title: "Module 25 — Emergency Communication and Handover",
      explanation: `
        Effective communication is essential during emergencies.

        The person reporting an emergency should provide clear information about what happened, the patient's condition, location and immediate needs.

        Healthcare workers should communicate observations accurately and avoid assumptions.

        Structured handover systems help ensure important information is not omitted when transferring a patient between healthcare professionals.
      `,
      clinicalApplication: `
        When calling an emergency response team, a nurse should clearly state the patient's location, condition, major findings and what interventions have already been performed.
      `,
      keyPoints: [
        "Communicate clearly and calmly.",
        "State the patient's location.",
        "Describe the emergency and major findings.",
        "Report interventions already performed.",
        "Use structured handover when transferring care."
      ],
      examAlert:
        "During emergencies, communication should be concise, factual and focused on information that affects immediate patient care.",
      questions: [
        {
          question:
            "Which information is important when calling an emergency response team?",
          options: [
            "Patient location and condition",
            "The nurse's favourite food",
            "Unrelated personal information",
            "The weather only"
          ],
          answer: 0,
          explanation:
            "The emergency team needs the patient's location, condition and relevant clinical information."
        },
        {
          question:
            "Emergency communication should be:",
          options: [
            "Clear and concise",
            "Confusing",
            "Unrelated",
            "Delayed unnecessarily"
          ],
          answer: 0,
          explanation:
            "Clear and concise communication improves emergency response."
        },
        {
          question:
            "Why is structured handover useful?",
          options: [
            "It reduces the risk of important information being missed",
            "It replaces assessment",
            "It prevents all complications",
            "It eliminates documentation"
          ],
          answer: 0,
          explanation:
            "Structured communication helps ensure important clinical information is transferred."
        }
      ]
    },

    {
      title: "Module 26 — Infection Prevention During First Aid",
      explanation: `
        First aid should be provided while minimizing the risk of infection transmission.

        Hand hygiene, gloves, masks, eye protection and other personal protective equipment should be used according to the situation and available resources.

        Blood and body fluids should be treated as potentially infectious.

        Used dressings, gloves and other contaminated materials should be disposed of safely according to local infection-prevention procedures.
      `,
      clinicalApplication: `
        When controlling bleeding, a nurse should use appropriate barrier protection and perform hand hygiene before and after patient contact.
      `,
      keyPoints: [
        "Perform hand hygiene.",
        "Use appropriate PPE.",
        "Treat blood and body fluids as potentially infectious.",
        "Dispose of contaminated materials safely.",
        "Prevent cross-contamination."
      ],
      examAlert:
        "Protect both the casualty and the rescuer from infection transmission.",
      questions: [
        {
          question:
            "Which PPE is commonly useful when managing bleeding?",
          options: [
            "Gloves",
            "Sunglasses only",
            "No protection",
            "Shoes only"
          ],
          answer: 0,
          explanation:
            "Gloves provide barrier protection when handling blood and body fluids."
        },
        {
          question:
            "How should blood and body fluids be treated?",
          options: [
            "As potentially infectious",
            "As always harmless",
            "As clean water",
            "As non-biological material"
          ],
          answer: 0,
          explanation:
            "Blood and body fluids should be handled using appropriate infection-prevention precautions."
        },
        {
          question:
            "What is an important infection-prevention measure after first aid?",
          options: [
            "Hand hygiene",
            "Touching other patients immediately",
            "Reusing contaminated gloves",
            "Ignoring contamination"
          ],
          answer: 0,
          explanation:
            "Hand hygiene reduces the risk of transmitting infectious organisms."
        }
      ]
    },

    {
      title: "Module 27 — Emergency Triage and Prioritization",
      explanation: `
        Triage is the process of determining the priority of patients according to the severity and urgency of their conditions.

        In a mass-casualty incident, resources may be limited, so patients are assessed and categorized according to immediate needs.

        Life-threatening problems such as airway obstruction, severe bleeding and severe breathing difficulty receive high priority.

        Triage requires rapid assessment, clear communication and continuous reassessment because a patient's condition can change.
      `,
      clinicalApplication: `
        After a major road traffic accident involving several casualties, emergency staff must quickly identify patients with immediately life-threatening problems and prioritize care appropriately.
      `,
      keyPoints: [
        "Triage prioritizes patients according to urgency.",
        "Life-threatening conditions receive high priority.",
        "Mass casualties may involve limited resources.",
        "Patients require reassessment.",
        "Triage is not simply first-come, first-served."
      ],
      examAlert:
        "In emergency triage, the sickest patients are prioritized according to urgency and available resources, not merely arrival time.",
      questions: [
        {
          question: "What is triage?",
          options: [
            "Prioritizing patients according to urgency",
            "Giving everyone identical treatment",
            "Discharging all patients",
            "Taking a patient's temperature only"
          ],
          answer: 0,
          explanation:
            "Triage determines treatment priority based on the severity and urgency of conditions."
        },
        {
          question:
            "Which condition should receive high priority?",
          options: [
            "Severe airway obstruction",
            "Minor scratch",
            "Old scar",
            "Mild headache with no warning signs"
          ],
          answer: 0,
          explanation:
            "Severe airway obstruction is immediately life-threatening."
        },
        {
          question:
            "Why is reassessment important during triage?",
          options: [
            "Patient conditions can change",
            "It makes documentation longer",
            "It prevents all illness",
            "It replaces treatment"
          ],
          answer: 0,
          explanation:
            "Patients may deteriorate or improve, so triage decisions may need to be updated."
        }
      ]
    },

    {
      title: "Module 28 — Comprehensive First Aid Revision",
      explanation: `
        This final module brings together the major principles of first aid and emergency care.

        Always begin with scene safety and use appropriate personal protection. Perform a rapid primary assessment and identify life-threatening problems.

        Airway, breathing and circulation remain central priorities. Severe bleeding must be controlled rapidly. Cardiac arrest requires immediate activation of emergency response and appropriate CPR. Trauma patients should be protected from further injury.

        Nurses must also recognize emergencies such as stroke, anaphylaxis, seizures, diabetic emergencies, poisoning, burns, drowning, heat illness and hypothermia.

        Good emergency care combines clinical knowledge, rapid assessment, practical skills, teamwork, communication, documentation and continuous reassessment.
      `,
      clinicalApplication: `
        In real clinical practice, several emergencies may occur simultaneously. The nurse must prioritize life-threatening problems, call for help, provide appropriate immediate care, reassess the patient and communicate clearly with the emergency team.
      `,
      keyPoints: [
        "Protect yourself and the casualty.",
        "Use ABCDE systematically.",
        "Treat life-threatening conditions first.",
        "Activate emergency assistance early.",
        "Control severe bleeding.",
        "Recognize cardiac arrest and begin CPR promptly.",
        "Recognize stroke and anaphylaxis early.",
        "Protect trauma patients from unnecessary movement.",
        "Prevent infection transmission.",
        "Reassess continuously."
      ],
      examAlert:
        "For examinations, focus on priorities: scene safety, ABCDE, airway and breathing, severe bleeding, CPR, shock, trauma, burns, poisoning, anaphylaxis, stroke and infection prevention.",
      questions: [
        {
          question:
            "What should generally be considered before approaching an emergency scene?",
          options: [
            "Scene safety",
            "The patient's meal",
            "The patient's occupation only",
            "Discharge planning"
          ],
          answer: 0,
          explanation:
            "The rescuer must ensure the scene is safe before approaching."
        },
        {
          question:
            "Which sequence is commonly used for a primary emergency assessment?",
          options: [
            "ABCDE",
            "ZYXWV",
            "SOAP only",
            "Nutrition first"
          ],
          answer: 0,
          explanation:
            "ABCDE is a widely used framework for rapid identification of life-threatening problems."
        },
        {
          question:
            "Which condition requires immediate emergency action?",
          options: [
            "Cardiac arrest",
            "Old healed scar",
            "Mild dry skin",
            "Normal appetite"
          ],
          answer: 0,
          explanation:
            "Cardiac arrest is immediately life-threatening and requires prompt resuscitation."
        },
        {
          question:
            "A patient with severe external bleeding should first receive attention to:",
          options: [
            "Bleeding control",
            "Long-term diet planning",
            "Routine appointment scheduling",
            "Health promotion"
          ],
          answer: 0,
          explanation:
            "Life-threatening haemorrhage must be controlled immediately."
        },
        {
          question:
            "Which condition should be recognized using FAST?",
          options: [
            "Stroke",
            "Fracture",
            "Burn",
            "Poisoning"
          ],
          answer: 0,
          explanation:
            "FAST is a commonly used recognition aid for stroke symptoms."
        }
      ]
    }

  ]
},
    // ========================================================
    // 4. FUNDAMENTALS OF NURSING
    // ========================================================
"fundamentals-nursing": {
  title: "Fundamentals of Nursing",
  description:
    "A comprehensive nursing foundation covering professional practice, nursing process, communication, assessment, patient safety, infection prevention, vital signs, medication administration, mobility, hygiene, nutrition, elimination, oxygenation, pain, wound care, documentation, ethics and clinical judgment.",

  lessons: [

    {
      title: "Module 1 — Introduction to Nursing",
      explanation: `
        Nursing is a professional discipline concerned with promoting health, preventing illness, caring for people who are ill or injured, supporting recovery, relieving suffering and helping patients achieve the highest possible level of health and independence.

        Nursing care is holistic. A nurse does not look only at a disease or diagnosis. The nurse considers physical, psychological, social, cultural, developmental and spiritual needs.

        Modern nursing also involves health education, advocacy, clinical judgment, evidence-based practice, teamwork, safety and coordination of care.

        The nurse's role changes according to the clinical setting. Nurses may work in hospitals, clinics, communities, schools, homes, emergency departments, operating rooms, mental health facilities and many other environments.
      `,
      clinicalApplication: `
        A patient admitted with pneumonia needs more than medication. The nurse assesses breathing, nutrition, hydration, comfort, emotional concerns, safety, education and response to treatment.
      `,
      keyPoints: [
        "Nursing is both a profession and a discipline.",
        "Nursing care should be holistic.",
        "Patient safety is a major nursing responsibility.",
        "Nurses provide education and advocacy.",
        "Nurses work as members of multidisciplinary teams."
      ],
      examAlert:
        "Think beyond the disease. Nursing care addresses the whole person and the patient's response to health conditions.",
      questions: [
        {
          question: "Which best describes holistic nursing care?",
          options: [
            "Treating only the diagnosed disease",
            "Considering the patient's physical, psychological, social and other needs",
            "Giving medication without assessment",
            "Focusing only on laboratory results"
          ],
          answer: 1,
          explanation:
            "Holistic nursing considers the whole person rather than focusing only on the disease."
        },
        {
          question: "Which is an important nursing responsibility?",
          options: [
            "Ignoring patient concerns",
            "Promoting patient safety",
            "Avoiding patient education",
            "Making all medical diagnoses independently"
          ],
          answer: 1,
          explanation:
            "Promoting safety is a fundamental nursing responsibility."
        },
        {
          question: "A nurse who teaches a patient how to manage a chronic condition is performing:",
          options: [
            "Patient education",
            "Surgery",
            "Radiography",
            "Laboratory analysis"
          ],
          answer: 0,
          explanation:
            "Teaching patients is an important component of nursing practice."
        }
      ]
    },

    {
      title: "Module 2 — Nursing Roles and Responsibilities",
      explanation: `
        Nurses perform many roles depending on the patient's needs and the practice setting.

        Common roles include caregiver, educator, advocate, communicator, collaborator, leader, coordinator and health promoter.

        Advocacy means supporting the patient's rights, preferences, safety and access to appropriate care.

        Nurses also have a responsibility to practice within their scope, maintain competence, follow professional standards and seek assistance when a task exceeds their knowledge or authority.
      `,
      clinicalApplication: `
        If a patient does not understand a proposed procedure, the nurse should help the patient obtain understandable information and communicate concerns to the appropriate healthcare professional.
      `,
      keyPoints: [
        "Nurses provide direct care.",
        "Nurses educate patients and families.",
        "Nurses advocate for patients.",
        "Nurses collaborate with healthcare professionals.",
        "Nurses must practice within their scope of competence."
      ],
      examAlert:
        "The nurse is not expected to perform tasks outside their competence simply because someone asks them to.",
      questions: [
        {
          question: "Which nursing role involves protecting patient rights?",
          options: [
            "Advocate",
            "Cleaner",
            "Architect",
            "Accountant"
          ],
          answer: 0,
          explanation:
            "Advocacy involves supporting patient rights, preferences and safety."
        },
        {
          question:
            "What should a nurse do when a task is outside their competence?",
          options: [
            "Perform it secretly",
            "Seek appropriate assistance or supervision",
            "Ignore the patient",
            "Guess how to perform it"
          ],
          answer: 1,
          explanation:
            "Safe practice requires nurses to recognize their limitations and obtain appropriate assistance."
        },
        {
          question: "Which is a nursing role?",
          options: [
            "Patient educator",
            "Aircraft pilot",
            "Civil engineer",
            "Bank manager"
          ],
          answer: 0,
          explanation:
            "Patient education is an important nursing responsibility."
        }
      ]
    },

    {
      title: "Module 3 — Caring and Therapeutic Nursing Relationships",
      explanation: `
        Caring is central to nursing practice. Therapeutic nursing relationships are purposeful relationships established to promote patient health and wellbeing.

        Professional boundaries are important. A nurse should be compassionate and respectful without developing inappropriate personal or financial relationships with patients.

        Trust is built through honesty, confidentiality, respect, consistency and appropriate communication.

        The nurse should recognize the patient's individuality and involve the patient in decisions whenever possible.
      `,
      clinicalApplication: `
        A nurse caring for an anxious patient should listen attentively, acknowledge the patient's concerns and provide appropriate information rather than dismissing the patient's feelings.
      `,
      keyPoints: [
        "Caring is central to nursing.",
        "Maintain professional boundaries.",
        "Respect patient individuality.",
        "Build trust through honesty and consistency.",
        "Promote patient participation."
      ],
      examAlert:
        "Professional caring does not mean becoming personally involved with the patient.",
      questions: [
        {
          question: "What is important in a therapeutic relationship?",
          options: [
            "Professional boundaries",
            "Financial relationships",
            "Personal dependence",
            "Secret communication"
          ],
          answer: 0,
          explanation:
            "Professional boundaries protect both patients and nurses."
        },
        {
          question:
            "Which action helps build trust?",
          options: [
            "Honest communication",
            "Ignoring questions",
            "Breaking confidentiality",
            "Making false promises"
          ],
          answer: 0,
          explanation:
            "Honesty and reliable communication promote trust."
        },
        {
          question:
            "A nurse listening carefully to a patient's concerns demonstrates:",
          options: [
            "Therapeutic communication",
            "Negligence",
            "Isolation",
            "Avoidance"
          ],
          answer: 0,
          explanation:
            "Active and respectful listening is part of therapeutic communication."
        }
      ]
    },

    {
      title: "Module 4 — Communication in Nursing",
      explanation: `
        Communication is essential for safe nursing practice.

        Verbal communication includes spoken words, tone and pace. Nonverbal communication includes facial expression, posture, eye contact, gestures and personal space.

        Therapeutic communication encourages patients to express concerns and participate in care.

        Examples include open-ended questions, active listening, clarification, reflection, summarizing and appropriate silence.

        Barriers may include language differences, hearing impairment, anxiety, pain, cultural differences, environmental noise and the use of medical terminology that the patient does not understand.
      `,
      clinicalApplication: `
        Instead of asking a patient, "You are not having pain, are you?", a nurse can ask, "Can you describe how you are feeling right now?" This encourages a more complete response.
      `,
      keyPoints: [
        "Communication must be clear and patient-centered.",
        "Use active listening.",
        "Avoid unnecessary medical jargon.",
        "Use interpreters when appropriate.",
        "Observe nonverbal communication."
      ],
      examAlert:
        "Open-ended questions usually encourage patients to provide more information than yes/no questions.",
      questions: [
        {
          question:
            "Which is an example of an open-ended question?",
          options: [
            "Are you in pain?",
            "Can you describe your pain?",
            "Is your pain gone?",
            "Did you sleep?"
          ],
          answer: 1,
          explanation:
            "Asking the patient to describe the pain allows a broader response."
        },
        {
          question: "Which is nonverbal communication?",
          options: [
            "Posture",
            "Written prescription",
            "Laboratory result",
            "Medication label"
          ],
          answer: 0,
          explanation:
            "Posture is an example of nonverbal communication."
        },
        {
          question:
            "What should a nurse do when a language barrier exists?",
          options: [
            "Pretend to understand",
            "Use an appropriate interpreter",
            "Speak louder regardless of the problem",
            "Ignore the patient"
          ],
          answer: 1,
          explanation:
            "An appropriate interpreter helps promote accurate and safe communication."
        }
      ]
    },

    {
      title: "Module 5 — Nursing Process",
      explanation: `
        The nursing process provides a systematic framework for patient care.

        The commonly taught steps are:

        Assessment — collecting patient information.
        Diagnosis — identifying nursing problems or responses.
        Planning — establishing priorities, goals and interventions.
        Implementation — carrying out planned nursing interventions.
        Evaluation — determining whether goals were achieved and modifying care when necessary.

        The process is dynamic rather than strictly linear. New information can cause the nurse to reassess and change the care plan.
      `,
      clinicalApplication: `
        If a patient's breathing worsens after an initial assessment, the nurse does not continue following an outdated plan. The patient is reassessed and the plan is modified according to the new findings.
      `,
      keyPoints: [
        "Assessment comes first.",
        "Nursing diagnosis identifies patient responses or problems.",
        "Planning establishes goals and interventions.",
        "Implementation carries out care.",
        "Evaluation determines patient response."
      ],
      examAlert:
        "Remember ADPIE: Assessment, Diagnosis, Planning, Implementation, Evaluation.",
      questions: [
        {
          question: "What is the first step of the nursing process?",
          options: [
            "Assessment",
            "Implementation",
            "Evaluation",
            "Planning"
          ],
          answer: 0,
          explanation:
            "Assessment involves collecting information and is the first step."
        },
        {
          question: "Which step determines whether goals were achieved?",
          options: [
            "Evaluation",
            "Assessment",
            "Diagnosis",
            "Implementation"
          ],
          answer: 0,
          explanation:
            "Evaluation determines the patient's response and whether planned outcomes were achieved."
        },
        {
          question: "ADPIE stands for:",
          options: [
            "Assessment, Diagnosis, Planning, Implementation, Evaluation",
            "Airway, Diagnosis, Pulse, Infection, Emergency",
            "Assessment, Drug, Procedure, Infection, Education",
            "Admission, Diagnosis, Planning, Inspection, Emergency"
          ],
          answer: 0,
          explanation:
            "ADPIE is a common memory aid for the nursing process."
        }
      ]
    },

    {
      title: "Module 6 — Nursing Assessment",
      explanation: `
        Nursing assessment involves systematic collection of subjective and objective information.

        Subjective data are information reported by the patient, such as pain, nausea or feelings.

        Objective data are observable or measurable findings, such as temperature, blood pressure, wound appearance or oxygen saturation.

        Assessment methods include interviewing, observation, physical examination and review of available clinical information.

        Accurate assessment provides the foundation for appropriate nursing decisions.
      `,
      clinicalApplication: `
        A patient saying "I feel short of breath" provides subjective data. A respiratory rate of 30 breaths per minute is objective data.
      `,
      keyPoints: [
        "Subjective data come from the patient's report.",
        "Objective data can be observed or measured.",
        "Assessment should be systematic.",
        "Accurate assessment supports clinical judgment."
      ],
      examAlert:
        "Patient-reported symptoms are subjective; measurable or observable findings are objective.",
      questions: [
        {
          question:
            "Which is subjective data?",
          options: [
            "Blood pressure of 140/90 mmHg",
            "Patient reports severe pain",
            "Temperature of 38.5°C",
            "Pulse rate of 110 beats/minute"
          ],
          answer: 1,
          explanation:
            "Pain reported by the patient is subjective data."
        },
        {
          question:
            "Which is objective data?",
          options: [
            "I feel dizzy",
            "I am anxious",
            "Temperature of 39°C",
            "My stomach hurts"
          ],
          answer: 2,
          explanation:
            "Temperature is a measurable objective finding."
        },
        {
          question:
            "Why is assessment important?",
          options: [
            "It provides information for nursing decisions",
            "It eliminates the need for observation",
            "It replaces all treatment",
            "It prevents every disease"
          ],
          answer: 0,
          explanation:
            "Assessment provides information used to identify problems and plan care."
        }
      ]
    },

    {
      title: "Module 7 — Critical Thinking and Clinical Judgment",
      explanation: `
        Critical thinking allows nurses to analyze information rather than simply memorizing facts.

        Clinical judgment involves recognizing important findings, interpreting them, identifying priorities, taking appropriate action and evaluating the patient's response.

        Nurses should distinguish important findings from irrelevant information.

        Trends are often more meaningful than a single isolated result. A patient's changing vital signs, mental status or symptoms may indicate deterioration.
      `,
      clinicalApplication: `
        A patient whose respiratory rate, heart rate and oxygen saturation are progressively worsening may require urgent reassessment even if each individual value initially appeared only mildly abnormal.
      `,
      keyPoints: [
        "Analyze rather than simply memorize.",
        "Identify significant findings.",
        "Prioritize life-threatening problems.",
        "Consider trends.",
        "Reassess response to interventions."
      ],
      examAlert:
        "NCLEX-style questions often ask which patient should be seen first. Think airway, breathing, circulation, safety and acute deterioration.",
      questions: [
        {
          question:
            "What is an important component of clinical judgment?",
          options: [
            "Recognizing and prioritizing significant findings",
            "Ignoring abnormal findings",
            "Treating every patient identically",
            "Avoiding reassessment"
          ],
          answer: 0,
          explanation:
            "Clinical judgment requires recognition and prioritization of important patient findings."
        },
        {
          question:
            "Why are trends important?",
          options: [
            "They can show deterioration or improvement",
            "They eliminate the need for assessment",
            "They are always normal",
            "They replace patient communication"
          ],
          answer: 0,
          explanation:
            "Changes over time can reveal clinically important deterioration or improvement."
        },
        {
          question:
            "Which problem generally receives highest priority?",
          options: [
            "Acute airway compromise",
            "Old healed scar",
            "Mild dry skin",
            "Routine discharge teaching"
          ],
          answer: 0,
          explanation:
            "Airway compromise is immediately life-threatening."
        }
      ]
    },

    {
      title: "Module 8 — Patient Safety",
      explanation: `
        Patient safety means reducing preventable harm during healthcare.

        Common safety concerns include falls, medication errors, infection transmission, pressure injuries, incorrect patient identification, equipment hazards and communication failures.

        Nurses contribute to safety by assessing risks, following policies, communicating clearly, verifying information and reporting hazards.

        Safety interventions should be individualized. A patient at high risk of falling may need appropriate assistance, environmental modifications and close observation.
      `,
      clinicalApplication: `
        Before assisting a weak patient to walk, the nurse should assess mobility, ensure appropriate footwear and equipment, clear obstacles and use assistance according to the patient's needs.
      `,
      keyPoints: [
        "Assess patient-specific risks.",
        "Prevent falls.",
        "Verify patient identity.",
        "Communicate important information.",
        "Report hazards and safety incidents."
      ],
      examAlert:
        "Safety questions often test prevention. Identify the risk before the patient is harmed.",
      questions: [
        {
          question:
            "Which action promotes patient safety?",
          options: [
            "Leaving obstacles in the patient's path",
            "Identifying fall risks",
            "Ignoring medication allergies",
            "Skipping patient identification"
          ],
          answer: 1,
          explanation:
            "Identifying risks allows preventive measures to be implemented."
        },
        {
          question:
            "Why is patient identification important?",
          options: [
            "To ensure care is provided to the correct patient",
            "To make documentation longer",
            "To replace assessment",
            "To avoid communication"
          ],
          answer: 0,
          explanation:
            "Correct identification reduces errors such as giving treatment to the wrong patient."
        },
        {
          question:
            "What should a nurse do after identifying an environmental hazard?",
          options: [
            "Ignore it",
            "Take appropriate action to reduce the risk",
            "Wait until someone is injured",
            "Hide the hazard"
          ],
          answer: 1,
          explanation:
            "Identified hazards should be addressed promptly."
        }
      ]
    },

    {
      title: "Module 9 — Infection Prevention and Control",
      explanation: `
        Infection prevention is a major nursing responsibility.

        Standard precautions are used for all patients and include hand hygiene, appropriate personal protective equipment, respiratory hygiene, safe injection practices, sharps safety and proper handling of contaminated materials.

        Transmission-based precautions may provide additional protection when particular infectious organisms or conditions require it.

        Nurses help break the chain of infection by reducing opportunities for microorganisms to move from a source to a susceptible host.
      `,
      clinicalApplication: `
        A nurse should perform hand hygiene before and after patient contact and use appropriate PPE when there is a risk of exposure to blood, body fluids or infectious material.
      `,
      keyPoints: [
        "Hand hygiene is fundamental.",
        "Use standard precautions for all patients.",
        "Use additional precautions when indicated.",
        "Handle sharps safely.",
        "Prevent cross-contamination."
      ],
      examAlert:
        "Standard precautions apply regardless of whether a patient is known to have an infection. [oai_citation:1‡OpenStax](https://openstax.org/books/fundamentals-nursing/pages/10-4-infection-control-and-patient-safety?utm_source=chatgpt.com)",
      questions: [
        {
          question:
            "Standard precautions should be used for:",
          options: [
            "Only patients with confirmed infections",
            "All patients",
            "Only surgical patients",
            "Only children"
          ],
          answer: 1,
          explanation:
            "Standard precautions are used for all patients."
        },
        {
          question:
            "Which is a major infection-prevention practice?",
          options: [
            "Hand hygiene",
            "Reusing contaminated gloves",
            "Ignoring spills",
            "Skipping PPE"
          ],
          answer: 0,
          explanation:
            "Hand hygiene is a fundamental infection-prevention measure."
        },
        {
          question:
            "Transmission-based precautions include which categories?",
          options: [
            "Contact, droplet and airborne",
            "Food, water and sunlight",
            "Oral, muscular and skeletal",
            "Morning, afternoon and night"
          ],
          answer: 0,
          explanation:
            "Contact, droplet and airborne precautions are major transmission-based categories."
        }
      ]
    },

    {
      title: "Module 10 — Aseptic and Sterile Technique",
      explanation: `
        Aseptic technique aims to reduce the introduction and spread of microorganisms.

        Medical asepsis, often called clean technique, reduces the number and spread of microorganisms.

        Surgical asepsis, or sterile technique, aims to maintain an environment free from microorganisms in situations where sterility is required.

        Nurses must understand sterile fields, contamination risks, appropriate PPE and correct handling of sterile equipment.
      `,
      clinicalApplication: `
        When performing a procedure requiring sterile equipment, the nurse must maintain the sterile field and recognize when an item or area has become contaminated.
      `,
      keyPoints: [
        "Medical asepsis reduces microorganisms and transmission.",
        "Surgical asepsis maintains sterility.",
        "Recognize contamination.",
        "Maintain appropriate sterile technique.",
        "Follow facility procedures."
      ],
      examAlert:
        "A sterile field that becomes contaminated should no longer be treated as sterile.",
      questions: [
        {
          question: "Medical asepsis is commonly called:",
          options: [
            "Clean technique",
            "Surgical diagnosis",
            "Radiation therapy",
            "Sterile surgery"
          ],
          answer: 0,
          explanation:
            "Medical asepsis is commonly described as clean technique."
        },
        {
          question:
            "Surgical asepsis is also known as:",
          options: [
            "Sterile technique",
            "Routine cleaning",
            "Casual technique",
            "Home care"
          ],
          answer: 0,
          explanation:
            "Surgical asepsis is sterile technique."
        },
        {
          question:
            "What happens when a sterile item becomes contaminated?",
          options: [
            "It remains sterile",
            "It should be considered contaminated",
            "It becomes more sterile",
            "It can always be reused"
          ],
          answer: 1,
          explanation:
            "Once contamination occurs, the item can no longer be considered sterile."
        }
      ]
    },

    {
      title: "Module 11 — Vital Signs",
      explanation: `
        Vital signs provide important information about physiological functioning.

        Common vital signs include temperature, pulse, respiratory rate and blood pressure. Oxygen saturation is also commonly assessed in clinical practice.

        Nurses must obtain accurate measurements using appropriate equipment and technique.

        A single abnormal value should be interpreted in context. Trends, symptoms and the patient's baseline are important when determining clinical significance.
      `,
      clinicalApplication: `
        A rising respiratory rate accompanied by falling oxygen saturation and increasing breathlessness may indicate deterioration and requires prompt assessment.
      `,
      keyPoints: [
        "Vital signs provide information about physiological status.",
        "Use correct measurement technique.",
        "Consider patient baseline.",
        "Look for trends.",
        "Report significant abnormalities appropriately."
      ],
      examAlert:
        "Vital signs should be interpreted together with the patient's clinical condition rather than in isolation. [oai_citation:2‡OpenStax](https://openstax.org/books/fundamentals-nursing/pages/7-summary?utm_source=chatgpt.com)",
      questions: [
        {
          question:
            "Which is considered a vital sign?",
          options: [
            "Blood pressure",
            "Hair length",
            "Shoe size",
            "Eye colour"
          ],
          answer: 0,
          explanation:
            "Blood pressure is a commonly measured vital sign."
        },
        {
          question:
            "Why is accurate vital-sign measurement important?",
          options: [
            "It helps identify changes in patient condition",
            "It replaces all assessment",
            "It guarantees diagnosis",
            "It eliminates documentation"
          ],
          answer: 0,
          explanation:
            "Accurate vital signs help clinicians recognize physiological changes."
        },
        {
          question:
            "What should a nurse consider when interpreting a vital sign?",
          options: [
            "The patient's symptoms and baseline",
            "Only the number",
            "The nurse's mood",
            "The patient's clothing"
          ],
          answer: 0,
          explanation:
            "Clinical interpretation requires context."
        }
      ]
    },

    {
      title: "Module 12 — Health History and Physical Examination",
      explanation: `
        Health history provides information about the patient's current concerns, past health, medications, allergies, family history, lifestyle and other relevant factors.

        Physical examination provides objective information.

        Common examination techniques include inspection, palpation, percussion and auscultation.

        The nurse should maintain privacy, explain procedures and obtain appropriate consent according to the setting and procedure.
      `,
      clinicalApplication: `
        Before assessing a patient's abdomen, the nurse explains the procedure, provides privacy and positions the patient appropriately.
      `,
      keyPoints: [
        "Health history provides subjective information.",
        "Physical examination provides objective information.",
        "Use systematic assessment techniques.",
        "Maintain privacy and dignity.",
        "Explain procedures to patients."
      ],
      examAlert:
        "IPPA = Inspection, Palpation, Percussion, Auscultation; abdominal assessment commonly follows a different sequence.",
      questions: [
        {
          question:
            "Which is an objective assessment technique?",
          options: [
            "Inspection",
            "Asking what the patient feels",
            "Asking about emotions only",
            "Asking about preferences"
          ],
          answer: 0,
          explanation:
            "Inspection involves observing the patient and is part of physical assessment."
        },
        {
          question:
            "Which is part of the usual physical examination sequence?",
          options: [
            "Inspection",
            "Guessing",
            "Ignoring",
            "Assuming"
          ],
          answer: 0,
          explanation:
            "Inspection is a fundamental physical assessment technique."
        },
        {
          question:
            "What should be maintained during physical assessment?",
          options: [
            "Patient privacy and dignity",
            "Unnecessary exposure",
            "Noise",
            "Confusion"
          ],
          answer: 0,
          explanation:
            "Privacy and dignity are essential during assessment."
        }
      ]
    },

    {
      title: "Module 13 — Personal Hygiene and Basic Care",
      explanation: `
        Hygiene care includes bathing, oral care, hair care, nail care, perineal care and other activities that support cleanliness, comfort and health.

        Hygiene needs vary according to age, mobility, culture, illness, ability and personal preference.

        Nurses should encourage independence whenever possible while providing assistance where required.

        Hygiene care also provides an opportunity to assess skin condition, oral health, mobility and other patient needs.
      `,
      clinicalApplication: `
        A patient with limited mobility may require assistance with bathing while being encouraged to perform the parts of the activity they can safely manage.
      `,
      keyPoints: [
        "Hygiene promotes comfort and wellbeing.",
        "Respect patient preferences and culture.",
        "Promote independence.",
        "Protect privacy.",
        "Use hygiene care as an assessment opportunity."
      ],
      examAlert:
        "Do not automatically perform every activity for a patient who can safely do some of it independently.",
      questions: [
        {
          question:
            "Why should nurses encourage independence during hygiene care?",
          options: [
            "To promote self-care ability",
            "To avoid all nursing care",
            "To punish the patient",
            "To increase infection"
          ],
          answer: 0,
          explanation:
            "Promoting appropriate independence supports function and self-care."
        },
        {
          question:
            "Hygiene care can provide an opportunity to assess:",
          options: [
            "Skin condition",
            "Only blood glucose",
            "Only vision",
            "Only hearing"
          ],
          answer: 0,
          explanation:
            "Skin can be assessed during bathing and other hygiene activities."
        },
        {
          question:
            "What should the nurse protect during hygiene care?",
          options: [
            "Patient privacy and dignity",
            "Only equipment",
            "Only documentation",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Privacy and dignity must be protected during personal care."
        }
      ]
    },

    {
      title: "Module 14 — Mobility, Positioning and Body Mechanics",
      explanation: `
        Safe movement is important for both patients and nurses.

        Proper body mechanics reduce the risk of musculoskeletal injury.

        Nurses should assess the patient's strength, balance, cognition and ability to follow instructions before transferring or mobilizing them.

        Positioning can promote comfort, breathing, circulation, skin integrity and prevention of complications.

        Immobile patients are at increased risk of pressure injuries, venous thromboembolism, constipation, respiratory complications and muscle weakness.
      `,
      clinicalApplication: `
        Before transferring a weak patient from bed to chair, the nurse assesses the patient's ability to stand, ensures appropriate equipment is available and obtains assistance when necessary.
      `,
      keyPoints: [
        "Assess mobility before moving a patient.",
        "Use safe body mechanics.",
        "Use assistance devices appropriately.",
        "Reposition immobile patients.",
        "Watch for complications of immobility."
      ],
      examAlert:
        "Never assume a patient can safely transfer simply because they appear alert.",
      questions: [
        {
          question:
            "Why is patient mobility assessment important?",
          options: [
            "To determine the level of assistance required",
            "To avoid communication",
            "To replace vital signs",
            "To diagnose all diseases"
          ],
          answer: 0,
          explanation:
            "Assessment helps determine how safely the patient can move."
        },
        {
          question:
            "Which is a complication of prolonged immobility?",
          options: [
            "Pressure injury",
            "Improved muscle strength",
            "Increased mobility",
            "Improved circulation"
          ],
          answer: 0,
          explanation:
            "Immobility increases the risk of pressure injuries and other complications."
        },
        {
          question:
            "What should a nurse do if a patient requires more assistance than one person can safely provide?",
          options: [
            "Obtain appropriate assistance",
            "Lift the patient alone",
            "Ignore the patient",
            "Ask the patient to jump"
          ],
          answer: 0,
          explanation:
            "Appropriate assistance and equipment reduce injury risk."
        }
      ]
    },

    {
      title: "Module 15 — Nutrition and Hydration",
      explanation: `
        Nutrition provides energy and nutrients needed for growth, tissue repair, immunity and normal body functions.

        Nurses assess appetite, swallowing ability, dietary restrictions, weight changes, hydration status and factors that affect nutritional intake.

        Some patients require assistance with feeding.

        Patients at risk of aspiration require careful assessment and appropriate precautions according to their condition.
      `,
      clinicalApplication: `
        A patient recovering from a stroke may have difficulty swallowing. The nurse should not assume that the patient can safely eat normally without appropriate assessment.
      `,
      keyPoints: [
        "Nutrition supports healing and normal function.",
        "Assess appetite and intake.",
        "Assess swallowing when indicated.",
        "Respect dietary restrictions.",
        "Monitor patients at risk of aspiration."
      ],
      examAlert:
        "Swallowing difficulty can increase aspiration risk.",
      questions: [
        {
          question:
            "Why is adequate nutrition important for a recovering patient?",
          options: [
            "It supports healing and body function",
            "It prevents all diseases",
            "It replaces medication",
            "It eliminates assessment"
          ],
          answer: 0,
          explanation:
            "Nutrients are necessary for energy, tissue repair and normal physiological processes."
        },
        {
          question:
            "Which patient may require swallowing assessment?",
          options: [
            "A patient after a stroke with swallowing difficulty",
            "A patient with normal swallowing",
            "A healthy person eating normally",
            "A patient with no neurological concerns"
          ],
          answer: 0,
          explanation:
            "Stroke can affect swallowing and increase aspiration risk."
        },
        {
          question:
            "What does aspiration mean?",
          options: [
            "Entry of material into the airway",
            "Normal digestion",
            "Normal breathing",
            "Increased appetite"
          ],
          answer: 0,
          explanation:
            "Aspiration occurs when material enters the airway rather than following the normal swallowing pathway."
        }
      ]
    },

    {
      title: "Module 16 — Fluid Balance",
      explanation: `
        Maintaining fluid balance is essential for circulation, cellular function, temperature regulation and elimination.

        Nurses monitor fluid intake and output and assess for signs of dehydration or fluid overload.

        Dehydration may present with thirst, dry mucous membranes, weakness, reduced urine output and other findings.

        Fluid overload may involve edema, weight gain, respiratory difficulty or other signs depending on the cause.
      `,
      clinicalApplication: `
        A patient receiving intravenous fluids should be monitored for both adequate hydration and signs of excessive fluid accumulation.
      `,
      keyPoints: [
        "Fluid balance affects circulation and organ function.",
        "Monitor intake and output when indicated.",
        "Assess for dehydration.",
        "Assess for fluid overload.",
        "Daily weight can help monitor fluid changes in appropriate patients."
      ],
      examAlert:
        "Sudden changes in weight can provide useful information about fluid changes.",
      questions: [
        {
          question:
            "Which may suggest dehydration?",
          options: [
            "Dry mucous membranes",
            "Generalized edema",
            "Rapid unexplained weight gain",
            "Fluid-filled lungs"
          ],
          answer: 0,
          explanation:
            "Dry mucous membranes can occur with dehydration."
        },
        {
          question:
            "Which may suggest fluid overload?",
          options: [
            "Edema",
            "Severe thirst only",
            "Dry mouth",
            "Reduced skin moisture"
          ],
          answer: 0,
          explanation:
            "Edema can occur when excess fluid accumulates in tissues."
        },
        {
          question:
            "Why is intake and output monitoring useful?",
          options: [
            "It helps evaluate fluid balance",
            "It diagnoses every illness",
            "It replaces physical assessment",
            "It prevents all dehydration"
          ],
          answer: 0,
          explanation:
            "Intake and output data help evaluate fluid balance."
        }
      ]
    },

    {
      title: "Module 17 — Urinary Elimination",
      explanation: `
        Urinary elimination removes metabolic waste and helps regulate fluid and electrolyte balance.

        Nurses assess urinary frequency, amount, colour, clarity, odor and symptoms such as pain or difficulty voiding.

        Factors affecting urinary function include age, fluid intake, medications, illness, mobility and psychological factors.

        Patients with urinary catheters require careful infection-prevention practices and monitoring.
      `,
      clinicalApplication: `
        A postoperative patient who has not passed urine for an unexpectedly long period should be assessed rather than simply being ignored.
      `,
      keyPoints: [
        "Urinary assessment is part of nursing care.",
        "Monitor changes in urine output.",
        "Assess symptoms of urinary problems.",
        "Maintain catheter care when applicable.",
        "Prevent catheter-associated infection."
      ],
      examAlert:
        "A significant change in urine output can indicate a problem with hydration, kidney function or circulation.",
      questions: [
        {
          question:
            "Which is important when assessing urinary elimination?",
          options: [
            "Urine output",
            "Hair length",
            "Eye colour",
            "Shoe size"
          ],
          answer: 0,
          explanation:
            "Urine output provides information about urinary and fluid status."
        },
        {
          question:
            "Why is catheter care important?",
          options: [
            "To reduce infection risk",
            "To increase contamination",
            "To prevent all pain",
            "To replace hydration"
          ],
          answer: 0,
          explanation:
            "Urinary catheters can increase infection risk, so appropriate care is important."
        },
        {
          question:
            "A sudden reduction in urine output should be:",
          options: [
            "Ignored",
            "Assessed and reported when clinically significant",
            "Treated with random medication",
            "Hidden"
          ],
          answer: 1,
          explanation:
            "A significant change in urine output may indicate a clinical problem."
        }
      ]
    },

    {
      title: "Module 18 — Bowel Elimination",
      explanation: `
        Normal bowel elimination varies among individuals.

        Nurses assess bowel frequency, stool characteristics, abdominal symptoms and factors affecting elimination.

        Constipation can be associated with inadequate fluid intake, low dietary fiber, inactivity, medications and other conditions.

        Diarrhea can cause fluid and electrolyte losses and may require investigation depending on severity and cause.
      `,
      clinicalApplication: `
        An immobile patient receiving opioid medication may be at increased risk of constipation. The nurse should monitor bowel function and follow the care plan.
      `,
      keyPoints: [
        "Normal bowel patterns vary.",
        "Assess changes from the patient's usual pattern.",
        "Immobility can contribute to constipation.",
        "Some medications affect bowel function.",
        "Diarrhea can cause fluid and electrolyte loss."
      ],
      examAlert:
        "Do not define constipation only by frequency. Difficulty passing stool, hard stool and changes from the patient's usual pattern also matter.",
      questions: [
        {
          question:
            "Which factor can contribute to constipation?",
          options: [
            "Immobility",
            "Regular activity",
            "Adequate hydration",
            "Normal bowel function"
          ],
          answer: 0,
          explanation:
            "Reduced activity can contribute to constipation."
        },
        {
          question:
            "Why can severe diarrhea be dangerous?",
          options: [
            "It can cause fluid and electrolyte loss",
            "It always improves hydration",
            "It increases blood volume",
            "It prevents all infection"
          ],
          answer: 0,
          explanation:
            "Significant diarrhea can lead to dehydration and electrolyte imbalance."
        },
        {
          question:
            "What should a nurse assess when bowel elimination changes?",
          options: [
            "Pattern, stool characteristics and associated symptoms",
            "Only the patient's height",
            "Only hair colour",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "A comprehensive assessment helps identify possible causes and risks."
        }
      ]
    },

    {
      title: "Module 19 — Oxygenation",
      explanation: `
        Oxygenation is essential for cellular metabolism.

        Nurses assess respiratory rate, rhythm, depth, breath sounds, oxygen saturation, skin colour, work of breathing and symptoms such as dyspnea.

        Signs of respiratory distress may include increased respiratory effort, abnormal breath sounds, cyanosis, confusion or falling oxygen saturation.

        Oxygen therapy is a clinical intervention and should be administered according to the patient's condition, prescription or applicable protocol.
      `,
      clinicalApplication: `
        A patient who develops increasing breathlessness and falling oxygen saturation requires prompt assessment and appropriate escalation.
      `,
      keyPoints: [
        "Oxygen is essential for cellular function.",
        "Assess breathing systematically.",
        "Monitor oxygen saturation when indicated.",
        "Recognize respiratory distress.",
        "Escalate deterioration promptly."
      ],
      examAlert:
        "A change in mental status can be an important sign of inadequate oxygenation.",
      questions: [
        {
          question:
            "Which finding may indicate respiratory distress?",
          options: [
            "Increased work of breathing",
            "Normal comfortable breathing",
            "Normal oxygenation",
            "No respiratory symptoms"
          ],
          answer: 0,
          explanation:
            "Increased work of breathing can indicate respiratory distress."
        },
        {
          question:
            "What does oxygen saturation estimate?",
          options: [
            "The percentage of hemoglobin carrying oxygen",
            "Blood glucose",
            "Body temperature",
            "Urine concentration"
          ],
          answer: 0,
          explanation:
            "Pulse oximetry estimates the percentage of hemoglobin saturated with oxygen."
        },
        {
          question:
            "A patient with worsening breathing should be:",
          options: [
            "Promptly reassessed",
            "Ignored",
            "Sent home without assessment",
            "Given random medication"
          ],
          answer: 0,
          explanation:
            "Worsening breathing can represent serious deterioration and requires prompt assessment."
        }
      ]
    },

    {
      title: "Module 20 — Pain Assessment and Management",
      explanation: `
        Pain is a subjective experience and should be assessed using the patient's report whenever possible.

        Nurses assess location, quality, intensity, timing, aggravating and relieving factors and associated symptoms.

        Pain scales can help patients communicate intensity.

        Pain management may include prescribed medications, positioning, relaxation, therapeutic communication, environmental measures and other appropriate interventions.
      `,
      clinicalApplication: `
        Instead of assuming that a patient's pain is mild based on appearance, the nurse asks the patient to describe the pain and assesses relevant characteristics.
      `,
      keyPoints: [
        "Pain is subjective.",
        "Believe and assess the patient's report.",
        "Assess characteristics of pain.",
        "Use an appropriate pain scale.",
        "Reassess after intervention."
      ],
      examAlert:
        "A patient can experience severe pain even when there are few visible signs.",
      questions: [
        {
          question:
            "Who is the best source for describing a patient's pain when the patient can communicate?",
          options: [
            "The patient",
            "Another patient",
            "A visitor",
            "A random observer"
          ],
          answer: 0,
          explanation:
            "Pain is subjective, so the patient's report is the primary source when they can communicate."
        },
        {
          question:
            "Which is part of pain assessment?",
          options: [
            "Location and intensity",
            "Shoe size",
            "Hair colour",
            "Favorite sport only"
          ],
          answer: 0,
          explanation:
            "Pain assessment includes characteristics such as location and intensity."
        },
        {
          question:
            "What should occur after pain intervention?",
          options: [
            "Reassessment",
            "No further observation",
            "Immediate discharge",
            "Ignoring the patient"
          ],
          answer: 0,
          explanation:
            "Reassessment determines whether the intervention was effective."
        }
      ]
    },

    {
      title: "Module 21 — Skin Integrity and Pressure Injury Prevention",
      explanation: `
        Skin protects the body from environmental injury and microorganisms.

        Patients with immobility, poor nutrition, reduced sensation, moisture exposure or impaired circulation may be at increased risk of pressure injury.

        Prevention includes regular assessment, repositioning according to individual risk, pressure redistribution, moisture management, nutrition and appropriate skin care.

        Early recognition of skin changes allows intervention before damage progresses.
      `,
      clinicalApplication: `
        A bedridden patient should have the skin assessed regularly, particularly over areas exposed to prolonged pressure such as the sacrum and heels.
      `,
      keyPoints: [
        "Assess skin regularly.",
        "Identify pressure-injury risk.",
        "Reposition according to individual needs.",
        "Manage moisture.",
        "Support adequate nutrition and hydration."
      ],
      examAlert:
        "Pressure injury prevention begins with risk assessment and prevention—not after the wound has already developed.",
      questions: [
        {
          question:
            "Which patient is at increased risk for pressure injury?",
          options: [
            "A patient with prolonged immobility",
            "A fully mobile patient",
            "A healthy person walking regularly",
            "A patient with normal skin and mobility"
          ],
          answer: 0,
          explanation:
            "Prolonged pressure and immobility increase pressure-injury risk."
        },
        {
          question:
            "Which area is commonly vulnerable to pressure injury?",
          options: [
            "Sacrum",
            "Hair",
            "Fingernail",
            "Earlobe only"
          ],
          answer: 0,
          explanation:
            "The sacrum is a common pressure area in bedbound patients."
        },
        {
          question:
            "What is an important prevention strategy?",
          options: [
            "Appropriate repositioning",
            "Leaving the patient in one position indefinitely",
            "Ignoring skin changes",
            "Reducing all nutrition"
          ],
          answer: 0,
          explanation:
            "Appropriate repositioning helps reduce prolonged pressure."
        }
      ]
    },

    {
      title: "Module 22 — Wound Care",
      explanation: `
        Wound care involves assessment, protection, infection prevention and promotion of healing.

        Nurses assess wound location, size, tissue appearance, drainage, odor, surrounding skin and signs of infection.

        Documentation should accurately describe findings and interventions.

        Wound healing is influenced by circulation, nutrition, infection, age, chronic disease, medications and other factors.
      `,
      clinicalApplication: `
        A postoperative wound with increasing redness, swelling, pain and purulent drainage should be assessed and reported because these findings may indicate infection.
      `,
      keyPoints: [
        "Assess wounds systematically.",
        "Monitor for infection.",
        "Maintain appropriate aseptic technique.",
        "Document findings accurately.",
        "Consider factors that affect healing."
      ],
      examAlert:
        "Increasing redness, swelling, pain, warmth or purulent drainage may indicate infection and requires assessment.",
      questions: [
        {
          question:
            "Which finding may suggest wound infection?",
          options: [
            "Purulent drainage with increasing redness",
            "Normal healing without symptoms",
            "Clean intact skin",
            "No pain or swelling"
          ],
          answer: 0,
          explanation:
            "Purulent drainage and increasing inflammation can indicate infection."
        },
        {
          question:
            "Which factor can affect wound healing?",
          options: [
            "Nutrition",
            "Shoe size",
            "Hair colour",
            "Favorite music"
          ],
          answer: 0,
          explanation:
            "Adequate nutrition is important for tissue repair and wound healing."
        },
        {
          question:
            "What should wound findings be?",
          options: [
            "Accurately documented",
            "Hidden",
            "Guessed",
            "Ignored"
          ],
          answer: 0,
          explanation:
            "Accurate documentation supports continuity and safety of care."
        }
      ]
    },

    {
      title: "Module 23 — Medication Administration Principles",
      explanation: `
        Medication administration is a high-responsibility nursing activity.

        Nurses must verify the medication order, patient identity, medication, dose, route, timing and other applicable safety requirements before administration.

        Allergy status, contraindications, relevant assessment findings and patient education should also be considered.

        Medication errors can cause serious harm, so nurses should never administer a medication they cannot safely identify or understand.
      `,
      clinicalApplication: `
        Before administering a medication, the nurse verifies the patient's identity and medication information against the order and checks for relevant allergies and safety concerns.
      `,
      keyPoints: [
        "Verify the correct patient.",
        "Verify medication and dose.",
        "Verify route and timing.",
        "Check allergies and relevant assessments.",
        "Document administration appropriately."
      ],
      examAlert:
        "Medication safety is not simply about giving the drug. Assessment, verification, monitoring and documentation are all important.",
      questions: [
        {
          question:
            "Why must patient identity be verified before medication administration?",
          options: [
            "To ensure the medication is given to the correct patient",
            "To make the procedure slower",
            "To replace assessment",
            "To avoid documentation"
          ],
          answer: 0,
          explanation:
            "Correct patient identification is a fundamental medication-safety step."
        },
        {
          question:
            "What should be checked before medication administration?",
          options: [
            "Relevant allergies",
            "Patient's shoe size",
            "Hair colour",
            "Favorite sport"
          ],
          answer: 0,
          explanation:
            "Allergy status is an important medication-safety consideration."
        },
        {
          question:
            "What should a nurse do if unsure about a medication order?",
          options: [
            "Clarify the order before administering",
            "Guess",
            "Administer any dose",
            "Ignore the order"
          ],
          answer: 0,
          explanation:
            "Unclear medication orders should be clarified before administration."
        }
      ]
    },

    {
      title: "Module 24 — Documentation and Reporting",
      explanation: `
        Documentation is a permanent clinical record of patient care.

        Good documentation is accurate, timely, objective, clear and relevant.

        Nurses document assessments, interventions, patient responses, education and other information required by policy and professional standards.

        Errors in documentation should be corrected according to applicable policy rather than concealed or altered improperly.

        Verbal handover is also important for communicating immediate clinical information.
      `,
      clinicalApplication: `
        After giving a prescribed intervention, the nurse records what was done and documents the patient's response according to the organization's documentation system.
      `,
      keyPoints: [
        "Document accurately.",
        "Document promptly.",
        "Use objective language.",
        "Record patient responses.",
        "Follow organizational documentation policies."
      ],
      examAlert:
        "If it is not documented according to applicable policy, continuity of care can be compromised.",
      questions: [
        {
          question:
            "Which describes good nursing documentation?",
          options: [
            "Accurate and objective",
            "Vague and emotional",
            "Delayed and incomplete",
            "Based on guesses"
          ],
          answer: 0,
          explanation:
            "Documentation should be accurate, objective, timely and relevant."
        },
        {
          question:
            "What should be documented after an intervention?",
          options: [
            "The intervention and relevant patient response",
            "Only the nurse's opinion",
            "Nothing",
            "Unrelated information"
          ],
          answer: 0,
          explanation:
            "The intervention and patient response are important for continuity of care."
        },
        {
          question:
            "What should a nurse do with an unclear clinical record entry?",
          options: [
            "Follow applicable correction policy",
            "Erase evidence secretly",
            "Change facts",
            "Ignore it"
          ],
          answer: 0,
          explanation:
            "Documentation corrections should follow organizational and professional requirements."
        }
      ]
    },

    {
      title: "Module 25 — Ethics, Values and Patient Rights",
      explanation: `
        Nursing practice is guided by ethical principles and professional standards.

        Important concepts include autonomy, beneficence, nonmaleficence, justice, fidelity and respect for dignity.

        Autonomy involves respecting a patient's right to participate in decisions about their care.

        Beneficence means promoting the patient's wellbeing. Nonmaleficence emphasizes avoiding preventable harm. Justice involves fairness.

        Nurses must also protect confidentiality and respect patient dignity.
      `,
      clinicalApplication: `
        A competent patient who understands a proposed intervention has the right to participate in decisions about that care. The nurse should support informed decision-making rather than forcing the patient.
      `,
      keyPoints: [
        "Respect autonomy.",
        "Promote patient wellbeing.",
        "Avoid preventable harm.",
        "Promote fairness.",
        "Protect confidentiality and dignity."
      ],
      examAlert:
        "Autonomy is closely associated with the patient's right to make informed choices about their own care.",
      questions: [
        {
          question: "Which ethical principle relates to self-determination?",
          options: [
            "Autonomy",
            "Justice",
            "Nonmaleficence",
            "Fidelity"
          ],
          answer: 0,
          explanation:
            "Autonomy concerns the patient's right to make informed decisions."
        },
        {
          question:
            "Which principle emphasizes avoiding harm?",
          options: [
            "Nonmaleficence",
            "Autonomy",
            "Justice",
            "Confidentiality"
          ],
          answer: 0,
          explanation:
            "Nonmaleficence is commonly described as avoiding harm."
        },
        {
          question:
            "What should nurses protect?",
          options: [
            "Patient confidentiality",
            "Patient gossip",
            "Unnecessary disclosure",
            "Private information for entertainment"
          ],
          answer: 0,
          explanation:
            "Confidentiality is an important professional responsibility."
        }
      ]
    },

    {
      title: "Module 26 — Patient Education and Health Literacy",
      explanation: `
        Patient education helps people understand their health conditions, treatments, medications and self-care responsibilities.

        Effective education begins by assessing what the patient already knows, their learning needs, preferred learning methods and possible barriers.

        Nurses should use language that the patient can understand and avoid unnecessary technical terms.

        Understanding should be evaluated rather than assumed. Teach-back is one useful approach in which the patient explains information in their own words.
      `,
      clinicalApplication: `
        After teaching a patient how to take medication, the nurse can ask the patient to explain how they will take it at home. This helps identify misunderstandings.
      `,
      keyPoints: [
        "Assess learning needs.",
        "Use understandable language.",
        "Consider health literacy.",
        "Use teach-back when appropriate.",
        "Evaluate understanding."
      ],
      examAlert:
        "Do not ask only, 'Do you understand?' A patient may say yes without actually understanding.",
      questions: [
        {
          question:
            "What is teach-back used for?",
          options: [
            "Checking patient understanding",
            "Testing the nurse",
            "Measuring blood pressure",
            "Diagnosing infection"
          ],
          answer: 0,
          explanation:
            "Teach-back helps the nurse determine whether the patient understood the teaching."
        },
        {
          question:
            "Which approach improves patient education?",
          options: [
            "Using understandable language",
            "Using unnecessary medical jargon",
            "Ignoring literacy",
            "Giving information without checking understanding"
          ],
          answer: 0,
          explanation:
            "Clear language improves understanding."
        },
        {
          question:
            "Before teaching, the nurse should assess:",
          options: [
            "The patient's learning needs",
            "Only the nurse's preference",
            "The patient's shoe size",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Assessment of learning needs helps personalize education."
        }
      ]
    },

    {
      title: "Module 27 — Sleep and Rest",
      explanation: `
        Sleep supports physical recovery, cognition, mood and immune function.

        Hospitalization can disrupt sleep because of pain, anxiety, noise, lighting, medications and frequent clinical procedures.

        Nurses assess sleep patterns and identify factors interfering with rest.

        Nursing interventions may include reducing unnecessary noise, coordinating care when possible, managing symptoms and promoting a comfortable environment.
      `,
      clinicalApplication: `
        A hospitalized patient who repeatedly wakes because of pain may require pain assessment and appropriate intervention rather than simply being told to sleep.
      `,
      keyPoints: [
        "Sleep supports recovery.",
        "Assess sleep patterns.",
        "Identify causes of sleep disturbance.",
        "Manage symptoms that interfere with sleep.",
        "Promote a suitable environment."
      ],
      examAlert:
        "Poor sleep in hospital may have multiple causes, so assess rather than assuming the patient is simply unwilling to sleep.",
      questions: [
        {
          question:
            "Why is sleep important?",
          options: [
            "It supports recovery and normal functioning",
            "It replaces nutrition",
            "It eliminates all disease",
            "It replaces medication"
          ],
          answer: 0,
          explanation:
            "Sleep supports physical and psychological functioning."
        },
        {
          question:
            "Which can interfere with sleep in hospital?",
          options: [
            "Pain",
            "Comfort",
            "Quiet environment",
            "Good symptom control"
          ],
          answer: 0,
          explanation:
            "Pain is a common cause of sleep disturbance."
        },
        {
          question:
            "What can nurses do to promote sleep?",
          options: [
            "Reduce unnecessary environmental disturbances",
            "Increase noise",
            "Ignore pain",
            "Wake patients unnecessarily"
          ],
          answer: 0,
          explanation:
            "Reducing unnecessary disturbances can support rest."
        }
      ]
    },

    {
      title: "Module 28 — Stress, Coping and Emotional Support",
      explanation: `
        Illness, hospitalization, pain, financial concerns and changes in independence can create stress.

        Coping strategies vary among individuals and cultures.

        Nurses should assess emotional responses and identify coping resources.

        Therapeutic communication, patient education, family support and referral to appropriate professionals can help patients manage stress.
      `,
      clinicalApplication: `
        A newly diagnosed patient who appears anxious may benefit from an opportunity to express concerns, clear information about the care plan and referral when additional psychological support is needed.
      `,
      keyPoints: [
        "Illness can create significant stress.",
        "Coping strategies differ between individuals.",
        "Assess emotional wellbeing.",
        "Encourage healthy coping.",
        "Use appropriate referral and support."
      ],
      examAlert:
        "Do not judge a patient's coping response simply because it differs from what the nurse would personally choose.",
      questions: [
        {
          question:
            "Which is an appropriate nursing response to an anxious patient?",
          options: [
            "Listen and provide appropriate support",
            "Tell the patient to stop worrying",
            "Ignore the anxiety",
            "Laugh at the patient"
          ],
          answer: 0,
          explanation:
            "Therapeutic listening and appropriate support help patients cope."
        },
        {
          question:
            "Why should coping be individualized?",
          options: [
            "People respond differently to stress",
            "Everyone reacts identically",
            "Culture never matters",
            "Coping has no effect"
          ],
          answer: 0,
          explanation:
            "Coping strategies vary according to individual, cultural and situational factors."
        },
        {
          question:
            "What may be appropriate when a patient needs more psychological support?",
          options: [
            "Referral to an appropriate professional",
            "Ignoring the concern",
            "Making promises the nurse cannot keep",
            "Changing the diagnosis"
          ],
          answer: 0,
          explanation:
            "Appropriate referral helps connect patients with additional support."
        }
      ]
    },

    {
      title: "Module 29 — Perioperative Nursing Care",
      explanation: `
        Perioperative nursing includes care before, during and after surgery.

        Preoperative care may involve assessment, education, preparation, verification and safety checks.

        Postoperative care focuses on airway and breathing, circulation, pain, wound assessment, fluid balance, mobility, elimination and recognition of complications.

        Nurses must monitor patients closely because complications can develop rapidly after surgery.
      `,
      clinicalApplication: `
        A patient returning from surgery requires assessment of airway, breathing, circulation, level of consciousness, pain and the surgical site according to the patient's condition and clinical protocol.
      `,
      keyPoints: [
        "Perioperative care includes preoperative, intraoperative and postoperative phases.",
        "Postoperative airway and breathing are priorities.",
        "Monitor pain and wound condition.",
        "Monitor fluid balance and elimination.",
        "Recognize complications early."
      ],
      examAlert:
        "Immediately after surgery, prioritize airway, breathing and circulation before less urgent concerns.",
      questions: [
        {
          question:
            "Which is an immediate postoperative priority?",
          options: [
            "Airway and breathing",
            "Hair styling",
            "Long-term career planning",
            "Routine shopping"
          ],
          answer: 0,
          explanation:
            "Airway and breathing are immediate life-support priorities."
        },
        {
          question:
            "Which should be monitored after surgery?",
          options: [
            "Pain and surgical site",
            "Only hair",
            "Only shoe size",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Pain and surgical-site condition are important postoperative assessments."
        },
        {
          question:
            "Why is postoperative monitoring important?",
          options: [
            "Complications can develop rapidly",
            "Patients never deteriorate",
            "It replaces surgery",
            "It prevents all pain"
          ],
          answer: 0,
          explanation:
            "Close monitoring allows complications to be recognized and managed early."
        }
      ]
    },

    {
      title: "Module 30 — Clinical Handover and Teamwork",
      explanation: `
        Safe patient care depends on effective teamwork.

        Nurses communicate with doctors, pharmacists, laboratory staff, physiotherapists, dietitians, social workers and other professionals.

        Handover should communicate relevant patient information, current problems, important assessments, interventions, response and pending concerns.

        Poor communication can contribute to errors, delays and patient harm.
      `,
      clinicalApplication: `
        During shift change, the outgoing nurse should communicate important changes in the patient's condition, current treatment, safety risks and outstanding tasks to the incoming nurse.
      `,
      keyPoints: [
        "Teamwork supports patient safety.",
        "Handover should be accurate and relevant.",
        "Communicate changes in condition.",
        "Identify pending tasks.",
        "Respect other members of the healthcare team."
      ],
      examAlert:
        "Good handover is not about saying everything; it is about communicating the information necessary for safe continuity of care.",
      questions: [
        {
          question:
            "What is the purpose of clinical handover?",
          options: [
            "Promote continuity and safety of care",
            "Entertain staff",
            "Hide information",
            "Replace assessment"
          ],
          answer: 0,
          explanation:
            "Handover transfers important information needed for safe ongoing care."
        },
        {
          question:
            "Which information is important during handover?",
          options: [
            "Changes in patient condition",
            "The nurse's favorite food",
            "Unrelated gossip",
            "Personal criticism"
          ],
          answer: 0,
          explanation:
            "Changes in patient condition are clinically important."
        },
        {
          question:
            "Why is teamwork important in nursing?",
          options: [
            "Patients often require coordinated multidisciplinary care",
            "Nurses never work with others",
            "It eliminates documentation",
            "It prevents all disease"
          ],
          answer: 0,
          explanation:
            "Safe healthcare often requires coordinated work among multiple professionals."
        }
      ]
    },

    {
      title: "Module 31 — Comprehensive Fundamentals Revision",
      explanation: `
        Fundamentals of Nursing brings together the basic knowledge and skills required for safe nursing practice.

        A strong fundamentals student should understand the nursing process, therapeutic communication, assessment, clinical judgment, patient safety, infection prevention, vital signs, medication safety, hygiene, mobility, nutrition, elimination, oxygenation, pain, wound care, documentation, ethics and teamwork.

        The most important habit is to connect theory with patient safety. When answering examination questions, ask:

        What is the immediate problem?
        What is the greatest risk?
        What assessment is needed?
        Which intervention is safest?
        What should be reported?
        What should be reassessed?

        Nursing is not simply about memorizing procedures. It requires understanding why an intervention is performed and recognizing when a patient's condition is changing.
      `,
      clinicalApplication: `
        A patient suddenly becomes confused, breathless and weak. A nurse should not focus on routine care first. The nurse reassesses the patient, checks vital signs and oxygenation, identifies immediate threats, calls for assistance when necessary and evaluates the response.
      `,
      keyPoints: [
        "Use the nursing process.",
        "Communicate therapeutically.",
        "Prioritize patient safety.",
        "Prevent infection.",
        "Assess before intervening when appropriate.",
        "Recognize deterioration.",
        "Document accurately.",
        "Protect patient rights.",
        "Work effectively with the healthcare team.",
        "Always reassess the patient's response."
      ],
      examAlert:
        "For Fundamentals examinations, prioritize safety, ABCs, assessment, infection prevention, correct procedure, patient education and reassessment.",
      questions: [
        {
          question:
            "Which principle should guide nursing decisions?",
          options: [
            "Patient safety",
            "Convenience only",
            "Guessing",
            "Ignoring abnormal findings"
          ],
          answer: 0,
          explanation:
            "Patient safety is a fundamental priority in nursing practice."
        },
        {
          question:
            "Which nursing process step determines whether an intervention worked?",
          options: [
            "Evaluation",
            "Assessment",
            "Diagnosis",
            "Planning"
          ],
          answer: 0,
          explanation:
            "Evaluation determines the patient's response to care."
        },
        {
          question:
            "A patient suddenly develops severe breathing difficulty. What should the nurse prioritize?",
          options: [
            "Immediate assessment of the patient's condition",
            "Routine paperwork",
            "Discharge teaching",
            "Meal selection"
          ],
          answer: 0,
          explanation:
            "Acute breathing difficulty may be life-threatening and requires immediate assessment."
        },
        {
          question:
            "Which action helps prevent healthcare-associated infection?",
          options: [
            "Appropriate hand hygiene",
            "Reusing contaminated equipment",
            "Ignoring PPE",
            "Skipping cleaning procedures"
          ],
          answer: 0,
          explanation:
            "Hand hygiene is a fundamental infection-prevention practice."
        },
        {
          question:
            "After performing an important nursing intervention, what should the nurse do?",
          options: [
            "Reassess the patient's response",
            "Immediately forget the patient",
            "Assume it worked",
            "Avoid documentation"
          ],
          answer: 0,
          explanation:
            "Reassessment determines the patient's response and whether further action is needed."
        }
      ]
    }

  ]
},
    // ========================================================
    // 5. MEDICAL-SURGICAL NURSING
    // ========================================================

  "medical-surgical": {
  title: "Medical-Surgical Nursing",
  description:
    "A comprehensive medical-surgical nursing course covering clinical assessment, fluid and electrolyte balance, respiratory, cardiovascular, gastrointestinal, renal, endocrine, neurological, musculoskeletal, hematological, infectious, oncological and critical-care conditions, with emphasis on nursing interventions, patient safety, prioritization and clinical judgment.",
  lessons: [
    {
      title: "1. Foundations of Medical-Surgical Nursing",
      explanation:
        "Medical-surgical nursing focuses on the care of adults with acute, chronic and complex health problems. The nurse continuously assesses the patient, identifies actual and potential problems, plans appropriate care, implements interventions and evaluates outcomes. Good medical-surgical nursing requires knowledge of disease processes together with strong observation, communication, clinical judgment and prioritization skills.",
      clinicalApplication:
        "A patient admitted with pneumonia may require assessment of respiratory rate, oxygen saturation, breath sounds, temperature, hydration, mental status and response to treatment. The nurse must identify deterioration early and communicate important changes to the healthcare team.",
      keyPoints: [
        "Assess the patient before implementing interventions.",
        "Compare current findings with baseline findings.",
        "Prioritize airway, breathing and circulation when appropriate.",
        "Recognize early signs of deterioration.",
        "Document assessment findings accurately.",
        "Reassess after interventions."
      ],
      examAlert:
        "When several patients need attention, prioritize the patient with an immediate threat to airway, breathing, circulation or neurological status.",
      questions: [
        {
          question: "Which principle is most important when caring for a patient with an acute medical condition?",
          options: [
            "Perform interventions without assessment",
            "Assess the patient and continuously evaluate changes",
            "Wait until the physician makes every decision",
            "Focus only on the patient's diagnosis"
          ],
          answer: 1,
          explanation:
            "Assessment and ongoing evaluation allow the nurse to identify deterioration and determine whether interventions are effective."
        },
        {
          question: "Which patient should the nurse assess first?",
          options: [
            "A patient requesting a blanket",
            "A patient with mild chronic back pain",
            "A patient with severe difficulty breathing",
            "A patient waiting for discharge instructions"
          ],
          answer: 2,
          explanation:
            "Severe difficulty breathing represents a potential airway or breathing emergency and takes priority."
        },
        {
          question: "After giving an intervention, the nurse should primarily:",
          options: [
            "Leave the patient alone",
            "Document without reassessing",
            "Evaluate the patient's response",
            "Wait until the next shift"
          ],
          answer: 2,
          explanation:
            "Evaluation determines whether the intervention produced the desired outcome."
        }
      ]
    },
    {
      title: "2. Clinical Assessment and Early Recognition of Deterioration",
      explanation:
        "Medical-surgical patients can deteriorate rapidly. Nurses should monitor vital signs, oxygenation, neurological status, urine output, pain, skin appearance and other relevant findings. Changes from baseline can be more important than a single isolated value. Early recognition and escalation can prevent complications.",
      clinicalApplication:
        "A patient whose respiratory rate increases, oxygen saturation falls and mental status changes may be deteriorating even before severe hypotension occurs.",
      keyPoints: [
        "Trend vital signs rather than looking at one value alone.",
        "Changes in mental status can indicate serious deterioration.",
        "Reduced urine output can indicate poor renal perfusion or fluid problems.",
        "Increasing respiratory effort requires prompt assessment.",
        "Report significant deterioration promptly."
      ],
      examAlert:
        "A sudden change in mental status is a significant clinical finding and should never be dismissed as normal aging.",
      questions: [
        {
          question: "Which finding may indicate early deterioration?",
          options: [
            "Sudden change in mental status",
            "Patient asking for water",
            "Patient watching television",
            "Normal appetite"
          ],
          answer: 0,
          explanation:
            "An acute change in mental status can indicate hypoxia, poor perfusion, infection, metabolic problems or other serious conditions."
        },
        {
          question: "Why are trends in vital signs important?",
          options: [
            "They eliminate the need for assessment",
            "They show changes from the patient's baseline",
            "They replace laboratory tests",
            "They are only useful at discharge"
          ],
          answer: 1,
          explanation:
            "Trends can reveal deterioration that may not be obvious from a single measurement."
        },
        {
          question: "Decreasing urine output in an acutely ill patient may suggest:",
          options: [
            "Improved kidney function",
            "Possible reduced renal perfusion",
            "Normal digestion",
            "Improved oxygenation"
          ],
          answer: 1,
          explanation:
            "Reduced urine output can occur when renal blood flow or circulating volume is inadequate."
        }
      ]
    },
    {
      title: "3. Fluid and Electrolyte Balance",
      explanation:
        "Fluid and electrolytes are essential for circulation, nerve function, muscle contraction and cellular activity. Common problems include dehydration, fluid overload, sodium abnormalities, potassium abnormalities, calcium abnormalities and magnesium abnormalities. Nurses monitor intake and output, daily weight, edema, mucous membranes, lung sounds, neurological status and laboratory results.",
      clinicalApplication:
        "A patient receiving large amounts of intravenous fluid should be monitored for increasing edema, crackles, weight gain and respiratory difficulty.",
      keyPoints: [
        "Daily weight is useful for monitoring fluid changes.",
        "Intake and output should be accurately recorded.",
        "Fluid overload can cause edema and respiratory problems.",
        "Potassium abnormalities can affect cardiac rhythm.",
        "Sodium abnormalities can affect neurological function.",
        "Electrolyte abnormalities require appropriate monitoring and treatment."
      ],
      examAlert:
        "Potassium abnormalities are particularly important because they can cause dangerous cardiac dysrhythmias.",
      questions: [
        {
          question: "Which assessment is especially useful for monitoring overall fluid changes?",
          options: [
            "Daily weight",
            "Hair color",
            "Vision test",
            "Height"
          ],
          answer: 0,
          explanation:
            "Daily weight can provide a useful indication of changes in body fluid."
        },
        {
          question: "Which electrolyte is strongly associated with cardiac electrical activity?",
          options: [
            "Potassium",
            "Iron",
            "Phosphate only",
            "Vitamin C"
          ],
          answer: 0,
          explanation:
            "Potassium has an important role in cardiac and neuromuscular electrical activity."
        },
        {
          question: "Which finding may indicate fluid overload?",
          options: [
            "Crackles and increasing edema",
            "Dry mouth only",
            "Weight loss",
            "Decreased skin moisture only"
          ],
          answer: 0,
          explanation:
            "Crackles, edema and rapid weight gain may indicate excess fluid."
        }
      ]
    },
    {
      title: "4. Acid-Base Balance and Blood Gas Interpretation",
      explanation:
        "The body maintains blood pH through respiratory and metabolic mechanisms. The lungs regulate carbon dioxide while the kidneys help regulate bicarbonate and hydrogen ions. Nurses may encounter respiratory acidosis, respiratory alkalosis, metabolic acidosis and metabolic alkalosis. Interpretation should consider pH, PaCO2 and HCO3− together.",
      clinicalApplication:
        "A patient with severe hypoventilation may retain carbon dioxide, increasing the risk of respiratory acidosis.",
      keyPoints: [
        "The lungs primarily regulate carbon dioxide.",
        "The kidneys contribute to bicarbonate and hydrogen ion regulation.",
        "Respiratory disorders primarily affect PaCO2.",
        "Metabolic disorders primarily affect bicarbonate.",
        "Always interpret ABG values as a group."
      ],
      examAlert:
        "Do not interpret an ABG using one value alone. Consider pH, PaCO2 and HCO3− together.",
      questions: [
        {
          question: "Which value primarily reflects the respiratory component of acid-base balance?",
          options: [
            "PaCO2",
            "Hemoglobin",
            "Platelet count",
            "Serum albumin"
          ],
          answer: 0,
          explanation:
            "PaCO2 reflects carbon dioxide levels regulated primarily by ventilation."
        },
        {
          question: "Hypoventilation can contribute to:",
          options: [
            "Respiratory acidosis",
            "Metabolic alkalosis only",
            "Hypoglycemia",
            "Iron deficiency"
          ],
          answer: 0,
          explanation:
            "Hypoventilation causes carbon dioxide retention, which can lower blood pH."
        },
        {
          question: "The metabolic component of an ABG is primarily represented by:",
          options: [
            "HCO3−",
            "PaCO2",
            "Oxygen saturation",
            "Respiratory rate"
          ],
          answer: 0,
          explanation:
            "Bicarbonate represents the metabolic component of acid-base regulation."
        }
      ]
    },
    {
      title: "5. Respiratory Assessment",
      explanation:
        "Respiratory assessment includes respiratory rate, rhythm, depth, oxygen saturation, breath sounds, chest movement, skin color, cough and sputum. The nurse should recognize signs of respiratory distress such as increased work of breathing, cyanosis, inability to speak comfortably, altered mental status and decreasing oxygen saturation.",
      clinicalApplication:
        "A patient with increasing respiratory effort and falling oxygen saturation requires prompt assessment and intervention according to the clinical situation.",
      keyPoints: [
        "Assess airway before focusing on less urgent problems.",
        "Monitor oxygen saturation as appropriate.",
        "Listen to breath sounds.",
        "Observe respiratory effort.",
        "Assess cough and sputum.",
        "Watch for altered mental status associated with hypoxia."
      ],
      examAlert:
        "Increasing work of breathing is an important warning sign even when the oxygen saturation has not yet become critically low.",
      questions: [
        {
          question: "Which finding is most concerning in a respiratory patient?",
          options: [
            "Mild occasional cough",
            "Severe increased work of breathing",
            "Patient requesting water",
            "Normal respiratory effort"
          ],
          answer: 1,
          explanation:
            "Severe increased work of breathing can indicate respiratory compromise."
        },
        {
          question: "A nurse assessing a patient's respiratory status should include:",
          options: [
            "Breath sounds and respiratory effort",
            "Hair texture only",
            "Height only",
            "Vision only"
          ],
          answer: 0,
          explanation:
            "Breath sounds and respiratory effort provide important information about respiratory function."
        },
        {
          question: "Which change can occur with worsening hypoxia?",
          options: [
            "Altered mental status",
            "Improved concentration",
            "Increased appetite only",
            "Improved skin perfusion"
          ],
          answer: 0,
          explanation:
            "Hypoxia can affect neurological function and cause confusion or altered consciousness."
        }
      ]
    },
    {
      title: "6. Pneumonia",
      explanation:
        "Pneumonia is an infection and inflammation of lung tissue. It may be caused by bacteria, viruses or other organisms. Common manifestations include cough, fever, sputum production, pleuritic chest discomfort, tachypnea and abnormal breath sounds. Older adults may present with confusion or weakness rather than classic symptoms.",
      clinicalApplication:
        "Nursing care may include monitoring oxygenation, administering prescribed treatment, encouraging appropriate hydration, assisting with airway clearance and monitoring for sepsis or respiratory deterioration.",
      keyPoints: [
        "Monitor respiratory status and oxygenation.",
        "Assess breath sounds.",
        "Encourage appropriate hydration when not contraindicated.",
        "Administer prescribed antimicrobial therapy when indicated.",
        "Monitor temperature and clinical response.",
        "Watch for respiratory failure and sepsis."
      ],
      examAlert:
        "An older adult with pneumonia may present with confusion or functional decline rather than a high fever.",
      questions: [
        {
          question: "Which assessment is a priority for a patient with pneumonia?",
          options: [
            "Respiratory status",
            "Hair growth",
            "Visual acuity only",
            "Nail length"
          ],
          answer: 0,
          explanation:
            "Pneumonia can impair gas exchange, making respiratory assessment essential."
        },
        {
          question: "Which finding may occur in an older adult with pneumonia?",
          options: [
            "Acute confusion",
            "Always severe chest pain",
            "Always high fever",
            "Improved oxygenation"
          ],
          answer: 0,
          explanation:
            "Older adults may have atypical presentations such as confusion or functional decline."
        },
        {
          question: "A major complication of severe pneumonia is:",
          options: [
            "Respiratory failure",
            "Improved lung function",
            "Increased vision",
            "Improved circulation"
          ],
          answer: 0,
          explanation:
            "Severe pneumonia can significantly impair gas exchange and progress to respiratory failure."
        }
      ]
    },
    {
      title: "7. Asthma and Chronic Obstructive Pulmonary Disease",
      explanation:
        "Asthma involves reversible airway narrowing and inflammation, while chronic obstructive pulmonary disease (COPD) involves persistent airflow limitation. Nursing care includes assessing respiratory effort, oxygenation, breath sounds, response to medications and ability to perform activities. Patients should receive education about medications, triggers and symptom monitoring.",
      clinicalApplication:
        "A patient with worsening wheezing, respiratory distress and difficulty speaking requires immediate assessment and escalation according to severity.",
      keyPoints: [
        "Assess respiratory effort.",
        "Monitor oxygenation.",
        "Identify triggers when appropriate.",
        "Teach correct inhaler technique.",
        "Assess response to bronchodilators.",
        "Recognize severe respiratory distress."
      ],
      examAlert:
        "A patient who becomes exhausted and has markedly reduced air movement may be deteriorating even if wheezing becomes less obvious.",
      questions: [
        {
          question: "Which skill is important when teaching a patient who uses an inhaler?",
          options: [
            "Correct inhaler technique",
            "Avoiding all fluids",
            "Stopping all medications",
            "Ignoring symptoms"
          ],
          answer: 0,
          explanation:
            "Correct technique helps ensure that inhaled medication reaches the airways."
        },
        {
          question: "Which finding is most concerning in severe asthma?",
          options: [
            "Severe respiratory distress",
            "Mild occasional cough",
            "Normal breathing",
            "Normal speech without effort"
          ],
          answer: 0,
          explanation:
            "Severe respiratory distress can indicate life-threatening airway compromise."
        },
        {
          question: "COPD is generally associated with:",
          options: [
            "Persistent airflow limitation",
            "Only temporary skin irritation",
            "Improved lung capacity",
            "No respiratory symptoms"
          ],
          answer: 0,
          explanation:
            "COPD is characterized by persistent airflow limitation."
        }
      ]
    },
    {
      title: "8. Cardiovascular Assessment",
      explanation:
        "Cardiovascular assessment includes heart rate, rhythm, blood pressure, peripheral pulses, capillary refill, edema, skin temperature and color, chest discomfort and signs of poor perfusion. Nurses should recognize symptoms that may indicate acute coronary syndrome, heart failure or shock.",
      clinicalApplication:
        "A patient reporting new severe chest pressure associated with sweating and shortness of breath requires urgent assessment and emergency management.",
      keyPoints: [
        "Assess chest pain carefully.",
        "Monitor heart rate and rhythm.",
        "Assess peripheral perfusion.",
        "Check for edema.",
        "Monitor blood pressure.",
        "Recognize symptoms of acute coronary syndrome."
      ],
      examAlert:
        "New severe chest pressure with diaphoresis or dyspnea should be treated as potentially serious until assessed.",
      questions: [
        {
          question: "Which symptom may indicate acute coronary syndrome?",
          options: [
            "New severe chest pressure",
            "Mild hunger",
            "Normal appetite",
            "Itchy skin only"
          ],
          answer: 0,
          explanation:
            "New chest pressure can indicate myocardial ischemia and requires urgent assessment."
        },
        {
          question: "Which finding helps assess peripheral perfusion?",
          options: [
            "Peripheral pulses",
            "Hair style",
            "Hearing only",
            "Height"
          ],
          answer: 0,
          explanation:
            "Peripheral pulses provide information about circulation to the extremities."
        },
        {
          question: "Edema may indicate:",
          options: [
            "Fluid accumulation",
            "Improved circulation in every case",
            "Normal hydration always",
            "Improved kidney function"
          ],
          answer: 0,
          explanation:
            "Edema represents excess fluid in interstitial tissues and may occur with several conditions."
        }
      ]
    },
    {
      title: "9. Hypertension",
      explanation:
        "Hypertension is persistently elevated blood pressure and is an important risk factor for cardiovascular, renal and cerebrovascular disease. Nursing care includes accurate blood pressure measurement, medication monitoring, lifestyle education and assessment for complications.",
      clinicalApplication:
        "Patients should understand that hypertension may have few symptoms while still causing progressive organ damage.",
      keyPoints: [
        "Measure blood pressure correctly.",
        "Encourage adherence to prescribed treatment.",
        "Promote appropriate lifestyle modifications.",
        "Monitor for medication effects.",
        "Assess for signs of complications."
      ],
      examAlert:
        "Hypertension may be asymptomatic; absence of symptoms does not mean absence of risk.",
      questions: [
        {
          question: "Why is hypertension sometimes called a silent condition?",
          options: [
            "It may cause few obvious symptoms",
            "It always causes severe pain",
            "It cannot cause complications",
            "It affects only children"
          ],
          answer: 0,
          explanation:
            "Hypertension can exist for years without obvious symptoms while damaging organs."
        },
        {
          question: "A major long-term complication of hypertension is:",
          options: [
            "Stroke",
            "Improved vision",
            "Increased bone growth",
            "Improved kidney function"
          ],
          answer: 0,
          explanation:
            "Long-term uncontrolled hypertension increases the risk of stroke and other organ damage."
        },
        {
          question: "A key nursing intervention is:",
          options: [
            "Promoting medication adherence",
            "Stopping prescribed drugs independently",
            "Ignoring blood pressure readings",
            "Avoiding all follow-up"
          ],
          answer: 0,
          explanation:
            "Medication adherence and follow-up are important in controlling hypertension."
        }
      ]
    },
    {
      title: "10. Heart Failure",
      explanation:
        "Heart failure occurs when the heart cannot adequately meet the body's circulatory needs. Manifestations may include dyspnea, fatigue, edema, weight gain, pulmonary crackles and reduced exercise tolerance. Nursing care focuses on monitoring fluid status, respiratory status, weight, medication response and patient education.",
      clinicalApplication:
        "A patient with heart failure who gains weight rapidly and develops increasing shortness of breath may be retaining fluid and requires assessment.",
      keyPoints: [
        "Monitor daily weight when ordered.",
        "Assess edema.",
        "Monitor lung sounds.",
        "Assess respiratory status.",
        "Monitor response to prescribed medications.",
        "Teach patients to recognize worsening symptoms."
      ],
      examAlert:
        "Rapid weight gain in heart failure may indicate fluid retention.",
      questions: [
        {
          question: "Which finding may indicate worsening heart failure?",
          options: [
            "Rapid weight gain",
            "Improved exercise tolerance",
            "Decreased edema",
            "Normal breathing"
          ],
          answer: 0,
          explanation:
            "Rapid weight gain can indicate fluid retention."
        },
        {
          question: "Which assessment is important in heart failure?",
          options: [
            "Lung sounds",
            "Hair length",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Pulmonary congestion can produce abnormal lung sounds and respiratory symptoms."
        },
        {
          question: "Patient education should include:",
          options: [
            "Recognizing worsening symptoms",
            "Stopping all medications",
            "Ignoring weight changes",
            "Avoiding follow-up"
          ],
          answer: 0,
          explanation:
            "Early recognition of worsening symptoms can help prevent severe decompensation."
        }
      ]
    },
    {
      title: "11. Acute Coronary Syndrome and Myocardial Infarction",
      explanation:
        "Acute coronary syndrome results from reduced blood flow to cardiac muscle and includes unstable angina and myocardial infarction. Symptoms can include chest pressure, shortness of breath, sweating, nausea and discomfort that may radiate. Some patients, particularly women and people with diabetes, may have atypical symptoms.",
      clinicalApplication:
        "A patient with new chest pressure and associated dyspnea requires urgent assessment, monitoring and appropriate emergency management.",
      keyPoints: [
        "Treat suspected acute coronary syndrome as urgent.",
        "Assess chest discomfort carefully.",
        "Monitor vital signs and cardiac rhythm.",
        "Obtain investigations according to protocol.",
        "Administer prescribed emergency treatment.",
        "Monitor for dysrhythmias and shock."
      ],
      examAlert:
        "Do not assume a patient must have classic crushing chest pain to have myocardial ischemia.",
      questions: [
        {
          question: "Which patient symptom requires urgent assessment?",
          options: [
            "New chest pressure with sweating",
            "Mild hunger",
            "Normal appetite",
            "Chronic stable headache"
          ],
          answer: 0,
          explanation:
            "Chest pressure associated with diaphoresis may indicate acute coronary syndrome."
        },
        {
          question: "A possible complication of myocardial infarction is:",
          options: [
            "Dysrhythmia",
            "Improved cardiac output",
            "Improved perfusion",
            "Increased bone density"
          ],
          answer: 0,
          explanation:
            "Myocardial infarction can damage cardiac tissue and cause dangerous dysrhythmias."
        },
        {
          question: "Atypical symptoms of myocardial ischemia are particularly important to recognize because:",
          options: [
            "Not every patient presents with classic chest pain",
            "Chest pain is always absent",
            "Heart disease affects only men",
            "Women cannot have myocardial infarction"
          ],
          answer: 0,
          explanation:
            "Some patients may present with atypical symptoms such as fatigue, nausea or shortness of breath."
        }
      ]
    },
    {
      title: "12. Dysrhythmias and Cardiac Monitoring",
      explanation:
        "Cardiac dysrhythmias are abnormal heart rhythms that can reduce cardiac output or become life-threatening. Nurses monitor heart rate, rhythm, blood pressure, symptoms and electrocardiographic findings. Important warning signs include hypotension, chest pain, altered mental status and severe shortness of breath.",
      clinicalApplication:
        "A patient with a new rapid irregular rhythm and hypotension requires prompt assessment and escalation.",
      keyPoints: [
        "Assess rhythm and patient symptoms together.",
        "Monitor blood pressure.",
        "Assess perfusion.",
        "Recognize unstable dysrhythmias.",
        "Check for chest pain and altered mental status."
      ],
      examAlert:
        "Treat the patient, not merely the monitor. A rhythm becomes especially concerning when it compromises perfusion.",
      questions: [
        {
          question: "Which finding suggests that a dysrhythmia may be unstable?",
          options: [
            "Hypotension with altered mental status",
            "Normal blood pressure",
            "Normal consciousness",
            "No symptoms"
          ],
          answer: 0,
          explanation:
            "Hypotension and altered mental status indicate possible compromised perfusion."
        },
        {
          question: "When a monitor shows a new abnormal rhythm, the nurse should first:",
          options: [
            "Assess the patient",
            "Ignore the monitor",
            "Leave the unit",
            "Delete the rhythm strip"
          ],
          answer: 0,
          explanation:
            "The patient's clinical condition determines the urgency of an abnormal rhythm."
        },
        {
          question: "A dangerous dysrhythmia can reduce:",
          options: [
            "Cardiac output",
            "Hair growth",
            "Bone length",
            "Visual acuity"
          ],
          answer: 0,
          explanation:
            "Abnormal rhythms can reduce effective cardiac pumping and cardiac output."
        }
      ]
    },
    {
      title: "13. Gastrointestinal Assessment",
      explanation:
        "GI assessment includes abdominal inspection, bowel sounds, tenderness, distention, nausea, vomiting, stool characteristics and nutritional status. Nurses should recognize red flags such as severe abdominal pain, rigid abdomen, gastrointestinal bleeding, persistent vomiting and signs of obstruction.",
      clinicalApplication:
        "A patient with severe abdominal pain and a rigid abdomen requires urgent evaluation for a potentially serious intra-abdominal condition.",
      keyPoints: [
        "Assess abdominal pain carefully.",
        "Observe abdominal distention.",
        "Assess bowel patterns.",
        "Monitor nausea and vomiting.",
        "Observe stool characteristics.",
        "Recognize GI bleeding."
      ],
      examAlert:
        "Severe abdominal pain with rigidity is a potentially serious finding requiring prompt evaluation.",
      questions: [
        {
          question: "Which finding is most concerning?",
          options: [
            "Severe abdominal pain with rigidity",
            "Mild hunger",
            "Normal bowel movement",
            "Mild temporary thirst"
          ],
          answer: 0,
          explanation:
            "Abdominal rigidity with severe pain can indicate a serious intra-abdominal problem."
        },
        {
          question: "Which should be assessed in a patient with GI symptoms?",
          options: [
            "Bowel pattern and abdominal findings",
            "Hair color only",
            "Hearing only",
            "Height only"
          ],
          answer: 0,
          explanation:
            "GI assessment includes abdominal and bowel-related findings."
        },
        {
          question: "Persistent vomiting places the patient at risk for:",
          options: [
            "Fluid and electrolyte imbalance",
            "Improved hydration",
            "Improved nutrition",
            "Increased circulating volume"
          ],
          answer: 0,
          explanation:
            "Repeated vomiting can result in fluid and electrolyte losses."
        }
      ]
    },
    {
      title: "14. Peptic Ulcer Disease and Gastrointestinal Bleeding",
      explanation:
        "Peptic ulcer disease involves damage to the gastrointestinal mucosa and may lead to bleeding or perforation. GI bleeding can present as hematemesis, coffee-ground vomitus, melena or signs of hypovolemia. Nursing care includes monitoring vital signs, assessing bleeding and maintaining appropriate access and treatment as ordered.",
      clinicalApplication:
        "A patient vomiting blood and becoming dizzy requires urgent assessment for significant blood loss.",
      keyPoints: [
        "Monitor for signs of GI bleeding.",
        "Assess hemodynamic status.",
        "Observe vomitus and stool.",
        "Monitor hemoglobin and other ordered laboratory results.",
        "Watch for shock.",
        "Administer prescribed therapy."
      ],
      examAlert:
        "GI bleeding can cause hypovolemic shock if blood loss is significant.",
      questions: [
        {
          question: "Which finding may indicate upper GI bleeding?",
          options: [
            "Coffee-ground vomitus",
            "Clear urine",
            "Normal saliva",
            "Normal skin"
          ],
          answer: 0,
          explanation:
            "Coffee-ground emesis may indicate partially digested blood in the stomach."
        },
        {
          question: "Significant GI bleeding can lead to:",
          options: [
            "Hypovolemic shock",
            "Improved circulation",
            "Increased blood volume",
            "Improved oxygen delivery"
          ],
          answer: 0,
          explanation:
            "Major blood loss can reduce circulating volume and cause hypovolemic shock."
        },
        {
          question: "A patient with active GI bleeding should be monitored closely for:",
          options: [
            "Hemodynamic instability",
            "Improved blood pressure",
            "Increased appetite only",
            "Improved circulation"
          ],
          answer: 0,
          explanation:
            "Blood loss can cause hypotension and other signs of poor perfusion."
        }
      ]
    },
    {
      title: "15. Liver Disease and Cirrhosis",
      explanation:
        "The liver performs many functions including metabolism, detoxification, protein synthesis and processing of nutrients. Chronic liver disease can result in cirrhosis, portal hypertension, ascites, jaundice, bleeding tendencies and hepatic encephalopathy.",
      clinicalApplication:
        "A patient with cirrhosis and increasing abdominal distention may have ascites. Changes in mental status may suggest hepatic encephalopathy.",
      keyPoints: [
        "Assess for jaundice.",
        "Monitor abdominal girth when indicated.",
        "Assess for ascites and edema.",
        "Monitor neurological status.",
        "Observe for bleeding.",
        "Monitor nutritional status."
      ],
      examAlert:
        "New confusion in a patient with advanced liver disease may indicate hepatic encephalopathy.",
      questions: [
        {
          question: "Abdominal fluid accumulation in cirrhosis is called:",
          options: [
            "Ascites",
            "Pneumonia",
            "Emphysema",
            "Dysrhythmia"
          ],
          answer: 0,
          explanation:
            "Ascites is accumulation of fluid within the abdominal cavity."
        },
        {
          question: "A neurological complication of advanced liver disease is:",
          options: [
            "Hepatic encephalopathy",
            "Asthma",
            "Pneumothorax",
            "Fracture"
          ],
          answer: 0,
          explanation:
            "Toxin accumulation associated with severe liver dysfunction can contribute to encephalopathy."
        },
        {
          question: "Which finding should be monitored in cirrhosis?",
          options: [
            "Bleeding tendency",
            "Improved clotting in every case",
            "Improved liver function",
            "Increased bone length"
          ],
          answer: 0,
          explanation:
            "Liver dysfunction can affect clotting factor production and increase bleeding risk."
        }
      ]
    },
    {
      title: "16. Renal Assessment and Acute Kidney Injury",
      explanation:
        "The kidneys regulate fluid balance, electrolytes, acid-base status and waste elimination. Acute kidney injury can develop rapidly and may result in reduced urine output, fluid overload, electrolyte abnormalities and accumulation of metabolic waste.",
      clinicalApplication:
        "A hospitalized patient who suddenly develops markedly reduced urine output should be assessed promptly and monitored for fluid and electrolyte complications.",
      keyPoints: [
        "Monitor urine output.",
        "Assess fluid status.",
        "Monitor electrolyte results.",
        "Monitor renal function tests.",
        "Review medications for potential renal effects.",
        "Watch for fluid overload."
      ],
      examAlert:
        "A sudden significant decrease in urine output is an important clinical warning sign.",
      questions: [
        {
          question: "Which assessment is especially important in acute kidney injury?",
          options: [
            "Urine output",
            "Hair length",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Urine output provides important information about kidney function and perfusion."
        },
        {
          question: "Acute kidney injury may cause:",
          options: [
            "Electrolyte abnormalities",
            "Improved waste removal",
            "Improved renal function",
            "Increased urine production in every case"
          ],
          answer: 0,
          explanation:
            "Reduced renal function can disturb electrolyte and fluid balance."
        },
        {
          question: "A patient with AKI is at risk for:",
          options: [
            "Fluid overload",
            "Improved fluid clearance",
            "Increased kidney function",
            "Improved electrolyte control"
          ],
          answer: 0,
          explanation:
            "Reduced renal excretion can cause fluid accumulation."
        }
      ]
    },
    {
      title: "17. Chronic Kidney Disease and Dialysis",
      explanation:
        "Chronic kidney disease involves progressive loss of kidney function. Advanced disease may require renal replacement therapy such as hemodialysis or peritoneal dialysis. Nurses monitor fluid status, blood pressure, electrolyte abnormalities, access sites and treatment response.",
      clinicalApplication:
        "A patient receiving hemodialysis should have the vascular access assessed for signs of infection and adequate function according to local protocol.",
      keyPoints: [
        "Monitor fluid balance.",
        "Monitor blood pressure.",
        "Assess vascular access when applicable.",
        "Monitor potassium and other electrolytes.",
        "Follow dietary and fluid restrictions as prescribed.",
        "Monitor for complications."
      ],
      examAlert:
        "Protect dialysis access according to facility protocol; unnecessary pressure or procedures on the access limb may compromise it.",
      questions: [
        {
          question: "Which electrolyte abnormality is particularly concerning in advanced kidney disease?",
          options: [
            "Hyperkalemia",
            "Low vitamin C only",
            "Low iron only",
            "High vitamin D only"
          ],
          answer: 0,
          explanation:
            "Reduced renal potassium excretion can cause hyperkalemia, which may lead to dangerous cardiac effects."
        },
        {
          question: "A patient on dialysis requires close monitoring of:",
          options: [
            "Fluid balance",
            "Hair growth only",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Fluid accumulation is a major concern when kidney function is severely reduced."
        },
        {
          question: "Dialysis is used primarily to:",
          options: [
            "Replace some lost kidney functions",
            "Increase bone length",
            "Treat skin infections",
            "Improve eyesight"
          ],
          answer: 0,
          explanation:
            "Dialysis helps remove waste and excess fluid and can help regulate certain electrolytes."
        }
      ]
    },
    {
      title: "18. Diabetes Mellitus",
      explanation:
        "Diabetes mellitus is characterized by abnormal blood glucose regulation. Nursing care includes glucose monitoring, medication administration, nutrition education, foot care, recognition of hypo- and hyperglycemia and prevention of complications.",
      clinicalApplication:
        "A patient receiving insulin should be monitored for hypoglycemia, particularly when food intake is reduced or activity changes.",
      keyPoints: [
        "Monitor blood glucose as ordered.",
        "Recognize hypoglycemia.",
        "Recognize hyperglycemia.",
        "Teach medication and nutrition management.",
        "Encourage appropriate foot care.",
        "Monitor for long-term complications."
      ],
      examAlert:
        "Confusion, sweating, tremors and weakness may be manifestations of hypoglycemia.",
      questions: [
        {
          question: "Which finding may indicate hypoglycemia?",
          options: [
            "Sweating and tremors",
            "Improved concentration",
            "Normal glucose",
            "Improved energy"
          ],
          answer: 0,
          explanation:
            "Autonomic symptoms such as sweating and tremors can occur with low blood glucose."
        },
        {
          question: "A key part of diabetes education is:",
          options: [
            "Foot care",
            "Avoiding all physical activity",
            "Stopping all medications",
            "Ignoring glucose monitoring"
          ],
          answer: 0,
          explanation:
            "Foot care helps reduce the risk of unnoticed injury and complications."
        },
        {
          question: "Insulin therapy can cause:",
          options: [
            "Hypoglycemia",
            "Improved glucose control without any risk",
            "Fractures in every patient",
            "Pneumonia"
          ],
          answer: 0,
          explanation:
            "Insulin lowers blood glucose and can cause hypoglycemia if the balance between insulin, food and activity is disrupted."
        }
      ]
    },
    {
      title: "19. Diabetic Ketoacidosis and Hyperosmolar Hyperglycemic State",
      explanation:
        "Diabetic ketoacidosis (DKA) is a serious metabolic emergency associated primarily with significant insulin deficiency and ketone production. Hyperosmolar hyperglycemic state (HHS) involves severe hyperglycemia and dehydration with minimal or absent significant ketoacidosis. Both require urgent medical management.",
      clinicalApplication:
        "Patients may present with dehydration, weakness, altered mental status and abnormal glucose levels. Nurses monitor fluid status, glucose, electrolytes and neurological status closely.",
      keyPoints: [
        "DKA is a medical emergency.",
        "Severe dehydration may occur.",
        "Potassium must be monitored carefully.",
        "Fluid replacement is an important component of treatment.",
        "Insulin is used according to treatment protocols.",
        "Neurological status should be monitored."
      ],
      examAlert:
        "Treatment of DKA requires careful monitoring of potassium because serum potassium can shift significantly during treatment.",
      questions: [
        {
          question: "DKA is best described as:",
          options: [
            "A serious metabolic emergency",
            "A mild skin condition",
            "A normal response to exercise",
            "A respiratory infection"
          ],
          answer: 0,
          explanation:
            "DKA is a potentially life-threatening metabolic emergency."
        },
        {
          question: "A major concern in DKA is:",
          options: [
            "Dehydration",
            "Improved hydration",
            "Excessive nutrition",
            "Improved circulation"
          ],
          answer: 0,
          explanation:
            "Hyperglycemia causes osmotic diuresis and significant fluid loss."
        },
        {
          question: "Which electrolyte requires close monitoring during DKA treatment?",
          options: [
            "Potassium",
            "Vitamin C",
            "Iron only",
            "Calcium only"
          ],
          answer: 0,
          explanation:
            "Potassium shifts can occur during DKA and its treatment and can affect cardiac function."
        }
      ]
    },
    {
      title: "20. Thyroid Disorders",
      explanation:
        "The thyroid gland produces hormones that influence metabolism. Hyperthyroidism may cause weight loss, heat intolerance, tachycardia and anxiety, while hypothyroidism may cause fatigue, weight gain, cold intolerance and slowed body processes. Severe forms can become emergencies.",
      clinicalApplication:
        "A patient with severe hyperthyroidism and marked tachycardia requires close monitoring for thyroid storm.",
      keyPoints: [
        "Assess cardiovascular status.",
        "Monitor temperature.",
        "Monitor weight changes.",
        "Assess energy and mental status.",
        "Administer prescribed thyroid-related medications.",
        "Recognize thyroid emergencies."
      ],
      examAlert:
        "High fever, severe tachycardia and altered mental status in severe hyperthyroidism can indicate thyroid storm.",
      questions: [
        {
          question: "Which finding is commonly associated with hyperthyroidism?",
          options: [
            "Heat intolerance and tachycardia",
            "Cold intolerance only",
            "Marked slowing of metabolism",
            "Severe lethargy in every case"
          ],
          answer: 0,
          explanation:
            "Hyperthyroidism increases metabolic activity and may cause heat intolerance and tachycardia."
        },
        {
          question: "Which finding is associated with hypothyroidism?",
          options: [
            "Cold intolerance",
            "Severe heat intolerance",
            "Persistent tachycardia in every case",
            "Increased metabolism"
          ],
          answer: 0,
          explanation:
            "Reduced thyroid hormone activity can cause cold intolerance and slowed metabolism."
        },
        {
          question: "A severe hyperthyroid emergency is called:",
          options: [
            "Thyroid storm",
            "Renal colic",
            "Pneumothorax",
            "Hypovolemic anemia"
          ],
          answer: 0,
          explanation:
            "Thyroid storm is a life-threatening extreme form of thyrotoxicosis."
        }
      ]
    },
    {
      title: "21. Neurological Assessment",
      explanation:
        "Neurological assessment includes level of consciousness, orientation, pupils, motor function, sensation, speech and neurological changes. A sudden neurological change can indicate stroke, bleeding, infection, hypoxia or metabolic disturbance.",
      clinicalApplication:
        "A patient who suddenly develops facial weakness, arm weakness and speech difficulty requires urgent stroke assessment.",
      keyPoints: [
        "Assess level of consciousness.",
        "Assess pupils.",
        "Assess motor strength.",
        "Assess speech.",
        "Compare both sides of the body.",
        "Recognize sudden neurological changes."
      ],
      examAlert:
        "Sudden facial weakness, arm weakness or speech difficulty should be treated as a possible stroke emergency.",
      questions: [
        {
          question: "Which finding is highly concerning for stroke?",
          options: [
            "Sudden facial and arm weakness",
            "Normal speech",
            "Normal strength",
            "Stable chronic symptoms"
          ],
          answer: 0,
          explanation:
            "Sudden focal neurological deficits are classic warning signs of stroke."
        },
        {
          question: "Neurological assessment includes:",
          options: [
            "Level of consciousness and pupils",
            "Hair texture only",
            "Height only",
            "Nail length only"
          ],
          answer: 0,
          explanation:
            "Consciousness and pupil responses provide important neurological information."
        },
        {
          question: "Why is sudden neurological change urgent?",
          options: [
            "It may indicate a time-sensitive neurological emergency",
            "It is always normal",
            "It always resolves without treatment",
            "It only affects sleep"
          ],
          answer: 0,
          explanation:
            "Conditions such as stroke require rapid evaluation and treatment."
        }
      ]
    },
    {
      title: "22. Stroke",
      explanation:
        "A stroke occurs when blood flow to part of the brain is interrupted or bleeding occurs within the brain. Rapid recognition is essential because some treatments are time-dependent. Nursing care includes neurological assessment, airway and swallowing assessment, prevention of complications and rehabilitation support.",
      clinicalApplication:
        "A patient with sudden speech difficulty and unilateral weakness should receive immediate stroke evaluation according to emergency protocols.",
      keyPoints: [
        "Recognize sudden neurological deficits.",
        "Determine when symptoms were last known normal.",
        "Assess airway and swallowing.",
        "Prevent aspiration.",
        "Monitor neurological status.",
        "Support rehabilitation."
      ],
      examAlert:
        "The time symptoms started or the last-known-well time can be critically important in stroke care.",
      questions: [
        {
          question: "Which information is especially important when a patient develops sudden stroke symptoms?",
          options: [
            "Time symptoms began or last-known-well time",
            "Favorite food",
            "Shoe size",
            "Hair color"
          ],
          answer: 0,
          explanation:
            "Stroke treatments can be time-dependent."
        },
        {
          question: "Why should swallowing be assessed after stroke?",
          options: [
            "To reduce aspiration risk",
            "To improve vision",
            "To increase height",
            "To prevent hair loss"
          ],
          answer: 0,
          explanation:
            "Stroke can impair swallowing and increase the risk of aspiration."
        },
        {
          question: "A stroke can cause:",
          options: [
            "Unilateral weakness",
            "Improved motor function",
            "Improved speech automatically",
            "No neurological changes"
          ],
          answer: 0,
          explanation:
            "Stroke commonly causes focal neurological deficits such as unilateral weakness."
        }
      ]
    },
    {
      title: "23. Seizures",
      explanation:
        "A seizure results from abnormal electrical activity in the brain. Nursing priorities during an active seizure include protecting the patient from injury, maintaining airway awareness and observing the event. Do not restrain the patient or place objects in the mouth.",
      clinicalApplication:
        "During a seizure, remove nearby hazards, protect the patient's head when possible and monitor the duration and characteristics of the event.",
      keyPoints: [
        "Protect the patient from injury.",
        "Do not restrain the patient.",
        "Do not place objects in the mouth.",
        "Maintain airway awareness.",
        "Time the seizure.",
        "Monitor the recovery period."
      ],
      examAlert:
        "Never put an object or fingers into the mouth of a person experiencing a seizure.",
      questions: [
        {
          question: "What should the nurse do during a seizure?",
          options: [
            "Protect the patient from injury",
            "Restrain the patient tightly",
            "Put an object in the mouth",
            "Force the mouth open"
          ],
          answer: 0,
          explanation:
            "The priority is to protect the patient from injury and maintain safety."
        },
        {
          question: "Why should the seizure be timed?",
          options: [
            "Duration helps guide clinical management",
            "It improves memory",
            "It prevents all future seizures",
            "It measures blood pressure"
          ],
          answer: 0,
          explanation:
            "Duration is clinically important, particularly when seizures are prolonged."
        },
        {
          question: "During a seizure, the nurse should avoid:",
          options: [
            "Restraining the patient",
            "Protecting the head",
            "Removing hazards",
            "Observing the event"
          ],
          answer: 0,
          explanation:
            "Restraint can cause injury and does not safely stop a seizure."
        }
      ]
    },
    {
      title: "24. Musculoskeletal Disorders and Fractures",
      explanation:
        "Musculoskeletal nursing involves assessment of bones, joints, muscles, movement, pain and neurovascular status. Fractures can cause bleeding, swelling, nerve injury and impaired circulation. Nurses assess circulation, sensation, movement, skin color, temperature and pain distal to an injury.",
      clinicalApplication:
        "A patient with a fractured limb should be assessed for changes in distal circulation and sensation.",
      keyPoints: [
        "Assess neurovascular status.",
        "Monitor pain and swelling.",
        "Observe skin color and temperature.",
        "Assess movement and sensation.",
        "Maintain prescribed immobilization.",
        "Monitor for complications."
      ],
      examAlert:
        "New severe pain, numbness, pallor or reduced pulses distal to an injury can indicate neurovascular compromise.",
      questions: [
        {
          question: "Which assessment is essential after a limb fracture?",
          options: [
            "Neurovascular assessment",
            "Hair assessment only",
            "Vision assessment only",
            "Hearing assessment only"
          ],
          answer: 0,
          explanation:
            "Fractures and swelling can compromise circulation and nerve function."
        },
        {
          question: "Which finding is concerning after a fracture?",
          options: [
            "New numbness and reduced distal pulse",
            "Normal sensation",
            "Normal skin color",
            "Normal movement"
          ],
          answer: 0,
          explanation:
            "Numbness and reduced pulse may indicate compromised circulation or nerve function."
        },
        {
          question: "Immobilization is used primarily to:",
          options: [
            "Protect the injured area and support healing",
            "Increase injury",
            "Prevent all movement permanently",
            "Improve vision"
          ],
          answer: 0,
          explanation:
            "Appropriate immobilization helps prevent further injury and supports healing."
        }
      ]
    },
    {
      title: "25. Hematological Disorders and Anemia",
      explanation:
        "Anemia occurs when the blood has reduced oxygen-carrying capacity, often due to decreased hemoglobin or red blood cells. Patients may experience fatigue, weakness, pallor, dizziness and shortness of breath. Nursing care depends on the cause and severity.",
      clinicalApplication:
        "A patient with significant anemia may experience fatigue and tachycardia because the body is attempting to compensate for reduced oxygen delivery.",
      keyPoints: [
        "Assess fatigue and activity tolerance.",
        "Monitor hemoglobin and hematocrit as ordered.",
        "Assess for bleeding.",
        "Identify nutritional factors.",
        "Monitor cardiovascular response.",
        "Treat the underlying cause."
      ],
      examAlert:
        "The cause of anemia matters; nursing care should not assume every anemia is due to iron deficiency.",
      questions: [
        {
          question: "A common manifestation of significant anemia is:",
          options: [
            "Fatigue",
            "Increased energy",
            "Improved oxygen delivery",
            "Improved exercise tolerance"
          ],
          answer: 0,
          explanation:
            "Reduced oxygen-carrying capacity can cause fatigue and weakness."
        },
        {
          question: "Which laboratory values may be monitored in anemia?",
          options: [
            "Hemoglobin and hematocrit",
            "Only blood glucose",
            "Only sodium",
            "Only potassium"
          ],
          answer: 0,
          explanation:
            "Hemoglobin and hematocrit help evaluate red blood cell status."
        },
        {
          question: "A patient with anemia may develop tachycardia because:",
          options: [
            "The body may compensate for reduced oxygen delivery",
            "The heart always becomes healthier",
            "Blood volume always increases",
            "Oxygen delivery improves"
          ],
          answer: 0,
          explanation:
            "The cardiovascular system may compensate by increasing heart rate."
        }
      ]
    },
    {
      title: "26. Infection, Sepsis and Septic Shock",
      explanation:
        "Sepsis is a life-threatening response to infection that can lead to organ dysfunction. Early recognition is essential. Warning signs may include altered mental status, abnormal temperature, tachycardia, tachypnea, hypotension, reduced urine output and other evidence of poor perfusion.",
      clinicalApplication:
        "A patient with suspected infection who develops hypotension, confusion and rapid breathing requires urgent evaluation for sepsis and possible shock.",
      keyPoints: [
        "Recognize infection-associated deterioration.",
        "Monitor vital signs closely.",
        "Assess mental status.",
        "Monitor urine output.",
        "Monitor perfusion.",
        "Administer prescribed emergency treatment promptly."
      ],
      examAlert:
        "Sepsis can progress rapidly to shock and multiple-organ dysfunction.",
      questions: [
        {
          question: "Which patient may be developing sepsis?",
          options: [
            "Patient with suspected infection, confusion and hypotension",
            "Healthy patient with normal vital signs",
            "Patient with mild hunger",
            "Patient with stable chronic pain"
          ],
          answer: 0,
          explanation:
            "Infection combined with altered mental status and hypotension is highly concerning for severe systemic illness."
        },
        {
          question: "A serious complication of sepsis is:",
          options: [
            "Septic shock",
            "Improved perfusion",
            "Improved organ function",
            "Increased oxygen delivery"
          ],
          answer: 0,
          explanation:
            "Sepsis can progress to septic shock and organ dysfunction."
        },
        {
          question: "Which finding may indicate poor perfusion?",
          options: [
            "Hypotension and reduced urine output",
            "Normal urine output",
            "Normal blood pressure",
            "Improved mental status"
          ],
          answer: 0,
          explanation:
            "Hypotension and reduced urine output can indicate inadequate organ perfusion."
        }
      ]
    },
    {
      title: "27. Shock and Emergency Management",
      explanation:
        "Shock occurs when tissue perfusion is inadequate to meet cellular needs. Major categories include hypovolemic, cardiogenic, distributive and obstructive shock. Nursing priorities include rapid assessment, airway and breathing support, circulation, identification of the cause and timely treatment.",
      clinicalApplication:
        "A patient with severe blood loss, tachycardia, hypotension and cool clammy skin may be experiencing hypovolemic shock.",
      keyPoints: [
        "Assess ABCs.",
        "Identify the likely cause.",
        "Monitor blood pressure and heart rate.",
        "Assess mental status.",
        "Monitor urine output.",
        "Prepare for emergency interventions."
      ],
      examAlert:
        "Shock is a perfusion emergency. Do not delay treatment while focusing on less urgent problems.",
      questions: [
        {
          question: "Which finding is consistent with shock?",
          options: [
            "Hypotension with altered mental status",
            "Normal perfusion",
            "Improved urine output",
            "Warm normal skin in every case"
          ],
          answer: 0,
          explanation:
            "Shock can reduce cerebral and systemic perfusion, causing hypotension and altered consciousness."
        },
        {
          question: "A common cause of hypovolemic shock is:",
          options: [
            "Severe blood loss",
            "Improved hydration",
            "Mild hunger",
            "Normal fluid balance"
          ],
          answer: 0,
          explanation:
            "Significant blood or fluid loss reduces circulating volume."
        },
        {
          question: "The first priority in a critically ill patient is generally:",
          options: [
            "Assess and support airway, breathing and circulation",
            "Complete discharge paperwork",
            "Provide entertainment",
            "Discuss long-term diet first"
          ],
          answer: 0,
          explanation:
            "Life-threatening ABC problems take priority."
        }
      ]
    },
    {
      title: "28. Cancer and Oncology Nursing",
      explanation:
        "Cancer involves uncontrolled abnormal cell growth. Oncology nursing includes assessment, symptom management, chemotherapy safety, infection prevention, nutrition, pain management and psychosocial support. Treatment can produce adverse effects such as nausea, fatigue, mucositis, bone marrow suppression and increased infection risk.",
      clinicalApplication:
        "A patient receiving chemotherapy who develops fever may require urgent evaluation because treatment-related immunosuppression can increase infection risk.",
      keyPoints: [
        "Monitor for infection.",
        "Assess pain.",
        "Monitor nutritional status.",
        "Manage treatment side effects.",
        "Provide psychosocial support.",
        "Follow hazardous-drug safety procedures."
      ],
      examAlert:
        "Fever in a severely immunosuppressed oncology patient should be treated as potentially serious.",
      questions: [
        {
          question: "Why is infection a major concern during some cancer treatments?",
          options: [
            "Bone marrow suppression can reduce immune defenses",
            "Cancer treatment always improves immunity",
            "White blood cells always increase",
            "Patients cannot develop infections"
          ],
          answer: 0,
          explanation:
            "Some treatments suppress bone marrow and reduce protective blood cells."
        },
        {
          question: "A major nursing priority in oncology is:",
          options: [
            "Symptom management and infection prevention",
            "Ignoring adverse effects",
            "Stopping treatment independently",
            "Avoiding assessment"
          ],
          answer: 0,
          explanation:
            "Cancer treatment can produce significant symptoms and complications requiring nursing care."
        },
        {
          question: "A patient receiving chemotherapy develops fever. The nurse should:",
          options: [
            "Report and assess promptly",
            "Ignore it",
            "Wait several days",
            "Assume it is harmless"
          ],
          answer: 0,
          explanation:
            "Fever may indicate a serious infection in an immunosuppressed patient."
        }
      ]
    },
    {
      title: "29. Perioperative Medical-Surgical Nursing",
      explanation:
        "Perioperative nursing includes preoperative assessment, preparation, intraoperative safety and postoperative monitoring. Nurses assess allergies, medications, vital signs, laboratory results, surgical site, pain, airway, bleeding and recovery.",
      clinicalApplication:
        "After surgery, a patient with sudden respiratory difficulty requires immediate assessment of airway and breathing.",
      keyPoints: [
        "Verify patient identity and procedure.",
        "Assess allergies and medications.",
        "Monitor postoperative airway.",
        "Assess pain.",
        "Monitor bleeding.",
        "Prevent postoperative complications."
      ],
      examAlert:
        "Immediately after surgery, airway and breathing problems can take priority over pain and other concerns.",
      questions: [
        {
          question: "Which problem should be prioritized immediately after surgery?",
          options: [
            "Airway obstruction",
            "Mild hunger",
            "Request for television",
            "Routine discharge teaching"
          ],
          answer: 0,
          explanation:
            "Airway compromise is an immediate threat to life."
        },
        {
          question: "Preoperative nursing assessment should include:",
          options: [
            "Allergies and medication history",
            "Hair color only",
            "Favorite music only",
            "Shoe size"
          ],
          answer: 0,
          explanation:
            "Allergies and medication history are important for surgical safety."
        },
        {
          question: "Postoperative nursing assessment should include:",
          options: [
            "Airway, breathing, circulation and pain",
            "Only appetite",
            "Only sleep",
            "Only hair growth"
          ],
          answer: 0,
          explanation:
            "Postoperative assessment must identify life-threatening complications and manage symptoms."
        }
      ]
    },
    {
      title: "30. Pain Management in Medical-Surgical Patients",
      explanation:
        "Pain is subjective and should be assessed using the patient's report together with behavioral and physiological findings. Nursing care includes identifying location, quality, severity, timing and aggravating factors, administering prescribed treatment and evaluating the response.",
      clinicalApplication:
        "A patient reporting severe postoperative pain should have the pain assessed and appropriate prescribed treatment provided, followed by reassessment.",
      keyPoints: [
        "Believe and assess the patient's pain report.",
        "Use an appropriate pain scale.",
        "Identify location and characteristics.",
        "Use pharmacological and non-pharmacological measures as appropriate.",
        "Reassess after intervention."
      ],
      examAlert:
        "Pain assessment should not rely solely on vital signs; a patient can have severe pain without dramatic vital-sign changes.",
      questions: [
        {
          question: "The most reliable indicator of pain intensity in a communicative patient is:",
          options: [
            "The patient's self-report",
            "Blood pressure alone",
            "Heart rate alone",
            "Facial expression alone"
          ],
          answer: 0,
          explanation:
            "Pain is subjective, and the patient's report is the primary source when they can communicate."
        },
        {
          question: "After administering analgesia, the nurse should:",
          options: [
            "Reassess pain and response",
            "Never reassess",
            "Immediately discharge the patient",
            "Ignore adverse effects"
          ],
          answer: 0,
          explanation:
            "Reassessment determines effectiveness and identifies adverse effects."
        },
        {
          question: "Pain management can include:",
          options: [
            "Pharmacological and non-pharmacological interventions",
            "Medication only in every case",
            "Ignoring patient preferences",
            "Avoiding reassessment"
          ],
          answer: 0,
          explanation:
            "A multimodal approach may combine medications with appropriate non-drug strategies."
        }
      ]
    },
    {
      title: "31. Nutrition and Medical-Surgical Patients",
      explanation:
        "Nutrition supports healing, immunity, energy production and recovery. Illness may increase nutritional requirements while simultaneously reducing appetite or the ability to eat. Nurses monitor weight, intake, swallowing, laboratory indicators when appropriate and signs of malnutrition.",
      clinicalApplication:
        "A postoperative patient with poor appetite and delayed wound healing may require nutritional assessment and appropriate support.",
      keyPoints: [
        "Monitor nutritional intake.",
        "Monitor weight trends.",
        "Assess swallowing when indicated.",
        "Recognize signs of malnutrition.",
        "Support prescribed nutritional therapy.",
        "Consider cultural and individual food preferences."
      ],
      examAlert:
        "Poor nutritional status can delay wound healing and increase susceptibility to infection.",
      questions: [
        {
          question: "Adequate nutrition is important because it supports:",
          options: [
            "Healing and immune function",
            "Only hair growth",
            "Only vision",
            "Only sleep"
          ],
          answer: 0,
          explanation:
            "Nutrients are essential for tissue repair, immunity and energy."
        },
        {
          question: "Which patient may need nutritional assessment?",
          options: [
            "Patient with prolonged poor intake and weight loss",
            "Patient with normal intake",
            "Patient eating adequately",
            "Healthy patient with stable weight"
          ],
          answer: 0,
          explanation:
            "Poor intake and weight loss increase the risk of malnutrition."
        },
        {
          question: "Malnutrition can contribute to:",
          options: [
            "Delayed wound healing",
            "Faster healing in every case",
            "Improved immunity",
            "Increased muscle strength"
          ],
          answer: 0,
          explanation:
            "Insufficient nutrients can impair tissue repair and immune function."
        }
      ]
    },
    {
      title: "32. Pressure Injuries and Wound Management",
      explanation:
        "Pressure injuries develop when prolonged pressure and other forces damage tissue. Risk factors include immobility, poor nutrition, moisture, impaired sensation and poor perfusion. Nursing care includes risk assessment, repositioning, skin inspection, nutrition support and appropriate wound care.",
      clinicalApplication:
        "An immobile patient with poor nutrition requires regular skin assessment and a prevention plan.",
      keyPoints: [
        "Assess pressure injury risk.",
        "Inspect skin regularly.",
        "Reposition according to the care plan.",
        "Manage moisture.",
        "Support nutrition.",
        "Document wound characteristics."
      ],
      examAlert:
        "Prevention is easier than treating an established pressure injury.",
      questions: [
        {
          question: "Which patient is at increased risk for pressure injury?",
          options: [
            "Immobile patient with poor nutrition",
            "Fully mobile patient with normal nutrition",
            "Healthy athlete",
            "Patient who changes position independently"
          ],
          answer: 0,
          explanation:
            "Immobility and poor nutrition are important risk factors."
        },
        {
          question: "A key pressure injury prevention strategy is:",
          options: [
            "Regular repositioning and skin assessment",
            "Ignoring the skin",
            "Keeping the patient in one position",
            "Avoiding nutrition"
          ],
          answer: 0,
          explanation:
            "Reducing pressure and identifying skin changes early help prevent injury."
        },
        {
          question: "Moisture can increase risk of:",
          options: [
            "Skin breakdown",
            "Improved skin strength",
            "Improved circulation",
            "Increased bone density"
          ],
          answer: 0,
          explanation:
            "Excess moisture can weaken skin and contribute to breakdown."
        }
      ]
    },
    {
      title: "33. Infection Prevention and Medical-Surgical Nursing",
      explanation:
        "Medical-surgical nurses play an essential role in preventing healthcare-associated infections. Core measures include hand hygiene, appropriate personal protective equipment, safe injection practices, environmental hygiene and transmission-based precautions when indicated.",
      clinicalApplication:
        "A nurse caring for a patient with a transmissible infection must follow the appropriate precautions and hand hygiene procedures.",
      keyPoints: [
        "Perform hand hygiene correctly.",
        "Use PPE according to risk.",
        "Follow isolation precautions when indicated.",
        "Maintain aseptic technique.",
        "Prevent cross-contamination.",
        "Educate patients and families."
      ],
      examAlert:
        "Hand hygiene remains one of the most important measures for reducing transmission of infection.",
      questions: [
        {
          question: "Which action is fundamental to infection prevention?",
          options: [
            "Hand hygiene",
            "Sharing equipment without cleaning",
            "Reusing disposable supplies",
            "Ignoring PPE"
          ],
          answer: 0,
          explanation:
            "Hand hygiene reduces transmission of microorganisms."
        },
        {
          question: "PPE selection should be based primarily on:",
          options: [
            "Expected exposure risk",
            "Staff preference only",
            "Patient's favorite color",
            "Time of day"
          ],
          answer: 0,
          explanation:
            "PPE should match the anticipated exposure to infectious material."
        },
        {
          question: "Cross-contamination can be reduced by:",
          options: [
            "Proper hand hygiene and equipment cleaning",
            "Sharing contaminated equipment",
            "Ignoring precautions",
            "Skipping cleaning"
          ],
          answer: 0,
          explanation:
            "Hand hygiene and proper cleaning reduce transmission between patients and environments."
        }
      ]
    },
    {
      title: "34. Clinical Prioritization and Delegation",
      explanation:
        "Medical-surgical nursing requires the ability to prioritize care. Life-threatening problems, acute changes and unstable patients generally take priority over stable patients and routine tasks. Delegation requires consideration of the task, patient's condition, staff competence and applicable policies.",
      clinicalApplication:
        "A nurse should assess an unstable patient with respiratory distress before completing a routine task for a stable patient.",
      keyPoints: [
        "Prioritize unstable patients.",
        "Address ABC problems first.",
        "Consider acute versus chronic problems.",
        "Delegate appropriate tasks.",
        "The nurse remains accountable for delegated care.",
        "Reassess outcomes."
      ],
      examAlert:
        "When answering priority questions, look for the patient with the greatest immediate risk of deterioration.",
      questions: [
        {
          question: "Which patient should generally be seen first?",
          options: [
            "An unstable patient with respiratory distress",
            "A stable patient requesting a snack",
            "A patient waiting for routine teaching",
            "A patient asking for a blanket"
          ],
          answer: 0,
          explanation:
            "Respiratory distress represents an immediate threat to life."
        },
        {
          question: "Before delegating a task, the nurse should consider:",
          options: [
            "Patient condition and staff competence",
            "Only how quickly the task can be completed",
            "Patient's favorite color",
            "The nurse's convenience only"
          ],
          answer: 0,
          explanation:
            "Safe delegation requires matching the task and patient needs with the worker's competence and scope."
        },
        {
          question: "After delegation, the nurse should:",
          options: [
            "Follow up and evaluate the outcome",
            "Forget about the task",
            "Assume everything was completed correctly",
            "Avoid documentation"
          ],
          answer: 0,
          explanation:
            "The nurse must follow up and ensure that patient care needs are met."
        }
      ]
    },
    {
      title: "35. Comprehensive Medical-Surgical Nursing Revision",
      explanation:
        "This final revision module integrates assessment, prioritization, fluid and electrolytes, respiratory and cardiovascular disorders, gastrointestinal and renal conditions, endocrine and neurological disorders, infection, oncology, pain, nutrition, wounds and emergency care. Strong examination performance requires applying knowledge to patient situations rather than memorizing isolated facts.",
      clinicalApplication:
        "When presented with several patients, identify the one with an immediate threat to life or rapid deterioration, stabilize urgent problems and then address less urgent needs.",
      keyPoints: [
        "Think ABCs when appropriate.",
        "Identify unstable patients.",
        "Recognize abnormal trends.",
        "Reassess after interventions.",
        "Connect symptoms with underlying pathophysiology.",
        "Prioritize safety.",
        "Use clinical judgment rather than memorization alone."
      ],
      examAlert:
        "For priority questions, ask: Which patient could deteriorate or die first if I do not act?",
      questions: [
        {
          question: "Four patients are waiting for assessment. Which should the nurse see first?",
          options: [
            "Patient with severe difficulty breathing",
            "Patient requesting discharge information",
            "Patient with mild chronic pain",
            "Patient requesting food"
          ],
          answer: 0,
          explanation:
            "Severe breathing difficulty represents an immediate threat to life."
        },
        {
          question: "A patient suddenly becomes confused, hypotensive and tachypneic. What should the nurse suspect?",
          options: [
            "Possible serious deterioration",
            "Normal recovery",
            "Improved circulation",
            "Normal aging"
          ],
          answer: 0,
          explanation:
            "Sudden confusion, hypotension and rapid breathing are concerning for severe systemic illness and poor perfusion."
        },
        {
          question: "What is the most important habit after performing a nursing intervention?",
          options: [
            "Reassess the patient's response",
            "Immediately leave",
            "Ignore the outcome",
            "Wait until discharge"
          ],
          answer: 0,
          explanation:
            "Reassessment determines whether the intervention was effective and whether the patient's condition has changed."
        },
        {
          question: "Which approach is most useful for difficult medical-surgical examination questions?",
          options: [
            "Combine assessment, pathophysiology, prioritization and clinical judgment",
            "Choose the longest answer",
            "Memorize without understanding",
            "Always choose the most complicated intervention"
          ],
          answer: 0,
          explanation:
            "Medical-surgical questions often test application of knowledge and prioritization rather than simple recall."
        },
        {
          question: "When a patient has an immediate airway problem and a routine comfort request, which comes first?",
          options: [
            "Airway problem",
            "Comfort request",
            "Discharge teaching",
            "Routine documentation"
          ],
          answer: 0,
          explanation:
            "Airway threats are immediately life-threatening and take priority."
        }
      ]
    }
  ]
},

    // ========================================================
    // 6. PHARMACOLOGY
    // ========================================================
"pharmacology": {
  title: "Pharmacology",
  description:
    "A comprehensive nursing pharmacology course covering pharmacokinetics, pharmacodynamics, medication safety, drug calculations, major drug classes, therapeutic effects, adverse reactions, contraindications, nursing responsibilities and clinical judgment.",
  lessons: [
    {
      title: "1. Introduction to Pharmacology",
      explanation:
        "Pharmacology is the study of drugs and their effects on living organisms. Nurses need pharmacology knowledge to administer medications safely, recognize therapeutic effects, identify adverse reactions and educate patients. A medication should never be viewed simply as a drug name; the nurse should understand why it is being given, what effect is expected and what complications may occur.",
      clinicalApplication:
        "Before administering a medication, the nurse considers the patient's diagnosis, allergies, current medications, vital signs, laboratory results and relevant contraindications.",
      keyPoints: [
        "Pharmacology is the study of drugs and their effects.",
        "Nurses must understand why medications are prescribed.",
        "Assess the patient before medication administration.",
        "Monitor therapeutic effects.",
        "Recognize adverse effects.",
        "Educate patients about medications."
      ],
      examAlert:
        "Safe medication administration requires more than knowing the drug name. Always connect the drug to its indication, expected effect and possible risks.",
      questions: [
        {
          question: "What is pharmacology primarily concerned with?",
          options: [
            "Drugs and their effects on living organisms",
            "Only human anatomy",
            "Only surgical procedures",
            "Only nutrition"
          ],
          answer: 0,
          explanation:
            "Pharmacology studies drugs, their actions, effects and interactions with living organisms."
        },
        {
          question: "Before administering a medication, the nurse should:",
          options: [
            "Assess relevant patient information",
            "Give every medication immediately",
            "Ignore allergies",
            "Avoid checking the prescription"
          ],
          answer: 0,
          explanation:
            "Assessment helps determine whether the medication is appropriate and safe for the patient."
        },
        {
          question: "A nurse should monitor a medication primarily to determine:",
          options: [
            "Its therapeutic effect and possible adverse effects",
            "The patient's favorite food",
            "The patient's height",
            "The patient's handwriting"
          ],
          answer: 0,
          explanation:
            "Monitoring determines whether the medication is working and whether complications are developing."
        }
      ]
    },
    {
      title: "2. Pharmacokinetics",
      explanation:
        "Pharmacokinetics describes what the body does to a drug. The major processes are absorption, distribution, metabolism and excretion, commonly remembered as ADME. Factors such as route of administration, age, liver function, kidney function, circulation and other medications can influence pharmacokinetics.",
      clinicalApplication:
        "A patient with significant kidney impairment may have difficulty excreting certain medications, increasing the risk of drug accumulation and toxicity.",
      keyPoints: [
        "Absorption is movement of a drug into the bloodstream.",
        "Distribution describes movement of drug throughout the body.",
        "Metabolism changes drugs, often in the liver.",
        "Excretion removes drugs or metabolites, often through the kidneys.",
        "Kidney and liver dysfunction can alter drug handling."
      ],
      examAlert:
        "Remember ADME: Absorption, Distribution, Metabolism and Excretion.",
      questions: [
        {
          question: "What does pharmacokinetics describe?",
          options: [
            "What the body does to a drug",
            "What a drug does to a receptor only",
            "Only drug names",
            "Only medication storage"
          ],
          answer: 0,
          explanation:
            "Pharmacokinetics describes how the body absorbs, distributes, metabolizes and excretes drugs."
        },
        {
          question: "Which organ is especially important for metabolism of many drugs?",
          options: [
            "Liver",
            "Skin",
            "Ear",
            "Spleen only"
          ],
          answer: 0,
          explanation:
            "The liver is a major site of metabolism for many medications."
        },
        {
          question: "Which organ is particularly important for excretion of many drugs?",
          options: [
            "Kidneys",
            "Eyes",
            "Skin only",
            "Ears"
          ],
          answer: 0,
          explanation:
            "The kidneys remove many drugs and their metabolites from the body."
        }
      ]
    },
    {
      title: "3. Pharmacodynamics",
      explanation:
        "Pharmacodynamics describes what a drug does to the body. It includes drug-receptor interactions, therapeutic effects, adverse effects and mechanisms of action. Drugs can act as agonists, which activate receptors, or antagonists, which block receptor activity.",
      clinicalApplication:
        "Understanding a drug's mechanism helps the nurse predict expected effects and recognize unexpected responses.",
      keyPoints: [
        "Pharmacodynamics describes drug effects on the body.",
        "Receptors influence drug responses.",
        "Agonists activate receptors.",
        "Antagonists block or reduce receptor activity.",
        "Dose and patient factors influence drug response."
      ],
      examAlert:
        "Pharmacokinetics = what the body does to the drug. Pharmacodynamics = what the drug does to the body.",
      questions: [
        {
          question: "Pharmacodynamics refers to:",
          options: [
            "What a drug does to the body",
            "What the body does to a drug",
            "Drug storage only",
            "Prescription writing only"
          ],
          answer: 0,
          explanation:
            "Pharmacodynamics describes drug actions and effects on the body."
        },
        {
          question: "An agonist generally:",
          options: [
            "Activates a receptor",
            "Always destroys a receptor",
            "Prevents absorption",
            "Increases urine production in every case"
          ],
          answer: 0,
          explanation:
            "An agonist binds to a receptor and produces or promotes a response."
        },
        {
          question: "An antagonist generally:",
          options: [
            "Blocks or reduces receptor activity",
            "Always activates every receptor",
            "Prevents all drug metabolism",
            "Increases blood volume"
          ],
          answer: 0,
          explanation:
            "Antagonists interfere with receptor activation or action."
        }
      ]
    },
    {
      title: "4. Routes of Medication Administration",
      explanation:
        "Medications can be administered through oral, sublingual, buccal, topical, transdermal, inhaled, rectal, vaginal, intradermal, subcutaneous, intramuscular and intravenous routes. The route affects absorption, onset and duration of action.",
      clinicalApplication:
        "A medication requiring rapid effect may be administered through a route that provides faster systemic availability when clinically appropriate.",
      keyPoints: [
        "Oral medications are convenient but depend on GI absorption.",
        "Sublingual medications are absorbed through tissues under the tongue.",
        "Intravenous medications enter the bloodstream directly.",
        "Intramuscular medications are injected into muscle.",
        "Subcutaneous medications are injected into tissue beneath the skin.",
        "Topical medications are applied to the skin or mucous membranes."
      ],
      examAlert:
        "Never assume that different routes of the same medication are interchangeable. Route-specific formulations and doses must be followed.",
      questions: [
        {
          question: "Which route places medication directly into the bloodstream?",
          options: [
            "Intravenous",
            "Oral",
            "Topical",
            "Rectal"
          ],
          answer: 0,
          explanation:
            "Intravenous administration delivers medication directly into the bloodstream."
        },
        {
          question: "Which route is administered under the tongue?",
          options: [
            "Sublingual",
            "Intramuscular",
            "Subcutaneous",
            "Topical"
          ],
          answer: 0,
          explanation:
            "Sublingual medications are placed under the tongue."
        },
        {
          question: "The route of administration can influence:",
          options: [
            "Onset and absorption",
            "Patient's height",
            "Blood type",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Different routes produce different absorption characteristics and onset times."
        }
      ]
    },
    {
      title: "5. Medication Safety and the Rights of Administration",
      explanation:
        "Medication safety requires systematic checking of the medication order, patient identity, drug, dose, route, time and other applicable safety elements. Nurses should verify allergies, assess relevant clinical data and document administration appropriately.",
      clinicalApplication:
        "If the medication label, order and patient information do not match, the nurse should stop and clarify the discrepancy before administering the medication.",
      keyPoints: [
        "Verify patient identity.",
        "Verify medication and dose.",
        "Verify route and timing.",
        "Check allergies.",
        "Check expiration and medication integrity.",
        "Document administration.",
        "Clarify unclear orders."
      ],
      examAlert:
        "Never administer a medication when an order is unclear or a safety check fails. Stop and clarify.",
      questions: [
        {
          question: "What should the nurse do if a medication order is unclear?",
          options: [
            "Clarify the order before administration",
            "Guess the intended dose",
            "Give the medication anyway",
            "Ask another patient"
          ],
          answer: 0,
          explanation:
            "An unclear medication order must be clarified to prevent medication error."
        },
        {
          question: "Which is a critical medication safety check?",
          options: [
            "Patient identity",
            "Patient's favorite color",
            "Room decoration",
            "Television channel"
          ],
          answer: 0,
          explanation:
            "Correct patient identification is essential to medication safety."
        },
        {
          question: "Medication allergies should be checked:",
          options: [
            "Before administration",
            "Only after an allergic reaction",
            "Only at discharge",
            "Never"
          ],
          answer: 0,
          explanation:
            "Allergies must be assessed before giving medications."
        }
      ]
    },
    {
      title: "6. Adverse Drug Reactions, Side Effects and Toxicity",
      explanation:
        "A side effect is an unintended effect that may occur at normal therapeutic doses. An adverse drug reaction is a harmful or unintended response, while toxicity refers to harmful effects associated with excessive drug exposure or accumulation. Nurses must distinguish expected minor effects from potentially dangerous reactions.",
      clinicalApplication:
        "A patient who develops difficulty breathing, facial swelling or severe hypotension after medication administration requires immediate assessment and emergency management.",
      keyPoints: [
        "Side effects can be predictable but unwanted.",
        "Adverse reactions can be harmful.",
        "Toxicity may occur when drug levels become excessive.",
        "Severe allergic reactions require emergency attention.",
        "Document and report significant reactions."
      ],
      examAlert:
        "Difficulty breathing or airway swelling after a medication may indicate a severe allergic reaction and requires immediate action.",
      questions: [
        {
          question: "Which finding may indicate a severe allergic drug reaction?",
          options: [
            "Difficulty breathing and facial swelling",
            "Mild hunger",
            "Normal breathing",
            "Normal appetite"
          ],
          answer: 0,
          explanation:
            "Airway symptoms and facial swelling can indicate a potentially life-threatening allergic reaction."
        },
        {
          question: "Toxicity can occur when:",
          options: [
            "Drug exposure becomes harmful",
            "Every drug works normally",
            "The medication is always effective",
            "The patient drinks water"
          ],
          answer: 0,
          explanation:
            "Toxicity refers to harmful effects resulting from excessive exposure or accumulation."
        },
        {
          question: "A serious medication reaction should be:",
          options: [
            "Recognized, managed and reported promptly",
            "Ignored",
            "Hidden",
            "Documented only weeks later"
          ],
          answer: 0,
          explanation:
            "Prompt recognition and response can prevent serious harm."
        }
      ]
    },
    {
      title: "7. Drug Interactions",
      explanation:
        "Drug interactions occur when one drug changes the effect of another drug. Interactions can increase toxicity, reduce therapeutic effects or create unexpected responses. Food, alcohol, herbal products and disease conditions can also influence medication effects.",
      clinicalApplication:
        "A patient taking multiple medications should have the medication list reviewed for potential interactions.",
      keyPoints: [
        "Multiple medications increase interaction risk.",
        "Food can alter absorption or metabolism of some drugs.",
        "Disease conditions can change drug response.",
        "Patients should disclose prescription and non-prescription products.",
        "Medication reconciliation improves safety."
      ],
      examAlert:
        "Always ask about prescription drugs, over-the-counter drugs, supplements and herbal products.",
      questions: [
        {
          question: "A drug interaction occurs when:",
          options: [
            "One substance changes the effect of another",
            "A drug always works normally",
            "A medication is stored correctly",
            "A patient reads the label"
          ],
          answer: 0,
          explanation:
            "Interactions occur when another drug, food, supplement or condition changes medication effects."
        },
        {
          question: "Medication reconciliation helps identify:",
          options: [
            "Potential medication discrepancies and interactions",
            "Patient height",
            "Blood type only",
            "Room temperature"
          ],
          answer: 0,
          explanation:
            "Medication reconciliation compares medication lists to identify discrepancies and safety problems."
        },
        {
          question: "Patients should tell healthcare professionals about:",
          options: [
            "Prescription, OTC and herbal products",
            "Only prescription medications",
            "Only antibiotics",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "All substances can potentially influence medication safety."
        }
      ]
    },
    {
      title: "8. Medication Calculations",
      explanation:
        "Medication calculations help nurses determine the correct amount of medication to administer. Common calculations involve tablets, liquid medications, injections, weight-based doses and IV rates. Calculations should be performed carefully and independently verified according to institutional policy when required.",
      clinicalApplication:
        "A nurse may calculate the volume of a liquid medication required when the prescription dose differs from the concentration available.",
      keyPoints: [
        "Read the prescription carefully.",
        "Identify the dose ordered.",
        "Identify the dose available.",
        "Use consistent units.",
        "Calculate carefully.",
        "Recheck the final answer."
      ],
      examAlert:
        "Unit conversion errors are a major cause of medication errors. Convert units before calculating when necessary.",
      questions: [
        {
          question: "Before calculating a medication dose, the nurse should identify:",
          options: [
            "Dose ordered and dose available",
            "Patient's favorite food",
            "Room number only",
            "Time of sunrise"
          ],
          answer: 0,
          explanation:
            "The ordered dose and available concentration are necessary for calculating the amount to administer."
        },
        {
          question: "A common source of medication calculation errors is:",
          options: [
            "Incorrect unit conversion",
            "Correct identification",
            "Careful rechecking",
            "Using appropriate units"
          ],
          answer: 0,
          explanation:
            "Incorrect unit conversion can produce dangerous dosing errors."
        },
        {
          question: "After calculating a medication dose, the nurse should:",
          options: [
            "Recheck the calculation",
            "Ignore the result",
            "Change the prescription",
            "Guess the final amount"
          ],
          answer: 0,
          explanation:
            "Rechecking helps identify calculation errors before administration."
        }
      ]
    },
    {
      title: "9. Absorption, Bioavailability and First-Pass Effect",
      explanation:
        "Absorption refers to movement of a drug from its administration site into systemic circulation. Bioavailability describes the fraction of an administered dose that reaches systemic circulation. Some orally administered drugs undergo first-pass metabolism in the liver before reaching systemic circulation.",
      clinicalApplication:
        "The same medication can have different effects depending on its route because routes differ in absorption and first-pass metabolism.",
      keyPoints: [
        "Absorption varies by route.",
        "Bioavailability describes systemic availability.",
        "Oral drugs may undergo first-pass metabolism.",
        "IV administration bypasses absorption barriers.",
        "Route influences onset and bioavailability."
      ],
      examAlert:
        "Intravenous administration has essentially complete systemic bioavailability because the medication enters the bloodstream directly.",
      questions: [
        {
          question: "Bioavailability refers to:",
          options: [
            "The fraction of a dose reaching systemic circulation",
            "The color of a medication",
            "The medication's package size",
            "The drug's expiration date"
          ],
          answer: 0,
          explanation:
            "Bioavailability describes how much of an administered dose reaches systemic circulation."
        },
        {
          question: "First-pass metabolism is particularly associated with:",
          options: [
            "Some oral medications",
            "Every IV medication",
            "Topical creams only",
            "Eye drops only"
          ],
          answer: 0,
          explanation:
            "Some orally administered drugs pass through the liver before reaching systemic circulation."
        },
        {
          question: "Which route bypasses the absorption process and enters systemic circulation directly?",
          options: [
            "Intravenous",
            "Oral",
            "Rectal",
            "Topical"
          ],
          answer: 0,
          explanation:
            "IV medication is delivered directly into the bloodstream."
        }
      ]
    },
    {
      title: "10. Antibiotics and Antibacterial Drugs",
      explanation:
        "Antibacterial medications are used to treat susceptible bacterial infections. Different antibiotic classes act through different mechanisms. Nurses monitor therapeutic response, allergies, adverse effects and signs of treatment failure. Antibiotics should be used appropriately to reduce antimicrobial resistance.",
      clinicalApplication:
        "A patient receiving an antibiotic should be monitored for clinical improvement as well as allergic reactions, gastrointestinal effects and other drug-specific complications.",
      keyPoints: [
        "Antibiotics target bacteria.",
        "Not all infections require antibiotics.",
        "Complete treatment according to the prescribed regimen.",
        "Monitor for allergic reactions.",
        "Monitor for adverse effects.",
        "Antimicrobial stewardship reduces resistance."
      ],
      examAlert:
        "Antibiotics do not treat viral infections unless there is a bacterial infection requiring treatment.",
      questions: [
        {
          question: "Antibacterial drugs primarily target:",
          options: [
            "Bacteria",
            "All viruses",
            "All fungi",
            "All parasites"
          ],
          answer: 0,
          explanation:
            "Antibacterial medications are designed to treat susceptible bacterial infections."
        },
        {
          question: "A patient receiving an antibiotic develops facial swelling and difficulty breathing. What is the priority?",
          options: [
            "Recognize a possible severe allergic reaction and act immediately",
            "Continue the medication without assessment",
            "Ignore the symptoms",
            "Wait until discharge"
          ],
          answer: 0,
          explanation:
            "Airway symptoms after medication administration may indicate a life-threatening allergic reaction."
        },
        {
          question: "Antimicrobial stewardship is important because it helps reduce:",
          options: [
            "Antimicrobial resistance",
            "Patient education",
            "Medication safety",
            "Appropriate prescribing"
          ],
          answer: 0,
          explanation:
            "Responsible antimicrobial use helps reduce the development and spread of resistance."
        }
      ]
    },
    {
      title: "11. Antiviral, Antifungal and Antiparasitic Drugs",
      explanation:
        "Antimicrobial pharmacology includes medications directed against viruses, fungi and parasites. Treatment depends on the organism, site of infection, severity and patient factors. Nurses monitor adherence, therapeutic response and drug-specific adverse effects.",
      clinicalApplication:
        "Before administering an antimicrobial, the nurse should understand the suspected organism and prescribed treatment plan.",
      keyPoints: [
        "Antivirals target specific viral processes.",
        "Antifungals treat susceptible fungal infections.",
        "Antiparasitic drugs target parasites.",
        "Different organisms require different treatments.",
        "Monitor response and adverse effects."
      ],
      examAlert:
        "Do not assume that one antimicrobial treats every type of infection.",
      questions: [
        {
          question: "Antifungal medications are used primarily to treat:",
          options: [
            "Fungal infections",
            "All bacterial infections",
            "Fractures",
            "Hypertension"
          ],
          answer: 0,
          explanation:
            "Antifungals are directed against susceptible fungi."
        },
        {
          question: "Antiviral drugs primarily target:",
          options: [
            "Viral infections or viral replication processes",
            "Bone fractures",
            "Hypertension",
            "Anemia"
          ],
          answer: 0,
          explanation:
            "Antiviral medications act against specific viral processes."
        },
        {
          question: "The nurse should monitor antimicrobial therapy for:",
          options: [
            "Therapeutic response and adverse effects",
            "Only patient height",
            "Only appetite",
            "No clinical changes"
          ],
          answer: 0,
          explanation:
            "Monitoring determines effectiveness and identifies complications."
        }
      ]
    },
    {
      title: "12. Analgesics and Pain Medications",
      explanation:
        "Analgesics are used to relieve pain. Common groups include non-opioid analgesics and opioids. Nurses assess pain before and after treatment and monitor for adverse effects such as sedation, respiratory depression, gastrointestinal effects or bleeding depending on the medication.",
      clinicalApplication:
        "A patient receiving an opioid requires monitoring of pain relief, sedation and respiratory status.",
      keyPoints: [
        "Assess pain before medication.",
        "Reassess after medication.",
        "Monitor opioid-related sedation and respiratory depression.",
        "Monitor non-opioid adverse effects.",
        "Use the lowest effective treatment consistent with the care plan."
      ],
      examAlert:
        "For opioids, excessive sedation and respiratory depression are critical safety concerns.",
      questions: [
        {
          question: "A patient receiving an opioid should be monitored closely for:",
          options: [
            "Respiratory depression",
            "Improved vision",
            "Increased height",
            "Improved hearing"
          ],
          answer: 0,
          explanation:
            "Opioids can depress the central nervous system and respiratory drive."
        },
        {
          question: "After administering an analgesic, the nurse should:",
          options: [
            "Reassess pain and patient response",
            "Never reassess",
            "Ignore sedation",
            "Immediately discharge the patient"
          ],
          answer: 0,
          explanation:
            "Reassessment determines effectiveness and identifies adverse effects."
        },
        {
          question: "A major goal of analgesic therapy is:",
          options: [
            "Safe reduction of pain while monitoring adverse effects",
            "Complete absence of all sensation",
            "Permanent sedation",
            "Avoiding all patient assessment"
          ],
          answer: 0,
          explanation:
            "Pain relief should be balanced with medication safety."
        }
      ]
    },
    {
      title: "13. Cardiovascular Drugs: Antihypertensives",
      explanation:
        "Antihypertensive medications reduce blood pressure through different mechanisms. Classes include ACE inhibitors, angiotensin receptor blockers, calcium channel blockers, beta blockers and diuretics. Nursing monitoring depends on the medication and may include blood pressure, pulse, renal function and electrolytes.",
      clinicalApplication:
        "A patient taking an antihypertensive who becomes dizzy when standing may require assessment for medication-related hypotension.",
      keyPoints: [
        "Monitor blood pressure.",
        "Some medications affect heart rate.",
        "Monitor electrolytes when appropriate.",
        "Monitor renal function when relevant.",
        "Teach adherence and safety precautions."
      ],
      examAlert:
        "Patients taking medications that lower blood pressure may experience dizziness or orthostatic hypotension.",
      questions: [
        {
          question: "A common nursing assessment for antihypertensive therapy is:",
          options: [
            "Blood pressure",
            "Hair color",
            "Height",
            "Hearing only"
          ],
          answer: 0,
          explanation:
            "Blood pressure is monitored to evaluate therapeutic response and safety."
        },
        {
          question: "A patient becomes dizzy after standing while taking an antihypertensive. The nurse should assess for:",
          options: [
            "Possible orthostatic hypotension",
            "Improved vision",
            "Increased bone density",
            "Improved hearing"
          ],
          answer: 0,
          explanation:
            "Blood pressure medications can contribute to orthostatic hypotension."
        },
        {
          question: "Medication adherence is important because:",
          options: [
            "Consistent treatment helps maintain blood pressure control",
            "One dose permanently cures hypertension",
            "Hypertension cannot cause complications",
            "Medication timing never matters"
          ],
          answer: 0,
          explanation:
            "Consistent adherence supports sustained blood pressure control."
        }
      ]
    },
    {
      title: "14. Diuretics",
      explanation:
        "Diuretics increase renal excretion of sodium and water. They are used in conditions such as hypertension and fluid overload. Nurses monitor fluid balance, blood pressure, weight and relevant electrolytes. Different diuretic classes have different effects on potassium and other electrolytes.",
      clinicalApplication:
        "A patient receiving a diuretic may require monitoring for dehydration, hypotension and electrolyte abnormalities.",
      keyPoints: [
        "Diuretics increase urine formation.",
        "Monitor fluid balance.",
        "Monitor blood pressure.",
        "Monitor electrolytes.",
        "Assess for dehydration.",
        "Monitor daily weight when appropriate."
      ],
      examAlert:
        "Electrolyte disturbances are important adverse effects of many diuretics.",
      questions: [
        {
          question: "Diuretics primarily increase:",
          options: [
            "Renal excretion of water and electrolytes",
            "Bone growth",
            "Vision",
            "Red blood cell production"
          ],
          answer: 0,
          explanation:
            "Diuretics promote renal excretion of sodium and water."
        },
        {
          question: "A patient taking a diuretic should be monitored for:",
          options: [
            "Electrolyte abnormalities",
            "Improved hearing",
            "Hair growth",
            "Increased height"
          ],
          answer: 0,
          explanation:
            "Diuretics can alter electrolyte levels."
        },
        {
          question: "Which measurement can help monitor fluid changes?",
          options: [
            "Daily weight",
            "Hair length",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "Daily weight can help identify fluid gain or loss."
        }
      ]
    },
    {
      title: "15. ACE Inhibitors and Angiotensin Receptor Blockers",
      explanation:
        "ACE inhibitors and angiotensin receptor blockers affect the renin-angiotensin-aldosterone system and are used for conditions including hypertension and some forms of heart failure. Nurses monitor blood pressure, kidney function and potassium. ACE inhibitors can cause cough and, rarely, angioedema.",
      clinicalApplication:
        "A patient taking an ACE inhibitor who develops facial or tongue swelling requires immediate evaluation because angioedema can threaten the airway.",
      keyPoints: [
        "Monitor blood pressure.",
        "Monitor kidney function as ordered.",
        "Monitor potassium.",
        "ACE inhibitors can cause cough.",
        "Angioedema is a serious potential reaction."
      ],
      examAlert:
        "Facial, tongue or throat swelling after an ACE inhibitor is an emergency warning sign.",
      questions: [
        {
          question: "Which serious reaction can occur with ACE inhibitors?",
          options: [
            "Angioedema",
            "Improved hearing",
            "Increased height",
            "Improved vision"
          ],
          answer: 0,
          explanation:
            "ACE inhibitors can rarely cause angioedema involving facial or airway swelling."
        },
        {
          question: "Which laboratory value may require monitoring?",
          options: [
            "Potassium",
            "Hair pigment",
            "Eye color",
            "Height"
          ],
          answer: 0,
          explanation:
            "ACE inhibitors and ARBs can increase potassium levels in some patients."
        },
        {
          question: "A patient develops tongue swelling after an ACE inhibitor. The nurse should:",
          options: [
            "Treat it as an urgent potential airway emergency",
            "Ignore it",
            "Give another dose immediately",
            "Wait until the next appointment"
          ],
          answer: 0,
          explanation:
            "Tongue swelling can compromise the airway and requires immediate attention."
        }
      ]
    },
    {
      title: "16. Beta Blockers",
      explanation:
        "Beta blockers reduce sympathetic effects on the cardiovascular system and can lower heart rate and blood pressure. Some are used for hypertension, angina, dysrhythmias and heart failure. Nurses monitor heart rate, blood pressure and patient response. They may also mask some symptoms of hypoglycemia.",
      clinicalApplication:
        "Before administering a beta blocker, the nurse should assess heart rate and blood pressure according to the medication and clinical protocol.",
      keyPoints: [
        "Monitor heart rate.",
        "Monitor blood pressure.",
        "Assess for dizziness or hypotension.",
        "Do not abruptly stop some beta blockers without appropriate guidance.",
        "Be aware of masking of some hypoglycemia symptoms."
      ],
      examAlert:
        "Bradycardia and hypotension are important concerns with beta blockers.",
      questions: [
        {
          question: "Which vital sign is particularly important before some beta blockers?",
          options: [
            "Heart rate",
            "Temperature only",
            "Respiratory rate only",
            "Pain score only"
          ],
          answer: 0,
          explanation:
            "Beta blockers can reduce heart rate, so heart rate assessment is important."
        },
        {
          question: "A possible effect of beta blockers is:",
          options: [
            "Bradycardia",
            "Increased heart rate in every patient",
            "Improved bone growth",
            "Increased vision"
          ],
          answer: 0,
          explanation:
            "Beta blockade can decrease heart rate."
        },
        {
          question: "Beta blockers can sometimes mask symptoms of:",
          options: [
            "Hypoglycemia",
            "Fracture",
            "Skin infection",
            "Dehydration only"
          ],
          answer: 0,
          explanation:
            "Beta blockade may blunt some adrenergic warning symptoms of hypoglycemia."
        }
      ]
    },
    {
      title: "17. Anticoagulants and Antiplatelet Drugs",
      explanation:
        "Anticoagulants reduce clot formation through effects on the coagulation system, while antiplatelet medications reduce platelet aggregation. They are used to prevent or treat thromboembolic conditions. The major nursing concern is bleeding.",
      clinicalApplication:
        "A patient receiving anticoagulation should be monitored for bruising, bleeding gums, blood in urine or stool and other signs of bleeding.",
      keyPoints: [
        "Monitor for bleeding.",
        "Review relevant laboratory tests when required.",
        "Assess medication interactions.",
        "Teach bleeding precautions.",
        "Avoid unnecessary injury."
      ],
      examAlert:
        "Unexpected bleeding while taking an anticoagulant requires prompt assessment.",
      questions: [
        {
          question: "The major safety concern with anticoagulants is:",
          options: [
            "Bleeding",
            "Improved clotting",
            "Increased bone growth",
            "Improved vision"
          ],
          answer: 0,
          explanation:
            "Anticoagulants reduce clotting and can increase bleeding risk."
        },
        {
          question: "Which finding may indicate bleeding?",
          options: [
            "Blood in urine",
            "Normal urine",
            "Improved appetite",
            "Normal skin"
          ],
          answer: 0,
          explanation:
            "Hematuria can be a sign of bleeding."
        },
        {
          question: "Patient education for anticoagulant therapy should include:",
          options: [
            "Reporting unusual bleeding",
            "Ignoring bruising",
            "Taking extra doses independently",
            "Avoiding all healthcare follow-up"
          ],
          answer: 0,
          explanation:
            "Patients should recognize and report signs of excessive bleeding."
        }
      ]
    },
    {
      title: "18. Insulin and Antidiabetic Medications",
      explanation:
        "Insulin lowers blood glucose and is essential for patients who require insulin therapy. Different insulin preparations have different onset and duration characteristics. Other diabetes medications act through different mechanisms. Nurses monitor blood glucose and recognize hypoglycemia and hyperglycemia.",
      clinicalApplication:
        "A patient receiving insulin should have glucose levels monitored and should be assessed for symptoms of hypoglycemia.",
      keyPoints: [
        "Monitor blood glucose.",
        "Know the prescribed insulin type and timing.",
        "Recognize hypoglycemia.",
        "Recognize hyperglycemia.",
        "Teach safe medication use."
      ],
      examAlert:
        "Hypoglycemia can become life-threatening if severe or untreated.",
      questions: [
        {
          question: "Which finding may indicate hypoglycemia?",
          options: [
            "Sweating, tremors and confusion",
            "Normal mental status",
            "Improved concentration",
            "Normal glucose"
          ],
          answer: 0,
          explanation:
            "Sweating, tremors and confusion are common warning signs of low blood glucose."
        },
        {
          question: "A key nursing responsibility for insulin therapy is:",
          options: [
            "Monitoring blood glucose",
            "Ignoring glucose levels",
            "Stopping insulin independently",
            "Avoiding patient education"
          ],
          answer: 0,
          explanation:
            "Blood glucose monitoring helps guide safe and effective treatment."
        },
        {
          question: "Insulin primarily lowers:",
          options: [
            "Blood glucose",
            "Body temperature",
            "Heart rate in every patient",
            "Blood pressure directly"
          ],
          answer: 0,
          explanation:
            "Insulin promotes glucose uptake and lowers blood glucose."
        }
      ]
    },
    {
      title: "19. Thyroid Medications",
      explanation:
        "Thyroid medications are used to treat hypo- or hyperthyroid conditions. Levothyroxine replaces thyroid hormone in hypothyroidism. Antithyroid medications reduce thyroid hormone production or availability in hyperthyroidism. Nurses monitor symptoms, laboratory results and medication-specific adverse effects.",
      clinicalApplication:
        "A patient taking thyroid replacement should be monitored for symptoms suggesting excessive or inadequate replacement.",
      keyPoints: [
        "Levothyroxine is used for thyroid hormone replacement.",
        "Monitor thyroid function as ordered.",
        "Teach consistent medication use.",
        "Recognize symptoms of excessive thyroid replacement.",
        "Monitor antithyroid therapy for serious adverse effects."
      ],
      examAlert:
        "Patients taking thyroid replacement should not independently change the dose because excessive thyroid hormone can produce cardiovascular and other effects.",
      questions: [
        {
          question: "Levothyroxine is primarily used to treat:",
          options: [
            "Hypothyroidism",
            "Pneumonia",
            "Fractures",
            "Peptic ulcers"
          ],
          answer: 0,
          explanation:
            "Levothyroxine replaces thyroid hormone in hypothyroidism."
        },
        {
          question: "Thyroid replacement therapy should be monitored using:",
          options: [
            "Clinical response and thyroid laboratory tests as ordered",
            "Hair length only",
            "Eye color",
            "Height only"
          ],
          answer: 0,
          explanation:
            "Thyroid function tests and clinical symptoms help assess adequacy of treatment."
        },
        {
          question: "Patients should change thyroid medication doses:",
          options: [
            "Only according to appropriate clinical guidance",
            "Whenever they feel tired",
            "Whenever they want",
            "Without monitoring"
          ],
          answer: 0,
          explanation:
            "Thyroid hormone dosing should be guided by clinical assessment and laboratory results."
        }
      ]
    },
    {
      title: "20. Corticosteroids",
      explanation:
        "Corticosteroids have anti-inflammatory and immunosuppressive effects. They are used for many inflammatory, allergic and autoimmune conditions. Long-term therapy can cause significant adverse effects including hyperglycemia, infection risk, osteoporosis and adrenal suppression.",
      clinicalApplication:
        "A patient receiving long-term corticosteroid therapy should be monitored for infection, glucose changes and other medication-related complications.",
      keyPoints: [
        "Corticosteroids reduce inflammation.",
        "They can suppress immune function.",
        "They can increase blood glucose.",
        "Long-term use can cause multiple complications.",
        "Some corticosteroids should not be stopped abruptly."
      ],
      examAlert:
        "Abrupt discontinuation after prolonged corticosteroid therapy can be dangerous because of adrenal suppression.",
      questions: [
        {
          question: "Corticosteroids primarily have which effect?",
          options: [
            "Anti-inflammatory and immunosuppressive effects",
            "Antibacterial effects against every organism",
            "Bone-building effects only",
            "Direct insulin production"
          ],
          answer: 0,
          explanation:
            "Corticosteroids reduce inflammation and suppress immune responses."
        },
        {
          question: "Long-term corticosteroid therapy can increase the risk of:",
          options: [
            "Infection",
            "Improved immunity",
            "Permanent immunity",
            "Improved bone density"
          ],
          answer: 0,
          explanation:
            "Immunosuppression can increase susceptibility to infection."
        },
        {
          question: "Why may corticosteroids require gradual dose reduction?",
          options: [
            "To reduce the risk associated with adrenal suppression",
            "To improve hair growth",
            "To increase height",
            "Because all medications require tapering"
          ],
          answer: 0,
          explanation:
            "Long-term corticosteroid therapy can suppress normal adrenal function."
        }
      ]
    },
    {
      title: "21. Respiratory Medications",
      explanation:
        "Respiratory medications include bronchodilators, corticosteroids, anticholinergic medications, leukotriene modifiers and other agents. Nurses assess respiratory status, inhaler technique, therapeutic response and adverse effects.",
      clinicalApplication:
        "A patient using an inhaler should demonstrate correct technique so that the medication reaches the respiratory tract effectively.",
      keyPoints: [
        "Bronchodilators help open narrowed airways.",
        "Inhaled corticosteroids reduce airway inflammation.",
        "Correct inhaler technique is essential.",
        "Monitor respiratory response.",
        "Monitor medication-specific adverse effects."
      ],
      examAlert:
        "Poor inhaler technique can make an otherwise appropriate medication appear ineffective.",
      questions: [
        {
          question: "Bronchodilators primarily:",
          options: [
            "Relax airway smooth muscle and improve airflow",
            "Increase blood glucose",
            "Treat fractures",
            "Increase bone density"
          ],
          answer: 0,
          explanation:
            "Bronchodilators help widen the airways and improve airflow."
        },
        {
          question: "Why should inhaler technique be assessed?",
          options: [
            "Incorrect technique can reduce medication delivery",
            "It changes blood type",
            "It prevents all side effects",
            "It replaces diagnosis"
          ],
          answer: 0,
          explanation:
            "Correct technique helps ensure that the medication reaches the intended site."
        },
        {
          question: "The nurse should evaluate respiratory medications by assessing:",
          options: [
            "Respiratory status and therapeutic response",
            "Hair color",
            "Height",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Respiratory assessment determines whether treatment is improving airway function."
        }
      ]
    },
    {
      title: "22. Gastrointestinal Medications",
      explanation:
        "GI medications include antacids, acid-suppressing drugs, antiemetics, laxatives and antidiarrheal medications. Nursing care depends on the drug and underlying condition. The nurse monitors symptom relief, hydration, bowel patterns and adverse effects.",
      clinicalApplication:
        "A patient receiving an antiemetic should be assessed for improvement in nausea and for medication-related adverse effects.",
      keyPoints: [
        "Antacids can neutralize stomach acid.",
        "Acid-suppressing medications reduce acid production.",
        "Antiemetics help control nausea and vomiting.",
        "Laxatives can assist bowel elimination.",
        "Antidiarrheals may reduce stool frequency in appropriate situations."
      ],
      examAlert:
        "Treating diarrhea without considering the underlying cause can be inappropriate; assessment is essential.",
      questions: [
        {
          question: "Antiemetic medications are used primarily to manage:",
          options: [
            "Nausea and vomiting",
            "Hypertension",
            "Fractures",
            "Anemia"
          ],
          answer: 0,
          explanation:
            "Antiemetics are medications used to prevent or treat nausea and vomiting."
        },
        {
          question: "A patient taking GI medication should be assessed for:",
          options: [
            "Therapeutic response and adverse effects",
            "Only height",
            "Only hair color",
            "No symptoms"
          ],
          answer: 0,
          explanation:
            "Monitoring evaluates effectiveness and safety."
        },
        {
          question: "Before giving an antidiarrheal, the nurse should consider:",
          options: [
            "The cause and clinical situation",
            "Only the patient's favorite food",
            "Nothing",
            "Only the patient's height"
          ],
          answer: 0,
          explanation:
            "Some causes of diarrhea require specific treatment, and suppressing bowel movement may not always be appropriate."
        }
      ]
    },
    {
      title: "23. Anticonvulsants",
      explanation:
        "Anticonvulsants are used to prevent or control seizures and may be used for other neurological conditions. Nurses monitor seizure activity, neurological status, therapeutic response and medication-specific adverse effects. Abrupt discontinuation of some anticonvulsants can increase seizure risk.",
      clinicalApplication:
        "A patient taking an anticonvulsant should receive education about adherence and should not abruptly discontinue therapy without appropriate guidance.",
      keyPoints: [
        "Anticonvulsants help control seizure activity.",
        "Monitor neurological status.",
        "Monitor therapeutic response.",
        "Monitor adverse effects.",
        "Promote medication adherence."
      ],
      examAlert:
        "Abruptly stopping some anticonvulsants can precipitate seizures.",
      questions: [
        {
          question: "Anticonvulsants are primarily used to:",
          options: [
            "Control or prevent seizures",
            "Treat bacterial infections",
            "Lower cholesterol only",
            "Treat fractures"
          ],
          answer: 0,
          explanation:
            "Anticonvulsants reduce or prevent abnormal neuronal activity associated with seizures."
        },
        {
          question: "A key nursing responsibility is:",
          options: [
            "Monitoring neurological status",
            "Ignoring seizure activity",
            "Stopping medication abruptly",
            "Avoiding patient education"
          ],
          answer: 0,
          explanation:
            "Neurological assessment helps evaluate treatment effectiveness and complications."
        },
        {
          question: "Medication adherence is important because:",
          options: [
            "Missed doses may increase seizure risk",
            "Seizures cannot recur",
            "One dose lasts forever",
            "Medication never affects seizure control"
          ],
          answer: 0,
          explanation:
            "Consistent medication use is important for maintaining therapeutic drug effects."
        }
      ]
    },
    {
      title: "24. Antidepressants",
      explanation:
        "Antidepressants are used to treat depressive disorders and several other conditions. Classes include SSRIs, SNRIs, tricyclic antidepressants and others. Therapeutic effects may take time to develop. Nurses monitor mood, behavior, adverse effects and safety.",
      clinicalApplication:
        "A patient beginning antidepressant treatment should be monitored for changes in mood, suicidal thinking and adverse effects, especially during early treatment and dose changes.",
      keyPoints: [
        "Therapeutic effects may take time.",
        "Monitor mood and behavior.",
        "Assess suicide risk when clinically indicated.",
        "Monitor medication adverse effects.",
        "Teach adherence."
      ],
      examAlert:
        "Any concerning suicidal thoughts or significant behavioral changes require prompt clinical attention.",
      questions: [
        {
          question: "A key nursing assessment for a patient starting an antidepressant is:",
          options: [
            "Mood and safety",
            "Hair color",
            "Height",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Mood changes and suicide risk are important safety considerations."
        },
        {
          question: "Patients should understand that antidepressants:",
          options: [
            "May take time before full therapeutic effects are noticed",
            "Always work immediately",
            "Never have adverse effects",
            "Can always be stopped abruptly"
          ],
          answer: 0,
          explanation:
            "Many antidepressants require time before therapeutic benefits become fully apparent."
        },
        {
          question: "A concerning new suicidal thought should be:",
          options: [
            "Reported and assessed promptly",
            "Ignored",
            "Hidden",
            "Considered normal in every patient"
          ],
          answer: 0,
          explanation:
            "Suicidal thinking requires prompt safety assessment and appropriate intervention."
        }
      ]
    },
    {
      title: "25. Antipsychotic Medications",
      explanation:
        "Antipsychotic medications are used to manage conditions such as schizophrenia and other disorders involving psychosis. Nurses monitor mental status, movement disorders, sedation, metabolic effects and serious reactions such as neuroleptic malignant syndrome.",
      clinicalApplication:
        "A patient receiving an antipsychotic who develops severe muscle rigidity, high fever and altered mental status requires urgent evaluation.",
      keyPoints: [
        "Monitor mental status.",
        "Monitor movement abnormalities.",
        "Monitor metabolic effects.",
        "Monitor sedation and orthostatic symptoms.",
        "Recognize neuroleptic malignant syndrome."
      ],
      examAlert:
        "Severe rigidity, high fever and altered mental status can indicate neuroleptic malignant syndrome, a medical emergency.",
      questions: [
        {
          question: "Which finding is concerning for neuroleptic malignant syndrome?",
          options: [
            "High fever, severe rigidity and altered mental status",
            "Mild hunger",
            "Normal temperature",
            "Improved concentration"
          ],
          answer: 0,
          explanation:
            "This combination is highly concerning for a serious antipsychotic-related reaction."
        },
        {
          question: "Antipsychotic therapy requires monitoring of:",
          options: [
            "Mental status and movement",
            "Only height",
            "Only hair color",
            "Only appetite"
          ],
          answer: 0,
          explanation:
            "Neurological, psychiatric and physical effects require monitoring."
        },
        {
          question: "A serious antipsychotic reaction should be:",
          options: [
            "Recognized and treated urgently",
            "Ignored",
            "Documented next month",
            "Managed without assessment"
          ],
          answer: 0,
          explanation:
            "Severe reactions can become life-threatening."
        }
      ]
    },
    {
      title: "26. Sedatives and Anxiolytics",
      explanation:
        "Sedatives and anxiolytics can reduce anxiety, induce sedation or affect seizure activity depending on the medication. Some can cause respiratory depression, excessive sedation, impaired coordination and dependence. Nurses assess respiratory status, consciousness and safety.",
      clinicalApplication:
        "A patient receiving a sedative requires monitoring for excessive sedation and respiratory compromise.",
      keyPoints: [
        "Monitor level of consciousness.",
        "Monitor respiratory status.",
        "Use fall precautions when appropriate.",
        "Assess for medication interactions.",
        "Teach patients about sedation risks."
      ],
      examAlert:
        "Combining sedating medications or substances can increase central nervous system and respiratory depression.",
      questions: [
        {
          question: "A major safety concern with sedatives is:",
          options: [
            "Respiratory depression and excessive sedation",
            "Increased height",
            "Improved hearing",
            "Improved bone density"
          ],
          answer: 0,
          explanation:
            "Sedatives can depress the central nervous system and impair breathing and consciousness."
        },
        {
          question: "After administering a sedative, the nurse should monitor:",
          options: [
            "Level of consciousness and respiratory status",
            "Hair color",
            "Height",
            "Eye color"
          ],
          answer: 0,
          explanation:
            "Sedation can affect consciousness and respiratory function."
        },
        {
          question: "Combining multiple sedating substances may:",
          options: [
            "Increase CNS depression",
            "Always improve alertness",
            "Prevent sedation",
            "Have no possible interaction"
          ],
          answer: 0,
          explanation:
            "Multiple sedating agents can have additive effects."
        }
      ]
    },
    {
      title: "27. Medication Administration in Older Adults",
      explanation:
        "Older adults may have changes in renal function, liver metabolism, body composition and sensitivity to medications. Polypharmacy also increases the risk of interactions and adverse effects. Nurses should use careful assessment and medication reconciliation.",
      clinicalApplication:
        "An older adult taking multiple medications may require closer monitoring for dizziness, confusion, falls and drug accumulation.",
      keyPoints: [
        "Assess renal and hepatic function when relevant.",
        "Review all medications.",
        "Watch for polypharmacy.",
        "Monitor for confusion and falls.",
        "Teach patients and caregivers about medication safety."
      ],
      examAlert:
        "Older adults may be more sensitive to medication effects, and multiple medications increase interaction risk.",
      questions: [
        {
          question: "Why can medication management be more complex in older adults?",
          options: [
            "Physiological changes and polypharmacy",
            "Older adults never experience adverse effects",
            "All medications become safer with age",
            "Kidney function always improves"
          ],
          answer: 0,
          explanation:
            "Age-related physiological changes and multiple medications can increase medication risk."
        },
        {
          question: "A medication review in an older adult helps identify:",
          options: [
            "Interactions and unnecessary duplication",
            "Hair color",
            "Blood type only",
            "Height"
          ],
          answer: 0,
          explanation:
            "Medication review helps identify potential safety problems."
        },
        {
          question: "An older adult becomes newly confused after starting several medications. The nurse should:",
          options: [
            "Assess for possible medication-related effects",
            "Assume confusion is normal aging",
            "Ignore the change",
            "Stop every medication without assessment"
          ],
          answer: 0,
          explanation:
            "New confusion should be assessed because medications and other acute conditions can contribute."
        }
      ]
    },
    {
      title: "28. Pediatric Medication Safety",
      explanation:
        "Children may require weight-based medication dosing because medication amounts are often determined according to body weight or body surface area. Accurate measurement and careful calculations are essential. Nurses should use appropriate measuring devices and verify doses according to policy.",
      clinicalApplication:
        "A pediatric medication order may require the nurse to calculate the dose based on the child's weight in kilograms.",
      keyPoints: [
        "Pediatric doses may be weight-based.",
        "Use kilograms when required.",
        "Measure liquid medications accurately.",
        "Double-check calculations according to policy.",
        "Use age-appropriate medication education."
      ],
      examAlert:
        "Never confuse pounds and kilograms. A weight-conversion error can produce a dangerous pediatric dose.",
      questions: [
        {
          question: "Pediatric medication doses are commonly based on:",
          options: [
            "Weight or body surface area",
            "Hair length",
            "Favorite food",
            "Room number"
          ],
          answer: 0,
          explanation:
            "Children frequently receive doses calculated using weight or body surface area."
        },
        {
          question: "Why is kilogram conversion important?",
          options: [
            "Dosing calculations may require kilograms",
            "Kilograms determine blood type",
            "It changes the medication color",
            "It determines the child's age"
          ],
          answer: 0,
          explanation:
            "Many pediatric dosing formulas use kilograms, so incorrect conversion can cause major errors."
        },
        {
          question: "Liquid pediatric medications should be measured:",
          options: [
            "Using an accurate medication measuring device",
            "Using any household spoon",
            "By guessing",
            "Without checking the concentration"
          ],
          answer: 0,
          explanation:
            "Accurate measurement reduces dosing errors."
        }
      ]
    },
    {
      title: "29. Medication Use in Pregnancy and Breastfeeding",
      explanation:
        "Medication use during pregnancy and breastfeeding requires careful consideration because some drugs can affect the fetus or infant. Nurses should verify medication safety, assess gestational age or breastfeeding status when relevant and educate patients not to start or stop medications independently.",
      clinicalApplication:
        "A pregnant patient should have medications reviewed for potential fetal effects and appropriate alternatives when necessary.",
      keyPoints: [
        "Assess pregnancy status when relevant.",
        "Review medication safety.",
        "Consider fetal or infant exposure.",
        "Educate patients about prescribed medications.",
        "Avoid unsupervised medication use."
      ],
      examAlert:
        "Pregnant and breastfeeding patients should discuss medications with an appropriate healthcare professional before starting or stopping treatment.",
      questions: [
        {
          question: "Why does pregnancy require special consideration in pharmacology?",
          options: [
            "Some medications can affect the fetus",
            "All medications are automatically safe",
            "Medication effects disappear during pregnancy",
            "Pregnancy prevents adverse effects"
          ],
          answer: 0,
          explanation:
            "Some drugs can cross the placenta and affect fetal development."
        },
        {
          question: "A breastfeeding patient should consider:",
          options: [
            "Potential drug exposure to the infant",
            "Only medication color",
            "Only tablet size",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Some medications can pass into breast milk."
        },
        {
          question: "Patients should stop prescribed medication during pregnancy:",
          options: [
            "Only after appropriate clinical advice",
            "Whenever they want",
            "Always",
            "Never discuss it"
          ],
          answer: 0,
          explanation:
            "Stopping medication abruptly can also be harmful, so decisions should be guided by appropriate clinical advice."
        }
      ]
    },
    {
      title: "30. High-Alert Medications and Medication Errors",
      explanation:
        "High-alert medications have an increased risk of causing significant harm when used incorrectly. Examples can include insulin, anticoagulants and certain concentrated electrolytes. Nurses should follow institutional safety procedures, perform appropriate verification and report medication errors promptly.",
      clinicalApplication:
        "If a nurse discovers that an incorrect medication dose was administered, the priority is patient assessment and appropriate escalation according to policy.",
      keyPoints: [
        "Use extra caution with high-alert medications.",
        "Follow institutional verification procedures.",
        "Assess the patient after an error.",
        "Notify appropriate personnel.",
        "Document according to policy.",
        "Medication errors should be reported honestly."
      ],
      examAlert:
        "After a medication error, patient safety comes first: assess the patient and follow the organization's reporting and escalation process.",
      questions: [
        {
          question: "Which is an example of a high-alert medication?",
          options: [
            "Insulin",
            "Plain water",
            "Moisturizer",
            "Saline nasal spray in every situation"
          ],
          answer: 0,
          explanation:
            "Insulin is commonly treated as a high-alert medication because errors can cause serious harm."
        },
        {
          question: "After discovering a medication error, the nurse's first priority is generally:",
          options: [
            "Assess the patient and address immediate safety",
            "Hide the error",
            "Delete the documentation",
            "Leave the unit"
          ],
          answer: 0,
          explanation:
            "The patient's safety and condition must be addressed immediately."
        },
        {
          question: "Medication errors should be:",
          options: [
            "Reported according to organizational policy",
            "Hidden",
            "Ignored",
            "Blamed on another person"
          ],
          answer: 0,
          explanation:
            "Transparent reporting supports patient safety and system improvement."
        }
      ]
    },
    {
      title: "31. Medication Reconciliation and Patient Education",
      explanation:
        "Medication reconciliation compares the medications a patient is actually taking with the medications prescribed at transitions of care. Patient education should cover medication name, purpose, dose, timing, route, expected effects, important adverse effects and when to seek help.",
      clinicalApplication:
        "At discharge, the nurse should help ensure that the patient understands which medications to continue, stop or change according to the discharge plan.",
      keyPoints: [
        "Compare current and prescribed medications.",
        "Identify discrepancies.",
        "Explain medication purpose.",
        "Teach correct administration.",
        "Explain important adverse effects.",
        "Encourage questions."
      ],
      examAlert:
        "Never assume that a patient's home medication list is accurate without reconciliation.",
      questions: [
        {
          question: "Medication reconciliation is intended to identify:",
          options: [
            "Medication discrepancies",
            "Patient's favorite medication color",
            "Patient's height",
            "Patient's eye color"
          ],
          answer: 0,
          explanation:
            "Medication reconciliation identifies differences between medication lists and intended therapy."
        },
        {
          question: "Patient medication education should include:",
          options: [
            "Purpose, dose, timing and important adverse effects",
            "Only the color of the tablet",
            "Only the price",
            "Nothing"
          ],
          answer: 0,
          explanation:
            "Patients need practical information to use medications safely."
        },
        {
          question: "A patient who does not understand a medication instruction should:",
          options: [
            "Receive clarification and education",
            "Be ignored",
            "Be told to guess",
            "Be discharged immediately"
          ],
          answer: 0,
          explanation:
            "Understanding medication instructions is essential for safe adherence."
        }
      ]
    },
    {
      title: "32. Pharmacology Comprehensive Revision",
      explanation:
        "This revision module brings together pharmacokinetics, pharmacodynamics, medication safety, medication calculations, adverse reactions, antimicrobial therapy, cardiovascular medications, endocrine medications, respiratory drugs, analgesics, psychiatric medications and special-population considerations. Strong pharmacology performance requires connecting the medication to the patient's condition and monitoring needs.",
      clinicalApplication:
        "When faced with a medication question, identify the drug class, mechanism, indication, expected effect, important adverse effects and the nursing assessment required.",
      keyPoints: [
        "Know the drug class.",
        "Know the therapeutic purpose.",
        "Know major adverse effects.",
        "Know important nursing assessments.",
        "Check contraindications and interactions.",
        "Monitor therapeutic response.",
        "Educate the patient.",
        "Prioritize patient safety."
      ],
      examAlert:
        "For pharmacology questions, ask: Why is this drug being given? What should I assess before giving it? What effect should I expect? What dangerous reaction must I recognize?",
      questions: [
        {
          question: "Pharmacokinetics describes:",
          options: [
            "What the body does to a drug",
            "What the drug does to the body",
            "Only medication storage",
            "Only drug naming"
          ],
          answer: 0,
          explanation:
            "Pharmacokinetics includes absorption, distribution, metabolism and excretion."
        },
        {
          question: "Pharmacodynamics describes:",
          options: [
            "What the drug does to the body",
            "What the body does to the drug",
            "Medication storage",
            "Medication packaging"
          ],
          answer: 0,
          explanation:
            "Pharmacodynamics concerns mechanisms and effects of drugs on the body."
        },
        {
          question: "A patient develops difficulty breathing immediately after receiving a medication. What should the nurse suspect?",
          options: [
            "A potentially severe allergic reaction",
            "Normal medication response",
            "Improved circulation",
            "Normal digestion"
          ],
          answer: 0,
          explanation:
            "Difficulty breathing after medication administration may indicate a severe allergic reaction and requires urgent action."
        },
        {
          question: "A patient taking an anticoagulant reports blood in the urine. What should the nurse do?",
          options: [
            "Assess and report the possible bleeding",
            "Ignore it",
            "Give an extra dose",
            "Tell the patient it is always normal"
          ],
          answer: 0,
          explanation:
            "Hematuria can indicate bleeding and requires appropriate assessment."
        },
        {
          question: "A patient receiving an opioid becomes difficult to arouse and has slow breathing. What is the priority?",
          options: [
            "Recognize possible opioid-related respiratory depression and act immediately",
            "Allow the patient to sleep without assessment",
            "Give another opioid",
            "Ignore the respiratory rate"
          ],
          answer: 0,
          explanation:
            "Excessive sedation and slow breathing can indicate opioid toxicity and require urgent intervention."
        },
        {
          question: "Which medication safety principle is most important?",
          options: [
            "Never administer a medication when important safety information is unclear",
            "Guess unclear orders",
            "Ignore allergies",
            "Skip patient identification"
          ],
          answer: 0,
          explanation:
            "Unclear orders and failed safety checks must be clarified before administration."
        }
      ]
    }
  ]
},

    // ========================================================
    // 7. PATHOPHYSIOLOGY
    // ========================================================

 "pathophysiology": {
  title: "Pathophysiology",
  description:
    "A comprehensive nursing-focused study of how disease, injury and abnormal processes alter normal body structure and function, with emphasis on clinical manifestations, disease mechanisms, assessment and nursing care.",

  lessons: [

    // ========================================================
    // MODULE 1
    // ========================================================

    {
      title: "Module 1 — Introduction to Pathophysiology",

      explanation: `
        <p><strong>Pathophysiology</strong> is the study of the functional changes
        that occur in the body as a result of disease, injury or other abnormal
        conditions.</p>

        <p>It connects normal anatomy and physiology with disease processes.
        While anatomy explains the structure of the body and physiology explains
        normal function, pathophysiology explains what happens when normal
        function becomes disturbed.</p>

        <p>For nurses, understanding pathophysiology is extremely important because
        signs and symptoms are usually the result of specific changes occurring
        inside the body.</p>

        <p>For example, when a patient develops pneumonia, the infection causes
        inflammation in the lungs. Fluid and inflammatory material may accumulate
        in the alveoli, making gas exchange more difficult. The patient may
        therefore develop cough, fever, difficulty breathing and reduced oxygen
        saturation.</p>

        <p>Pathophysiology helps the nurse understand the connection between the
        disease process and these clinical manifestations.</p>

        <p>Disease can affect cells, tissues, organs or entire body systems.
        These changes may interfere with <strong>homeostasis</strong>, which is
        the body's ability to maintain a relatively stable internal environment.</p>
      `,

      clinicalApplication: `
        <p>A nurse caring for a patient with heart failure should understand that
        reduced cardiac pumping ability can decrease tissue perfusion and cause
        fluid accumulation.</p>

        <p>This understanding helps the nurse recognize findings such as
        shortness of breath, peripheral edema, fatigue, rapid weight gain and
        reduced exercise tolerance.</p>

        <p>Instead of simply memorizing symptoms, the nurse can understand
        <strong>why</strong> those symptoms occur.</p>
      `,

      keyPoints: [
        "Pathophysiology studies abnormal changes in body function.",
        "Disease can disturb normal homeostasis.",
        "Pathophysiology connects disease processes with clinical manifestations.",
        "Changes may occur at cellular, tissue, organ or system levels.",
        "Understanding disease mechanisms helps nurses provide appropriate care."
      ],

      examAlert:
        "Remember: physiology explains normal function, while pathophysiology explains abnormal function caused by disease or injury.",

      questions: [

        {
          question: "What does pathophysiology primarily study?",

          options: [
            "Abnormal changes in body function",
            "Hospital architecture",
            "Drug manufacturing",
            "Food preparation"
          ],

          answer: 0,

          explanation:
            "Pathophysiology focuses on functional changes that occur as a result of disease, injury or abnormal conditions."
        },

        {
          question: "Which concept refers to the body's ability to maintain a relatively stable internal environment?",

          options: [
            "Metabolism",
            "Homeostasis",
            "Digestion",
            "Filtration"
          ],

          answer: 1,

          explanation:
            "Homeostasis is the body's ability to maintain relatively stable internal conditions despite changes inside or outside the body."
        },

        {
          question: "Why is pathophysiology important in nursing?",

          options: [
            "It eliminates the need for patient assessment.",
            "It helps nurses understand why signs and symptoms occur.",
            "It is only useful to laboratory scientists.",
            "It replaces clinical experience."
          ],

          answer: 1,

          explanation:
            "Understanding disease mechanisms allows nurses to connect clinical manifestations with underlying pathological changes."
        },

        {
          question: "Which example best represents a pathological change?",

          options: [
            "Normal breathing at rest",
            "Normal digestion after a meal",
            "Inflammation caused by infection",
            "Normal heart contraction"
          ],

          answer: 2,

          explanation:
            "Inflammation caused by infection is an abnormal response associated with disease and therefore represents a pathological change."
        },

        {
          question: "A patient with pneumonia develops difficulty breathing mainly because the disease affects which function?",

          options: [
            "Gas exchange",
            "Bone formation",
            "Urine production",
            "Blood clotting"
          ],

          answer: 0,

          explanation:
            "Pneumonia can cause inflammation and fluid accumulation in the lungs, interfering with normal gas exchange."
        }

      ]
    },

    // ========================================================
    // MODULE 2
    // ========================================================

    {
      title: "Module 2 — Cellular Injury and Adaptation",

      explanation: `
        <p>Cells are the basic structural and functional units of the human body.
        When cells are exposed to harmful conditions, they may adapt, become
        injured or die.</p>

        <p>Cellular injury may occur because of inadequate oxygen, infection,
        physical trauma, chemicals, nutritional problems, extreme temperatures
        or other harmful influences.</p>

        <p>Cells can sometimes adapt to stress. Common forms of cellular
        adaptation include <strong>hypertrophy, hyperplasia, atrophy and
        metaplasia</strong>.</p>

        <p><strong>Hypertrophy</strong> refers to an increase in cell size.
        <strong>Hyperplasia</strong> refers to an increase in cell number.
        <strong>Atrophy</strong> refers to a reduction in cell size or tissue
        mass.</p>

        <p>If harmful conditions are severe or prolonged, cellular injury may
        become irreversible and the cell may die.</p>

        <p>Two important forms of cell death are <strong>necrosis</strong> and
        <strong>apoptosis</strong>. Necrosis generally results from significant
        injury, while apoptosis is a regulated form of programmed cell death.</p>
      `,

      clinicalApplication: `
        <p>Immobility can contribute to muscle atrophy because muscles are not
        being used normally.</p>

        <p>A nurse can help reduce complications associated with prolonged
        immobility through appropriate positioning, mobility exercises and
        prescribed physiotherapy.</p>
      `,

      keyPoints: [
        "Cells are the basic functional units of the body.",
        "Cellular injury can result from many harmful factors.",
        "Hypertrophy = increase in cell size.",
        "Hyperplasia = increase in cell number.",
        "Atrophy = reduction in cell size or tissue mass.",
        "Necrosis is associated with significant cellular injury.",
        "Apoptosis is programmed cell death."
      ],

      examAlert:
        "Do not confuse hypertrophy with hyperplasia: hypertrophy increases cell size, while hyperplasia increases cell number.",

      questions: [

        {
          question: "What is hypertrophy?",

          options: [
            "Increase in cell size",
            "Increase in cell number",
            "Decrease in blood pressure",
            "Cell death"
          ],

          answer: 0,

          explanation:
            "Hypertrophy is an increase in the size of individual cells."
        },

        {
          question: "What is hyperplasia?",

          options: [
            "Decrease in cell size",
            "Increase in cell number",
            "Programmed cell death",
            "Loss of oxygen"
          ],

          answer: 1,

          explanation:
            "Hyperplasia occurs when the number of cells in a tissue increases."
        },

        {
          question: "Which condition is commonly associated with prolonged disuse of muscles?",

          options: [
            "Hypertrophy",
            "Atrophy",
            "Hyperplasia",
            "Metaplasia"
          ],

          answer: 1,

          explanation:
            "Prolonged lack of muscle use can cause muscle atrophy."
        },

        {
          question: "Which type of cell death is considered programmed cell death?",

          options: [
            "Necrosis",
            "Apoptosis",
            "Inflammation",
            "Edema"
          ],

          answer: 1,

          explanation:
            "Apoptosis is a regulated process of programmed cell death."
        }

      ]
    },

    // ========================================================
    // MODULE 3
    // ========================================================

    {
      title: "Module 3 — Inflammation",

      explanation: `
        <p><strong>Inflammation</strong> is a protective response of living
        tissues to injury, infection or other harmful stimuli.</p>

        <p>The purpose of inflammation is to eliminate the harmful cause,
        remove damaged tissue and begin the process of repair.</p>

        <p>Classic signs of acute inflammation include
        <strong>redness, heat, swelling, pain and loss of function</strong>.</p>

        <p>During inflammation, blood vessels change and immune cells move toward
        the affected area. Chemical mediators help coordinate this response.</p>

        <p>Acute inflammation generally develops rapidly and is usually relatively
        short-lived. Chronic inflammation may continue for a longer period and
        can contribute to tissue damage.</p>
      `,

      clinicalApplication: `
        <p>A patient with an infected wound may develop redness, warmth, swelling,
        pain and discharge around the affected area.</p>

        <p>The nurse should assess the wound carefully, monitor the patient's
        temperature and other vital signs, maintain appropriate wound care and
        report findings suggesting worsening infection.</p>
      `,

      keyPoints: [
        "Inflammation is a protective response to injury or harmful stimuli.",
        "Classic signs include redness, heat, swelling, pain and loss of function.",
        "Acute inflammation develops relatively quickly.",
        "Chronic inflammation can persist for a prolonged period.",
        "Inflammation contributes to tissue repair."
      ],

      examAlert:
        "The five classic signs of inflammation are redness, heat, swelling, pain and loss of function.",

      questions: [

        {
          question: "Which of the following is a classic sign of inflammation?",

          options: [
            "Cyanosis only",
            "Redness",
            "Hair growth",
            "Weight gain only"
          ],

          answer: 1,

          explanation:
            "Redness is one of the classic signs of inflammation."
        },

        {
          question: "What is one major purpose of inflammation?",

          options: [
            "To prevent all immune responses",
            "To eliminate harmful stimuli and begin tissue repair",
            "To stop blood circulation permanently",
            "To destroy all healthy cells"
          ],

          answer: 1,

          explanation:
            "Inflammation helps remove harmful stimuli and damaged tissue while initiating repair."
        },

        {
          question: "Which finding may indicate inflammation at a wound site?",

          options: [
            "Redness and warmth",
            "Normal skin colour only",
            "No pain or swelling",
            "Improved circulation everywhere"
          ],

          answer: 0,

          explanation:
            "Redness and warmth are common local signs of inflammation."
        }

      ]
    },

    // ========================================================
    // MODULE 4
    // ========================================================

    {
      title: "Module 4 — Infection and the Body's Response",

      explanation: `
        <p>An <strong>infection</strong> occurs when microorganisms enter the body,
        survive or multiply, and produce a response or damage in the host.</p>

        <p>Common infectious agents include bacteria, viruses, fungi and
        parasites.</p>

        <p>The body's defense mechanisms include physical barriers such as the
        skin and mucous membranes, as well as innate and adaptive immune
        responses.</p>

        <p>When the immune system recognizes harmful organisms, inflammatory and
        immune responses may occur.</p>

        <p>Systemic infection can cause generalized manifestations such as fever,
        weakness, increased heart rate and changes in the patient's overall
        condition.</p>
      `,

      clinicalApplication: `
        <p>Nurses play an important role in preventing healthcare-associated
        infections through hand hygiene, appropriate use of personal protective
        equipment, safe injection practices, environmental cleaning and proper
        handling of clinical waste.</p>
      `,

      keyPoints: [
        "Infections may be caused by bacteria, viruses, fungi or parasites.",
        "The skin and mucous membranes provide important physical barriers.",
        "The immune system responds to harmful microorganisms.",
        "Systemic infection may produce generalized symptoms.",
        "Infection prevention is an important nursing responsibility."
      ],

      examAlert:
        "Always distinguish between infection and inflammation. Infection involves microorganisms or other infectious agents; inflammation is a protective tissue response that may occur because of infection or other injury.",

      questions: [

        {
          question: "Which organism can cause an infection?",

          options: [
            "Bacteria",
            "Viruses",
            "Fungi",
            "All of the above"
          ],

          answer: 3,

          explanation:
            "Bacteria, viruses and fungi can all cause infections."
        },

        {
          question: "Which is an important first-line physical defense against infection?",

          options: [
            "Skin",
            "Bones",
            "Hair colour",
            "Blood pressure"
          ],

          answer: 0,

          explanation:
            "Intact skin provides an important physical barrier against microorganisms."
        },

        {
          question: "Which nursing action is especially important for preventing healthcare-associated infections?",

          options: [
            "Ignoring hand hygiene",
            "Appropriate hand hygiene",
            "Sharing needles",
            "Reusing contaminated equipment"
          ],

          answer: 1,

          explanation:
            "Proper hand hygiene is one of the most important measures for preventing transmission of infection."
        }

      ]
    },

    // ========================================================
    // MODULE 5
    // ========================================================

    {
      title: "Module 5 — Fluid, Electrolyte and Acid-Base Imbalance",

      explanation: `
        <p>The human body requires an appropriate balance of water, electrolytes
        and acids and bases for normal cellular function.</p>

        <p>Important electrolytes include sodium, potassium, calcium, magnesium,
        chloride and bicarbonate.</p>

        <p>Fluid imbalance can occur when the body loses too much fluid, receives
        excessive fluid or cannot regulate fluid appropriately.</p>

        <p><strong>Dehydration</strong> occurs when fluid loss exceeds fluid
        intake. Possible findings include thirst, dry mucous membranes, reduced
        urine output, weakness and changes in vital signs.</p>

        <p>Electrolyte abnormalities can affect muscles, nerves, the heart and
        other organs.</p>

        <p>The kidneys and lungs play major roles in maintaining acid-base
        balance. Severe disturbances can interfere with normal cellular function.</p>
      `,

      clinicalApplication: `
        <p>A patient experiencing severe diarrhea and vomiting may lose large
        amounts of water and electrolytes.</p>

        <p>The nurse should monitor intake and output, vital signs, mental status,
        urine output and laboratory results as ordered, while reporting signs of
        deterioration promptly.</p>
      `,

      keyPoints: [
        "Water and electrolytes are essential for normal cellular function.",
        "Sodium and potassium are important electrolytes.",
        "Dehydration occurs when fluid loss exceeds intake.",
        "The kidneys help regulate fluid and electrolyte balance.",
        "The lungs and kidneys contribute to acid-base regulation."
      ],

      examAlert:
        "Patients with vomiting or diarrhea are at risk of fluid and electrolyte imbalance.",

      questions: [

        {
          question: "Which organ plays a major role in regulating fluid and electrolyte balance?",

          options: [
            "Kidneys",
            "Skin only",
            "Eyes",
            "Ears"
          ],

          answer: 0,

          explanation:
            "The kidneys regulate water and electrolyte excretion and are essential for maintaining fluid balance."
        },

        {
          question: "Which patient is at increased risk of dehydration?",

          options: [
            "A patient with prolonged vomiting and diarrhea",
            "A healthy person drinking adequate fluids",
            "A patient with normal fluid intake",
            "A patient with stable hydration"
          ],

          answer: 0,

          explanation:
            "Vomiting and diarrhea can cause significant fluid loss and increase the risk of dehydration."
        },

        {
          question: "Which electrolyte is especially important for normal cardiac and neuromuscular function?",

          options: [
            "Potassium",
            "Oxygen",
            "Glucose",
            "Urea"
          ],

          answer: 0,

          explanation:
            "Potassium is essential for normal nerve, muscle and cardiac function."
        }

      ]
    },

    // ========================================================
    // MODULE 6
    // ========================================================

    {
      title: "Module 6 — Hemodynamic Disorders",

      explanation: `
        <p>Hemodynamics refers to the movement of blood through the
        cardiovascular system.</p>

        <p>Normal tissue function depends on adequate blood flow and oxygen
        delivery. Problems with circulation can reduce tissue perfusion and
        cause organ dysfunction.</p>

        <p><strong>Edema</strong> is an abnormal accumulation of fluid in the
        tissues. It may occur because of increased hydrostatic pressure,
        reduced plasma oncotic pressure, lymphatic obstruction or increased
        vascular permeability.</p>

        <p><strong>Thrombosis</strong> refers to formation of a blood clot within
        a blood vessel. A clot can interfere with normal blood flow.</p>

        <p><strong>Shock</strong> is a serious condition in which tissue
        perfusion becomes inadequate to meet the body's needs.</p>
      `,

      clinicalApplication: `
        <p>A patient experiencing shock may develop hypotension, rapid pulse,
        altered mental status, cool skin and reduced urine output depending on
        the cause and stage.</p>

        <p>Rapid recognition and prompt intervention are essential because
        prolonged inadequate tissue perfusion can lead to organ failure.</p>
      `,

      keyPoints: [
        "Adequate blood flow is necessary for tissue oxygenation.",
        "Edema is abnormal accumulation of fluid in tissues.",
        "Thrombosis is formation of a clot within a blood vessel.",
        "Shock involves inadequate tissue perfusion.",
        "Severe circulatory problems can lead to organ dysfunction."
      ],

      examAlert:
        "Shock is a medical emergency because inadequate tissue perfusion can rapidly progress to organ dysfunction and death.",

      questions: [

        {
          question: "What is edema?",

          options: [
            "Accumulation of fluid in tissues",
            "Complete absence of blood",
            "Increase in bone density",
            "Loss of muscle movement"
          ],

          answer: 0,

          explanation:
            "Edema refers to abnormal accumulation of fluid in the interstitial tissues."
        },

        {
          question: "What is thrombosis?",

          options: [
            "Formation of a blood clot within a vessel",
            "Normal digestion",
            "Lung expansion",
            "Bone growth"
          ],

          answer: 0,

          explanation:
            "Thrombosis is the formation of a blood clot within a blood vessel."
        },

        {
          question: "Why is shock dangerous?",

          options: [
            "It always improves blood flow.",
            "It can cause inadequate tissue perfusion and organ dysfunction.",
            "It increases oxygen delivery to every tissue.",
            "It only affects the skin."
          ],

          answer: 1,

          explanation:
            "Shock causes inadequate tissue perfusion, which can lead to cellular injury and organ dysfunction."
        }

      ]
    },

    // ========================================================
    // MODULE 7
    // ========================================================

    {
      title: "Module 7 — Pain and Fever",

      explanation: `
        <p><strong>Pain</strong> is an unpleasant sensory and emotional experience
        associated with actual or potential tissue damage.</p>

        <p>Pain may be acute or chronic. Acute pain usually develops suddenly
        and is often associated with injury, surgery or illness. Chronic pain
        persists or recurs over a prolonged period.</p>

        <p><strong>Fever</strong> occurs when the body's temperature-regulating
        system is reset to a higher level, commonly in response to infection or
        inflammation.</p>

        <p>Fever may increase metabolic demands and can be accompanied by chills,
        sweating, weakness and increased heart rate.</p>

        <p>Nurses should assess pain using appropriate pain assessment tools and
        monitor temperature and other clinical findings in patients with fever.</p>
      `,

      clinicalApplication: `
        <p>A patient recovering from surgery may experience acute pain.
        Appropriate assessment helps the nurse determine the severity,
        location, quality and duration of the pain and evaluate the response
        to prescribed interventions.</p>
      `,

      keyPoints: [
        "Pain is both a sensory and emotional experience.",
        "Acute pain usually has a relatively recent onset.",
        "Chronic pain persists or recurs over a prolonged period.",
        "Fever commonly occurs in response to infection or inflammation.",
        "Pain should be assessed systematically."
      ],

      examAlert:
        "Pain is subjective. Always assess the patient's report of pain rather than assuming its severity from appearance alone.",

      questions: [

        {
          question: "Which statement about pain is most accurate?",

          options: [
            "Pain is always visible.",
            "Pain is subjective.",
            "Pain can only occur after surgery.",
            "Pain is never influenced by emotions."
          ],

          answer: 1,

          explanation:
            "Pain is a subjective experience and should be assessed from the patient's report together with other clinical findings."
        },

        {
          question: "Fever commonly occurs as a response to:",

          options: [
            "Infection or inflammation",
            "Normal hydration",
            "Healthy sleep",
            "Normal digestion only"
          ],

          answer: 0,

          explanation:
            "Fever commonly occurs when the body responds to infection or inflammatory processes."
        }

      ]
    },

    // ========================================================
    // MODULE 8
    // ========================================================

    {
      title: "Module 8 — Applying Pathophysiology to Nursing Practice",

      explanation: `
        <p>Pathophysiology becomes most useful when nurses apply disease
        mechanisms to patient assessment and care.</p>

        <p>A nurse should think about the relationship between the patient's
        diagnosis, underlying disease process, signs and symptoms, laboratory
        findings, treatment and response to treatment.</p>

        <p>For example, a patient with diabetes mellitus may have persistently
        elevated blood glucose because of inadequate insulin production,
        impaired insulin action or a combination of both.</p>

        <p>Persistent hyperglycemia can contribute to damage of blood vessels,
        nerves, kidneys, eyes and other tissues.</p>

        <p>Understanding these mechanisms helps nurses recognize the importance
        of blood glucose monitoring, medication adherence, nutrition, foot care,
        patient education and prevention of complications.</p>

        <p>Good nursing care therefore requires more than memorizing disease
        names. The nurse should understand the process occurring inside the
        patient's body and use that knowledge during assessment, planning,
        implementation and evaluation.</p>
      `,

      clinicalApplication: `
        <p>When caring for a patient with diabetes, the nurse should monitor
        blood glucose as prescribed, assess for symptoms of hypo- or
        hyperglycemia, reinforce appropriate medication and nutrition guidance,
        and assess for complications such as foot problems when indicated.</p>

        <p>The nurse should also recognize that patient education is an important
        part of preventing long-term complications.</p>
      `,

      keyPoints: [
        "Pathophysiology helps connect disease mechanisms with patient findings.",
        "Nurses use pathophysiology during assessment and clinical decision-making.",
        "Diabetes can cause long-term complications when poorly controlled.",
        "Understanding disease mechanisms improves patient education.",
        "The goal is to connect cause, mechanism, manifestation and nursing care."
      ],

      examAlert:
        "When studying any disease, ask four questions: What caused it? What is happening inside the body? What signs and symptoms result? What should the nurse monitor and do?",

      questions: [

        {
          question: "Why should nurses study pathophysiology?",

          options: [
            "To memorize disease names only",
            "To understand the relationship between disease processes and patient findings",
            "To replace patient assessment",
            "To avoid learning pharmacology"
          ],

          answer: 1,

          explanation:
            "Pathophysiology helps nurses understand how disease processes produce clinical manifestations and complications."
        },

        {
          question: "Which approach best demonstrates application of pathophysiology?",

          options: [
            "Memorizing symptoms without understanding them",
            "Connecting a disease mechanism with the patient's signs and symptoms",
            "Ignoring laboratory findings",
            "Treating every patient the same"
          ],

          answer: 1,

          explanation:
            "Applying pathophysiology means connecting the underlying disease mechanism with clinical findings and nursing care."
        },

        {
          question: "Persistent hyperglycemia can contribute to:",

          options: [
            "Long-term tissue and organ complications",
            "Permanent improvement in circulation",
            "Guaranteed absence of disease",
            "Normal blood glucose without treatment"
          ],

          answer: 0,

          explanation:
            "Persistent hyperglycemia can damage blood vessels and nerves and contribute to complications involving organs such as the kidneys and eyes."
        }

      ]
    }

  ]
},

    // ========================================================
    // 8. COMMUNITY HEALTH NURSING
    // ========================================================

    "community-health": {
      lessons: [
        {
          title: "Introduction to Community Health Nursing",
          description: "Learn how nurses promote health within communities.",
          notes: `
            <p>Community health nursing focuses on individuals, families and
            populations within their communities.</p>

            <p>Major activities include health education, prevention,
            screening and community assessment.</p>
          `,
          keyPoints: [
            "Community health focuses on populations.",
            "Prevention is important.",
            "Health education is a major nursing activity."
          ],
          question: "What is an important focus of community health nursing?",
          options: [
            "Disease prevention",
            "Ignoring communities",
            "Only hospital construction",
            "Avoiding health education"
          ],
          answer: 0,
          explanation: "Prevention and health promotion are important parts of community health nursing."
        }
      ]
    },

    // ========================================================
    // 9. MATERNAL & CHILD HEALTH
    // ========================================================

    "maternal-child-health": {
      lessons: [
        {
          title: "Maternal and Child Health",
          description: "Understand care of mothers, newborns and children.",
          notes: `
            <p>Maternal and child health includes care before, during and after
            pregnancy as well as health services for infants and children.</p>

            <p>Early identification of risk factors and appropriate education
            can improve outcomes.</p>
          `,
          keyPoints: [
            "Maternal health includes pregnancy and postpartum care.",
            "Child health includes prevention and treatment.",
            "Health education supports families."
          ],
          question: "Who is included in maternal and child health services?",
          options: [
            "Only doctors",
            "Mothers and children",
            "Only hospital administrators",
            "Only pharmacists"
          ],
          answer: 1,
          explanation: "Maternal and child health focuses on mothers, infants and children."
        }
      ]
    },

    // ========================================================
    // 10. MIDWIFERY
    // ========================================================

    "midwifery": {
      lessons: [
        {
          title: "Introduction to Midwifery",
          description: "Learn the foundations of midwifery care.",
          notes: `
            <p>Midwifery focuses on care during pregnancy, labour, birth and
            the postpartum period, as well as newborn care.</p>

            <p>Midwives support normal pregnancy and childbirth while recognizing
            situations that require referral or additional medical care.</p>
          `,
          keyPoints: [
            "Midwifery includes antenatal care.",
            "Midwives support women during labour and birth.",
            "Newborn care is also important.",
            "Complications require appropriate referral."
          ],
          question: "Which period is included in midwifery care?",
          options: [
            "Pregnancy",
            "Only childhood",
            "Only old age",
            "Only adolescence"
          ],
          answer: 0,
          explanation: "Midwifery care includes pregnancy and the childbirth continuum."
        }
      ]
    },

    // ========================================================
    // 11. PAEDIATRIC NURSING
    // ========================================================

    "paediatric-nursing": {
      lessons: [
        {
          title: "Introduction to Paediatric Nursing",
          description: "Understand nursing care for infants, children and adolescents.",
          notes: `
            <p>Paediatric nursing focuses on the health needs of children and
            adolescents.</p>

            <p>Children are not simply small adults. Their anatomy,
            physiology, communication and medication requirements vary with age.</p>
          `,
          keyPoints: [
            "Children have age-specific healthcare needs.",
            "Growth and development are important.",
            "Family involvement is often essential."
          ],
          question: "Why does paediatric nursing require age-specific care?",
          options: [
            "Children are identical to adults",
            "Children have different developmental and physiological needs",
            "Children never become ill",
            "Medication is never required"
          ],
          answer: 1,
          explanation: "Children have developmental and physiological characteristics that require age-appropriate care."
        }
      ]
    },

    // ========================================================
    // 12. MENTAL HEALTH
    // ========================================================

    "mental-health": {
      lessons: [
        {
          title: "Introduction to Mental Health Nursing",
          description: "Learn the foundations of mental health and psychiatric care.",
          notes: `
            <p>Mental health nursing supports people experiencing psychological,
            emotional and behavioural difficulties.</p>

            <p>Therapeutic communication, safety assessment and respect for
            dignity are central to care.</p>
          `,
          keyPoints: [
            "Mental health nursing uses therapeutic communication.",
            "Patient safety is important.",
            "Respect and dignity must be maintained."
          ],
          question: "Which skill is especially important in mental health nursing?",
          options: [
            "Therapeutic communication",
            "Ignoring the patient",
            "Avoiding listening",
            "Judging the patient"
          ],
          answer: 0,
          explanation: "Therapeutic communication is a key component of mental health nursing."
        }
      ]
    },

    // ========================================================
    // 13. NUTRITION & DIETETICS
    // ========================================================

    "nutrition-dietetics": {
      lessons: [
        {
          title: "Introduction to Nutrition",
          description: "Understand nutrients and their role in health.",
          notes: `
            <p>Nutrition involves the intake and use of nutrients required for
            growth, energy, repair and normal body function.</p>

            <h3>Major nutrients</h3>
            <ul>
              <li>Carbohydrates</li>
              <li>Proteins</li>
              <li>Fats</li>
              <li>Vitamins</li>
              <li>Minerals</li>
              <li>Water</li>
            </ul>
          `,
          keyPoints: [
            "Nutrition supports growth and health.",
            "Carbohydrates, proteins and fats provide energy and structural functions.",
            "Vitamins and minerals support normal body processes.",
            "Water is essential for life."
          ],
          question: "Which nutrient is important for tissue growth and repair?",
          options: [
            "Protein",
            "Water only",
            "Oxygen",
            "Salt only"
          ],
          answer: 0,
          explanation: "Protein provides amino acids needed for growth and tissue repair."
        }
      ]
    },

    // ========================================================
    // 14. HEALTH ASSESSMENT
    // ========================================================

    "health-assessment": {
      lessons: [
        {
          title: "Introduction to Health Assessment",
          description: "Learn how nurses collect information about patient health.",
          notes: `
            <p>Health assessment involves collecting subjective and objective
            information about a patient's health status.</p>

            <p>Methods may include health history, physical examination and
            observation.</p>
          `,
          keyPoints: [
            "Assessment collects patient information.",
            "Subjective data comes from the patient or caregiver.",
            "Objective data can be observed or measured."
          ],
          question: "What is an important component of health assessment?",
          options: [
            "Health history",
            "Guessing",
            "Ignoring symptoms",
            "Avoiding observation"
          ],
          answer: 0,
          explanation: "A health history is an important part of comprehensive assessment."
        }
      ]
    },

    // ========================================================
    // 15. NURSING ETHICS
    // ========================================================

    "nursing-ethics": {
      lessons: [
        {
          title: "Nursing Ethics and Professional Practice",
          description: "Understand ethical principles and professional responsibilities.",
          notes: `
            <p>Nursing ethics helps nurses make decisions that respect patients'
            rights, dignity and wellbeing.</p>

            <h3>Important principles</h3>
            <ul>
              <li>Respect for autonomy</li>
              <li>Beneficence</li>
              <li>Non-maleficence</li>
              <li>Justice</li>
              <li>Confidentiality</li>
            </ul>
          `,
          keyPoints: [
            "Patients deserve dignity and respect.",
            "Confidentiality is important.",
            "Ethical principles guide professional decisions."
          ],
          question: "Which principle involves respecting a patient's right to make decisions?",
          options: [
            "Autonomy",
            "Negligence",
            "Deception",
            "Isolation"
          ],
          answer: 0,
          explanation: "Autonomy refers to respecting a person's right to make informed decisions."
        }
      ]
    },

    // ========================================================
    // 16. RESEARCH METHODS
    // ========================================================

    "research-methods": {
      lessons: [
        {
          title: "Introduction to Nursing Research",
          description: "Learn why research is important in nursing.",
          notes: `
            <p>Nursing research generates evidence that can improve patient care,
            nursing practice, education and healthcare systems.</p>

            <p>A research project normally begins with a clearly defined problem
            or question.</p>
          `,
          keyPoints: [
            "Research supports evidence-based practice.",
            "A clear research question is important.",
            "Research findings can improve healthcare."
          ],
          question: "Why is nursing research important?",
          options: [
            "To improve evidence-based care",
            "To avoid learning",
            "To replace all clinical judgement",
            "To eliminate documentation"
          ],
          answer: 0,
          explanation: "Research provides evidence that can improve nursing practice and patient care."
        }
      ]
    },

    // ========================================================
    // 17. BIOSTATISTICS
    // ========================================================

    "biostatistics": {
      lessons: [
        {
          title: "Introduction to Biostatistics",
          description: "Learn how statistics are applied to health and nursing.",
          notes: `
            <p>Biostatistics involves the application of statistical methods to
            biological, medical and public health information.</p>

            <p>Nurses may encounter statistics when reading research, interpreting
            health data or evaluating outcomes.</p>
          `,
          keyPoints: [
            "Biostatistics applies statistics to health.",
            "Statistics help summarize data.",
            "Nurses should understand basic statistical information."
          ],
          question: "What is biostatistics used for?",
          options: [
            "Analyzing health-related data",
            "Building hospital walls",
            "Preparing uniforms",
            "Cleaning equipment only"
          ],
          answer: 0,
          explanation: "Biostatistics applies statistical methods to health and biological data."
        }
      ]
    },

    // ========================================================
    // 18. PUBLIC HEALTH
    // ========================================================

    "public-health": {
      lessons: [
        {
          title: "Introduction to Public Health",
          description: "Understand how health is protected at population level.",
          notes: `
            <p>Public health focuses on protecting and improving the health of
            populations through prevention, health promotion, surveillance and
            other community-level interventions.</p>
          `,
          keyPoints: [
            "Public health focuses on populations.",
            "Prevention is central.",
            "Surveillance helps identify health problems."
          ],
          question: "What is a major focus of public health?",
          options: [
            "Population health",
            "Only individual entertainment",
            "Hospital decoration",
            "Personal shopping"
          ],
          answer: 0,
          explanation: "Public health focuses on protecting and improving population health."
        }
      ]
    },

    // ========================================================
    // 19. HEALTH PROMOTION
    // ========================================================

    "health-promotion": {
      lessons: [
        {
          title: "Introduction to Health Promotion",
          description: "Learn how nurses help individuals and communities improve health.",
          notes: `
            <p>Health promotion helps people increase control over factors that
            influence their health.</p>

            <p>Nurses can promote health through education, healthy lifestyle
            support, screening and prevention.</p>
          `,
          keyPoints: [
            "Health promotion supports healthier choices.",
            "Education is an important nursing intervention.",
            "Prevention and healthy lifestyles are major components."
          ],
          question: "Which activity can promote health?",
          options: [
            "Health education",
            "Ignoring risk factors",
            "Discouraging exercise",
            "Avoiding screening"
          ],
          answer: 0,
          explanation: "Health education can help people make informed health decisions."
        }
      ]
    },

    // ========================================================
    // 20. INFECTION PREVENTION & CONTROL
    // ========================================================

    "infection-control": {
      lessons: [
        {
          title: "Introduction to Infection Prevention and Control",
          description: "Learn how healthcare workers prevent the spread of infection.",
          notes: `
            <p>Infection prevention and control aims to reduce the transmission
            of infectious organisms in healthcare and community settings.</p>

            <h3>Important measures</h3>
            <ul>
              <li>Hand hygiene</li>
              <li>Appropriate personal protective equipment</li>
              <li>Safe injection practices</li>
              <li>Cleaning and disinfection</li>
              <li>Appropriate waste management</li>
            </ul>
          `,
          keyPoints: [
            "Hand hygiene is fundamental.",
            "PPE should be selected according to risk.",
            "Safe practices reduce infection transmission."
          ],
          question: "Which practice is fundamental to infection prevention?",
          options: [
            "Hand hygiene",
            "Ignoring contamination",
            "Reusing contaminated equipment",
            "Avoiding cleaning"
          ],
          answer: 0,
          explanation: "Hand hygiene is one of the most important measures for preventing transmission of infection."
        }
      ]
    }
  };

  // ==========================================================
  // FALLBACK CONTENT
  // ==========================================================

  function createFallbackContent(subject) {
    const name = subject && subject.name
      ? subject.name
      : "Nursing Subject";

    return {
      lessons: [
        {
          title: "Introduction to " + name,
          description: "Learn the basic concepts and foundations of " + name + ".",
          notes: `
            <p>
              Welcome to the <strong>${escapeHTML(name)}</strong> section of
              PulsePrep.
            </p>

            <p>
              This module introduces important concepts that nursing students
              should understand before progressing to more advanced topics.
            </p>

            <h3>Study approach</h3>

            <ul>
              <li>Read the lesson carefully.</li>
              <li>Review the key points.</li>
              <li>Answer the practice question.</li>
              <li>Review the explanation.</li>
              <li>Continue to the next lesson.</li>
            </ul>
          `,
          keyPoints: [
            name + " is an important area of nursing education.",
            "Understand the basic concepts before studying advanced topics.",
            "Use practice questions to test your understanding."
          ],
          question: "What is the best approach when studying " + name + "?",
          options: [
            "Understand the concepts",
            "Memorize without understanding",
            "Skip all lessons",
            "Avoid practice questions"
          ],
          answer: 0,
          explanation: "Understanding the concepts provides a stronger foundation for nursing practice."
        }
      ]
    };
  }

  // ==========================================================
  // GET CONTENT
  // ==========================================================

  function getContent(subject) {
    if (!subject) {
      return null;
    }

    return SUBJECT_CONTENT[subject.id] || createFallbackContent(subject);
  }

  // ==========================================================
  // LESSON HTML
  // ==========================================================

  function renderLesson(lesson, index) {
    const options = Array.isArray(lesson.options)
      ? lesson.options
      : [];

    const keyPoints = Array.isArray(lesson.keyPoints)
      ? lesson.keyPoints
      : [];

    let optionsHTML = "";

    options.forEach(function (option, optionIndex) {
      optionsHTML += `
        <button
          type="button"
          class="pulseprep-answer-option"
          data-option-index="${optionIndex}"
          data-correct="${optionIndex === lesson.answer ? "true" : "false"}"
          style="
            width:100%;
            text-align:left;
            padding:14px 16px;
            margin-bottom:10px;
            border:1px solid #e5e7eb;
            border-radius:12px;
            background:#ffffff;
            cursor:pointer;
            transition:all .2s ease;
          "
        >
          <strong>${String.fromCharCode(65 + optionIndex)}.</strong>
          ${escapeHTML(option)}
        </button>
      `;
    });

    let keyPointsHTML = "";

    keyPoints.forEach(function (point) {
      keyPointsHTML += `
        <li style="margin-bottom:8px;">
          ${escapeHTML(point)}
        </li>
      `;
    });

    return `
      <article
        class="pulseprep-lesson"
        id="pulseprep-lesson-${index}"
        style="
          background:#ffffff;
          border:1px solid #e5e7eb;
          border-radius:20px;
          padding:24px;
          margin-bottom:24px;
          box-shadow:0 5px 20px rgba(0,0,0,.05);
        "
      >

        <div
          style="
            display:inline-flex;
            align-items:center;
            padding:6px 12px;
            border-radius:999px;
            background:#eef2ff;
            color:#3730a3;
            font-size:13px;
            font-weight:700;
            margin-bottom:12px;
          "
        >
          LESSON ${index + 1}
        </div>

        <h2
          style="
            font-size:25px;
            font-weight:800;
            margin:0 0 8px;
          "
        >
          ${escapeHTML(lesson.title)}
        </h2>

        <p
          style="
            color:#6b7280;
            margin-bottom:20px;
          "
        >
          ${escapeHTML(lesson.description || "")}
        </p>

        <div
          class="pulseprep-notes"
          style="
            line-height:1.8;
            color:#374151;
          "
        >
          ${lesson.notes || ""}
        </div>

        ${
          keyPoints.length
            ? `
              <div
                style="
                  margin-top:24px;
                  padding:20px;
                  border-radius:16px;
                  background:#f8fafc;
                "
              >
                <h3
                  style="
                    margin:0 0 12px;
                    font-size:18px;
                    font-weight:800;
                  "
                >
                  Key Points
                </h3>

                <ul style="padding-left:20px;margin:0;">
                  ${keyPointsHTML}
                </ul>
              </div>
            `
            : ""
        }

        <div
          style="
            margin-top:24px;
            padding:20px;
            border-radius:16px;
            background:#f9fafb;
            border:1px solid #e5e7eb;
          "
        >

          <h3
            style="
              margin:0 0 16px;
              font-size:18px;
              font-weight:800;
            "
          >
            Practice Question
          </h3>

          <p
            style="
              font-weight:700;
              margin-bottom:16px;
            "
          >
            ${escapeHTML(lesson.question || "Review the lesson above.")}
          </p>

          <div class="pulseprep-options">
            ${optionsHTML}
          </div>

          <div
            class="pulseprep-answer-feedback"
            style="
              display:none;
              margin-top:16px;
              padding:16px;
              border-radius:12px;
            "
          ></div>

        </div>

      </article>
    `;
  }

  // ==========================================================
  // RENDER SUBJECT
  // ==========================================================

  function renderSubjectPage(subjectId) {
    const subject = getSubject(subjectId);

    if (!subject) {
      const page = ensurePage();

      page.innerHTML = `
        <div
          style="
            max-width:900px;
            margin:40px auto;
            padding:30px;
            text-align:center;
          "
        >
          <h2>Subject Not Found</h2>

          <p>
            We could not find this subject. Please return to the
            Subject Library and try again.
          </p>

          <button
            type="button"
            onclick="showPulsePrepSubjects()"
            style="
              margin-top:20px;
              padding:12px 20px;
              border:0;
              border-radius:10px;
              cursor:pointer;
              font-weight:700;
            "
          >
            Back to Subjects
          </button>
        </div>
      `;

      return;
    }

    const page = ensurePage();
    const content = getContent(subject);
    const lessons = content.lessons || [];

    let lessonsHTML = "";

    lessons.forEach(function (lesson, index) {
      lessonsHTML += renderLesson(lesson, index);
    });

    page.innerHTML = `
      <div
        class="pulseprep-subject-wrapper"
        style="
          width:100%;
          min-height:100vh;
          background:#f8fafc;
          padding:20px;
        "
      >

        <div
          style="
            max-width:1100px;
            margin:0 auto;
          "
        >

          <!-- BACK BUTTON -->

          <button
            type="button"
            onclick="showPulsePrepSubjects()"
            style="
              display:inline-flex;
              align-items:center;
              gap:8px;
              border:0;
              background:transparent;
              cursor:pointer;
              font-weight:700;
              color:#4f46e5;
              margin-bottom:20px;
              padding:8px 0;
            "
          >
            ← Back to Subject Library
          </button>

          <!-- SUBJECT HEADER -->

          <header
            style="
              background:linear-gradient(135deg,#4f46e5,#7c3aed);
              color:#ffffff;
              border-radius:24px;
              padding:32px;
              margin-bottom:28px;
              box-shadow:0 10px 30px rgba(79,70,229,.2);
            "
          >

            <div
              style="
                font-size:48px;
                margin-bottom:12px;
              "
            >
              ${escapeHTML(subject.icon || "📚")}
            </div>

            <h1
              style="
                margin:0 0 10px;
                font-size:32px;
                font-weight:900;
              "
            >
              ${escapeHTML(subject.name)}
            </h1>

            <p
              style="
                margin:0;
                opacity:.9;
                font-size:16px;
                line-height:1.6;
              "
            >
              ${escapeHTML(subject.description || "Study this nursing subject through structured lessons and practice questions.")}
            </p>

            <div
              style="
                display:flex;
                flex-wrap:wrap;
                gap:10px;
                margin-top:20px;
              "
            >

              <span
                style="
                  padding:8px 12px;
                  background:rgba(255,255,255,.15);
                  border-radius:999px;
                  font-size:13px;
                  font-weight:700;
                "
              >
                ${lessons.length} Lesson${lessons.length === 1 ? "" : "s"}
              </span>

              <span
                style="
                  padding:8px 12px;
                  background:rgba(255,255,255,.15);
                  border-radius:999px;
                  font-size:13px;
                  font-weight:700;
                "
              >
                Practice Questions
              </span>

              <span
                style="
                  padding:8px 12px;
                  background:rgba(255,255,255,.15);
                  border-radius:999px;
                  font-size:13px;
                  font-weight:700;
                "
              >
                Nursing Study
              </span>

            </div>

          </header>

          <!-- PROGRESS -->

          <div
            style="
              background:#ffffff;
              border:1px solid #e5e7eb;
              border-radius:18px;
              padding:20px;
              margin-bottom:28px;
            "
          >

            <div
              style="
                display:flex;
                justify-content:space-between;
                gap:15px;
                margin-bottom:10px;
              "
            >

              <strong>Study Progress</strong>

              <span id="pulseprepProgressText">
                0%
              </span>

            </div>

            <div
              style="
                height:10px;
                background:#e5e7eb;
                border-radius:999px;
                overflow:hidden;
              "
            >

              <div
                id="pulseprepProgressBar"
                style="
                  width:0%;
                  height:100%;
                  background:#4f46e5;
                  transition:width .3s ease;
                "
              ></div>

            </div>

          </div>

          <!-- LESSONS -->

          <section>

            <div
              style="
                margin-bottom:20px;
              "
            >

              <h2
                style="
                  font-size:26px;
                  font-weight:900;
                  margin:0 0 6px;
                "
              >
                Course Lessons
              </h2>

              <p
                style="
                  color:#6b7280;
                  margin:0;
                "
              >
                Work through each lesson and complete the practice questions.
              </p>

            </div>

            ${lessonsHTML}

          </section>

          <!-- COMPLETION -->

          <div
            id="pulseprepCompletionMessage"
            style="
              display:none;
              background:#ffffff;
              border:1px solid #e5e7eb;
              border-radius:20px;
              padding:30px;
              margin-top:30px;
              text-align:center;
            "
          >

            <div
              style="
                font-size:48px;
                margin-bottom:10px;
              "
            >
              🎉
            </div>

            <h2
              style="
                font-size:25px;
                font-weight:900;
                margin-bottom:8px;
              "
            >
              Subject Completed!
            </h2>

            <p style="color:#6b7280;">
              Great work. You have completed all available lessons in this subject.
            </p>

          </div>

        </div>

      </div>
    `;

    attachLessonEvents(subject.id, lessons.length);
  }

  // ==========================================================
  // LESSON EVENTS
  // ==========================================================

  function attachLessonEvents(subjectId, lessonCount) {
    const page = getPage();

    if (!page) {
      return;
    }

    const buttons = page.querySelectorAll(
      ".pulseprep-answer-option"
    );

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {

        const lesson = button.closest(".pulseprep-lesson");

        if (!lesson) {
          return;
        }

        const allOptions = lesson.querySelectorAll(
          ".pulseprep-answer-option"
        );

        const feedback = lesson.querySelector(
          ".pulseprep-answer-feedback"
        );

        const correct = button.dataset.correct === "true";

        allOptions.forEach(function (option) {
          option.disabled = true;
          option.style.cursor = "default";
        });

        if (correct) {
          button.style.borderColor = "#16a34a";
          button.style.background = "#f0fdf4";

          feedback.style.display = "block";
          feedback.style.background = "#f0fdf4";
          feedback.style.color = "#166534";

          feedback.innerHTML = `
            <strong>✓ Correct!</strong>
            <p style="margin:6px 0 0;">
              Excellent work. Review the explanation and continue.
            </p>
          `;

          lesson.dataset.completed = "true";

        } else {

          button.style.borderColor = "#dc2626";
          button.style.background = "#fef2f2";

          const correctOption = lesson.querySelector(
            '[data-correct="true"]'
          );

          if (correctOption) {
            correctOption.style.borderColor = "#16a34a";
            correctOption.style.background = "#f0fdf4";
          }

          feedback.style.display = "block";
          feedback.style.background = "#fef2f2";
          feedback.style.color = "#991b1b";

          const content = SUBJECT_CONTENT[subjectId];

          let explanation = "";

          if (content && content.lessons) {
            const lessons = Array.from(
              page.querySelectorAll(".pulseprep-lesson")
            );

            const lessonIndex = lessons.indexOf(lesson);

            if (
              lessonIndex >= 0 &&
              content.lessons[lessonIndex]
            ) {
              explanation =
                content.lessons[lessonIndex].explanation || "";
            }
          }

          feedback.innerHTML = `
            <strong>Not quite.</strong>

            ${
              explanation
                ? `
                  <p style="margin:6px 0 0;">
                    ${escapeHTML(explanation)}
                  </p>
                `
                : ""
            }
          `;
        }

        updateProgress();
      });
    });

    function updateProgress() {
      const completed = page.querySelectorAll(
        '.pulseprep-lesson[data-completed="true"]'
      ).length;

      const total = lessonCount || 1;

      const percentage = Math.round(
        (completed / total) * 100
      );

      const progressBar = page.querySelector(
        "#pulseprepProgressBar"
      );

      const progressText = page.querySelector(
        "#pulseprepProgressText"
      );

      if (progressBar) {
        progressBar.style.width = percentage + "%";
      }

      if (progressText) {
        progressText.textContent = percentage + "%";
      }

      if (percentage >= 100) {
        const completion = page.querySelector(
          "#pulseprepCompletionMessage"
        );

        if (completion) {
          completion.style.display = "block";
        }
      }
    }
  }

  // ==========================================================
  // PUBLIC API
  // ==========================================================

  window.openPulsePrepSubjectPage = function (subjectId) {

    console.log(
      "PulsePrep: Opening subject:",
      subjectId
    );

    const subject = getSubject(subjectId);

    if (!subject) {
      console.error(
        "PulsePrep: Subject not found:",
        subjectId
      );
    }

    ensurePage();

    showSubjectTab();

    renderSubjectPage(subjectId);

    setTimeout(function () {
      scrollToTop();
    }, 50);
  };

  // Compatibility aliases
  window.renderSubjectPage =
    window.openPulsePrepSubjectPage;

  window.openSubjectPage =
    window.openPulsePrepSubjectPage;

  // ==========================================================
  // RETURN TO SUBJECT LIBRARY
  // ==========================================================

  window.showPulsePrepSubjects = function () {

    if (typeof window.showTab === "function") {
      try {
        window.showTab("subject-library");
      } catch (error) {
        console.warn(
          "PulsePrep: Could not open subject-library tab.",
          error
        );
      }
    }

    const library =
      document.getElementById("subject-library") ||
      document.getElementById("pulseprepSubjectLibrary");

    if (library) {
      library.style.display = "";
      library.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    if (typeof window.renderPulsePrepSubjects === "function") {
      try {
        window.renderPulsePrepSubjects();
      } catch (error) {
        console.warn(
          "PulsePrep: Could not refresh subjects.",
          error
        );
      }
    }
  };

  // ==========================================================
  // DEBUG / STATUS
  // ==========================================================

  window.PulsePrepSubjectEngine = {
    version: "2.0.0",
    subjects: function () {
      return getSubjects();
    },
    content: function () {
      return SUBJECT_CONTENT;
    },
    open: function (subjectId) {
      window.openPulsePrepSubjectPage(subjectId);
    }
  };

  console.log(
    "PulsePrep Subject Engine loaded successfully."
  );

})();
