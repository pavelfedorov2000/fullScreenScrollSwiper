'use strict';

window.addEventListener('DOMContentLoaded', () => {
    let pageSlider;
    const pageSlides = document.querySelectorAll('.section');
    const lastSlideIndex = pageSlides.length - 1;
    const prevBtn = document.querySelector('.nav-btn[data-direction="prev"]');
    const nextBtn = document.querySelector('.nav-btn[data-direction="next"]');
    let isPageSliderInitialized = document.querySelector(".page-slider").classList.contains("swiper-initialized");
    let isPc = window.innerWidth > 1024;
    let isTablet = window.innerWidth <= 1024;
    const pageSliderSpeed = 800;

    class PageSlider {
        constructor(isPageSliderInitialized, isPc, isTablet, pageSliderSpeed) {
            this.isPageSliderInitialized = isPageSliderInitialized;
            this.isPc = isPc;
            this.isTablet = isTablet;
            this.currentSlide = 0;
            this.speed = pageSliderSpeed;
        }

        init() {
            if (isPc && !isPageSliderInitialized) {
                pageSlider = new Swiper(".page-slider", {
                    direction: "vertical",
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: this.speed,


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
                    parallax: true,

                    // Navigation arrows
                    /* navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    }, */

                    on: {
                        slideChange: (swiper) => {
                            const currentSlide = swiper.realIndex;
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

            if (currentSlide === 1) {
                this.disablePrevBtn();
            }

            if (currentSlide !== 0) {
                currentSlide -= 1;
                this.currentSlide = currentSlide;
                this.slideTo(currentSlide);
            }
        }

        nextSlide() {
            let currentSlide = this.currentSlide;

            this.enablePrevBtn();

            if (currentSlide === lastSlideIndex - 1) {
                this.disableNextBtn();
            }

            if (currentSlide !== lastSlideIndex) {
                currentSlide += 1;
                this.currentSlide = currentSlide;
                this.slideTo(currentSlide);
            }
        }
    }

    const pageSliderInstance = new PageSlider(isPageSliderInitialized, isPc, isTablet, pageSliderSpeed);
    pageSliderInstance.init();

    prevBtn.addEventListener('click', () => pageSliderInstance.prevSlide());

    nextBtn.addEventListener('click', () => pageSliderInstance.nextSlide());

    window.addEventListener('resize', function () {
        pageSliderInstance.init();
    });
});