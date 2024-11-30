import {fetchProducts} from './product.js'
import {clearFileInput} from './Seller-add products.js'

document.getElementById('productForm').addEventListener('submit',async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    const files = document.getElementById("fileInput").files;
    const name = document.getElementById("productName-add").value;
    const description = document.getElementById("productDescription").value;
    const price = document.getElementById("productPrice-add").value;
    const categoryId = document.getElementById("productCategory").value;
    const qty = document.getElementById("qty-add").value;

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
            const postResponse = await fetch(
                "http://localhost:8000/api/products/add",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // Ensure you're sending JSON
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    name: name,
                    desc: description,
                    price:price,
                    category:categoryId,
                    qty:qty,
                    images: imageFilenames, // Pass the filenames array here
                  }),
                }
              );
        
              // Check if the second API request was successful
              if (postResponse.ok) {
                fetchProducts()
                
                clearFileInput();
                showMessage("Product added successfully!", "green");
              } else {
                console.error(
                  "Error while posting data to addPost:",
                  postResponse.statusText
                );
              }
          } else {
            console.error("No files uploaded or invalid response");
          } // You can now use 'data' which is the parsed JSON from the server
        } else {
          // Handle errors
          console.error("Error:", response.statusText);
        }
      }else{
        showMessage("At leasr 1 picture need","red");
      }
    } catch (error) {
      console.error(error);
    }
})

export function showMessage(text,color) {
    const messageElement = document.getElementById("res-add");
    messageElement.innerHTML = text;
    messageElement.style.color = color;
    // Show the message
    messageElement.style.display = "block";

    // Hide the message after 4 seconds
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 4000);
}

