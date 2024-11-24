document
  .getElementById("notification-panel-button")
  .addEventListener("click", () => {
    document.getElementById("Notificaionpanel").style.width = "28.0vw";
    fetchNotifications()
  });

export async function fetchNotifications() {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  // call api and get posts
  try {
    const response = await fetch(
      "http://localhost:8000/api/notification",
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const notifications = await response.json(); // Assuming the API returns JSON
    console.log(notifications);
    renderNotifications(notifications);
    // Get the feed container
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

export function renderNotifications(notifications) {
  const mainPanel = document.getElementById("notification-scroller");
  mainPanel.innerHTML = "";
  notifications.forEach((notification, index) => {
    const notifyElement = document.createElement("div");
    notifyElement.classList.add("notifications");
    var icon = "";
    var description = "";
    switch (notification.notifytype) {
      case "like":
        icon = `<i class="fi fi-sr-heart"
                    style="color:  #ff2f00;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i>`;
        description = `Liked on your post`
        break;
      case "comment":
        icon = `<i class="fi fi-sr-comment-dots"
                    style="color:  #238688;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i>`;
        description = `Commented on your post`
        break;
      case "follow":
        icon = `<i class="fi fi-sr-user"
                    style="color:  #006eff;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i>`;
        description = `Started to follow you`
        break;
      case "share":
        icon = `<i class="fi fi-sr-share"
                    style="color:  #009dff;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i>`;
        description = `Shared your post`
        break;
      default:
        break;
    }

    notifyElement.innerHTML = `
        
            <div class="usr-notify-details">
            <div class="image-and-icon">
              <img src="http://127.0.0.1:8000/uploads/${notification.profilepic}" alt>
              <div class="icon-indicator">
                <span class="notify-icon">${icon}</i>
                </span>
              </div>
            </div>
            <div class="notification-text">
              <h2>${notification.name}</h2>
              <span>${description}</span>
            </div>
          </div>
          ${notification.isView==="no"?`<div class="new-indicator"></div>`:``}
        
        `;
    mainPanel.appendChild(notifyElement);
  });
  pushview()
}

export async function pushview() {
    const requestOptions = {
      method: "POST",
      credentials: "include",
    };
    // call api and get posts
    try {
      const response = await fetch(
        "http://localhost:8000/api/notification/viewnotification",
        requestOptions
      );
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }