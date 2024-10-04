document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    // Utility function to calculate based on operator
    const calculate = (num1, operator, num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 'Error';
            default:
                return num2;
        }
    };

    const clearDisplay = () => {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.textContent = '0';
        resultDisplayed = false;
    };

    const updateDisplay = (content) => {
        if (resultDisplayed) {
            currentInput = content;
            resultDisplayed = false;
        } else {
            currentInput += content;
        }
        display.textContent = currentInput;
    };

    const handleOperator = (value) => {
        if (currentInput) {
            if (previousInput && operator) {
                previousInput = calculate(previousInput, operator, currentInput).toString();
                display.textContent = previousInput;
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentInput = '';
        }
    };

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            // Handle Clear
            if (value === 'C') {
                clearDisplay();
                return;
            }

            // Handle equals (=)
            if (value === '=') {
                if (currentInput && previousInput && operator) {
                    const result = calculate(previousInput, operator, currentInput);
                    display.textContent = result;
                    currentInput = result.toString();
                    operator = '';
                    previousInput = '';
                    resultDisplayed = true;
                }
                return;
            }

            // Handle numbers and decimal point
            if (!isNaN(value) || value === '.') {
                if (value === '.' && currentInput.includes('.')) return;
                updateDisplay(value);
            }

            // Handle operators (+, -, *, /)
            if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            }
        });
    });
});
