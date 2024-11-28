export async function initilizeReservation() {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    // call api and get posts
    try {
        const response = await fetch(
            "http://localhost:8000/api/trova/admin/payment",
            requestOptions
        );

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const payments = await response.json(); // Assuming the API returns JSON
        console.log(payments);

        
       

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}