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
function getCityObject(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  let city = searchInput.value;
  let apiUrl = `${apiBase}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(`${apiUrl}`).then(getWeatherDataFromCityName);
}

//Get coordinates of search city and run new API call for weather data 
function getWeatherDataFromCityName(response) {
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

  celciusTemperature = response.data.main.temp;

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}`;
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  cityHeader.innerHTML = `${locationName}, ${locationCountry}`;
}

/*------- Temperature Units Conversion Functions -----*/
//Change from celcius to fahrenheit on click
function convertToFahrenheit() {
  let tempElement = document.querySelector("#temp");
  let celciusElement = document.querySelector("#celcius");
  let fahrenheitElement = document.querySelector("#fahrenheit");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 +32;

  fahrenheitElement.classList.remove("inactive");
  celciusElement.classList.add("inactive");
  tempElement.innerHTML = Math.round(fahrenheitTemperature); /*(x°F − 32) × 5/9 = °C */
}

//Change from fahrenheit to celcius on click
function convertToCelcius() {
  let tempElement = document.querySelector("#temp");
  let celciusElement = document.querySelector("#celcius");
  let fahrenheitElement = document.querySelector("#fahrenheit");

  celciusElement.classList.remove("inactive");
  fahrenheitElement.classList.add("inactive");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

// Global variables  
let apiKey = "57f68c3670fb17e844897ccb04baf20f";
let units = "metric";
let apiBase = "https://api.openweathermap.org/data/2.5/weather?";
let celciusTemperature = null;

// Run Search
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", getCityObject);

// Run my Location button
let button = document.querySelector("#my-location-button");
button.addEventListener("click", getUserLocation);

// Run units conversion
fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", convertToCelcius);

/*----- Five Day Forecast ------*/
// One Call API
// https://api.openweathermap.org/data/2.5/onecall?lat=20.7503&lon=-156.5003&exclude=minutely,hourly&units=metric&appid=57f68c3670fb17e844897ccb04baf20f

