const highscoresEl = document.getElementById("highscores");

function getResults() {
  var storedResults = localStorage.getItem("score");
  if (storedResults !== null) {
    var items = JSON.parse(storedResults);
    displayHighscores(items);
  } else {
    alert("no list found!");
  }
}

function displayHighscores(items) {
  items.forEach(function (item) {
    var liElement = document.createElement("li");
    liElement.textContent = item;
    highscoresEl.appendChild(liElement);
  });
}

getResults();
