let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentDate = currentTime.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[currentTime.getMonth()];

let current = `${currentDay}, ${currentDate}th ${currentMonth} ${currentYear}.`;
let currentDates = document.querySelector("#date");
currentDates.innerHTML = current;

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let time = `${hours}:${minutes}`;
let hin = document.querySelector("#clock");
hin.innerHTML = time;

function currentTemperature(response) {
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${wind} Kts`;
  let humidity = response.data.main.humidity;
  let humidityValue = document.querySelector("#humid");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let weatherType = response.data.weather[0].description;
  let h4 = document.querySelector("h4");
  h4.innerHTML = weatherType;
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#main-temp");
  temp.innerHTML = temperature;
}

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
  let apiKey = "57c341795e71e4a5d113d1cd9d27ad8e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemperature);
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", cityName);

function localTemperature(response) {
  let city = response.data.name;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${wind} Kts`;
  let humidity = response.data.main.humidity;
  let humidityValue = document.querySelector("#humid");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let weatherType = response.data.weather[0].description;
  let h4 = document.querySelector("h4");
  h4.innerHTML = weatherType;
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
  let localTemp = Math.round(response.data.main.temp);
  let local = document.querySelector("#main-temp");

  local.innerHTML = localTemp;
}

function retreivePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "57c341795e71e4a5d113d1cd9d27ad8e";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey2}`;
  axios.get(apiUrl2).then(localTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retreivePosition);
}
let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
