document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");

    // Load active user from localStorage
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (!activeUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
        return;
    }

    // Retrieve all products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Filter products to show only the ones that belong to the logged-in user
    let userProducts = products.filter(product => product.userId === activeUser.id);

    function loadUserProducts() {
        productList.innerHTML = "";

        if (userProducts.length === 0) {
            productList.innerHTML = `<tr><td colspan="8" class="text-center">No products found.</td></tr>`;
            return;
        }

        userProducts.forEach((product, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.brand}</td>
                    <td>${product.model}</td>
                    <td>${product.category}</td>
                    <td><img src="${product.imageUrl}" class="img-thumbnail" style="width: 80px;"></td>
                    <td>${product.price} $</td>
                    <td>${product.rating}/5</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
            productList.innerHTML += row;
        });
    }

    // Delete Product Function
    window.deleteProduct = function (id) {
        if (!confirm("Are you sure you want to delete this product?")) return;

        // Remove from products array
        products = products.filter(product => product.id !== id);

        // Update localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Reload user's products
        userProducts = products.filter(product => product.userId === activeUser.id);
        loadUserProducts();
    };

    loadUserProducts();
});


document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const editProductForm = document.getElementById("editProductForm");

    // Modal Elements
    const editProductId = document.getElementById("editProductId");
    const editBrand = document.getElementById("editBrand");
    const editModel = document.getElementById("editModel");
    const editCategory = document.getElementById("editCategory");
    const editDescription = document.getElementById("editDescription");
    const editPrice = document.getElementById("editPrice");
    const editRating = document.getElementById("editRating");
    const editImageUrl = document.getElementById("editImageUrl");
    const editImagePreview = document.getElementById("editImagePreview");

    // Load active user from localStorage
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (!activeUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
        return;
    }

    // Retrieve all products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Filter products to show only the ones that belong to the logged-in user
    let userProducts = products.filter(product => product.userId === activeUser.id);

    function loadUserProducts() {
        productList.innerHTML = "";

        if (userProducts.length === 0) {
            productList.innerHTML = `<tr><td colspan="8" class="text-center">No products found.</td></tr>`;
            return;
        }

        userProducts.forEach((product, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.brand}</td>
                    <td>${product.model}</td>
                    <td>${product.category}</td>
                    <td><img src="${product.imageUrl}" class="img-thumbnail" style="width: 80px;"></td>
                    <td>${product.price} $</td>
                    <td>${product.rating}/5</td>
                    <td>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editProductModal" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
            productList.innerHTML += row;
        });
    }

    // Edit Product Function
    window.editProduct = function (id) {
        const product = products.find(p => p.id === id);

        if (!product) return;

        // Fill the edit form with product details
        editProductId.value = product.id;
        editBrand.value = product.brand;
        editModel.value = product.model;
        editCategory.value = product.category;
        editDescription.value = product.description;
        editPrice.value = product.price;
        editRating.value = product.rating;
        editImageUrl.value = product.imageUrl;

        // Show image preview
        if (product.imageUrl) {
            editImagePreview.src = product.imageUrl;
            editImagePreview.style.display = "block";
        } else {
            editImagePreview.style.display = "none";
        }
    };

   // Handle form submission for updating a product
editProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productId = parseInt(editProductId.value);
    const updatedProduct = {
        id: productId,
        userId: activeUser.id,
        brand: editBrand.value,
        model: editModel.value,
        category: editCategory.value,
        description: editDescription.value,
        price: editPrice.value,
        rating: editRating.value,
        imageUrl: editImageUrl.value,
    };

    // Find product index and update it
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));

        // Reload user products
        userProducts = products.filter(p => p.userId === activeUser.id);
        loadUserProducts();

        // Close modal correctly
        const editModalElement = document.getElementById("editProductModal");
        const editModal = bootstrap.Modal.getInstance(editModalElement);
        if (editModal) {
            editModal.hide();
        }
    }
});

    // Delete Product Function
    window.deleteProduct = function (id) {
        if (!confirm("Are you sure you want to delete this product?")) return;

        // Remove from products array
        products = products.filter(product => product.id !== id);

        // Update localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Reload user's products
        userProducts = products.filter(product => product.userId === activeUser.id);
        loadUserProducts();
    };

    loadUserProducts();
});




editProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productId = parseInt(editProductId.value);
    const updatedProduct = {
        id: productId,
        userId: activeUser.id,
        brand: editBrand.value,
        model: editModel.value,
        category: editCategory.value,
        description: editDescription.value,
        price: editPrice.value,
        rating: editRating.value,
        imageUrl: editImageUrl.value,
    };

    // Find product index and update it
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));

        // Reload user products
        userProducts = products.filter(p => p.userId === activeUser.id);
        loadUserProducts();

        // Close modal after saving
        const editModalElement = document.getElementById("editProductModal");
        const editModal = bootstrap.Modal.getInstance(editModalElement);
        editModal.hide();
    }
});
