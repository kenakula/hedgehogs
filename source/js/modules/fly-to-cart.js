const flyToCart = (item) => {
  const getItemPosition = (el) => {
    return el.getBoundingClientRect();
  };

  const setItem = (box, el) => {
    el.style.left = `${box.left}px`;
    el.style.top = `${box.top + window.pageYOffset}px`;
    el.style.width = `${box.width}px`;
    el.style.height = `${box.height}px`;
  };

  const renderCard = () => {
    const ghostItem = item.cloneNode(true);
    const position = getItemPosition(item);

    ghostItem.classList.add('card--ghost');
    setItem(position, ghostItem);
    document.documentElement.appendChild(ghostItem);
    setTimeout(() => {
      ghostItem.remove();
    }, 1000);
  };

  renderCard();
};

export {flyToCart};
