// Function to clear the file input and preview area
export function clearFileInput() {
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");
  const customLabel = document.querySelector(".custom-file-label");
  document.getElementById("productName-add").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice-add").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("qty-add").value = "";

  // Reset the file input
  fileInput.value = "";

  // Clear the preview area
  filePreview.innerHTML = "";
  filePreview.classList.add("hidden");

  // Reset the label
  customLabel.textContent = "Choose Files";
}

// Event listener for file input change
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const filePreview = document.getElementById("filePreview");
    const customLabel = document.querySelector(".custom-file-label");
    const maxFiles = 5;
    const existingImages =
      filePreview.querySelectorAll(".image-container").length;
    const files = event.target.files;

    // Check if adding the new files exceeds the maximum allowed number
    if (existingImages + files.length > maxFiles) {
      alert(`You can only select up to ${maxFiles} files in total.`);
      clearFileInput(); // Clear the file input using the separate function
      return;
    }

    // Update the label with the names of all selected files
    if (files.length > 0) {
      const fileNames = Array.from(files)
        .map((file) => file.name)
        .join(", ");
      customLabel.textContent = `${
        existingImages + files.length
      } file(s) selected`;
    } else if (existingImages === 0) {
      customLabel.textContent = "Choose Files";
    }

    // Display new files in the preview area while keeping existing previews
    if (files.length > 0) {
      filePreview.classList.remove("hidden");

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          // Create a container for the image and the remove button
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("image-container");

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = file.name;

          const removeButton = document.createElement("button");
          removeButton.textContent = "×";
          removeButton.classList.add("remove-button");

          // Add click event to remove the file preview
          removeButton.addEventListener("click", function () {
            imageContainer.remove();

            // Update the file input label when a preview is removed
            const remainingPreviews =
              filePreview.querySelectorAll(".image-container").length;
            customLabel.textContent =
              remainingPreviews > 0
                ? `${remainingPreviews} file(s) selected`
                : "Choose Files";

            // If no previews remain, hide the preview area
            if (remainingPreviews === 0) {
              filePreview.classList.add("hidden");
            }
          });

          // Append the image and remove button to the container
          imageContainer.appendChild(img);
          imageContainer.appendChild(removeButton);

          // Append the container to the preview area
          filePreview.appendChild(imageContainer);
        };

        reader.readAsDataURL(file);
      });
    } else if (existingImages === 0) {
      filePreview.classList.add("hidden");
    }
  });
