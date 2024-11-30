import {addComment} from './mainFunctions.js'
export function showPostview(post) {
    console.log(post);
    const postviewConatiner = document.getElementById("comment-viewer");
    postviewConatiner.style.display = "block";
    var postImage = "";
    
    post.images.forEach((image) => {
      postImage += `<img src="http://127.0.0.1:8000/uploads/${image}" alt="Post Image" class="post-image-comment">`;
    });
    const postviewContent = `
          <div class="comment-box">
          <!-- Close Button -->
          <p class="close-btn-postview" onclick="closepostview()">×</p>
  
          <!-- Post Header -->
          <div class="comment-post-header">
            <div class="comment-post-details">
              <img src="http://127.0.0.1:8000/uploads/${
                post.profilePic
              }" alt="User Avatar" class="comment-user-avatar">
              <div class="post-details">
                <h3 class="post-owner-name">${
                  post.name.split(" ")[0]
                }'s Post</h3><br>
                <span class="post-time-comment">${post.postTime}</span>
              </div>
            </div>
            <div class="post-options"><i class="fi fi-rr-bookmark"></i></div>
          </div>
  
          <!-- Post Content -->
          <div class="post-content">
            <h1 class="post-title"></h1>
            <div class="post-images-carousel ${post.images.length===0?`none-carsole`:""}">
              <button class="carousel-arrow left-arrow ${post.images.length<=1?`none-carsole`:""} "  onclick="scrollCarousel('left')">&#10094;</button>
              <div class="carousel">
                  ${postImage}
              </div>
              <button class="carousel-arrow right-arrow ${post.images.length<=1?`none-carsole`:""}" onclick="scrollCarousel('right')">&#10095;</button>
            </div>
          </div>
           <div class ="post-view-description">${post.description}</div>
  
          <!-- Action Bar -->
          <div class="action-bar">
            <div class="action-button"><i class="fi fi-rr-heart"></i> ${
              post.likeduser.length
            } Likes</div>
            <div class="action-button"><i class="fi fi-rr-comments"></i> ${
              post.comments
            } Comments</div>
            <div class="action-button"><i class="fi fi-rr-share"></i> Shares</div>
          </div>
  
          <!-- Comments Section -->
          <div class="comment-box-section" id="comment-box-section">
            <!-- Sample comments -->
            
          </div>
  
          <!-- Comment Input -->
          <form id="comment-input-form">
            <div class="comment-input-section">
              
                <img src="${document.getElementById('user-img').src}" alt="User Avatar" class="input-avatar">
                <input type="text" placeholder="Write a comment..." class="comment-input" id="comment-input">
  
                <input type="submit" class="comment-post-button" id="comment-post-button" value="Post" >
  
            </div>
          </form>
        </div>
      `;
    postviewConatiner.innerHTML = postviewContent;
    const commentHolder = document.getElementById('comment-box-section');
    getComments(post.postId,commentHolder)

    document.getElementById('comment-input-form').addEventListener('submit',async (e)=>{
        e.preventDefault();
        const comment = document.getElementById('comment-input').value;
        if(!comment===""){
            
        }else{
            await addComment(comment,post.postId);
            document.getElementById('comment-input').value = "";
            await getComments(post.postId,commentHolder)
        }
    })
  }
  
  async function getComments(postId,holder) {
    holder.innerHTML = "";
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    // call api and get posts
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments?postId=${postId}`,
        requestOptions
      );
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const comments = await response.json(); // Assuming the API returns JSON
      console.log(comments);
  
      comments.forEach((element) => {
        const photoCard = `
          <div class="comment">
              <img src="http://127.0.0.1:8000/uploads/${element.profilepic}" alt="User Avatar" class="comment-avatar">
              <div class="comment-content">
                <h4 class="comment-user">${element.username}</h4>
                <p class="comment-text">${element.content}</p>
                <p class="comment-time">${element.createat}</p>
              </div>
            </div>
          
        `;
        holder.innerHTML += photoCard;
      });
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }
  