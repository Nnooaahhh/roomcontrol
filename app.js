// Function to update the time
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const time = now.toLocaleTimeString('en-US', options);
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    timeElement.innerHTML = `${time}<br><span style="font-size: 16px;">${date}</span>`;
}

// Function to fetch weather data from WeatherAPI.com
async function updateWeather() {
    const weatherElement = document.getElementById('weather');
    const tomorrowWeatherElement = document.getElementById('tomorrow-weather');

    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=fcfdba90c5034b70a4235310252201&q=Marlboro,New Jersey&days=2`;

    try {
        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        // Current weather
        const currentTemp = data.current.temp_f;
        const currentWeather = data.current.condition.text;
        weatherElement.innerHTML = `Now: ${currentTemp}°F<br>${currentWeather}`;

        // Tomorrow's weather
        const tomorrow = data.forecast.forecastday[1]; // Tomorrow's weather data
        const tempMin = tomorrow.day.mintemp_f;
        const tempMax = tomorrow.day.maxtemp_f;
        tomorrowWeatherElement.innerHTML = `Tomorrow: ${tempMin}°F/${tempMax}°F`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherElement.innerHTML = 'Weather data not available';
    }
}
