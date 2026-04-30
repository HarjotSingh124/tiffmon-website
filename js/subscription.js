import { db } from "./firebase-config.js";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  onSnapshot as onCollectionSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const container = document.getElementById("subscriptionData");

const savedUser = JSON.parse(sessionStorage.getItem("tiffmon_subscriber") || "null");

console.log("savedUser from session:", savedUser);
console.log("savedUser.id:", savedUser?.id);

if (!savedUser || !savedUser.id) {
  window.location.href = "login.html";
}

let currentUser = savedUser;
let mealHistory = [];

window.logout = function () {
  sessionStorage.removeItem("tiffmon_subscriber");
  window.location.href = "login.html";
};

window.contactSupport = function () {
  const msg = encodeURIComponent(
    `Hi Tiffmon, I need help with my subscription (ID: ${currentUser?.subscriberId || ""})`
  );
  window.open(`https://wa.me/919350148731?text=${msg}`, "_blank");
};

function formatMealDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderSubscription(user, history) {
  const totalMeals = Number(user.totalMeals || 0);
  const mealsTaken = Number(user.mealsTaken || 0);
  const remainingMeals = Math.max(totalMeals - mealsTaken, 0);
  const progress = totalMeals > 0 ? (mealsTaken / totalMeals) * 100 : 0;
  const status = user.subscriptionStatus || "active";

  const historyHtml = history.length
    ? history
        .map(
          (item) => `
            <div class="history-item">
              <div>
                <strong>${formatMealDate(item.mealDate)}</strong>
                <p>${item.mealSlot === "lunch" ? "Lunch" : "Dinner"} Delivered</p>
              </div>
              <span class="history-badge">✔</span>
            </div>
          `
        )
        .join("")
    : `<p class="empty-history">No meal history yet.</p>`;

  container.innerHTML = `
    <div class="card">
      <h3>${user.customerName || "Customer"}</h3>
      <p>📞 ${user.phone || "-"}</p>
      <p class="status ${status}">
        ${status}
      </p>
    </div>

    <div class="card">
      <h3>📦 Plan</h3>
      <p><strong>${user.planName || "-"}</strong></p>
      <p>₹${user.price || 0} / ${user.period || ""}</p>
      <p>Start: ${user.startDate || "-"}</p>
    </div>

    <div class="card">
      <h3>🍽 Meals</h3>
      <p>${mealsTaken} / ${totalMeals} used</p>

      <div class="progress-bar">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>

      <p>Remaining: ${remainingMeals}</p>
    </div>

    <div class="card">
      <h3>📍 Address</h3>
      <p>${user.addressLine1 || ""}</p>
      <p>${user.addressLine2 || ""}</p>
      <p>${user.city || ""} - ${user.pincode || ""}</p>
    </div>

    <div class="card">
      <h3>📜 Meal History</h3>
      <div class="history-list">
        ${historyHtml}
      </div>
    </div>

    <div class="card">
      <h3>💬 Support</h3>
      <button onclick="contactSupport()" class="logout-btn">
        WhatsApp Support
      </button>
    </div>
  `;
}

function updateUI() {
  renderSubscription(currentUser, mealHistory);
}

const userRef = doc(db, "customerSubscriptions", savedUser.id);

onSnapshot(
  userRef,
  (snapshot) => {
    if (!snapshot.exists()) {
      alert("Subscription not found.");
      sessionStorage.removeItem("tiffmon_subscriber");
      window.location.href = "login.html";
      return;
    }

    currentUser = {
      id: snapshot.id,
      ...snapshot.data()
    };

    sessionStorage.setItem("tiffmon_subscriber", JSON.stringify(currentUser));
    updateUI();
  },
  (error) => {
    console.error("Live user sync error:", error);
    container.innerHTML = `
      <div class="card">
        <h3>Unable to load subscription</h3>
        <p>Please refresh the page.</p>
      </div>
    `;
  }
);

const historyQuery = query(
  collection(db, "subscriptionMealHistory"),
  where("subscriptionId", "==", savedUser.id),
  orderBy("mealDate", "desc")
);

console.log("History query subscriptionId:", savedUser.id);

onCollectionSnapshot(
  historyQuery,
  (snapshot) => {
    mealHistory = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Meal history docs:", mealHistory);
    updateUI();
  },
  (error) => {
    console.error("Meal history sync error full:", error);
    alert("Meal history error: " + error.message);
  }
);