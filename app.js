let alarmTimeouts = [];

// Function to handle the alarm functionality
function setAlarms() {
    const alarms = [
        { time: '07:25:00', message: 'Alarm 1: Goodmorning Mr. Alter', sound: 'alarm-sound.mp3' },
        { time: '07:30:00', message: 'Alarm 2: You have 9 minutes of sleep remaining!', sound: 'alarm-sound.mp3' },
        { time: '07:39:00', message: 'Alarm 3: It\'s time to wake up Mr. Alter', sound: 'alarm-sound.mp3' }
    ];

    // Clear any previous alarms
    alarmTimeouts.forEach(timeout => clearTimeout(timeout));
    alarmTimeouts = [];

    alarms.forEach(alarm => {
        const alarmTime = alarm.time;
        const alarmMessage = alarm.message;
        const alarmSound = alarm.sound;

        const alarmDate = new Date();
        const [hours, minutes, seconds] = alarmTime.split(':');
        alarmDate.setHours(hours, minutes, seconds, 0);

        const delay = alarmDate - new Date(); // Calculate delay in milliseconds
        if (delay > 0) {
            const timeoutId = setTimeout(() => {
                // Play sound
                const audio = new Audio(alarmSound);
                audio.play();
                alert(alarmMessage); // Show the message
            }, delay);

            alarmTimeouts.push(timeoutId); // Store the timeout ID to be able to clear it
        }
    });

    // Show success notification
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerText = "Morning Alarm Set!";
    document.body.appendChild(successMessage);

    // Remove the success message after 2 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
}

// Function to clear all alarms
function clearAlarms() {
    alarmTimeouts.forEach(timeout => clearTimeout(timeout));
    alarmTimeouts = [];
    alert('All alarms have been canceled.');
}

// Fetching weather data
const apiKey = 'fcfdba90c5034b70a4235310252201'; // Your WeatherAPI key
const city = 'Marlboro'; // The city you want weather data for
const country = 'US'; // Country code

function getWeatherData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${fcfdba90c5034b70a4235310252201}&q=${Marlboro}&days=2`)
        .then(response => response.json())
        .then(data => {
            // Weather data for today and tomorrow
            const currentTemp = data.current.temp_c;
            const tomorrowLow = data.forecast.forecastday[1].day.mintemp_c;
            const tomorrowHigh = data.forecast.forecastday[1].day.maxtemp_c;

            // Display weather data
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML = `
                <strong>Now:</strong> ${currentTemp}°C <br>
                <strong>Tomorrow:</strong> ${tomorrowLow}°C / ${tomorrowHigh}°C
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML = '<strong>Weather data not available.</strong>';
        });
}

// Function to display the time
function updateTimeAndWeather() {
    // Time
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;

    // Update weather data
    getWeatherData();
}

// Update the time and weather every second
setInterval(updateTimeAndWeather, 1000);

// Set event listeners
document.getElementById('set-alarm-button').addEventListener('click', setAlarms);
document.getElementById('cancel-alarm-button').addEventListener('click', clearAlarms);
