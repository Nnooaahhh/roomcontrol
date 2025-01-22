const clientId = "42682c4f09fe4e34ac485d725f020f3f";
const clientSecret = "fd6d47d2c597495b87d7bd79fe953717";
const redirectUri = "https://roomcontrol.vercel.app/callback";
let accessToken = "";

// Generate Spotify login URL
document.getElementById("spotify-login").addEventListener("click", () => {
  const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ];
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}`;
  window.location.href = authUrl;
});

// Extract access token from URL after login
function getAccessTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

if (window.location.hash) {
  accessToken = getAccessTokenFromUrl();
  console.log("Spotify Access Token:", accessToken);
}

// Fetch currently playing song
async function fetchCurrentlyPlaying() {
  if (!accessToken) return;
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    const track = data.item;
    const nowPlayingElement = document.getElementById("spotify-now-playing");
    nowPlayingElement.innerHTML = `
      <p><strong>Now Playing:</strong> ${track.name} by ${track.artists.map(artist => artist.name).join(", ")}</p>
    `;
  } else {
    console.error("Error fetching currently playing song");
  }
}

// Control playback
async function controlPlayback(action) {
  if (!accessToken) return;
  const endpoint =
    action === "play-pause"
      ? "https://api.spotify.com/v1/me/player/play"
      : action === "next"
      ? "https://api.spotify.com/v1/me/player/next"
      : "https://api.spotify.com/v1/me/player/previous";

  await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

document.getElementById("play-pause").addEventListener("click", () => controlPlayback("play-pause"));
document.getElementById("next").addEventListener("click", () => controlPlayback("next"));
document.getElementById("prev").addEventListener("click", () => controlPlayback("prev"));

// Fetch currently playing song every 10 seconds
setInterval(fetchCurrentlyPlaying, 10000);
fetchCurrentlyPlaying();
