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
