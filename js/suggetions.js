import { addFollow } from "./follow.js";
import {loadPost} from './post.js'
import { showUserprofile } from "./profileview.js";

export const loadsuggestions = async () => {
  console.log("hi211");
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
    console.log(suggestionsData);
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";
    suggestions.innerHTML = "<h3>Suggestions</h3>";
    // Clear any existing content

    suggestionsData.forEach((user) => {
      const suggestElement = document.createElement("div");
      suggestElement.classList.add("suggestion");
      suggestElement.dataset.user = user.userid;
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
            <button class="follow-button" data-userid="${user.userid}">Follow</button>
        `;

      suggestions.appendChild(suggestElement);
    });
    document.querySelectorAll(".follow-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const userId = button.dataset.userid;
        addFollow(userId);
        loadsuggestions();
        document.querySelectorAll(".follow-btn").forEach((button) => {
          if (button.dataset.user === userId) {
            button.classList.add("hidden");
          }
        });
        var count =
          parseInt(document.getElementById("user-following-count").innerHTML) +
          1;
        document.getElementById("user-following-count").innerHTML = count;
        loadPost();
      });
    });

    document.querySelectorAll(".suggestion").forEach((user) => {
      user.addEventListener("click", (event) => {
        event.stopPropagation();
        const userId = user.dataset.user;
        console.log(userId);
        showUserprofile(userId);
      });
    });
  } catch (error) {
    console.error("Error loading suggestions:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadsuggestions();
});

document.getElementById('user-profile-click').addEventListener('click',()=>{
  showUserprofile(document.getElementById("hidden-id").innerHTML)
})