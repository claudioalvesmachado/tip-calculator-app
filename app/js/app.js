const tips = document.querySelectorAll('.tip-value');
const customTip = document.querySelector('#custom')
const bill = document.querySelector('#bill');
const numOfPeople = document.querySelector('#nofp');
const resTipAmount = document.querySelector('.res--tip-amount');
const resTotal = document.querySelector('.res--total');
const nofpWrapper = document.querySelector('.inputs__nofp')

//  WILL RECEIVE THE RESULTS VALUES
let tipAmount;
let total;

// TO TRIGGER AN EVENT THAT RUNS THE SAME FUNCTION
let allInputs = [bill, customTip, numOfPeople];


// CALCULATES THE RESULTS BASED ON THE SELECTED BUTTON VALUE
const getTip = () => {
    tips.forEach((btns) => {
        if (btns == document.activeElement && bill.value > 0 && numOfPeople.value >= 1) {
            tipAmount = (bill.value * btns.value) / numOfPeople.value;
            resTipAmount.textContent = `$${tipAmount.toFixed(2)}`;
            total = ((tipAmount * Number(numOfPeople.value)) + Number(bill.value)) / numOfPeople.value;
            resTotal.textContent = `$${Number(total).toFixed(2)}`;
        }
    })
    // Resets custom tip values
    tips.forEach((e) => {
        e.addEventListener('click', () => {
            customTip.value = ''
        })
    })
}

// CALCULATES THE RESULTS BASED ON THE CUSTOM TIP INPUT VALUE
const getCustom = function () {
    if (bill.value > 0 && numOfPeople.value >= 1) {
        tipAmount = customTip.value / numOfPeople.value;
        resTipAmount.textContent = `$${tipAmount.toFixed(2)}`;
        total = (Number(bill.value) + Number(customTip.value)) / Number(numOfPeople.value)
        resTotal.textContent = `$${total.toFixed(2)}`
    } else {
        tipAmount = 0
        total = 0
        resTipAmount.textContent = `$0.00`
        resTotal.textContent = `$0.00`
    }
}

// RUNS getCustom FUNCTION WITH DIFFERENT TRIGGERS
const runGetCustom = () => {
    customTip.addEventListener('click', getCustom, false);

    allInputs.forEach((element) => {
        element.addEventListener('input', getCustom, false)
    })
}

// SHOWS AN ERROR MESSAGE IF THE NUMBER OF PEOPLE IS LESS THAN ONE
const numOfPeopleEmpty = () => {
    if (Number(numOfPeople.value) <= 0 && bill.value >= 1) {
        nofpWrapper.classList.add('inputs__nofp--error')
    } else {
        nofpWrapper.classList.remove('inputs__nofp--error')
    }
}

const enableResetButton = () => {
    const resetButton = document.querySelector('.btn--reset')
    if (bill.value > 0 || numOfPeople.value > 0 || customTip.value > 0 || Number(total) > 0) {
        resetButton.classList.remove('is-disable')
    } else {
        resetButton.classList.add('is-disable')
    }
    resetValues(resetButton)
}

const resetValues = resetButton => {
    resetButton.addEventListener('click', () => {
        bill.value = ''
        numOfPeople.value = ''
        customTip.value = ''
        tipAmount = 0
        total = 0
        resTipAmount.textContent = `$0.00`
        resTotal.textContent = `$0.00`
    })
}



//RUN FUNCTIONS
setInterval(getTip, 100);
setInterval(runGetCustom, 100);
setInterval(enableResetButton, 100);
setInterval(numOfPeopleEmpty, 100);
