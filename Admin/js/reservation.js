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

        const resrvationHolder = document.getElementById('reservation-table');
        resrvationHolder.innerHTML="";

        payments.forEach((payment) => {
            const row = `
            <tr>
                <td>${payment.userName}</td>
                <td>${payment.sellerName}</td>
                <td>${payment.productName}</td>
                <td>${payment.quantity}</td>
                <td>${payment.totPrice}</td>
                <td>${payment.commission}</td>
            </tr>
            `
            resrvationHolder.innerHTML += row;
        });
       

    } catch (error) {
        console.error("Error loading posts:", error);
    }
}