// Update time and date
function updateTimeDate() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  timeElement.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateTimeDate, 1000);
updateTimeDate();

// Fetch weather data
async function fetchWeather() {
  const apiKey = 'fcfdba90c5034b70a4235310252201';
  const location = 'Marlboro, New Jersey';
  const currentWeatherElement = document.getElementById('current-weather');
  const tomorrowWeatherElement = document.getElementById('tomorrow-weather');

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    currentWeatherElement.innerHTML = `Now<br>${data.current.temp_f}°F`;
    const tomorrow = data.forecast.forecastday[1];
    tomorrowWeatherElement.innerHTML = `Tomorrow<br>${new Date(tomorrow.date).toLocaleDateString()}<br>Low: ${tomorrow.day.mintemp_f}°F / High: ${tomorrow.day.maxtemp_f}°F`;
  } catch (error) {
    console.error('Error fetching weather:', error);
    currentWeatherElement.textContent = 'Weather unavailable';
    tomorrowWeatherElement.textContent = 'Weather unavailable';
  }
}

fetchWeather();

// Spotify login
const spotifyLoginButton = document.getElementById('spotify-login');
const spotifyStatus = document.getElementById('spotify-status');

const clientId = 'your_spotify_client_id'; // Replace with your Spotify Client ID
const redirectUri = 'https://roomcontrol.vercel.app/callback'; // Replace with your redirect URI
const scopes = 'user-read-private user-read-email';

spotifyLoginButton.addEventListener('click', () => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = authUrl;
});

// Handle Spotify token
function handleSpotifyToken() {
  const hash = window.location.hash;
  const token = new URLSearchParams(hash.substring(1)).get('access_token');

  if (token) {
    spotifyStatus.textContent = 'Connected to Spotify!';
    console.log('Spotify Access Token:', token);
    // Store or use the token to fetch user data or control playback
  } else {
    spotifyStatus.textContent = 'Not connected to Spotify';
  }
}

// Check for token on load
handleSpotifyToken();
