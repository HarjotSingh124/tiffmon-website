import { db } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// LOGIN FORM
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const subscriberId = document.getElementById("subscriberId").value.trim();
  const password = document.getElementById("subscriberPassword").value.trim();
  const errorEl = document.getElementById("loginError");

  errorEl.textContent = "";

  // basic validation
  if (!subscriberId || !password) {
    errorEl.textContent = "Please enter ID and Password";
    return;
  }

  try {
    // 🔥 Firestore query
    const q = query(
      collection(db, "customerSubscriptions"),
      where("subscriberId", "==", subscriberId),
      where("password", "==", password)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      errorEl.textContent = "Invalid Subscriber ID or Password";
      return;
    }

    // ✅ user found
    const user = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };

    // save session
    sessionStorage.setItem("tiffmon_subscriber", JSON.stringify(user));

    // redirect
    window.location.href = "my-subscription.html";

  } catch (error) {
    console.error("Login error:", error);
    errorEl.textContent = "Login failed. Try again.";
  }
});