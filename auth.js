// ============================================================
// PULSEP﻿REP — SUPABASE AUTHENTICATION
// ============================================================

const SUPABASE_URL =
  "https://eskwphjtiogguhvtktmh.supabase.co";

// Use your Supabase PUBLISHABLE key here.
// Do NOT use a secret/service_role key.
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_o-Dr554qwhmu4SNpZL5dxQ__cP7MB9p";


// ============================================================
// FORCE LOGIN AGAIN WHEN PULSEP﻿REP IS REOPENED
// ============================================================
//
// PulsePrep normally restores the Supabase session when the
// student returns to the website.
//
// This version deliberately marks the page as "left" whenever
// the document is being unloaded. On the next page load, the
// existing Supabase session is cleared and the student must
// log in again.
//
// ============================================================

const PULSEP﻿REP_RETURN_FLAG =
  "pulseprep_requires_relogin";


// Mark that the student has left/reloaded PulsePrep.
function markPulsePrepAsLeft() {

  try {

    sessionStorage.setItem(
      PULSEP﻿REP_RETURN_FLAG,
      "true"
    );

  } catch (error) {

    console.warn(
      "PulsePrep: unable to save return-login flag.",
      error
    );

  }

}


// Mark the page as left when the document is unloaded.
window.addEventListener(
  "pagehide",
  markPulsePrepAsLeft
);


// Also handle normal browser unloads.
window.addEventListener(
  "beforeunload",
  markPulsePrepAsLeft
);


// ============================================================
// LOAD SUPABASE BROWSER CLIENT
// ============================================================

const supabaseScript =
  document.createElement("script");

supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = async () => {

  window.pulseprepSupabase =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );


  await initPulsePrepAuth();

};


supabaseScript.onerror = () => {

  console.error(
    "PulsePrep: Supabase library failed to load."
  );

};


document.head.appendChild(
  supabaseScript
);


// ============================================================
// AUTH INITIALIZATION
// ============================================================

async function initPulsePrepAuth() {

  if (!window.pulseprepSupabase) {
    return;
  }


  let requiresRelogin = false;


  try {

    requiresRelogin =
      sessionStorage.getItem(
        PULSEP﻿REP_RETURN_FLAG
      ) === "true";

  } catch (error) {

    console.warn(
      "PulsePrep: could not read return-login flag.",
      error
    );

  }


  /*
   * If this is a fresh visit after the previous page was
   * unloaded, remove the previous authentication session.
   */
  if (requiresRelogin) {

    console.log(
      "PulsePrep: previous session detected after leaving. Requiring login."
    );


    try {

      sessionStorage.removeItem(
        PULSEP﻿REP_RETURN_FLAG
      );

    } catch (error) {

      console.warn(error);

    }


    try {

      const {
        error
      } =
        await window.pulseprepSupabase.auth.signOut();


      if (error) {

        console.error(
          "PulsePrep: automatic logout error:",
          error
        );

      }

    } catch (error) {

      console.error(
        "PulsePrep: automatic logout failed:",
        error
      );

    }


    updateAuthUI(null);

    /*
     * Stop here. Do not restore an old session.
     */
    return;

  }


  /*
   * Normal first load.
   */
  const {
    data,
    error
  } =
    await window.pulseprepSupabase.auth.getSession();


  if (error) {

    console.error(
      "PulsePrep session lookup error:",
      error
    );

    updateAuthUI(null);

    return;

  }


  const session =
    data?.session || null;


  updateAuthUI(session);


  /*
   * Listen for future login/logout changes.
   */
  window.pulseprepSupabase.auth.onAuthStateChange(
    (_event, session) => {

      updateAuthUI(session);

    }
  );

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
        email.trim().toLowerCase(),

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
        email.trim().toLowerCase(),

      password
    });


  if (error) {
    throw error;
  }


  /*
   * The student has successfully logged in.
   * Make sure the return-login flag is cleared.
   */
  try {

    sessionStorage.removeItem(
      PULSEP﻿REP_RETURN_FLAG
    );

  } catch (error) {

    console.warn(error);

  }


  updateAuthUI(
    data.session
  );


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


  try {

    sessionStorage.removeItem(
      PULSEP﻿REP_RETURN_FLAG
    );

  } catch (error) {

    console.warn(error);

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
// PREMIUM STATUS
// ============================================================

async function checkPulsePrepPremium() {

  if (!window.pulseprepSupabase) {

    return {
      authenticated: false,
      premium: false
    };

  }


  const {
    data: {
      session
    }
  } =
    await window.pulseprepSupabase.auth.getSession();


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

    throw new Error(
      "Unable to verify Premium status."
    );

  }


  return await response.json();

}


// Make it available to PulsePrep.
window.checkPulsePrepPremium =
  checkPulsePrepPremium;


// ============================================================
// PAYMENT EMAIL FIX
// ============================================================
// Always use the email of the logged-in PulsePrep account.
// This prevents payment/subscription email mismatches.
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

            PulsePrep is still loading.
            Please try again in a moment.

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

            Please log in to your PulsePrep
            account before subscribing.

          `;


          status.classList.remove(
            "hidden"
          );


          showTab(
            "account"
          );


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

            Your account email could not be
            found. Please log in again.

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

          Preparing secure payment for
          ${escapeHTML(plan)}...

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

                body: JSON.stringify({

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

            ${escapeHTML(
              error.message
            )}

          `;


          status.classList.remove(
            "hidden"
          );

        }

      };

  }
);
