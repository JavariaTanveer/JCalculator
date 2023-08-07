let displayValue = '';
let currentValue = null;
let operator = null;

function updateDisplay() {
  if (operator) {
    document.getElementById('result').value = currentValue + ' ' + operator + ' ' + displayValue;
  } else {
    document.getElementById('result').value = displayValue;
  }
}

function appendToDisplay(value) {
  displayValue += value;
  updateDisplay();
}

function appendOperator(op) {
  if (currentValue === null) {
    currentValue = parseFloat(displayValue);
  } else {
    calculate();
  }
  if (op === 'sqrt') {
    operator = '√';
    calculate();
  } else {
    operator = op;
    displayValue = '';
  }
}

function calculate() {
  if (operator && displayValue !== '') {
    const newValue = parseFloat(displayValue);
    switch (operator) {
      case '+':
        currentValue += newValue;
        break;
      case '-':
        currentValue -= newValue;
        break;
      case '*':
        currentValue *= newValue;
        break;
      case '/':
        currentValue /= newValue;
        break;
      case '%':
        currentValue = currentValue * (newValue / 100);
        break;
      case 'sqrt':
        currentValue = Math.sqrt(currentValue);
        break;
    }
  }
  operator = null;
  displayValue = currentValue.toString();
  currentValue = null;
  updateDisplay();
}

function clearDisplay() {
  displayValue = '';
  operator = null;
  currentValue = null;
  updateDisplay();
}

function deleteLast() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9.]/.test(key)) {
    appendToDisplay(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearDisplay();
  }
});
