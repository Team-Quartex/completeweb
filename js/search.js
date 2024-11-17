function opensearch(){
    document.getElementById("search").style.display="block";
    document.getElementById("post-container").style.display="none";
}
function closesearch(){
    document.getElementById("search").style.display="none";
    document.getElementById("post-container").style.display="block";
}

// Simulated Recent Searches Data
const recentSearchesData = [
    {
      name: "John Doe",
      profileImage: "https://via.placeholder.com/40",
      extraInfo: "Friend · 5 mutual friends"
    },
    {
      name: "Jane Smith",
      profileImage: "https://via.placeholder.com/40",
      extraInfo: "Page · 120K followers"
    },
    {
      name: "Cooking Recipes",
      profileImage: "https://via.placeholder.com/40",
      extraInfo: "Group · 50K members"
    },
    {
      name: "Michael Johnson",
      profileImage: "https://via.placeholder.com/40",
      extraInfo: "Friend · 2 mutual friends"
    }
  ];

  const searchBarContainer = document.getElementById("searchBarContainer");
  const searchInput = document.getElementById("searchInput");
  const recentSearchesContainer = document.getElementById("recentSearches");
  const recentSearchList = document.getElementById("recentSearchList");

  // Populate Recent Searches
  function populateRecentSearches() {
    recentSearchList.innerHTML = ""; // Clear previous list
    recentSearchesData.forEach((search) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${search.profileImage}" alt="${search.name}">
        <div class="recent-search-info">
          <div class="recent-search-name">${search.name}</div>
          <div class="recent-search-extra">${search.extraInfo}</div>
        </div>
      `;
      li.addEventListener("click", () => {
        searchInput.value = search.name;
        hideRecentSearches();
      });
      recentSearchList.appendChild(li);
    });
  }

  // Show Recent Searches on Focus
  function showRecentSearches() {
    populateRecentSearches();
    recentSearchesContainer.style.display = "block";
    searchBarContainer.classList.add("expanded");
  }

  // Hide Recent Searches
  function hideRecentSearches() {
    recentSearchesContainer.style.display = "none";
    searchBarContainer.classList.remove("expanded");
  }

  // Event Listeners
  searchInput.addEventListener("focus", showRecentSearches);
  searchInput.addEventListener("blur", () => {
    setTimeout(hideRecentSearches, 150); // Delay for item click
  });