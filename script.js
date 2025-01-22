// Function to update the time and date
function updateTimeDate() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  const time = now.toLocaleTimeString('en-US', { hour12: true });
  const date = now.toLocaleDateString('en-US', options);
  
  timeElement.textContent = time;
  dateElement.textContent = date;
}

// Update every second
setInterval(updateTimeDate, 1000);
updateTimeDate(); // Initial call to display time/date immediately

// Fetch weather data
async function fetchWeather() {
  const apiKey = 'fcfdba90c5034b70a4235310252201'; // Your API key
  const location = 'Marlboro, New Jersey';
  const currentWeatherElement = document.getElementById('current-weather');
  const tomorrowWeatherElement = document.getElementById('tomorrow-weather');

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();

    // Current weather
    const currentTemp = data.current.temp_f;
    currentWeatherElement.innerHTML = `Now<br>${currentTemp}°F`;

    // Tomorrow's weather
    const tomorrowDate = new Date(data.forecast.forecastday[1].date);
    const lowTemp = data.forecast.forecastday[1].day.mintemp_f;
    const highTemp = data.forecast.forecastday[1].day.maxtemp_f;
    tomorrowWeatherElement.innerHTML = `Tomorrow<br>${tomorrowDate.getMonth() + 1}/${tomorrowDate.getDate()}<br>(Low: ${lowTemp}°F / High: ${highTemp}°F)`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    currentWeatherElement.textContent = 'Weather unavailable';
    tomorrowWeatherElement.textContent = 'Weather unavailable';
  }
}

// Fetch weather data once at the start
fetchWeather();
