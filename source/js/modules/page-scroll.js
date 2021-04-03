const pageScroll = () => {
  const scrollableContainer = document.querySelector('.wrapper');

  const scrollPositionHandler = () => {
    // let scrollPosition = scrollableContainer.scrollTop;
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 0) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  };

  // возвращает скролл при перезагрузке
  let scrollTimeout;

  window.onload = function () {
    if (window.location.href === localStorage.getItem('lastUrl')) {
      scrollableContainer.scrollTop = localStorage.getItem('scrollTop');
    } else {
      localStorage.setItem('lastUrl', window.location.href);
      localStorage.setItem('scrollTop', 0);
    }
  };

  scrollableContainer.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      localStorage.setItem('scrollTop', scrollableContainer.scrollTop);
    }, 100);
  });

  document.addEventListener('scroll', scrollPositionHandler);
  document.addEventListener('DOMContentLoaded', scrollPositionHandler);
};

export {pageScroll};
