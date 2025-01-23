// Weather API key
const weatherApiKey = "fcfdba90c5034b70a4235310252201";

// Update Time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit', // Include seconds
  });
  document.getElementById("current-time").textContent = timeString;
}

setInterval(updateTime, 1000); // Update every second

// Fetch and Display Weather
async function fetchWeather() {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=Marlboro,New Jersey&aqi=no`);
    const data = await response.json();
    const temp = data.current.temp_f;
    document.getElementById("simple-weather").textContent = `Current Temp: ${temp}°F`;
  } catch (error) {
    document.getElementById("simple-weather").textContent = "Weather data not available";
  }
}

fetchWeather();

// Alarm Functionality
let alarmTimes = [];
let alarmInterval;

function setAlarm() {
  const alarms = [
    { time: '21:46:00', message: 'Alarm 1: Good morning Mr. Alter' },
    { time: '07:25:00', message: 'Alarm 1: Good morning Mr. Alter' },
    { time: '07:30:00', message: 'Alarm 2: You have 9 minutes of sleep remaining!' },
    { time: '07:39:00', message: 'Alarm 3: It\'s time to wake up Mr. Alter' }
  ];

  alarmTimes = alarms.map(alarm => alarm.time);

  const alarmList = document.getElementById("upcoming-alarms");
  alarmList.innerHTML = '';
  alarms.forEach(alarm => {
    const li = document.createElement("li");
    li.textContent = `${alarm.time} - ${alarm.message}`;
    alarmList.appendChild(li);
  });

  document.getElementById("success-message").textContent = "Alarm set successfully!";
  setTimeout(() => {
    document.getElementById("success-message").textContent = "";
  }, 3000);

  if (!alarmInterval) {
    alarmInterval = setInterval(checkAlarms, 1000);
  }
}

function checkAlarms() {
  const now = new Date().toTimeString().split(" ")[0];
  if (alarmTimes.includes(now)) {
    playAlarm();
  }
}

function playAlarm() {
  const audio = new Audio("alarm-sound.mp3");
  audio.play();
}

function clearAlarms() {
  alarmTimes = [];
  clearInterval(alarmInterval);
  alarmInterval = null;
  document.getElementById("upcoming-alarms").innerHTML = '';
}

// Event Listeners
document.getElementById("set-alarm").addEventListener("click", setAlarm);
document.getElementById("clear-alarms").addEventListener("click", clearAlarms);
