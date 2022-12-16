const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
if (menuToggle) {
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            setTimeout(() => {
                bsCollapse.toggle()
            }, 50);
        })
    })
}

// Change navbar background color and hide back link on scroll
const el = document.getElementById('navbar');
const backLink = document.getElementById('back-link');

const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("nav-active", e.intersectionRatio < 1),
    {threshold: [1]}
);

observer.observe(el);

window.onscroll = function () {
    if (window.scrollY > 20) {
        if (backLink) {
            backLink.classList.add('hidden');
        }
    } else {
        if (backLink) {
            backLink.classList.remove('hidden');
        }
    }
}


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
const footerYear = document.getElementById("year");
if (footerYear) {
    footerYear.innerHTML = new Date().getFullYear();
}

//Scroll Animation
AOS.init({
    once: true,
    disable: window.innerWidth < 767,
});


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

    // Add an event handler to the document for the "onscroll" event
    document.addEventListener("scroll", scrollAnimTriggerCheck);
}

//Play/stop video
let videoBoxes = document.querySelectorAll('.video-boxx');
let videoModalEl = document.getElementsByClassName('modal-videox');
let faqAccordion = document.getElementById('accordionSupport');


function stopVideo(e) {

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

    window.addEventListener('scroll', function () {
        videoBox.pause();
    })
}

//Video


var startedFilterVideo = false;
var startedFilterVideo2 = false;

function playVideo(className, modalId = false) {
    // if (className === 'filter-video') {
    //     if (startedFilterVideo) {
    //         let video = data[className].videos[0];
    //         console.log('pausing vid', video, video.paused, className);
    //         if (video.paused) {
    //             video.play();
    //             $('#' + className + '-play-btn').hide();
    //         } else {
    //             video.pause();
    //             $('#' + className + '-play-btn').show();
    //         }
    //         return;
    //     }
    //     startedFilterVideo = true;
    // }
    if (className === 'filter-video2') {
        if (startedFilterVideo2) {
            let video = data[className].videos[0];
            if (video.paused) {
                video.play();
                $('#' + className + '-play-btn').hide();
            } else {
                video.pause();
                $('#' + className + '-play-btn').show();
            }
            return;
        }
        startedFilterVideo2 = true;
    }
    videoFilter = document.querySelectorAll('.filter-video');
    videoArtists = document.querySelectorAll('.artists-video');
    videoPopUp = document.querySelectorAll('.popup-video');
    videoBannerPopUp = document.querySelectorAll('.popup-banner-video');
    videoFamilyPayer = document.querySelectorAll('.popup-player-video')

    srcFilter = 'https://stream.mux.com/9On9MWt9ZA01A3F01hGnzkVNf02s6n2b6HfDgIjyxYeKxg.m3u8';
    srcArtists = 'https://stream.mux.com/UdG6OSov2DVZVCToKw00NbNYgZU3uYopTvOjXtSkjaYc.m3u8';
    scrPopUp = 'https://stream.mux.com/vZaKQBH5FLwKxGkvjEgzX3X02MrqL3yjNmUBhygoxP5c.m3u8';
    scrFamilyPayer = 'https://stream.mux.com/FIin5wdSWst1Ur7hHlpEawelggycsdccRrxbAjek00Hg.m3u8'

    function getBannerVideoSrc() {
        let width = window.innerWidth;
        if (width < 520) {
            srcBannerPopUp = 'https://stream.mux.com/znoiP3FNgShtpFYevxRj6i02WPOeQ4Guj3rinSkQFN8Y.m3u8';
        } else {
            srcBannerPopUp = 'https://stream.mux.com/LLfwJPTNBmfWU00cWZBBZvBqy7HMzEYI502yMFrZW5u4k.m3u8';
        }
        processVideos();
    }

    let data = {};
    getBannerVideoSrc();

    window.onresize = getBannerVideoSrc;

    function processVideos() {
        data = {
            'filter-video': {
                videos: videoFilter,
                src: srcFilter,
            },
            'filter-video2': {
                videos: document.querySelectorAll('.filter-video2'),
                src: srcFilter,
            },
            'artists-video': {
                videos: videoArtists,
                src: srcArtists,
            },
            'popup-video': {
                videos: videoPopUp,
                src: scrPopUp,
            },
            'popup-banner-video': {
                videos: videoBannerPopUp,
                src: srcBannerPopUp,
            },
            'popup-player-video':{
                videos: videoFamilyPayer,
                src: scrFamilyPayer,
            }
        };
        for (let video of data[className].videos) {
            if (modalId)
                $('#' + modalId).modal('show').on('hidden.bs.modal', function () {
                    video.pause();
                });
            if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
                // Some browsers (safari and ie edge) support HLS natively
                video.src = data[className].src;
            } else if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(data[className].src);
                hls.attachMedia(video);
            } else {
                console.error("This is a legacy browser that doesn't support MSE");
            }
            video.play();
            if (modalId)
                $('#' + modalId + ' video').click(function () {
                    this.paused ? this.play() : this.pause();
                });
            else {
                $('#' + className + '-play-btn').hide();
            }
        }
    }
}

$(document).ready(function () {
    /*Plans switcher*/
    const planPriceRegular = $('.plan-card_price-regular');
    const planPriceSale = $('.plan-card_price-sale');
    const planSalePriceSingle = $('#single_sale-price');
    const planSalePriceDuo = $('#duo_sale-price');
    const planSalePriceFamily = $('#family_sale-price');
    const planPricePerProfileDuo = $('.duo_profile-price');
    const planPricePerProfileFamily = $('.family_profile-price');
    const additionalAccountPrice = $('.plan-card__profile-number__additional-price .additional-price');
    const priceRenew = $('.price-renew_duration');
    const priceRenewSingle = $('.plan-card__auto-renew .single-price');
    const priceRenewDuo = $('.plan-card__auto-renew .duo-price');
    const priceRenewFamily = $('.plan-card__auto-renew .family-price');

    planPriceRegular.hide();
    planPriceSale.removeClass('yearly');

    window.payment_frequency = 'monthly';
    $('input:radio[name="plans"]').change(function () {
        planPriceRegular.hide();
        if ($(this).val() === 'yearly') {
            window.payment_frequency = 'yearly';
            planPriceRegular.show();
            planPriceSale.addClass('yearly');
            planSalePriceSingle.text('99');
            planSalePriceDuo.text('149');
            planSalePriceFamily.text('199');
            planPricePerProfileDuo.text('$75');
            planPricePerProfileFamily.text('$50');
            additionalAccountPrice.text('30')
            priceRenewSingle.text('99.99');
            priceRenewDuo.text('149.99');
            priceRenewFamily.text('199.99');
            priceRenew.text('year');
        } else if ($(this).val() === 'monthly') {
            window.payment_frequency = 'monthly';
            planSalePriceSingle.text('9');
            planSalePriceDuo.text('14');
            planSalePriceFamily.text('19');
            planPricePerProfileDuo.text('$7.50');
            planPricePerProfileFamily.text('$5');
            additionalAccountPrice.text('3');
            priceRenewSingle.text('9.99');
            priceRenewDuo.text('14.99');
            priceRenewFamily.text('19.99');
            priceRenew.text('month');
        }
    })

    /*Top Banner*/
    let topBanner = $('.top-banner');
    let topBannerHeight = topBanner.height();
    let toggleButton = $('.banner-container .btn-close');
    let topRibbon = $('.top-ribbon');

    topBanner.collapse({
        toggle: false
    })

    toggleButton.on('click', function () {
        topBanner.collapse('toggle');
        AOS.init();
    })

    function showRibbon() {
        setTimeout(() => {
            topRibbon.collapse('show');
        }, 150)

        $('.banner-container').addClass('fixed-top');
        $('.navbar').addClass('banner-visible')
    }

    function hideRibbon() {
        topRibbon.collapse('hide');
        $('.banner-container').removeClass('fixed-top');
        $('.navbar').removeClass('banner-visible')
    }

    topBanner.on('hide.bs.collapse', function () {
        showRibbon();
    })

    topBanner.on('show.bs.collapse', function () {
        hideRibbon();
    })

    window.locked = false;

    function showBannerAfterScroll() {
        toggleButton.on('click', function () {
            window.locked = true;
            topBanner.collapse('show');
            topBanner.show();
            //hideRibbon();
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.locked = false;
            }, 550)
        })
    }


    showBannerAfterScroll()

    // Hide Banner on scroll

    window.onscroll = function () {
        if (window.locked) return;
        if (topBanner.hasClass("show") && window.scrollY > topBannerHeight) {
            topBanner.collapse('hide');
            topBanner.hide();
            showRibbon();
        }
    }



    //InfiniteScroll
    $(function(){
        $('.infiniteslide-ltr').infiniteslide({
            'speed': 70, //speed this is px/min
            'direction': 'right', //choose  up/down/left/right
            'pauseonhover': false, //if true,stop onmouseover
            'responsive': false, //width/height recalculation on window resize. child element's width/height define %/vw/vh,this set true.
            'clone': 2 //if child elements are too few (elements can't "infinite"), set 2 or over.
        });
    });
});










