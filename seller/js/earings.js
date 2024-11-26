export const fetchrentDetails = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
  
    try {
      const response = await fetch(
        "http://localhost:8000/api/seller/sellerstatus",
        requestOptions
      );
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const status = await response.json(); // Assuming the API returns JSON
      console.log(status);
  
      const rentDetailsTable = document
        .getElementById("rented-details-table")
        .querySelector("tbody");
      rentDetailsTable.innerHTML = ""; // Clear previous rows
  
      if (status.length === 0) {
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
          <th colspan="6" style="text-align:center">No reservation Available</th>
        `;
        rentDetailsTable.appendChild(rowElement); // Append to rentDetailsTable
      } else {
        status.forEach((state) => {
          const rowElement = document.createElement("tr");
          rowElement.innerHTML = `
            <th>${state.productName}</th>
            <th>${state.rentedCount}</th>
            <th>${state.totalQuantity}</th>
            <th>${state.totalPrice}</th>
            <th>${state.commission}</th>
            <th>${state.netTotal}</th>
          `;
  
          rentDetailsTable.appendChild(rowElement); // Append to rentDetailsTable
        });
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };
  