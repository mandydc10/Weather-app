/*------- Current date and time functions -------*/
//Get current date/time and show day and time in header
function displayDayInfo(now) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[now.getDay()];
  let hours = addZero(now.getHours());
  let minutes = addZero(now.getMinutes());

  let timeDate = document.querySelector("#time-day-date");
  timeDate.innerHTML = `${day} ${hours}:${minutes}`;
}

let now = new Date();
displayDayInfo(now);

/*------- 'Show My Location' Button Function -------*/
// Get user's current location coordinates
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(getWeatherDataFromGeocode);
}

//Use coordinates of current location and run new API call for weather data
function getWeatherDataFromGeocode(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${apiBase}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  
  axios.get(`${apiUrl}`).then(updateCurrentWeather);
}

/*---------------- Search Function ---------------*/
//Prevent "submit" default functions and run API call with search query as parameter
function getCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  let city = searchInput.value;

  search(city);
  searchInput.value = "";
}

function search(city) {
  let apiUrl = `${apiBase}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(getWeatherDataFromCityCoords);
  
}

//Get coordinates of search city and run new API call for weather data 
function getWeatherDataFromCityCoords(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiUrl = `${apiBase}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
 
  axios.get(`${apiUrl}`).then(updateCurrentWeather);
}

/*-------------- Update Current Weather --------------*/
// Update main weather elements with live weather data
function updateCurrentWeather(response) {
  console.log(response);
  let cityHeader = document.querySelector("#city-name");
  let locationName = response.data.name;
  let locationCountry = response.data.sys.country;
  let temperatureElement = document.querySelector("#temp");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let weatherDescription = response.data.weather[0].main;
  let iconElement = document.querySelector("#current-city-weather-emoji");
  let icon = response.data.weather[0].icon;
  let celsiusElement = document.querySelector("#celsius");
  let fahrenheitElement = document.querySelector("#fahrenheit");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  cityHeader.innerHTML = `${locationName}, ${locationCountry}`;
  celsiusElement.classList.remove("inactive");
  fahrenheitElement.classList.add("inactive");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

/*------- Temperature Units Conversion  -----*/
//Change from celsius to fahrenheit on click
function convertToFahrenheit() {
  let tempElement = document.querySelector("#temp");
  let celsiusElement = document.querySelector("#celsius");
  let fahrenheitElement = document.querySelector("#fahrenheit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;

  fahrenheitElement.classList.remove("inactive");
  celsiusElement.classList.add("inactive");
  tempElement.innerHTML = Math.round(fahrenheitTemperature); /* ?"(x°F − 32) × 5/9 = °C */
}

//Change from fahrenheit to celsius on click
function convertTocelsius() {
  let tempElement = document.querySelector("#temp");
  let celsiusElement = document.querySelector("#celsius");
  let fahrenheitElement = document.querySelector("#fahrenheit");

  celsiusElement.classList.remove("inactive");
  fahrenheitElement.classList.add("inactive");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

// Global variables  
let apiKey = "57f68c3670fb17e844897ccb04baf20f";
let units = "metric";
let apiBase = "https://api.openweathermap.org/data/2.5/weather?";
let celsiusTemperature = null;

search("Perth");

// Run Search
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", getCityName);

// Run my Location button
let button = document.querySelector("#my-location-button");
button.addEventListener("click", getUserLocation);

// Run units conversion
fahrenheit.addEventListener("click", convertToFahrenheit);
celsius.addEventListener("click", convertTocelsius);

/*----- Five Day Forecast ------*/
// One Call API
// https://api.openweathermap.org/data/2.5/onecall?lat=20.7503&lon=-156.5003&exclude=minutely,hourly&units=metric&appid=57f68c3670fb17e844897ccb04baf20f

