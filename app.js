// ALL VARIABLES
var playing = false;
var score;
var action;
var timeremainning;
var CorrectAnswer;

// IF WE CLICK ON THE START BUTTON
document.getElementById("startreset").onclick = function () {
    // IF WE ARE PLAYING
    if (playing == true) {
        location.reload();  //it will reload the current document
    }
    else {
        playing = true;
        // if we are not playing
        // set score = 0
        score = 0;
        document.getElementById("ScoreValue").innerHTML = score;

        document.getElementById("timeremaining").style.display = "block" // SHOWING THE TIMER
        timeremainning = 60;
        document.getElementById("time").innerHTML = timeremainning;

        // TO HIDE THE FINAL 
        document.getElementById("final").style.display = "none";

        document.getElementById("startreset").innerHTML = "RESET"   // BUTTON SHOULD BE RESET
        startCountdown();

        // TO GENERATE MUSLTIPLE QUESTIONS
        genearteQA();

    }
}
// TO SELECT THE CORRECT ANSWER
for(i=1; i<5; i++){
    document.getElementById("box" + i).onclick = function () {
        // IF WE ARE PLAYING
        if (playing == true) {
            if (this.innerHTML == CorrectAnswer) {
                // THIS MEANS ITS A CORRECT ANSWER
                score++;
                document.getElementById("ScoreValue").innerHTML = score;
                genearteQA();
                // now to hide the wrong box and to show correct
                document.getElementById("correct").style.display = "block";
                document.getElementById("tryAgain").style.display = "none";
                setTimeout(function () {
                    document.getElementById("correct").style.display = "none";
                }, 1000);
            }
            else {
                document.getElementById("correct").style.display = "none";
                document.getElementById("tryAgain").style.display = "block";
                setTimeout(function () {
                    document.getElementById("tryAgain").style.display = "none";
                }, 1000);
            }
        }
    }
}

// FUNCTIONS
// START TIMING 
function startCountdown() {
    action = setInterval(function () {
        timeremainning -= 1;
        document.getElementById("time").innerHTML = timeremainning;
        if (timeremainning == 0) {
            StopCountdown();
            document.getElementById("final").style.display = "block"
            document.getElementById("final").innerHTML = "<p>Game Over!</p> <p>Your Score Is : " + score + "</p>";
            playing = false;
            document.getElementById("startreset").innerHTML = "START"
        }
    }, 1000);
}

// TO STOP THE COUNTER
function StopCountdown() {
    clearInterval(action);
}

// FUNCTIONS TO GENRATE QA
function genearteQA() {
    var x = 1 + Math.round(99 * Math.random());
    var y = 1 + Math.round(99 * Math.random());
    CorrectAnswer = x * y;
    document.getElementById("Questions").innerHTML = x + "X" + y;
    var CorrectPosition = 1 + Math.round(3 * Math.random());

    // FILLING THE BOXES WITH CORRECT ANSWERS
    document.getElementById("box" + CorrectPosition).innerHTML = CorrectAnswer;

    // FILLING THE BOXES WITH WRONG ANSWERS
    var answers = [CorrectAnswer];
    for (i = 1; i < 5; i++) {
        if (i !== CorrectPosition) {
            var WrongAnswer;

            do { WrongAnswer = (1 + Math.round(99 * Math.random())) * (1 + Math.round(99 * Math.random())); } // THIS WILL GIVE US WRONG ANNSWER}
            while (answers.indexOf(WrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = WrongAnswer;
            answers.push(WrongAnswer);
        }
    }
}