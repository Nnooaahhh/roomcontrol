// Weather and Time API Integration
const weatherAPIKey = "fcfdba90c5034b70a4235310252201";
const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=auto:ip`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();
    const { temp_f, condition } = data.current;
    document.getElementById("current-weather").textContent = `${temp_f}°F - ${condition.text}`;
  } catch (error) {
    console.error("Weather fetch error:", error);
    document.getElementById("current-weather").textContent = "Unable to load weather.";
  }
}

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("current-time").textContent = timeString;
}

setInterval(updateTime, 1000);
fetchWeather();

// Alarm Functionality
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
    console.log(`Setting alarm for ${time} with label "${label}"`);

    const alarm = { time, label, id: Date.now() };
    alarms.push(alarm);
    displayAlarms();
    scheduleAlarm(alarm);
    showSuccessMessage();
  } else {
    console.error("Invalid time or label");
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
      console.log(`Alarm for ${alarm.time} turned off`);
      displayAlarms();
    };

    li.appendChild(offButton);
    alarmList.appendChild(li);
  });
}

// Schedule an alarm
function scheduleAlarm(alarm) {
  const now = new Date();
  const [hours, minutes] = alarm.time.split(":").map(Number);
  const alarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );
  const delay = alarmTime - now;

  if (delay > 0) {
    console.log(`Alarm set for ${alarm.time}, triggering in ${delay}ms`);
    setTimeout(() => {
      playAlarm(alarm.label);
    }, delay);
  } else {
    console.warn(`Invalid alarm time: ${alarm.time} is in the past`);
  }
}

// Play alarm sound and show notification
function playAlarm(label) {
  alarmSound.play();
  const notification = document.createElement("p");
  notification.textContent = `Alarm: ${label}`;
  notification.style.color = "red";
  notification.style.fontWeight = "bold";
  notification.style.textAlign = "center";

  const alarmSection = document.getElementById("alarm-section");
  alarmSection.appendChild(notification);

  setTimeout(() => {
    alarmSection.removeChild(notification);
  }, 5000); // Remove the notification after 5 seconds
}

// Show success message
function showSuccessMessage() {
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}
