// Function to fetch weather data
async function getWeather() {
    const apiKey = 'fcfdba90c5034b70a4235310252201'; // Your WeatherAPI key
    const city = 'Marlboro'; // You can change the city here
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperatureC = data.current.temp_c; // Temperature in Celsius
        const temperatureF = (temperatureC * 9/5) + 32; // Convert to Fahrenheit
        const condition = data.current.condition.text; // Weather condition

        // Display weather
        document.getElementById('weather').innerHTML = `${Math.round(temperatureF)}°F, ${condition}`;
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

const alarmForm = document.getElementById("alarm-form");
const alarmList = document.getElementById("active-alarms");
const successMessage = document.getElementById("alarm-success-message");
const alarmSound = document.getElementById("alarm-sound");
const alarms = [];

// Handle alarm submission
alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const time = document.getElementById("alarm-time").value;
  const label = document.getElementById("alarm-label").value;

  if (time && label) {
    const alarm = { time, label, id: Date.now() };
    alarms.push(alarm);
    displayAlarms();
    scheduleAlarm(alarm);
    showSuccessMessage();
  }
});

// Display alarms
function displayAlarms() {
  alarmList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.textContent = `${alarm.time} - ${alarm.label}`;

    const offButton = document.createElement("button");
    offButton.textContent = "Turn Off";
    offButton.onclick = () => {
      alarms.splice(index, 1);
      displayAlarms();
    };

    li.appendChild(offButton);
    alarmList.appendChild(li);
  });
}

// Schedule an alarm
function scheduleAlarm(alarm) {
  const now = new Date();
  const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`);
  const delay = alarmTime - now;

  if (delay > 0) {
    setTimeout(() => {
      alarmSound.play();
      alert(`Alarm: ${alarm.label}`);
    }, delay);
  }
}

// Show success message
function showSuccessMessage() {
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}
