import { renderPosts } from "./renderposts.js";
import { addFollow } from "./follow.js";
import { loadsuggestions } from "./suggetions.js";
import { loadPost } from "./post.js";



const profileViewContainer = document.getElementById("user-profile-view");
export async function showUserprofile(userId) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/users/otheruser?uid=${userId}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const userDetails = await response.json(); // Assuming the API returns JSON
    console.log(userDetails);

    const followerElement =
      userDetails.verify === "yes"
        ? `<p>${userDetails.following_count} Followers  ${userDetails.followers_count} Following</p>`
        : `<p>${userDetails.followers_count} Following`;
    const isNotCurrentUser =
      document.getElementById("hidden-id").innerHTML != userId;
    const isVerified = userDetails.verify === "yes";

    const followBtn =
      isNotCurrentUser && isVerified
        ? userDetails.isFollowed === "no"
          ? `<button class="user-view-follow-button removeDisplay" id="view-follow-btn" data-user="${userId}">Follow</button>`
          : `<button class="user-view-follow-button removeDisplay" data-user="${userId}">Unfollow</button>`
        : ``;
    const bodyElement = `
            <div class="user-view-container">
             <a id="user-view-back-button" class="user-view-back-button" aria-label="Go back"><i class="fi fi-rr-angle-left"></i></a>
                <header class="user-view-header">
                   
                    <div class="user-view-profile-info">
                        <img src="http://127.0.0.1:8000/uploads/${userDetails.profilepic}" alt="User profile picture"
                            class="user-view-profile-picture" />
                        <div class="user-view-profile-details">
                            <h1>${userDetails.name}</h1>
                            <p>@${userDetails.name}</p>
                            ${followerElement}
                            ${followBtn}
                        </div>
                    </div>
                </header>

                <main class="user-view-main-content">
                    <div class="user-view-left-column">
                        <section class="user-view-card user-view-basic-details">
                            <h2>Basic Details</h2>
                            <dl>
                                <dt>Name</dt>
                                <dd>${userDetails.name}</dd>
                                <dt>User name</dt>
                                <dd>${userDetails.username}</dd>
                                <dt>Location</dt>
                                <dd>${userDetails.name}</dd>
                                <dt>Verifications</dt>
                                <dd>${userDetails.verify}</dd>
                            </dl>
                        </section>

                        <section class="user-view-card">
                            <h2>Recent Photos</h2>
                            <div class="user-view-recent-photos" id="user-view-recent-photos">
                                <img src="https://via.placeholder.com/150" alt="Recent photo 1" />
                                <img src="https://via.placeholder.com/150" alt="Recent photo 2" />
                                <img src="https://via.placeholder.com/150" alt="Recent photo 3" />
                                <img src="https://via.placeholder.com/150" alt="Recent photo 4" />
                            </div>
                        </section>

                        <section class="user-view-card">
                            <h2>Followers</h2>
                            <div class="user-view-followers" id="user-view-followers">
                                <div class="user-view-follower">
                                    <img src="https://via.placeholder.com/60" alt="Follower 1" />
                                    <p>User name</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="user-view-center-column" id="user-view-center-column">
                        <!--Feed Section-->

                    </div>

                    <div class="user-view-right-column" id="user-view-right-column">
                        <section class="user-view-card order-scroller" >
                            <h2>Order History</h2>
                            <div class="user-view-order-item">
                                <div class="user-view-order-item-details">
                                    <img src="https://via.placeholder.com/50" alt="Order item 1"
                                        class="user-view-order-item-image" />
                                    <div>
                                        <p>Item name</p>
                                        <p>QTY</p>
                                    </div>
                                </div>
                                <p>Price</p>
                            </div>
                            <div class="user-view-order-item">
                                <div class="user-view-order-item-details">
                                    <img src="https://via.placeholder.com/50" alt="Order item 2"
                                        class="user-view-order-item-image" />
                                    <div>
                                        <p>Item name</p>
                                        <p>QTY</p>
                                    </div>
                                </div>
                                <p>Price</p>
                            </div>
                            <div class="user-view-order-item">
                                <div class="user-view-order-item-details">
                                    <img src="https://via.placeholder.com/50" alt="Order item 3"
                                        class="user-view-order-item-image" />
                                    <div>
                                        <p>Item name</p>
                                        <p>QTY</p>
                                    </div>
                                </div>
                                <p>Price</p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        `;
        
    profileViewContainer.innerHTML = bodyElement;
    const postHolder = document.getElementById("user-view-center-column");
    // profile view variables
    const orderView = document.getElementById("user-view-right-column");
    const followerView = document.getElementById("user-view-followers");
    const photoView = document.getElementById("user-view-recent-photos");

    

    await postLoad(userId, postHolder);
    profileViewContainer.classList.add("user-profile-view-show");
    // if logged user = view user then show recent orders
    if (document.getElementById("hidden-id").innerHTML === userId) {
      showOrders(orderView);
    } else {
      orderView.classList.add('hide-order');
      // showOrders(orderView)
    }

    if (userDetails.verify === "yes") {
      followerView.innerHTML = "";
      showFollowers(userId, followerView);
    } else {
      followerView.innerHTML = "";
    }
    recentPhotos(userId, photoView);
    document
      .getElementById("user-view-back-button")
      .addEventListener("click", () => {
        profileViewContainer.classList.remove("user-profile-view-show");
        loadPost();
      });

      const buttonQuery = document.getElementById('view-follow-btn');
      buttonQuery.addEventListener("click", function (event) {
          event.stopPropagation();
          const userId = this.dataset.user;
          addFollow(userId);
          var count =
            parseInt(document.getElementById("user-following-count").innerHTML) + 1;
          document.getElementById("user-following-count").innerHTML = count;
          loadsuggestions();

        });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function postLoad(userId, holder) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/posts/userpost?uid=${userId}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const userpost = await response.json(); // Assuming the API returns JSON
    console.log(userpost);
    renderPosts(userpost, holder);
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function showFollowers(id, holder) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/users/recentFollows?uid=${id}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const followers = await response.json(); // Assuming the API returns JSON
    console.log(followers);

    followers.forEach((element) => {
      const followerCard = `<div class="user-view-follower" data-userid="${element.userid}" id="user-view-follower">
                                    <img src="http://127.0.0.1:8000/uploads/${element.profilepic}" alt="Follower 1" />
                                    <p>${element.username}</p>
                                </div>`;
      holder.innerHTML += followerCard;
      document.querySelectorAll(".user-view-follower").forEach((user) => {
        user.addEventListener("click", (event) => {
          console.log("hi");
          event.stopPropagation();
          const userId = user.dataset.userid;
          console.log(userId);
          showUserprofile(userId);
        });
      });
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function recentPhotos(id, holder) {
  holder.innerHTML = "";
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/users/recentPhotos?uid=${id}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const photos = await response.json(); // Assuming the API returns JSON
    console.log(photos);

    photos.forEach((element) => {
      const photoCard = `<img src="http://127.0.0.1:8000/uploads/${element.imageLink}" alt="Recent photo 1" />`;
      holder.innerHTML += photoCard;
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function showOrders(holder) {
  holder.innerHTML = "";
  holder.innerHTML = "<h2>Order History</h2>";
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      `http://localhost:8000/api/reservation/userreservation`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const orders = await response.json(); // Assuming the API returns JSON
    console.log(orders);

    orders.forEach((element) => {
      const orderCard = `
      
      <div class="user-view-order-item">
                                <div class="user-view-order-item-details">
                                <div class="order-header">
                                    <img src="http://127.0.0.1:8000/uploads/${element.productImage}" alt="Order item 3"
                                        class="user-view-order-item-image" />
                                    <div class="item-detail">
                                        <p>${element.productName}</p>
                                        <p>${element.qty}</p>
                                         <p>${element.tot}</p><br>
                                    </div>
                                 </div>   
                                </div>
                               
                                <p>reserve date${element.orderTime}</p><br>
                                <p>start ${element.startDate}</p><br>
                                <p>end ${element.endDate}</p><br>
                            </div>
                            
                            `;
      holder.innerHTML += orderCard;
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}


