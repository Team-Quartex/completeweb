document.getElementById('files').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    const profileImage = document.querySelector('.profile-image-update img'); // Select the profile image element

    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file

        // Set the image source when the file is loaded
        reader.onload = function (e) {
            profileImage.src = e.target.result; // Update the src attribute
        };
        document.getElementById('profile-image-updater').style.display="block";

        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        alert('No file selected or file type is invalid.');
    }
});