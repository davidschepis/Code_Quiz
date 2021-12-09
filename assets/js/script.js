//Questions and Answers
const question1 = "Which of the following presents a pop-up with the options of Ok and Cancel?";
const question1Answers = ["Alert", "Confirm", "Prompt", "Pop-up"];
const question2 = "Which javascript function returns the length of an array?";
const question2Answers = ["Length()", "size", "Size()", "length"];
const question3 = "Which of the following is not a data type in Javascript?";
const question3Answers = ["Vector", "String", "Number", "Null"];
const question4 = "Where is the correct place to insert Javascript?";
const question4Answers = ["Div", "Stylesheet", "body", "title"];
const question5 = "Which of the following is a semantic element?";
const question5Answers = ["body", "section", "div", "span"];
const answerSheet = [1, 3, 0, 2, 1];

//Global variables
var score = 0;
var timer = 60;
var highScores = [];
var timerControl;
var button1 = false;
var button2 = false;
var button3 = false;
var button4 = false;
var fail = false;
const questions = [QuestionOne, QuestionTwo, QuestionThree, QuestionFour, QuestionFive];
var questionIndex = 0;
var wasCorrect = false;
//Will use this variable numerous times
const mainSection = document.getElementById("mainSection");

//When the initial start quiz button is clicked or the go back button is clicked
function StartQuizButton() {
    timer = 60;
    StartTimer();
    questions[questionIndex]();
}

function QuestionOne() {
    DisplayQuestionsAndAnswers(question1, question1Answers);
}

function QuestionTwo() {
    DisplayQuestionsAndAnswers(question2, question2Answers)
    DisplayScore();
}

function QuestionThree() {
    DisplayQuestionsAndAnswers(question3, question3Answers)
    DisplayScore();
}

function QuestionFour() {
    DisplayQuestionsAndAnswers(question4, question4Answers)
    DisplayScore();
}

function QuestionFive() {
    DisplayQuestionsAndAnswers(question5, question5Answers)
    DisplayScore();
}

function DisplayScore() {
    var displayString = "";
    displayString += "<hr><span class='score'>Score: " + score;
    if (wasCorrect) {
        displayString += "<br><br>Correct!";
        wasCorrect = false;
    }
    else {
        displayString += "<br><br>Incorrect!";
    }
    document.getElementById("scoreSection").innerHTML = displayString;
    document.querySelector("#scoreSection").setAttribute("style", "text-align: center; color: purple; font-size: 25px;");
}

//Handles the timer
function StartTimer() {
    document.querySelector("#timer").setAttribute("style", "animation: blinks 1s infinite;");
    timerControl = setInterval(TimerControl, 1000);
}

//Function for the above setInterval method
function TimerControl() {
    if (timer <= 0) {
        clearInterval(timerControl);
        document.querySelector("#timer").setAttribute("style", "animation: none;");
        OutOfTime();
    }
    document.getElementById("timer").innerHTML = "Time: " + timer;
    timer--;
}

//Displays the questions and answers
function DisplayQuestionsAndAnswers(question, answers) {
    var displayString = "";
    displayString += "<h1>" + question + "</h1>";
    displayString += "<div class='buttonBox'>";
    for (var i = 1; i < 5; i++) {
        displayString += "<button class='buttons' onclick='Button" + i + "Clicked()'>" + i + ": " + answers[i - 1] + "</button>";
    }
    displayString += "</div>";
    mainSection.innerHTML = displayString;
    for (var i = 0; i < document.querySelectorAll(".buttons").length; i++) {
        document.querySelectorAll(".buttons")[i].setAttribute("style", "display: block; font-size: 20px;");
    }
    document.querySelector(".buttonBox").setAttribute("style", "margin: 0; position: relative; left: 47%");
}

//Button clicked events
function Button1Clicked() {
    button1 = true;
    CheckAnswer();
}
function Button2Clicked() {
    button2 = true;
    CheckAnswer();
}
function Button3Clicked() {
    button3 = true;
    CheckAnswer();
}
function Button4Clicked() {
    button4 = true;
    CheckAnswer();
}

function CheckAnswer() {
    var answer = CheckButtons();
    if (answerSheet[questionIndex] === answer) {
        //we're right
        score += 10;
        questionIndex++;
        wasCorrect = true;
        if (questionIndex >= 5) {
            DisplayScore();
            FinalScoreScreen(false, false);
        }
        else {
            questions[questionIndex]();
        }
    }
    else {
        //wrong
        score -= 10;
        questionIndex++;
        if (questionIndex >= 5) {
            DisplayScore();
            FinalScoreScreen(false, false);
        }
        else {
            questions[questionIndex]();
        }
    }
}

function CheckButtons() {
    if (button1) {
        button1 = false;
        button2 = false;
        button3 = false;
        button4 = false;
        return 0;
    }
    else if (button2) {
        button1 = false;
        button2 = false;
        button3 = false;
        button4 = false;
        return 1;
    }
    else if (button3) {
        button1 = false;
        button2 = false;
        button3 = false;
        button4 = false;
        return 2;
    }
    else if (button4) {
        button1 = false;
        button2 = false;
        button3 = false;
        button4 = false;
        return 3;
    }
}

function OutOfTime() {
    FinalScoreScreen(true, false);
}

function FinalScoreScreen(outOfTime, invalidInput) {
    clearInterval(timerControl); //stop timer
    document.querySelector("#timer").setAttribute("style", "animation: none;"); //stop animation
    document.getElementById("scoreSection").innerHTML = "";
    var displayString = "";
    if (outOfTime) {
        displayString += "<h1>You ran out of time!<h1>";
    }
    else {
        displayString += "<h1>All done!<h1>";
    }
    displayString += "<h3>Your final score is " + score + "</h3>";
    displayString += "<div id=formHolder>";
    displayString += "<span>Enter Initials</span>";
    displayString += "<form action='#' onsubmit='InitialsSubmitted();return false' id='initialsForm'>"
    displayString += "<input type='text' name='initials'> <input type='submit' id='submitButton'></form>";
    displayString += "</div>";
    mainSection.innerHTML = displayString;
    document.querySelector("#submitButton").setAttribute("style", "background-color: purple; color: white; border: none;");
}

function InitialsSubmitted() {
    var form = document.getElementById("initialsForm");
    var formData = new FormData(form);
    var input = formData.get("initials");
    var isValid = CheckInput(input);
    if (!isValid) {
        document.getElementById("scoreSection").innerHTML = "<hr><span>Please enter 2-3 uppercase letters</span>";
    }
    else {
        document.getElementById("scoreSection").innerHTML = "";
        highScores.push([input, score]);
        HighScoresScreen();
    }
}

function CheckInput(input) {
    //regex ^[A-Z]{2,3}$
    // 2-3 uppercase characters
    return /^[A-Z]{2,3}$/.test(input);
}

function HighScoresScreen() {
    clearInterval(timerControl); //stop timer if running
    document.querySelector("#timer").setAttribute("style", "animation: none;"); //stop animation if running
    var displayString = "";
    displayString += "<h1>High Scores</h1>";
    displayString += "<div id='highScoreList'>";
    for (var i = 0; i < highScores.length; i++) {
        displayString += "<span class = 'scoreSpan'>" + (i+1) + ". " + highScores[i][0] + "    " + highScores[i][1] + "</span><br>"
    }
    displayString += "</div>";
    displayString += "<div id='highScoreButtonHolder'>";
    displayString += "<button onclick='ResetEverything()'>Go Back</button> ";
    displayString += "<button onclick='ClearScores()'>Clear High Scores</button>";
    mainSection.innerHTML = displayString;
}

function ResetEverything() {
    score = 0;
    questionIndex = 0;
    wasCorrect = false;
    StartQuizButton();
}

function ClearScores() {
    highScores = [];
    HighScoresScreen();
}