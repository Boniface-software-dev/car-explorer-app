//Fetch Data from json server//
async function fetchCars() {
    const response = await fetch('http://localhost:3000/cars');
    return await response.json();
  }
  // (Don't Repeat Yourself) DRY helper function
  function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
       <img src="${car.image}" alt="${car.make} ${car.model}">
    <h3>${car.make} ${car.model} (${car.year})</h3>
    
    <!-- Performance Specs -->
    <div class="specs">
      <p><strong>${car.performance.fuel_type}</strong> | 
      ${car.performance.horsepower} | 
      ${car.performance.drive_type}</p>
      <p>${car.performance.engine} • ${car.performance.transmission}</p>
    </div>

    <!-- Design & Safety -->
    <div class="design">
      <p>Body: ${car.design.body_type} | Seats: ${car.design.seating_capacity}</p>
      <p>Colors: ${car.design.colors.join(', ')}</p>
      ${car.design.safety_rating ? `<p>Safety: ${car.design.safety_rating}</p>` : ''}
    </div>

    <!-- Features -->
    <div class="features">
      <h4>Key Features:</h4>
      <ul>${car.design.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>

    <!-- Dealer Info -->
    <div class="dealer">
      <p>Sold by: <a href="${car.dealer.website}" target="_blank">${car.dealer.name}</a></p>
      <p> ${car.dealer.location} | ☎ ${car.dealer.contact}</p>
    </div>

      <button class="like-btn">❤️</button>
    `;
    return card;
  }
  
  async function fetchCars(query = '') {
    try {
      const response = await fetch(`http://localhost:3000/cars?q=${query}`);
      const cars = await response.json();
      return cars;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }
// Event Listeners (Load, Submit, Click)
document.addEventListener('DOMContentLoaded', async () => { // 1. Load
  const cars = await fetchCars();
  renderCars(cars);
});

document.getElementById('search-form').addEventListener('submit', async (e) => { // 2. Submit
  e.preventDefault();
  const query = document.getElementById('search-input').value;
  const cars = await fetchCars(query);
  renderCars(cars);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const button = document.getElementById('theme-toggle');
  button.textContent = document.body.classList.contains('dark-mode') 
    ? 'Light Mode' 
    : 'Dark Mode';
});
//Array Iteration (Filter out cars without make and model)
function renderCars(cars) {
  const grid = document.getElementById('cars-grid');
  grid.innerHTML = '';

  cars
    .filter(car => car.make && car.model) // Filter out cars without make and model
    .map(car => createCarCard(car))      
    .forEach(card => grid.appendChild(card));
}
//Dynamic like button click handling
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('like-btn')) {
    e.target.classList.toggle('liked');
  }
});