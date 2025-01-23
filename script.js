// Light/Dark Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle');

// Check if user has a saved theme preference
const currentMode = localStorage.getItem('theme') || 'light';
document.body.classList.add(`${currentMode}-mode`);

// Update the button text
if (currentMode === 'light') {
  modeToggleButton.innerText = 'Switch to Dark Mode';
} else {
  modeToggleButton.innerText = 'Switch to Light Mode';
}

// Toggle between light and dark modes
modeToggleButton.addEventListener('click', () => {
  const newMode = currentMode === 'light' ? 'dark' : 'light';
  document.body.classList.remove(`${currentMode}-mode`);
  document.body.classList.add(`${newMode}-mode`);
  localStorage.setItem('theme', newMode); // Save preference

  // Update the button text
  modeToggleButton.innerText = newMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});

// Weather API Key and URL
const weatherAPIKey = 'fcfdba90c5034b70a4235310252201';  // Your API Key
const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=Marlboro&aqi=no`;

// Fetch and display weather
async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    const currentTemp = data.current.temp_f;

    document.getElementById('current-weather').innerHTML = `
      <p>Current Temp: ${currentTemp}°F</p>
    `;
  } catch (error) {
    document.getElementById('current-weather').innerHTML = `<p>Error loading weather</p>`;
  }
}

getWeather();

// Display current time and date
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const date = now.toLocaleDateString();

  document.getElementById('time').innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

// Alarm functionality
const alarmTimes = [
  { time: '07:25:00', message: 'Alarm 1: Goodmorning Mr. Alter' },
  { time: '07:30:00', message: 'Alarm 2: You have 9 minutes of sleep remaining!' },
  { time: '07:39:00', message: 'Alarm 3: It\'s time to wake up Mr Alter' },
];

let alarmsSet = [];

function setAlarm() {
  const alarmMessageElement = document.getElementById('alarm-message');
  alarmMessageElement.innerHTML = 'Alarm set successfully for 7:25 AM, 7:30 AM, and 7:39 AM.';
  alarmsSet = alarmTimes.map(alarm => {
    const alarmTime = new Date();
    const [hours, minutes, seconds] = alarm.time.split(':');
    alarmTime.setHours(hours, minutes, seconds);

    return setTimeout(() => {
      const audio = new Audio('alarm-sound.mp3');
      audio.play();
    }, alarmTime.getTime() - Date.now());
  });
}

document.getElementById('set-alarm-button').addEventListener('click', setAlarm);
