document.addEventListener("DOMContentLoaded", () => {
    fetchCars();
});

function fetchCars() {
    fetch("http://localhost:3000/cars") // Replace with API URL if using public API
        .then(response => response.json())
        .then(cars => displayCars(cars));
}

function displayCars(cars) {
    const carList = document.getElementById("car-list");
    carList.innerHTML = "";
    cars.forEach(car => {
        const carDiv = document.createElement("div");
        carDiv.innerHTML = `
            <h3>${car.name}</h3>
            <img src="${car.image}" alt="${car.name}">
            <p>Likes: <span id="likes-${car.id}">${car.likes}</span></p>
            <button onclick="likeCar(${car.id})">Like</button>
        `;
        carList.appendChild(carDiv);
    });
}

function likeCar(id) {
    const likesSpan = document.getElementById(`likes-${id}`);
    let newLikes = parseInt(likesSpan.textContent) + 1;

    fetch(`http://localhost:3000/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes })
    })
    .then(() => {
        likesSpan.textContent = newLikes;
    });
}
