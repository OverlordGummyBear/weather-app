import "./styles.css";
import getWeatherData from "./weather-api.js";
import icons from "./icons.js";

class WeatherViewer{
    weatherData;

    constructor(){
        const weatherForm = document.getElementById("weatherForm");
        const place = document.getElementById("place");
        const errorSpan = document.getElementById("formError");
        place.addEventListener("input", () => this.validatePlace());
        
        weatherForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            validatePlace();

            const isFormValid = weatherForm.checkValidity();

            if(isFormValid){
                const location = place.value;
                weatherData = await getWeatherData(location);
                weatherForm.reset();

                if(weatherData.hasOwnProperty('location')){

                } else{
                    console.log(weatherData);
                }
            } else{
                errorSpan.textContent = "Please provide a valid location";
            }
        });
    }

    validatePlace(){
        place.setCustomValidity("");

        if(place.validity.valueMissing || place.value.trim().length === 0){
            place.setCustomValidity("Location is required");
        }

        errorSpan.textContent = place.validationMessage;
    }

}

new WeatherViewer();













