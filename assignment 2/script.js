// part 1
const name = "Thomas";
document.getElementById("welcome").textContent = `Welcome, ${name}`;

// part 2
let count = 0;
const sessionp = document.getElementById("session");
sessionp.textContent = `Study sessions today: ${count}`;

// add count
document.getElementById("add-button").addEventListener("click", () => {
  count++;
  sessionp.textContent = `Study sessions today: ${count}`;
});

// reset count
document.getElementById("reset-button").addEventListener("click", () => {
  count = 0;
  sessionp.textContent = `Study sessions today: ${count}`;
});

// part 3
const goals = ["Read notes", "Finish lab", "Practice JavaScript"];
let goalsString = "";

// print all goals to the console
goals.forEach((goal) => {
  console.log(goal);
  goalsString += `<li>${goal}</li>`;
});

const goalsElement = document.getElementById("goals");
let goalsShown = false;

// add goals to html
document.getElementById("show-goals").addEventListener("click", () => {
  if (!goalsShown)
    goalsElement.innerHTML = goalsElement.innerHTML + goalsString;
  goalsShown = true;
});

// part 4
const hoursStudied = 2;

if (hoursStudied >= 3) {
  console.log("Good progress");
} else {
  console.log("You should study more");
}
