function scrollToProducts() {
document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function buyNow(productName) {
alert("You selected: " + productName + "\nAdd your payment link here.");
}
