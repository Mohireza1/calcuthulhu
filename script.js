'use strict';

// Query selectors

const calculator = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');
const calculatorButtons = [...document.querySelectorAll('.calculator__button')];

// Variables

let flag = false;
let currentNumString = '';
let savedNumString = 0;

// Functions

const backspace = () => {
  if (currentNumString[0] === '-' && currentNumString.length === 2) {
    currentNumString = '';
    calculatorInput.textContent = '0';
  } else if (currentNumString.length === 1) {
    currentNumString = '';
    calculatorInput.textContent = '0';
  } else if (!currentNumString) {
    return;
  } else {
    currentNumString = currentNumString.slice(0, currentNumString.length - 1);
    calculatorInput.textContent = currentNumString;
  }
};

const percent = () => {
  if (
    (flag === 'plus' && currentNumString) ||
    (flag === 'minus' && currentNumString)
  ) {
    currentNumString = `${(currentNumString * savedNumString) / 100}`;
    calculatorInput.textContent = currentNumString;
    console.log(currentNumString);
  } else if (currentNumString) {
    currentNumString = `${currentNumString / 100}`;
    calculatorInput.textContent = currentNumString;
    console.log(currentNumString);
  }
};

const negative = () => {
  currentNumString = `${currentNumString * -1}`;
  calculatorInput.textContent = currentNumString;
};

const doFlag = () => {
  switch (flag) {
    case 'plus':
      savedNumString += +currentNumString;
      currentNumString = '';
      calculatorInput.textContent = `${savedNumString}`;
      break;
    case 'minus':
      savedNumString -= +currentNumString;
      currentNumString = '';
      calculatorInput.textContent = `${savedNumString}`;
      break;
  }
};

const plus = () => {
  console.log(flag, currentNumString);

  if (flag && currentNumString) {
    doFlag();
  } else {
    savedNumString = +currentNumString;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'plus';
};

const minus = () => {
  console.log(flag, currentNumString, savedNumString);

  if (flag && currentNumString) {
    doFlag();
  } else {
    savedNumString = currentNumString * -1;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'minus';
};

// Eventlisteners

calculatorInput.addEventListener('focusout', () => {
  setTimeout(() => {
    calculatorInput.focus();
  }, 10);
});

window.addEventListener('keydown', e => {
  console.log(e);

  if (+e.key || e.key === '0') {
    if (!currentNumString && e.key === '0') return;
    currentNumString += e.key;
    calculatorInput.textContent = currentNumString;
  }
  if (e.key === 'Backspace') backspace();
});

calculator.addEventListener('click', e => {
  if (!e.target.classList.contains('calculator__button')) return;

  const cls = e.target.classList;

  switch (true) {
    case cls.contains('calculator__button--back'):
      backspace();
      break;

    case cls.contains('calculator__button--percent'):
      percent();
      break;
    case cls.contains('calculator__button--negative'):
      negative();
      break;
    case cls.contains('calculator__button--plus'):
      plus();
      break;
    case cls.contains('calculator__button--minus'):
      minus();
      break;
  }
});

/*
  insert number
    number is shown in gray
    number is saved

    select one of the four (sum)
    function flag = sum

    another number inserted
    
    if (another function) the numbers are mixed and the final result is saved and gray and flag is function
    if (equals) the numbers are mixed and the final result is black and saved and flag is fasle
    */
