const edit_name = document.getElementById('edit-name');
const edit_username = document.getElementById('edit-username');
const edit_email = document.getElementById('edit-email');
const edit_mobile = document.getElementById('edit-number');

document.getElementById('files').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    const profileImage = document.querySelector('.profile-image-update img'); // Select the profile image element

    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file

        // Set the image source when the file is loaded
        reader.onload = function (e) {
            profileImage.src = e.target.result; // Update the src attribute
        };
        document.getElementById('profile-image-updater').style.display = "block";

        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        alert('No file selected or file type is invalid.');
    }
});


export async function profileDetailsLoad() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      // call api and get posts
      try {
        const response = await fetch(
          `http://localhost:8000/api/seller/details`,
          requestOptions
        );
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const details = await response.json(); // Assuming the API returns JSON
        console.log(details);
        
        document.getElementById('seller-profile').src = `http://127.0.0.1:8000/uploads/${details.profilepic}`;
        document.getElementById('seller-name-edit').innerHTML = details.name;

        const holder = document.getElementById('details-container');
        

        const element = `<div class="grid-details">
                    <div><strong>Name</strong></div>
                    <div>${details.name}</div>

                    <div><strong>Email</strong></div>
                    <div>${details.email}</div>

                    <div><strong>Username</strong></div>
                    <div>${details.username}</div>

                    <div><strong>Location</strong></div>
                    <div>${details.city}</div>

                    <div><strong>Telephone number</strong></div>
                    <div>${details.mobile ?? ""}</div>

                    <div><strong>Active Status</strong></div>
                    <div>${details.status}</div>
                    
                </div>`
        
        holder.innerHTML = element;

        // form details update
        edit_name.value = details.name;
        edit_username.value = details.username;
        edit_email.value = details.email;
        edit_mobile.value = details.mobile ?? "";
        

      } catch (error) {
        console.error("Error loading posts:", error);
      }

}


document.getElementById('seller-edit-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    const files = document.getElementById("files").files;
    

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
          if (data.files && Array.isArray(data.files)) {
            imageFilenames = data.files.map((file) => file.filename);
  
            console.log(imageFilenames[0]);
            updateSellerDetails(imageFilenames[0])
          } else {
            console.error("No files uploaded or invalid response");
          } 
        } else {
          
          console.error("Error:", response.statusText);
        }
      }
      else{
        updateSellerDetails("")
      }
  } catch (error) {
    console.error(error);
  }}
);

async function updateSellerDetails(profilepic){
    const name =edit_name.value;
    const phone = edit_mobile.value;
    const username = edit_username.value;
    const updateResponse = await fetch(
        "http://localhost:8000/api/seller/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            name: name,
            phone: phone,
            username: username,
            profilepic: profilepic,
          }),
        }
      );

      // Check if the second API request was successful
      if (updateResponse.ok) {
        location.reload()
      } else {
        console.error(
          "Error while posting data to addPost:",
          updateResponse.statusText
        );
      }
}