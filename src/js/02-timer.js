// js/02-timer.js

// Отримання елементів DOM
const startButton = document.getElementById('startButton');
const daysElement = document.querySelector('[data-days] .top-line');
const hoursElement = document.querySelector('[data-hours] .top-line');
const minutesElement = document.querySelector('[data-minutes] .top-line');
const secondsElement = document.querySelector('[data-seconds] .top-line');
const datetimePicker = document.getElementById('datetime-picker');

let countdownInterval;

// Встановлення початкових значень для datetimePicker
setInitialDatetime();

// Обробник зміни значення datetimePicker
datetimePicker.addEventListener('change', () => {
  updateStartButtonStatus();
});

// Функція для оновлення таймера
function updateTimer(targetDate) {
  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  // Розрахунок днів, годин, хвилин та секунд
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Оновлення значень на сторінці
  daysElement.textContent = formatTimeValue(days);
  hoursElement.textContent = formatTimeValue(hours);
  minutesElement.textContent = formatTimeValue(minutes);
  secondsElement.textContent = formatTimeValue(seconds);

  // Перевірка, чи таймер досягнув нуля
  if (timeDifference <= 0) {
    clearInterval(countdownInterval); // Зупинка таймера
    updateStartButtonStatus();        // Оновлення статусу кнопки "Start"
  }
}

// Функція для форматування числових значень (додавання 0 перед числами < 10)
function formatTimeValue(value) {
  return value < 10 ? `0${value}` : value;
}

// Обробник натискання на кнопку "Start"
startButton.addEventListener('click', () => {
  // Отримання введеної дати та часу
  const targetDate = new Date(datetimePicker.value).getTime();

  // Перевірка, чи введена коректна дата
  if (isNaN(targetDate)) {
    alert('Please enter a valid date and time.');
    return;
  }

  // Оновлення таймера кожну секунду
  countdownInterval = setInterval(updateTimer, 1000, targetDate);

  // Вимикаємо кнопку "Start"
  startButton.disabled = true;
});

// Функція для оновлення статусу кнопки "Start"
function updateStartButtonStatus() {
  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();

  // Активація кнопки "Start" лише якщо вибрана дата та час більші за поточну системну
  startButton.disabled = selectedDate <= currentDate;
}

// Функція для встановлення початкових значень для datetimePicker
function setInitialDatetime() {
  const currentDatetime = new Date();
  const year = currentDatetime.getFullYear();
  const month = (currentDatetime.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDatetime.getDate().toString().padStart(2, '0');
  const hours = currentDatetime.getHours().toString().padStart(2, '0');
  const minutes = currentDatetime.getMinutes().toString().padStart(2, '0');

  const initialDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
  datetimePicker.value = initialDatetime;
  updateStartButtonStatus(); // Оновлення статусу кнопки "Start"
}
