document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
  
    function scrollToImage(index) {
      if (index < 0) {
        index = images.length - 1;
      } else if (index >= images.length) {
        index = 0;
      }
      
      images[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      
      currentIndex = index;
    }
  
    prevButton.addEventListener('click', () => {
      scrollToImage(currentIndex - 1);
    });
  
    nextButton.addEventListener('click', () => {
      scrollToImage(currentIndex + 1);
    });
  
    // Thumbnail click functionality
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        scrollToImage(index);
      });
    });
  
    // Optional: Auto-scroll functionality
    function autoScroll() {
      scrollToImage(currentIndex + 1);
    }
  
    // Uncomment the next line to enable auto-scrolling every 5 seconds
    // setInterval(autoScroll, 5000);
  });
  
  

