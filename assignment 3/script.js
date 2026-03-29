const timerElement = document.getElementById("timer");
const start = document.getElementById("start-button");
const pause = document.getElementById("pause-button");
const stoptimer = document.getElementById("stop-button");
const INITIAL_TIME = 60000;
var paused = false;
var interval;
var currentMS = INITIAL_TIME;
reset(INITIAL_TIME);

//takes in the time in seconds and returns the inner HTML for the timer
function getTime(timeInSeconds) {
  //ternary operator makes sure there is a leading zero if the number goes below 10
  let secs = timeInSeconds.toString().split(".")[0].padStart(2, 0);
  let mins = Math.floor(secs / 60)
    .toString()
    .padStart(2, 0);
  secs = (secs % 60).toString().padStart(2, 0);
  let ms = timeInSeconds.toString().split(".")[1]
    ? timeInSeconds.toString().split(".")[1].padEnd(2, 0)
    : "00";
  return `<span class="numberBlock">${mins}</span>:<span class="numberBlock">${secs}</span>:<span class="numberBlock">${ms}</span>`;
}

// resets the timer
function reset(time) {
  clearInterval(interval);
  //reset timer back to time in just
  currentMS = time;
  timerElement.innerHTML = getTime(time / 1000);
  start.disabled = false;
  pause.disabled = true;
  stoptimer.disabled = true;
  timerElement.classList.remove("turnBlack");
  paused = false;
  pause.textContent = "Pause";
}

//gives the interval that makes the timer go
function getInterval() {
  return setInterval(() => {
    //update time
    currentMS -= 10;
    // convert time to seconds
    let timeInSeconds = currentMS / 1000;
    timerElement.innerHTML = getTime(timeInSeconds);
    //check if time is 0
    if (currentMS == 0) {
      //disable all buttons except stop
      start.disabled = true;
      pause.disabled = true;
      timerElement.innerHTML = getTime(0);
      clearInterval(interval);
      setTimeout(() => {
        alert("Take a break");
        reset(INITIAL_TIME);
      }, 100);
    }
    //change style when time goes below 15 seconds
    if (currentMS / 1000 < 15) {
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
  reset(INITIAL_TIME);
});
