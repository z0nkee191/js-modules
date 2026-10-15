const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
let currentKeyIndex = 0;

const keyElement = document.getElementById("key");
const gameStatusElement = document.getElementById("game-status");
const newGameButton = document.getElementById("btn-new-game");

function updateGameDisplay() {
  if (currentKeyIndex < keys.length) {
    keyElement.textContent = keys[currentKeyIndex];
    gameStatusElement.textContent = `Крок ${currentKeyIndex + 1} з ${keys.length}. Натисніть клавішу на клавіатурі.`;
  } else {
    keyElement.textContent = "OK";
    gameStatusElement.textContent = "Вітаємо! Ви успішно пройшли всі 10 клавіш!";
  }
}

function showNotification(type, title, text, delay = 2000) {
  if (typeof PNotify !== "undefined" && typeof PNotify[type] === "function") {
    PNotify[type]({
      title: title,
      text: text,
      delay: delay,
      closer: true,
      sticker: false
    });
  } else if (typeof PNotify !== "undefined" && typeof PNotify.alert === "function") {
    PNotify.alert({
      title: title,
      text: text,
      type: type,
      delay: delay
    });
  }
}

currentKeyIndex = 0;
updateGameDisplay();

window.addEventListener("keydown", (event) => {
  if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(event.key)) {
    return;
  }

  if (currentKeyIndex >= keys.length) {
    showNotification(
      "notice",
      "Гру завершено!",
      "Ви вже натиснули всі клавіші. Натисніть кнопку «Нова гра», щоб спробувати знову!"
    );
    return;
  }

  const expectedKey = keys[currentKeyIndex];
  const pressedKey = event.key.toLowerCase();

  const isMatch =
    pressedKey === expectedKey.toLowerCase() ||
    event.code.toLowerCase() === `key${expectedKey}`.toLowerCase() ||
    event.code.toLowerCase() === `digit${expectedKey}`.toLowerCase();

  if (keyElement) {
    keyElement.classList.add("pressed");
    setTimeout(() => keyElement.classList.remove("pressed"), 120);
  }

  if (isMatch) {
    currentKeyIndex++;

    if (currentKeyIndex < keys.length) {
      updateGameDisplay();
      showNotification(
        "success",
        "Успіх!",
        `Правильно! Наступна клавіша: "${keys[currentKeyIndex]}"`,
        1500
      );
    } else {
      updateGameDisplay();
      showNotification(
        "success",
        "Перемога!",
        "Вітаємо! Ви успішно пройшли всі 10 клавіш! Натисніть «Нова гра», щоб зіграти знову.",
        4000
      );
    }
  } else {
    showNotification(
      "error",
      "Помилка!",
      `Неправильна клавіша: "${event.key}". Очікувалась: "${expectedKey}"`,
      1500
    );
  }
});

window.addEventListener("keypress", (event) => {
  event.preventDefault();
});

if (newGameButton) {
  newGameButton.addEventListener("click", () => {
    currentKeyIndex = 0;
    updateGameDisplay();
    showNotification(
      "info",
      "Нова гра",
      `Гру розпочато! Ваша перша клавіша: "${keys[currentKeyIndex]}"`,
      2000
    );
  });
}
