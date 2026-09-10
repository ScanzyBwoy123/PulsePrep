exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          success: false,
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

    const paystackKey =
      process.env.PAYSTACK_API_KEY;

    const supabaseUrl =
      process.env.SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!paystackKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Paystack API key is not configured."
        })
      };
    }

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "Supabase is not configured."
        })
      };
    }

    // Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status || !data.data) {
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

    // Payment must actually be successful
    if (transaction.status !== "success") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          reference: transaction.reference,
          message: "Payment was not successful."
        })
      };
    }

    const email =
      transaction.customer?.email
        ?.trim()
        .toLowerCase() || null;

    const plan =
      transaction.metadata?.plan || null;

    // Save successful payment/subscription
    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          email,
          reference: transaction.reference,
          amount: transaction.amount,
          status: "success",
          plan,
          paid_at:
            transaction.paid_at ||
            new Date().toISOString()
        })
      }
    );

    const supabaseData =
      await supabaseResponse.text();

    if (!supabaseResponse.ok) {
      console.error(
        "Supabase save failed:",
        supabaseData
      );

      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error:
            "Payment verified but could not save subscription."
        })
      };
    }

    // Payment verified and subscription saved
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
        email,
        plan,
        paidAt:
          transaction.paid_at || null
      })
    };

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Payment verification failed."
      })
    };
  }
};
