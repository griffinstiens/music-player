const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document. getElementById('artist');
const music = document.querySelector('audio');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine 1',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill Machine 2',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine 3',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Electric Chill Machine 4',
        artist: 'Jacinto Design'
    }
]


// Check if playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play or Pause Event
playBtn.addEventListener('click', () => (
    isPlaying ? pauseSong() : playSong()
    ));

// Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
const prevSong = () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
const nextSong = () => {

    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}




// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // Update progress bar with
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Prevents flash of NaN where the numbers should be when switching songs - this happened because the math wasn't done in time
        if (durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


