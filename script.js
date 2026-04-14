const CART_STORAGE_KEY = "meenakshi_cart";
const PRODUCT_STORAGE_KEY = "meenakshi_products";

const DEFAULT_PRODUCTS = [
{ id: "SILK-001", name: "Kanchipuram Silk Saree", category: "silk", price: 7000, image: "images/silk-saree.svg" },
{ id: "SILK-002", name: "Banarasi Silk Saree", category: "silk", price: 8200, image: "images/silk-saree.svg" },
{ id: "SILK-003", name: "Mysore Silk Saree", category: "silk", price: 6800, image: "images/silk-saree.svg" },
{ id: "SILK-004", name: "Tussar Silk Saree", category: "silk", price: 6400, image: "images/silk-saree.svg" },
{ id: "SILK-005", name: "Paithani Silk Saree", category: "silk", price: 9800, image: "images/silk-saree.svg" },
{ id: "SILK-006", name: "Chanderi Silk Saree", category: "silk", price: 5600, image: "images/silk-saree.svg" },
{ id: "SILK-007", name: "Organza Silk Saree", category: "silk", price: 7200, image: "images/silk-saree.svg" },
{ id: "SILK-008", name: "Soft Silk Saree", category: "silk", price: 4900, image: "images/silk-saree.svg" },
{ id: "SILK-009", name: "Gadwal Silk Saree", category: "silk", price: 7600, image: "images/silk-saree.svg" },
{ id: "SILK-010", name: "Temple Border Silk Saree", category: "silk", price: 8500, image: "images/silk-saree.svg" },
{ id: "COTTON-001", name: "Handloom Cotton Saree", category: "cotton", price: 700, image: "images/cotton-saree.svg" },
{ id: "COTTON-002", name: "Chettinad Cotton Saree", category: "cotton", price: 950, image: "images/cotton-saree.svg" },
{ id: "COTTON-003", name: "Printed Cotton Saree", category: "cotton", price: 1100, image: "images/cotton-saree.svg" },
{ id: "COTTON-004", name: "Ikat Cotton Saree", category: "cotton", price: 1300, image: "images/cotton-saree.svg" },
{ id: "COTTON-005", name: "Kalamkari Cotton Saree", category: "cotton", price: 1500, image: "images/cotton-saree.svg" },
{ id: "COTTON-006", name: "South Cotton Saree", category: "cotton", price: 900, image: "images/cotton-saree.svg" },
{ id: "COTTON-007", name: "Linen Cotton Saree", category: "cotton", price: 1700, image: "images/cotton-saree.svg" },
{ id: "COTTON-008", name: "Bengal Cotton Saree", category: "cotton", price: 1200, image: "images/cotton-saree.svg" },
{ id: "COTTON-009", name: "Daily Wear Cotton Saree", category: "cotton", price: 650, image: "images/cotton-saree.svg" },
{ id: "COTTON-010", name: "Festive Cotton Saree", category: "cotton", price: 1800, image: "images/cotton-saree.svg" },
{ id: "LEHENGA-001", name: "Bridal Lehenga", category: "lehenga", price: 3000, image: "images/lehenga.svg" },
{ id: "LEHENGA-002", name: "Festive Lehenga", category: "lehenga", price: 4200, image: "images/lehenga.svg" },
{ id: "LEHENGA-003", name: "Designer Lehenga", category: "lehenga", price: 5600, image: "images/lehenga.svg" },
{ id: "LEHENGA-004", name: "Embroidered Lehenga", category: "lehenga", price: 6400, image: "images/lehenga.svg" },
{ id: "LEHENGA-005", name: "Mirror Work Lehenga", category: "lehenga", price: 7200, image: "images/lehenga.svg" },
{ id: "LEHENGA-006", name: "Velvet Lehenga", category: "lehenga", price: 8500, image: "images/lehenga.svg" },
{ id: "LEHENGA-007", name: "Party Wear Lehenga", category: "lehenga", price: 3900, image: "images/lehenga.svg" },
{ id: "LEHENGA-008", name: "Pastel Wedding Lehenga", category: "lehenga", price: 7800, image: "images/lehenga.svg" },
{ id: "LEHENGA-009", name: "Zari Work Lehenga", category: "lehenga", price: 6900, image: "images/lehenga.svg" },
{ id: "LEHENGA-010", name: "Reception Lehenga", category: "lehenga", price: 9100, image: "images/lehenga.svg" }
];

const cart = [];
let products = [];
let currentFilter = "all";
let selectedImageData = "";
let activeProductId = "";

function scrollToProducts() {
const productsSection = document.getElementById("products");
if (productsSection) {
productsSection.scrollIntoView({ behavior: "smooth" });
}
}

function scrollProducts(direction) {
const productGrid = document.getElementById("product-grid");
if (!productGrid) return;

const scrollAmount = 260;
const move = direction === "left" ? -scrollAmount : scrollAmount;
productGrid.scrollBy({ left: move, behavior: "smooth" });
}

function readStorage(key) {
try {
return localStorage.getItem(key);
} catch (error) {
return null;
}
}

function writeStorage(key, value) {
try {
localStorage.setItem(key, value);
return true;
} catch (error) {
alert("Storage is full or unavailable in this browser.");
return false;
}
}

function getDefaultProducts() {
return DEFAULT_PRODUCTS.map((product) => ({ ...product }));
}

function normalizeProduct(rawProduct) {
if (!rawProduct || typeof rawProduct !== "object") return null;

const id = String(rawProduct.id || "").trim();
const name = String(rawProduct.name || "").trim();
const category = String(rawProduct.category || "").trim().toLowerCase();
const price = Number(rawProduct.price);
const image = String(rawProduct.image || "").trim();

if (!id || !name || !["silk", "cotton", "lehenga"].includes(category)) return null;
if (!Number.isFinite(price) || price < 0 || !image) return null;

return {
id,
name,
category,
price,
image
};
}

function loadProducts() {
const savedProducts = readStorage(PRODUCT_STORAGE_KEY);
if (!savedProducts) {
products = getDefaultProducts();
return;
}

try {
const parsedProducts = JSON.parse(savedProducts);
if (!Array.isArray(parsedProducts)) {
products = getDefaultProducts();
return;
}

const normalizedProducts = parsedProducts
.map(normalizeProduct)
.filter(Boolean);

products = normalizedProducts.length ? normalizedProducts : getDefaultProducts();
} catch (error) {
products = getDefaultProducts();
}
}

function saveProducts() {
return writeStorage(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

function saveCart() {
writeStorage(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
const savedCart = readStorage(CART_STORAGE_KEY);
if (!savedCart) return;

try {
const parsedCart = JSON.parse(savedCart);
if (!Array.isArray(parsedCart)) return;

cart.length = 0;
parsedCart.forEach((item) => {
if (
item &&
typeof item.id === "string" &&
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

function escapeHtml(value) {
return String(value)
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;")
.replaceAll("'", "&#39;");
}

function createProductCard(product) {
const article = document.createElement("article");
article.className = "product";
article.dataset.category = product.category;
article.tabIndex = 0;
article.setAttribute("role", "button");
article.setAttribute("aria-label", `${product.name} details`);
article.addEventListener("click", () => openProductModal(product.id));
article.addEventListener("keydown", (event) => {
if (event.key === "Enter" || event.key === " ") {
event.preventDefault();
openProductModal(product.id);
}
});
article.innerHTML = `
  <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
  <p class="product-id">${escapeHtml(product.id)}</p>
  <h3>${escapeHtml(product.name)}</h3>
  <p class="product-category">${escapeHtml(product.category)}</p>
  <p class="product-price">₹${product.price}</p>
  <button type="button" onclick="event.stopPropagation(); addToCart('${escapeHtml(product.id)}')">Add to Cart</button>
`;
return article;
}

function openProductModal(productId) {
const product = products.find((item) => item.id === productId);
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("product-modal-image");
const modalId = document.getElementById("product-modal-id");
const modalTitle = document.getElementById("product-modal-title");
const modalCategory = document.getElementById("product-modal-category");
const modalPrice = document.getElementById("product-modal-price");
const modalCartButton = document.getElementById("product-modal-cart-btn");

if (
!product ||
!modal ||
!modalImage ||
!modalId ||
!modalTitle ||
!modalCategory ||
!modalPrice ||
!modalCartButton
) {
return;
}

activeProductId = product.id;
modalImage.src = product.image;
modalImage.alt = product.name;
modalId.textContent = product.id;
modalTitle.textContent = product.name;
modalCategory.textContent = product.category;
modalPrice.textContent = `₹${product.price}`;
modalCartButton.onclick = () => addToCart(product.id);
modal.classList.add("open");
modal.setAttribute("aria-hidden", "false");
document.body.classList.add("modal-open");
}

function closeProductModal() {
const modal = document.getElementById("product-modal");
if (!modal) return;

activeProductId = "";
modal.classList.remove("open");
modal.setAttribute("aria-hidden", "true");
document.body.classList.remove("modal-open");
}

function renderProducts() {
const productGrid = document.getElementById("product-grid");
const emptyState = document.getElementById("product-empty");
if (!productGrid) return;

productGrid.innerHTML = "";
let visibleCount = 0;

products.forEach((product) => {
const shouldShow = currentFilter === "all" || product.category === currentFilter;
if (!shouldShow) return;
visibleCount += 1;
productGrid.appendChild(createProductCard(product));
});

if (emptyState) {
emptyState.style.display = visibleCount ? "none" : "block";
}
}

function addToCart(productId) {
const product = products.find((item) => item.id === productId);
if (!product) return;

const existingItem = cart.find((item) => item.id === productId);

if (existingItem) {
existingItem.quantity += 1;
} else {
cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
}

updateCartUI();
alert(product.name + " added to cart.");
}

function filterProducts(category) {
currentFilter = category;
renderProducts();

const buttons = document.querySelectorAll(".filter-buttons button");
buttons.forEach((button) => {
const buttonCategory = button.dataset.category;
button.classList.toggle("active", buttonCategory === category);
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
const cartCount = document.querySelectorAll("#cart-count");
const cartEmpty = document.getElementById("cart-empty");

let total = 0;
let totalItems = 0;
if (cartItems) {
cartItems.innerHTML = "";
}

cart.forEach((item, index) => {
total += item.price * item.quantity;
totalItems += item.quantity;

if (!cartItems) return;

const listItem = document.createElement("li");
listItem.innerHTML = `
  <span>${escapeHtml(item.name)} - ₹${item.price} x ${item.quantity}</span>
  <div class="qty-controls">
    <button type="button" onclick="changeQuantity(${index}, -1)">-</button>
    <button type="button" onclick="changeQuantity(${index}, 1)">+</button>
  </div>
`;
cartItems.appendChild(listItem);
});

if (cartTotal) {
cartTotal.textContent = total;
}
cartCount.forEach((item) => {
item.textContent = totalItems;
});
if (cartEmpty) {
cartEmpty.style.display = cart.length ? "none" : "block";
}
saveCart();
}

function renderOwnerProducts() {
const ownerProductList = document.getElementById("owner-product-list");
if (!ownerProductList) return;

ownerProductList.innerHTML = "";

products.forEach((product) => {
const listItem = document.createElement("li");
listItem.className = "owner-product-card";
listItem.innerHTML = `
  <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
  <div class="owner-product-copy">
    <p><strong>ID:</strong> ${escapeHtml(product.id)}</p>
    <p><strong>Name:</strong> ${escapeHtml(product.name)}</p>
    <p><strong>Category:</strong> ${escapeHtml(product.category)}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
  </div>
  <button type="button" class="secondary-btn" onclick="deleteProduct('${escapeHtml(product.id)}')">Delete</button>
`;
ownerProductList.appendChild(listItem);
});
}

function deleteProduct(productId) {
const nextProducts = products.filter((product) => product.id !== productId);
if (nextProducts.length === products.length) return;

products = nextProducts;
saveProducts();
renderProducts();
renderOwnerProducts();
}

function resetOwnerForm() {
const form = document.getElementById("owner-product-form");
const preview = document.getElementById("image-preview");
selectedImageData = "";
if (form) {
form.reset();
}
if (preview) {
preview.src = "";
preview.style.display = "none";
}
}

function handleImageSelection(event) {
const [file] = event.target.files || [];
const preview = document.getElementById("image-preview");

if (!file) {
selectedImageData = "";
if (preview) {
preview.src = "";
preview.style.display = "none";
}
return;
}

const reader = new FileReader();
reader.onload = () => {
selectedImageData = typeof reader.result === "string" ? reader.result : "";
if (preview && selectedImageData) {
preview.src = selectedImageData;
preview.style.display = "block";
}
};
reader.readAsDataURL(file);
}

function handleOwnerProductSubmit(event) {
event.preventDefault();

const idInput = document.getElementById("product-id");
const nameInput = document.getElementById("product-name");
const categoryInput = document.getElementById("product-category");
const priceInput = document.getElementById("product-price");

if (!idInput || !nameInput || !categoryInput || !priceInput) return;

const newProduct = normalizeProduct({
id: idInput.value.toUpperCase(),
name: nameInput.value,
category: categoryInput.value,
price: priceInput.value,
image: selectedImageData
});

if (!newProduct) {
alert("Please fill every field and choose a product image.");
return;
}

const duplicateProduct = products.some(
(product) => product.id.toLowerCase() === newProduct.id.toLowerCase()
);
if (duplicateProduct) {
alert("That product ID already exists. Please use a unique ID.");
return;
}

products.unshift(newProduct);
if (!saveProducts()) {
products.shift();
return;
}

renderProducts();
renderOwnerProducts();
resetOwnerForm();
alert("Product saved successfully.");
}

function setupOwnerApp() {
const ownerForm = document.getElementById("owner-product-form");
const imageInput = document.getElementById("product-image");
const resetButton = document.getElementById("reset-products");

if (ownerForm) {
ownerForm.addEventListener("submit", handleOwnerProductSubmit);
}
if (imageInput) {
imageInput.addEventListener("change", handleImageSelection);
}
if (resetButton) {
resetButton.addEventListener("click", () => {
products = getDefaultProducts();
saveProducts();
renderProducts();
renderOwnerProducts();
alert("Product catalog reset to default items.");
});
}

renderOwnerProducts();
}

function setupProductModal() {
document.addEventListener("keydown", (event) => {
if (event.key === "Escape" && activeProductId) {
closeProductModal();
}
});
}

document.addEventListener("DOMContentLoaded", () => {
loadProducts();
loadCart();
renderProducts();
updateCartUI();
setupOwnerApp();
setupProductModal();
});
