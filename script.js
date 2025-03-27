//Fetch Data from json server//
async function fetchCars() {
    const response = await fetch('http://localhost:3000/cars');
    return await response.json();
  }
  