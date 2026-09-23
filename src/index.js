import "./styles.css";
import getWeatherData from "./weather-api.js";
import icons from "./icons.js";

class WeatherViewer{
    weatherData;

    constructor(){
        this.infoDiv = document.getElementById("info-container");
        this.weatherForm = document.getElementById("weatherForm");
        this.place = document.getElementById("place");
        this.errorSpan = document.getElementById("formError");
        this.place.addEventListener("input", () => this.validatePlace());
        
        this.weatherForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            this.validatePlace();

            const isFormValid = this.weatherForm.checkValidity();

            if(isFormValid){
                const location = this.place.value;
                this.weatherData = await getWeatherData(location);
                this.weatherForm.reset();

                if(this.weatherData.hasOwnProperty('location')){

                } else{
                    this.infoDiv.textContent = "";
                    const noDataMessage = document.createElement("h2");
                    noDataMessage.textContent = this.weatherData;
                    noDataMessage.classList = "no-data";
                    this.infoDiv.appendChild(noDataMessage);
                }
            } else{
                this.errorSpan.textContent = "Please provide a valid location";
            }
        });
    }

    validatePlace(){
        this.place.setCustomValidity("");

        if(this.place.validity.valueMissing || this.place.value.trim().length === 0){
            this.place.setCustomValidity("Location is required");
        }

        this.errorSpan.textContent = this.place.validationMessage;
    }

}

new WeatherViewer();













