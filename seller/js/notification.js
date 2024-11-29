document.getElementById('notification-panel').addEventListener('click', () => {
    document.getElementById("mySidepanel").style.width = "30vw";
    updateNotification()
});

async function updateNotification() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            "http://localhost:8000/api/notification/seller",
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

function renderNotifications(notifications) {
    const notificationHolder = document.getElementById('notification-scroller');
    notificationHolder.innerHTML = "";
    var img="";
    var icon = "";
    var description = "";
    notifications.forEach((notification) => {
        switch (notification.notification_type) {
            case "reserve":
                img=`http://127.0.0.1:8000/uploads/${notification.profilepic}`
                icon = `<span class="notify-icon"><i class="fi fi-ss-order-history"
                  style="color:  #0c664c;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i></span>`
                description = `<div class="notification-text">
                                    <h2>${notification.name}</h2>
                                    <span>Ordered </span><span>${notification.product}</span>
                                    <div class="detail-text">
                                    <span>QTY ${notification.qtyorrate}</span>
                                    <span>Date-  ${notification.reserveDate}</span>
                                    </div>
                                </div>`
                break;
            case "review":
                break;
            case "product":
                img=`http://127.0.0.1:8000/uploads/${notification.productImage}`
                if(notification.qtyorrate===0){
                    icon =`<span class="notify-icon"><i class="fi fi-ss-pending"
                  style="color:  #ffb700;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i></span>`;
                  description =`<div class="notification-text">
                                    <h2>Team Quartex</h2>
                                    <div class="item-detail"></div>
                                    <span>Your ${notification.product} is pending to approve</span>
                                </div>`
                }else if(notification.qtyorrate===1){
                    icon=`<span class="notify-icon"><i class="fi fi-ss-vote-nay"
                  style="color:  #a10010;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i></span>`;
                  description =`<div class="notification-text">
                                    <h2>Team Quartex</h2>
                                    <div class="item-detail"></div>
                                    <span>Your ${notification.product} has been declined</span>
                                </div>`
                }else{
                    icon = `<span class="notify-icon"><i class="fi fi-ss-check-circle"
                  style="color:  #00A389;font-size:20px;padding: 8px; background-color: #fff; border-radius: 50%;"></i></span>`;
                  description =`<div class="notification-text">
                                    <h2>Team Quartex</h2>
                                    <div class="item-detail"></div>
                                    <span>Your ${notification.product} has been approved</span>
                                </div>`
                }
                
            default:
                break;
        }

        const notificationContainer = `
        <div class="notifications">
        <div class="usr-notify-details">
          <div class="image-and-icon">
            <img src="${img}" alt="">
            <div class="icon-indicator">
                ${icon}
            </div>
          </div>
          ${description}
        </div>
        ${notification.isView==="no"?`<div class="new-indicator"></div>`:``}
      </div>
      `

      notificationHolder.innerHTML += notificationContainer;
    });
    pushview();
};

async function pushview() {
    const requestOptions = {
      method: "POST",
      credentials: "include",
    };
    // call api and get posts
    try {
      const response = await fetch(
        "http://localhost:8000/api/notification/setviewseller",
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