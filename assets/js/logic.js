// Initialise ids
const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start");
const timerEl = document.getElementById("time");
const questionsContainerEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitEl = document.getElementById("submit");
const highscores = document.getElementById("highscores");

// Initialise variables
var currentQuestionIndex = 0;
var secondesLeft = 50;
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
  var currentQuestion = questions[currentQuestionIndex];
  questionTitleEl.innerText = currentQuestion.question;

  choicesEl.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    var button = document.createElement("button");
    button.textContent = option;
    choicesEl.appendChild(button);
    button.addEventListener("click", () => selectAnswer(option));
  });
}

// select a answer
function selectAnswer(selectedOption) {
  var currentQuestion = questions[currentQuestionIndex];
  currentQuestionIndex++;
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
    secondesLeft -= 10;
  }

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
    if (secondesLeft <= 0) {
      clearInterval(timerInterval);
      alert("You run out of time!");
      location.reload(); // Reload the page
    } else {
      setScore();
    }
  }, 1000);
}

// set the score based on the seconds left from timer
function setScore() {
  score = secondesLeft;
  finalScoreEl.textContent = score;
}

// set submit info into local storage
function submit() {
  var initials = initialsInput.value.toUpperCase();
  var results = [
    {
      initials: initials,
      score: score,
    },
  ];

  localStorage.setItem("score", JSON.stringify(results));
}

submitEl.addEventListener("click", submit);
