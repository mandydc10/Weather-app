let apiKey = "57f68c3670fb17e844897ccb04baf20f";
let units = "metric";
let apiBase = "https://api.openweathermap.org/data/2.5/weather?";

//https://api.openweathermap.org/data/2.5/weather?q=london&appid=57f68c3670fb17e844897ccb04baf20f

/*------- Show My Location Button -------*/
/* show temperature */
function myLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${apiBase}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  
  axios.get(`${apiUrl}`).then(updateCityHeader);
  axios.get(`${apiUrl}`).then(updateMainTempDescription);
}

function updateCityHeader(response) {
  let cityHeader = document.querySelector("#city-name");
  let locationName = response.data.name;
  let locationCountry = response.data.sys.country;

  cityHeader.innerHTML = `${locationName}, ${locationCountry}`;
}

function updateMainTempDescription(response) {
  let tempHeader = document.querySelector("#temp");
  let locationTemp = `${Math.round(response.data.main.temp)}°C`;
  let descriptionHeader = document.querySelector("#weather-description");
  let locationDescription = response.data.weather[0].main;
 
  tempHeader.innerHTML = locationTemp;
  descriptionHeader.innerHTML = `${locationDescription}`;
}

let button = document.querySelector("#my-location-button");
button.addEventListener("click", myLocation);


/*------- Realtime day/time info -------*/
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

/*------ Search Function -------*/
//Prevent "submit" default functions and update city header to match searchfield input

function getCityObject(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  let city = searchInput.value;
  let apiUrl = `${apiBase}q=${city}&units=${units}&appid=${apiKey}`;
  
  axios.get(`${apiUrl}`).then(getCoordsandUpdateHeader);
}

function getCoordsandUpdateHeader(response) {
  console.log(response);
  // let lat = response.data[0].lat;
  // let lon = response.data[0].lon;
  // let apiUrl = `${apiBase}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  // let cityHeader = document.querySelector("#city-name");
  let locationName = response.data.name;
  let locationCountry = response.sys.country;
  // console.log(response);

  cityHeader.innerHTML = `${locationName}, ${locationCountry}`;
  // axios.get(`${apiUrl}`).then(updateMainTempDescription);
}

// Searchbar submit runs updateCityHeader function
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", getCityObject);

/*------ Realtime city weather info -------*/
//Change from celcius to degrees on click
function convertToFahrenheit() {
  fahrenheit.classList.remove("inactive");
  celcius.classList.add("inactive");

  temp.innerHTML = "66";
}

function convertToCelcius() {
  celcius.classList.remove("inactive");
  fahrenheit.classList.add("inactive");

  temp.innerHTML = "17"; /*(x°F − 32) × 5/9 = °C*/

}

let temp = document.querySelector("#temp");
let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", convertToCelcius);

