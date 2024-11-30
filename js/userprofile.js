
async function getUserDetails() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          "http://localhost:8000/api/users/userDetails",
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const userDetails = await response.json(); // Assuming the API returns JSON
        console.log(userDetails);
        const userData = userDetails;  
        localStorage.setItem('userData', JSON.stringify(userDetails));
        document.getElementById('user-name').innerHTML = userDetails.name;
        document.getElementById('username').innerHTML = '@'+userDetails.username;
        document.getElementById('user-img').src = `http://127.0.0.1:8000/uploads/${userDetails.profilepic}`;
        document.getElementById('user-img1').src = `http://127.0.0.1:8000/uploads/${userDetails.profilepic}`;
        document.getElementById('hidden-id').innerHTML = userDetails.userid;
        document.getElementById('hidden-id').dataset.verify= userDetails.verify;

        const followsContainer = document.getElementById('user-stats');
        const follows = userDetails.verify === 'yes'?        `<div>
              <div class="stat-value">${userDetails.following_count}</div>
              <div>Followers</div>
            </div>
            <div>
              <div class="stat-value" id="user-following-count">${userDetails.followers_count}</div>
              <div>Following</div>
            </div>`:`
            <div>
              <div class="stat-value" id="user-following-count">${userDetails.followers_count}</div>
              <div>Following</div>
            </div>`;

            followsContainer.innerHTML = follows;
        
      } catch (error) {
        console.error("Error loading posts:", error);
      }
}



document.addEventListener("DOMContentLoaded", () => {
    getUserDetails();
  }); 

