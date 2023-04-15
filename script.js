'use strict';

// Query selectors

const calculator = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');
// const claculatorHistory = document.querySelector('.calculator__history');
const calculatorButtons = [...document.querySelectorAll('.calculator__button')];

// Variables

let flag = false;
let currentNumString = '';
let savedNumString = 0;

// Functions

const addNumber = num => {
  currentNumString += num;
  calculatorInput.textContent = currentNumString;
  // claculatorHistory.textContent = currentNumString;
};

const backspace = () => {
  if (!currentNumString && flag) currentNumString = `${savedNumString}`;

  if (
    (currentNumString[0] === '-' && currentNumString.length === 2) ||
    (/\./gi.test(currentNumString) && currentNumString.length === 2)
  ) {
    currentNumString = '';
    calculatorInput.textContent = '0';
    claculatorHistory.textContent = '0';
  } else if (currentNumString.length === 1) {
    currentNumString = '';
    calculatorInput.textContent = '0';
    claculatorHistory.textContent = '0';
  } else if (!currentNumString) {
    return;
  } else {
    currentNumString = currentNumString.slice(0, currentNumString.length - 1);
    calculatorInput.textContent = currentNumString;
    // claculatorHistory.textContent = currentNumString;
  }
};

const percent = () => {
  if (
    (flag === 'plus' && currentNumString) ||
    (flag === 'minus' && currentNumString)
  ) {
    currentNumString = `${(currentNumString * savedNumString) / 100}`;
    calculatorInput.textContent = currentNumString;
    // claculatorHistory.textContent = currentNumString;

    console.log(currentNumString);
  } else if (currentNumString) {
    currentNumString = `${currentNumString / 100}`;
    calculatorInput.textContent = currentNumString;
    claculatorHistory.textContent = currentNumString;
  }
};

const negative = () => {
  if (!currentNumString) return;
  currentNumString = `${currentNumString * -1}`;
  calculatorInput.textContent = currentNumString;
  claculatorHistory.textContent = currentNumString;
};

const doFlag = () => {
  switch (flag) {
    case 'plus':
      savedNumString += +currentNumString;
      break;
    case 'minus':
      savedNumString -= +currentNumString;
      break;
    case 'times':
      savedNumString *= +currentNumString;
      break;
    case 'divide':
      if (currentNumString === '0') {
        currentNumString = '';
        calculatorInput.textContent = `ERR_DIVIDE_BY_ZERO`;
        savedNumString = 0;
        flag = false;
        return;
      }
      savedNumString /= +currentNumString;
      break;
  }
  currentNumString = '';
  calculatorInput.textContent = `${savedNumString}`;
};

const plus = () => {
  if (flag && !currentNumString) {
    flag = 'plus';
    if (
      claculatorHistory.textContent[claculatorHistory.textContent.length] !==
      '+'
    ) {
      claculatorHistory.textContent =
        claculatorHistory.textContent.slice(
          0,
          claculatorHistory.textContent.length - 1
        ) + '+';
    }
    return;
  }
  if (!currentNumString) currentNumString = '0';
  if (flag) {
    doFlag();
  } else {
    savedNumString = +currentNumString;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'plus';
  claculatorHistory.textContent += '+';
};

const minus = () => {
  if (flag && !currentNumString) {
    flag = 'miuns';
    if (
      claculatorHistory.textContent[claculatorHistory.textContent.length] !==
      '-'
    ) {
      claculatorHistory.textContent =
        claculatorHistory.textContent.slice(
          0,
          claculatorHistory.textContent.length - 1
        ) + '-';
    }

    return;
  }
  if (!currentNumString) currentNumString = '0';
  if (flag && currentNumString) {
    doFlag();
  } else {
    savedNumString = +currentNumString;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'minus';
};

const times = () => {
  if (flag && !currentNumString) {
    flag = 'times';
    return;
  }
  if (!currentNumString) return;
  if (flag && currentNumString) {
    doFlag();
  } else {
    savedNumString = +currentNumString;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'times';
};

const divide = () => {
  if (flag && !currentNumString) {
    flag = 'divide';
    return;
  }
  if (!currentNumString) currentNumString = '0';
  if (flag && currentNumString) {
    doFlag();
  } else {
    savedNumString = +currentNumString;
    currentNumString = '';
    calculatorInput.textContent = '0';
  }
  flag = 'divide';
};

const equal = () => {
  if ((!currentNumString && !flag) || (currentNumString && !flag)) return;
  if (!currentNumString && flag) currentNumString = '0';
  doFlag();
  flag = false;
  currentNumString = `${savedNumString}`;
};

const dot = () => {
  if (!currentNumString) currentNumString = '0.';
  else if (!/\./gi.test(currentNumString)) currentNumString += '.';
  calculatorInput.textContent = currentNumString;
};

const clear = () => {
  currentNumString = '';
  calculatorInput.textContent = `0`;
  savedNumString = 0;
  flag = false;
};

const numberClick = e => {
  currentNumString += e.target.dataset.value;
  calculatorInput.textContent = currentNumString;
};

const preventFloatFlood = () => {
  if (/\.\d{9,}/gi.test(currentNumString)) {
    currentNumString = currentNumString.match(/(\d+\.\d{0,9})/gi);
    calculatorInput.textContent = currentNumString;
  }
};

const characterLimit = () => {
  if (currentNumString.length > 16) {
    currentNumString = currentNumString.slice(0, 16);
    calculatorInput.textContent = currentNumString;
  }
};

// Eventlisteners

window.addEventListener('keydown', e => {
  console.log(e);

  if (!currentNumString && e.key === '0') return;
  if (+e.key || e.key === '0') addNumber(e.key);
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Enter') equal();
  if (e.key === '+') plus();
  if (e.key === '-') minus();
  if (e.key === '*') times();
  if (e.key === '/') divide();
  if (e.key === '.') dot();

  preventFloatFlood();
  characterLimit();
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
    case cls.contains('calculator__button--times'):
      times();
      break;
    case cls.contains('calculator__button--divide'):
      divide();
      break;

    case cls.contains('calculator__button--equal'):
      equal();
      break;
    case cls.contains('calculator__button--dot'):
      dot();
      break;
    case cls.contains('calculator__button--c'):
      clear();
      break;

    case cls.contains('calculator__button--number'):
      numberClick(e);
      break;
  }
  preventFloatFlood();
  characterLimit();
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
