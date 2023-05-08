
// Get Elememt DOM
var nameCurrentSong = document.querySelector('.dashbroad .title-current-song');
var thumbCurrentSong = document.querySelector('.dashbroad .thumb-song img');
var audioElement = document.querySelector('audio');
var progressElement = document.querySelector('#progress');

// Button Element
var btnRepeat = document.querySelector(".btn-repeat");
var btnPrev = document.querySelector(".btn-prev");
var btnPlayStatus = document.querySelector('.btn-toggle-play');
var btnNext = document.querySelector('.btn-next');
var btnRandom = document.querySelector('.btn-random');

var buttonPlay = document.querySelector('.container .controller .btn-toggle-play .icon-play');
var buttonPause = document.querySelector('.container .controller .btn-toggle-play .icon-pause');


// Track List Element
const trackListPlay = document.querySelector('.track-list');
const trackList = {
    song: [
        {
            id: 0,
            name: "Lỡ hẹn với dòng Lam",
            path: 'dataSong/cohenvoidonglam.mp3',
            singger: "Thái Học",
            image: 'dataSong/thumb_thaihoc.jpg'
        }
        , {
            id: 1,
            name: "We Don't Talk Anymore",
            path: 'dataSong/wedonttalkanymore.mp3',
            singger: "Charlie Puth",
            image: 'dataSong/wedonttalkanymore.jpg'
        },
        {
            id: 2,
            name: "Me and My Broken Heart",
            path: 'dataSong/MeAndMyBrokenHeart.mp3',
            singger: "Rixton",
            image: 'dataSong/Me_&_My_Broken_Heart_CD.jpg'
        }
    ]
}

// Render List Song
function renderDataTrackList(arr) {
    const html = arr.song.map((value) => {
        return `<li class="song" id=${value.id}>
        <div class="thumb-song">
            <img src="${value.image}"
                alt="">
        </div>
        <div class="desc-song">
            <p class="name-song">
                ${value.name}
            </p>
            <p class="singger">
                ${value.singger}
            </p>
        </div>
        <div class="more">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </li>`
    })
    trackListPlay.innerHTML = html.join("")
}

// Auto focus song has index = 1
function focusSongFirst() {
    let currentSong = {};
    trackList.song.filter((value) => {
        value.id === 0 ? currentSong = value : console.log('')
    })
    console.log(currentSong)
    nameCurrentSong.innerHTML = currentSong.name;
    thumbCurrentSong.src = currentSong.image;
    audioElement.src = currentSong.path;
    audioElement.id = currentSong.id;
}
focusSongFirst();
// Select Song
function selectSong() {
    var song = document.querySelectorAll('.track-list .song');

    song.forEach((value, index) => {
        var currentSong = {};
        value.addEventListener('click', () => {
            var idSong = parseInt(value.getAttribute('id'));
            trackList.song.forEach((value) => {
                if (value.id === idSong) {
                    currentSong = value;
                    nameCurrentSong.innerHTML = currentSong.name;
                    thumbCurrentSong.src = currentSong.image;
                    audioElement.src = value.path
                    audioElement.id = idSong
                }
            })

        })

    })
}

// Play and Pause Events
function togglePlayEvents() {
    buttonPlay.addEventListener('click', () => {
        audioElement.play();
        buttonPause.classList.remove('d-none');
        buttonPlay.classList.add('d-none')
    })

    buttonPause.addEventListener('click', () => {
        audioElement.pause();
        buttonPause.classList.add('d-none');
        buttonPlay.classList.remove('d-none');
    })
}

// Repeat Event
function repeatHanddleEvents() {
    btnRepeat.addEventListener('click', () => {
        var repeatElement = btnRepeat.children[0];
        repeatElement.classList.toggle('toggle-status-repeat');
        repeatElement.classList.contains('toggle-status-repeat') ? audioElement.loop = true : audioElement.loop = false;
    })
}

repeatHanddleEvents();

// Toggle Play when click event with two button is: prev Button or next Button
function handlePlaywithButtonDifferent() {
    if (audioElement.play()) {
        buttonPause.classList.remove('d-none');
        buttonPlay.classList.add('d-none')
    } else {
        console.log('not thing')
    }
}

// Select next song
function MoveNext() {
    btnNext.addEventListener('click', () => {
        idNextSong = parseInt(audioElement.getAttribute('id')) + 1;
        var currentSong = {};
        trackList.song.forEach((value) => {
            if (value.id === idNextSong) {
                currentSong = value;
                nameCurrentSong.innerHTML = currentSong.name;
                thumbCurrentSong.src = currentSong.image;
                audioElement.src = value.path
                audioElement.id = idNextSong
            }
        })
        audioElement.play();
        handlePlaywithButtonDifferent();
    })
}

function MovePrev() {
    btnPrev.addEventListener('click', () => {
        idNextSong = parseInt(audioElement.getAttribute('id')) - 1;
        var currentSong = {};
        trackList.song.forEach((value) => {
            if (value.id === idNextSong) {
                currentSong = value;
                nameCurrentSong.innerHTML = currentSong.name;
                thumbCurrentSong.src = currentSong.image;
                audioElement.src = value.path
                audioElement.id = idNextSong
            }
        })
        audioElement.play();
        handlePlaywithButtonDifferent();
    })
}

// Get current time audio element
function updateProgressSong() {
    let progressPercent = 0;
    let durationAudio = 0;
    audioElement.onloadedmetadata = () => {
        durationAudio = audioElement.duration;
        audioElement.ontimeupdate = () => {
            progressPercent = (audioElement.currentTime / durationAudio) * 100;
            console.log("perCent", progressPercent)
            progressElement.value = progressPercent;
        }
    }
}

// Tua time Audio
progressElement.addEventListener("change", () => {
    let progressValue = parseInt(progressElement.value);
    let currentTimeValue = (progressValue / 100) * audioElement.duration;
    audioElement.currentTime = currentTimeValue;
    
})

// Render Function Handdle
function startApplication() {
    renderDataTrackList(trackList);
    selectSong();
    togglePlayEvents();
    MoveNext();
    MovePrev();
    updateProgressSong();
}

startApplication();
