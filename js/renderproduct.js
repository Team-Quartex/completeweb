const itemView = document.getElementById("modal-overlay");
var productQty = 1;
export async function showModel(product, id) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/products/view?id=${id}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const productDetails = await response.json(); // Assuming the API returns JSON
    console.log(productDetails);
    const productDetail = productDetails[0];

    // images

    var imageContainer = "";
    productDetail.images.forEach((element) => {
      console.log(element);
      const image = `<img src="http://127.0.0.1:8000/uploads/${element}" alt="Product image">`;
      imageContainer += image;
    });
    const conprice = productDetail.price;
    const productContainer = document.getElementById("modal-overlay");
    const productElement = `<div class="modal-container">
          <!-- Back Button -->
          <button class="back-button" id="back-button" >
              <i class="fas fa-chevron-left"></i>
          </button>
    
          <div class="content-grid">
              
              <div class="image-section">
                  <div class="carousel">
                      <button class="carousel-button prev">
                          <i class="fas fa-chevron-left"></i>
                      </button>
                      <div class="carousel-container" id="carousel-container">
                          ${imageContainer}
                      </div>
                      <button class="carousel-button next">
                          <i class="fas fa-chevron-right"></i>
                      </button>
                </div>
                <div class="seller">
                  <div class="seller-container">
                      <!-- Other content above -->
          
                      <!-- Seller's Information Section -->
                      <div class="seller-info">
                         <div class = "seller-profile-details">
                          <img src="http://127.0.0.1:8000/uploads/${productDetail.profile}" alt="Seller's Avatar" class="seller-avatar" id="seller-avatar">
                          <div class="seller-details">
                              <h3 class="seller-name" >${
                                productDetail.sellername
                              }</h3>
                              <h3 class="verified-seller">Verified Seller</h3>
                              <p class="contact-details">Contact Details <br><i>${
                                productDetail.email
                              }</i></p>
                             
                          </div>
                         </div> 
                      </div>
          
                      <!-- Other content below -->
                  </div>
              </div>
                 
              </div>
              
    
              <div class="details-section">
                
                  <div class="item-header">
                      <h1>${productDetail.name}</h1>
                      <div class="rating">
                          <div class="stars" data-rating="${
                            productDetail.avgReviewRate
                          }">
                              <i class="fas fa-star star" ></i>
                              <i class="fas fa-star star" ></i>
                              <i class="fas fa-star star" ></i>
                              <i class="fas fa-star star" ></i>
                              <i class="fas fa-star star" ></i>
                          </div>
                          <span class="review-count">${
                            productDetail.totalReviews
                          } Reviews</span>
                      </div>
                  </div>
    
                  <div class="item-content">
                      <div class="description">
                          <p>${productDetail.description}</p>
                      </div>
    
                      <div class="date-selection">
                          <div class="date-input">
                              <input type="date" id="start-date" required>
                              <label>Start Date</label>
                          </div>
                          <div class="date-input">
                             
                              <input type="date" id="end-date" required>
                              <label>End Date</label>
                          </div>
                      </div>
    
                      <button class="check-availability" id="check-button">Check Availability</button>
                      <p class="availability-message" id="availability-message">Not available in selected days</p>
    
                      <div class="price-section">
                          <div class="price" id="price">${
                            productDetail.price
                          }.00</div>
                          <div class="quantity-controls">
                              <button class="quantity-btn minus" id="minus">-</button>
                              <span class="quantity" id="quantity">${productQty}</span>
                              <button class="quantity-btn plus" id="plus">+</button>
                          </div>
                      </div>
    
                      <button class="rent-now" id="rent-now">Rent now</button>

                      <div class="reviews-input-container">

  <div class="add-review-input">
  <form action="">
  <div class="Reviewer-details">
  
  <img src="images/Dummy.png" alt="">
    <textarea name="" id="" placeholder="Add review" class="input-review-container"></textarea>
    </div>
     <div class="rating-star-count">
    <i class="fas fa-star star" ></i>
    <i class="fas fa-star star" ></i>
    <i class="fas fa-star star" ></i>
    <i class="fas fa-star star" ></i>
    <i class="fas fa-star star" ></i>
  </div>
   <div class="add-review-btn">
    <input type="submit" value="Add review" class="review-add-btn">
  </div>
  </form>
  </div>
  
  
</div>

    
                     
                      <div class="reviews-section" id="reviews-section">
                      <h2>Reviews</h2>
                          ${await showReviews(id)}
                      </div>
                  </div>
              </div>
             
          </div>
          
      </div>
      </div>`;

    productContainer.innerHTML = productElement;
    document.querySelectorAll(".stars").forEach((ratingContainer) => {
      const ratingValue = parseInt(ratingContainer.getAttribute("data-rating")); // Get the rating value (1 to 5)

      // Clear existing stars
      ratingContainer.innerHTML = "";

      // Loop through 5 stars
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star", "star"); // Add the star icon class

        if (i <= ratingValue) {
          star.classList.add("active"); // Add 'active' class for yellow stars
        } else {
          star.classList.add("inactive"); // Add 'inactive' class for gray stars
        }

        ratingContainer.appendChild(star);
      }
    });
    var availables = false;
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");
    var MaxQty = 1; // Assume maxQty is from the API, default to 10 if not provided.
    const qtyContainer = document.getElementById("quantity");
    const priceContainer = document.getElementById("price");

    plusBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (MaxQty > productQty) {
        productQty++;
        qtyContainer.innerHTML = productQty; // Update the displayed quantity
        priceContainer.innerHTML = conprice * productQty;
      }
    });

    minusBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (productQty > 1) {
        productQty--;
        qtyContainer.innerHTML = productQty; // Update the displayed quantity
        priceContainer.innerHTML = conprice * productQty;
      }
    });
    const availablemsg = document.getElementById("availability-message");
    document
      .getElementById("check-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        if (startDate === "" || endDate === "") {
          availablemsg.innerHTML = "Select Date Range";
          availables = false;
          return;
        }
        availablemsg.innerHTML = "Checking availability...";
        MaxQty = await calculateMaxqty(id, startDate, endDate);
        if (MaxQty === 0) {
          availablemsg.innerHTML = "Not Available those Days";
          availables = false;
          return;
        } else {
          availablemsg.innerHTML = `${MaxQty} items Available`;
          availables = true;
          return;
        }
      });

    document.getElementById("rent-now").addEventListener("click", async (e) => {
      e.preventDefault();
      if (availables && MaxQty >= productQty) {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        await addReservation(id, startDate, endDate, productQty, availablemsg);
      } else {
        availablemsg.innerHTML = "Check Availibility";
      }
    });

    document.getElementById("back-button").addEventListener("click", () => {
      itemView.classList.remove("model-show");
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
  itemView.classList.add("model-show");
}

async function showReviews(id) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/reviews/reviews?productId=${id}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const reviews = await response.json(); // Assuming the API returns JSON
    console.log(reviews);
    var reviewContainer = "";

    reviews.forEach((element) => {
      const reviewElement = `
        <div class="review">
          <img src="http://127.0.0.1:8000/uploads/${element.profilepic}" alt="Reviewer" class="reviewer-avatar">
          <div class="review-content">
              <div class="reviewer-name">${element.username}</div>
              <div class=" stars" data-rating="${element.reviewRate} >
                  <i class="fas fa-star star" ></i>
                  <i class="fas fa-star star" ></i>
                  <i class="fas fa-star star" ></i>
                  <i class="fas fa-star star" ></i>
                  <i class="fas fa-star star" ></i>
              </div>
              <p class="review-text">${element.review_content}</p>
          </div>
      </div>
      `;

      reviewContainer += reviewElement;
    });
    return reviewContainer;
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function calculateMaxqty(id, start, end) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/reservation/check?itemId=${id}&end=${start}&start=${end}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const reservation = await response.json(); // Assuming the API returns JSON
    console.log(reservation);
    return reservation[0].availableQuantity;
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function addReservation(id, start, end, qty, msg) {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
      quantity: qty,
      start: start,
      end: end,
    }),
  };

  try {
    const response = await fetch(
      `http://localhost:8000/api/reservation/addreservation`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to add reservation");
    }

    const reservation = await response.json();
    console.log(reservation);
    msg.innerHTML = reservation;

    return reservation.availableQuantity;
  } catch (error) {
    console.error("Error adding reservation:", error);
  }
}
