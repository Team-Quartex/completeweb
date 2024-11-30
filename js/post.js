window.postsArray = []

import { renderPosts } from './renderposts.js';

export async function loadPost() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
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
    renderPosts(posts, mainContent);
    
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}



document.addEventListener("DOMContentLoaded", () => {
  loadPost();
  
}); // Call the function to load posts


document.getElementById('homegobtn').addEventListener('click',()=>{
  loadPost();
})

document.getElementById('search-close').addEventListener('click',()=>{
  loadPost();
})