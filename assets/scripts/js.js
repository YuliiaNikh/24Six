//Dashed line between two cards
const card = document.querySelectorAll('.step-card');
const cardImage = document.querySelectorAll('.step-card .card-header');
let dashedLineContainers = document.querySelectorAll('.dashed-line');

function drawDashedLine(){
    let distanceBetweenCards = (card[1].getBoundingClientRect().left - card[0].getBoundingClientRect().right + cardImage[0].offsetLeft);

    for (const element of dashedLineContainers) {
        element.style.width = distanceBetweenCards+'px';
    }
    for (let i = 0; i < 2; i++){
        dashedLineContainers[i].style.left = (card[i].offsetLeft + cardImage[i].offsetLeft + cardImage[i].offsetWidth + 44)+'px';
    }
}

if ( card.length > 0){
    drawDashedLine();

    window.addEventListener('resize', function (event) {
        drawDashedLine()
    }, true);
}


//Footer current year
document.getElementById("year").innerHTML = new Date().getFullYear();


//Scroll Animation
AOS.init();


//Play button
const playButton = document.getElementsByClassName('play-btn')[0];
const video = document.getElementById('filter-video');

playButton.addEventListener('click', function() {
    this.style.display = 'none';
    video.play();
});

//Svg animation when visible

// Get the position on the page of the SVG
let svgLocation = document.getElementById("section-issues__arrow").getBoundingClientRect();

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

// Add an event handler to the document for the "onscroll" event
document.addEventListener("scroll", scrollAnimTriggerCheck);


//Parallax

let rellax = new Rellax('.cols', {
    center: true,
    speed: -2,
});




