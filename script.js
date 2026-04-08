function scrollToProducts() {
document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

const cart = [];
const CART_STORAGE_KEY = "meenakshi_cart";

function saveCart() {
localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
const savedCart = localStorage.getItem(CART_STORAGE_KEY);
if (!savedCart) return;

try {
const parsedCart = JSON.parse(savedCart);
if (!Array.isArray(parsedCart)) return;

cart.length = 0;
parsedCart.forEach((item) => {
if (
item &&
typeof item.name === "string" &&
typeof item.price === "number" &&
typeof item.quantity === "number"
) {
cart.push(item);
}
});
} catch (error) {
localStorage.removeItem(CART_STORAGE_KEY);
}
}

function addToCart(productName, price) {
const existingItem = cart.find((item) => item.name === productName);

if (existingItem) {
existingItem.quantity += 1;
} else {
cart.push({ name: productName, price, quantity: 1 });
}

updateCartUI();
toggleCart(true);
}

function filterProducts(category) {
const products = document.querySelectorAll(".product");
const buttons = document.querySelectorAll(".filter-buttons button");

products.forEach((product) => {
const productCategory = product.dataset.category;
const shouldShow = category === "all" || productCategory === category;
product.style.display = shouldShow ? "block" : "none";
});

buttons.forEach((button) => {
const buttonCategory = button.textContent.trim().toLowerCase();
const isActive =
(category === "all" && buttonCategory === "all") || buttonCategory === category;
button.classList.toggle("active", isActive);
});
}

function changeQuantity(index, delta) {
if (!cart[index]) return;

cart[index].quantity += delta;
if (cart[index].quantity <= 0) {
cart.splice(index, 1);
}

updateCartUI();
}

function clearCart() {
cart.length = 0;
updateCartUI();
}

function toggleCart(forceShow = false) {
const cartSection = document.getElementById("cart");
if (!cartSection) return;

if (forceShow) {
cartSection.classList.remove("hidden");
return;
}

cartSection.classList.toggle("hidden");
}

function checkout() {
if (!cart.length) {
alert("Your cart is empty.");
return;
}
alert("Checkout is frontend-only right now. Add payment/backend next.");
}

function updateCartUI() {
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartEmpty = document.getElementById("cart-empty");

let total = 0;
let totalItems = 0;
cartItems.innerHTML = "";

cart.forEach((item, index) => {
total += item.price * item.quantity;
totalItems += item.quantity;

const listItem = document.createElement("li");
listItem.innerHTML = `
  <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
  <div class="qty-controls">
    <button onclick="changeQuantity(${index}, -1)">-</button>
    <button onclick="changeQuantity(${index}, 1)">+</button>
  </div>
`;
cartItems.appendChild(listItem);
});

cartTotal.textContent = total;
cartCount.textContent = totalItems;
cartEmpty.style.display = cart.length ? "none" : "block";
saveCart();
}

loadCart();
updateCartUI();
