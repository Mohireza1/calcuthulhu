'use strict';

/*
*==================*
ADD HISTORY CODES 
AS A NEW SECTION
BECAUSE IT IS NOT
INTEGRABLE WITH
THE INPUT
*==================*
*/

// Query selectors

const calculator = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');
const calculatorButtons = [...document.querySelectorAll('.calculator__button')];
const calculatorHistory = document.querySelector('.calculator__history');

const buttonMenu = document.querySelector('.button--menu');
const sidebarClose = document.querySelector('.sidebar__close');

// Variables

let flag = false;
let currentNumString = '';
let savedNumString = 0;

// Functions

const addNumber = num => {
  currentNumString += num;
  calculatorInput.textContent = currentNumString;

  if (calculatorHistory.textContent === '0') calculatorHistory.textContent = '';
  calculatorHistory.textContent += num;
};

const backspace = () => {
  if (
    (currentNumString[0] === '-' && currentNumString.length === 2) ||
    (/\./gi.test(currentNumString) && currentNumString.length === 2)
  ) {
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

  if (
    (calculatorHistory.textContent[0] === '-' &&
      calculatorHistory.textContent.length === 2) ||
    (/\./gi.test(calculatorHistory.textContent) &&
      calculatorHistory.textContent.length === 2)
  )
    calculatorHistory.textContent = '0';
  else if (calculatorHistory.textContent.length === 1)
    calculatorHistory.textContent = '0';
  else
    calculatorHistory.textContent = calculatorHistory.textContent.slice(
      0,
      calculatorHistory.textContent.length - 1
    );
};

const percent = () => {
  if (
    (flag === 'plus' && currentNumString) ||
    (flag === 'minus' && currentNumString)
  ) {
    currentNumString = `${(currentNumString * savedNumString) / 100}`;
    calculatorInput.textContent = currentNumString;
    calculatorHistory.textContent = console.log(currentNumString);
    const historyPercent =
      (+calculatorHistory.textContent.match(/\d+$/gi)[0] * savedNumString) /
      100;
    calculatorHistory.textContent = calculatorHistory.textContent.replace(
      /\d+$/gi,
      `${historyPercent}`
    );
  } else if (currentNumString) {
    currentNumString = `${currentNumString / 100}`;
    calculatorInput.textContent = currentNumString;
    const historyPercent =
      +calculatorHistory.textContent.match(/\d+$/gi)[0] / 100;
    calculatorHistory.textContent = calculatorHistory.textContent.replace(
      /\d+$/gi,
      `${historyPercent}`
    );
  }
};

const negative = () => {
  if (!currentNumString) return;
  currentNumString = `${currentNumString * -1}`;
  calculatorInput.textContent = currentNumString;

  if (/\d-\d+$/gi.test(calculatorHistory.textContent)) {
    calculatorHistory.textContent = calculatorHistory.textContent.replace(
      /(?<=\d)-(?=\d+$)/gi,
      '+'
    );
  } else if (/\d\+\d+$/gi.test(calculatorHistory.textContent)) {
    calculatorHistory.textContent = calculatorHistory.textContent.replace(
      /(?<=\d)\+(?=\d+$)/gi,
      '-'
    );
  } else {
    calculatorHistory.textContent = `${
      calculatorHistory.textContent.match(/^-?\d+$/gi)[0] * -1
    }`;
  }
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
        calculatorInput.textContent = 'ERR_DIVIDE_BY_ZERO';
        calculatorHistory.textContent = 'ERR_DIVIDE_BY_ZERO';
        savedNumString = 0;
        flag = false;
        return;
      }
      savedNumString /= +currentNumString;
      break;
  }
  currentNumString = '';
  calculatorInput.textContent = `${savedNumString}`;
  calculatorHistory.textContent += `=${savedNumString}`;
};

const plus = () => {
  if (flag && !currentNumString) {
    console.log(/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent));

    flag = 'plus';
    if (/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent)) {
      calculatorHistory.textContent = calculatorHistory.textContent.replace(
        /[\+\-\×\÷]$/gi,
        '+'
      );
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

  calculatorHistory.textContent += '+';
};

const minus = () => {
  if (flag && !currentNumString) {
    console.log(/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent));

    flag = 'miuns';
    if (/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent)) {
      calculatorHistory.textContent = calculatorHistory.textContent.replace(
        /[\+\-\×\÷]$/gi,
        '-'
      );
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

  calculatorHistory.textContent += '-';
};

const times = () => {
  if (flag && !currentNumString) {
    flag = 'times';
    if (/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent)) {
      calculatorHistory.textContent = calculatorHistory.textContent.replace(
        /[\+\-\×\÷]$/gi,
        '×'
      );
    }
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

  calculatorHistory.textContent += '×';
};

const divide = () => {
  if (flag && !currentNumString) {
    flag = 'divide';
    if (/[\+\-\×\÷]$/gi.test(calculatorHistory.textContent)) {
      calculatorHistory.textContent = calculatorHistory.textContent.replace(
        /[\+\-\×\÷]$/gi,
        '÷'
      );
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
  flag = 'divide';

  calculatorHistory.textContent += '÷';
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

  if (calculatorHistory.textContent === '0') {
    calculatorHistory.textContent = '0.';
  } else if (
    /(?<=[\+\÷\×\-])\d+$/gi.test(calculatorHistory.textContent) ||
    /^\d*$/gi.test(calculatorHistory.textContent)
  ) {
    calculatorHistory.textContent += '.';
  } else if (/[\+\÷\×\-]$/gi.test(calculatorHistory.textContent))
    calculatorHistory.textContent += '0.';
};

const clear = () => {
  currentNumString = '';
  calculatorInput.textContent = `0`;
  calculatorHistory.textContent = '0';
  savedNumString = 0;
  flag = false;
};

const numberClick = e => {
  currentNumString += e.target.dataset.value;
  calculatorInput.textContent = currentNumString;
  if (calculatorHistory.textContent === '0') calculatorHistory.textContent = '';
  calculatorHistory.textContent += e.target.dataset.value;
};

const preventFloatFlood = () => {
  if (/\.\d{9,}/gi.test(currentNumString)) {
    currentNumString = currentNumString.match(/(\d+\.\d{0,9})/gi)[0];
    calculatorInput.textContent = currentNumString;
  }
  if (/(?<=\..*)(\d)\1{6,}\d?$/gi.test(currentNumString)) {
    currentNumString = currentNumString.replace(
      /(?<=\..*)(\d)\1{6,}\d?$/gi,
      '$1'
    );
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

buttonMenu.addEventListener('click', () =>
  document.querySelector('header').classList.add('header--open')
);
sidebarClose.addEventListener('click', () =>
  document.querySelector('header').classList.remove('header--open')
);

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
