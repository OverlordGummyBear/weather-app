import "./styles.css";
import getWeatherData from "./weather-api.js";
import icons from "./icons.js";

class WeatherViewer{
    weatherData;
    isCelcius = true;

    constructor(){
        this.infoDiv = document.getElementById("info-container");
        this.infoDiv.style.visibility = "hidden";

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

                this.infoDiv.style.visibility = "visible";

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

        const locationPara = document.createElement("p");
        const location = this.weatherData.location.split(",")[0];

        locationPara.textContent = location.charAt(0).toUpperCase() + location.slice(1);
        locationPara.classList = "location";

        const temperature = document.createElement("p");
        temperature.textContent = this.isCelcius ? Math.round(((this.weatherData.temp - 32) / (9/5)) * 10) / 10 + "°C": this.weatherData.temp + "°F";
        temperature.classList = "temperature";

        const feelAndCondition = document.createElement("div");
        feelAndCondition.classList = "feel-cond";

        const currentConditions = document.createElement("p");
        currentConditions.textContent = this.weatherData.conditions;
        currentConditions.classList = "current-conditions";

        const feelsLike = document.createElement("p");
        feelsLike.textContent = this.isCelcius ? "Feels like: " + Math.round(((this.weatherData.tempFeelsLike - 32) / (9/5)) * 10) / 10 + "°C": "Feels like: " + this.weatherData.tempFeelsLike + "°F";
        feelsLike.classList = "feels-like";

        feelAndCondition.append(currentConditions, feelsLike);

        const weatherImg = document.createElement("img");
        weatherImg.src = icons[this.weatherData.icon];

        //containers
        const containerDiv = document.createElement("div");
        containerDiv.classList = "row"

        //humidity
        const humidityDiv = document.createElement("div");
        humidityDiv.classList = "humidity";
        const humidityPara = document.createElement("p");
        humidityPara.textContent = "Humidity";

        const humidityValue = document.createElement("p");
        humidityValue.textContent = this.weatherData.humidity + " %";

        humidityDiv.append(humidityPara, humidityValue);

        //windspeed
        const windspeedDiv = document.createElement("div");
        windspeedDiv.classList = "windspeed";
        const windspeedPara = document.createElement("p");
        windspeedPara.textContent = "Windspeed";

        const windspeedValue = document.createElement("p");
        windspeedValue.textContent = this.weatherData.windspeed + " km/h";

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
        celciusPara.classList = "celcius-check"

        celciusDiv.append(celciusCheckbox, celciusPara);

        //Append everything
        this.infoDiv.append(locationPara, temperature, feelAndCondition, weatherImg, containerDiv, celciusDiv);
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













