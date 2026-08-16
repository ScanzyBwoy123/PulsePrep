exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const questions = [
      {
        category: "Pharmacology",
        question: "A nurse is caring for a client receiving digoxin. Which finding should the nurse report immediately?",
        options: [
          "Heart rate of 54 beats/min",
          "Blood pressure of 128/76 mmHg",
          "Respiratory rate of 18/min",
          "Temperature of 37°C"
        ],
        correctIndex: 0,
        rationale: "Bradycardia can indicate digoxin toxicity and requires prompt assessment."
      },
      {
        category: "Pharmacology",
        question: "Which instruction is most important for a client taking warfarin?",
        options: [
          "Maintain a consistent intake of vitamin K",
          "Take aspirin every day",
          "Stop the medication when bruising occurs",
          "Double the dose if a dose is missed"
        ],
        correctIndex: 0,
        rationale: "Vitamin K intake should remain consistent because major changes can affect anticoagulation."
      },
      {
        category: "Pharmacology",
        question: "Which adverse effect should a nurse monitor for in a client receiving morphine?",
        options: [
          "Respiratory depression",
          "Increased appetite",
          "Hypertension",
          "Hyperactivity"
        ],
        correctIndex: 0,
        rationale: "Opioids can cause serious respiratory depression."
      },

      {
        category: "Fundamentals",
        question: "Which action should the nurse take first when a client reports difficulty breathing?",
        options: [
          "Assess airway and breathing",
          "Document the complaint",
          "Call the family",
          "Offer food"
        ],
        correctIndex: 0,
        rationale: "Airway and breathing are immediate priorities."
      },
      {
        category: "Fundamentals",
        question: "Which position is generally appropriate for a client experiencing shortness of breath?",
        options: [
          "High-Fowler's",
          "Flat supine",
          "Prone",
          "Trendelenburg"
        ],
        correctIndex: 0,
        rationale: "High-Fowler's positioning can improve lung expansion and ease breathing."
      },
      {
        category: "Fundamentals",
        question: "Which finding should the nurse recognize as a potential sign of infection?",
        options: [
          "Fever and elevated white blood cell count",
          "Cool skin and normal temperature",
          "Normal appetite",
          "Clear urine"
        ],
        correctIndex: 0,
        rationale: "Fever and leukocytosis are common indicators of infection."
      },

      {
        category: "Medical-Surgical",
        question: "Which finding is most concerning in a client with pneumonia?",
        options: [
          "Oxygen saturation of 88%",
          "Temperature of 37.5°C",
          "Mild fatigue",
          "Occasional cough"
        ],
        correctIndex: 0,
        rationale: "An oxygen saturation of 88% indicates hypoxemia and requires prompt intervention."
      },
      {
        category: "Medical-Surgical",
        question: "A client with diabetes is sweating, trembling, and confused. What should the nurse suspect?",
        options: [
          "Hypoglycemia",
          "Hyperglycemia",
          "Hypertension",
          "Dehydration"
        ],
        correctIndex: 0,
        rationale: "Sweating, tremors, and confusion are common manifestations of hypoglycemia."
      },
      {
        category: "Medical-Surgical",
        question: "Which finding may indicate worsening heart failure?",
        options: [
          "Increasing shortness of breath and weight gain",
          "Improved exercise tolerance",
          "Decreased peripheral edema",
          "Clear lung sounds"
        ],
        correctIndex: 0,
        rationale: "Fluid retention can cause rapid weight gain, edema, and worsening dyspnea."
      },

      {
        category: "Maternal & Newborn",
        question: "Which finding in a postpartum client requires immediate attention?",
        options: [
          "Heavy vaginal bleeding with a saturated pad",
          "Mild uterine cramping",
          "Mild fatigue",
          "Breast tenderness"
        ],
        correctIndex: 0,
        rationale: "Heavy postpartum bleeding may indicate postpartum hemorrhage."
      },
      {
        category: "Maternal & Newborn",
        question: "Which finding is expected during a normal pregnancy?",
        options: [
          "Mild nausea during early pregnancy",
          "Severe vaginal bleeding",
          "Persistent severe abdominal pain",
          "Loss of consciousness"
        ],
        correctIndex: 0,
        rationale: "Mild nausea is common during early pregnancy, whereas the other findings require evaluation."
      },
      {
        category: "Maternal & Newborn",
        question: "Which newborn finding requires immediate assessment?",
        options: [
          "Difficulty breathing",
          "Sleeping after feeding",
          "Sneezing occasionally",
          "Mild crying"
        ],
        correctIndex: 0,
        rationale: "Respiratory difficulty in a newborn can indicate serious compromise."
      },

      {
        category: "Pediatrics",
        question: "Which sign may indicate dehydration in an infant?",
        options: [
          "Decreased wet diapers",
          "Frequent urination",
          "Moist mucous membranes",
          "Normal tears"
        ],
        correctIndex: 0,
        rationale: "Reduced urine output is an important sign of dehydration."
      },
      {
        category: "Pediatrics",
        question: "Which action is most appropriate when administering medication to a child?",
        options: [
          "Verify the dose according to the child's weight",
          "Use the adult dose",
          "Estimate the dose",
          "Skip checking the medication"
        ],
        correctIndex: 0,
        rationale: "Many pediatric medications are weight-based, making accurate weight verification essential."
      },
      {
        category: "Pediatrics",
        question: "Which finding in a child with respiratory illness is most concerning?",
        options: [
          "Cyanosis",
          "Mild cough",
          "Runny nose",
          "Sneezing"
        ],
        correctIndex: 0,
        rationale: "Cyanosis may indicate inadequate oxygenation and requires immediate attention."
      },

      {
        category: "Mental Health",
        question: "A client says, 'I don't want to live anymore.' What should the nurse do first?",
        options: [
          "Assess the client for suicidal thoughts and a plan",
          "Tell the client to think positively",
          "Leave the client alone",
          "Change the subject"
        ],
        correctIndex: 0,
        rationale: "The nurse should directly assess suicide risk, including thoughts, plan, and intent."
      },
      {
        category: "Mental Health",
        question: "Which response demonstrates therapeutic communication?",
        options: [
          "Tell me more about how you are feeling.",
          "Don't worry about it.",
          "Everything will be fine.",
          "You shouldn't feel that way."
        ],
        correctIndex: 0,
        rationale: "Open-ended statements encourage the client to express feelings."
      },
      {
        category: "Mental Health",
        question: "Which intervention is appropriate for a client experiencing severe anxiety?",
        options: [
          "Use short, simple statements",
          "Give lengthy explanations",
          "Ask many questions at once",
          "Leave the client without support"
        ],
        correctIndex: 0,
        rationale: "Short and simple communication is easier to understand during severe anxiety."
      },

      {
        category: "Emergency & Critical Care",
        question: "A client becomes unresponsive and is not breathing normally. What should the nurse do?",
        options: [
          "Activate emergency response and begin CPR",
          "Give the client water",
          "Wait five minutes",
          "Leave the room"
        ],
        correctIndex: 0,
        rationale: "An unresponsive client without normal breathing requires immediate resuscitation."
      },
      {
        category: "Emergency & Critical Care",
        question: "Which finding may indicate shock?",
        options: [
          "Hypotension and rapid heart rate",
          "Normal blood pressure",
          "Warm dry skin with normal pulse",
          "Improved mental status"
        ],
        correctIndex: 0,
        rationale: "Hypotension, tachycardia, and altered mental status can occur with shock."
      },
      {
        category: "Emergency & Critical Care",
        question: "Which assessment is the priority for a client with suspected airway obstruction?",
        options: [
          "Airway",
          "Diet",
          "Sleep pattern",
          "Bowel habits"
        ],
        correctIndex: 0,
        rationale: "Airway assessment is the immediate priority."
      },

      {
        category: "Infection Control",
        question: "Which action is the most effective way to reduce transmission of infection?",
        options: [
          "Perform proper hand hygiene",
          "Wear perfume",
          "Reuse disposable gloves",
          "Skip cleaning equipment"
        ],
        correctIndex: 0,
        rationale: "Proper hand hygiene is one of the most effective methods of preventing infection transmission."
      },
      {
        category: "Infection Control",
        question: "When should a nurse perform hand hygiene?",
        options: [
          "Before and after patient contact",
          "Only at the end of the shift",
          "Only when hands look dirty",
          "Only before lunch"
        ],
        correctIndex: 0,
        rationale: "Hand hygiene should be performed at appropriate moments before and after patient care."
      },
      {
        category: "Infection Control",
        question: "Which type of precaution is appropriate for a client with a highly contagious airborne infection?",
        options: [
          "Airborne precautions",
          "No precautions",
          "Only contact precautions",
          "Only standard precautions"
        ],
        correctIndex: 0,
        rationale: "Airborne precautions are used for infections transmitted through airborne particles."
      },

      {
        category: "Ethics & Professional Practice",
        question: "A nurse discovers a medication error. What should the nurse do first?",
        options: [
          "Assess the client",
          "Hide the error",
          "Delete the documentation",
          "Blame another nurse"
        ],
        correctIndex: 0,
        rationale: "The client's safety comes first, so the nurse should immediately assess the client."
      },
      {
        category: "Ethics & Professional Practice",
        question: "Which action protects client confidentiality?",
        options: [
          "Discuss patient information only with authorized healthcare personnel",
          "Post patient information online",
          "Discuss the patient in public",
          "Share records with friends"
        ],
        correctIndex: 0,
        rationale: "Patient information should only be shared with authorized individuals for appropriate purposes."
      },
      {
        category: "Ethics & Professional Practice",
        question: "Which action demonstrates professional nursing practice?",
        options: [
          "Following appropriate standards of care",
          "Ignoring safety procedures",
          "Sharing confidential information",
          "Documenting care that was not provided"
        ],
        correctIndex: 0,
        rationale: "Professional nursing practice requires safe, ethical, and accurate care."
      }
    ];

    /*
      Randomize the question order each time
      the function is requested.
    */
    const shuffledQuestions = [...questions].sort(
      () => Math.random() - 0.5
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        questions: shuffledQuestions
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Unable to load questions."
      })
    };
  }
};
