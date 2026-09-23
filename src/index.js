import "./styles.css";
import getWeatherData from "./weather-api.js";
import icons from "./icons.js";

class WeatherViewer{
    weatherData;
    isCelcius = false;

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
                    this.displayWeatherData();
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

    displayWeatherData(){
        console.log(this.weatherData);
        
        this.infoDiv.textContent = "";

        const location = document.createElement("p");
        location.textContent = this.weatherData.location;

        const temperature = document.createElement("p");
        temperature.textContent = this.isCelcius ? Math.round(((this.weatherData.temp - 32) / (9/5)) * 10) / 10 + "°C": this.weatherData.temp + "°F";

        const currentConditions = document.createElement("p");
        currentConditions.textContent = this.weatherData.conditions;

        const feelsLike = document.createElement("p");
        feelsLike.textContent = this.isCelcius ? Math.round(((this.weatherData.tempFeelsLike - 32) / (9/5)) * 10) / 10 + "°C": this.weatherData.tempFeelsLike + "°F";

        const weatherImg = document.createElement("img");
        weatherImg.src = icons[this.weatherData.icon];

        //containers
        const containerDiv = document.createElement("div");
        containerDiv.classList = "row"

        //humidity
        const humidityDiv = document.createElement("div");
        const humidityPara = document.createElement("p");
        humidityPara.textContent = "Humidity";

        const humidityValue = document.createElement("p");
        humidityValue.textContent = this.weatherData.humidity;

        humidityDiv.append(humidityPara, humidityValue);

        //windspeed
        const windspeedDiv = document.createElement("div");
        const windspeedPara = document.createElement("p");
        windspeedPara.textContent = "Windspeed";

        const windspeedValue = document.createElement("p");
        windspeedValue.textContent = this.weatherData.windspeed;

        windspeedDiv.append(windspeedPara, windspeedValue);

        containerDiv.append(humidityDiv, windspeedDiv);

        //celcius
        const celciusDiv = document.createElement("div");
        celciusDiv.classList = "row";

        const celciusCheckbox = document.createElement("input");
        celciusCheckbox.type = "checkbox";
        celciusCheckbox.checked = this.isCelcius;
        
        celciusCheckbox.addEventListener("change", (event) => {            
            this.isCelcius = event.target.checked;
 
            this.displayWeatherData();
        });

        const celciusPara = document.createElement("p");
        celciusPara.textContent = "Celcius";

        celciusDiv.append(celciusCheckbox, celciusPara);

        //Append everything
        this.infoDiv.append(location, temperature, currentConditions, feelsLike, weatherImg, containerDiv, celciusDiv);
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













