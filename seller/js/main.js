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

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");
    dayElement.textContent = day;
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
