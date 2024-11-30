// Export function to render posts
const userData = JSON.parse(localStorage.getItem("userData"));
import { addFollow } from "./follow.js";
import { formatPostTime } from "./utilities.js";
import { loadsuggestions } from "./suggetions.js";
import { showUserprofile } from "./profileview.js";
import { showPostview } from "./post-view.js";
import {addComment,addsaved,removedPost} from './mainFunctions.js'


export function renderPosts(posts, container) {
  posts.forEach((post, index) => {
    // Construct the post HTML
    const postElement = document.createElement("div");
    postElement.classList.add("feed"); // Add feed class
    let imagecontent = "";
    // Handle image rendering based on the number of images
    switch (post.images.length) {
      case 0:
        imagecontent = "";
        break;
      case 1:
        imagecontent = `
                    <div class="post-images">
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                        alt="${post.images[0]}"
                        class="post-image-1"
                        />
                    </div>`;
        break;
      case 2:
        imagecontent = `
                    <div class="post-images">
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                        alt="${post.images[0]}"
                        class="post-image-2"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                        alt="${post.images[1]}"
                        class="post-image-2"
                        />
                    </div>`;
        break;
      case 3:
        imagecontent = `
                    <div class="post-images">
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                        alt="${post.images[0]}"
                        class="post-image-3"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                        alt="${post.images[1]}"
                        class="post-image-3"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[2]}"
                        alt="${post.images[2]}"
                        class="post-image-3"
                        />
                    </div>`;
        break;
      case 4:
        imagecontent = `
                    <div class="post-images">
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                        alt="${post.images[0]}"
                        class="post-image-4"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                        alt="${post.images[1]}"
                        class="post-image-4"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[2]}"
                        alt="${post.images[2]}"
                        class="post-image-4"
                        />
                        <img
                        src="http://127.0.0.1:8000/uploads/${post.images[3]}"
                        alt="${post.images[3]}"
                        class="post-image-4"
                        />
                    </div>`;
        break;
      default:
        imagecontent = post.images
          .slice(0, 5)
          .map(
            (img, index) => `
                    <img
                        src="http://127.0.0.1:8000/uploads/${img}"
                        alt="Image ${index + 1}"
                        class="post-image"
                    />
                `
          )
          .join("");
        break;
    }
    const struserId = String(userData.userid);
    // post.likeduser.includes(struserId) ? console.log("TRUE "+post.postId) : console.log("fALSE "+post.postId)
    // Format description with hashtags and mentions
    const formattedDescription = post.description
      .replace(/#\w+/g, (match) => `<span class="hashtag">${match}</span>`)
      .replace(/@\w+/g, (match) => `<span class="location">${match}</span>`)
      .replace(/\n/g, "<br>");

    // location show
    const locationdata = post.location
      ? `<span class="location">@${post.location}</span> <br>`
      : "";
    const verify =
      post.verify === "yes" ? `<i class="fi fi-rr-globe"></i>` : ``;
    const followBtn =
      post.isFollowed === "no" &&
      post.verify === "yes" &&
      userData.userid != post.UserId
        ? `<button class="follow-btn removeDisplay"  data-user="${post.UserId}">Follow</button>`
        : ``;
    // Construct post inner HTML
    postElement.innerHTML = `
            <div class="post" data-index="${index}">
                <div class="post-header">
                <div class="post-header-user-details">
                  <img
                  src="http://127.0.0.1:8000/uploads/${post.profilePic}"
                    alt="${post.name}"
                    class="post-avatar"
                  />
                  <div class="post-user-info">
                    <div class="name-verified">
                    <span class="post-username" data-userid="${post.UserId}">${
      post.name
    }</span><span class="verified">${verify}</span>
                    ${followBtn}
                    
                  </div>
                    <span class="post-time">${post.postTime}</span>
                  </div>
                  </div>
                  <div class="save-btn" data-postid="${post.postId}" data-status="${post.isSaved}">${post.isSaved==="yes"?`<i class="fi fi-sr-bookmark"></i>`:`<i class="fi fi-rr-bookmark"></i>`}</div>
                </div>
                
                <div class="post-content">
                    <p>${locationdata} ${formattedDescription}</p>
                </div>
                ${imagecontent}
               
                <div class="post-footer">
                            <div class="post-reactions likeclass" >
                                <div class="reaction" >
                                ${
                                  post.likeduser.includes(struserId)
                                    ? `
                                    <i class="fi fi-sr-heart likeicon likebutton" data-status="true" data-postid="${post.postId}" data-postuser="${post.UserId}"></i>
                                    <p class="likeicon">${post.likeduser.length}</p>
                                    `
                                    : `
                                    <i class="fi fi-rr-heart likebutton" data-status="false" data-postid="${post.postId}" data-postuser="${post.UserId}"></i>
                                    <p >${post.likeduser.length}</p>
                                    `
                                }
                                </div>
                                <button class="reaction">
                                    <i class="fi fi-rr-comments"></i>
                                    <p >${
                                      post.comments === 0 ? 0 : post.comments
                                    }</p>
                                </button>
                            <button class="reaction">
                                <i class="fi fi-rr-share"></i>
                                Share
                            </button>
                            <div class="comment-section-input">
                                <input type="text" name="" id="" placeholder="Type a comment..."  class="comment-section">  
                                <button class="reaction add-comment" data-postId="${
                                  post.postId
                                }">
                                <i class="fi fi-sr-paper-plane-top"></i>
                                
                                </button>
                                
                            </div>
                        </div>
            </div>
        `;

    // Append the post to the provided container
    container.appendChild(postElement);
  });
  const buttonQuery = document.querySelectorAll(".follow-btn");
  buttonQuery.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const userId = this.dataset.user;
      buttonQuery.forEach((button) => {
        if (button.dataset.user === userId) {
          button.classList.add("hidden");
        }
      });
      addFollow(userId);
      var count =
        parseInt(document.getElementById("user-following-count").innerHTML) + 1;
      document.getElementById("user-following-count").innerHTML = count;
      loadsuggestions();
    });
  });

  const postViews = document.querySelectorAll(".post");
  postViews.forEach((postview) => {
    postview.addEventListener("click", () => {
      // Access the dataset index for the current element
      const index = postview.dataset.index;

      // Use the index to show the post view
      showPostview(posts[index]);
    });
  });

  const likebtns = document.querySelectorAll(".likebutton");
  likebtns.forEach((like) => {
    like.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event bubbling
      const status = like.dataset.status;
      const UserId = like.dataset.postuser;
      const postid = like.dataset.postid; // Retrieve post ID
      const likesCountElement = like.nextElementSibling; // Assuming <p> is the next sibling of <i>
      let likesCount = parseInt(likesCountElement.textContent); // Get current like count

      if (status === "true") {
        // Change to unliked state
        like.classList.remove("fi-sr-heart", "likeicon");
        like.classList.add("fi-rr-heart");
        like.dataset.status = "false";
        likesCount--; // Decrement like count
        likesCountElement.classList.remove("likeicon");
        remove(postid, UserId);
      } else {
        // Change to liked state
        like.classList.remove("fi-rr-heart");
        like.classList.add("fi-sr-heart", "likeicon");
        like.dataset.status = "true";
        likesCount++; // Increment like count
        likesCountElement.classList.add("likeicon");
        console.log(UserId);
        addLike(postid, UserId);
      }

      // Update the likes count in the <p> element
      likesCountElement.textContent = likesCount;
      likesCountElement.classList.add("updated-class"); // Optional: Add a class to indicate a visual change
    });
  });
  document.querySelectorAll(".post-username").forEach((user) => {
    user.addEventListener("click", (event) => {
      event.stopPropagation();
      const userId = user.dataset.userid;
      console.log(userId);
      showUserprofile(userId);
    });
  });
  // saved post
  document.querySelectorAll('.save-btn').forEach((btn)=>{
    btn.addEventListener('click',async (e)=>{
      e.stopPropagation();
      const postId = btn.dataset.postid;
      const status = btn.dataset.status;
      console.log(status);
      if(status==='yes'){
        btn.innerHTML=`<i class="fi fi-rr-bookmark"></i>`
        btn.dataset.status='no';
        await removedPost(postId);
      }else{
        btn.innerHTML=`<i class="fi fi-sr-bookmark"></i>`
        btn.dataset.status='yes';
        await addsaved(postId);
      }
    })
  })

  document
    .querySelectorAll(".comment-section-input")
    .forEach((commentContaier) => {
      commentContaier.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    document.querySelectorAll(".add-comment").forEach((button) => {
      button.addEventListener("click", () => {
        const inputField = button
          .closest(".comment-section-input")
          .querySelector(".comment-section");
        const commentText = inputField.value.trim();
        const postId = button.dataset.postid; // Correct dataset attribute name
    
        console.log(postId); // Debugging output
    
        if (!commentText) {
          alert("Please enter a comment before sending.");
          return;
        } else {
          // Uncomment this line to call your comment adding function
          addComment(commentText, postId);
          inputField.value ="";
          // console.log("Comment added:", commentText);
        }
      });
    });
}

function addLike(postid, userId) {
  const addfavourite = fetch("http://localhost:8000/api/likes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure you're sending JSON
    },
    credentials: "include",
    body: JSON.stringify({
      postId: postid,
      postuser: userId,
    }),
  });
}

function remove(postid, userId) {
  const addfavourite = fetch("http://localhost:8000/api/likes/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ensure you're sending JSON
    },
    credentials: "include",
    body: JSON.stringify({
      postId: postid,
      postuser: userId,
    }),
  });
}
