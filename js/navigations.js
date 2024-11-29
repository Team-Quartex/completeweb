
  function gotohome(){
    document.getElementById("saved-post-container").style.display="none";
    document.getElementById('post-container').style.display='block';
    document.getElementById('search').style.display='none';
    document.getElementById('marketplace').style.display='none';
  }

  const searchContainer = document.getElementById('search');
  const body = document.body;


  function opensearch(event) {
    const button = event.currentTarget;

    // Get button's position
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create the circular reveal effect
    const circle = document.createElement('div');
    circle.classList.add('circle-reveal');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    body.appendChild(circle);

    // Show the search container after the animation starts
    
    setTimeout(() => {
      circle.remove();
      
      
      document.getElementById('saved-post-container').style.display='none';
      document.getElementById('post-container').style.display='none';
      searchContainer.style.display = 'block';
    }, 800);
   
  }

  function closesearch() {
    searchContainer.style.display = 'none';
    document.getElementById('post-container').style.display='block';
    document.getElementById("search-results").innerHTML="";
  }
function closepostview(){
    document.getElementById("comment-viewer").style.display="none";
    
}
function openpostview(){
    document.getElementById("comment-viewer").style.display="block";   
}


function toggleActive(event) {
  // Remove .active class from all buttons
  const buttons = document.querySelectorAll('.active-btn');
  buttons.forEach(button => button.classList.remove('active-btn'));

  // Add .active class to the clicked button
  const clickedButton = event.currentTarget;
  clickedButton.classList.add('active-btn');
}

// Attach event listeners to all buttons that need the .active behavior
const allButtons = document.querySelectorAll('.button-class'); // Replace .button-class with your button class
allButtons.forEach(button => {
  button.addEventListener('click', toggleActive);
});

function openMakertPlaceMobile(){
  document.getElementById("marketplace").style.display = "block";
  document.getElementById("saved-post-container").style.display = "none";
  document.getElementById("post-container").style.display = "none";
  document.getElementById('search').style.display="none";
  loadCategory(); // Load categories
  loadProducts(); // Load products

  

}

function openSetiingsMobile() {
  document.getElementById("Settingspanel").style.width = "100vw";
}
function closeSetiings() {
  document.getElementById("Settingspanel").style.width = "0";
}
function getNotificationMobile(){
  document.getElementById("Notificaionpanel").style.width = "100vw";
  fetchNotifications()
}