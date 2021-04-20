const parallax = () => {
  const promoList = document.querySelector('.js-promo-list');
  const hedgehogs = document.querySelectorAll('.js-hedgehog');

  if (!promoList) {
    return;
  }

  let pageY;

  const transformEl = (x, y, mult, el) => {
    el.style.transform = `translate3d(0, ${y * mult}px, 0)`;
  };

  const scrollLoop = () => {
    pageY = window.pageYOffset;

    if (window.innerWidth > 1280) {
      transformEl(0, -pageY, 0.2, promoList);
      hedgehogs.forEach((el) => {
        transformEl(0, pageY, 0.3, el);
      });
    }

    window.requestAnimationFrame(scrollLoop);
  };

  window.addEventListener('scroll', scrollLoop);
};

export {parallax};
