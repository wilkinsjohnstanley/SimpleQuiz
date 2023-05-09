const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"Shark", correct: false},
            {text:"Blue whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Giraffe", correct: false},
        ]
    },{
        question: "Which is the smallest country in the world?",
        answers: [
            {text:"Vatican City", correct: true},
            {text:"Bhutan", correct: false},
            {text:"Nepal", correct: false},
            {text:"Italy", correct: false},
        ]
    },{
        question: "Which is the largest desert in the world?",
        answers: [
            {text:"Kalahari", correct: false},
            {text:"Gobi", correct: false},
            {text:"Sahara", correct: false},
            {text:"Antarctica", correct: true},
        ]
    },{
        question: "Which is the smallest continent in the world?",
        answers: [
            {text:"Asia", correct: false},
            {text:"Australia", correct: true},
            {text:"Arctic", correct: false},
            {text:"Africa", correct: false},
        ]
    }
];
//add variables for the elements. (id="question",id="answer-button", id="next-btn" )
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
//create variables to store question number and score
let currentQuestionIndex = 0;
let score = 0;
// When you start the quiz the question index will be 0. 
//We have added an inner HTML because at the end we will change the next text to restart or replay
//We call the function showQuestion that will display the question when we start the quiz
function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
//at the top of the JavaScipt you see a const "questions." We create a variable that is set to the larger set of questions and inside square brackets there is the index that corresponds to the current question.
//then we create "questionNo" as a variable and set it to the currentQuestionIndex+1. Remember that Index starts counting from 0, but humans usually start from 1.
//Now ACTION! Remember "questionElement" is the JavaScript variable we created that corrections to the HTML id.
//We have innerHTML because we want to change what is written on the page via the HTML file. 
//This is going to change each time, so we have it set equal to the question number plus a period plus currentQuestion.question.
//currentQuestion is set to the index of the object we have created earlier. So the question and it's answers at that index inside the object that is caled "questions"
//We must ensure that the old questions are removed before we add the new ones or we will have a long list of questions that gets longer every time we go to the next question

function showQuestion(){
     resetState();
     let currentQuestion = questions[currentQuestionIndex];
     let questionNo = currentQuestionIndex + 1;
     questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
//Here I have added currentQuestion.answers. If will look at the answers for the current question index.
//We will add document.createElement("button"). So we save it as a variable called button. 
//In this button we have to add text. So button.innerHTML is equal to text of the answer for the first possible answer. We'll do this for each possible answer. 
//In the button we have to add a class name. It will add this btn class name in this button.
//After that we have to display this button inside the div. 
//So we add apendChild because we are adding a button to the div.
//next we have to add the click function on these answers
//it will add if it is true or false
     currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
        button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    
    
     });
    }
//Let's define our resetState  function
//So it will remove all previous answers.
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//let's define the select answer function
//correct and incorrect are class names. It will add the corresponding classname, correct if it is correct, incorrect if it is incorrect. In the CSS we will change their color to indicate to the user the result.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
//if you choose the wrong answer, the correct answer will highlight.
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
        nextButton.style.display="block";
} 
function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//add functionality to the "next" button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
}
);

    //Now we have to call the function to start the quiz. 
    startQuiz();  