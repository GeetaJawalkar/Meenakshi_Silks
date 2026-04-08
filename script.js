function scrollToProducts() {
document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function buyNow(productName) {
alert("You selected: " + productName + "\nAdd your payment link here.");
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
