const form = document.querySelector('.form-container');
const burrito = document.querySelector('.burrito');
const calcBtn = document.querySelector(`input[type='submit']`);
const formInputs = document.querySelectorAll(`input[type='text']`);
const paycheckResults = document.querySelector('#paycheckResults');
const billsResults = document.querySelector('#billsResults');
const jointResults = document.querySelector('#jointResults');
const savingsResults = document.querySelector('#savingsResults');
const spendingResults = document.querySelector('#spendingResults');
const recalculate = document.querySelector('#recalculate');
const formValues = {};

function runApp(event) {
    event.preventDefault();
    formInputs.forEach(({ id, value }) => formValues[id] = Number(value));
    form.reset();
    form.classList.add('hide');
    burrito.classList.remove('hide');
    calculate(formValues);
}

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

function convertToPercentage(num) {
    return Math.floor(num) / 100;
}

function adjust(num) {
    return Math.floor(num * 100) / 100;
}

function mulligan(event) {
    event.preventDefault();
    form.classList.remove('hide');
    burrito.classList.add('hide');
    paycheckResults.textContent = `$0.00`;
    billsResults.textContent = `$0.00`;
    jointResults.textContent = `$0.00`;
    savingsResults.textContent = `$0.00`;
    spendingResults.textContent = `$0.00`;
}

calcBtn.addEventListener('click', runApp);
recalculate.addEventListener('click', mulligan);