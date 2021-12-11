//Questions and Answers
const question1 = "Which of the following presents a pop-up with the options of Ok and Cancel?";
const question1Answers = ["Alert", "Confirm", "Prompt", "Pop-up"];
const question2 = "Which javascript function returns the length of an array?";
const question2Answers = ["Length()", "size", "Size()", "length"];
const question3 = "Which of the following is not a data type in Javascript?";
const question3Answers = ["Vector", "String", "Number", "Null"];
const question4 = "Which of the following is not a Javascript Keyword?";
const question4Answers = ["goto", "let", "define", "const"];
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
const questions = [QuestionOne, QuestionTwo, QuestionThree, QuestionFour, QuestionFive];
var questionIndex = 0;
var wasCorrect = false;
//Will use these variables numerous times
const mainSection = document.getElementById("mainSection");
const scoreSection = document.getElementById("scoreSection");

//When the Start Quiz button is clicked, start the timer and goto a question
function StartQuizButton() {
    timer = 60;
    StartTimer();
    questions[questionIndex]();
}

//Handles the timer
function StartTimer() {
    document.querySelector("#timer").setAttribute("style", "animation: blinks 1s infinite;");//Blink animation start
    timerControl = setInterval(TimerControl, 1000);//Every Second call TimerControl()
}

//Function for the above setInterval method
function TimerControl() {
    if (timer <= 0) {
        clearInterval(timerControl);//Stop updating
        document.querySelector("#timer").setAttribute("style", "animation: none;");//Stop animation
        OutOfTime(); //break out of normal flow
    }
    document.getElementById("timer").innerHTML = "Time: " + timer;
    timer--;
}

//First Question, doesn't display the score since no score is possible until at least 1 answer is chosen
function QuestionOne() {
    DisplayQuestionsAndAnswers(question1, question1Answers);
}
//Second Question
function QuestionTwo() {
    DisplayQuestionsAndAnswers(question2, question2Answers)
    DisplayScore();
}
//Third Question
function QuestionThree() {
    DisplayQuestionsAndAnswers(question3, question3Answers)
    DisplayScore();
}
//Fourth Question
function QuestionFour() {
    DisplayQuestionsAndAnswers(question4, question4Answers)
    DisplayScore();
}
//Fifth Question
function QuestionFive() {
    DisplayQuestionsAndAnswers(question5, question5Answers)
    DisplayScore();
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

//Displays the current score
function DisplayScore() {
    scoreSection.innerHTML = "";
    var hr = document.createElement("hr");
    var span = document.createElement("span");
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var innerSpan = document.createElement("span");
    span.class = "score";
    span.textContent = "Score: " + score;
    scoreSection.appendChild(hr);
    scoreSection.appendChild(span);
    scoreSection.appendChild(br1);
    scoreSection.appendChild(br2);
    if (wasCorrect) {
        innerSpan.textContent = "Correct!";
        scoreSection.appendChild(innerSpan);
        wasCorrect = false;
    }
    else {
        innerSpan.textContent = "Incorrect! 10 seconds were subtracted";
        scoreSection.appendChild(innerSpan);
    }
    document.querySelector("#scoreSection").setAttribute("style", "text-align: center; color: purple; font-size: 25px;");
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

//After a button is clicked, check if they got the right answer and move on to the next question
function CheckAnswer() {
    var answer = CheckButtons();
    if (answerSheet[questionIndex] === answer) {
        //we're right
        score += 10;
        questionIndex++;
        wasCorrect = true;
    }
    else {
        //wrong
        timer -= 10;
        questionIndex++;
    }
    if (questionIndex >= 5) {
        DisplayScore();
        FinalScoreScreen(false);
    }
    else {
        questions[questionIndex]();
    }
}

//Returns the index of which button was clicked and resets the button values
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

//Skip to final score screen with parameter indicating we got there because we are out of time
function OutOfTime() {
    FinalScoreScreen(true);
}

//Show the final score and allow a user to enter their initials
function FinalScoreScreen(outOfTime) {
    clearInterval(timerControl); //stop timer
    document.querySelector("#timer").setAttribute("style", "animation: none;"); //stop animation
    scoreSection.innerHTML = "";
    mainSection.innerHTML = "";
    var section = document.createElement("section");
    var h3 = document.createElement("h3");
    var div = document.createElement("div");
    var span = document.createElement("span");
    var form = document.createElement("form");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var h1 = document.createElement("h1");
    if (outOfTime) {
        h1.textContent = "You ran out of time!";
    }
    else {
        h1.textContent = "All done!";
    }
    h3.id = "finalScoreHeader";
    h3.textContent = "Your final score is: " + score;
    h3.setAttribute("style", "margin: 0; padding: 0;");
    div.id = "formHolder";
    span.textContent = "Enter Initials";
    form.action = "#";
    form.onsubmit = InitialsSubmitted;
    form.id = "initialsForm";
    input1.type = "text";
    input1.name = "initials";
    input2.type = "submit";
    input2.name = "submitButton";
    input2.setAttribute("style", "background-color: purple; color: white; border: none;");
    mainSection.appendChild(h1);
    mainSection.appendChild(section);
    section.appendChild(h3);
    section.appendChild(div);
    div.appendChild(span);
    form.appendChild(input1);
    form.appendChild(input2);
    div.appendChild(form);
}

//Once initials are submitted, check the input and if valid, add to the high scores list
function InitialsSubmitted(event) {
    event.preventDefault();
    var form = document.getElementById("initialsForm");
    var formData = new FormData(form);
    var input = formData.get("initials");
    var isValid = CheckInput(input);
    if (!isValid) {
        var hr = document.createElement("hr");
        var span = document.createElement("span");
        span.textContent = "Please enter 2-3 uppercase letters";
        scoreSection.appendChild(hr);
        scoreSection.appendChild(span);
    }
    else {
        scoreSection.innerHTML = "";
        highScores.push([input, score]);
        HighScoresScreen();
    }
}

//Regex shenanigans
function CheckInput(input) {
    //regex ^[A-Z]{2,3}$
    // 2-3 uppercase characters
    return /^[A-Z]{2,3}$/.test(input);
}

//Show the high scores and allow the user to clear it, or start the quiz over
function HighScoresScreen() {
    scoreSection.innerHTML = "";
    clearInterval(timerControl); //stop timer if running
    document.querySelector("#timer").setAttribute("style", "animation: none;"); //stop animation if running
    var displayString = "";
    displayString += "<h1>High Scores</h1>";
    displayString += "<div id='highScoreList'>";
    for (var i = 0; i < highScores.length; i++) {
        displayString += "<span class = 'scoreSpan'>" + (i + 1) + ". " + highScores[i][0] + "    " + highScores[i][1] + "</span><br>"
    }
    displayString += "</div>";
    displayString += "<div id='highScoreButtonHolder'>";
    displayString += "<button onclick='ResetEverything()'>Go Back</button> ";
    displayString += "<button onclick='ClearScores()'>Clear High Scores</button>";
    mainSection.innerHTML = displayString;
}

//Prepare the quiz to start over
function ResetEverything() {
    score = 0;
    questionIndex = 0;
    wasCorrect = false;
    scoreSection.innerHTML = "";
    mainSection.innerHTML = "";
    var span = document.createElement("span");
    var p = document.createElement("p");
    var button = document.createElement("button");
    span.textContent = "Coding Quiz Challenge";
    p.innerHTML = "Try to answer the following code-related questions within the time<br>limit. Keep in mind that incorrect answers will penalize your score/time<br>by ten seconds!";
    button.onclick = StartQuizButton;
    button.textContent = "Start Quiz";
    mainSection.appendChild(span);
    mainSection.appendChild(p);
    mainSection.appendChild(button);
}

//Get rid of the high scores and reload the screen
function ClearScores() {
    highScores = [];
    HighScoresScreen();
}
