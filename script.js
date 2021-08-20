alert("Hello");

//1 date
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = days[now.getDay()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${date} ${hours}:${minutes}`;

//2

function showTemperature(response) {
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let city = document.querySelector("#search-city");
  city.innerHTML = cityName.value;

  let apiKey = "6ae7786e7bcd9d13b3ba2b1ffd5d527d";
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(url1).then(showTemperature);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6ae7786e7bcd9d13b3ba2b1ffd5d527d";
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url2).then(getWeatherResponse);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getWeatherResponse(response) {
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = `Wind: ${windSpeed}km/h`;
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  document.querySelector("#city").innerHTML = cityName;

  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let element = document.querySelector("#current-button");
element.addEventListener("click", getCurrentLocation);
