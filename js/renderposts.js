// Export function to render posts
const userData = JSON.parse(localStorage.getItem('userData'));

import {formatPostTime} from './utilities.js'
export function renderPosts(posts, container) {
    posts.forEach((post) => {
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
                imagecontent = post.images.slice(0, 5).map((img, index) => `
                    <img
                        src="http://127.0.0.1:8000/uploads/${img}"
                        alt="Image ${index + 1}"
                        class="post-image"
                    />
                `).join('');
                break;
        }

        // Format description with hashtags and mentions
        const formattedDescription = post.description
            .replace(/#\w+/g, match => `<span class="hashtag">${match}</span>`)
            .replace(/@\w+/g, match => `<span class="location">${match}</span>`)
            .replace(/\n/g, '<br>');
        
        // location show
        const locationdata  = post.location ? `<span class="location">@${post.location}</span> <br>`:'';
        const verify = post.verify === 'yes' ? `<i class="fi fi-rr-globe"></i>` : ``;
        const followBtn = post.isFollowed === 'no' && post.verify === 'yes' && userData.userid != post.UserId ? `<a class="follow-btn">Follow</a>` : ``;

        // Construct post inner HTML
        postElement.innerHTML = `
            <div class="post">
                <div class="post-header">
                  <img
                  src="http://127.0.0.1:8000/uploads/${post.profilePic}"
                    alt="${post.name}"
                    class="post-avatar"
                  />
                  <div class="post-user-info">
                    <div class="name-verified">
                    <span class="post-username">${post.name}</span><span class="verified">${verify}</span>
                    ${followBtn}
                  </div>
                    <span class="post-time">${formatPostTime(post.postTime)}</span>
                  </div>
                </div>
                <div class="post-content">
                    <p>${locationdata} ${formattedDescription}</p>
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

        // Append the post to the provided container
        container.appendChild(postElement);
    });
}
