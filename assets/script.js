// start button brings up question and starts timer
// wrong answer subtracts time off timer
// wrong answer highlights rigtht answer and add flavor text saying "wrong" underneath the question box
// question stays on screen for a second or two before iterating to next question
// win when answer all questions- remaining time = score (or keep track of right/wrong answers?)
// lose if time runs out (score = 0)
// array of objects containing question and 4 choices + right answer (hidden)
var startBtn = document.getElementById(`start-button`)
var startPage = document.querySelector("#start-page")
var timerH2 = document.querySelector(`#timer`)
var isPlaying = false
var timeLeft = 60;

startBtn.addEventListener("click", function() {
    if (isPlaying) {
        return;
    }
    isPlaying=true
    startPage.setAttribute("class","hidden");
    function timer () {
        timeLeft = 60; 
        var timeInterval = setInterval(function () {
            timeLeft--;
            timerH2.textContent = `${timeLeft} seconds left!`;
            if (timeLeft === 0) {
              timerH2.textContent = "";
              clearInterval(timeInterval);
            }
          }, 1000);
    }
    timer();
});
