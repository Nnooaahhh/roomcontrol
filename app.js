// Function to fetch weather data
async function getWeather() {
    const apiKey = 'fcfdba90c5034b70a4235310252201'; // Your WeatherAPI key
    const city = 'Marlboro'; // You can change the city here
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperature = data.current.temp_c; // Temperature in Celsius
        const condition = data.current.condition.text; // Weather condition

        // Display weather
        document.getElementById('weather').innerHTML = `${temperature}°C, ${condition}`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather').innerHTML = 'Weather data not available';
    }
}

// Function to update the current time
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('time').innerHTML = `${formattedTime}<br>${formattedDate}`;
}

// Initialize and update time every second
setInterval(updateTime, 1000);

// Get weather data on page load
getWeather();
