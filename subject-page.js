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
      lessons: [
        {
          title: "Introduction to Anatomy & Physiology",
          description: "Understand the structure and function of the human body.",
          notes: `
            <p><strong>Anatomy</strong> is the study of body structures, while
            <strong>physiology</strong> is the study of how those structures function.</p>

            <p>The two subjects are closely related because the structure of a body
            part usually determines how it performs its function.</p>

            <h3>Levels of organization</h3>
            <ol>
              <li>Chemical level</li>
              <li>Cellular level</li>
              <li>Tissue level</li>
              <li>Organ level</li>
              <li>Organ-system level</li>
              <li>Organism level</li>
            </ol>

            <h3>Homeostasis</h3>
            <p>Homeostasis is the maintenance of a relatively stable internal
            environment despite changes in the body or surroundings.</p>
          `,
          keyPoints: [
            "Anatomy studies structure.",
            "Physiology studies function.",
            "Structure and function are closely related.",
            "The body is organized into different levels.",
            "Homeostasis helps maintain internal balance."
          ],
          question: "What does physiology study?",
          options: [
            "Body structure",
            "Body function",
            "Diseases only",
            "Medications only"
          ],
          answer: 1,
          explanation: "Physiology is the study of how the body and its parts function."
        },

        {
          title: "Cells and Tissues",
          description: "Learn about the basic structural units of the human body.",
          notes: `
            <p>The <strong>cell</strong> is the basic structural and functional unit
            of the human body.</p>

            <h3>Major cell structures</h3>
            <ul>
              <li><strong>Cell membrane:</strong> controls movement into and out of the cell.</li>
              <li><strong>Nucleus:</strong> contains genetic material.</li>
              <li><strong>Mitochondria:</strong> produce much of the cell's usable energy.</li>
              <li><strong>Ribosomes:</strong> participate in protein synthesis.</li>
            </ul>

            <h3>Four major tissue types</h3>
            <ol>
              <li>Epithelial tissue</li>
              <li>Connective tissue</li>
              <li>Muscle tissue</li>
              <li>Nervous tissue</li>
            </ol>
          `,
          keyPoints: [
            "Cells are the basic units of life.",
            "The nucleus contains genetic material.",
            "Mitochondria are important for energy production.",
            "There are four major tissue types."
          ],
          question: "Which structure contains most of a cell's genetic material?",
          options: [
            "Nucleus",
            "Cell membrane",
            "Ribosome",
            "Mitochondrion"
          ],
          answer: 0,
          explanation: "The nucleus contains the cell's chromosomes and most of its genetic material."
        },

        {
          title: "Skeletal System",
          description: "Study bones, joints and their functions.",
          notes: `
            <p>The skeletal system provides support, protects internal organs,
            assists movement and stores minerals.</p>

            <h3>Functions of bones</h3>
            <ul>
              <li>Support</li>
              <li>Protection</li>
              <li>Movement</li>
              <li>Mineral storage</li>
              <li>Blood cell formation in bone marrow</li>
            </ul>

            <p>Joints are locations where two or more bones meet. Their structure
            allows different degrees of movement.</p>
          `,
          keyPoints: [
            "Bones provide support.",
            "The skeleton protects important organs.",
            "Bones help movement.",
            "Bone marrow is involved in blood cell production."
          ],
          question: "Which is a major function of the skeletal system?",
          options: [
            "Producing insulin",
            "Protecting organs",
            "Digesting food",
            "Filtering urine"
          ],
          answer: 1,
          explanation: "The skeleton protects organs such as the brain, heart and lungs."
        },

        {
          title: "Cardiovascular System",
          description: "Understand the heart, blood and circulation.",
          notes: `
            <p>The cardiovascular system consists mainly of the <strong>heart,
            blood and blood vessels</strong>.</p>

            <p>The heart pumps blood through the pulmonary and systemic circulations.</p>

            <h3>Blood vessels</h3>
            <ul>
              <li><strong>Arteries:</strong> carry blood away from the heart.</li>
              <li><strong>Veins:</strong> carry blood toward the heart.</li>
              <li><strong>Capillaries:</strong> allow exchange between blood and tissues.</li>
            </ul>
          `,
          keyPoints: [
            "The heart pumps blood.",
            "Arteries carry blood away from the heart.",
            "Veins carry blood toward the heart.",
            "Capillaries are important sites of exchange."
          ],
          question: "Which blood vessels carry blood away from the heart?",
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
          title: "Respiratory System",
          description: "Learn how oxygen enters the body and carbon dioxide is removed.",
          notes: `
            <p>The respiratory system allows the body to exchange oxygen and
            carbon dioxide with the environment.</p>

            <h3>Major structures</h3>
            <ul>
              <li>Nose and nasal cavity</li>
              <li>Pharynx</li>
              <li>Larynx</li>
              <li>Trachea</li>
              <li>Bronchi</li>
              <li>Lungs</li>
              <li>Alveoli</li>
            </ul>

            <p>Gas exchange occurs mainly in the <strong>alveoli</strong>.</p>
          `,
          keyPoints: [
            "The respiratory system exchanges gases.",
            "Oxygen is needed by cells.",
            "Carbon dioxide is removed.",
            "Gas exchange occurs mainly in the alveoli."
          ],
          question: "Where does most gas exchange occur in the lungs?",
          options: [
            "Trachea",
            "Bronchi",
            "Alveoli",
            "Larynx"
          ],
          answer: 2,
          explanation: "The alveoli provide a large surface area for oxygen and carbon dioxide exchange."
        }
      ]
    },

    // ========================================================
    // 2. MICROBIOLOGY
    // ========================================================

    "microbiology": {
      lessons: [
        {
          title: "Introduction to Microbiology",
          description: "Study microorganisms and their importance in healthcare.",
          notes: `
            <p>Microbiology is the study of microorganisms, including bacteria,
            viruses, fungi, protozoa and some other microscopic organisms.</p>

            <p>Microorganisms can be beneficial, harmless or disease-causing.</p>
          `,
          keyPoints: [
            "Microbiology studies microorganisms.",
            "Not all microorganisms cause disease.",
            "Microorganisms may be useful or harmful."
          ],
          question: "What does microbiology mainly study?",
          options: [
            "Bones",
            "Microorganisms",
            "Medication prices",
            "Hospital buildings"
          ],
          answer: 1,
          explanation: "Microbiology is the study of microorganisms."
        },

        {
          title: "Bacteria",
          description: "Understand bacterial structure, growth and disease.",
          notes: `
            <p>Bacteria are single-celled microorganisms. Some bacteria are
            beneficial while others can cause infection.</p>

            <p>Important bacterial structures include the cell membrane,
            cell wall, cytoplasm and genetic material.</p>
          `,
          keyPoints: [
            "Bacteria are microorganisms.",
            "Some bacteria cause disease.",
            "Some bacteria are beneficial."
          ],
          question: "Are all bacteria harmful to humans?",
          options: [
            "Yes",
            "No",
            "Only in hospitals",
            "Only in children"
          ],
          answer: 1,
          explanation: "Many bacteria are harmless or beneficial, although some cause disease."
        },

        {
          title: "Viruses",
          description: "Learn how viruses differ from cellular microorganisms.",
          notes: `
            <p>Viruses are infectious agents that require living host cells to
            replicate.</p>

            <p>Viral infections can affect different organs and body systems.</p>
          `,
          keyPoints: [
            "Viruses require host cells for replication.",
            "Viral diseases can affect many body systems.",
            "Prevention may include vaccination and infection-control measures."
          ],
          question: "What do viruses require for replication?",
          options: [
            "A living host cell",
            "Only water",
            "Bone marrow",
            "Oxygen alone"
          ],
          answer: 0,
          explanation: "Viruses depend on living host cells to replicate."
        }
      ]
    },

    // ========================================================
    // 3. FIRST AID
    // ========================================================

    "first-aid": {
      lessons: [
        {
          title: "Principles of First Aid",
          description: "Learn the basic approach to providing immediate care.",
          notes: `
            <p>First aid is immediate care given to a person who is injured or
            suddenly ill before definitive medical treatment is available.</p>

            <h3>Basic priorities</h3>
            <ol>
              <li>Ensure scene safety.</li>
              <li>Assess the person.</li>
              <li>Call for appropriate emergency assistance.</li>
              <li>Provide appropriate first aid.</li>
              <li>Monitor the person.</li>
            </ol>
          `,
          keyPoints: [
            "Safety comes first.",
            "Assess the person's condition.",
            "Activate emergency help when necessary.",
            "Continue monitoring."
          ],
          question: "What should be considered first when giving first aid?",
          options: [
            "Scene safety",
            "Taking a photograph",
            "Giving medication",
            "Moving the patient immediately"
          ],
          answer: 0,
          explanation: "The rescuer should first make sure the scene is safe."
        },

        {
          title: "Bleeding and Wound Care",
          description: "Understand basic management of bleeding.",
          notes: `
            <p>Bleeding should be assessed quickly. Appropriate first aid may
            include applying direct pressure with a clean dressing.</p>

            <p>Severe bleeding requires urgent medical attention.</p>
          `,
          keyPoints: [
            "Severe bleeding can become life-threatening.",
            "Direct pressure is commonly used for external bleeding.",
            "Seek emergency assistance for serious bleeding."
          ],
          question: "What is commonly used initially for significant external bleeding?",
          options: [
            "Direct pressure",
            "Ignoring the wound",
            "Giving food",
            "Applying perfume"
          ],
          answer: 0,
          explanation: "Direct pressure can help control external bleeding."
        }
      ]
    },

    // ========================================================
    // 4. FUNDAMENTALS OF NURSING
    // ========================================================

    "fundamentals-nursing": {
      lessons: [
        {
          title: "Introduction to Nursing",
          description: "Understand the role and responsibilities of nurses.",
          notes: `
            <p>Nursing involves promoting health, preventing illness, caring for
            people who are ill and supporting recovery.</p>

            <p>Nurses provide care using clinical knowledge, communication,
            assessment, planning, intervention and evaluation.</p>
          `,
          keyPoints: [
            "Nursing promotes health.",
            "Nurses provide holistic patient care.",
            "Communication is essential.",
            "Nursing care should be evidence-informed and safe."
          ],
          question: "Which is an important part of nursing care?",
          options: [
            "Patient assessment",
            "Ignoring symptoms",
            "Avoiding communication",
            "Skipping documentation"
          ],
          answer: 0,
          explanation: "Assessment is a fundamental component of safe nursing care."
        },

        {
          title: "Vital Signs",
          description: "Study temperature, pulse, respiration and blood pressure.",
          notes: `
            <p>Vital signs provide important information about a patient's
            physiological condition.</p>

            <ul>
              <li>Temperature</li>
              <li>Pulse</li>
              <li>Respiratory rate</li>
              <li>Blood pressure</li>
              <li>Oxygen saturation when clinically indicated</li>
            </ul>
          `,
          keyPoints: [
            "Vital signs help assess patient status.",
            "Changes in vital signs may indicate deterioration.",
            "Accurate measurement is important."
          ],
          question: "Which of the following is a vital sign?",
          options: [
            "Blood pressure",
            "Hair colour",
            "Shoe size",
            "Height of the nurse"
          ],
          answer: 0,
          explanation: "Blood pressure is one of the commonly measured vital signs."
        }
      ]
    },

    // ========================================================
    // 5. MEDICAL-SURGICAL NURSING
    // ========================================================

    "medical-surgical": {
      lessons: [
        {
          title: "Introduction to Medical-Surgical Nursing",
          description: "Learn the foundations of adult medical and surgical care.",
          notes: `
            <p>Medical-surgical nursing focuses on caring for adults with a wide
            range of medical and surgical conditions.</p>

            <p>Nurses assess patients, monitor changes, administer treatments,
            educate patients and evaluate responses to care.</p>
          `,
          keyPoints: [
            "Assessment is central to medical-surgical nursing.",
            "Patients may have acute or chronic conditions.",
            "Monitoring for deterioration is essential."
          ],
          question: "What is an important nursing responsibility in medical-surgical care?",
          options: [
            "Patient assessment",
            "Ignoring changes",
            "Avoiding documentation",
            "Stopping all communication"
          ],
          answer: 0,
          explanation: "Patient assessment is essential for identifying needs and changes in condition."
        },

        {
          title: "Postoperative Nursing Care",
          description: "Understand important nursing considerations after surgery.",
          notes: `
            <p>Postoperative care involves monitoring the patient's recovery,
            pain, wound, vital signs, mobility, nutrition and possible
            complications.</p>
          `,
          keyPoints: [
            "Monitor vital signs.",
            "Assess pain.",
            "Observe the surgical wound.",
            "Monitor for complications."
          ],
          question: "Which is important after surgery?",
          options: [
            "Monitoring the patient",
            "Ignoring pain",
            "Ignoring the wound",
            "Avoiding vital signs"
          ],
          answer: 0,
          explanation: "Close postoperative monitoring helps identify complications early."
        }
      ]
    },

    // ========================================================
    // 6. PHARMACOLOGY
    // ========================================================

    "pharmacology": {
      lessons: [
        {
          title: "Introduction to Pharmacology",
          description: "Understand how medicines interact with the body.",
          notes: `
            <p>Pharmacology is the study of drugs and their effects on living
            organisms.</p>

            <p>Nurses need knowledge of medication indications, routes,
            adverse effects, interactions and safe administration.</p>
          `,
          keyPoints: [
            "Pharmacology studies drugs.",
            "Medication safety is essential.",
            "Nurses should understand medication effects."
          ],
          question: "What is pharmacology?",
          options: [
            "Study of drugs",
            "Study of bones only",
            "Study of hospital architecture",
            "Study of nutrition only"
          ],
          answer: 0,
          explanation: "Pharmacology is the study of drugs and their effects."
        },

        {
          title: "Medication Safety",
          description: "Learn principles of safe medication administration.",
          notes: `
            <p>Medication safety involves correctly identifying the patient,
            medicine, dose, route, timing and other relevant requirements.</p>

            <p>Always follow institutional policies and verify medication
            information before administration.</p>
          `,
          keyPoints: [
            "Correct patient identification is important.",
            "Verify medication information.",
            "Check the prescribed dose and route.",
            "Document medication administration appropriately."
          ],
          question: "Why is patient identification important before medication administration?",
          options: [
            "To prevent medication errors",
            "To save paper",
            "To avoid documentation",
            "It is unnecessary"
          ],
          answer: 0,
          explanation: "Correct patient identification helps prevent medication errors."
        }
      ]
    },

    // ========================================================
    // 7. PATHOPHYSIOLOGY
    // ========================================================

    "pathophysiology": {
      lessons: [
        {
          title: "Introduction to Pathophysiology",
          description: "Understand how disease changes normal body function.",
          notes: `
            <p>Pathophysiology examines functional changes associated with disease
            or injury.</p>

            <p>Understanding these changes helps nurses connect signs and symptoms
            with underlying disease processes.</p>
          `,
          keyPoints: [
            "Pathophysiology studies abnormal body function.",
            "Disease can disturb normal homeostasis.",
            "Signs and symptoms reflect underlying changes."
          ],
          question: "What does pathophysiology focus on?",
          options: [
            "Abnormal body function",
            "Hospital construction",
            "Food prices",
            "Clothing"
          ],
          answer: 0,
          explanation: "Pathophysiology focuses on functional changes associated with disease."
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
