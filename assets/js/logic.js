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

// Initialise variables
var currentQuestionIndex = 0;
var secondesLeft = 60;
var score = 0;
var timerInterval;

// event listener to start quiz
startButtonEl.addEventListener("click", startQuiz);

// start game
function startQuiz() {
  timer();
  setQuestion();
  setScore();
}

// set the questions
function setQuestion() {
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

// select a answer
function selectAnswer(selectedOption) {
  let currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
    secondesLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setQuestion();
  } else {
    questionsContainerEl.classList.add("hide");
    feedbackEl.classList.add("hide");
    endScreenEl.classList.remove("hide");
    clearInterval(timerInterval);
  }
}

// timer
function timer() {
  timerInterval = setInterval(function () {
    secondesLeft--;
    timerEl.textContent = secondesLeft;
    if (secondesLeft === 0) {
      alert("You run out of time!");
      clearInterval(timerInterval);
      location.reload(); // Reload the page
    } else {
      setScore();
    }
  }, 1000);
}

// set the score based on the seconds left from timer
function setScore() {
  score = secondesLeft;
  finalScore.textContent = score;
}
