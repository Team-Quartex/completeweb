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
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
            </tr>
            `
            userHolder.innerHTML += row;
        });
       

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}