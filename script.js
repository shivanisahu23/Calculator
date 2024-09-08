const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = keys.dataset.previousKeyType;

        // Determine if the pressed key is an operator
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if (!previousKeyType || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                // Replace the operator if the last input was also an operator
                display.textContent = displayedNum.slice(0, -3) + ` ${keyContent} `;
            } else {
                // Append the operator
                display.textContent = displayedNum + ` ${keyContent} `;
            }
            keys.dataset.previousKeyType = 'operator';
        } else if (action === 'decimal') {
            // Add a decimal point
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            keys.dataset.previousKeyType = 'decimal';
        } else if (action === 'clear') {
            // Clear the display
            display.textContent = '0';
            keys.dataset.previousKeyType = 'clear';
        } else if (action === 'delete') {
            // Delete the last digit or operator
            display.textContent = displayedNum.slice(0, -1) || '0';
            keys.dataset.previousKeyType = 'delete';
        } else if (action === 'percent') {
            // Convert the displayed number to a percentage
            display.textContent = parseFloat(displayedNum) / 100;
            keys.dataset.previousKeyType = 'percent';
        } else if (action === 'calculate') {
            // Calculate the final result
            display.textContent = evaluateExpression(display.textContent);
            keys.dataset.previousKeyType = 'calculate';
        } else {
            // Append number or start new number entry
            if (displayedNum === '0' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }
    }
});

function evaluateExpression(expression) {
    try {
        // Using the Function constructor to evaluate the mathematical expression
        return new Function('return ' + expression.replaceAll('×', '*').replaceAll('÷', '/'))();
    } catch (error) {
        return 'Error';
    }
}


// function updateBackgroundBasedOnTime() {
//     const hour = new Date().getHours();
//     if (hour < 6 || hour >= 20) {
//         document.body.style.backgroundImage = "url('night-image.jpg')";
//     } else if (hour < 12) {
//         document.body.style.backgroundImage = "url('morning-image.jpg')";
//     } else {
//         document.body.style.backgroundImage = "url('day-image.jpg')";
//     }
// }
// updateBackgroundBasedOnTime();  // Call it when the page loads
