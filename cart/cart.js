document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function loadCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>`;
            subtotalElement.textContent = "0.00";
            totalElement.textContent = "0.00";
            return;
        }

        cart.forEach((product, index) => {
            const productSubtotal = parseFloat(product.price) * product.count;
            subtotal += productSubtotal;

            const row = `
                <tr>
                    <td>
                        <img src="${product.imageUrl}" alt="${product.brand}">
                        ${product.brand} ${product.model}
                    </td>
                    <td>$${parseFloat(product.price).toFixed(2)}</td>
                    <td>
                        <input style="width:30%" type="number" min="1" value="${product.count}" class="form-control quantity-input" data-index="${index}">
                    </td>
                    <td>$${productSubtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `;

            cartItemsContainer.innerHTML += row;
        });

        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".btn-remove").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", function () {
                const index = this.getAttribute("data-index");
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    cart[index].count = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    loadCart();
                }
            });
        });
    }

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Proceeding to checkout...");
        // localStorage.removeItem("cart"); 
        loadCart();
    });

    loadCart();
});
document.getElementById("checkout").addEventListener("click", function () {
    window.location.href = "checkout.html"; // Redirect to checkout page
});
