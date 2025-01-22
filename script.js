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

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();

    // Simple weather display (e.g., "72°F, Sunny")
    simpleWeatherElement.textContent = `${data.forecast.forecastday[1].day.avgtemp_f}°F, ${data.forecast.forecastday[1].day.condition.text}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    simpleWeatherElement.textContent = 'Weather unavailable';
  }
}

// Fetch weather data once at the start
fetchWeather();

// Simulate LED control for now
document.getElementById('led-on').addEventListener('click', () => {
  console.log('LEDs turned ON');
});

document.getElementById('led-off').addEventListener('click', () => {
  console.log('LEDs turned OFF');
});

document.getElementById('brightness').addEventListener('input', (e) => {
  console.log(`Brightness set to ${e.target.value}`);
});

document.getElementById('color').addEventListener('input', (e) => {
  console.log(`Color set to ${e.target.value}`);
});
