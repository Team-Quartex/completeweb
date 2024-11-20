document.getElementById("marketplace-btn").addEventListener("click", () => {
  document.getElementById("marketplace").style.display = "block";
  document.getElementById("saved-post-container").style.display = "none";
  document.getElementById("post-container").style.display = "none";

  // load Category
  loadCategory()
  // load products
  loadProducts()
});

async function loadCategory() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      "http://localhost:8000/api/products/category",
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const productsCategory = await response.json(); // Assuming the API returns JSON
    console.log(productsCategory);

    const categoryContainer = document.getElementById('image-scroll-horizontal');
    categoryContainer.innerHTML = '';
    
    productsCategory.forEach((category,index) => {
        const catgeoryElement  = document.createElement("div");
        catgeoryElement.classList.add("image-box")
        catgeoryElement.innerHTML = `
            <a href="#">
                  <img src="http://127.0.0.1:8000/uploads/${category.image}" alt="Item ${index}">
            </a>  
        `
        categoryContainer.appendChild(catgeoryElement);
    });
    
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}


async function loadProducts() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          "http://localhost:8000/api/products/viewall",
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const products = await response.json(); // Assuming the API returns JSON
        console.log(products);
    
        const marketplace = document.getElementById('marketplace-grid');
        marketplace.innerHTML = '';
        
        products.forEach((product,index) => {
            const procductItem  = document.createElement("div");
            procductItem.classList.add("marketplace-item")
            procductItem.innerHTML = `
                <div class="item-container">
                    <div class="item-image">
                        <a href="#">
                            <img src="http://127.0.0.1:8000/uploads/test1.png" alt="Handmade Wooden Bowl">
                        </a>    
                    </div>
                    <div class="item-details">
                        <h3>${product.name}</h3>

                        <div class="rating" data-rating="3">
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                        </div> <br>
                        <p>
                            ${product.description}
                        </p>
                        
                        <button class="for-rent-btn">For Rent</button>
                        <div class="favorite-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    
                    </div>
            `
            marketplace.appendChild(procductItem);
        });
        
      } catch (error) {
        console.error("Error loading posts:", error);
      }
}