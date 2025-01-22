const clientId = '42682c4f09fe4e34ac485d725f020f3f'; // Your Spotify Client ID
const redirectUri = 'https://roomcontrol.vercel.app/callback'; // Your Vercel site callback URL
const scopes = 'user-read-playback-state user-modify-playback-state';

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

// Redirect user to Spotify authentication
function loginToSpotify() {
    window.location.href = authUrl;
}

// Handle token exchange after Spotify redirects back
async function handleSpotifyCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
        try {
            // Send the code to your backend to exchange for an access token
            const response = await fetch('/callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            const data = await response.json();

            // Store the access token for API calls
            if (data.access_token) {
                localStorage.setItem('spotifyAccessToken', data.access_token);
                alert('Spotify authentication successful!');
            } else {
                alert('Failed to get access token');
            }
        } catch (error) {
            console.error('Error during Spotify authentication:', error);
            alert('Error during authentication');
        }
    } else {
        alert('No authorization code received');
    }
}

// Check if we're on the callback URL, if so, handle the callback
if (window.location.pathname === '/callback') {
    handleSpotifyCallback();
}

// Function to update the time
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const time = now.toLocaleTimeString('en-US', options);
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    timeElement.innerHTML = `${time}<br><span style="font-size: 16px;">${date}</span>`;
}

// Function to fetch weather data
async function updateWeather() {
    const weatherElement = document.getElementById('weather');
    const tomorrowWeatherElement = document.getElementById('tomorrow-weather');

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=40.3656&lon=-74.3915&exclude=minutely,hourly&units=imperial&appid=fcfdba90c5034b70a4235310252201`;

    try {
        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        // Current weather
        const currentTemp = data.current.temp;
        const currentWeather = data.current.weather[0].description;
        weatherElement.innerHTML = `Now: ${currentTemp}°F<br>${currentWeather}`;

        // Tomorrow's weather
        const tomorrow = data.daily[1]; // Tomorrow's weather data
        const tempMin = tomorrow.temp.min;
        const tempMax = tomorrow.temp.max;
        tomorrowWeatherElement.innerHTML = `Tomorrow: ${tempMin}°F/${tempMax}°F`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherElement.innerHTML = 'Weather data not available';
    }
}

// Call the functions to start updating time and weather
updateTime();
updateWeather();
setInterval(updateTime, 1000); // Update time every second
