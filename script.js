const songs = [
  {
    title: 'Chill Vibes',
    artist: 'DJ LoFi',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'images/song1.jpg'
  },
  {
    title: 'Night Drive',
    artist: 'SynthMaster',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'images/song2.jpg'
  },
  {
    title: 'Sunset Chill',
    artist: 'BeatWave',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'images/song3.jpg'
  }
];

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const themeSwitch = document.getElementById('theme-switch');

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.audio;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '&#10073;&#10073;';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '&#9654;';
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener('click', () => {
  const isPlaying = !audio.paused;
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function updateProgress() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = isNaN(duration) ? '0:00' : formatTime(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function populatePlaylist() {
  songs.forEach((song, i) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = i;
      loadSong(song);
      playSong();
    });
    playlist.appendChild(li);
  });
}

// Theme toggle
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('light');
});

// Initial load
loadSong(songs[songIndex]);
populatePlaylist();

const volumeSlider = document.getElementById('volume');

 function updateVolumeTrack() {
  const value = volumeSlider.value * 100;
  volumeSlider.style.background = `linear-gradient(to right, #ff0000 ${value}%, #ccc ${value}%)`;
}

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  updateVolumeTrack();
});

updateVolumeTrack(); // Run once on page load
