// Initialise ids
const highscoresEl = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

// check results from local storage
function getResults() {
  var storedResults = localStorage.getItem("score");
  if (storedResults !== null) {
    var items = JSON.parse(storedResults);
    console.log(items);
    displayHighscores(items);
  }
}

// display results into list items
function displayHighscores(items) {
  console.log(items);
  items.forEach(function (item) {
    console.log(item);
    var liElement = document.createElement("li");
    liElement.textContent = item.initials + ": " + item.score;
    highscoresEl.appendChild(liElement);
  });
}

// clear local storage and scoreboard
function clearResults() {
  localStorage.clear();

  if (highscoresEl) {
    while (highscoresEl.firstChild) {
      highscoresEl.removeChild(highscoresEl.firstChild);
    }
  }
}

// call results and add event listener to 'clear button'
getResults();
clearBtn.addEventListener("click", clearResults);
