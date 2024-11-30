function scrollCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const scrollAmount = carousel.offsetWidth / 2; // Scroll half the visible width
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }