import { SoundCloud } from "./api.js";

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
    this.fireBodyMore = document.querySelector('.home__main-border-body-Gallery');
    this.soundcloudVip = document.querySelector('.soundcloudVip');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
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

  async initSongList() {
    // Fetch song list
    try {
      const res = await SoundCloud.getAll();
      if (res && res.length > 0) {
        this.songs = res;
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
      this.menuSong.innerHTML = this.songs.map((song) => {
        return `
          <li class="Menu__song-item organization"> 
              <div class="Menu__song-item-lightOutline">
                <img src="${song.artworkUrl}" class="Menu__song-item-img" alt="">
                  <div class="lightOutline__playbtn">
                    <i class="lightOutline__playbtn-icon play_list bi bi-play-fill" id="${song.id}"></i>
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
      this.fireBodyMore.innerHTML = this.songs.map((song) => {
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
                                                        <i class="playabletile__artwork-playbtn-icon play_list bi bi-play-fill" id="12"></i>
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

    if (this.soundcloudVip) {
      this.soundcloudVip.innerHTML = this.songs.map((song) => {
        return `
                                     <div class="player" id="player" style="padding: 12px">
                                        <iframe
                                          id="soundcloudPlayer"
                                          width="100%"
                                          height="166"
                                          scrolling="no"
                                          frameBorder="no"
                                          allow="autoplay"
                                          src="https://w.soundcloud.com/player/?url=${encodeURIComponent(song.streamUrl)}&auto_play=true"
                                        ></iframe>
                              
                                        <div class="player__controls">
                                          <button id="prevBtn">⏮ Trước</button>
                                          <button id="nextBtn">⏭ Tiếp</button>
                                        </div>
                                      </div>
        `;
      }).join('');
    } else {
      console.error('Menu song element not found');
    }

    Array.from(document.getElementsByClassName("play_list")).forEach(
      (element) => {
        element.addEventListener("click", (e) => {
          this.playSong(e.target.id);
        });
      }
    );

    this.prevBtn.addEventListener('click', prevTrack);
    this.nextBtn.addEventListener('click', nextTrack);
  }
   loadTrack(index) {
    const track = songs[index];
    if (!track) return;

    this.soundcloudPlayerElement.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.streamUrl)}&auto_play=true`;
  }
   selectTrack(index) {
    this.currentTrackIndex = index;
    loadTrack(this.currentTrackIndex);
  }

   nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.songs.length;
    loadTrack(this.currentTrackIndex);
  }

  // Quay lại bài trước đó
   prevTrack() {
    currentTracthis.currentTrackIndexkIndex = (this.currentTrackIndex - 1 + this.songs.length) % this.songs.length;
    loadTrack(this.currentTrackIndex);
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

    const songItem = this.songs.find((ele) => ele.id == id);
    this.music.src = songItem?.streamUrl;
    this.bossPoster.src = songItem?.artworkUrl;
    this.title.innerHTML = songItem?.title;
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
    if (this.currentIndex > this.songs.length) {
      this.currentIndex = 1;
    }
    this.playSong(this.currentIndex);
  }

  playPrevious() {
    this.currentIndex = Number(this.currentIndex) - 1;
    if (this.currentIndex < 1) {
      this.currentIndex = this.songs.length;
    }
    this.playSong(this.currentIndex);
  }
}

export const player = new MusicPlayer();
