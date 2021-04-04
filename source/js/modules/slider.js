const slider = () => {
  const sliders = document.querySelectorAll('.js-slider-block-container');

  if (sliders.length) {
    sliders.forEach((sliderEl) => {
      const initSlider = () => {
        const container = sliderEl.querySelector('.swiper-container');
        const btns = sliderEl.querySelectorAll('.slider-block__button');

        let swiper = new Swiper(container, {
          loop: false,
          observeParents: true,
          observer: true,
          spaceBetween: 35,
          navigation: {
            prevEl: btns[0],
            nextEl: btns[1],
          },
          speed: 400,
          slidesPerView: 'auto',
          breakpoints: {
            1150: {
              spaceBetween: 37,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 2,
            },
          },
        });
      };

      initSlider();
    });
  }
};

export {slider};
