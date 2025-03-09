document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products.find(p => p.id == productId);

    if (!product) {
        document.body.innerHTML = "<h2 class='text-center mt-5'>Product not found!</h2>";
        return;
    }

    document.getElementById("productImage").src = product.imageUrl;
    document.getElementById("productName").textContent = product.brand + " " + product.model;
    document.getElementById("productPrice").textContent = "$" + product.price;
    document.getElementById("productRating").innerHTML = "⭐ " + product.rating + " (" + Math.floor(Math.random() * 100) + " Reviews)";
    document.getElementById("productDescription").textContent = product.description;

    document.getElementById("addToCartBtn").addEventListener("click", function () {
        addToCart(product);
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
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
        alert("Product added to cart!");
    }
    
});
