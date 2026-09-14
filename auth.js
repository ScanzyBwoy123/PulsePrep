// ============================================================
// PULSEPREP — SUPABASE AUTHENTICATION
// ============================================================

const SUPABASE_URL =
  "https://eskwphjtiogguhvtktmh.supabase.co";

// Use your Supabase PUBLISHABLE key here.
// Do NOT use a secret/service_role key.
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_o-Dr554qwhmu4SNpZL5dxQ__cP7MB9p";


// ============================================================
// SUPABASE INITIALIZATION
// ============================================================

let pulsePrepAuthReadyResolve;

window.pulsePrepAuthReady =
  new Promise((resolve) => {
    pulsePrepAuthReadyResolve = resolve;
  });


function initializePulsePrepSupabase() {

  /*
   * If the Supabase browser SDK is already loaded,
   * reuse it instead of loading it twice.
   */
  if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
  ) {

    try {

      if (!window.pulseprepSupabase) {

        window.pulseprepSupabase =
          window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
          );

      }

      initPulsePrepAuth();

      return;

    } catch (error) {

      console.error(
        "PulsePrep Supabase initialization error:",
        error
      );

    }

  }


  /*
   * Supabase SDK is not loaded yet.
   * Check whether another script is already loading it.
   */
  const existingScript =
    document.querySelector(
      'script[src*="supabase-js"]'
    );

  if (existingScript) {

    existingScript.addEventListener(
      "load",
      initializePulsePrepSupabase,
      { once: true }
    );

    return;
  }


  /*
   * Load Supabase SDK only when necessary.
   */
  const supabaseScript =
    document.createElement("script");

  supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  supabaseScript.onload =
    initializePulsePrepSupabase;

  supabaseScript.onerror = () => {

    console.error(
      "Unable to load Supabase JavaScript SDK."
    );

  };

  document.head.appendChild(
    supabaseScript
  );
}


// Start Supabase initialization.
initializePulsePrepSupabase();


// ============================================================
// AUTH INITIALIZATION
// ============================================================

async function initPulsePrepAuth() {

  if (!window.pulseprepSupabase) {
    return;
  }

  try {

    const {
      data,
      error
    } =
      await window.pulseprepSupabase.auth.getSession();

    if (error) {
      console.error(
        "Supabase session error:",
        error
      );
    }

    const session =
      data?.session || null;

    updateAuthUI(session);

    if (
      typeof window.refreshPulsePrepAccountUI ===
      "function"
    ) {

      window.refreshPulsePrepAccountUI(
        session
      );
    }


    /*
     * Tell other PulsePrep pages that
     * authentication is ready.
     */
    if (pulsePrepAuthReadyResolve) {

      pulsePrepAuthReadyResolve(
        window.pulseprepSupabase
      );

      pulsePrepAuthReadyResolve = null;
    }


    /*
     * Listen for login/logout changes.
     */
    window.pulseprepSupabase.auth.onAuthStateChange(
      (_event, session) => {

        updateAuthUI(session);

        if (
          typeof window.refreshPulsePrepAccountUI ===
          "function"
        ) {

          window.refreshPulsePrepAccountUI(
            session
          );
        }

      }
    );

  } catch (error) {

    console.error(
      "PulsePrep authentication initialization error:",
      error
    );

  }
}


// ============================================================
// CREATE ACCOUNT
// ============================================================

async function pulsePrepSignUp(
  email,
  password
) {

  if (!window.pulseprepSupabase) {

    throw new Error(
      "Supabase is not ready yet."
    );

  }

  if (!email || !password) {

    throw new Error(
      "Email and password are required."
    );

  }

  if (password.length < 6) {

    throw new Error(
      "Password must contain at least 6 characters."
    );

  }

  const {
    data,
    error
  } =
    await window.pulseprepSupabase.auth.signUp({

      email:
        email
          .trim()
          .toLowerCase(),

      password

    });

  if (error) {
    throw error;
  }

  return data;
}


// ============================================================
// LOGIN
// ============================================================

async function pulsePrepLogin(
  email,
  password
) {

  if (!window.pulseprepSupabase) {

    throw new Error(
      "Supabase is not ready yet."
    );

  }

  const {
    data,
    error
  } =
    await window.pulseprepSupabase.auth.signInWithPassword({

      email:
        email
          .trim()
          .toLowerCase(),

      password

    });

  if (error) {
    throw error;
  }

  updateAuthUI(
    data.session
  );

  if (
    typeof window.refreshPulsePrepAccountUI ===
    "function"
  ) {

    window.refreshPulsePrepAccountUI(
      data.session
    );

  }

  return data;
}


// ============================================================
// LOGOUT
// ============================================================

async function pulsePrepLogout() {

  if (!window.pulseprepSupabase) {
    return;
  }

  const {
    error
  } =
    await window.pulseprepSupabase.auth.signOut();

  if (error) {

    console.error(
      "Logout error:",
      error
    );

    return;
  }

  updateAuthUI(null);
}


// ============================================================
// GET CURRENT USER
// ============================================================

async function getPulsePrepUser() {

  if (!window.pulseprepSupabase) {
    return null;
  }

  const {
    data,
    error
  } =
    await window.pulseprepSupabase.auth.getUser();

  if (error) {

    console.error(
      "User lookup error:",
      error
    );

    return null;
  }

  return data?.user || null;
}


// ============================================================
// UPDATE HEADER
// ============================================================

function updateAuthUI(session) {

  const badge =
    document.getElementById(
      "membershipBadge"
    );

  if (!badge) {
    return;
  }

  if (session?.user) {

    badge.textContent =
      "Student Account";

    badge.className =
      "px-3 py-1 rounded-full bg-white/10 text-xs font-semibold";

  } else {

    badge.textContent =
      "Free Student";

    badge.className =
      "px-3 py-1 rounded-full bg-white/10 text-xs font-semibold";

  }
}


// ============================================================
// PREMIUM STATUS
// ============================================================

async function checkPulsePrepPremium() {

  /*
   * Wait for the shared Supabase client.
   */
  if (!window.pulseprepSupabase) {

    try {

      await window.pulsePrepAuthReady;

    } catch (error) {

      console.error(
        "Premium authentication wait error:",
        error
      );

    }
  }


  if (!window.pulseprepSupabase) {

    return {

      authenticated: false,
      premium: false

    };

  }


  const {
    data,
    error
  } =
    await window.pulseprepSupabase.auth.getSession();


  if (error) {

    console.error(
      "Premium session error:",
      error
    );

    return {

      authenticated: false,
      premium: false

    };

  }


  const session =
    data?.session;


  if (!session) {

    return {

      authenticated: false,
      premium: false

    };

  }


  const response =
    await fetch(
      "/.netlify/functions/check-premium",
      {

        method: "GET",

        headers: {

          Authorization:
            `Bearer ${session.access_token}`

        }

      }
    );


  if (!response.ok) {

    let errorMessage =
      "Unable to verify Premium status.";

    try {

      const errorData =
        await response.json();

      errorMessage =
        errorData?.details ||
        errorData?.error ||
        errorMessage;

    } catch (parseError) {

      console.error(
        "Premium error response could not be read:",
        parseError
      );

    }

    throw new Error(
      errorMessage
    );
  }


  return await response.json();
}


// Make Premium verification available
// to the rest of PulsePrep.
window.checkPulsePrepPremium =
  checkPulsePrepPremium;


// ============================================================
// EXPOSE AUTH FUNCTIONS
// ============================================================

window.pulsePrepSignUp =
  pulsePrepSignUp;

window.pulsePrepLogin =
  pulsePrepLogin;

window.pulsePrepLogout =
  pulsePrepLogout;

window.getPulsePrepUser =
  getPulsePrepUser;


// ============================================================
// PAYMENT EMAIL FIX
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    window.startPayment =
      async function startPayment(
        amount,
        plan
      ) {

        const status =
          document.getElementById(
            "paymentStatus"
          );

        if (!status) {

          console.error(
            "Payment status element not found."
          );

          return;
        }


        const supabase =
          window.pulseprepSupabase;


        if (!supabase) {

          status.className =
            "max-w-xl mx-auto mt-6 p-4 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800";

          status.innerHTML = `
            <i class="fa-solid fa-circle-exclamation mr-2"></i>
            PulsePrep is still loading. Please try again in a moment.
          `;

          status.classList.remove(
            "hidden"
          );

          return;
        }


        const {
          data: {
            session
          },
          error: sessionError
        } =
          await supabase.auth.getSession();


        if (
          sessionError ||
          !session?.user
        ) {

          status.className =
            "max-w-xl mx-auto mt-6 p-4 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800";

          status.innerHTML = `
            <i class="fa-solid fa-circle-exclamation mr-2"></i>
            Please log in to your PulsePrep account before subscribing.
          `;

          status.classList.remove(
            "hidden"
          );

          if (
            typeof showTab ===
            "function"
          ) {

            showTab("account");

          }

          return;
        }


        const email =
          session.user.email
            ?.trim()
            .toLowerCase();


        if (!email) {

          status.className =
            "max-w-xl mx-auto mt-6 p-4 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800";

          status.innerHTML = `
            <i class="fa-solid fa-circle-exclamation mr-2"></i>
            Your account email could not be found. Please log in again.
          `;

          status.classList.remove(
            "hidden"
          );

          return;
        }


        status.className =
          "max-w-xl mx-auto mt-6 p-4 rounded-xl text-sm bg-blue-50 border border-blue-200 text-blue-800";

        status.innerHTML = `
          <i class="fa-solid fa-spinner fa-spin mr-2"></i>
          Preparing secure payment for ${escapeHTML(plan)}...
        `;

        status.classList.remove(
          "hidden"
        );


        try {

          const response =
            await fetch(
              "/.netlify/functions/initialize-payment",
              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify({

                    amount:
                      amount,

                    plan:
                      plan,

                    email:
                      email

                  })

              }
            );


          const data =
            await response.json();


          if (!response.ok) {

            throw new Error(
              data.error ||
              "Unable to initialize payment."
            );

          }


          if (
            !data.authorization_url
          ) {

            throw new Error(
              "Payment gateway did not return a checkout URL."
            );

          }


          window.location.href =
            data.authorization_url;


        } catch (error) {

          status.className =
            "max-w-xl mx-auto mt-6 p-4 rounded-xl text-sm bg-red-50 border border-red-200 text-red-800";

          status.innerHTML = `
            <i class="fa-solid fa-circle-exclamation mr-2"></i>
            ${escapeHTML(error.message)}
          `;

          status.classList.remove(
            "hidden"
          );

        }

      };

  }
);
