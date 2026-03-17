const timerElement = document.getElementById("timer");
let time = parseInt(timerElement.textContent);
const start = document.getElementById("start-button");
const pause = document.getElementById("pause-button");
const stoptimer = document.getElementById("stop-button");
let interval;

let timeInMilliSeconds = time * 1000;

start.addEventListener("click", () => {
  interval = setInterval(() => {
    timeInMilliSeconds -= 10;
    if (timeInMilliSeconds / 1000 < 15) {
      timerElement.style.backgroundColor = "black";
      timerElement.style.color = "red";
    }
    timerElement.textContent = timeInMilliSeconds / 1000;
  }, 10);
  start.disabled = true;
  pause.disabled = false;
  stoptimer.disabled = false;
});

pause.addEventListener("click", () => {
  clearInterval(interval);
  start.disabled = false;
  pause.disabled = true;
  stoptimer.disabled = false;
});

stoptimer.addEventListener("click", () => {
  clearInterval(interval);
  timeInMilliSeconds = time * 1000;
  timerElement.textContent = time;
  start.disabled = false;
  pause.disabled = true;
  stoptimer.disabled = true;
  timerElement.style.backgroundColor = "transparent";
  timerElement.style.color = "white";
});
