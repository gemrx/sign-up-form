const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');
const selectNodeList = document.querySelectorAll('.select-field select');


function handleFirstNameChange() {
    // Which one .check() vs .test() 
}

// update the icon of the select field
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

selectNodeList.forEach(select => {
    select.addEventListener('click', updateSelectFieldIcon);
    select.addEventListener('keypress', updateSelectFieldIcon);
    select.addEventListener('blur', updateSelectFieldIcon);
});
