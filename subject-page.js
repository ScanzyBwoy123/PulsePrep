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
// PULSEPREP — SUBJECT-SPECIFIC LESSON ENGINE
// ==========================================================

window.openPulsePrepLesson = function (subjectId, lessonNumber) {

  const subject = subjects.find(function (item) {
    return String(item.id) === String(subjectId);
  });

  if (!subject) {
    console.error("Subject not found:", subjectId);
    return;
  }

  // ========================================================
  // CURRICULUM
  // Every subject has its own lesson list.
  // ========================================================

  const curriculum = {

    // ======================================================
    // 1. ANATOMY & PHYSIOLOGY
    // ======================================================

    "anatomy-physiology": [
      ["Introduction to Anatomy & Physiology",
        "Introduction to the study of human body structure and function.",
        "Define anatomy and physiology and explain their importance in nursing."],

      ["Anatomical Terminology",
        "Learn the standard language used to describe the location and relationship of body structures.",
        "Explain anatomical position and common directional terms."],

      ["Cells & Tissues",
        "Study the cell as the basic structural and functional unit of the human body.",
        "Describe major cell structures and the four major tissue types."],

      ["Skeletal System",
        "Study bones, joints and the functions of the skeletal system.",
        "Explain the major functions of bones and identify major skeletal structures."],

      ["Muscular System",
        "Study skeletal, cardiac and smooth muscle and their functions.",
        "Compare the three major types of muscle tissue."],

      ["Cardiovascular System",
        "Study the heart, blood and blood vessels.",
        "Explain blood circulation and the major functions of the cardiovascular system."],

      ["Respiratory System",
        "Study the organs involved in breathing and gas exchange.",
        "Explain ventilation and gas exchange."],

      ["Nervous System",
        "Study the brain, spinal cord, nerves and nervous control.",
        "Differentiate the central and peripheral nervous systems."],

      ["Digestive System",
        "Study digestion, absorption and elimination.",
        "Explain the major organs and processes of digestion."],

      ["Urinary System",
        "Study the kidneys, ureters, bladder and urethra.",
        "Explain urine formation and the role of the kidneys."],

      ["Reproductive System",
        "Study the male and female reproductive systems.",
        "Identify major reproductive organs and their functions."],

      ["Endocrine System",
        "Study hormones and the major endocrine glands.",
        "Explain how hormones regulate body functions."]
    ],


    // ======================================================
    // 2. MICROBIOLOGY
    // ======================================================

    "microbiology": [
      ["Introduction to Microbiology",
        "Study microorganisms and their importance to human health.",
        "Define microbiology and identify major groups of microorganisms."],

      ["Bacteria",
        "Study bacterial structure, classification and reproduction.",
        "Describe basic bacterial structure and binary fission."],

      ["Viruses",
        "Study viruses, their structure and replication.",
        "Explain why viruses require host cells for replication."],

      ["Fungi",
        "Study yeasts, molds and medically important fungal infections.",
        "Differentiate common forms of fungi."],

      ["Protozoa & Parasites",
        "Study medically important protozoa and parasites.",
        "Explain how selected parasites can cause human disease."],

      ["Normal Microbiota",
        "Study microorganisms that normally live on and inside the human body.",
        "Explain beneficial and harmful effects of normal microbiota."],

      ["Infection & Disease",
        "Study the relationship between microorganisms, infection and disease.",
        "Explain the basic chain of infection."],

      ["Sterilization & Disinfection",
        "Study cleaning, disinfection, antisepsis and sterilization.",
        "Differentiate sterilization from disinfection."],

      ["Immunity",
        "Study innate and adaptive immune defenses.",
        "Explain the basic mechanisms of immune protection."],

      ["Infection Prevention",
        "Study methods used to prevent transmission of microorganisms.",
        "Explain the importance of standard precautions."]
    ],


    // ======================================================
    // 3. FIRST AID
    // ======================================================

    "first-aid": [
      ["Introduction to First Aid",
        "Study the principles and priorities of immediate care.",
        "Explain the purpose of first aid."],

      ["Primary Assessment",
        "Learn how to rapidly assess an injured or ill person.",
        "Identify immediate life-threatening problems."],

      ["Basic Life Support",
        "Study basic approaches to cardiopulmonary emergencies.",
        "Describe the basic sequence of emergency response."],

      ["Bleeding & Wounds",
        "Study first aid management of bleeding and wounds.",
        "Explain basic bleeding-control principles."],

      ["Fractures & Sprains",
        "Study immediate care for musculoskeletal injuries.",
        "Describe appropriate first-aid measures for suspected fractures."],

      ["Burns",
        "Study first aid for thermal and other burns.",
        "Identify important initial care principles for burns."],

      ["Shock",
        "Study recognition and immediate management of shock.",
        "Identify common signs of shock."],

      ["Choking",
        "Study emergency response to airway obstruction.",
        "Recognize the signs of choking and appropriate emergency action."]
    ],


    // ======================================================
    // 4. FUNDAMENTALS OF NURSING
    // ======================================================

    "fundamentals-nursing": [
      ["Introduction to Nursing",
        "Study the role, purpose and principles of professional nursing.",
        "Explain the major responsibilities of a nurse."],

      ["Nursing Process",
        "Study assessment, diagnosis, planning, implementation and evaluation.",
        "Describe the five major steps of the nursing process."],

      ["Vital Signs",
        "Study temperature, pulse, respiration, blood pressure and oxygen saturation.",
        "Explain correct measurement and documentation of vital signs."],

      ["Patient Hygiene",
        "Study principles of personal hygiene and comfort care.",
        "Explain the nurse's role in maintaining patient hygiene."],

      ["Patient Safety",
        "Study principles for preventing falls, errors and avoidable harm.",
        "Identify common nursing safety measures."],

      ["Communication",
        "Study therapeutic and professional communication.",
        "Differentiate therapeutic communication from ineffective communication."],

      ["Documentation",
        "Study accurate, timely and professional nursing documentation.",
        "Explain principles of safe clinical documentation."],

      ["Basic Clinical Skills",
        "Study essential bedside nursing skills.",
        "Explain the importance of correct technique and infection prevention."]
    ],


    // ======================================================
    // 5. MEDICAL-SURGICAL NURSING
    // ======================================================

    "medical-surgical": [
      ["Introduction to Medical-Surgical Nursing",
        "Study nursing care of adults with common medical and surgical conditions.",
        "Explain the role of the medical-surgical nurse."],

      ["Patient Assessment",
        "Study systematic assessment of adult patients.",
        "Identify important components of patient assessment."],

      ["Respiratory Disorders",
        "Study nursing care for common respiratory conditions.",
        "Identify important respiratory assessment findings."],

      ["Cardiovascular Disorders",
        "Study common cardiovascular conditions and nursing care.",
        "Explain major nursing priorities in cardiovascular care."],

      ["Gastrointestinal Disorders",
        "Study common gastrointestinal problems.",
        "Identify important nursing considerations for gastrointestinal disorders."],

      ["Renal Disorders",
        "Study common kidney and urinary conditions.",
        "Explain major nursing considerations for renal patients."],

      ["Postoperative Nursing Care",
        "Study nursing care before and after surgery.",
        "Identify important postoperative nursing priorities."],

      ["Pain Management",
        "Study assessment and management of patient pain.",
        "Explain the importance of pain assessment."]
    ],


    // ======================================================
    // 6. PHARMACOLOGY
    // ======================================================

    "pharmacology": [
      ["Introduction to Pharmacology",
        "Study basic principles of medicines and drug therapy.",
        "Define pharmacology and explain its importance to nursing."],

      ["Drug Names & Classification",
        "Study generic names, brand names and drug classes.",
        "Differentiate generic and brand drug names."],

      ["Pharmacokinetics",
        "Study absorption, distribution, metabolism and excretion.",
        "Explain the four major processes of pharmacokinetics."],

      ["Pharmacodynamics",
        "Study how medicines produce effects in the body.",
        "Explain the relationship between drugs and their targets."],

      ["Routes of Administration",
        "Study oral, topical, parenteral and other medication routes.",
        "Compare common routes of medication administration."],

      ["Medication Safety",
        "Study safe medication administration and error prevention.",
        "Identify important medication-safety principles."],

      ["Adverse Drug Reactions",
        "Study unwanted and harmful responses to medicines.",
        "Differentiate common adverse effects from serious reactions."],

      ["Nursing Responsibilities",
        "Study nursing responsibilities before, during and after medication administration.",
        "Explain the nurse's role in safe medication therapy."]
    ],


    // ======================================================
    // 7. PATHOPHYSIOLOGY
    // ======================================================

    "pathophysiology": [
      ["Introduction to Pathophysiology",
        "Study how disease alters normal body function.",
        "Define pathophysiology."],

      ["Cellular Injury",
        "Study how cells respond to stress and injury.",
        "Identify basic causes of cellular injury."],

      ["Inflammation",
        "Study the body's inflammatory response.",
        "Describe the basic features of inflammation."],

      ["Fluid & Electrolyte Imbalance",
        "Study disturbances of body fluids and electrolytes.",
        "Identify common signs of fluid imbalance."],

      ["Infection & Disease",
        "Study how disease processes develop from infection.",
        "Explain basic mechanisms of infectious disease."],

      ["Immune Disorders",
        "Study abnormal immune responses.",
        "Differentiate basic immune dysfunctions."],

      ["Neoplasia",
        "Study abnormal cell growth and cancer.",
        "Explain basic concepts of neoplasia."],

      ["Systemic Disease Processes",
        "Review how pathological processes affect body systems.",
        "Relate disease mechanisms to clinical findings."]
    ],


    // ======================================================
    // 8. COMMUNITY HEALTH
    // ======================================================

    "community-health": [
      ["Introduction to Community Health Nursing",
        "Study nursing care delivered to individuals, families and communities.",
        "Define community health nursing."],

      ["Community Assessment",
        "Study systematic assessment of community health needs.",
        "Identify important components of community assessment."],

      ["Primary Health Care",
        "Study essential principles of primary health care.",
        "Explain the importance of accessible primary care."],

      ["Disease Prevention",
        "Study primary, secondary and tertiary prevention.",
        "Differentiate the levels of disease prevention."],

      ["Maternal & Child Community Care",
        "Study community services for mothers and children.",
        "Explain the importance of maternal and child health services."],

      ["Environmental Health",
        "Study environmental factors affecting health.",
        "Identify common environmental health risks."],

      ["Health Education",
        "Study effective community health education.",
        "Explain principles of effective health education."],

      ["Community Nursing Practice",
        "Apply community health principles to nursing practice.",
        "Explain the nurse's role in community-based care."]
    ],


    // ======================================================
    // 9. MATERNAL & CHILD HEALTH
    // ======================================================

    "maternal-child-health": [
      ["Introduction to Maternal & Child Health",
        "Study health care of women, newborns and children.",
        "Explain the scope of maternal and child health."],

      ["Antenatal Care",
        "Study care provided during pregnancy.",
        "Identify major components of antenatal care."],

      ["Normal Pregnancy",
        "Study normal physiological changes during pregnancy.",
        "Describe common changes associated with pregnancy."],

      ["Labour & Birth",
        "Study the basic processes of labour and childbirth.",
        "Identify the major stages of labour."],

      ["Postnatal Care",
        "Study care of the mother after childbirth.",
        "Identify important postnatal assessments."],

      ["Newborn Care",
        "Study immediate and continuing care of the newborn.",
        "Identify essential newborn-care principles."],

      ["Child Growth & Development",
        "Study normal physical, cognitive and social development.",
        "Explain the importance of developmental assessment."],

      ["Maternal & Child Health Promotion",
        "Study strategies for improving maternal and child health.",
        "Explain preventive approaches in maternal and child health."]
    ],


    // ======================================================
    // 10. MIDWIFERY
    // ======================================================

    "midwifery": [
      ["Introduction to Midwifery",
        "Study the role and responsibilities of the midwife.",
        "Explain the scope of midwifery practice."],

      ["Antenatal Care",
        "Study assessment and care during pregnancy.",
        "Identify important antenatal-care activities."],

      ["Normal Pregnancy",
        "Study physiological changes during pregnancy.",
        "Describe common maternal changes during pregnancy."],

      ["First Stage of Labour",
        "Study assessment and management during the first stage of labour.",
        "Identify important observations during labour."],

      ["Second & Third Stages of Labour",
        "Study birth and placental delivery.",
        "Explain the major events surrounding birth and placental delivery."],

      ["Postpartum Care",
        "Study maternal care after delivery.",
        "Identify important postpartum assessments."],

      ["Newborn Care",
        "Study essential care immediately after birth.",
        "Explain basic newborn-care priorities."],

      ["Midwifery Emergencies",
        "Study recognition of important obstetric emergencies.",
        "Identify the importance of early recognition and referral."]
    ],


    // ======================================================
    // 11. PAEDIATRIC NURSING
    // ======================================================

    "paediatric-nursing": [
      ["Introduction to Paediatric Nursing",
        "Study nursing care of infants, children and adolescents.",
        "Explain the principles of paediatric nursing."],

      ["Growth & Development",
        "Study normal growth and developmental milestones.",
        "Explain why developmental assessment is important."],

      ["Paediatric Assessment",
        "Study assessment of children at different developmental stages.",
        "Identify important paediatric assessment principles."],

      ["Nutrition in Children",
        "Study nutritional requirements during childhood.",
        "Explain the importance of adequate childhood nutrition."],

      ["Common Childhood Illnesses",
        "Study common conditions affecting children.",
        "Identify important nursing considerations for childhood illnesses."],

      ["Medication Safety in Children",
        "Study safe medication principles in paediatric patients.",
        "Explain why medication dosing requires special attention in children."],

      ["Child Safety",
        "Study injury prevention and safeguarding.",
        "Identify common safety risks for children."],

      ["Family-Centred Care",
        "Study the role of families in paediatric nursing.",
        "Explain family-centred nursing care."]
    ],


    // ======================================================
    // 12. MENTAL HEALTH
    // ======================================================

    "mental-health": [
      ["Introduction to Mental Health Nursing",
        "Study principles of psychiatric and mental health nursing.",
        "Define mental health and mental illness."],

      ["Therapeutic Communication",
        "Study communication techniques used in mental health care.",
        "Identify therapeutic communication techniques."],

      ["Mental Health Assessment",
        "Study systematic assessment of mental status.",
        "Identify major components of mental status assessment."],

      ["Anxiety Disorders",
        "Study common anxiety-related conditions.",
        "Identify common features of anxiety disorders."],

      ["Depression",
        "Study depressive disorders and nursing care.",
        "Identify important features requiring nursing attention."],

      ["Psychosis",
        "Study psychotic symptoms and nursing care.",
        "Differentiate common psychotic symptoms."],

      ["Crisis & Suicide Prevention",
        "Study recognition and response to mental health crises.",
        "Explain the importance of safety assessment."],

      ["Mental Health Nursing Care",
        "Apply nursing principles to patients with mental health conditions.",
        "Explain major nursing priorities in psychiatric care."]
    ],


    // ======================================================
    // 13. NUTRITION & DIETETICS
    // ======================================================

    "nutrition-dietetics": [
      ["Introduction to Nutrition",
        "Study the relationship between nutrition and health.",
        "Define nutrition and explain its importance."],

      ["Carbohydrates",
        "Study dietary carbohydrates and their functions.",
        "Explain the major functions of carbohydrates."],

      ["Proteins",
        "Study proteins and amino acids.",
        "Explain the importance of protein in the body."],

      ["Fats",
        "Study dietary fats and their functions.",
        "Differentiate major types of dietary fat."],

      ["Vitamins",
        "Study essential vitamins and their roles.",
        "Explain why vitamins are required for normal body function."],

      ["Minerals",
        "Study essential minerals and their functions.",
        "Identify important dietary minerals."],

      ["Balanced Diet",
        "Study principles of healthy and balanced eating.",
        "Explain the components of a balanced diet."],

      ["Therapeutic Nutrition",
        "Study nutritional considerations in disease.",
        "Explain how diet may be modified for patient needs."]
    ],


    // ======================================================
    // 14. HEALTH ASSESSMENT
    // ======================================================

    "health-assessment": [
      ["Introduction to Health Assessment",
        "Study systematic assessment of patients.",
        "Explain the purpose of health assessment."],

      ["Health History",
        "Study collection of subjective patient information.",
        "Identify important components of a health history."],

      ["General Survey",
        "Study the first visual assessment of a patient.",
        "Explain the importance of the general survey."],

      ["Vital Signs",
        "Study measurement and interpretation of vital signs.",
        "Identify the major vital signs."],

      ["Head-to-Toe Assessment",
        "Study systematic physical assessment.",
        "Explain the importance of a systematic assessment sequence."],

      ["Respiratory Assessment",
        "Study assessment of the respiratory system.",
        "Identify important respiratory assessment findings."],

      ["Cardiovascular Assessment",
        "Study cardiovascular assessment.",
        "Identify important cardiovascular assessment components."],

      ["Documentation & Reporting",
        "Study documentation and communication of assessment findings.",
        "Explain principles of accurate clinical reporting."]
    ],


    // ======================================================
    // 15. NURSING ETHICS
    // ======================================================

    "nursing-ethics": [
      ["Introduction to Nursing Ethics",
        "Study ethical principles that guide professional nursing.",
        "Define nursing ethics."],

      ["Patient Autonomy",
        "Study respect for patient choices and self-determination.",
        "Explain the principle of autonomy."],

      ["Beneficence & Nonmaleficence",
        "Study the ethical duties to benefit patients and avoid harm.",
        "Differentiate beneficence and nonmaleficence."],

      ["Confidentiality",
        "Study protection of patient information.",
        "Explain why confidentiality is essential."],

      ["Informed Consent",
        "Study ethical principles surrounding informed consent.",
        "Explain the purpose of informed consent."],

      ["Professional Boundaries",
        "Study appropriate professional relationships.",
        "Identify the importance of professional boundaries."],

      ["Patient Rights",
        "Study fundamental rights of patients.",
        "Identify important patient rights."],

      ["Professional Practice",
        "Study accountability, professionalism and ethical nursing practice.",
        "Explain professional responsibility in nursing."]
    ],


    // ======================================================
    // 16. RESEARCH METHODS
    // ======================================================

    "research-methods": [
      ["Introduction to Nursing Research",
        "Study the purpose and role of research in nursing.",
        "Define nursing research."],

      ["Research Problems",
        "Study how research problems and questions are developed.",
        "Identify characteristics of a good research problem."],

      ["Literature Review",
        "Study searching, evaluating and synthesizing existing evidence.",
        "Explain the purpose of a literature review."],

      ["Research Designs",
        "Study quantitative and qualitative research designs.",
        "Differentiate common research designs."],

      ["Sampling",
        "Study methods of selecting research participants.",
        "Explain the basic concept of sampling."],

      ["Data Collection",
        "Study common methods of collecting research data.",
        "Identify common data-collection methods."],

      ["Research Ethics",
        "Study ethical principles governing research.",
        "Explain why research participants require protection."],

      ["Research Reporting",
        "Study interpretation and presentation of research findings.",
        "Identify major sections of a research report."]
    ],


    // ======================================================
    // 17. BIOSTATISTICS
    // ======================================================

    "biostatistics": [
      ["Introduction to Biostatistics",
        "Study the use of statistics in health and nursing.",
        "Define biostatistics."],

      ["Data Types",
        "Study qualitative and quantitative health data.",
        "Differentiate common data types."],

      ["Measures of Central Tendency",
        "Study mean, median and mode.",
        "Define mean, median and mode."],

      ["Measures of Variation",
        "Study range, variance and standard deviation.",
        "Explain why variability is important."],

      ["Tables & Graphs",
        "Study presentation of health data.",
        "Identify appropriate ways to display data."],

      ["Probability",
        "Study basic concepts of probability.",
        "Explain the meaning of probability."],

      ["Research Statistics",
        "Study statistics commonly used in health research.",
        "Explain the role of statistics in research."],

      ["Interpreting Health Data",
        "Apply basic statistical reasoning to health information.",
        "Explain how statistics can support nursing decisions."]
    ],


    // ======================================================
    // 18. PUBLIC HEALTH
    // ======================================================

    "public-health": [
      ["Introduction to Public Health",
        "Study population-level approaches to health.",
        "Define public health."],

      ["Population Health",
        "Study factors affecting the health of populations.",
        "Explain the concept of population health."],

      ["Epidemiology",
        "Study patterns and causes of disease in populations.",
        "Define epidemiology."],

      ["Disease Surveillance",
        "Study monitoring of diseases and health events.",
        "Explain the purpose of disease surveillance."],

      ["Health Promotion",
        "Study strategies for improving population health.",
        "Explain the role of health promotion."],

      ["Disease Prevention",
        "Study prevention strategies at population level.",
        "Differentiate levels of prevention."],

      ["Environmental Health",
        "Study environmental influences on population health.",
        "Identify important environmental health factors."],

      ["Public Health Nursing",
        "Study the role of nurses in population health.",
        "Explain the contribution of nursing to public health."]
    ],


    // ======================================================
    // 19. HEALTH PROMOTION
    // ======================================================

    "health-promotion": [
      ["Introduction to Health Promotion",
        "Study strategies that enable individuals and communities to improve health.",
        "Define health promotion."],

      ["Health Education",
        "Study methods of communicating health information.",
        "Explain principles of effective health education."],

      ["Healthy Lifestyle",
        "Study behaviours that support physical and mental health.",
        "Identify major components of a healthy lifestyle."],

      ["Exercise & Physical Activity",
        "Study the health benefits of physical activity.",
        "Explain the importance of regular physical activity."],

      ["Nutrition & Healthy Eating",
        "Study healthy dietary behaviours.",
        "Explain the role of nutrition in health promotion."],

      ["Disease Prevention",
        "Study strategies for preventing illness.",
        "Identify primary prevention strategies."],

      ["Behaviour Change",
        "Study factors that influence health behaviours.",
        "Explain why behaviour change can be challenging."],

      ["Community Health Promotion",
        "Study population approaches to improving health.",
        "Explain the role of community participation."]
    ],


    // ======================================================
    // 20. INFECTION PREVENTION & CONTROL
    // ======================================================

    "infection-control": [
      ["Introduction to Infection Prevention",
        "Study principles of preventing healthcare-associated infections.",
        "Explain the purpose of infection prevention and control."],

      ["Chain of Infection",
        "Study the links involved in transmission of infection.",
        "Identify the major links in the chain of infection."],

      ["Standard Precautions",
        "Study precautions used for all patients.",
        "Explain the purpose of standard precautions."],

      ["Hand Hygiene",
        "Study hand hygiene principles and indications.",
        "Explain why hand hygiene is central to infection prevention."],

      ["Personal Protective Equipment",
        "Study appropriate selection and use of PPE.",
        "Identify common types of PPE."],

      ["Transmission-Based Precautions",
        "Study precautions for different modes of transmission.",
        "Differentiate common transmission-based precautions."],

      ["Healthcare-Associated Infections",
        "Study prevention of infections associated with healthcare.",
        "Identify common strategies for reducing healthcare-associated infections."],

      ["Cleaning, Disinfection & Sterilization",
        "Study methods for reducing or eliminating microorganisms.",
        "Differentiate cleaning, disinfection and sterilization."]
    ]

  };


  // ========================================================
  // GET SUBJECT-SPECIFIC LESSONS
  // ========================================================

  const subjectLessons = curriculum[subject.id];

  /*
   * CRITICAL SAFETY CHECK:
   * Never display another subject's lessons.
   */

  if (!subjectLessons) {

    const page =
      document.getElementById("pulseprepSubjectPage");

    if (!page) return;

    page.innerHTML = `

      <div class="max-w-5xl mx-auto px-4 py-8">

        <button
          onclick="
            openPulsePrepSubjectPage(
              '${escapeHTML(subject.id)}'
            )
          "
          class="mb-6 px-4 py-2 rounded-xl
                 bg-white border border-slate-200
                 text-slate-700 font-bold"
        >
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Back to Lessons
        </button>

        <div
          class="bg-white rounded-3xl
                 border border-slate-200
                 shadow-sm p-8 text-center"
        >

          <h1
            class="text-2xl font-black
                   text-slate-900"
          >
            ${escapeHTML(subject.name)}
          </h1>

          <p class="text-slate-500 mt-3">
            Lesson content is being prepared.
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


  // ========================================================
  // FIND LESSON
  // ========================================================

  const lesson =
    subjectLessons[lessonNumber - 1];

  if (!lesson) {
    console.error(
      "Lesson not found:",
      subject.id,
      lessonNumber
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


  // ========================================================
  // RENDER LESSON
  // ========================================================

  page.innerHTML = `

    <div class="max-w-5xl mx-auto px-4 py-6">

      <button
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
               text-white shadow-xl"
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
          Lesson ${lessonNumber}
          of
          ${subjectLessons.length}
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
            class="h-2 bg-white/20
                   rounded-full overflow-hidden"
          >

            <div
              class="h-full bg-white
                     rounded-full"
              style="width:${progress}%"
            ></div>

          </div>

        </div>

      </div>


      <!-- STUDY NOTES -->

      <section
        class="bg-white rounded-3xl
               border border-slate-200
               shadow-sm p-6 sm:p-8 mt-6"
      >

        <div
          class="flex items-center
                 gap-3 mb-5"
        >

          <div
            class="w-11 h-11 rounded-xl
                   bg-teal-50 text-teal-600
                   flex items-center
                   justify-center"
          >
            <i class="fa-solid fa-book-open"></i>
          </div>

          <h2
            class="text-2xl font-black
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
            and its importance in
            ${escapeHTML(subject.name)}.
          </p>

        </div>

      </section>


      <!-- KEY POINTS -->

      <section
        class="bg-white rounded-3xl
               border border-slate-200
               shadow-sm p-6 sm:p-8 mt-6"
      >

        <div
          class="flex items-center
                 gap-3 mb-5"
        >

          <div
            class="w-11 h-11 rounded-xl
                   bg-amber-50 text-amber-600
                   flex items-center
                   justify-center"
          >
            <i class="fa-solid fa-brain"></i>
          </div>

          <h2
            class="text-2xl font-black
                   text-slate-900"
          >
            Key Points
          </h2>

        </div>


        <ul class="space-y-3">

          <li
            class="flex gap-3 items-start"
          >

            <span
              class="w-6 h-6 mt-1
                     rounded-full
                     bg-teal-50
                     text-teal-600
                     flex items-center
                     justify-center"
            >
              <i
                class="fa-solid fa-check
                       text-xs"
              ></i>
            </span>

            <span class="text-slate-700">
              Understand the main concepts of
              ${escapeHTML(lesson[0])}.
            </span>

          </li>


          <li
            class="flex gap-3 items-start"
          >

            <span
              class="w-6 h-6 mt-1
                     rounded-full
                     bg-teal-50
                     text-teal-600
                     flex items-center
                     justify-center"
            >
              <i
                class="fa-solid fa-check
                       text-xs"
              ></i>
            </span>

            <span class="text-slate-700">
              Relate the topic to
              ${escapeHTML(subject.name)}
              and nursing practice.
            </span>

          </li>


          <li
            class="flex gap-3 items-start"
          >

            <span
              class="w-6 h-6 mt-1
                     rounded-full
                     bg-teal-50
                     text-teal-600
                     flex items-center
                     justify-center"
            >
              <i
                class="fa-solid fa-check
                       text-xs"
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
        class="bg-white rounded-3xl
               border border-slate-200
               shadow-sm p-6 sm:p-8 mt-6"
      >

        <div
          class="flex items-center
                 gap-3 mb-5"
        >

          <div
            class="w-11 h-11 rounded-xl
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
            class="text-2xl font-black
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


      <!-- NAVIGATION -->

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
            : `<div class="flex-1"></div>`
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
                Complete Course
              </button>
            `
        }

      </div>

    </div>

  `;


  // ========================================================
  // PRESERVE EXISTING NAVIGATION
  // ========================================================

  if (typeof window.showTab === "function") {
    window.showTab("subject-page");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

};

})();
