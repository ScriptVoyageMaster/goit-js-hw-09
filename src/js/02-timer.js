import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            updateStartButtonStatus();
        }
    },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

function updateStartButtonStatus() {
    startButton.disabled = false;
}

function updateTimer(targetDate) {
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        updateStartButtonStatus();
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', () => {
    const targetDate = new Date(document.getElementById('datetime-picker').value).getTime();

    if (isNaN(targetDate)) {
        Notiflix.Notify.failure('Please enter a valid date and time.');
        return;
    }

    countdownInterval = setInterval(updateTimer, 1000, targetDate);
    startButton.disabled = true;
});
