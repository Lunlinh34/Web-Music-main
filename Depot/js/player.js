import { SoundCloud } from "./api.js";
import { songsLocal, artistLocal } from "./songs.js";

class MusicPlayer {
  constructor() {
    this.music = new Audio("Depot/audio/2.mp3");
    this.currentIndex = 0;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.songs = [];

    // DOM Elements
    this.masterPlay = document.getElementById("masterPlay");
    this.bossWave = document.getElementsByClassName("boss__wave")[0];
    this.seekBar = document.getElementById("seek");
    this.bar2 = document.getElementById("bar2");
    this.dot = document.getElementsByClassName("dot")[0];
    this.timeStart = document.getElementById("TimeStart");
    this.timeEnd = document.getElementById("TimeEnd");
    this.bossPoster = document.getElementById("boss_img_poster");
    this.title = document.getElementById("title");
    this.backBtn = document.getElementById("back");
    this.nextBtn = document.getElementById("next");
    this.menuSong = document.querySelector('.Menu__song');
    this.chillList = document.querySelector('.chill-vip');
    this.artistList = document.querySelector('.artist-vip');
    this.fireBodyMore = document.querySelector('.like-love');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextVipBtn = document.getElementById('nextBtn');
    this.soundcloudPlayerElement = document.getElementById('soundcloudPlayer');

    // Initialize
    this.initEventListeners();
    this.initSongList();
  }

  initEventListeners() {
    // Play/pause button
    this.masterPlay.addEventListener("click", () => this.togglePlay());

    // Time update for progress bar
    this.music.addEventListener("timeupdate", () => this.updateProgress());

    // Seek functionality
    this.seekBar.addEventListener("change", () => {
      this.music.currentTime = (this.seekBar.value * this.music.duration) / 100;
    });

    // End of song
    this.music.addEventListener("ended", () => this.onSongEnded());

    // Navigation buttons
    if(this.backBtn && this.nextBtn) {
      this.backBtn.addEventListener("click", () => this.playPrevious());
      this.nextBtn.addEventListener("click", () => this.playNext());
    }

  }

  async initSongList(token) {
    try {
      const res = await SoundCloud.getAll(token);
      if (res && res.length > 0) {
        this.songs = res;
        this.loadTrack(this.currentTrackIndex);
      }
    } catch (error) {
      console.error("Error fetching song list:", error);
      return;
    }

    Array.from(document.getElementsByClassName("organization")).forEach(
      (element, i) => {
        element.getElementsByTagName("img")[0].src = this.songs[i]?.artworkUrl;
        element.getElementsByTagName("h5")[0].innerHTML = this.songs[i]?.title;
      }
    );

    if (this.menuSong) {
      this.menuSong.innerHTML = this.songs.map((song, index) => {
        return `
          <li class="Menu__song-item organization"> 
              <div class="Menu__song-item-lightOutline">
                <img src="${song.artworkUrl}" class="Menu__song-item-img" alt="">
                  <div class="lightOutline__playbtn">
                    <i class="lightOutline__playbtn-icon play_list bi bi-play-fill" id="${index}"></i>
                  </div>
              </div>                                  
                                      
              <h5 class="Menu__song-describe">
                ${song.title}
                <div class="Menu__song-describe-text">Alan Walker</div>
              </h5>
          </li>
        `;
      }).join('');
    } else {
      console.error('Menu song element not found');
    }

    if (this.fireBodyMore) {
      this.fireBodyMore.innerHTML = this.songs.map((song, index) => {
        return `
                                         <div class="Gallery__slider-Panel-slide songItem organization ">
                                            <div class="Gallery__slider-Panel-slide-title ">
                                                <div class="playabletile__artwork">
                                                    <!-- Thêm link bài hát -->
                                                    <a href="#" class="playabletile__artwork-link">
                                                    <div class="playabletile__img">
                                                        <div class="playabletile__img-Outline">
                                                            <img src="${song.artworkUrl}" class="playabletile__img-Outline-img" alt=""></img>
                                                        </div>
                                                    </div>  
                                                    </a>
                                                    <!--them nut icon play -->
                                                    <div class="playabletile__artwork-playbtn">
                                                        <i class="playabletile__artwork-playbtn-icon play_list bi bi-play-fill" id=${index}></i>
                                                    </div>
                                                </div>
                                                <div class="playabletile__description">
                                                    <h5 class="playabletile__description-heading">
                                                         ${song.title}
                                                    </h5>
                                                     <span class="playabletile__description-usernameheading">
                                                        Related tracks
                                                     </span>
                                                </div>
                                            </div>
                                        </div>                         
        `; 
      }) 
    }

    Array.from(document.getElementsByClassName("play_list")).forEach(
      (element) => {
        element.addEventListener("click", (e) => {
          this.selectTrack(e.target.id);
        });
      }
    );
    
    this.prevBtn.addEventListener('click', this.prevTrack.bind(this));
    this.nextVipBtn.addEventListener('click', this.nextTrack.bind(this));


    if(this.chillList) {
      this.chillList.innerHTML = songsLocal.map((song) => {
        return `
                                        <div class="Gallery__slider-Panel-slide songItem organization ">
                                            <div class="Gallery__slider-Panel-slide-title ">
                                                <div class="playabletile__artwork">
                                                    <!-- Thêm link bài hát -->
                                                    <a href="#" class="playabletile__artwork-link">
                                                    <div class="playabletile__img">
                                                        <div class="playabletile__img-Outline">
                                                            <img src="${song.poster}" class="playabletile__img-Outline-img" alt=""></img>
                                                        </div>
                                                    </div>  
                                                    </a>
                                                    <!--them nut icon play -->
                                                    <div class="playabletile__artwork-playbtn">
                                                        <i class="playabletile__artwork-playbtn-icon play_list-local bi bi-play-fill" id="${song.id}"></i>
                                                    </div>
                                                </div>
                                                <div class="playabletile__description">
                                                    <h5 class="playabletile__description-heading">
                                                       ${song.songName}
                                                    </h5>
                                                     <span class="playabletile__description-usernameheading">
                                                        Top tracks
                                                     </span>
                                                </div>
                                            </div>
                                        </div>
            `
      })
    }

    if(this.artistList) {
      this.artistList.innerHTML = artistLocal.map((artist) => {
         return `
                                          <div class="Gallery__slider-Panel-slide songItem organization">
                                            <div class="Gallery__slider-Panel-slide-title ">
                                                <div class="playabletile__artwork">
                                                    <!-- Thêm link bài hát -->
                                                    <a href="#" class="playabletile__artwork-link">
                                                    <div class="playabletile__img">
                                                        <div class="playabletile__img-Outline">
                                                            <img src="${artist.poster}" class="playabletile__img-Outline-img" alt=""></img>
                                                        </div>
                                                    </div>  
                                                    </a>
                                                   
                                                </div>
                                                <div class="playabletile__description">
                                                    <h5 class="playabletile__description-heading">
                                                        ${artist.songName}
                                                    </h5>
                                                     <span class="playabletile__description-usernameheading">
                                                        Top tracks
                                                     </span>
                                                </div>
                                            </div>
                                        </div>`; 
      }) 
    }

    Array.from(document.getElementsByClassName("play_list-local")).forEach(
      (element) => {
        element.addEventListener("click", (e) => {
          this.playSong(e.target.id);
        });
      }
    );
  }

  selectTrack(index) {
    this.currentTrackIndex = index;
    this.loadTrack(this.currentTrackIndex);
  }

   loadTrack(index) {
    const track = this.songs[index];
    if (!track) return;
    this.soundcloudPlayerElement.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.streamUrl)}&auto_play=true`;
  }

   nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.songs.length;
    this.loadTrack(this.currentTrackIndex);
  }


   prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.songs.length) % this.songs.length;
    this.loadTrack(this.currentTrackIndex);
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
    this.masterPlay.classList.remove("bi-play-fill");
    this.masterPlay.classList.add("bi-pause-fill");
    this.bossWave.classList.add("active");
    this.isPlaying = true;
  }

  pause() {
    this.music.pause();
    this.masterPlay.classList.add("bi-play-fill");
    this.masterPlay.classList.remove("bi-pause-fill");
    this.bossWave.classList.remove("active");
    this.isPlaying = false;
  }

  playSong(id) {
    this.currentIndex = id;
    this.makeAllPlays();

    document.getElementById(id).classList.remove("bi-play-circle-fill");
    document.getElementById(id).classList.add("bi-pause-circle-fill");

    const songItem = songsLocal.find((ele) => ele.id == id);
    this.music.src = `Depot/audio/${id}.mp3`;
    this.bossPoster.src = songItem?.poster;
    this.title.innerHTML = songItem?.songName;
    this.play();
  }

  makeAllPlays() {
    Array.from(document.getElementsByClassName("play_list")).forEach(
      (element) => {
        element.classList.add("bi-play-circle-fill");
        element.classList.remove("bi-pause-circle-fill");
      }
    );
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
    this.masterPlay.classList.add("bi-play-fill");
    this.masterPlay.classList.remove("bi-pause-fill");
    this.bossWave.classList.remove("active");
  }

  playNext() {
    this.currentIndex = Number(this.currentIndex) + 1;
    if (this.currentIndex > songsLocal.length) {
      this.currentIndex = 1;
    }
    this.playSong(this.currentIndex);
  }

  playPrevious() {
    this.currentIndex = Number(this.currentIndex) - 1;
    if (this.currentIndex < 1) {
      this.currentIndex = this.songsLocal.length;
    }
    this.playSong(this.currentIndex);
  }
}

export const player = new MusicPlayer();
