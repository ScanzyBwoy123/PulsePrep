exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const questions = [
      {
        category: "Pharmacology",
        question:
          "A nurse is caring for a client who is receiving digoxin. Which finding should the nurse report immediately?",
        options: [
          "Heart rate of 54 beats/min",
          "Blood pressure of 128/76 mmHg",
          "Respiratory rate of 18/min",
          "Temperature of 37°C"
        ],
        correctIndex: 0,
        rationale:
          "A low heart rate can indicate digoxin toxicity and should be reported promptly."
      },
      {
        category: "Pharmacology",
        question:
          "Which instruction is most important for a client taking warfarin?",
        options: [
          "Maintain a consistent intake of vitamin K",
          "Take aspirin for headaches",
          "Stop the medication when bruising occurs",
          "Double the dose if one dose is missed"
        ],
        correctIndex: 0,
        rationale:
          "Vitamin K intake should remain consistent because significant changes can affect anticoagulation."
      },
      {
        category: "Fundamentals",
        question:
          "Which action should the nurse take first when a client reports difficulty breathing?",
        options: [
          "Assess the client's airway and breathing",
          "Document the complaint",
          "Call the family",
          "Offer the client food"
        ],
        correctIndex: 0,
        rationale:
          "Airway and breathing are immediate priorities in an emergency."
      },
      {
        category: "Medical-Surgical",
        question:
          "Which finding is most concerning in a client with pneumonia?",
        options: [
          "Oxygen saturation of 88%",
          "Temperature of 37.5°C",
          "Mild fatigue",
          "Occasional cough"
        ],
        correctIndex: 0,
        rationale:
          "An oxygen saturation of 88% indicates hypoxemia and requires prompt assessment and intervention."
      },
      {
        category: "Maternal Nursing",
        question:
          "Which finding in a postpartum client requires immediate nursing attention?",
        options: [
          "Heavy vaginal bleeding with a saturated pad",
          "Mild uterine cramping",
          "Fatigue",
          "Breast tenderness"
        ],
        correctIndex: 0,
        rationale:
          "Heavy postpartum bleeding may indicate postpartum hemorrhage and requires immediate assessment."
      }
    ];

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        questions
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
