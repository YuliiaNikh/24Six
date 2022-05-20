const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() })
})


// Change navbar background color and hide back link on scroll
const navbar = document.getElementById('navbar');
const backLink = document.getElementById('back-link');

window.onscroll = function () {
    if (window.scrollY > 20) {
        navbar.classList.add('nav-active');
        if (backLink) {
            backLink.classList.add('hidden');
        }
    } else {
        navbar.classList.remove('nav-active');
        if (backLink) {
            backLink.classList.remove('hidden');
        }
    }
};


//Dashed line between two cards
const card = document.querySelectorAll('.step-card');
const cardImage = document.querySelectorAll('.step-card .card-header');
let dashedLineContainers = document.querySelectorAll('.dashed-line');

function drawDashedLine() {
    let distanceBetweenCards = (card[1].getBoundingClientRect().left - card[0].getBoundingClientRect().right + cardImage[0].offsetLeft);

    for (const element of dashedLineContainers) {
        element.style.width = distanceBetweenCards + 'px';
    }
    for (let i = 0; i < 2; i++) {
        dashedLineContainers[i].style.left = (card[i].offsetLeft + cardImage[i].offsetLeft + cardImage[i].offsetWidth + 44) + 'px';
    }
}

if (card.length > 0) {
    drawDashedLine();

    window.addEventListener('resize', function (event) {
        drawDashedLine()
    }, true);
}


//Footer current year
document.getElementById("year").innerHTML = new Date().getFullYear();


//Scroll Animation
AOS.init({once: true});


//Svg animation when visible

// Get the position on the page of the SVG
let sectionIArrow = document.getElementById("section-issues__arrow");
if (sectionIArrow) {
    let svgLocation = sectionIArrow.getBoundingClientRect();

// Scroll offset that triggers animation start.
// In this case it is the bottom of the SVG.
    let offsetToTriggerAnimation = svgLocation.y;

// Function to handle the scroll event.
// Add an event handler to the document for the "onscroll" event
    function scrollAnimTriggerCheck(evt) {
        let viewBottom = window.scrollY + window.innerHeight;
        if (viewBottom > offsetToTriggerAnimation) {
            // Start the SMIL animation
            document.getElementById("anim").beginElement();
            // Remove the event handler so it doesn't trigger again
            document.removeEventListener("scroll", scrollAnimTriggerCheck);
        }
    }
}

// Add an event handler to the document for the "onscroll" event
document.addEventListener("scroll", scrollAnimTriggerCheck);

//Play/stop video
let videoBoxes = document.querySelectorAll('.video-box');
let videoModalEl = document.getElementsByClassName('modal-video');
let faqAccordion = document.getElementById('accordionSupport');


function stopVideo(e) {
    e.pause();
    e.currentTime = 0;
}

for (let videoBox of videoBoxes) {
    videoBox.removeAttribute('controls');

    videoBox.closest('div').querySelector('.play-btn').addEventListener('click', function () {
        this.style.display = 'none';
        videoBox.setAttribute("controls", "controls");
        videoBox.play();
    })

    videoBox.addEventListener('click', function () {
        this.closest('div').querySelector('.play-btn').style.display = 'none';
    })

    for (let modalVideo of videoModalEl) {
        modalVideo.addEventListener('hidden.bs.modal', event => {
            stopVideo(videoBox);
        })
    }

    if (faqAccordion) {
        faqAccordion.addEventListener('hidden.bs.collapse', event => {
            stopVideo(videoBox);
        })
    }

    window.addEventListener('scroll', function (){
        videoBox.pause();
    })
}

//Video

const videoFilter = document.querySelectorAll('.filter-video');
const videoArtists = document.querySelectorAll('.artists-video');
const videoPopUp = document.querySelectorAll('.popup-video');

const srcFilter = 'https://stream.mux.com/9On9MWt9ZA01A3F01hGnzkVNf02s6n2b6HfDgIjyxYeKxg.m3u8';
const srcArtists = 'https://stream.mux.com/UdG6OSov2DVZVCToKw00NbNYgZU3uYopTvOjXtSkjaYc.m3u8';
const scrPopUp = 'https://stream.mux.com/45tb01KwSf5wVl2ygXnyz2Sg89QMZF1QJPuKpS01l00800c.m3u8';

const data = [
    {
        videos: videoFilter,
        src: srcFilter,
    },
    {
        videos: videoArtists,
        src: srcArtists,
    },
    {
        videos: videoPopUp,
        src: scrPopUp,
    }
]

for (let item of data) {
    for (let video of item.videos) {
        if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
            // Some browsers (safari and ie edge) support HLS natively
            video.src = item.src;
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(item.src);
            hls.attachMedia(video);
        } else {
            console.error("This is a legacy browser that doesn't support MSE");
        }
    }
}







