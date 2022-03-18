// Global Variables
var countdown = document.querySelector("#count-down");
var startBtn = document.querySelector("#timer-start"); 
var questionsGroup = document.querySelector("#questions-group")
var mainContainer = document.querySelector("#main-container");
var startQuizCard = document.querySelector("#quiz-start");

//timers
var timeLeft = 75;
var endQuiz = 0;
var penaltyTime = 10;
var qCreate = document.createElement("ul");

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


startBtn.addEventListener("click", function() {
    startQuizCard.setAttribute("style", "display: none;")

    if (endQuiz === 0) {
        endQuiz = setInterval(function() {
            timeLeft--;
            countdown.textContent = "Time Left: " + timeLeft;
        })
    }

    if (timeLeft <= 0) {
        clearInterval(endQuiz);
        allFinished();
        countdown.textContent = "TIME'S UP!";
    }
    showQuestions(); //render(quesIndex)
}, 1000)

function showQuestions(quesIndex) {
    questionsGroup.innerHTML = "";
    qCreate.innerHTML = "";

    for (let i = 0; i < quesArray.length; i++) {
        var userQuestion = quesArray[quesIndex].question;
        var userAnswerChoices = quesArray[quesIndex].answers;
        questionsGroup.textContent = userQuestion;        
    }

    //append questions and answer choices
    userAnswerChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsGroup.appendChild(qCreate);
        qCreate.appendChild(listItem);
        listItem.addEventListener("click", (evalCorrectAns));
    })
}

//Evaluate user's clicked answer to correct answer
function evalCorrectAns(event) {
    var element = element.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", createDiv);
    }
    if (element.textContent == questions[quesIndex].correctAnswer) {
        score++;
        createDiv.textContent = "Correct!";
    } else {
        timeLeft = timeLeft - penaltyTime;
        createDiv.textContent = "Wrong! The correct answer is: " + questions[quesIndex.correctAnswer];
    }
}
