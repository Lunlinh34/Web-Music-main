class GallerySlider {
    constructor() {
        this.initSliders();
    }
    
    initSliders() {
        this.setupSlider('left_Gallery', 'right_Gallery', 'js_Gallery_slider');
        this.setupSlider('left_Gallerys', 'right_Gallerys', 'js_Gallery_sliders');
        this.setupSlider('left_Galleryss', 'right_Galleryss', 'js_Gallery_sliderss');
    }
    
    setupSlider(leftBtnId, rightBtnId, sliderId) {
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);
        const slider = document.getElementsByClassName(sliderId)[0];
        
        leftBtn.addEventListener('click', () => {
            slider.scrollLeft -= 330;
        });
        
        rightBtn.addEventListener('click', () => {
            slider.scrollLeft += 330;
        });
    }
}

export const gallerySlider = new GallerySlider();