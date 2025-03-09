document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkout-form");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function calculateTotal() {
        let subtotal = cart.reduce((sum, product) => sum + (parseFloat(product.price) * product.count), 0);
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);
    }

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!checkoutForm.checkValidity()) {
            event.stopPropagation();
            checkoutForm.classList.add("was-validated");
            return;
        }

        alert("Order placed successfully!");

        // Clear cart
        localStorage.removeItem("cart");

        // Redirect to shop page
        window.location.href = "shop.html";
    });

    calculateTotal();
});
