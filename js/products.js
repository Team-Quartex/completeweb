import { showModel } from './renderproduct.js';

let products = []; // Global product array

// Event listener for marketplace button
document.getElementById("marketplace-btn").addEventListener("click", () => {
    document.getElementById("marketplace").style.display = "block";
    document.getElementById("saved-post-container").style.display = "none";
    document.getElementById("post-container").style.display = "none";
    document.getElementById('search').style.display="none";

    loadCategory(); // Load categories
    loadProducts(); // Load products
});

// Load categories from API and render them
async function loadCategory() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };

    try {
        const response = await fetch("http://localhost:8000/api/products/category", requestOptions);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const productsCategory = await response.json();
        renderCategories(productsCategory);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Render categories in the category container
function renderCategories(categories) {
    const categoryContainer = document.getElementById('image-scroll-horizontal');
    categoryContainer.innerHTML = '';

    categories.forEach((category, index) => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("image-box");
        categoryElement.setAttribute("data-category-id", category.categoryId); // Add category ID
        categoryElement.innerHTML = `
            <a href="#">
                <img src="http://127.0.0.1:8000/uploads/${category.image}" alt="Category ${index}">
            </a>
        `;
        categoryContainer.appendChild(categoryElement);

        // Add click event listener for category filtering
        categoryElement.addEventListener("click", () => {
            filterProductsByCategory(category.categoryId);
        });
    });
}

// Load products from API and populate the global products array
async function loadProducts() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };

    try {
        const response = await fetch("http://localhost:8000/api/products/viewall", requestOptions);
        if (!response.ok) throw new Error("Failed to fetch products");

        products.length = 0;
        products.push(...await response.json()); // Populate the global products array
        renderProducts(products); // Render all products initially
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Filter products by category ID and render them
function filterProductsByCategory(categoryId) {
    const filteredProducts = products.filter(product => product.categoryId === categoryId);
    renderProducts(filteredProducts);
}

// Render products in the marketplace
function renderProducts(productsToRender) {
    const marketplace = document.getElementById('marketplace-grid');
    marketplace.innerHTML = '';

    productsToRender.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("marketplace-item");
        productItem.innerHTML = `
            <div class="item-container" data-index=${product.productId}>
                <div class="item-image">
                    <a href="#">
                        <img src="http://127.0.0.1:8000/uploads/${product.images[0]}" alt="Product ${index}">
                    </a>    
                </div>
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <div class="rating" data-rating="${product.avgReviewRate}">
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                        <i class="fas fa-star star"></i>
                    </div><br>
                    <p>${product.description}</p>
                    <div class="button-icon-container">
                        <button class="for-rent-btn">For Rent</button>
                        <div class="favorite-icon" data-productid="${product.productId}">
                            <i data-productid="${product.productId}" class="fas fa-heart ${product.isFavourite === 'Yes' ? 'active' : ''}"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        marketplace.appendChild(productItem);
    });

    updateStarRatings();
    setupFavoriteListeners();
    setupProductClickListeners();
}

// Update star ratings dynamically
function updateStarRatings() {
    document.querySelectorAll('.rating').forEach((ratingContainer) => {
        const ratingValue = parseInt(ratingContainer.getAttribute('data-rating'));
        ratingContainer.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star', 'star');
            star.classList.add(i <= ratingValue ? 'active' : 'inactive');
            ratingContainer.appendChild(star);
        }
    });
}

// Set up event listeners for favorite icons
function setupFavoriteListeners() {
    document.querySelectorAll('.favorite-icon .fas.fa-heart').forEach((icon) => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = icon.dataset.productid;
            icon.classList.toggle('active');
            const isFavorite = icon.classList.contains('active');
            isFavorite ? addToFavorite(productId) : removeFromFavorite(productId);
            console.log(`Item ${isFavorite ? 'added to' : 'removed from'} favorites: ${productId}`);
        });
    });
}

// Set up click listeners for product items
function setupProductClickListeners() {
    document.querySelectorAll(".item-container").forEach((productElement) => {
        productElement.addEventListener('click', () => {
            const productId = productElement.dataset.index;
            showModel(products, productId); // Call the imported showModel function
        });
    });
}

// Add a product to favorites
function addToFavorite(productId) {
    fetch("http://localhost:8000/api/products/addfavourite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productid: productId }),
    });
}

// Remove a product from favorites
function removeFromFavorite(productId) {
    fetch("http://localhost:8000/api/products/removeFavourite", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productid: productId }),
    });
}

document.getElementById('search-bar-item').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase(); 
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) 
    );
    renderProducts(filteredProducts); 
});
