/**
 * selectors for two main sections
 * primarily used for adding/removing hide class
 */
const form = document.querySelector('.form-container');
const results = document.querySelector('.results');

/**
 * selectors for buttons
 */
const calcBtn = document.querySelector(`input[type='submit']`);
const recalculate = document.querySelector('#recalculate');

/**
 * selectors for results elements
 */
const paycheckResults = document.querySelector('#paycheckResults');
const billsResults = document.querySelector('#billsResults');
const jointResults = document.querySelector('#jointResults');
const savingsResults = document.querySelector('#savingsResults');
const spendingResults = document.querySelector('#spendingResults');

/**
 * selector for grabbing form data
 * initialized object that form data is stored in
 */
const formInputs = document.querySelectorAll(`input[type='text']`);
const formValues = {};

/**
 * footer selector
 * copyright code
 */
const footer = document.querySelector('footer');
const copyrightDate = new Date().getFullYear();
footer.textContent = `Copyright © ${copyrightDate} DTHutton`;

/**
 * grabs form info
 * calls the function to calculate results
 * resets and hides form
 * shows results elements
 * @param {*} event 
 */
function runApp(event) {
    event.preventDefault();
    formInputs.forEach(({ id, value }) => formValues[id] = Number(value));
    form.reset();
    form.classList.add('hide');
    results.classList.remove('hide');
    calculate(formValues);
}

/**
 * takes form data as an argument an sets the values in the results fields
 * @param {object} formValues 
 */
function calculate({ paycheck, bills, joint, savings }) {
    let total;
    let amountToJoint;
    let amountToSavings;
    const jointPercentage = convertToPercentage(joint);
    const savingsPercentage = convertToPercentage(savings);

    total = paycheck - bills;
    amountToJoint = total * jointPercentage;
    amountToSavings = total * savingsPercentage;
    total -= (amountToJoint + amountToSavings);

    paycheckResults.textContent = `$${paycheck}`;
    billsResults.textContent = `$${bills}`;
    jointResults.textContent = `$${adjust(amountToJoint)}`;
    savingsResults.textContent = `$${adjust(amountToSavings)}`;
    spendingResults.textContent = `$${adjust(total)}`;
}

/**
 * returns arg as a decimal representing a percentage
 * @param {number} num 
 */
function convertToPercentage(num) {
    return Math.floor(num) / 100;
}

/**
 * returns arg rounded down to two decimals places
 * @param {number} num 
 */
function adjust(num) {
    return Math.floor(num * 100) / 100;
}

/**
 * resets app
 * @param {*} event 
 */
function mulligan(event) {
    event.preventDefault();
    form.classList.remove('hide');
    results.classList.add('hide');
    paycheckResults.textContent = `$0.00`;
    billsResults.textContent = `$0.00`;
    jointResults.textContent = `$0.00`;
    savingsResults.textContent = `$0.00`;
    spendingResults.textContent = `$0.00`;
}

/**
 * event listeners for buttons
 */
calcBtn.addEventListener('click', runApp);
recalculate.addEventListener('click', mulligan);