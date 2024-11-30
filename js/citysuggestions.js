import {cityData} from '../resource/city.js'

const citySearch = document.getElementById('citySearch');
const citysuggestions = document.getElementById('city-suggestions');
console.log('hi')

// List of cities (you can replace this with data from an API)
const cities = Object.values(cityData).flatMap(district => district.cities);
// Function to display suggestions
const showSuggestions = (query) => {
    console.log('hi')
    citysuggestions.innerHTML = ''; // Clear previous suggestions
    if (!query) return; // Don't show suggestions for empty input

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
    );

    filteredCities.forEach(city => {
        
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = city;
        suggestionItem.addEventListener('click', () => {
            citySearch.value = city; // Set the input value to the clicked suggestion
            citysuggestions.innerHTML = ''; // Clear suggestions
        });
        citysuggestions.appendChild(suggestionItem);
    });

    // Show "No results found" if no cities match
    if (filteredCities.length === 0) {
        const noResult = document.createElement('div');
        noResult.textContent = 'No results found';
        noResult.style.color = '#999';
        citysuggestions.appendChild(noResult);
    }
};

// Event listener for input
citySearch.addEventListener('input', () => {
    const query = citySearch.value.trim();
    showSuggestions(query);
});

// Event listener for outside click to close suggestions
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
        citysuggestions.innerHTML = '';
    }
});
