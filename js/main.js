// /* ═══════════════════════════════════════════════
//    TIFFMON — main.js
//    Shared JS: cart, toast, modal, scroll effects
// ═══════════════════════════════════════════════ */

// // ── CART STATE ────────────────────────────────
// let cart = JSON.parse(sessionStorage.getItem('tiffmon_cart') || '[]');

// function saveCart() {
//   sessionStorage.setItem('tiffmon_cart', JSON.stringify(cart));
// }

// function addToCart(name, emoji, price) {
//   const ex = cart.find(i => i.name === name);
//   if (ex) ex.qty++;
//   else cart.push({ name, emoji, price, qty: 1 });
//   saveCart();
//   renderCart();
//   showToast('🛒 ' + name + ' added!');
// }

// function changeQty(i, d) {
//   cart[i].qty += d;
//   if (cart[i].qty <= 0) cart.splice(i, 1);
//   saveCart();
//   renderCart();
// }

// function renderCart() {
//   const body = document.getElementById('cartBody');
//   const foot = document.getElementById('cartFoot');
//   const counter = document.getElementById('cartCount');
//   if (!body) return;

//   const totalQty = cart.reduce((a, b) => a + b.qty, 0);
//   if (counter) counter.textContent = totalQty;

//   if (cart.length === 0) {
//     body.innerHTML = `
//       <div class="cart-empty">
//         <div class="empty-icon">🛒</div>
//         <p>Your cart is empty.<br>Add some delicious meals!</p>
//       </div>
//     `;
//     if (foot) foot.style.display = 'none';
//     return;
//   }

//   if (foot) foot.style.display = 'block';

//   body.innerHTML = cart.map((item, i) => `
//     <div class="cart-item">
//       <div class="cart-item-emoji">${item.emoji}</div>

//       <div class="cart-item-info">
//         <div class="cart-item-name">${item.name}</div>
//         <div class="cart-item-price">
//           ₹${item.price} × ${item.qty} = ₹${item.price * item.qty}
//         </div>
//       </div>

//       <div class="cart-qty">
//         <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
//         <span class="qty-num">${item.qty}</span>
//         <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
//       </div>
//     </div>
//   `).join('');

//   const grandTotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
//   const totalEl = document.getElementById('cartTotal');
//   if (totalEl) totalEl.textContent = '₹' + grandTotal;
// }

// function toggleCart() {
//   document.getElementById('cartSidebar').classList.toggle('open');
//   document.getElementById('cartOverlay').classList.toggle('open');
// }

// // ── TOAST ─────────────────────────────────────
// let toastTimer;
// function showToast(msg) {
//   const toast = document.getElementById('toast');
//   document.getElementById('toastMsg').textContent = msg;
//   toast.classList.add('show');
//   clearTimeout(toastTimer);
//   toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
// }

// // ── MODAL ─────────────────────────────────────
// const allIngredients = {
//   1: ['4 Roti', '1 Sabzi', 'Plain Rice (small)', 'Dal Soup', 'Pickle'],
//   2: ['4 Roti', '2 Sabzi', 'Dal', 'Jeera Rice', 'Salad'],
//   3: ['4 Roti', 'Paneer (or Mushroom)', 'Mix Veg', 'Dal', 'Rice', 'Dessert', 'Salad'],
//   4: ['2 Roti', 'Chicken Gravy', 'Steamed Rice', 'Raita', 'Salad'],
//   5: ['3 Aloo Parathas', 'Dahi (Curd)', 'Butter', 'Achaar'],
//   6: ['Yellow Dal Tadka', 'Jeera Rice', '2 Roti', 'Salad', 'Pickle'],
//   7: ['Buttermilk', 'Cumin & Spices', 'Fresh Coriander', 'Rock Salt'],
//   8: ['Soft Gulab Jamun', 'Rose Sugar Syrup', 'Pistachio Garnish', 'Elaichi Flavour'],
// };

// const mealNames = {
//   1: 'Mini Meal',
//   2: 'Regular Meal',
//   3: 'Deluxe Meal',
//   4: 'Chicken Curry Thali',
//   5: 'Aloo Paratha Combo',
//   6: 'Dal Tadka Thali',
//   7: 'Masala Chaas',
//   8: 'Gulab Jamun (2 pcs)'
// };

// function viewMore(id) {
//   document.getElementById('modalTitle').textContent = mealNames[id] + ' — Full Ingredients';
//   document.getElementById('modalItems').innerHTML = (allIngredients[id] || []).map(item => `
//     <li>
//       <div style="width:20px;height:20px;border-radius:50%;background:var(--green-pale);border:1.5px solid var(--green-light);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--green);flex-shrink:0;">✓</div>
//       ${item}
//     </li>
//   `).join('');
//   document.getElementById('modalOverlay').classList.add('open');
// }

// function closeModal(e) {
//   if (e.target === document.getElementById('modalOverlay'))
//     document.getElementById('modalOverlay').classList.remove('open');
// }

// // ── MENU FILTER (menu.html only) ──────────────
// function filterCat(btn, cat) {
//   document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
//   btn.classList.add('active');

//   let count = 0;
//   document.querySelectorAll('.mc').forEach(card => {
//     const show = cat === 'all' || card.dataset.cat === cat;
//     card.style.opacity = show ? '1' : '0';
//     card.style.transform = show ? 'translateY(0)' : 'translateY(20px) scale(0.96)';
//     card.style.pointerEvents = show ? 'all' : 'none';
//     card.style.transition = 'opacity 0.3s, transform 0.3s';
//     if (show) count++;
//   });

//   const labels = {
//     all: 'All Meals',
//     combo: 'Combos',
//     main: 'Main Meals',
//     paratha: 'Paratha Combos',
//     sides: 'Sides',
//     dessert: 'Desserts'
//   };

//   document.getElementById('sectionTitle').textContent = labels[cat] || 'All Meals';
//   document.getElementById('sectionCount').textContent = count + ' meals available';
// }

// function searchMeals(q) {
//   let count = 0;
//   document.querySelectorAll('.mc').forEach(card => {
//     const show = card.dataset.name.toLowerCase().includes(q.toLowerCase());
//     card.style.opacity = show ? '1' : '0';
//     card.style.transform = show ? 'translateY(0)' : 'translateY(16px)';
//     card.style.pointerEvents = show ? 'all' : 'none';
//     if (show) count++;
//   });

//   document.getElementById('sectionTitle').textContent = q ? `Results for "${q}"` : 'All Meals';
//   document.getElementById('sectionCount').textContent = count + ' meals found';
// }

// // ── SCROLL EFFECTS ────────────────────────────
// window.addEventListener('scroll', () => {
//   const nav = document.getElementById('navbar');
//   if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
// });

// // Scroll-reveal on cards
// document.addEventListener('sectionsLoaded', () => {
//   renderCart();

//   const revealTargets = document.querySelectorAll(
//     '.step-card, .testi-card, .why-item, .plan-card, .mc'
//   );

//   const obs = new IntersectionObserver(entries => {
//     entries.forEach(e => {
//       if (e.isIntersecting) {
//         e.target.style.opacity = '1';
//         e.target.style.transform = 'translateY(0)';
//       }
//     });
//   }, { threshold: 0.07 });

//   revealTargets.forEach((el, i) => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(32px)';
//     el.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
//     obs.observe(el);
//   });

//   const path = window.location.pathname.split('/').pop();
//   document.querySelectorAll('nav ul li a').forEach(a => {
//     if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
//       a.classList.add('active');
//     }
//   });
// });





import { db } from "./firebase-config.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/* ═══════════════════════════════════════════════
   TIFFMON — main.js
═══════════════════════════════════════════════ */

// ── CART STATE ────────────────────────────────
let cart = JSON.parse(sessionStorage.getItem("tiffmon_cart") || "[]");

function saveCart() {
  sessionStorage.setItem("tiffmon_cart", JSON.stringify(cart));
}

window.addToCart = function(name, emoji, price) {
  const ex = cart.find(i => i.name === name);
  if (ex) ex.qty++;
  else cart.push({ name, emoji, price, qty: 1 });

  saveCart();
  renderCart();
  showToast("🛒 " + name + " added!");
};

window.changeQty = function(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  saveCart();
  renderCart();
};

function renderCart() {
  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  const counter = document.getElementById("cartCount");

  if (!body) return;

  const totalQty = cart.reduce((a, b) => a + b.qty, 0);
  if (counter) counter.textContent = totalQty;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty.<br>Add some delicious meals!</p>
      </div>
    `;
    if (foot) foot.style.display = "none";
    return;
  }

  if (foot) foot.style.display = "block";

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>

      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
      </div>

      <div class="cart-qty">
        <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
      </div>
    </div>
  `).join("");

  const grandTotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = "₹" + grandTotal;
}

window.toggleCart = function() {
  document.getElementById("cartSidebar")?.classList.toggle("open");
  document.getElementById("cartOverlay")?.classList.toggle("open");
};

// ── TOAST ─────────────────────────────────────
let toastTimer;

window.showToast = function(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
};

// ── MODAL ─────────────────────────────────────
const allIngredients = {
  1: ["4 Roti", "1 Sabzi", "Plain Rice (small)", "Dal Soup", "Pickle"],
  2: ["4 Roti", "2 Sabzi", "Dal", "Jeera Rice", "Salad"],
  3: ["4 Roti", "Paneer (or Mushroom)", "Mix Veg", "Dal", "Rice", "Dessert", "Salad"],
  4: ["2 Roti", "Chicken Gravy", "Steamed Rice", "Raita", "Salad"],
  5: ["3 Aloo Parathas", "Dahi (Curd)", "Butter", "Achaar"],
  6: ["Yellow Dal Tadka", "Jeera Rice", "2 Roti", "Salad", "Pickle"],
  7: ["Buttermilk", "Cumin & Spices", "Fresh Coriander", "Rock Salt"],
  8: ["Soft Gulab Jamun", "Rose Sugar Syrup", "Pistachio Garnish", "Elaichi Flavour"],
};

const mealNames = {
  1: "Mini Meal",
  2: "Regular Meal",
  3: "Deluxe Meal",
  4: "Chicken Curry Thali",
  5: "Aloo Paratha Combo",
  6: "Dal Tadka Thali",
  7: "Masala Chaas",
  8: "Gulab Jamun (2 pcs)",
};

window.viewMore = function(id) {
  const modalTitle = document.getElementById("modalTitle");
  const modalItems = document.getElementById("modalItems");
  const modalOverlay = document.getElementById("modalOverlay");

  if (!modalTitle || !modalItems || !modalOverlay) return;

  modalTitle.textContent = mealNames[id] + " — Full Ingredients";
  modalItems.innerHTML = (allIngredients[id] || []).map(item => `
    <li>
      <div style="width:20px;height:20px;border-radius:50%;background:var(--green-pale);border:1.5px solid var(--green-light);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--green);flex-shrink:0;">✓</div>
      ${item}
    </li>
  `).join("");

  modalOverlay.classList.add("open");
};

window.closeModal = function(e) {
  if (e.target === document.getElementById("modalOverlay")) {
    document.getElementById("modalOverlay")?.classList.remove("open");
  }
};

// ── MENU FILTER ───────────────────────────────
window.filterCat = function(btn, cat) {
  document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");

  let count = 0;

  document.querySelectorAll(".mc").forEach(card => {
    const show = cat === "all" || card.dataset.cat === cat;
    card.style.opacity = show ? "1" : "0";
    card.style.transform = show ? "translateY(0)" : "translateY(20px) scale(0.96)";
    card.style.pointerEvents = show ? "all" : "none";
    card.style.transition = "opacity 0.3s, transform 0.3s";
    if (show) count++;
  });

  const labels = {
    all: "All Meals",
    combo: "Combos",
    main: "Main Meals",
    paratha: "Paratha Combos",
    sides: "Sides",
    dessert: "Desserts",
  };

  const sectionTitle = document.getElementById("sectionTitle");
  const sectionCount = document.getElementById("sectionCount");

  if (sectionTitle) sectionTitle.textContent = labels[cat] || "All Meals";
  if (sectionCount) sectionCount.textContent = count + " meals available";
};

window.searchMeals = function(q) {
  let count = 0;

  document.querySelectorAll(".mc").forEach(card => {
    const show = (card.dataset.name || "").toLowerCase().includes(q.toLowerCase());
    card.style.opacity = show ? "1" : "0";
    card.style.transform = show ? "translateY(0)" : "translateY(16px)";
    card.style.pointerEvents = show ? "all" : "none";
    if (show) count++;
  });

  const sectionTitle = document.getElementById("sectionTitle");
  const sectionCount = document.getElementById("sectionCount");

  if (sectionTitle) sectionTitle.textContent = q ? `Results for "${q}"` : "All Meals";
  if (sectionCount) sectionCount.textContent = count + " meals found";
};

// ── CHECKOUT ──────────────────────────────────
window.openCheckout = function() {
  if (cart.length === 0) {
    showToast("Cart is empty");
    return;
  }
  document.getElementById("checkoutOverlay")?.classList.add("open");
};

window.closeCheckout = function(e) {
  if (e.target === document.getElementById("checkoutOverlay")) {
    document.getElementById("checkoutOverlay")?.classList.remove("open");
  }
};

function buildWhatsAppMessage(order) {
  const itemsText = order.items
    .map(item => `- ${item.name} x${item.qty} = ₹${item.price * item.qty}`)
    .join("%0A");

  const addressText =
    `${order.addressLine1}%0A` +
    `${order.addressLine2 ? order.addressLine2 + "%0A" : ""}` +
    `${order.city} - ${order.pincode}`;

  return (
    `New Tiffmon Order%0A%0A` +
    `Customer: ${order.customerName}%0A` +
    `Phone: ${order.phone}%0A%0A` +
    `Address:%0A${addressText}%0A%0A` +
    `Items:%0A${itemsText}%0A%0A` +
    `Total: ₹${order.total}%0A` +
    `Status: Pending`
  );
}

async function placeOrder(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Cart is empty");
    return;
  }

  const customerName = document.getElementById("customerName")?.value.trim();
  const phone = document.getElementById("customerPhone")?.value.trim();
  const addressLine1 = document.getElementById("addressLine1")?.value.trim();
  const addressLine2 = document.getElementById("addressLine2")?.value.trim();
  const city = document.getElementById("city")?.value.trim();
  const pincode = document.getElementById("pincode")?.value.trim();

  if (!customerName || !phone || !addressLine1 || !city || !pincode) {
    alert("Please fill all required fields.");
    return;
  }

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  const order = {
    customerName,
    phone,
    addressLine1,
    addressLine2,
    city,
    pincode,
    items: cart,
    total,
    status: "pending",
    createdAt: Date.now(),
  };

  try {
    await addDoc(collection(db, "orders"), order);

    // change this number to your staff WhatsApp number
    const staffPhone = "9350148731";
    const message = buildWhatsAppMessage(order);
    window.open(`https://wa.me/${staffPhone}?text=${message}`, "_blank");

    cart = [];
    saveCart();
    renderCart();

    document.getElementById("checkoutForm")?.reset();
    document.getElementById("checkoutOverlay")?.classList.remove("open");
    document.getElementById("cartSidebar")?.classList.remove("open");
    document.getElementById("cartOverlay")?.classList.remove("open");

    showToast("🎉 Order placed successfully!");
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Could not place order: " + error.message);
  }
}

// ── SCROLL EFFECTS ────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const revealTargets = document.querySelectorAll(
    ".step-card, .testi-card, .why-item, .plan-card, .mc"
  );

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.07 });

  revealTargets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
    obs.observe(el);
  });

  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav ul li a").forEach(a => {
    if (
      a.getAttribute("href") === path ||
      (path === "" && a.getAttribute("href") === "index.html")
    ) {
      a.classList.add("active");
    }
  });

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", placeOrder);
  }
});