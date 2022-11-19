'use strict';

window.addEventListener('DOMContentLoaded', () => {
    let pageSlider;
    let isPageSliderInitialized = document.querySelector('.page-slider').classList.contains('swiper-initialized');
    let isPc = window.innerWidth >= 1025;
    let isTablet = window.innerWidth < 1024;
    const prevBtn = document.querySelector('.nav-btn--prev');
    const nextBtn = document.querySelector('.nav-btn--next');

    class PageSlider {
        constructor(pageSlider, isPc, isTablet, pageSlides, speed) {
            this.pageSlider = pageSlider;
            this.isPc = isPc;
            this.isTablet = isTablet;
            this.pageSlides = pageSlides;
            this.speed = speed;
            this.currentSlide = 0;
            this.lastSlideIndex = this.pageSlides.length - 1;
        }

        init() {
            let isPc = this.isPc;
            let isTablet = this.isTablet;

            if (isPc && !isPageSliderInitialized) {
                pageSlider = new Swiper(".page-slider", {
                    direction: "vertical",
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: 800,


                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                        pageUpDown: true
                    },

                    mousewheel: {
                        sensitivity: 1,
                    },

                    watchOverflow: true,
                    init: false,
                    allowTouchMove: false,

                    // Navigation arrows
                    /* navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    }, */

                    on: {
                        slideChange: (swiper) => {
                            let currentSlide = swiper.realIndex;
                            let lastSlideIndex = this.lastSlideIndex;

                            this.currentSlide = currentSlide;

                            if (currentSlide === 0) {
                                this.disablePrevBtn();
                            } else if (currentSlide === lastSlideIndex) {
                                this.disableNextBtn();
                            } else {
                                this.enableBtns();
                            }
                        },
                    }
                });
                pageSlider.init();
            } else if (isTablet && isPageSliderInitialized) {
                pageSlider.destroy(true, true);
            }
        }

        slideTo(slide) {
            pageSlider.slideTo(slide, this.speed);
        }

        disablePrevBtn() {
            prevBtn.setAttribute('disabled', true);
        }

        disableNextBtn() {
            nextBtn.setAttribute('disabled', true);
        }

        enablePrevBtn() {
            prevBtn.removeAttribute('disabled');
        }

        enableNextBtn() {
            nextBtn.removeAttribute('disabled');
        }

        enableBtns() {
            this.enablePrevBtn();
            this.enableNextBtn();
        }

        prevSlide() {
            let currentSlide = this.currentSlide;

            this.enableNextBtn();

            if (currentSlide !== 0) {
                currentSlide -= 1;
                this.currentSlide = currentSlide;
                this.slideTo(currentSlide);
            } else {
                this.disablePrevBtn();
            }
        }

        nextSlide() {
            let currentSlide = this.currentSlide;
            let lastSlideIndex = this.lastSlideIndex;

            this.enablePrevBtn();

            if (currentSlide !== lastSlideIndex) {
                currentSlide += 1;
                this.currentSlide = currentSlide;
                this.slideTo(currentSlide);
            } else {
                this.disableNextBtn();
            }
        }
    }

    const pageSliderInstance = new PageSlider(pageSlider, isPc, isTablet, document.querySelectorAll('.section'), 800);
    pageSliderInstance.init();

    prevBtn.addEventListener('click', () => {
        pageSliderInstance.prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        pageSliderInstance.nextSlide();
    });

    window.addEventListener('resize', () => {
        pageSliderInstance.init();
    });
});