const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playPauseBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector(".player-speed");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playPauseBtn.classList.replace("fa-pause", "fa-play");
  playPauseBtn.setAttribute("title", "Play");
}

function handlePlayPause() {
  if (video.paused) {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
    playPauseBtn.setAttribute("title", "Pause");
    video.play();
  } else {
    video.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //

// Format display time
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} / `;
  duration.textContent = displayTime(video.duration);
}

function setProgress(e) {
  const newTime = (e.offsetX / progressRange.offsetWidth) * video.duration;
  //   console.log(newTime);
  progressBar.style.width = `${(newTime / video.duration) * 100}%`;
  video.currentTime = newTime;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleVolume() {
  volumeIcon.className = "";
  //   console.log(lastVolume);
  if (video.volume) {
    video.volume = 0;
    volumeIcon.classList.add("fas", "fa-volume-off");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = "0%";
  } else {
    video.volume = lastVolume;
    setVolumeIcon(lastVolume);
    volumeIcon.setAttribute("title", "Mute");

    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

function setVolumeIcon(vol) {
  volumeIcon.className = "";
  if (vol > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (vol > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

// Change Volume
function setVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding Volume
  if (volume < 0.1) {
    volume = 0;
  } else if (volume > 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  setVolumeIcon(volume);

  lastVolume = volume;
}

// Change Playback Speed -------------------- //
function updateSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let isFullscreen = false;

function toggleFullscreen() {
  if (!isFullscreen) {
    openFullscreen(video);
  } else {
    closeFullscreen();
  }

  isFullscreen = !isFullscreen;
}

// Event Listener
playPauseBtn.addEventListener("click", handlePlayPause);
video.addEventListener("click", handlePlayPause);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeIcon.addEventListener("click", toggleVolume);
speed.addEventListener("change", updateSpeed);
volumeRange.addEventListener("click", setVolume);
fullscreenBtn.addEventListener("click", toggleFullscreen);
