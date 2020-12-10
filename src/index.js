import './styles/index.css';

// slider

const arr = document.querySelectorAll('.product__input');
const array = Array.from(arr);

function moveRight() {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (item.checked) {
      item.checked = false;
      if (i === array.length - 1) {
        array[0].checked = true;
      } else {
        item.nextElementSibling.checked = true;
      }
      return;
    }
  }
}

function moveLeft() {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (item.checked) {
      item.checked = false;
      if (i === 0) {
        array[array.length - 1].checked = true;
      } else {
        item.previousElementSibling.checked = true;
      }
      return;
    }
  }
}

document.querySelector('.product__arrow_theme_right').addEventListener('click', moveRight);
document.querySelector('.product__arrow_theme_left').addEventListener('click', moveLeft);


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



// hint

const hint = document.querySelector('.hint');
const hintOpenButton = document.querySelector('.description__button-code');
const hintCloseButton = document.querySelector('.hint__close');


/*
function openHint() {
  document.querySelector('.header').classList.remove('is-opened');
  document.querySelector('.main').classList.remove('is-opened');
  hint.classList.add('is-opened');
}

function closeHint() {
  hint.classList.remove('is-opened');
  document.querySelector('.header').classList.add('is-opened');
  document.querySelector('.main').classList.add('is-opened');
}

hintOpenButton.addEventListener('click', openHint);
hintCloseButton.addEventListener('click', closeHint);
*/




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

const Hint = new Popup(hintOpenButton, hintCloseButton, hint);