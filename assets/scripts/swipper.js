document.addEventListener("DOMContentLoaded", function () {
    let featuresSlideNumber = document.getElementById('slide-item__number');

    function visualisedSlideNumber(slideIndex) {
        if (slideIndex < 9) {
            featuresSlideNumber.innerText = `0${slideIndex + 1}`;
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
        updateOnWindowResize: true,
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
        },
        pagination: {
            el: ".swiper-pagination",
            type: 'progressbar',
        },
        on: {
            init: function () {
                visualisedSlideNumber(this.realIndex);
            },
            slideChange: function () {
                visualisedSlideNumber(this.realIndex);
            },
            reachEnd: function () {
                this.snapGrid = [...this.slidesGrid];
            },
        },
        breakpoints: {
            768: {
                spaceBetween: 30,
                direction: 'vertical',
                autoHeight: false,
                slidesPerView: 'auto',
                loopFillGroupWithBlank: true,
                allowTouchMove: false
            }
        },

    });

    let swiper3 = new Swiper(".features-slider-img", {
        spaceBetween: 10,
        autoHeight: true,
        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
        },
        breakpoints: {
            768: {
                direction: 'vertical',
                loopFillGroupWithBlank: true,
                allowTouchMove: false,
                on: {
                    reachEnd: function () {
                        this.snapGrid = [...this.slidesGrid];
                    },
                }
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

    const swiper4 = new Swiper('.cards-wrapper', {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 10,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    })

    /*Player page*/

    let swiper5 = new Swiper(".payer-hero__slider-thumbsSlider", {
        spaceBetween: 32,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
    });
    let swiper6 = new Swiper(".payer-hero__slider", {
        spaceBetween: 10,
        thumbs: {
            swiper: swiper5,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    /*Marquee*/
    let SwiperTop = new Swiper('.swiper--top', {
        grabCursor: false,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        shortSwipes: false,
        longSwipes: false,
        allowTouchMove: false,
        simulateTouch: false,
        autoplay: {
            delay: 1,
            reverseDirection: true,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        spaceBetween: 10,
        freeMode: true,
        speed: 3000,
        breakpoints: {
            768: {
                spaceBetween: 20,
            }
        }
    });

    let isInitialTransition = true;

    let SwiperMiddle = new Swiper('.swiper--middle', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: true,
        spaceBetween: 20,
        speed: 700,
        grabCursor: false,
        allowTouchMove: false,
        simulateTouch: false,
        disableOnInteraction: false,
        breakpoints: {
            768: {
                spaceBetween: 30,
            }
        },
        on: {
            slideNextTransitionStart: function (swiper) {
                if (!isInitialTransition) {
                    $(swiper.slides[swiper.activeIndex]).addClass('transform');
                    $(swiper.el).find('.swiper-slide').removeClass('transform-initial');
                }
                isInitialTransition = false;
            },
            slideNextTransitionEnd: function (swiper) {
                $(swiper.el).find('.swiper-slide-prev').removeClass('transform');
                $(swiper.el).find('.swiper-slide-duplicate-prev').removeClass('transform');
            }
        }
    });
    let SwiperInfo = new Swiper('.swiper-album_info', {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: true,
        spaceBetween: 20,
        speed: 700
    })

    /*Favorite Artists*/

    let swiperArtists = new Swiper('.artists-slider', {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 2,
        spaceBetween: 16,
        observer: true,
        observeParents: true,
        breakpoints: {
            640: {
                centeredSlides: true,
                centeredSlidesBounds: true,
                slidesPerView: 'auto',
                spaceBetween: 24
            },
            1024:{
                slidesPerView: 'auto',
                observer: false,
                observeParents: false,
                centeredSlides: true,
                centeredSlidesBounds: true,
            }
        },
    })

});


