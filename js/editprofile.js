const edit_profilepic = document.getElementById('profile-edited-image');
const edit_name = document.getElementById('edit-name');
const edit_username = document.getElementById('edit-username');
const edit_email = document.getElementById('edit-email');
const edit_phone = document.getElementById('edit-phone');
const edit_adress = document.getElementById('edit-address');

document.getElementById("files").addEventListener("change", function(event) {
    // Get the selected file
    const file = event.target.files[0];
    
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      
      // When the file is read, update the image source
      reader.onload = function(e) {
        document.querySelector(".profile-edited-image").src = e.target.result;
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  });

document.getElementById('btn-edit-profile').addEventListener('click',()=>{
    document.getElementById("Settingspanel").style.width = "0";
    document.getElementById("editprofpanel").style.width = "28.0vw";
    getedituserDetails();
});

async function getedituserDetails() {
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
        const userDetails = await response.json();
        
        edit_profilepic.src = `http://127.0.0.1:8000/uploads/${userDetails.profilepic}`;
        edit_name.value = userDetails.name;
        edit_username.value = userDetails.username;
        edit_email.value = userDetails.email;
        edit_phone.value = userDetails.mobile        ;
        edit_adress.value = userDetails.address;


      } catch (error) {
        console.error("Error loading posts:", error);
      }
}



document.getElementById("update-profile").addEventListener("submit", async function (event) {
    event.preventDefault()
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
        console.log('hi')
        if (response.ok) {
          const data = await response.json();
          if (data.files && Array.isArray(data.files)) {
            imageFilenames = data.files.map((file) => file.filename);
  
            console.log(imageFilenames[0]);
            updateUserDetails(imageFilenames[0])
          } else {
            console.error("No files uploaded or invalid response");
          } 
        } else {
          
          console.error("Error:", response.statusText);
        }
      }
      else{
        updateUserDetails("")
      }
  } catch (error) {
    console.error(error);
  }}
);

async function updateUserDetails(profilepic){
    const name =edit_name.value;
    const phone = edit_phone.value;
    const address = edit_adress.value;
    const updateResponse = await fetch(
        "http://localhost:8000/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
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
  