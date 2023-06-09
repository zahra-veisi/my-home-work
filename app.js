

let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day}| ${hour}:${minutes}`


function displayWeatherCondition(response){
  console.log(response.data)
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp)
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#description").innerHTML=response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
 
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
let celciusTemperature=response.data.main.temp;
}

function search(city) {
  
  let apiKey="22e66ee2d2a721734b8e74a67df9f4ab" 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
axios.get(apiUrl).then(displayWeatherCondition);}

function handleSubmit (event){
  event.preventDefault();
  let city=document.querySelector("#city-input").value;
  search (city)}
 

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);
search("Kermanshah")

function searchLocation(position){
  let apiKey = "22e66ee2d2a721734b8e74a67df9f4ab"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation)
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function convertToCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);}

  let celciusTemperature= null;

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

   