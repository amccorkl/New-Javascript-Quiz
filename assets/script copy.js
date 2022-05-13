// Global Variables
var countdownEl = document.querySelector("#count-down");
var startBtn = document.querySelector("#timer-start"); 
var quesDiv = document.querySelector("#questions-container")
var mainContainer = document.querySelector("#main-container");
var startQuizEl = document.querySelector("#quiz-start");


//timers
var timeLeft = 55;
var timer = 0;
var penaltyTime = 10;
// var qCreate = document.createElement("ul");

var score = 0;
var quesIndex = 0;

//questions
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

function initGame() {
// game starts with Start Btn click
    //hides the welcome page when startbtn clicked
    startQuizEl.setAttribute("style", "display: none;");
    startTimer();
    renderQuestions(quesIndex);
}

//timer countdown
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        countdownEl.textContent = "Time Left: " + timeLeft;
        if (timeLeft <= 0) {
        clearInterval(timer);
        allFinished();
        countdownEl.textContent = "TIME'S UP!";
        }
    }, 1000);
}
    


// have questions div show up on UI
function renderQuestions(quesIndex) {
    quesDiv.innerHTML = "";
    var quesUlDiv = document.createElement("ul");
    quesUlDiv.innerHTML = "";

    for (let i = 0; i < quesArray.length; i++) {
        var userQuestion = quesArray[quesIndex].question;
        var userAnswerChoices = quesArray[quesIndex].answers;
        quesDiv.textContent = userQuestion;   
    }

    //append questions and answer choices
    userAnswerChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quesDiv.appendChild(quesUlDiv);
        quesUlDiv.appendChild(listItem);
        listItem.addEventListener("click", (evalCorrectAns));
       
        console.log("Is this working NewItem " + newItem + "what about the quesIndex" + quesIndex);;
    })
}

//Evaluate user's clicked answer to correct answer
function evalCorrectAns(event) {
    var element = event.target;

    if (element.matches("li")) {        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == quesArray[quesIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct!";
            console.log("correct");
        } else {
            timeLeft = timeLeft - penaltyTime;
            createDiv.textContent = "Wrong! The correct answer is: " + quesArray[quesIndex].correctAnswer;
            console.log("wrong");
        } 
        quesIndex++
    }

    //move through the questions
    if (quesIndex >= quesArray.length) {
        allFinished();
        createDiv.textContent = "You Finished! " + " " + "Your score is " + score + "/ " + quesArray + ".";
        
    } else {
    renderQuestions(quesIndex);
    quesDiv.appendChild(createDiv);
    }
}

//clears time, gives saluation and appends it, gives user their score, has user input initials to save score
function allFinished() {
    clearInterval(timer);
    quesDiv.innerHTML = "";
    countdownEl.innerHTML = "";
    window.onload=function(){
        document.getElementById("score").style.display = "none";
    }

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", createH1);
    createH1.textContent = "Thanks for playing!";
    quesDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", createP);
    quesDiv.appendChild(createP);

    var createInitialsDir = document.createElement("p");
    createInitialsDir.setAttribute("id", createInitialsDir)
    // create a placeholder piece
    createInitialsDir.textContent = "Enter your initials to save your score."
    quesDiv.appendChild(createInitialsDir);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createScorePtag = document.createElement("p");
        createScorePtag.textContent = "Your score is: " + timeRemaining;
        quesDiv.appendChild(createScorePtag);
    }

    var createInputForm = document.createElement("input");
    createInputForm.setAttribute("type", "text");
    createInputForm.setAttribute("id", "initals");
    createInputForm.setAttribute("id", "points");
    createInputForm.setAttribute("id", "ranking");
    createInputForm.textContent = "";
    quesDiv.appendChild(createInputForm);

    createSubmitBtn = document.createElement("button");
    createSubmitBtn.setAttribute("type", "submit");
    createSubmitBtn.setAttribute("id", "submit");
    createSubmitBtn.textContent = "Submit";
    quesDiv.appendChild(createSubmitBtn);

    createRtnStartBtn = document.createElement("button");
    createRtnStartBtn.setAttribute("id", "restart");
    createRtnStartBtn.textContent = "Restart";
    quesDiv.appendChild(createRtnStartBtn);

    createRtnStartBtn.addEventListener("click", function() {
        window.location.replace("./index.html");
    })

    createSubmitBtn.addEventListener("click", function() {
        var initials = createInputForm.value;

        if (initials === null) {
            initials.textContent = "You didn't enter your initials";
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            console.log(finalScore);
            var scoreList = localStorage.getItem("scoreList");

            if (scoreList === null) {
                scoreList = [];
            } else {
                scoreList = JSON.parse(scoreList);
            }
            scoreList.push(finalScore);
            var newScore = JSON.stringify(scoreList);
            localStorage.setItem("scoreList", newScore);

            //connects to the High Scores UI
            window.location.replace("./index-highscores.html");
        }       
    })
}

startBtn.addEventListener("click", initGame);



