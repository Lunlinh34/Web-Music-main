const Music = new Audio('Depot/audio/2.mp3')

//create Arr

const songs = [
    {
        id: '1',
        songName: ` Chuyện Đôi Ta <br>
        <div class="Menu__song-describe-text">Emcee L (Da LAB) Ft. Muội</div>`,
        poster: "Depot/image/1.jpg"
    },

    {
        id: '2',
        songName: ` XIN LỖI VÌ ĐÃ YÊU NHAU <br>
        <div class="Menu__song-describe-text">HOÀI LÂM</div>`,
        poster: "Depot/image/2.jpg"
    },

    {
        id:'3',
        songName: `THICHTHICH  <br><div class="Menu__song-describe-text">PHƯƠNG LY</div>`,
        poster: "Depot/image/3.jpg",
    },
    {
        id:'4',
        songName: `TỪNG LÀ CỦA NHAU <br><div class="Menu__song-describe-text">BẢO ANH feat TÁO</div>`,
        poster: "Depot/image/4.jpg",
    },
    {
        id:'5',
        songName: `A LOT <br><div class="Menu__song-describe-text">John K (xooos Cover)</div>`,
        poster: "Depot/image/5.jpg",
    },
    {
        id:'6',
        songName: `Light Switch <br><div class="Menu__song-describe-text"> Charlie Puth (xooos cover)</div>`,
        poster: "Depot/image/6.jpg",
    },
    {
        id:'7',
        songName: `Vì Anh Đâu Có Biết <br><div class="Menu__song-describe-text"> Madihu ( Feat. Vũ. ) </div>`,
        poster: "Depot/image/7.jpg",
    },
    {
        id:'8',
        songName: `Mặt Mộc <br><div class="Menu__song-describe-text"> Phạm Nguyên Ngọc x VAnh </div>`,
        poster: "Depot/image/8.jpg",
    },
    {
        id:'9',
        songName: `Chờ Đợi Có Đáng Sợ <br><div class="Menu__song-describe-text"> Andiez </div>`,
        poster: "Depot/image/9.jpg",
    },
    {
        id:'10',
        songName: `Yêu Một Nguời Có Lẽ <br><div class="Menu__song-describe-text"> Miu Le ft Lou Hoang </div>`,
        poster: "Depot/image/10.jpg",
    },
    {
        id:'11',
        songName: `Chúng Ta Của Hiện Tại <br><div class="Menu__song-describe-text"> SƠN TÙNG M-TP </div>`,
        poster: "Depot/image/11.jpg",
    },
    {
        id:'12',
        songName: `Waiting For You -MONO`,
        poster: "Depot/image/12.jpg",
    },
    {
        id:'13',
        songName: `Call Me - Emily Sie`,
        poster: "Depot/image/13.jpg",
    },
    {
        id:'14',
        songName: `𝖱𝖾𝗇𝖾𝖾́ 𝖽𝗈𝗆𝗂𝗇𝗂𝗊𝗎𝖾 ~ close to you`,
        poster: "Depot/image/14.jpg",
    },
    {
        id:'15',
        songName: `Morning Coffee (w/ Nalba)`,
        poster: "Depot/image/15.jpg",
    },
    {
        id:'16',
        songName: `Booty music - Deepside`,
        poster: "Depot/image/16.jpg",
    },
    {
        id:'17',
        songName: `See Tình - Hoàng Thùy Linh `,
        poster: "Depot/image/17.jpg",
    },
    {
        id:'18',
        songName: `Christmas Time Is Here - Daniela Andrade`,
        poster: "Depot/image/18.jpg",
    },
    {
        id:'19',
        songName: `Last Christmas - George Michael`,
        poster: "Depot/image/19.jpg",
    },
    {
        id:'20',
        songName: `Think Of You - Huynh Huu Khang`,
        poster: "Depot/image/20.jpg",
    },
    {
        id:'21',
        songName: `Rainy Days - Alf Wardhana`,
        poster: "Depot/image/21.jpg",
    },
    {
        id:'22',
        songName: `rồi anh sẽ chẵng còn nhớ về em`,
        poster: "Depot/image/22.jpg",
    },
    {
        id:'23',
        songName: `Chúng ta đã mất nhau từ bao giờ`,
        poster: "Depot/image/23.jpg",
    },
    {
        id:'24',
        songName: `em như bông hoa`,
        poster: "Depot/image/24.jpg",
    },
    {
        id:'25',
        songName: `Lieu ngay mua em co buon - FiGDee`,
        poster: "Depot/image/25.jpg",
    },
    {
        id:'26',
        songName: `anh yêu em nhiều lắm`,
        poster: "Depot/image/26.jpg",
    },
    {
        id:'27',
        songName: `Soft Lips (lofi loop mix)`,
        poster: "Depot/image/27.jpg",
    },
    {
        id:'28',
        songName: `Chou1711`,
        poster: "Depot/image/28.jpg",
    },
    {
        id:'29',
        songName: `Mark Mendy`,
        poster: "Depot/image/29.jpg",
    },
    {
        id:'30',
        songName: `Lena Lena`,
        poster: "Depot/image/30.jpg",
    },
    {
        id:'31',
        songName: `Luxøfons`,
        poster: "Depot/image/31.jpg",
    },
    {
        id:'32',
        songName: `WD.E`,
        poster: "Depot/image/32.jpg",
    },
    {
        id:'33',
        songName: `Nom`,
        poster: "Depot/image/33.jpg",
    },
    {
        id:'34',
        songName: `Marzuz`,
        poster: "Depot/image/34.jpg",
    },
    {
        id:'35',
        songName: `Thai Dinh`,
        poster: "Depot/image/35.jpg",
    },
]
Array.from(document.getElementsByClassName('organization')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let boss__wave = document.getElementsByClassName('boss__wave')[0];
masterPlay.addEventListener('click', ()=>{
    if (Music.paused || Music.currentTime <=0) {
        Music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        boss__wave.classList.add('active');
    } else {
        Music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        boss__wave.classList.remove('active');
    }
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('play_list')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}


let index = 0;
let boss_img_poster = document.getElementById('boss_img_poster'); 
let title = document.getElementById('title'); 
Array.from(document.getElementsByClassName('play_list')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays(); 
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        Music.src = `Depot/audio/${index}.mp3`;
        boss_img_poster.src = `Depot/image/${index}.jpg`;
        Music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        boss__wave.classList.add('active');
        Music.addEventListener('ended', ()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            boss__wave.classList.remove('active');
        })
    })
})

let TimeStart = document.getElementById('TimeStart');
let TimeEnd = document.getElementById('TimeEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

Music.addEventListener('timeupdate',()=>{
    let Music_time = Music.currentTime;
    let Music_dime = Music.duration;

    let min = Math.floor(Music_dime/60);
    let sec = Math.floor(Music_dime%60);
    if(sec < 10){
        sec = `0${sec}`
    }
    TimeEnd.innerText = `${min}:${sec}`;


    let min1 = Math.floor(Music_time/60);
    let sec1 = Math.floor(Music_time%60);
    if(sec1 < 10){
        sec1 = `0${sec1}`
    }
    TimeStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((Music.currentTime/Music.duration)*100);
    seek.value = progressbar;
    let seekbar  = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

})

seek.addEventListener('change', ()=>{
    Music.currentTime = seek.value * Music.duration/100;
})

Music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    boss__wave.classList.remove('active');
}) 

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down');
        vol_icon.classList.add('bi-volume-mute');
        vol_icon.classList.remove('bi-volume-up');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down');
        vol_icon.classList.remove('bi-volume-mute');
        vol_icon.classList.remove('bi-volume-up');
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down');
        vol_icon.classList.remove('bi-volume-mute');
        vol_icon.classList.add('bi-volume-up');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    Music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('organization')).length;
    }

    Music.src = `Depot/audio/${index}.mp3`;
    boss_img_poster.src = `Depot/image/${index}.jpg`;
    Music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    
})

next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('organization')).length){
        index = 1;
    }

    Music.src = `Depot/audio/${index}.mp3`;
    boss_img_poster.src = `Depot/image/${index}.jpg`;
    Music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    
})

//Thanh trượt
let left_Gallery = document.getElementById('left_Gallery');
let right_Gallery = document.getElementById('right_Gallery');
let  js_Gallery_slider = document.getElementsByClassName('js_Gallery_slider')[0];


left_Gallery.addEventListener('click', ()=>{
    js_Gallery_slider.scrollLeft -= 330;
})

right_Gallery.addEventListener('click', ()=>{
    js_Gallery_slider.scrollLeft += 330;
})


let left_Gallerys = document.getElementById('left_Gallerys');
let right_Gallerys = document.getElementById('right_Gallerys');
let  js_Gallery_sliders = document.getElementsByClassName('js_Gallery_sliders')[0];


left_Gallerys.addEventListener('click', ()=>{
    js_Gallery_sliders.scrollLeft -= 330;
})

right_Gallerys.addEventListener('click', ()=>{
    js_Gallery_sliders.scrollLeft += 330;
})

let left_Galleryss = document.getElementById('left_Galleryss');
let right_Gallerysss = document.getElementById('right_Galleryss');
let  js_Gallery_sliderss = document.getElementsByClassName('js_Gallery_sliderss')[0];


left_Galleryss.addEventListener('click', ()=>{
    js_Gallery_sliderss.scrollLeft -= 330;
})

right_Gallerysss.addEventListener('click', ()=>{
    js_Gallery_sliderss.scrollLeft += 330;
})

//-------------------------------------------------------

//click btn sign in
const LoginBtn = document.querySelector('.js-header__navbar-item')
const CreateBtn = document.querySelector('.js-auth-form__switch-btn')
const ModalAuthForms = document.querySelector('.js-auth-forms')
const Modal = document.querySelector('.js-modal')
const ModalAuthForm = document.querySelector('.js-auth-form')
const ModalClose = document.querySelector('.js-modal__close')
const ModalCloses = document.querySelector('.js-modal__closes')
const BackSignIn = document.querySelector('.js-Create')

// Hàm hiện thị modal SignIn
function showSignIn() {
    Modal.classList.add('open') 
    ModalAuthForm.style.display = 'block'
    ModalAuthForms.style.display = 'none'
}

function showCreate() {
    ModalAuthForm.style.display = 'none'
    ModalAuthForms.style.display = 'block'
}

//Hàm ẩn modal SignIn
function hideSignIn() {
    Modal.classList.remove('open') 
}
//Hàm ẩn modal Create
function hideSignIns() {
    Modal.classList.remove('open') 
}
//chặn nổi bọt
function BlockAuthForm(event) {
    event.stopPropagation()
}
//quay lại SignIn
function backShowSignIn(){
    ModalAuthForms.style.display = 'none'
    ModalAuthForm.style.display = 'block'
}

// Sự kiện lắng nghe click Sign in
LoginBtn.addEventListener('click', showSignIn)
// Sự kiện lắng nghe click create
CreateBtn.addEventListener('click', showCreate)
//click nút close Signin
ModalClose.addEventListener('click', hideSignIn)
//click nút close create
ModalCloses.addEventListener('click', hideSignIns)
//click khoảng không 
Modal.addEventListener('click', hideSignIn)
//click ngắn chặn nổi bọt Sign In
ModalAuthForm.addEventListener('click',  BlockAuthForm)
//click ngắn chặn nổi bọt create
ModalAuthForms.addEventListener('click',  BlockAuthForm)
//click quay lại SignIn 
BackSignIn.addEventListener('click', backShowSignIn)
// click signin
document.addEventListener("DOMContentLoaded", function () {
    const loginnBtn = document.getElementById("btn-login"); // Chọn nút đăng nhập

    loginnBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Ngăn load lại trang

        const email = document.querySelector("input[placeholder='Your email']").value;
        const password = document.querySelector("input[placeholder='Your password']").value;

            // if (!email || !password) {
            //     alert("Please enter email and password!");
            //     return;
            // }

        const requestData = { email, password };

        try {
            const response = await fetch("https://localhost:7220/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
                mode: "cors"  // Thêm dòng này để tránh lỗi CORS

            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful! 🎉");
                localStorage.setItem("token", data.token); // Lưu token
                hideSignIn();
                // window.location.href = "/dashboard.html"; // Chuyển hướng sau khi đăng nhập
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server!");
        }
    });
});
/// click register 
document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.querySelector(".btn--primary"); // Lấy nút "Continue"
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    registerBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Ngăn chặn reload trang

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Gửi dữ liệu đến API
        const requestData = { email, password ,confirmPassword }; // fullName có thể sửa lại nếu cần
        try {
            const response = await fetch("https://localhost:7220/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData) ,
                mode: "cors"  // Thêm dòng này để tránh lỗi CORS

            });

            const data = await response.json();

            if (response.ok) {
                alert("User registered successfully! 🎉");
                showSignIn();    // Hiện form đăng nhập

                //window.location.reload(); // Reload trang hoặc chuyển hướng nếu cần
            } else {
                alert("Registration failed: " + (data.errors ? data.errors.join(", ") : data.message));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server!");
        }
    });
});