//Fetch Data from json server//
async function fetchCars() {
    const response = await fetch('http://localhost:3000/cars');
    return await response.json();
  }
  // DRY helper function
  function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p>Year: ${car.year}</p>
      <p>Horsepower: ${car.horsepower}</p>
      <button class="like-btn"></button>
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
// Event Listeners (3 Distinct Types)
document.addEventListener('DOMContentLoaded', async () => { // 1. DOMContentLoaded
  const cars = await fetchCars();
  renderCars(cars);
});

document.getElementById('search-form').addEventListener('submit', async (e) => { // 2. Submit
  e.preventDefault();
  const query = document.getElementById('search-input').value;
  const cars = await fetchCars(query);
  renderCars(cars);
});

document.getElementById('theme-toggle').addEventListener('click', () => { // 3. Click
  document.body.classList.toggle('dark-mode');
  const button = document.getElementById('theme-toggle');
  button.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});
//Array Iteration (filter + map)
function renderCars(cars) {
  const grid = document.getElementById('cars-grid');
  grid.innerHTML = '';

  cars
    .filter(car => car.make && car.model) // Filter invalid entries
    .map(car => createCarCard(car))      // Map to DOM elements
    .forEach(card => grid.appendChild(card));
}
//Event Delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('like-btn')) {
    e.target.classList.toggle('liked');
  }
});