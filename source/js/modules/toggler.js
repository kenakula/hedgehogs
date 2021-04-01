import {disableScrolling, enableScrolling} from '../utils/scroll-lock';

const toggler = () => {
  const TOGGLER_EXPANDED_CLASS = 'toggler--close';

  const togglerBtn = document.querySelector('.js-toggler');

  if (!togglerBtn) {
    return;
  }

  const toggleMenu = (btn, nav, navClass) => {
    if (!btn.classList.contains(TOGGLER_EXPANDED_CLASS)) {
      btn.classList.add(TOGGLER_EXPANDED_CLASS);
      nav.classList.add(navClass);
      disableScrolling();
    } else {
      btn.classList.remove(TOGGLER_EXPANDED_CLASS);
      nav.classList.remove(navClass);
      enableScrolling();
    }
  };

  const onTogglerClickExpandMenu = (evt) => {
    const target = evt.target.closest('.js-toggler');

    if (target) {
      const menuId = target.dataset.targetId;
      const menuEl = document.querySelector(`#${menuId}`);
      const menuExpandedClass = target.dataset.targetClassToggle;

      if (menuEl) {
        toggleMenu(target, menuEl, menuExpandedClass);
      }
    }
  };

  togglerBtn.addEventListener('click', onTogglerClickExpandMenu);
};

export {toggler};
