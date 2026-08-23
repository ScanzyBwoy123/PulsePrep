// ============================================================
// PULSEPREP — SUPABASE AUTHENTICATION
// ============================================================

const SUPABASE_URL = "https://eskwphjtiogguhvtktmh.supabase.co";

// Use your Supabase PUBLISHABLE key here.
// Do NOT use a secret/service_role key.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_o-Dr554qwhmu4SNpZL5dxQ__cP7MB9p";

// Load Supabase browser client
const supabaseScript = document.createElement("script");
supabaseScript.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
supabaseScript.onload = () => {
  window.pulseprepSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  initPulsePrepAuth();
};

document.head.appendChild(supabaseScript);


// ============================================================
// AUTH INITIALIZATION
// ============================================================

async function initPulsePrepAuth() {
  if (!window.pulseprepSupabase) return;

  const { data } = await window.pulseprepSupabase.auth.getSession();

  updateAuthUI(data?.session || null);

  window.pulseprepSupabase.auth.onAuthStateChange(
    (_event, session) => {
      updateAuthUI(session);
    }
  );
}


// ============================================================
// CREATE ACCOUNT
// ============================================================

async function pulsePrepSignUp(email, password) {
  if (!window.pulseprepSupabase) {
    throw new Error("Supabase is not ready yet.");
  }

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }

  const { data, error } =
    await window.pulseprepSupabase.auth.signUp({
      email: email.trim().toLowerCase(),
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

async function pulsePrepLogin(email, password) {
  if (!window.pulseprepSupabase) {
    throw new Error("Supabase is not ready yet.");
  }

  const { data, error } =
    await window.pulseprepSupabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

  if (error) {
    throw error;
  }

  updateAuthUI(data.session);

  return data;
}


// ============================================================
// LOGOUT
// ============================================================

async function pulsePrepLogout() {
  if (!window.pulseprepSupabase) return;

  const { error } =
    await window.pulseprepSupabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
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

  const { data, error } =
    await window.pulseprepSupabase.auth.getUser();

  if (error) {
    console.error("User lookup error:", error);
    return null;
  }

  return data?.user || null;
}


// ============================================================
// UPDATE HEADER
// ============================================================

function updateAuthUI(session) {
  const badge = document.getElementById("membershipBadge");

  if (!badge) return;

  if (session?.user) {
    badge.textContent = "Student Account";
    badge.className =
      "px-3 py-1 rounded-full bg-white/10 text-xs font-semibold";
  } else {
    badge.textContent = "Free Student";
    badge.className =
      "px-3 py-1 rounded-full bg-white/10 text-xs font-semibold";
  }
}


// ============================================================
// EXPOSE FUNCTIONS
// ============================================================

window.pulsePrepSignUp = pulsePrepSignUp;
window.pulsePrepLogin = pulsePrepLogin;
window.pulsePrepLogout = pulsePrepLogout;
window.getPulsePrepUser = getPulsePrepUser;
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
    data: { session }
  } = await window.pulseprepSupabase.auth.getSession();

  if (!session) {
    return {
      authenticated: false,
      premium: false
    };
  }

  const response = await fetch(
    "/.netlify/functions/check-premium",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`
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


// Make it available to PulsePrep
window.checkPulsePrepPremium =
  checkPulsePrepPremium;
