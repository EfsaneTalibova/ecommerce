document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("search");
    const categoryFilters = document.querySelectorAll(".category-filter");
    const ratingFilters = document.querySelectorAll(".rating-filter");
    const sortSelect = document.getElementById("sortProducts");
    const showAllProductsBtn = document.getElementById("showAllProducts");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = [...products];

    function loadProducts() {
        productList.innerHTML = "";

        if (filteredProducts.length === 0) {
            productList.innerHTML = `<p class="text-center">No products found.</p>`;
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-3", "mb-4");

            productCard.innerHTML = `
                <div class="product-card">
                    <img src="${product.imageUrl}" alt="${product.brand}" class="product-image" data-id="${product.id}">
                    <h6 class="product-title" data-id="${product.id}">${product.brand} ${product.model}</h6>
                    <p class="price">${product.price}$</p>
                    <p class="rating">⭐ ${product.rating} (${Math.floor(Math.random() * 100) + 1})</p>
                    <button class="btn-add-to-cart" data-id="${product.id}">Add to cart</button>
                </div>
            `;

            productList.appendChild(productCard);
        });

        // Add click event to navigate to product details page
        document.querySelectorAll(".product-image, .product-title").forEach(item => {
            item.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                window.location.href = `product.html?id=${productId}`;
            });
        });

        // Add event listener for "Add to Cart"
        document.querySelectorAll(".btn-add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let product = products.find(p => p.id == productId);
    
        if (!product) return;
    
        // Check if the product is already in the cart
        let existingProduct = cart.find(item => item.id === product.id);
    
        if (existingProduct) {
            // If product exists, increase count
            existingProduct.count += 1;
        } else {
            // If not, add it with count 1
            cart.push({ ...product, count: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        // alert("Product added to cart!");
    }
    

    loadProducts();
});
