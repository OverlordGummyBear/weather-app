async function getWeatherData(location){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=ZYMCB5X56EP5Q2MNPSKP68G7Q`);
        
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        return {
            humidity: result.currentConditions.humidity,
            windpeed: result.currentConditions.windpeed,
            conditions: result.currentConditions.conditions,
            tempFeelsLike: result.currentConditions.feelslike,
            icon: result.currentConditions.icon,
            temp: result.currentConditions.temp,
        }
    } catch (error) {
        console.log("No result");
    }
}

export default getWeatherData;