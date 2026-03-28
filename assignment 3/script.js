const timerElement = document.getElementById("timer");
let time = parseInt(timerElement.textContent);
const start = document.getElementById("start-button");
const pause = document.getElementById("pause-button");
const stoptimer = document.getElementById("stop-button");
var paused = false;
var interval;
var timeInMilliSeconds = 20000;

//takes in the time in seconds and returns the inner HTML for the timer
function getTime(timeInSeconds) {
  //ternary operator makes sure there is a leading zero if the number goes below 10
  let seconds =
    timeInSeconds.toString().split(".")[0].length > 1
      ? timeInSeconds.toString().split(".")[0]
      : "0" + timeInSeconds.toString().split(".")[0];
  let milliseconds = timeInSeconds.toString().split(".")[1] || "00";
  return `<span class="numberBlock">00</span>:<span class="numberBlock">${seconds}</span>:<span class="numberBlock">${milliseconds}</span>`;
}

function getInterval() {
  return setInterval(() => {
    //update time
    timeInMilliSeconds -= 10;
    // convert time to seconds
    let timeInSeconds = timeInMilliSeconds / 1000;
    timerElement.innerHTML = getTime(timeInSeconds);
    //check if time is 0
    if (timeInMilliSeconds == 0) {
      //disable all buttons except stop
      start.disabled = true;
      pause.disabled = true;
      timerElement.innerHTML = getTime(0);
      clearInterval(interval);
      setTimeout(() => {
        alert("Take a break");
      }, 100);
    }
    //change style when time goes below 15 seconds
    if (timeInMilliSeconds / 1000 < 15) {
      timerElement.classList.add("turnBlack");
    }
  }, 10);
}

start.addEventListener("click", () => {
  interval = getInterval();
  //update button states
  start.disabled = true;
  pause.disabled = false;
  stoptimer.disabled = false;
});

pause.addEventListener("click", () => {
  //flip the state of paused
  paused = !paused;
  if (paused) {
    //stop the countdown
    clearInterval(interval);
    pause.textContent = "Resume";
    //update button states
  } else {
    pause.textContent = "Pause";
    //same logic as start button
    interval = getInterval();
    //update button states
  }
});

stoptimer.addEventListener("click", () => {
  clearInterval(interval);
  //reset timer back to time in just
  timeInMilliSeconds = 60000;
  timerElement.firstChild.textContent = "01";
  timerElement.children[1].textContent = "00";
  timerElement.children[2].textContent = "00";
  start.disabled = false;
  pause.disabled = true;
  stoptimer.disabled = true;
  timerElement.classList.remove("turnBlack");
  paused = false;
  pause.textContent = "Pause";
});
