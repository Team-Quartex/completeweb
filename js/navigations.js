
  function gotohome(){
    document.getElementById("saved-post-container").style.display="none";
    document.getElementById('post-container').style.display='block';
    document.getElementById('search').style.display='none';
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
  }
function closepostview(){
    document.getElementById("comment-viewer").style.display="none";
    
}
function openpostview(){
    document.getElementById("comment-viewer").style.display="block";
    
}

