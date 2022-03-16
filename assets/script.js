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

// Save Container
var finalScore = document.querySelector("#final-score");
// var initialsForm = document.querySelector("")
var saveBtn = document.querySelector("#submit-btn");


// High Scores Container
var playAgainBtn = document.querySelector("#play-again");
var clearBtn = document.querySelector("#clear");


// Global Variables
var timerCount;
var timer;
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
    // save initials with score here


}

//save high scores
function saveScore() {
    renderHighScores();
}

   


//when startbtn clicked, the questions page loads that was hidden
function startQuiz (){
    mainSection.style.display = "none";
    startBtn.style.display = "none";
    questionContainer.style.display = "visible";
    questionAns.style.display = "visible";
    showQuestions();
}

//load a question and its answers, also start the timer 
function showQuestions(index) {
    timerCount = 75;
    startTimer();
    // create the questions options below


}

// called it above when start button clicked
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timeEl.textContent = timerCount;
        

        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000)
}

// load the welcome page and the highscores
init()

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

//play again sends user back to the startQuiz function that shows questions and starts the timer
playAgainBtn.addEventListener("click", function() {
    startQuiz()
})