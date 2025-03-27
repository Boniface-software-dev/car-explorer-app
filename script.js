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
