import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Опції для flatpickr (бібліотека для вибору дати та часу)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Обробник події закриття вікна вибору дати
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    // Перевірка, чи обрана дата в майбутньому
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      toggleStartButtonState();
    }
  },
};

// Ініціалізація flatpickr на елементі datetime-picker з заданими опціями
flatpickr("#datetime-picker", options);

// Отримання елементів DOM
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Змінна для зберігання інтервалу таймера
let countdownInterval;

// Функція для оновлення статусу кнопки "Start"
function toggleStartButtonState() {
  startButton.disabled = !startButton.disabled;
}

// Функція для оновлення таймера
function updateTimer(targetDate) {
  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  // Перевірка, чи таймер досягнув нуля
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    countdownInterval = null; // Збираємо інтервал
    toggleStartButtonState();
    flatpickr("#datetime-picker").setDate(new Date()); // Дозволяємо вибрати нову дату
    return;
  }

  // Розрахунок днів, годин, хвилин та секунд
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  // Оновлення значень на сторінці
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Функція для конвертації мілісекунд у формат {days, hours, minutes, seconds}
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

// Функція для додавання лідируючого нуля до значення (якщо < 10)
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Обробник натискання на кнопку "Start"
startButton.addEventListener('click', () => {
  const targetDate = new Date(document.getElementById('datetime-picker').value).getTime();

  // Перевірка, чи введено коректну дату та час
  if (isNaN(targetDate)) {
    Notiflix.Notify.failure('Please enter a valid date and time.');
    return;
  }

  // Запуск або вимкнення таймера
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null; // Збираємо інтервал
  } else {
    // Запуск таймера з інтервалом 1000 мс (1 секунда)
    countdownInterval = setInterval(updateTimer, 1000, targetDate);
  }

  toggleStartButtonState(); // Оновлення стану кнопки "Start"
});
