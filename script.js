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
  const simpleWeatherElement = document.getElementById('simple-weather');
  const detailedWeatherElement = document.getElementById('detailed-weather');

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();

    // Simple weather display (e.g., "72°F, Sunny")
    simpleWeatherElement.textContent = `${data.current.temp_f}°F, ${data.current.condition.text}`;

    // Detailed weather display
    detailedWeatherElement.innerHTML = `
      <strong>Temperature:</strong> ${data.current.temp_f}°F<br>
      <strong>Condition:</strong> ${data.current.condition.text}<br>
      <strong>Humidity:</strong> ${data.current.humidity}%<br>
      <strong>Wind:</strong> ${data.current.wind_mph} mph`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    simpleWeatherElement.textContent = 'Weather unavailable';
    detailedWeatherElement.textContent = 'Weather data could not be loaded.';
  }
}

// Fetch weather data once at the start
fetchWeather();
