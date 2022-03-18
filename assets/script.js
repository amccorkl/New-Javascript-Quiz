// Welcome Page
var highScores = document.querySelector("#high-scores");
var startBtn = document.querySelector("#start-btn");
var timeEl = document.querySelector("#time-left");
var mainSection = document.querySelector(".main-section");

// Question Container
var questionContainer = document.querySelector(".question-container");
var questionAns = document.querySelector(".question-answers");
var answerChoice1 = document.querySelector("#answer1");
var answerChoice2 = document.querySelector("#answer2");
var answerChoice3 = document.querySelector("#answer3");
var answerChoice4 = document.querySelector("#answer4");

// Save Container renders info to the High Scores UI
var saveContainer = document.querySelector(".save-container")
var finalScore = document.querySelector("#final-score");
var gameScore = document.querySelector("#gameScore");
var inputForm = document.querySelector("#results-form");
// var initialsLabel = document.querySelector("#initials");
var saveBtn = document.querySelector("#submit-btn");


// High Scores Container
var highScoresContainer = document.querySelector(".high-scores-container");
var highScoreList = document.querySelector("#high-score-list");
var playAgainBtn = document.querySelector("#play-again");
var clearBtn = document.querySelector("#clear");


// Global Variables
var timerCount;
var time;
var index = 0;
var getQuestion = [];
var highScoresArr = [];

var quesArray = [
    {
        question: "Which 20th C. leader oversaw the Cultural Revolution?",
        answers: ["Stalin", "Mao", "Hitler", "Mussolini"],
        correctAnswer: "Mao"
    },
    {
        question: "Which 20th C. leader oversaw the change from early Socialism to dictatorial Communism?",
        answers: ["Stalin", "Mao", "Hitler", "Mussolini"],
        correctAnswer: "Stalin"
    },
    {
        question: "Which 20th C. leader first developed the notion of Fascism?",
        answers: ["Stalin", "Mao", "Hitler", "Mussolini"],
        correctAnswer: "Mussolini"
    },
    {
        question: "Which 20th C. leader presided over his country during the development of concentration camps?",
        answers: ["Stalin", "Mao", "Hitler", "Mussolini"],
        correctAnswer: "Hitler"
    },
];

//when game loads, scores in local storage checked and high score button works immediately 
function init() {
    if (localStorage.getItem("scores")) {
        highScoresArr = JSON.parse(localStorage.getItem("scores"));
    }  else {
        highScoresArr = [];
    }
    renderHighScores();
}

//render high scores
function renderHighScores () {
    // save initials with score here to highScoresArr
    highScoresArr.sort(function (a, b) {
        return b.score - a.score;

    })
    //do something here still???
    highScoresArr.forEach(function (highScores) {
        console.log("high scores..." + highScores.score);
    })

}

//save high scores and hide all other containers
function saveScore() {
    questionContainer.style.display = "none";
    questionAns.style.display = "none";
    saveContainer.style.display = "block";
    finalScore.style.display = "block";
    inputForm.style.display = "block";


    // !!!make sure to do my own connection to input (instead of "mon") and score here!!!
    var scoreObj = {initialsForm: "mon", score: 400}
    highScoresArr.push(scoreObj);
    localStorage.setItem("scores", JSON.stringify(highScoresArr));
    console.log();
    renderHighScores();
}

//show results after each game, not cummulative
var gameResult = document.querySelector("#game-result");
var resultInfo = document.querySelector("#result-info");

//hide results div
function hideResults() {
    gameResult.style.display = "none";
}

//when startbtn clicked, the questions card loads that was hidden
function startQuiz (){
    mainSection.style.display = "none";
    startBtn.style.display = "none";
    questionContainer.style.display = "block";
    questionAns.style.display = "block";
    showQuestions();
}

//loads a question and its answers, also start the timer 
function showQuestions() {
    timerCount = 75;
    startTimer();
    // selects the questions from the array and deducts 10 sec from timer for incorrect answer
    var quesEl = document.getElementById("question-text");
    questionAns.innerHTML = "";
    
    var quesText = quesArray[index].question;
    quesEl.textContent = quesText;

    
    quesArray[index].answers.forEach(function (answer) {
        var button = document.createElement("button");
        button.textContent = answer;
        button.setAttribute("value", answer);
        button.onclick = evaluateAnswer; 
        questionAns.appendChild(button);

    })
}

//compares the user answer against the correct answer
function evaluateAnswer () {
    console.log(this.value);

    if (this.value !== quesArray[index].correctAnswer) {
        console.log("wrong");
        // time - 10;
        index--;
    } else {
        console.log("correct");
        index++;

        //score variable 
    } 
    index++;

    

    if (index === quesArray.length) {
        console.log("end game"); //need to do this
        saveScore();
        clearInterval(timer); //not stoppins?????
    } else {
        showQuestions();
    }
    
}

// called timer function above when start button clicked
function startTimer() {
    time = setInterval(function() {
        timerCount--;
        timeEl.textContent = timerCount;
        
        // if (timerCount >= 0 && question === null) {
        //     clearInterval();
        // }

        // clear timer for when game replayed
        if (timerCount < 0) {
            endQuiz();
            //game over text here???
            clearInterval(time);
        }
    }, 1000)
}

// load the welcome page and the highscores
init();

// Event Listeners
//start game, moves the UI to the questions and starts the timer
startBtn.addEventListener("click", function() {
    startQuiz();
})

//save score 
saveBtn.addEventListener("click", saveScore);

//view high scores btn
highScores.addEventListener("click", function (event) {
    event.preventDefault;
});

//clear scores btn
clearBtn.addEventListener("click", function () {
    index = 0;
})

//play again sends user back to the startQuiz function that shows questions and restarts the timer
playAgainBtn.addEventListener("click", function() {
    startQuiz();
})