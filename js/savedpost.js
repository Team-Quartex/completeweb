import { renderPosts } from './renderposts.js';

document.getElementById('savepost-btn').addEventListener('click',()=>{
    document.getElementById('saved-post-container').style.display='block';
    document.getElementById('post-container').style.display='none';
    document.getElementById('search').style.display='none';
    document.getElementById('marketplace').style.display='none';
    showSavedPost();
  });

export async function showSavedPost(){
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          "http://localhost:8000/api/savedpost/getsavedposts",
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const posts = await response.json(); // Assuming the API returns JSON
        console.log(posts);
    
        // Get the feed container
        const mainContent = document.getElementById("save-posts");
        renderPosts(posts, mainContent);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    }
