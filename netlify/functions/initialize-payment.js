exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const body = JSON.parse(event.body || "{}");

    const amount = Number(body.amount);
    const plan = String(body.plan || "");
    const email = String(body.email || "").trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid payment amount."
        })
      };
    }

    if (!plan) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Payment plan is required."
        })
      };
    }

    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "A valid email address is required."
        })
      };
    }

    const secretKey = process.env.PAYSTACK_API_KEY;

    if (!secretKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Paystack API key is not configured."
        })
      };
    }

    const reference =
      `pulseprep_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 10)}`;

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100),
          currency: "GHS",
          reference,
          callback_url: "https://palseprep1.netlify.app/",
          metadata: {
            plan
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            data.message ||
            "Paystack could not initialize the payment."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Payment initialization failed."
      })
    };
  }
};
