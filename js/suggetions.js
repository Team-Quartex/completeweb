async function loadsuggestions() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
  
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/topusers",
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
  
      const suggestionsData = await response.json(); // Assuming the API returns JSON
  
      const suggestions = document.getElementById("suggestions");
  
      // Clear any existing content
  
      suggestionsData.forEach((user) => {
        const suggestElement = document.createElement("div");
        suggestElement.classList.add("suggestion");
        suggestElement.innerHTML = `
          <img
            src="http://127.0.0.1:8000/uploads/${user.profilepic}"
              alt="${user.profilepic}"
              class="suggestion-avatar"
            />
            <div class="suggestion-info">
              <div class="suggestion-name">${user.name}</div>
              <div class="suggestion-handle">${user.username}</div>
            </div>
            <button class="follow-button">Follow</button>
        `

        suggestions.appendChild(suggestElement)
      });
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  }
  
  loadsuggestions();
  