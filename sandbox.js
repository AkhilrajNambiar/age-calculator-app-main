let emptyError = "This field is required";
let invalidDayMessage = "Must be a valid day";
let invalidMonthMessage = "Must be a valid month";
let invalidYearMessage = "Must be a valid year";
let yearShouldBePastMessage = "Must be in the past";

let dayInput = document.querySelector('input.day');
let monthInput = document.querySelector('input.month');
let yearInput = document.querySelector('input.year');
let dateForm = document.querySelector('form.date-form');
let dayErrorMessage = document.querySelector('section.day p.error-message');
let monthErrorMessage = document.querySelector('section.month p.error-message');
let yearErrorMessage = document.querySelector('section.year p.error-message');
let dayLabel = document.querySelector('label.day-label');
let monthLabel = document.querySelector('label.month-label');
let yearLabel = document.querySelector('label.year-label');
let calculatedYears = document.querySelector('h1.calculated-years span');
let calculatedMonths = document.querySelector('h1.calculated-months span');
let calculatedDays = document.querySelector('h1.calculated-days span');

let isInteger = str => {
    return Number.isInteger(Number(str));
}

let handleErrorForDay = (hasError, errorMsg) => {
    if (hasError) {
        dayInput.classList.add('error');
        dayErrorMessage.style.display = 'block';
        dayLabel.classList.add('error');
        dayErrorMessage.innerText = errorMsg;
    } else {
        dayInput.classList.remove('error');
        dayErrorMessage.style.display = 'none';
        dayLabel.classList.remove('error');
    }
}

let handleErrorForMonth = (hasError, errorMsg) => {
    if (hasError) {
        monthInput.classList.add('error');
        monthErrorMessage.style.display = 'block';
        monthErrorMessage.innerText = errorMsg;
        monthLabel.classList.add('error');
    } else {
        monthInput.classList.remove('error');
        monthErrorMessage.style.display = 'none';
        monthLabel.classList.remove('error');
    }
}

let handleErrorForYear = (hasError, errorMsg) => {
    if (hasError) {
        yearInput.classList.add('error');
        yearErrorMessage.style.display = 'block';
        yearErrorMessage.innerText = errorMsg;
        yearLabel.classList.add('error');
    } else {
        yearInput.classList.remove('error');
        yearErrorMessage.style.display = 'none';
        yearLabel.classList.remove('error');
    }
}

let validateDate = (dayString, monthString, yearString) => {
    let day = Number.parseInt(dayString, 10);
    let month = Number.parseInt(monthString, 10);
    let year = Number.parseInt(yearString, 10);
    let ongoingYear = new Date().getFullYear();
    if (day > 31 || day <= 0) {
        handleErrorForDay(true, invalidDayMessage);
        return false;
    } else if (month > 12 || month <= 0) {
        handleErrorForMonth(true, invalidMonthMessage);
        return false;
    } else if (year >= ongoingYear) {
        handleErrorForYear(true, yearShouldBePastMessage);
        return false;
    } else if (year <= 0) {
        handleErrorForYear(true, invalidYearMessage);
        return false;
    }
    else {
        return true;
    }
}

dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submitting now');
    let anyFieldIsEmpty = false;
    if (dayInput.value == "") {
        anyFieldIsEmpty = true;
        handleErrorForDay(true, emptyError);
    } else {
        handleErrorForDay(false, '');
    }
    if (monthInput.value == "") {
        anyFieldIsEmpty = true;
        handleErrorForMonth(true, invalidMonthMessage);
    } else {
        handleErrorForMonth(false, '');
    }
    if (yearInput.value == "") {
        anyFieldIsEmpty = true;
        handleErrorForYear(true, invalidYearMessage);
    } else {
        handleErrorForYear(false, '');
    }
    if (anyFieldIsEmpty) {
        return;
    }
    let anyFieldHasError = false;
    if (!isInteger(dayInput.value)) {
        handleErrorForDay(true, invalidDayMessage);
        anyFieldHasError = true;
    } else {
        handleErrorForDay(false, '');
    }
    if (!isInteger(monthInput.value)) {
        handleErrorForMonth(true, invalidMonthMessage);
        anyFieldHasError = true;
    } else {
        handleErrorForMonth(false, '');
    }
    if (!isInteger(yearInput.value)) {
        handleErrorForYear(true, invalidYearMessage);
        anyFieldHasError = true;
    } else {
        handleErrorForYear(false, '');
    }
    if (!anyFieldHasError) {
        if (validateDate(dayInput.value, monthInput.value, yearInput.value)) {
            let day = Number.parseInt(dayInput.value, 10);
            let month = Number.parseInt(monthInput.value, 10);
            let year = Number.parseInt(yearInput.value, 10);
            let currentDate = new Date();
            let hasBirthdayOccurred = (currentDate.getMonth() + 1) > month || (currentDate.getMonth() + 1 == month && currentDate.getDate() > day);
            calculatedDays.innerText = hasBirthdayOccurred ? currentDate.getDate() - day : 31 + currentDate.getDate() - day;
            calculatedMonths.innerText = hasBirthdayOccurred ? (currentDate.getMonth() + 1) - month : 12 + (currentDate.getMonth()) - month;
            calculatedYears.innerText = hasBirthdayOccurred ? currentDate.getFullYear() - year : currentDate.getFullYear() - year - 1;
        }
    }
});
