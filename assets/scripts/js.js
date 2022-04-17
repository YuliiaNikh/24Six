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

drawDashedLine();

window.addEventListener('resize', function (event) {
    drawDashedLine()
}, true);

//Footer current year
document.getElementById("year").innerHTML = new Date().getFullYear();


//Scroll Animation
AOS.init();

