'use strict'

import './styles/index.css';

const array = Array.from(document.querySelectorAll('.product__input')),
      hint = document.querySelector('.hint'),
      hintOpenButton = document.querySelector('.description__button-code'),
      hintCloseButton = document.querySelector('.hint__close'),
      
      arrowLeft = document.querySelector('.product__arrow_theme_left'),
      arrowRight = document.querySelector('.product__arrow_theme_right'),
      
      characteristicsButton = document.querySelector('#characteristicsButtonMenu'),
      descriptionButton = document.querySelector('#descriptionButtonMenu'),
      tvButton = document.querySelector('#tvButtonMenu'),
      
      characteristicsBlock = document.querySelector('.product__characteristics-block'),
      descriptionBlock = document.querySelector('.description'),
      tvBlock = document.querySelector('.product__tv-block');







// mobile-menu

const menuButton = document.querySelector('#menu');
const menu = document.querySelector('.header__mobile-menu');
const closeButton = document.querySelector('.header__button-close');

function open() {
  menu.classList.add('open');
}

function close() {
  menu.classList.remove('open');
}

menuButton.addEventListener('click', open);
closeButton.addEventListener('click', close);


const rightButton = document.querySelector('#right');
const leftButton = document.querySelector('#left');


// counter

const quantity = () => {
  const string = document.querySelector('.product__choice-number').textContent;
  const number = Number.parseInt(string);
  return number;
};

function addition() {
  const number = quantity();
  const result = number + 1;
  document.querySelector('.product__choice-number').textContent = result;
}

function subtraction() {
  const number = quantity();
  const result = number - 1;
  if (result < 1) {
    document.querySelector('.product__choice-number').textContent = 1;
  } else {
    document.querySelector('.product__choice-number').textContent = result;
  }
}

rightButton.addEventListener('click', addition);
leftButton.addEventListener('click', subtraction);



const block = document.querySelector('.product__big-button_theme_add');


const oneButton = document.querySelector('#slider-button-one');
const twoButton = document.querySelector('#slider-button-two');


// color and texcontent to button

function addColorTurquoise() {
  block.classList.remove('product__big-button_color_black');
  block.classList.add('product__big-button_color_turquoise');
  document.querySelector('.product__add-title-span').textContent = "DISCARD";
}
function addColorBlack() {
  block.classList.remove('product__big-button_color_turquoise');
  block.classList.add('product__big-button_color_black');
  document.querySelector('.product__add-title-span').textContent = "ADD TO CART";
}

oneButton.addEventListener('click', addColorBlack);
twoButton.addEventListener('click', addColorTurquoise);







class BaseComponent {
  constructor() {
    this.handlers = [];
  }
  _setHandlers(listeners) {
    this._pushListener(listeners);
    this._addEventListener();
  }
  _pushListener(listeners) {
    listeners.forEach(({
      element,
      event,
      callback
    }) => {
      const bindCallback = callback.bind(this);
      this.handlers.push({
        element,
        event,
        bindCallback
      });
    });
  }
  _addEventListener() {
    this.handlers.forEach(({
      element,
      event,
      bindCallback
    }) => {
      element.addEventListener(event, bindCallback);
    });
  }
  _removeEventListener() {
    this.handlers.forEach(({
      element,
      event,
      bindCallback
    }) => {
      element.removeEventListener(event, bindCallback);
    });
  }
}


class Popup extends BaseComponent {
  constructor(button, closeButton, container) {
    super();
    this.button = button;
    this.closeButton = closeButton;
    this.container = container;
    this._setHandlers([{
        element: this.button,
        event: 'click',
        callback: this._open,
      },
      {
        element: this.closeButton,
        event: 'click',
        callback: this._close,
      },
    ]);
  }
  _open() {
    this.container.classList.add('is-opened');
    document.querySelector('.header').classList.remove('is-opened');
    document.querySelector('.main').classList.remove('is-opened');
  }
  _close() {
    this.container.classList.remove('is-opened');
    document.querySelector('.header').classList.add('is-opened');
    document.querySelector('.main').classList.add('is-opened');
  }
}

class Block extends BaseComponent {
  constructor(button, container) {
    super();
    this.button = button;
    this.container = container;
    this.array = [
      characteristicsBlock,
      descriptionBlock,
      tvBlock
    ];
    this._setHandlers([{
        element: this.button,
        event: 'click',
        callback: this._open,
      }
    ]);
  }
  _open() {
    this.array.forEach((item) => {    
      item.classList.remove('is-opened');
    });
    this.container.classList.add('is-opened');
  }
}

class Slider extends BaseComponent {
  constructor(leftButton, rightButton, array) {
    super();
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.array = array;
    this._setHandlers([{
      element: this.leftButton,
      event: 'click',
      callback: this._left,
    },
    {
      element: this.rightButton,
      event: 'click',
      callback: this._right,
    }
  ]);
  }
  _left() {
    for (let i = 0; i < this.array.length; i++) {
      let item = this.array[i];
      if (item.checked) {
        item.checked = false;
        if (i === 0) {
          this.array[this.array.length - 1].checked = true;
        } else {
          item.previousElementSibling.checked = true;
        }
        return;
      }
    }
  }
  _right() {
    for (let i = 0; i < this.array.length; i++) {
      let item = this.array[i];
      if (item.checked) {
        item.checked = false;
        if (i === this.array.length - 1) {
          this.array[0].checked = true;
        } else {
          item.nextElementSibling.checked = true;
        }
        return;
      }
    }
  }
}

const firstSlider = new Slider(arrowLeft, arrowRight, array),
      oneBlock = new Block(characteristicsButton, characteristicsBlock),
      twoBlock = new Block(descriptionButton, descriptionBlock),
      threeBlock = new Block(tvButton, tvBlock),
      Hint = new Popup(hintOpenButton, hintCloseButton, hint);