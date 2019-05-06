const startBtn = document.getElementById("startBtn");
const boxes = [...document.getElementsByClassName("box")];
const gameDescription = document.getElementById("gameDescription");

const possibleAnswers = {
  "green": 0,
  "red": 1,
  "yellow": 2,
  "blue": 3
}

let level = 1;
let sequence = 0;
let answers = [];
let playing = false;


function toggleActive(num) {
  boxes[num].classList.toggle("active");
}

function gameToggle(num) {
  toggleActive(num);
  setTimeout(function() {
    toggleActive(num);
  }, 500);
}

function generateNum() {
  return Math.floor(Math.random() * 4)
}

function updateLevelText() {
  const levelText = document.getElementById("level");
  levelText.innerText = `Level ${level}`;
}

function updateGameDescription(message) {
  gameDescription.innerText = message;
}

function clearGameDescription() {
  gameDescription.innerText = "";
}

function startGame() {
  playing = true;
  updateGameDescription("game started");
  level = 1;
  startBtn.setAttribute("disabled", true);
  playRound();
}

function playRound() {
  updateLevelText();
  updateGameDescription("Watch");
  let newNum = generateNum();
  answers.push(newNum);
  console.log(`answers: ${answers}`);

  for (let i = 0; i < answers.length; i++) {
    setTimeout(function() {
      gameToggle(answers[i]);
    }, i * 1000);
  }

  setTimeout(() => {
    updateGameDescription("Now click");
  }, answers.length * 1000);
}

function checkAnswer(event) {
  const userAnswer = possibleAnswers[event.target.id];
  const correctAnswer = answers[sequence];

  if (userAnswer == correctAnswer) {
    updateGameDescription("good job! :)");
    sequence++;
  } else {
    updateGameDescription("You lose. :(");
    sequence = 0;
    answers = [];
    startBtn.removeAttribute("disabled");
    playing = false;
  }

  // when you reached the last correct answer, play new round

  if (sequence == answers.length && playing == true) {
    updateGameDescription("nice job! round end, starting new round...");
    setTimeout(() => {
      sequence = 0;
      level++;
      playRound();
    }, 1250);
  }
}

startBtn.addEventListener("click", startGame);


boxes.forEach((box) => {
  box.addEventListener("click", function(e) {
    if (playing == true) {
      let color = e.target.id;
      gameToggle(possibleAnswers[color]);
      checkAnswer(e);
    }
  });
});
