const input = document.querySelector("input");
const button = document.querySelector("button");
const cities = document.querySelector(".cities");

button.onclick = (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (inputValue === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "a17bc3f5ae92ad5fdbaad666100b6f23";
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  fetch(apiLink)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      console.log(data);
      ekranaBasma(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

function ekranaBasma(veri) {
  const newLi = document.createElement("li");
  newLi.classList.add("city");

  newLi.innerHTML = `
    <h2 class="city-name" data-name="${veri.name},${veri.sys.country}">
      <span>${veri.name}</span>
      <sup>${veri.sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(veri.main.temp)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="https://openweathermap.org/img/wn/${veri.weather[0].icon}@2x.png" alt="${veri.weather[0].description}">
      <figcaption>${veri.weather[0].description}</figcaption>
    </figure>
  `;

  cities.appendChild(newLi);
}
