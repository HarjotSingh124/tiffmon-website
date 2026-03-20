import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

async function loadMealsFromFirebase() {
  try {
    console.log("menu-firebase.js loaded");

    const menuGrid = document.getElementById("menuGrid");
    const sectionCount = document.getElementById("sectionCount");

    if (!menuGrid) {
      console.error("menuGrid not found");
      return;
    }

    const mealsRef = collection(db, "meals");
    const q = query(mealsRef, where("available", "==", true));
    const snapshot = await getDocs(q);

    console.log("Meals found:", snapshot.size);

    const meals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    menuGrid.innerHTML = "";

    if (meals.length === 0) {
      menuGrid.innerHTML = `
        <div style="color:white;padding:20px;">
          No meals available right now.
        </div>
      `;
      if (sectionCount) sectionCount.textContent = "0 meals available";
      return;
    }

    meals.forEach((meal) => {
      const ingredients = Array.isArray(meal.ingredients)
        ? meal.ingredients
        : [];

      const previewIngredients = ingredients.slice(0, 3);
      const remaining = Math.max(ingredients.length - 3, 0);

      const mealCard = document.createElement("div");
      mealCard.className = "mc veg";
      mealCard.dataset.cat = meal.category || "combo";
      mealCard.dataset.name = meal.name || "";

      mealCard.innerHTML = `
        <div class="mc-img-wrap">${meal.emoji || "🍱"}</div>
        <span class="mc-badge veg">🟢 Available</span>

        <div class="mc-name">${meal.name || "Unnamed Meal"}</div>

        <div class="mc-rating">
          <div class="stars-row">
            <span class="s f">★</span>
            <span class="s f">★</span>
            <span class="s f">★</span>
            <span class="s f">★</span>
            <span class="s h">★</span>
          </div>
          <span class="rating-count">(New)</span>
        </div>

        <ul class="ing-list">
          ${previewIngredients.map(item => `
            <li><div class="chk">✓</div>${item}</li>
          `).join("")}
        </ul>

        <button class="view-more-btn" onclick="viewMealDetails('${meal.id}')">
          ${remaining > 0 ? `View ${remaining} more →` : "View details →"}
        </button>

        <div class="card-divider"></div>

        <div class="card-footer">
          <div class="mc-price">₹${meal.price || 0}</div>
          <button class="add-cart-btn" onclick="addToCart('${meal.name}', '${meal.emoji || "🍱"}', ${meal.price || 0})">
            + Add to Cart
          </button>
        </div>
      `;

      menuGrid.appendChild(mealCard);
    });

    if (sectionCount) {
      sectionCount.textContent = `${meals.length} meals available`;
    }

    window.firebaseMeals = meals;
  } catch (error) {
    console.error("Error loading meals:", error);
    alert("Could not load meals from Firebase: " + error.message);
  }
}

window.viewMealDetails = function(mealId) {
  const meals = window.firebaseMeals || [];
  const meal = meals.find(item => item.id === mealId);

  if (!meal) return;

  const modalTitle = document.getElementById("modalTitle");
  const modalItems = document.getElementById("modalItems");
  const modalOverlay = document.getElementById("modalOverlay");

  if (!modalTitle || !modalItems || !modalOverlay) return;

  modalTitle.textContent = `${meal.name} — Full Ingredients`;

  modalItems.innerHTML = (meal.ingredients || []).map(item => `
    <li>
      <div style="width:20px;height:20px;border-radius:50%;background:var(--green-pale);border:1.5px solid var(--green-light);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--green);flex-shrink:0;">✓</div>
      ${item}
    </li>
  `).join("");

  modalOverlay.classList.add("open");
};

document.addEventListener("DOMContentLoaded", () => {
  loadMealsFromFirebase();
});