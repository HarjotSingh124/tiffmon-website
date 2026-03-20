import { auth, provider } from "./firebase-config.js";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    showToast(`✅ Welcome, ${user.displayName || "User"}!`);
  } catch (error) {
    console.error("Google sign-in error:", error);
    showToast("❌ Google sign-in failed");
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
    showToast("👋 Signed out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    showToast("❌ Sign out failed");
  }
}

function updateAuthUI(user) {
  const signInBtn = document.querySelector(".nav-signin");

  if (!signInBtn) return;

  if (user) {
    signInBtn.textContent = user.displayName
      ? `👤 ${user.displayName.split(" ")[0]}`
      : "👤 Account";

    signInBtn.onclick = logoutUser;
    signInBtn.title = "Click to sign out";
  } else {
    signInBtn.textContent = "👤 Sign In";
    signInBtn.onclick = signInWithGoogle;
    signInBtn.title = "Sign in with Google";
  }
}

onAuthStateChanged(auth, (user) => {
  updateAuthUI(user);
});

window.signInWithGoogle = signInWithGoogle;
window.logoutUser = logoutUser;