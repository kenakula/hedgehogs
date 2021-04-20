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
      this.likeButton = this.tooltip.querySelector('.js-like-btn');
      this.likeCount = this.likeButton.querySelector('.js-like-count');

      this.toggleTooltip = this.toggleTooltip.bind(this);

      this.button.addEventListener('click', this.toggleTooltip);
      this.likeButton.addEventListener('click', this.addLike.bind(this));
    }

    toggleTooltip(evt) {
      const target = evt.target.closest('.js-card-tooltip-button');

      if (target) {
        this.tooltip.classList.toggle(this.activeClass);
      }
    }

    addLike(evt) {
      const target = evt.target.closest('.js-like-btn');

      if (target) {
        const likes = +this.likeCount.textContent;

        if (!target.classList.contains(this.activeClass)) {
          target.classList.add(this.activeClass);
          this.likeCount.textContent = likes + 1;
        } else {
          target.classList.remove(this.activeClass);
          this.likeCount.textContent = likes - 1;
        }
      }
    }
  }

  tooltips.forEach((item) => {
    const tooltipInst = new Tooltip(item);
  });
};

export {cardTooltip};
