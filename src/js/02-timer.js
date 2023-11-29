// js/02-timer.js

// Отримання елементів DOM
const startButton = document.getElementById('startButton');
const daysElement = document.querySelector('[data-days] .top-line');
const hoursElement = document.querySelector('[data-hours] .top-line');
const minutesElement = document.querySelector('[data-minutes] .top-line');
const secondsElement = document.querySelector('[data-seconds] .top-line');
const datetimePicker = document.getElementById('datetime-picker');

let countdownInterval;

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
    startButton.disabled = false;      // Увімкнення кнопки "Start"
  }
}

// Функція для форматування числових значень (додавання 0 перед числами < 10)
function formatTimeValue(value) {
  return value < 10 ? `0${value}` : value;
}
