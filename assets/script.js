



// win when answer all questions- remaining time = score (or keep track of right/wrong answers?)


var startBtn = document.getElementById(`start-button`)
var startPage = document.querySelector("#start-page")
var timerH2 = document.querySelector(`#timer`)
var questionSec = document.querySelector(`#question-display`)
var questionH2 = document.querySelector(`#question`)
var answerABtn = document.querySelector(`#answer-A`)
var answerBBtn= document.querySelector(`#answer-B`)
var answerCBtn = document.querySelector(`#answer-C`)
var answerDBtn= document.querySelector(`#answer-D`)
var rightAnswerH3 = document.querySelector(`#right-answer`)
var scoreForm = document.querySelector(`#form`)

var scoreP = document.querySelector(`#score`)

var isPlaying = false;
var timeLeftMain = 65;
var timeLeftAlt = 1;
var score = 0;
// array of objects containing question and 4 choices + right answer (hidden)
var question1 = {question: "Where should CSS be linked on a HTML document?", answerA: "Body", answerB: "Head", answerC: "Main", answerD: "Header", correctAnswer: "B. Head"}
var question2 = {question: "Where should JavaScript be linked on an HTML document?", answerA: "Body", answerB: "Head", answerC: "Main", answerD: "Header", correctAnswer: "A. Body"}
var question3 = {question: "You use which tag to link a URL in HTML?", answerA: "<script>", answerB: "<link>", answerC: "<a>", answerD: "<html>", correctAnswer: "C. <a>"}
var question4 = {question: "The `color` property in CSS affects what on the page?", answerA: "border color", answerB: "background color", answerC: "font color", answerD: "all of the above", correctAnswer: "C. font color"}
var question5 = {question: "Which of these methods would NOT select an HTML element in JavaScript?", answerA: `document.quearySelector("#element")`, answerB: `document.getElementById("element")`, answerC: `document.children[0]`, answerD: `document.getElementById("#element)`, correctAnswer: `D. document.getElementById("#element)`}
var questionArr = [question1, question2, question3, question4, question5]
var arrSelector = 0;

questionSec.setAttribute("class","hidden");

// start button brings up question and starts timer
startBtn.addEventListener("click", function() {
    if (isPlaying) {
        return;
    }
    isPlaying=true
    startPage.setAttribute("class","hidden");
    questionSec.setAttribute("class","")
    // start button brings up question
   question();
    // start button brings up/starts timer
    function timer () {
        timeLeftMain = 60; 
        var timeInterval = setInterval(function () {
            timeLeftMain--;
            timerH2.textContent = `${timeLeftMain} seconds left!`;
            // if time runs out score = 0
            if (timeLeftMain <= 0) {
              timerH2.textContent = "";
              clearInterval(timeInterval);
              questionSec.setAttribute("class","hidden");
              scoreForm.setAttribute("class","");
              scoreP.textContent = `0`;
            }
            if (arrSelector === 5) {
                timerH2.textContent = "";
                clearInterval(timeInterval);
                console.log(timeLeftMain)
                scoreP.textContent = timeLeftMain
                score = timeLeftMain;
                console.log(scoreP)
            }
          }, 1000);
    }
    timer();
    console.log(questionArr);
});

function question () {
    console.log(questionArr[arrSelector])
        questionH2.textContent = questionArr[arrSelector].question;
        answerABtn.textContent = `A. ${questionArr[arrSelector].answerA}`;
        answerBBtn.textContent = `B. ${questionArr[arrSelector].answerB}`;
        answerCBtn.textContent = `C. ${questionArr[arrSelector].answerC}`;
        answerDBtn.textContent = `D. ${questionArr[arrSelector].answerD}`;
        if (arrSelector === 5) {
            questionSec.setAttribute("class","hidden")
            // scoreForm.setAttribute("class", "")
        }
}
// allows right/wrong notification to linger for a second
function timerAlt () {
    timeLeftAlt = 1;
    var timeInterval = setInterval(function() {
        timeLeftAlt--;
        // questionH2.textContent = questionArr[arrSelector-1].question;
        if (timeLeftAlt <= 0) {
            clearInterval(timeInterval);
            rightAnswerH3.textContent = "";
        }
    }, 1000);
}

questionSec.addEventListener("click",function (event){
    event.stopPropagation()
    var element = event.target
    if (element.matches("button") === true) {
        console.log(event.target)
        if (element.textContent === questionArr[arrSelector].correctAnswer) {
            console.log("correct")
            // 'tells if prev question was correct
            rightAnswerH3.textContent = `Correct!`
            timerAlt()
        } else {
            console.log("wrong")
            // wrong answer subtracts time off timer
            timeLeftMain = timeLeftMain - 15;
            // tells if prev question was wrong and what the correct answer was
            rightAnswerH3.textContent = `Wrong! The Correct answer was: ${questionArr[arrSelector].correctAnswer}.`
            timerAlt()
        }
        arrSelector++;
        if (arrSelector === 5) {
            questionSec.setAttribute("class","hidden");
            scoreForm.setAttribute("class","");
            return;
        } else {
            question ();
        }
    }
});
// save initials and score to local storage
function sendLocalStorage () {
    var user = JSON.parse(localStorage.getItem(`user`));
    var initialsInput = document.getElementById(`initials`).value
    var userData = {initials: initialsInput, score: score}
    user.push(userData)
    localStorage.setItem(`user`, JSON.stringify(user))
}


// submits form and redirects to highscore page (adds initials and score to list)
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault()
    sendLocalStorage()
    window.location.replace(`scores.html`) 
});
