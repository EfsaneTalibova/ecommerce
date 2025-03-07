document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const resetFormBtn = document.getElementById("resetForm");
    const imagePreview = document.getElementById("imagePreview");

    // Load active user from localStorage
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    
    if (!activeUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
        return;
    }

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Convert form data to object
        const formData = new FormData(productForm);
        const productData = Object.fromEntries(formData.entries());

        // Assign a unique ID to the product
        productData.id = Date.now();
        productData.userId = activeUser.id; // Assign the product to the logged-in user

        // Get existing products from localStorage
        let products = JSON.parse(localStorage.getItem("products")) || [];

        // Add new product
        products.push(productData);
        localStorage.setItem("products", JSON.stringify(products));

        alert("Product saved successfully!");

        // Redirect to product list page
        window.location.href = "products.html";
    });

    resetFormBtn.addEventListener("click", function () {
        productForm.reset();
        imagePreview.style.display = "none";
    });

    productForm.elements["imageUrl"].addEventListener("input", function () {
        const imageUrl = this.value;
        if (imageUrl) {
            imagePreview.src = imageUrl;
            imagePreview.style.display = "block";
        } else {
            imagePreview.style.display = "none";
        }
    });
});
