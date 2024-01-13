// Initialise ids
const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start");
const questionsContainerEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const endScreenEl = document.getElementById("end-screen");
const feedbackEl = document.getElementById("feedback");

let currentQuestionIndex = 0;

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

function selectAnswer(selectedOption) {
  let currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Wrong!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setQuestion();
  } else {
    questionsContainerEl.classList.add("hide");
    feedbackEl.classList.add("hide");
    endScreenEl.classList.remove("hide");
  }
}

// event listeners
startButtonEl.addEventListener("click", setQuestion);
