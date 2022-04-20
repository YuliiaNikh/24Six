document.addEventListener("DOMContentLoaded", function () {
    let featuresSlideNumber = document.getElementById('slide-item__number');

    function visualisedSlideNumber(slideIndex){
        if (slideIndex < 9){
            featuresSlideNumber.innerText =`0${slideIndex + 1}`;
        } else {
            featuresSlideNumber.innerText = slideIndex + 1;
        }
    }

    let swiper = new Swiper(".testimonials-carousel", {
        slidesPerView: "auto",
        spaceBetween: 32,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    let swiper2 = new Swiper(".features-slider-text", {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        mousewheel: true,
        breakpoints: {
            768: {
                autoHeight: false,
                direction: 'vertical',
                slidesPerView: 3,
                pagination: {
                    el: ".swiper-pagination",
                    type: 'progressbar',
                },
            }
        },
        on:{
            init: function (){
                visualisedSlideNumber(this.realIndex);
            },
            slideChange: function () {
                visualisedSlideNumber(this.realIndex);
            }
        }
    });

    let swiper3 = new Swiper(".features-slider-img", {
        spaceBetween: 10,
        mousewheel: true,
        breakpoints: {
            768: {
                direction: 'vertical',
            }
        },
    })

    swiper3.params.control = swiper2;
    swiper2.params.control = swiper3;

    let isSliding = false;

    function handleSlide(swiperInstance, swiperDirection) {
        if (isSliding) return;
        isSliding = true;
        if (swiperDirection === 0) {
            swiperInstance.slideNext();
        } else {
            swiperInstance.slidePrev();
        }
        isSliding = false;
    }

    swiper2.on('slideNextTransitionStart', () => {
        handleSlide(swiper3, 0);
    })

    swiper2.on('slidePrevTransitionStart', () => {
        handleSlide(swiper3, 1);
    })

    swiper3.on('slideNextTransitionStart', () => {
        handleSlide(swiper2, 0);
    })

    swiper3.on('slidePrevTransitionStart', () => {
        handleSlide(swiper2, 1);
    })

    window.addEventListener("scroll", function(evt) {
        evt.stopPropagation();
        document.getElementById('features-slider-text').dispatchEvent(evt);
    });
});

