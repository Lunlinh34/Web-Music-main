import { songs } from './songs.js';

class MusicPlayer {
    constructor() {
        this.music = new Audio('Depot/audio/2.mp3');
        this.currentIndex = 0;
        this.isPlaying = false;
        
        // DOM Elements
        this.masterPlay = document.getElementById('masterPlay');
        this.bossWave = document.getElementsByClassName('boss__wave')[0];
        this.seekBar = document.getElementById('seek');
        this.bar2 = document.getElementById('bar2');
        this.dot = document.getElementsByClassName('dot')[0];
        this.timeStart = document.getElementById('TimeStart');
        this.timeEnd = document.getElementById('TimeEnd');
        this.bossPoster = document.getElementById('boss_img_poster');
        this.title = document.getElementById('title');
        this.backBtn = document.getElementById('back');
        this.nextBtn = document.getElementById('next');
        
        // Initialize
        this.initEventListeners();
        this.initSongList();
    }
    
    initEventListeners() {
        // Play/pause button
        this.masterPlay.addEventListener('click', () => this.togglePlay());
        
        // Time update for progress bar
        this.music.addEventListener('timeupdate', () => this.updateProgress());
        
        // Seek functionality
        this.seekBar.addEventListener('change', () => {
            this.music.currentTime = this.seekBar.value * this.music.duration / 100;
        });
        
        // End of song
        this.music.addEventListener('ended', () => this.onSongEnded());
        
        // Navigation buttons
        this.backBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
    }
    
    initSongList() {
        // Update song list display
        Array.from(document.getElementsByClassName('organization')).forEach((element, i) => {
            element.getElementsByTagName('img')[0].src = songs[i].poster;
            element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
        });
        
        // Add click event for each song
        Array.from(document.getElementsByClassName('play_list')).forEach((element) => {
            element.addEventListener('click', (e) => this.playSong(e.target.id));
        });
    }
    
    togglePlay() {
        if (this.music.paused || this.music.currentTime <= 0) {
            this.play();
        } else {
            this.pause();
        }
    }
    
    play() {
        this.music.play();
        this.masterPlay.classList.remove('bi-play-fill');
        this.masterPlay.classList.add('bi-pause-fill');
        this.bossWave.classList.add('active');
        this.isPlaying = true;
    }
    
    pause() {
        this.music.pause();
        this.masterPlay.classList.add('bi-play-fill');
        this.masterPlay.classList.remove('bi-pause-fill');
        this.bossWave.classList.remove('active');
        this.isPlaying = false;
    }
    
    playSong(id) {
        this.currentIndex = id;
        this.makeAllPlays();
        
        document.getElementById(id).classList.remove('bi-play-circle-fill');
        document.getElementById(id).classList.add('bi-pause-circle-fill');
        
        this.music.src = `Depot/audio/${id}.mp3`;
        this.bossPoster.src = `Depot/image/${id}.jpg`;
        
        const songTitle = songs.filter(ele => ele.id == id);
        this.title.innerHTML = songTitle[0].songName;
        
        this.play();
    }
    
    makeAllPlays() {
        Array.from(document.getElementsByClassName('play_list')).forEach((element) => {
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
        });
    }
    
    updateProgress() {
        const currentTime = this.music.currentTime;
        const duration = this.music.duration;
        
        // Update time displays
        this.timeEnd.innerText = this.formatTime(duration);
        this.timeStart.innerText = this.formatTime(currentTime);
        
        // Update progress bar
        const progressPercent = parseInt((currentTime / duration) * 100);
        this.seekBar.value = progressPercent;
        this.bar2.style.width = `${progressPercent}%`;
        this.dot.style.left = `${progressPercent}%`;
    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }
    
    onSongEnded() {
        this.masterPlay.classList.add('bi-play-fill');
        this.masterPlay.classList.remove('bi-pause-fill');
        this.bossWave.classList.remove('active');
    }
    
    playNext() {
        this.currentIndex = Number(this.currentIndex) + 1;
        if (this.currentIndex > songs.length) {
            this.currentIndex = 1;
        }
        this.playSong(this.currentIndex);
    }
    
    playPrevious() {
        this.currentIndex = Number(this.currentIndex) - 1;
        if (this.currentIndex < 1) {
            this.currentIndex = songs.length;
        }
        this.playSong(this.currentIndex);
    }
}

export const player = new MusicPlayer();