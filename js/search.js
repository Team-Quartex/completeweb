// importing post render module
import { renderPosts } from "./renderposts.js";
// varibale of search resualt
var searchres = [];

// get searcj resault
async function loadSearchs() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(
      "http://localhost:8000/api/search/searchall",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const searchs = await response.json(); // Assuming the API returns JSON
    searchres = [];
    searchres.push(...searchs.data);
  } catch (error) {
    console.error("Error loading searches:", error);
  }
}

// Ensure `searchArray` is populated before logging or using it
document.addEventListener("DOMContentLoaded", async () => {
  await loadSearchs();
});

// Search Variables

const searchBarContainer = document.getElementById("searchBarContainer");
const searchInput = document.getElementById("searchInput");
const recentSearchesContainer = document.getElementById("recentSearches");
const recentSearchList = document.getElementById("recentSearchList");

// when click show recents searchs
function populateRecentSearches(filterword = "") {
  recentSearchList.innerHTML = ""; // Clear previous list

  const filteredWords = searchres.filter(
    (
      word // filter words
    ) => word.name.toLowerCase().includes(filterword.toLowerCase())
  );

  const limitedSearches = filteredWords.slice(0, 4); // Limit the filtered results to the top 4

  // Create and populate the list items for filtered words
  limitedSearches.forEach((search, index) => {
    const li = document.createElement("li");
    li.classList.add("search-data");
    var image =
      search.type === "post"
        ? search.image
        : `http://127.0.0.1:8000/uploads/${search.image}`;
    li.setAttribute("data-type", search.type);
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
      if (li.dataset.type === "post") {
        showSuggestPost(search.name);
      }
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

// // Hide Recent Searches
function hideRecentSearches() {
  recentSearchesContainer.style.display = "none";
  searchBarContainer.classList.remove("expanded");
}

// Event Listeners
searchInput.addEventListener("focus", showRecentSearches);
searchInput.addEventListener("blur", () => {
  setTimeout(hideRecentSearches, 150);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("hi");
    const search = searchInput.value;
    hideRecentSearches();
    showSuggestPost(search);
  }
});

async function showSuggestPost(search) {
  const searchRes = document.getElementById("search-results");
  searchRes.innerHTML = "";
  const queryParams = new URLSearchParams({
    search: search,
  });
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(
      "http://localhost:8000/api/search/searchquey?" + queryParams,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const searchs = await response.json(); // Assuming the API returns JSON
    console.log(searchs.data);
    var arraySearch = searchs.data;
    if(search===""){
      arraySearch = shuffleArray(arraySearch)
    }
    // Get the feed container
    const mainContent = document.getElementById("search-results");
    renderPosts(arraySearch, mainContent);
    // Ensure searchs is an array
    console.log(searchs);
  } catch (error) {
    console.error("Error loading searches:", error);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   showSuggestPost("");
// });

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


document.querySelectorAll('.search-btn-click').forEach((searchBtn)=>{
  searchBtn.addEventListener('click',()=>{
    showSuggestPost("");
  })
})