// Initialise ids
const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start");
const timerEl = document.getElementById("time");
const questionsContainerEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const feedbackEl = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");

let currentQuestionIndex = 0;

function setQuestion() {
  timer();
  startScreenEl.classList.add("hide");
  questionsContainerEl.classList.remove("hide");
  feedbackEl.classList.remove("hide");
  let currentQuestion = questions[currentQuestionIndex];
  questionTitleEl.innerText = currentQuestion.question;

  choicesEl.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    let button = document.createElement("button");
    button.textContent = option;
    choicesEl.appendChild(button);
    button.addEventListener("click", () => selectAnswer(option));
  });
}

function selectAnswer(selectedOption) {
  let currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setQuestion();
    } else {
      questionsContainerEl.classList.add("hide");
      feedbackEl.classList.add("hide");
      endScreenEl.classList.remove("hide");
    }
  }
}

// timer
var secondesLeft = 5;

function timer() {
  let timerInterval = setInterval(function () {
    secondesLeft--;
    timerEl.textContent = secondesLeft;
    if (secondesLeft === 0) {
      clearInterval(timerInterval);
      questionsContainerEl.classList.add("hide");
      feedbackEl.classList.add("hide");
      endScreenEl.classList.remove("hide");
    }
  }, 1000);
}

function score() {
  finalScore.textContent = secondesLeft;
}

// time out message and choice to try again or quit
// =======================================
// function timerRunOutMessage() {
//   reset();

//   let tryAgainButtons = ["Yes", "No"];

//   questionTitleEl.textContent = "You ran out of time, Would you like to try again?";

//   tryAgainButtons.forEach((option, index) => {
//     let button = document.createElement("button");
//     button.textContent = option;
//     choicesEl.appendChild(button);
//     button.addEventListener("click", ()=>{});
//   });
// }

// clear question if the time runs out
function reset() {
  while (choicesEl.firstChild) {
    feedbackEl.classList.add("hide");
    choicesEl.removeChild(choicesEl.firstChild);
  }
}

// event listeners
startButtonEl.addEventListener("click", setQuestion);
