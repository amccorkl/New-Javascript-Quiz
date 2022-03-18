var highScores = document.querySelector("#high-score");
var goBack = document.querySelector("#go-back");
var clear = document.querySelector("#clear");

// retrieves and renders scores
var scoreList = localStorage.getItem("scoreList");
    scoreList = JSON.parse(scoreList);

if (scoreList !== null) {
    for (let i = 0; i < scoreList.length; i++) {     
    var listItem = document.createElement("dl");
    listItem.textContent = scoreList[i] + " " + scoreList[i].score;
    highScores.appendChild(listItem);
    }
}

//clear scores when button clicked
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//return to main page when button clicked
goBack.addEventListener("click", function() {
    window.location.replace("index.html");
})