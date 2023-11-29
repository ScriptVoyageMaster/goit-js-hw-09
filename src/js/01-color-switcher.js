
// Функція для генерації випадкового кольору в форматі HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Отримуємо доступ до кнопок за їхніми ідентифікаторами
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let intervalId; // Змінна для збереження ідентифікатора інтервалу

// Обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  startButton.disabled = true; // Вимикаємо кнопку "Start"
  stopButton.disabled = false; // Увімкнюємо кнопку "Stop"

  // Запускаємо інтервал для зміни кольору фону кожну секунду
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// Обробник події для кнопки "Stop"
stopButton.addEventListener('click', () => {
  startButton.disabled = false; // Увімкнюємо кнопку "Start"
  stopButton.disabled = true;   // Вимикаємо кнопку "Stop"

  clearInterval(intervalId);    // Зупиняємо інтервал
});

