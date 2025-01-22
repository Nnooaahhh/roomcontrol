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
}

// Function to clear all alarms
function clearAlarms() {
    alarmTimeouts.forEach(timeout => clearTimeout(timeout));
    alarmTimeouts = [];
    alert('All alarms have been canceled.');
}

// Add event listener to the "Set Morning Alarm" button
document.getElementById('set-alarm-button').addEventListener('click', setAlarms);

// Add event listener to the "Cancel Alarms" button
document.getElementById('cancel-alarm-button').addEventListener('click', clearAlarms);

// Function to display the time and weather
function updateTimeAndWeather() {
    // Time
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;

    // Weather (dummy example, can be replaced with real data from an API)
    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `
        <strong>Now:</strong> 20°C <br>
        <strong>Tomorrow:</strong> 10°C / 30°C
    `;
}

// Update the time and weather every second
setInterval(updateTimeAndWeather, 1000);
