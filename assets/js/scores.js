const highscoresEl = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

function getResults() {
  var storedResults = localStorage.getItem("score");
  if (storedResults !== null) {
    var items = JSON.parse(storedResults);
    console.log(items);
    displayHighscores(items);
  }
}

function displayHighscores(items) {
  console.log(items);
  items.forEach(function (item) {
    console.log(item);
    var liElement = document.createElement("li");
    liElement.textContent = item.initials + ": " + item.score;
    highscoresEl.appendChild(liElement);
  });
}

function clearResults() {
  localStorage.clear();

  if (highscoresEl) {
    while (highscoresEl.firstChild) {
      highscoresEl.removeChild(highscoresEl.firstChild);
    }
  }
}

getResults();
clearBtn.addEventListener("click", clearResults);
