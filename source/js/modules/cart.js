const cart = () => {
  const carts = document.querySelectorAll('.js-cart');

  class Cart {
    constructor(el) {
      this.addToCartButtons = document.querySelectorAll('.js-add-to-cart');

      this.block = el;
      this.openButton = this.block.querySelector('.js-cart-btn');
      this.cartCounter = this.openButton.querySelector('span');
      this.cartContent = this.block.querySelector('.js-cart-content');
      this.cartItemTemplate = this.block.querySelector('#cart-item-template');
      this.cartList = this.block.querySelector('.cart__list');

      this.openButton.addEventListener('click', this.openCart.bind(this));
      this.addToCartButtons.forEach((btn) => {
        btn.addEventListener('click', this.addToCart.bind(this));
      });
    }

    openCart(evt) {
      const target = evt.target.closest('.js-cart-btn');

      if (target) {
        this.cartContent.classList.toggle('active');
      }
    }

    addToCart(evt) {
      const target = evt.target.closest('.js-add-to-cart');

      if (!target) {
        return;
      }

      const cardItem = target.closest('.card');
      const cardTitle = cardItem.querySelector('.card__title').textContent;
      const cardImgSrc = cardItem.querySelector('.card__img img').getAttribute('src');
      const cardImgSrcset = cardItem.querySelector('.card__img img').getAttribute('srcset');

      const template = this.cartItemTemplate.content.cloneNode(true);

      const newItem = this.setCartItem(cardTitle, cardImgSrc, cardImgSrcset, cardTitle, template);
      this.cartList.appendChild(newItem);
    }

    clearItemFromCart(evt) {
      const target = evt.target.closest('.cart__delete-btn');

      if (target) {
        const item = target.closest('.cart__item');
        item.remove();
      }
    }

    setCartItem(name, src, srcset, alt, template) {
      const title = template.querySelector('.cart__item-title');
      const image = template.querySelector('img');
      const cartDeleteBtn = template.querySelector('.cart__delete-btn');

      image.src = src;
      image.srcset = srcset;
      image.alt = alt;
      title.textContent = name;

      cartDeleteBtn.addEventListener('click', this.clearItemFromCart);

      return template;
    }
  }

  carts.forEach((el) => {
    new Cart(el);
  });
};

export {cart};
