import "./styles.css";
import getWeatherData from "./weather-api.js";
import icons from "./icons.js";

const weatherData = await getWeatherData("København");

console.log(weatherData.icon);

const weatherImg = document.getElementById("weatherIcon");
weatherImg.src = icons[weatherData.icon];

