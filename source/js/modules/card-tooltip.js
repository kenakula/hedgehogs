const cardTooltip = () => {
  const tooltips = document.querySelectorAll('.js-card-tooltip');

  if (!tooltips.length) {
    return;
  }

  class Tooltip {
    constructor(tooltip) {
      this.tooltip = tooltip;
      this.button = this.tooltip.querySelector('.js-card-tooltip-button');
      this.content = this.tooltip.querySelector('.js-card-tooltip-content');
      this.activeClass = 'active';

      this.toggleTooltip = this.toggleTooltip.bind(this);

      this.button.addEventListener('click', this.toggleTooltip);
    }

    toggleTooltip(evt) {
      const target = evt.target.closest('.js-card-tooltip-button');

      if (target) {
        this.tooltip.classList.toggle(this.activeClass);
      }
    }
  }

  tooltips.forEach((item) => {
    const tooltipInst = new Tooltip(item);
  });
};

export {cardTooltip};
