var searchres = []

async function loadSearchs() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch("http://localhost:8000/api/search/searchall", requestOptions);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const searchs = await response.json(); // Assuming the API returns JSON

    // Ensure searchs is an array
    searchres=[];
    searchres.push(...searchs.data);
  } catch (error) {
    console.error("Error loading searches:", error);
  }
}

// Ensure `searchArray` is populated before logging or using it
document.addEventListener("DOMContentLoaded", async () => {
  await loadSearchs(); // Ensure data is loaded first // Log after data is loaded
});

// Ensure `searchArray` is populated before logging or using i

const searchBarContainer = document.getElementById("searchBarContainer");
const searchInput = document.getElementById("searchInput");
const recentSearchesContainer = document.getElementById("recentSearches");
const recentSearchList = document.getElementById("recentSearchList");

// Populate Recent Searches
function populateRecentSearches(filterword = "") {
  recentSearchList.innerHTML = ""; // Clear previous list

  // Step 1: Use the updated searchArray
  const restags = searchres;

  // Step 2: Filter the top words based on the input filter word
  const filteredWords = restags.filter((word) =>
    word.name.toLowerCase().includes(filterword.toLowerCase())
  );

  // Step 3: Limit the filtered results to the top 4
  const limitedSearches = filteredWords.slice(0, 4);

  // Step 4: Create and populate the list items for filtered words
  limitedSearches.forEach((search, index) => {
    const li = document.createElement("li");
    var image = search.type === "post" ? search.image : `http://127.0.0.1:8000/uploads/${search.image}`;
    li.innerHTML = `
      <img src="${image}" alt="Search ${index + 1}">
      <div class="recent-search-info">
          <div class="recent-search-name">${search.name}</div>
          <div class="recent-search-extra">${search.content}</div>
      </div>
    `;

    // Handle click event for each item
    li.addEventListener("click", () => {
      searchInput.value = search.name; // Set search input value to the clicked word
      hideRecentSearches(); // Optionally hide recent searches when clicked
    });

    recentSearchList.appendChild(li); // Add the list item to the DOM
  });
}

// Event listener for the search input field
searchInput.addEventListener("input", (event) => {
  const filter = event.target.value; // Get the current input value
  populateRecentSearches(filter); // Update the results based on the input value
});

// Show Recent Searches
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
