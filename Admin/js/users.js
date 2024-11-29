export async function initilizeUser() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            "http://localhost:8000/api/trova/admin/users",
            requestOptions
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const users = await response.json(); // Assuming the API returns JSON
        console.log(users);

        const userHolder = document.getElementById('user-table');
        userHolder.innerHTML="";

        users.forEach((user) => {
            const row = `
            <tr class="seller-view" data-userid="${user.userid}" data-name="${user.username}">
                <td>${user.username}</td>
                <td>${user.email}</td>
            </tr>
            `
            userHolder.innerHTML += row;
            
        }); 
        userHolder.addEventListener('click',(e)=>{
            const userid = e.target.closest('.seller-view').dataset.userid;
            const userName = e.target.closest('.seller-view').dataset.name;
            viewPost(userid,userName);
            document.getElementById('view-user').style.display="block";
        })
       

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

async function viewPost(userid,username){
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            `http://localhost:8000/api/trova/admin/userpost?uid=${userid}`,
            requestOptions
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const userspost = await response.json(); // Assuming the API returns JSON
        console.log(userspost);

        const postHolder = document.getElementById('item-viewer-scroller1');
        console.log(postHolder.innerHTML);
        postHolder.innerHTML= "";
        console.log(postHolder.innerHTML);
        document.getElementById('userName1').innerHTML = username;
        userspost.forEach((post) => {

            var imageConatiner = "";
            post.images.forEach((image)=>{
                imageConatiner += `<img src="http://127.0.0.1:8000/uploads/${image}" alt="" />`
            })

            const postElement = `<div class="post-view-container">
              <div class="post-image">
                <div class="post-image-container">
                  ${imageConatiner}
                </div>

                <div class="item-details">
                  <p> ${post.description}
                  </p>
                </div>
              </div>
            </div>`

            postHolder.innerHTML+=postElement;
        });

        
       

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}