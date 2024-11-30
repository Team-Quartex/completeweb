import { loadPost } from './post.js';

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector('input[type="file"]');
    const uploadedImagesContainer = document.querySelector(".uploaded-images");
    const uploadImageDivs = document.querySelectorAll(".upload-image");
  
    fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
  
      // Show the uploaded-images container if files are selected
      if (files.length > 0) {
        uploadedImagesContainer.style.display = "flex"; // Show container
      }
  
      // Clear existing images
      uploadImageDivs.forEach(div => div.innerHTML = "");
  
      // Loop through selected files and display images
      Array.from(files).slice(0, 5).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = `Uploaded Image ${index + 1}`;
          uploadImageDivs[index].appendChild(img); // Append image to the corresponding div
        };
        reader.readAsDataURL(file);
      });
    });
  });
  
document.getElementById('upload-form').addEventListener('submit',async function (event){
    event.preventDefault()
    const formData = new FormData();
    const files = document.getElementById("file-1").files;
    const description = document.getElementById('add-description').value;
    const city = document.getElementById('citySearch').value;

    Array.from(files).forEach((file) => {
      formData.append("file-1", file);
    });


    try {
      var imageFilenames = []
      if(files.length>0){
        const response = await fetch("http://localhost:8000/api/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          
          // Check if files are present and if it's an array
          if (data.files && Array.isArray(data.files)) {
            // Map through the files array to get only filenames
            imageFilenames = data.files.map((file) => file.filename);
  
            console.log(imageFilenames); // Array of filenames
  
            // Now send the image filenames to the second API (addPost)
          } else {
            console.error("No files uploaded or invalid response");
          } // You can now use 'data' which is the parsed JSON from the server
        } else {
          // Handle errors
          console.error("Error:", response.statusText);
        }
      }
      console.log(description)
      const postResponse = await fetch(
        "http://localhost:8000/api/posts/addPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            desc: description,
            location: city,
            images: imageFilenames, // Pass the filenames array here
          }),
        }
      );

      // Check if the second API request was successful
      if (postResponse.ok) {
        const postData = await postResponse.json();
        const uploadedImagesContainer = document.querySelector(".uploaded-images");
        const uploadImageDivs = document.querySelectorAll(".upload-image");

        // Clear images from container
        uploadImageDivs.forEach((div) => (div.innerHTML = ""));

        // Hide the uploaded-images container
        uploadedImagesContainer.style.display = "none";

        // Reset file input and description
        document.getElementById('add-description').value = "";
        const mainContent = document.getElementById("feed-container");
        mainContent.innerHTML = ""; 
        await loadPost();
        console.log(postData); // Response from /api/products/addPost
      } else {
        console.error(
          "Error while posting data to addPost:",
          postResponse.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
})