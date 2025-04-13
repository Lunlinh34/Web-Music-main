class VolumeControl {
    constructor(player) {
        this.player = player;
        
        // DOM Elements
        this.volIcon = document.getElementById('vol_icon');
        this.volSlider = document.getElementById('vol');
        this.volDot = document.getElementById('vol_dot');
        this.volBar = document.getElementsByClassName('vol_bar')[0];
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.volSlider.addEventListener('change', () => this.updateVolume());
    }
    
    updateVolume() {
        const volume = this.volSlider.value;
        
        // Update volume icon
        if (volume == 0) {
            this.volIcon.classList.remove('bi-volume-down', 'bi-volume-up');
            this.volIcon.classList.add('bi-volume-mute');
        } else if (volume > 0 && volume <= 50) {
            this.volIcon.classList.add('bi-volume-down');
            this.volIcon.classList.remove('bi-volume-mute', 'bi-volume-up');
        } else {
            this.volIcon.classList.add('bi-volume-up');
            this.volIcon.classList.remove('bi-volume-down', 'bi-volume-mute');
        }
        
        // Update volume UI
        this.volBar.style.width = `${volume}%`;
        this.volDot.style.left = `${volume}%`;
        
        // Set actual volume
        this.player.music.volume = volume / 100;
    }
}

export const volumeControl = new VolumeControl();
