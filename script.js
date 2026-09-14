const dice = document.querySelector("#dice");
const rollButton = document.querySelector("#roll-button");
const clearButton = document.querySelector("#clear-button");
const resultNumber = document.querySelector("#result-number");
const rollCount = document.querySelector("#roll-count");
const statusText = document.querySelector("#status-text");
const historyList = document.querySelector("#history-list");
const emptyState = document.querySelector("#empty-state");

let totalRolls = 0;
let isRolling = false;

function addHistoryItem(value) {
  if (emptyState) {
    emptyState.remove();
  }

  const historyItem = document.createElement("li");
  historyItem.className = "history-item";
  historyItem.textContent = value;
  historyItem.setAttribute("aria-label", `擲出 ${value} 點`);
  historyList.prepend(historyItem);

  while (historyList.children.length > 10) {
    historyList.lastElementChild.remove();
  }
}

function rollDice() {
  if (isRolling) {
    return;
  }

  isRolling = true;
  rollButton.disabled = true;
  statusText.textContent = "骰子滾動中...";
  dice.classList.remove("is-rolling");
  void dice.offsetWidth;
  dice.classList.add("is-rolling");

  window.setTimeout(() => {
    const value = Math.floor(Math.random() * 6) + 1;
    totalRolls += 1;
    dice.dataset.value = value;
    dice.setAttribute("aria-label", `骰子點數 ${value}`);
    resultNumber.textContent = value;
    rollCount.textContent = totalRolls;
    statusText.textContent = "已完成擲骰";
    addHistoryItem(value);
    clearButton.disabled = false;
    isRolling = false;
    rollButton.disabled = false;
  }, 640);
}

function clearHistory() {
  historyList.replaceChildren();
  historyList.append(emptyState);
  totalRolls = 0;
  rollCount.textContent = totalRolls;
  clearButton.disabled = true;
  statusText.textContent = "紀錄已清除";
}

rollButton.addEventListener("click", rollDice);
clearButton.addEventListener("click", clearHistory);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
    rollDice();
  }
});