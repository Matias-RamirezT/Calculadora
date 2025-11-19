import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const buttons = [
    { label: 'C', type: 'function', onClick: clear },
    { label: '÷', type: 'operator', onClick: () => performOperation('÷') },
    { label: '×', type: 'operator', onClick: () => performOperation('×') },
    { label: '-', type: 'operator', onClick: () => performOperation('-') },
    { label: '7', type: 'digit', onClick: () => inputDigit(7) },
    { label: '8', type: 'digit', onClick: () => inputDigit(8) },
    { label: '9', type: 'digit', onClick: () => inputDigit(9) },
    { label: '+', type: 'operator', onClick: () => performOperation('+') },
    { label: '4', type: 'digit', onClick: () => inputDigit(4) },
    { label: '5', type: 'digit', onClick: () => inputDigit(5) },
    { label: '6', type: 'digit', onClick: () => inputDigit(6) },
    { label: '1', type: 'digit', onClick: () => inputDigit(1) },
    { label: '2', type: 'digit', onClick: () => inputDigit(2) },
    { label: '3', type: 'digit', onClick: () => inputDigit(3) },
    { label: '0', type: 'digit zero', onClick: () => inputDigit(0) },
    { label: '.', type: 'digit', onClick: inputDecimal },
    { label: '=', type: 'operator equals', onClick: () => performOperation('=') }
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`button ${button.type}`}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
