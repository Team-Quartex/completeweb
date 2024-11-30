var totEarnings;
var remainingBalance;
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
  
export const sellerEarnings = async() => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:8000/api/seller/sellerearnings",
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const status = await response.json(); // Assuming the API returns JSON
    console.log(status);
    // document.getElementById('amount').innerHTML = status.earnings;
    document.getElementById('earnings-tot').innerHTML = `LKR ${status.earnings}`;
    totEarnings = status.earnings;


  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

export const sellerWithdraw = async() => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:8000/api/seller/sellerwithdraw",
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const status = await response.json(); // Assuming the API returns JSON
    
    // Provide a default value if status.total_withdraw is undefined
    const totalWithdraw = status.total_withdraw || 0;

    // Calculate the remaining balance
    const remainingBalance = totEarnings - totalWithdraw;
    // Update the HTML element with the remaining balance
    document.getElementById("amount").innerHTML = `LKR ${remainingBalance}`;

  } catch (error) {
    console.error("Error loading data:", error);
  }
}


document.getElementById('withdraw-button').addEventListener('click',(e)=>{
  e.preventDefault();
  const maxWithdraw = remainingBalance - 1000;
  const withdrawContainer = document.getElementById('withdraw-container');
  const element = `<div class="center-withdraw">
       
        <h4>Minimum Withdraw Amount LKR ${maxWithdraw}</h4>
        <input type="number"  id="withdraw-amount" placeholder="Enter the amount">
        <button id="withdraw-now">Withdraw</button>
        <button id="cancel" class="cancel-btn">Cancel</button>
      </div>`
  withdrawContainer.innerHTML = element;
  withdrawContainer.classList.add('show');

  document.getElementById('withdraw-now').addEventListener('click',(e)=>{
    e.preventDefault();
    const amount = document.getElementById('withdraw-now').value;
    addwithdraw(amount);
    withdrawContainer.classList.remove('show');
  })
  document.getElementById('cancel').addEventListener('click',(e)=>{
    e.preventDefault();
    
    withdrawContainer.classList.remove('show');
  })



})

function addwithdraw(amount){
  const data = JSON.stringify({
    "amount": amount
});

fetch("http://localhost:8000/api/seller/addwithdraw", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: data,
    credentials: "include" // Ensures cookies are sent with the request
})
.catch(error => {
    console.error('Error:', error);
});
}