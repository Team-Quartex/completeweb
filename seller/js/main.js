document.addEventListener('DOMContentLoaded',()=>{
  fetch('http://localhost:8000/api/check-cookie-seller', {
    method: 'GET',
    credentials: 'include'  // Sends cookies with the request
})
.then(response => response.json())
.then(data => {
    if (data.cookieFound) {
    } else {
        window.location.href = 'login.html' ;
    }
})
.catch(error => window.location.href = 'login.html');
})



feather.replace();

const calendarGrid = document.getElementById("calendarGrid");
const currentMonthElement = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

let currentDate = new Date();

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentMonthElement.textContent = new Date(year, month, 1).toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  );

  calendarGrid.innerHTML = "";

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-weekday");
    dayElement.textContent = day;
    calendarGrid.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day");
    calendarGrid.appendChild(emptyDay);
  }
  const today = new Date(); // Get today's date
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");
    dayElement.textContent = day;
    if (year === todayYear && month === todayMonth && day === todayDate) {
      dayElement.classList.add("selected");
      showDateReservation(`${todayYear}-${todayMonth}-${todayDate}`)
    }
    dayElement.addEventListener("click", () => selectDay(dayElement));
    calendarGrid.appendChild(dayElement);
  }
}

function selectDay(dayElement) {
  const selectedDay = document.querySelector(".calendar-day.selected");
  if (selectedDay) {
    selectedDay.classList.remove("selected");
  }
  dayElement.classList.add("selected");

  // Retrieve selected day, month, and year
  const day = dayElement.textContent.padStart(2, "0"); // Ensure two digits for the day
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for the month

  // Format the selected date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate); // Print in YYYY-MM-DD format
  showDateReservation(formattedDate);
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

// Tab functionality
const navItems = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const tabId = item.getAttribute("data-tab");

    navItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");

    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
  });
});

async function showDateReservation(date) {
  try {
    // Define query parameters
    const queryParams = new URLSearchParams({ date }).toString();
    const requestOptions = {
      method: "GET", // Adjust if you're using a different HTTP method
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    // Await the fetch call
    const response = await fetch(
      `http://localhost:8000/api/reservation/sellerdate?${queryParams}`,
      requestOptions
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }

    // Await the JSON parsing
    const details = await response.json();
    updateTable(details);
  } catch (error) {
    console.error("Error loading reservations:", error);
  }
}

function updateTable(data) {
  const table = document.getElementById("details-table").querySelector("tbody");
  table.innerHTML = "";
  if(data.length===0){
    const rowElement = document.createElement("tr");
    rowElement.innerHTML = `
      <th colspan="7" style="text-align:center">No reservation Available</th>
    `;
    table.appendChild(rowElement);
  } 
  else{
    data.forEach((detail) => {
      const rowElement = document.createElement("tr");
      rowElement.innerHTML = `
        <th>${detail.userName}</th>
        <th>${detail.productName}</th>
        <th>${detail.qty}</th>
        <th>${detail.price}</th>
        <th>${detail.email}</th>
        <th>Description</th>
        <th>${detail.status}</th>
      `;
  
      table.appendChild(rowElement)
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  
  
});