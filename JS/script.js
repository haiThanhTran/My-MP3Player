const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const heading = $('.Main-screen-header h4')
const cdThumb = $('.cd .cd-thumb');
const audio = $('.audio');
const loopBtn = $('.btn-repeat');
const prevBtn = $('.btn-prev');
const playBtn = $('.btn-play')
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
console.log()
const playIcon = $('.nonePlay');
const mainScreen = $('#Main-screen'); // Thêm này để có thể thao tác với class của Main-screen
const progress = $('.progress');
const playlist = $('.playlist');
const song = $('.song');
let isChangingSong = false;
let isLoop = false;
const volume = $('.volume');
const develop_info = $('#develop-info');
const option = $('.home-profile');
const home_screen = $('.home-icon');
const screen_for_pc = $('#screen-for_pc');
let profile = false;
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [

        {
            name: 'Nơi tình yêu kết thúc',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Nơi Tình Yêu Kết Thúc  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/noi tinh yeu ket thuc.jpg'
        }, {
            name: 'Nơi tình yêu bắt đầu',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Nơi Tình Yêu Bắt Đầu  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/noi tinh yeu bat dau.jpg'
        }, {
            name: 'Chỉ còn lại tình yêu',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Chỉ Còn Lại Tình Yêu  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/chi con lai tinh yeu.jpg'
        }, {
            name: 'Always Remember Us This Way',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Always Remember Us This Way  Bùi Anh Tuấn Cover  Music Home Official Live Performance.mp3',
            image: 'assets/image/always remember.....jpg'
        }, {
            name: 'Cưới nhau đi',
            singer: 'Bùi Anh Tuấn-Hiền Hồ',
            path: 'assets/music/y2mate.com - Cưới Nhau Đi Yes I Do  Bùi Anh Tuấn Hiền Hồ  Music Home Official Live Performance.mp3',
            image: 'assets/image/cuoi nhau di.jpg'
        }, {
            name: 'Perfect',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Perfect  Bùi Anh Tuấn Cover  Music Home Official Live Performance.mp3',
            image: 'assets/image/perfect.jpg'
        }, {
            name: 'Người Điên',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Người Điên  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/nguoi dien.jpg'
        }, {
            name: 'IF',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - IF  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/if.jpg'
        }, {
            name: 'Ai Cũng Có Ngày Xưa',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Ai Cũng Có Ngày Xưa  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/ai cung co ngay xua.jpg'
        }, {
            name: 'Buông',
            singer: 'Bùi Anh Tuấn',
            path: 'assets/music/y2mate.com - Buông  Bùi Anh Tuấn  Music Home Official Live Performance.mp3',
            image: 'assets/image/buông.jpg'
        }
    ],
    defineProperties: function () {


        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });

    }

    ,
    render: function () {
        const html = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="playlist-img ">
            <img src="${song.image}" alt="">
            </div>
            <div class="song-detail ">
            <h4 class="song-name"> ${song.name} </h4>
            <div class="singger-detail">
            ${song.singer}
            </div>
            </div>
            <div class="playlist-more ">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            
            </div>
            `;
        });
        playlist.innerHTML = html.join('\n')
    },
    handleEvents: function () {
        const _this = this;

        const widthCd = cd.offsetWidth;

        //Xử lý quay CD

        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: 'rotate(360deg)'
                }
            ], {
            duration: 10000,
            iterations: Infinity

        }

        )
        cdThumbAnimate.pause();



        // Xử lý phóng to thu nhỏ CD khi cuộn playlist
        playlist.onscroll = function () {
            const scrollTop = playlist.scrollTop;
            console.log('scrooktopL:' + scrollTop);

            // Giảm chiều cao của CD khi cuộn xuống
            const newCdWidth = widthCd - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / widthCd;


        }

        //Xử lý khi ấn home

        home_screen.onclick = function () {
            develop_info.style.display = 'none'
            screen_for_pc.style.display = 'block'
        }

        // Xử lý khi ấn profile
        option.onclick = function () {
            

            develop_info.style.display = 'block'
            screen_for_pc.style.display = 'none'

           


        }





        //Xử lý khi tăng âm lượng

        volume.oninput = function (e) {
            const volumeHandle = e.target.value;
            audio.volume = volumeHandle * 0.02;

        }

        // Xử lý khi click play

        playBtn.onmouseup = function () {

            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            audio.onplay = function () {
                cdThumbAnimate.play();

                _this.isPlaying = true;
                mainScreen.classList.add("playing")
                mainScreen.classList.remove("nonePlay")

            }
            audio.onpause = function () {
                cdThumbAnimate.pause();
                _this.isPlaying = false;
                mainScreen.classList.remove("playing")
                mainScreen.classList.add("nonePlay")
            }

            audio.ontimeupdate = function () {

                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                progress.value = progressPercent;

            }

            //Xử lý khi tua song
            progress.oninput = function (e) {

                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime;

            }




        }


        // Xử lý khi ấn nút repeat
        loopBtn.onclick = function () {
            _this.isLoop = !_this.isLoop
            loopBtn.classList.toggle('active', _this.isLoop)
        }



        //Xử lý khi ấn next
        nextBtn.onclick = function () {

            if (_this.isRandom) {
                _this.playRandomSong();

            } else {
                _this.nextSong();
            }


            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            audio.onplay = function () {
                cdThumbAnimate.play();

                _this.isPlaying = true;
                mainScreen.classList.add("playing")
                mainScreen.classList.remove("nonePlay")
            }
            audio.onpause = function () {
                cdThumbAnimate.pause();
                _this.isPlaying = false;
                mainScreen.classList.remove("playing")
                mainScreen.classList.add("nonePlay")
            }
            //Xử lý khi tua song
            progress.oninput = function (e) {

                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime;

            }

            audio.ontimeupdate = function () {

                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                if (progressPercent) {
                    progress.value = progressPercent;
                }

                console.log(progressPercent)

            }


            _this.render()
            audio.play();
            _this.scrollIntoActiveSong();

        }


        prevBtn.onclick = function () {


            if (_this.isRandom) {
                _this.playRandomSong();

            } else {
                _this.prevSong();
            }


            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            audio.onplay = function () {
                cdThumbAnimate.play();

                _this.isPlaying = true;
                mainScreen.classList.add("playing")
                mainScreen.classList.remove("nonePlay")
            }
            audio.onpause = function () {
                cdThumbAnimate.pause();
                _this.isPlaying = false;
                mainScreen.classList.remove("playing")
                mainScreen.classList.add("nonePlay")
            }
            //Xử lý khi tua song
            progress.oninput = function (e) {

                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime;

            }

            audio.ontimeupdate = function () {

                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                if (progressPercent) {
                    progress.value = progressPercent;
                }
                console.log(progressPercent)

            }

            _this.render();
            audio.play();
            _this.scrollIntoActiveSong();

        }


        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);

        }



        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.playlist-more')) {
                if (e.target.closest('.song:not(.active)')) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();

                    //Xử lý khi tua song
                    progress.oninput = function (e) {

                        const seekTime = audio.duration / 100 * e.target.value
                        audio.currentTime = seekTime;

                    }
                    audio.ontimeupdate = function () {

                        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                        if (progressPercent) {
                            progress.value = progressPercent;
                        }
                        console.log(progressPercent)

                    }
                    audio.onplay = function () {
                        cdThumbAnimate.play();

                        _this.isPlaying = true;
                        mainScreen.classList.add("playing")
                        mainScreen.classList.remove("nonePlay")
                    }
                    audio.onpause = function () {
                        cdThumbAnimate.pause();
                        _this.isPlaying = false;
                        mainScreen.classList.remove("playing")
                        mainScreen.classList.add("nonePlay")
                    }
                    if (!isNaN(audio.duration)) {
                        progress.value = 0;

                    }


                }

                if (e.target.closest('.playlist-more')) {
                    console.log('123')
                }
            }

        }



        audio.onended = function () {
            if (isNaN(audio.duration)) {
                progress.value = 0;
            } else {
                progress.value = 0;

            }
            if (_this.isLoop) {

                audio.play();

            }
            else {
                nextBtn.click();
            }

        }



    },

    scrollIntoActiveSong: function () {

        setTimeout(() => $('.song.active').scrollIntoView(
            {
                behavior: 'smooth',
                block: 'end',

            },

        ), 100)



    },

    loadCurrentSong: function () {


        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        if (isNaN(audio.duration)) {
            progress.value = 0;
        } else {
            progress.value = 0;

        }


    },



    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        if (!isNaN(audio.duration)) {
            progress.value = 0;
        }

    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        if (!isNaN(audio.duration)) {
            progress.value = 0;
        }

    },
    playRandomSong: function () {
        let randomSong;
        do {

            randomSong = Math.floor(Math.random() * this.songs.length);

        } while (randomSong == this.currentIndex)
        this.currentIndex = randomSong;
        this.loadCurrentSong();

    }

    ,
    start: function () {
        //Định nghĩa các thuộc tính cho Object
        this.defineProperties();
        //Tải thông tin bài hát đầu tiên vào UI khi chạy app
        this.loadCurrentSong();




        // Lắng nghe và xử lý các sự kiện
        this.handleEvents();


        //render lại playlist
        this.render();
    }


}

app.start();

