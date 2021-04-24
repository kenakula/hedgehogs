import {flyToCart} from './fly-to-cart';

const cart = () => {
  const carts = document.querySelectorAll('.js-cart');

  class Cart {
    constructor(el) {
      this.addToCartButtons = document.querySelectorAll('.js-add-to-cart');

      this.cartActiveClass = 'active';
      this.cartHasItemsClass = 'has-items';

      this.block = el;
      this.openButton = this.block.querySelector('.js-cart-btn');
      this.closeButton = this.block.querySelector('.js-close-cart');
      this.cartContent = this.block.querySelector('.js-cart-content');
      this.cartList = this.block.querySelector('.cart__list');

      this.cartItemTmp = this.block.querySelector('#cart-item-template').content;

      this.renderCard = this.renderCard.bind(this);
      this.countItemsInCart = this.countItemsInCart.bind(this);
      this.increaseItemCount = this.increaseItemCount.bind(this);
      this.deleteItemFromCart = this.deleteItemFromCart.bind(this);

      this.openButton.addEventListener('click', this.openCart.bind(this));
      this.closeButton.addEventListener('click', this.closeCart.bind(this));
      this.addToCartButtons.forEach((btn) => {
        btn.addEventListener('click', this.addItemToCart.bind(this));
      });
      document.addEventListener('DOMContentLoaded', this.initCartItems.bind(this));
    }

    // cчитает и выводит количество товаров в корзине
    countItemsInCart() {
      const items = this.cartList.querySelectorAll('.cart__item');

      if (items.length) {
        this.openButton.classList.add(this.cartHasItemsClass);
        this.openButton.querySelector('span').textContent = items.length;
      } else {
        this.openButton.classList.remove(this.cartHasItemsClass);
      }
    }

    // сохраняет товары в корзине в localstorage
    saveToLocal(itemObj) {
      const currentData = localStorage.getItem('cart-items');
      let obj = {};

      if (currentData) {
        obj = JSON.parse(currentData);
        obj[itemObj.id] = itemObj;
      } else {
        obj = {
          [itemObj.id]: itemObj,
        };
      }

      localStorage.setItem('cart-items', JSON.stringify(obj));
    }

    // создает объект товара
    MakeItemObj(item) {
      this.title = item.querySelector('.card__title').textContent;
      this.img = {
        src: item.querySelector('.card__img img').getAttribute('src'),
        srcset: item.querySelector('.card__img img').getAttribute('srcset'),
      };
      this.id = item.dataset.id;
      this.price = item.querySelector('.card__prices').dataset.price;
    }

    // настраивает элемент товара корзины
    setItem(node, obj) {
      node.querySelector('.cart__item-title').textContent = obj.title;
      node.querySelector('img').setAttribute('src', obj.img.src);
      node.querySelector('img').setAttribute('srcset', obj.img.srcset);
      node.querySelector('.cart__item').setAttribute('data-price', obj.price);
      node.querySelector('.cart__item').setAttribute('data-id', obj.id);

      const deleteBtn = node.querySelector('.cart__delete-btn');
      deleteBtn.addEventListener('click', this.deleteItemFromCart);

      return node;
    }

    // рендерит элемент товара корзины
    renderCard(obj) {
      const tmp = this.cartItemTmp.cloneNode(true);
      const newItem = this.setItem(tmp, obj);
      this.cartList.appendChild(newItem);
    }

    // увеличивает количество предметов при добавлении повтора
    increaseItemCount(id) {
      const item = this.cartList.querySelector(`[data-id="${id}"]`);

      const currentCount = +item.querySelector('.cart__count input').value;
      item.querySelector('.cart__count input').value = currentCount + 1;
    }

    // обработчик добавления товара в корзину
    addItemToCart(evt) {
      const target = evt.target.closest('.js-add-to-cart');

      if (!target) {
        return;
      }

      const item = target.closest('.card');
      const itemObj = new this.MakeItemObj(item);

      const itemsInCart = JSON.parse(localStorage.getItem('cart-items'));

      if (itemsInCart && itemObj.id in itemsInCart) {
        this.increaseItemCount(itemObj.id);
      } else {
        this.renderCard(itemObj);
        this.saveToLocal(itemObj);
      }

      flyToCart(item);
      this.countItemsInCart();
    }

    deleteItemFromCart(evt) {
      const target = evt.target.closest('.cart__delete-btn');

      if (!target) {
        return;
      }

      const savedItems = JSON.parse(localStorage.getItem('cart-items'));
      const item = target.closest('.cart__item');
      const itemId = item.dataset.id;

      item.classList.add('cart__item--deleted');
      setTimeout(() => {
        item.remove();
        this.countItemsInCart();
      }, 300);
      delete savedItems[itemId];

      localStorage.setItem('cart-items', JSON.stringify(savedItems));
    }

    // открывает корзину
    openCart(evt) {
      const target = evt.target.closest('.js-cart-btn');

      if (target) {
        this.cartContent.classList.toggle(this.cartActiveClass);
      }
    }

    // закрывает корзину
    closeCart() {
      this.cartContent.classList.remove(this.cartActiveClass);
    }

    // смотрит на сохраненные в localstorage элементы корзины
    initCartItems() {
      const savedItems = JSON.parse(localStorage.getItem('cart-items'));

      if (savedItems) {
        for (let key in savedItems) {
          if (savedItems[key]) {
            this.renderCard(savedItems[key]);
          }
        }
      }

      this.countItemsInCart();
    }
  }

  carts.forEach((el) => {
    // eslint-disable-next-line no-new
    new Cart(el);
  });
};

export {cart};
