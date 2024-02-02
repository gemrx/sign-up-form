// VARIABLES
//

const form = document.querySelector('form');
const inputAndSelectElements = document.querySelectorAll('input, select')
const selectElements = document.querySelectorAll('select');
const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');
const selectMonths = document.querySelector('#months');

// FUNCTIONS
//

function updateSelectFieldIcon (event) {
    const selectField = event.target.parentNode;
    const selectFieldIcon = selectField.querySelector('.chevron-icon');
    switch (event.type) {
        case 'click':
            selectFieldIcon.classList.toggle('active');
            break;
        case 'keypress':
            if (event.key === 'Enter') selectFieldIcon.classList.toggle('active');
            break;
        case 'blur':
            if (selectFieldIcon.classList.contains('active')) selectFieldIcon.classList.remove('active');
            break;
    }
}

function isValidName(name) {
    // valid names must not be empty and must contain only letters or spaces.
    const pattern = /^[a-zA-Z\s]+$/; 
    return pattern.test(name);
}

function getParentRow(element) {
    return element.closest('.row');
}

function showError(element, message) {
    const row = getParentRow(element)
    row.querySelector('.error-message').textContent = message;
}

function resetError(element) {
    const row = getParentRow(element)
    row.querySelector('.error-message').textContent = '';
    if (element.classList.contains('invalid')) {
        element.classList.remove('invalid');
    }
}

function checkFirstName(allowEmpty = false) {
    const firstName = inputFirstName.value.trim();
    resetError(inputFirstName);

    if (firstName === '') {
        if (allowEmpty) {
            return true;
        }
        inputFirstName.classList.add('invalid');
        showError(inputFirstName, 'This field cannot be blank');
        return false;
    }

    if (isValidName(firstName)) {
        return true;
    }
    
    inputFirstName.classList.add('invalid');
    showError(inputFirstName, 'Please enter a valid name');
    return false;
}

// should work for inline validation and form submit validation
function checkLastName(allowEmpty = false) {
    const lastName = inputLastName.value.trim();
    resetError(inputLastName);

    if (lastName === '') {
        if (allowEmpty) {
            return true;
        }
        inputLastName.classList.add('invalid');
        showError(inputLastName, 'This field cannot be blank');
        return false;
    }

    if (isValidName(lastName)) {
        return true;
    }
    
    inputLastName.classList.add('invalid');
    showError(inputLastName, 'Please enter a valid name');
    return false;
}

// EVEN LISTENERS
//

// add/remove class if the input has text
inputAndSelectElements.forEach(element => {
    element.addEventListener('blur', () => {
        const hasValue = !element.value == '';
        if (hasValue) {
            element.classList.add('has-value');
        } else {
            element.classList.remove('has-value');
        }
    });
});

// update select icon when the dropdown list is open
selectElements.forEach(select => {
    select.addEventListener('click', updateSelectFieldIcon);
    select.addEventListener('keypress', updateSelectFieldIcon);
    select.addEventListener('blur', updateSelectFieldIcon);
});

inputFirstName.addEventListener('blur', () => {
    checkFirstName(allowEmpty = true);
});

inputLastName.addEventListener('blur', () => {
    checkLastName(allowEmpty = true);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkFirstName(allowEmpty = false);
});