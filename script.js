const form = document.querySelector('form');
const inputAndSelectElements = document.querySelectorAll('input, select')
const selectElements = document.querySelectorAll('select');
const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');
const selectBirthdateMonths = document.querySelector('#months');
const inputBirthdateDay = document.querySelector('#day');
const inputBirthdateYear = document.querySelector('#year');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputConfirmPassword = document.querySelector('#confirm-password');

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

function isEmpty (string) {
    return string === '';
}

function isNameStringValid(name) {
    const pattern = /^[a-zA-Z\s]+$/; 
    return pattern.test(name);
}

function isDateValid(year, month, day) {
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function getRowParentElement(element) {
    return element.closest('.row');
}

function showError(element, message) {
    element.classList.add('invalid');
    const row = getRowParentElement(element);
    row.querySelector('.error-message').textContent = message;
}

function resetError(element) {
    const row = getRowParentElement(element)
    row.querySelector('.error-message').textContent = '';

    if (element.classList.contains('invalid')) {
        element.classList.remove('invalid');
    }
}

function checkFirstName() {
    const firstName = inputFirstName.value.trim();
    resetError(inputFirstName);

    if (isEmpty(firstName)) {
        showError(inputFirstName, 'This field cannot be blank');
        return false;
    }

    if (isNameStringValid(firstName)) {
        return true;
    }

    showError(inputFirstName, 'Please enter a valid name');
    return false;
}

function checkLastName() {
    const lastName = inputLastName.value.trim();
    resetError(inputLastName);

    if (isEmpty(lastName)) {
        showError(inputLastName, 'This field cannot be blank');
        return false;
    }

    if (isNameStringValid(lastName)) {
        return true;
    }
    
    showError(inputLastName, 'Please enter a valid name');
    return false;
}

function checkBirthdate () {
    let year = inputBirthdateYear.value;
    let month = selectBirthdateMonths.value.trim();
    let day = inputBirthdateDay.value.trim();
    resetError(inputBirthdateYear);
    resetError(selectBirthdateMonths);
    resetError(inputBirthdateDay);
    
    if (isEmpty(month) || isEmpty(day) || isEmpty(year)) {
        showError(inputBirthdateDay, '');
        showError(selectBirthdateMonths, '');
        showError(inputBirthdateYear, 'Please fill in a complete birthdate');
        return false;
    }

    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    if (isDateValid(year, month, day)) {
        return true;
    }

    showError(inputBirthdateDay, '');
    showError(selectBirthdateMonths, '');
    showError(inputBirthdateYear, 'Please enter a valid date');
    return false;
}

function checkEmail () {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = inputEmail.value.trim();
    resetError(inputEmail);

    if (pattern.test(email)) {
        return true;
    }

    if (isEmpty(email)) {
        showError(inputEmail, 'This field cannot be blank')
        return false;
    }

    showError(inputEmail, 'Please enter a valid email adress');
    return false;
}

function checkPassword() {
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    resetError(inputPassword);

    if (isEmpty(password)) {
        showError(inputPassword, 'this field cannot be blank');
        return false;
    }

    if (!isEmpty(confirmPassword)) {

        if (password === confirmPassword) {
            return true;
        }

        showError(inputConfirmPassword, 'Passwords do not match');
        return false;
    }

    return true;
}

function checkConfirmPassword() {
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    resetError(inputConfirmPassword);

    if (isEmpty(confirmPassword)) {
        showError(inputConfirmPassword, 'This field cannot be blank');
        return false;
    }

    if (!isEmpty(password)) {

        if (password === confirmPassword) {
            return true;
        }

        showError(inputConfirmPassword, 'Passwords do not match');
        return false;
    }

    return true;
}

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

selectElements.forEach(select => {
    select.addEventListener('click', updateSelectFieldIcon);
    select.addEventListener('keypress', updateSelectFieldIcon);
    select.addEventListener('blur', updateSelectFieldIcon);
});

inputFirstName.addEventListener('blur', () => {
    checkFirstName();
});

inputLastName.addEventListener('blur', () => {
    checkLastName();
});

selectBirthdateMonths.addEventListener('blur', (event) => {
    const forbiddenIds = ['day', 'year'];

    if (event.relatedTarget === null || event.relatedTarget !== null && !forbiddenIds.includes(event.relatedTarget.id)) {
        checkBirthdate();
    }
});

inputBirthdateDay.addEventListener('blur', (event) => {
    const forbiddenIds = ['months', 'year'];

    if (event.relatedTarget === null || event.relatedTarget !== null && !forbiddenIds.includes(event.relatedTarget.id)) {
        checkBirthdate();
    }
});

inputBirthdateYear.addEventListener('blur', (event) => {
    const forbiddenIds = ['day', 'months'];

    if (event.relatedTarget === null || event.relatedTarget !== null && !forbiddenIds.includes(event.relatedTarget.id)) {
        checkBirthdate();
    }
});

inputEmail.addEventListener('blur', () => {
    checkEmail();
});

inputPassword.addEventListener('blur', () => {
    checkPassword();
});

inputConfirmPassword.addEventListener('blur', () => {
    checkConfirmPassword();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkFirstName();
    checkLastName();
    checkBirthdate();
    checkEmail();
    checkPassword();
    checkConfirmPassword();
});
