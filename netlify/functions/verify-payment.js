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

    const reference =
      event.queryStringParameters?.reference;

    if (!reference) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Payment reference is required."
        })
      };
    }

    const secretKey =
      process.env.PAYSTACK_API_KEY;

    if (!secretKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Paystack API key is not configured."
        })
      };
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error:
            data.message ||
            "Unable to verify payment."
        })
      };
    }

    const transaction = data.data;

    const successful =
      transaction.status === "success";

    if (!successful) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          reference: transaction.reference,
          message: "Payment was not successful."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        reference: transaction.reference,
        amount: transaction.amount,
        currency: transaction.currency,
        email: transaction.customer?.email || null,
        plan:
          transaction.metadata?.plan || null,
        paidAt:
          transaction.paid_at || null
      })
    };

  } catch (error) {

    console.error("Payment verification error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Payment verification failed."
      })
    };
  }
};
