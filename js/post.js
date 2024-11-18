window.postsArray = []
export async function loadPost() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:8000/api/posts/getall",
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json(); // Assuming the API returns JSON
    console.log(posts);

    // Get the feed container
    const mainContent = document.getElementById("feed-container");
    window.postsArray.length = 0; // Clear the array in case of reload
    window.postsArray.push(...posts);
    posts.forEach((post) => {
      // Construct the post HTML
      const postElement = document.createElement("div");
      postElement.classList.add("feed"); // Add feed class
      let imagecontent = "";
      console.log(post.images.length);
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
                        </div>
                    `;
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
                    `;
          break;
        case 3:
          imagecontent = `
                        <div class="post-images">
                            <img
                                src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                                alt="Sri Lanka 1"
                                class="post-image-3"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                            alt="Sri Lanka 1"
                            class="post-image-3"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[2]}"
                            alt="Sri Lanka 1"
                            class="post-image-3"
                        />
                            
                            </div>
                    `;
          break;
        case 4:
          imagecontent = `
                    <div class="post-images">
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                            alt="Sri Lanka 1"
                            class="post-image-4"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                            alt="Sri Lanka 2"
                            class="post-image-4"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[2]}"
                            alt="Sri Lanka 3"
                            class="post-image-4"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[3]}"
                            alt="Sri Lanka 4"
                            class="post-image-4"
                            />
                        </div>
                    `;
          break;
        case 5:
          imagecontent = `
                        <div class="post-images">
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[0]}"
                            alt="Sri Lanka 1"
                            class="post-image"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[1]}"
                            alt="Sri Lanka 2"
                            class="post-image"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[2]}"
                            alt="Sri Lanka 3"
                            class="post-image"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[3]}"
                            alt="Sri Lanka 4"
                            class="post-image"
                            />
                            <img
                            src="http://127.0.0.1:8000/uploads/${post.images[4]}"
                            alt="Sri Lanka 4"
                            class="post-image"
                        />
                        </div>
                    `;
          break;
        default:
          break;
      }
      const formattedDescription = post.description.replace(/#\w+/g, match => {
        return `<span class="hashtag">${match}</span>`; // Wrap hashtags in a <span> with 'hashtag' class
      }).replace(/@\w+/g, match => {
          return `<span class="location">${match}</span>`; // Wrap locations/mentions in a <span> with 'location' class
      });
      postElement.innerHTML = `
                <div class="post">
                    <div class="post-header">
                        <img
                            src="http://127.0.0.1:8000/uploads/${post.profilePic}"
                            alt="${post.name}}"
                            class="post-avatar"
                        />
                        <div class="post-user-info">
                            <span class="post-username">${post.name}</span>
                            <span class="post-time">${formatPostTime(post.postTime)}</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${formattedDescription}</p>
                    </div>
                    ${imagecontent}
                    <div class="post-footer">
                        <div class="post-reactions">
                            <button class="reaction">
                            <img
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'%3E%3C/path%3E%3C/svg%3E"
                                alt="Like"
                            />
                            ${post.likeduser.length}
                            </button>
                            <button class="reaction">
                            <img
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'%3E%3C/path%3E%3C/svg%3E"
                                alt="Comment"
                            />
                            ${post.comments===0? 0 :post.comments}
                        
                            </button>
                        <button class="reaction">
                            <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='18' cy='5' r='3'%3E%3C/circle%3E%3Ccircle cx='6' cy='12' r='3'%3E%3C/circle%3E%3Ccircle cx='18' cy='19' r='3'%3E%3C/circle%3E%3Cline x1='8.59' y1='13.51' x2='15.42' y2='17.49'%3E%3C/line%3E%3Cline x1='15.41' y1='6.51' x2='8.59' y2='10.49'%3E%3C/line%3E%3C/svg%3E"
                            alt="Share"
                            />
                            Share
                        </button>
                        <div class="comment-section-input">
                            <input type="text" name="" id="" placeholder="Type a comment..."  class="comment-section">  
                            <button class="reaction">
                            <img
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='18' cy='5' r='3'%3E%3C/circle%3E%3Ccircle cx='6' cy='12' r='3'%3E%3C/circle%3E%3Ccircle cx='18' cy='19' r='3'%3E%3C/circle%3E%3Cline x1='8.59' y1='13.51' x2='15.42' y2='17.49'%3E%3C/line%3E%3Cline x1='15.41' y1='6.51' x2='8.59' y2='10.49'%3E%3C/line%3E%3C/svg%3E"
                                alt="Share"
                            />
                            Share
                            </button>
                            
                        </div>
                        </div>
                </div>
            `;

      // Append the post to the feed
      mainContent.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

function formatPostTime(postTime) {
    const postDate = new Date(postTime); // Parse the provided date string
    const now = new Date(); // Get the current date and time
    const timeDiff = now - postDate; // Difference in milliseconds
    const seconds = Math.floor(timeDiff / 1000); // Difference in seconds
    const minutes = Math.floor(seconds / 60); // Difference in minutes
    const hours = Math.floor(minutes / 60); // Difference in hours
    const days = Math.floor(hours / 24); // Difference in days
    const weeks = Math.floor(days / 7); // Difference in weeks

    if(seconds<60){
      return `${seconds} seconds ago`
    }
    else if(minutes<60){
      return `${minutes} minutes ago`
    }
    else if (hours < 24) {
        // If within the past two days, show hours
        return `${hours} hours ago`;
    } else if (days <= 7) {
        // If within the past week, show days
        return `${days} days ago`;
    } else {
        // Show month and day
        const options = { month: 'long', day: 'numeric' }; // E.g., "November 15"
        return postDate.toLocaleDateString(undefined, options);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPost();
}); // Call the function to load posts

