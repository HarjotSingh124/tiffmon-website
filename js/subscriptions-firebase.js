import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

let activePlan = null;

async function loadSubscriptions() {
  try {
    const plansGrid = document.getElementById("plansGrid");
    if (!plansGrid) {
      console.error("plansGrid not found");
      return;
    }

    const plansRef = collection(db, "subscriptions");
    const q = query(plansRef, where("active", "==", true));
    const snapshot = await getDocs(q);

    const plans = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    plansGrid.innerHTML = "";

    if (plans.length === 0) {
      plansGrid.innerHTML = `<p>No subscription plans available right now.</p>`;
      return;
    }

    plans.forEach((plan) => {
      const card = document.createElement("div");
      card.className = `plan-card ${plan.featured ? "featured" : ""}`;

      const icon =
        plan.featured
          ? "⭐"
          : plan.type === "non-veg"
          ? "🍗"
          : plan.type === "mixed"
          ? "🍱"
          : "🥦";

      card.innerHTML = `
        ${plan.badge ? `<div class="plan-popular">${plan.badge}</div>` : ""}
        <div class="plan-icon">${icon}</div>
        <h3>${plan.name || "Unnamed Plan"}</h3>
        <p class="plan-desc">${plan.description || ""}</p>
        <ul class="plan-features">
          ${(plan.features || []).map(feature => `<li>${feature}</li>`).join("")}
        </ul>
        <div class="plan-price-row">
          <div>
            <div class="plan-price">₹${plan.price || 0}</div>
            <div class="plan-period">${plan.period || ""}</div>
          </div>
          <button class="plan-btn" data-plan-id="${plan.id}">
            ${plan.buttonText || "Subscribe"}
          </button>
        </div>
      `;

      const btn = card.querySelector(".plan-btn");
      btn.addEventListener("click", () => openSubscriptionCheckout(plan));

      plansGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading subscriptions:", error);
  }
}

function openSubscriptionCheckout(plan) {
  activePlan = plan;

  const overlay = document.getElementById("subscriptionOverlay");
  const title = document.getElementById("subscriptionModalTitle");
  const startDate = document.getElementById("subStartDate");

  if (title) {
    title.textContent = `Subscribe — ${plan.name}`;
  }

  if (startDate) {
    const today = new Date().toISOString().split("T")[0];
    startDate.value = today;
  }

  overlay?.classList.add("open");
}

window.closeSubscriptionCheckout = function (e) {
  if (e.target === document.getElementById("subscriptionOverlay")) {
    document.getElementById("subscriptionOverlay")?.classList.remove("open");
  }
};

async function handleSubscriptionSubmit(e) {
  e.preventDefault();

  if (!activePlan) {
    alert("No plan selected.");
    return;
  }

  const customerName = document.getElementById("subCustomerName")?.value.trim();
  const phone = document.getElementById("subCustomerPhone")?.value.trim();
  const addressLine1 = document.getElementById("subAddressLine1")?.value.trim();
  const addressLine2 = document.getElementById("subAddressLine2")?.value.trim();
  const city = document.getElementById("subCity")?.value.trim();
  const pincode = document.getElementById("subPincode")?.value.trim();
  const startDate = document.getElementById("subStartDate")?.value;

  if (!customerName || !phone || !addressLine1 || !city || !pincode || !startDate) {
    alert("Please fill all required fields.");
    return;
  }

  const subscriptionData = {
    planId: activePlan.id,
    planName: activePlan.name || "",
    price: Number(activePlan.price || 0),
    period: activePlan.period || "",
    type: activePlan.type || "",
    customerName,
    phone,
    addressLine1,
    addressLine2,
    city,
    pincode,
    startDate,
    status: "active",
    createdAt: Date.now()
  };

  try {
    await addDoc(collection(db, "customerSubscriptions"), subscriptionData);

    document.getElementById("subscriptionForm")?.reset();
    document.getElementById("subscriptionOverlay")?.classList.remove("open");

    if (window.showToast) {
      window.showToast(`🎉 ${activePlan.name} subscription added!`);
    } else {
      alert("Subscription added successfully!");
    }

    activePlan = null;
  } catch (error) {
    console.error("Error saving subscription:", error);
    alert("Could not save subscription: " + error.message);
  }
}

document.addEventListener("sectionsLoaded", loadSubscriptions);
document.addEventListener("sectionsLoaded", () => {
  const form = document.getElementById("subscriptionForm");
  if (form) {
    form.addEventListener("submit", handleSubscriptionSubmit);
  }
});