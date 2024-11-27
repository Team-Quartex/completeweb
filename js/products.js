import {showModel} from './renderproduct.js'
document.getElementById("marketplace-btn").addEventListener("click", () => {
  document.getElementById("marketplace").style.display = "block";
  document.getElementById("saved-post-container").style.display = "none";
  document.getElementById("post-container").style.display = "none";

  // load Category
  loadCategory()
  // load products
  loadProducts()
});
var products = [];
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
        
        products.length = 0;
        products = await response.json(); // Assuming the API returns JSON
        console.log(products);
    
        const marketplace = document.getElementById('marketplace-grid');
        marketplace.innerHTML = '';
        
        products.forEach((product,index) => {
            const procductItem  = document.createElement("div");
            procductItem.classList.add("marketplace-item")
            procductItem.innerHTML = `
                <div class="item-container" data-index=${product.productId}>
                    <div class="item-image">
                        <a href="#">
                            <img src="http://127.0.0.1:8000/uploads/${product.images[0]}" alt="Handmade Wooden Bowl">
                        </a>    
                    </div>
                    <div class="item-details">
                        <h3>${product.name}</h3>

                        <div class="rating" data-rating="${product.avgReviewRate}">
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                            <i class="fas fa-star star" ></i>
                        </div> <br>
                        <p>
                            ${product.description}
                        </p>
                        <div class="button-icon-container">
                          <button class="for-rent-btn">For Rent</button>
                          <div class="favorite-icon" data-productid="${product.productId}">
                              <i data-productid="${product.productId}" class="fas fa-heart ${product.isFavourite==='Yes'? 'active':''}"></i>
                          </div>
                        </div>
                    </div>
                    
                    </div>
            `
            marketplace.appendChild(procductItem);
        });

        document.querySelectorAll('.rating').forEach((ratingContainer) => {
          const ratingValue = parseInt(ratingContainer.getAttribute('data-rating')); // Get the rating value (1 to 5)
          
          // Clear existing stars
          ratingContainer.innerHTML = '';

          // Loop through 5 stars
          for (let i = 1; i <= 5; i++) {
              const star = document.createElement('i');
              star.classList.add('fas', 'fa-star', 'star'); // Add the star icon class

              if (i <= ratingValue) {
                  star.classList.add('active'); // Add 'active' class for yellow stars
              } else {
                  star.classList.add('inactive'); // Add 'inactive' class for gray stars
              }

              ratingContainer.appendChild(star);
          }
      });
      document.querySelectorAll('.favorite-icon .fas.fa-heart').forEach((icon) => {
        icon.addEventListener('click', () => {
            const produtID = icon.dataset.productid;
            icon.classList.toggle('active');
            const isFavorite = icon.classList.contains('active');
            isFavorite? addtofavourite(produtID): removetofavourite(produtID);
            console.log(`Item ${isFavorite ? 'added to' : 'removed from'} ${produtID} favorites`);
        });
      }); 
        
      } catch (error) {
        console.error("Error loading posts:", error);
      }

      document.querySelectorAll(".item-container").forEach((productElement)=>{
        productElement.addEventListener('click',()=>{
          // console.log("hello")
          // console.log(productElement.dataset.index)
          showModel(products,productElement.dataset.index);
          // itemView.classList.add("model-show")
        });
      })
}
 

function addtofavourite(productid){
  const addfavourite = fetch(
    "http://localhost:8000/api/products/addfavourite",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure you're sending JSON
      },
      credentials: "include",
      body: JSON.stringify({
        productid: productid,
      }),
    }
  );
}

function removetofavourite(productid){
  const addfavourite = fetch(
    "http://localhost:8000/api/products/removeFavourite",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Ensure you're sending JSON
      },
      credentials: "include",
      body: JSON.stringify({
        productid: productid,
      }),
    }
  );
}

