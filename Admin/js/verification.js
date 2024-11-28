export async function initilizeRequest() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            "http://localhost:8000/api/trova/admin/verification",
            requestOptions
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const requests = await response.json(); // Assuming the API returns JSON
        console.log(requests);

        const requestHolder = document.getElementById('verification-row');
        requestHolder.innerHTML = "";

        requests.forEach((request) => {
            const row = `
            <tr>
              <td>${request.username}</td>
              <td>${request.description}</td>
              <td>
                <a href="${request.ytlink}">Yotube</a><br />
                <a href="${request.fblink}">Facbook</a><br />
                <a href="${request.twitterlink}">Instergram</a><br />
              </td>
              <td class="verification-btns">
                <div class="verification-actions">
                  <a class="action-btn approve-btn" data-id="${request.requestId}" data-userid="${request.userId}">
                    <i class="fi fi-ss-check-circle" style="font-size: 30px"></i>
                  </a>
                  <a class="action-btn decline decline-btn" data-id="${request.requestId}">
                    <i class="fi fi-ss-cross-circle" style="font-size: 30px"></i>
                  </a>
                </div>
              </td>
            </tr>
            `;

            requestHolder.innerHTML += row;
        });
        requestHolder.addEventListener('click', (e) => {
            if (e.target.closest('.approve-btn')) {
                const requestId = e.target.closest('.approve-btn').dataset.id;
                const userId = e.target.closest('.approve-btn').dataset.userid;
                console.log(`Approve clicked for requestId: ${requestId} + ${userId}`);
                approve(requestId,userId);
            }

            if (e.target.closest('.decline-btn')) {
                const requestId = e.target.closest('.decline-btn').dataset.id;
                console.log(`Decline clicked for requestId: ${requestId}`);
                decline(requestId);
            }
        });

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

async function approve(requestId,userid){
    const updateResponse = await fetch(
        "http://localhost:8000/api/trova/admin/request/approve",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            userid:userid,
            requestId:requestId,
          }),
        }
      );

      // Check if the second API request was successful
      if (updateResponse.ok) {
        await initilizeRequest()
      } else {
        console.error(
          "Error while posting data to addPost:",
          updateResponse.statusText
        );
      }
}

async function decline(requestId){
    const updateResponse = await fetch(
        "http://localhost:8000/api/trova/admin/request/decline",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            requestId:requestId,
          }),
        }
      );

      // Check if the second API request was successful
      if (updateResponse.ok) {
        await initilizeRequest()
      } else {
        console.error(
          "Error while posting data to addPost:",
          updateResponse.statusText
        );
      }
}