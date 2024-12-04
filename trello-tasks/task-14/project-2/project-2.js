"use strict";

let audioEnabled = false;
let currentAudio = null;

const locations = [
  { name: "Kyiv", lat: 50.4501, lon: 30.5234, audio: "./audio/kyiv-audio.mp3" },
  { name: "Lviv", lat: 49.8397, lon: 24.0297, audio: "./audio/lviv-audio.mp3" },
  {
    name: "Odessa",
    lat: 46.4825,
    lon: 30.7233,
    audio: "./audio/odessa-audio.mp3",
  },
];

document.getElementById("enable-audio").addEventListener("click", () => {
  audioEnabled = true;
  alert("Audio enabled. Move around to discover audio tracks!");
});

let isPageActive = true;

document.addEventListener("visibilitychange", () => {
  isPageActive = !document.hidden;
  if (!isPageActive && currentAudio) {
    currentAudio.pause();
  } else if (isPageActive && currentAudio && audioEnabled) {
    currentAudio.play().catch((error) => {
      console.error("Failed to resume audio:", error.message);
    });
  }
});

function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        checkNearestLocation(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        document.getElementById("location-info").textContent =
          "Error detecting location.";
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function checkNearestLocation(lat, lon) {
  let nearest = null;
  let minDistance = Infinity;

  locations.forEach((location) => {
    const distance = calculateDistance(lat, lon, location.lat, location.lon);
    if (distance < minDistance) {
      nearest = location;
      minDistance = distance;
    }
  });

  if (nearest) {
    console.log(
      `Nearest location: ${nearest.name} (${minDistance.toFixed(2)} km)`
    );
    playAudio(nearest.audio, nearest.name);
    document.getElementById(
      "location-info"
    ).textContent = `Nearest location: ${nearest.name}`;
  }
}

function playAudio(audioFile, trackName) {
  if (!audioEnabled || !isPageActive) {
    console.log("Audio is not enabled or page is inactive. Skipping playback.");
    return;
  }

  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const trackNameElement = document.getElementById("track-name");

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  audioSource.src = audioFile;
  audioPlayer.load();
  currentAudio = audioPlayer;

  currentAudio
    .play()
    .then(() => {
      console.log(`Playing track: ${trackName}`);
      trackNameElement.textContent = trackName;
    })
    .catch((error) => {
      console.error("Failed to play audio:", error.message);
    });
}

getUserLocation();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
