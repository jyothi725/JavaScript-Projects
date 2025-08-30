let startBtn = document.querySelector('.startBtn');
let infoBox = document.querySelector('.infoBox');
let exitBtn = document.querySelector('.exit-btn');
let continueBtn = document.querySelector('.continue-btn');
let quizBox = document.querySelector('.quiz-box');
let questionText = document.querySelector('.question-content');
let allOptions = document.querySelectorAll('.options');
let nextBtn = document.querySelector('.nextBtn');
let timeLine = document.querySelector('.timeLine');
let timeLineTitle = document.querySelector('.timeLine-title');
let currentQuestionIndicator = document.querySelector('.currentQuestionIndicator');
let totalNoOfQuestions = document.querySelector('.totalNoOfQuestions');
let progressBar = document.querySelector('.progress-bar');
let optionsListContainer = document.querySelector('.options-list-container');
let resultBox = document.querySelector('.result-box');
let replayBtn = document.querySelector('.replayBtn');
let quitBtn = document.querySelector('.quitBtn');
let score = document.querySelector('.score');
let totalScore = document.querySelector('.totalScore');

let timeLineInterval = null;
let progressBarInterval = null;
let currentQuestionIndex = 0;
let userScore = 0;
let timer = 15;

//if start button is clicked
startBtn.addEventListener('click', () => {
    // we have to inject a class name to info box
    infoBox.classList.add('activeInfoBox');
}); 

//if exit button is clicked
exitBtn.addEventListener('click', () => {
    //we have to remove a class name from info box
    infoBox.classList.remove('activeInfoBox');
});

//if continue button is clicked
continueBtn.addEventListener('click', () => {
    //remove class from infoBox and add class to quizbox
    infoBox.classList.remove('activeInfoBox');
    quizBox.classList.add('activeQuizBox');
    //show question 1
    currentQuestionIndex = 0;
    showquestion(currentQuestionIndex);
});

//if next button is clicked
nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions?.length - 1){
        currentQuestionIndex++;
        //show question from 2 to 10
        showquestion(currentQuestionIndex);
    }
    else{
        quizBox.classList.remove('activeQuizBox');
        resultBox.classList.add('activeResultBox');
        dispalyResult();
    }
});

//if replay button is clicked
replayBtn.addEventListener('click', () => {
    resultBox.classList.remove('activeResultBox');
    quizBox.classList.add('activeQuizBox');
    //show question 1
    currentQuestionIndex = 0;
    showquestion(currentQuestionIndex);
});

//if quit button is clicked
quitBtn.addEventListener('click', () =>{
    resultBox.classList.remove('activeResultBox');
})

//function to render questions
const showquestion = (index) => {
    optionsListContainer.classList.remove('disabled');
    nextBtn.classList.remove('activeNextBtn');
    handleProgressBar(timer);
    handleTiming(timer);
    questionText.innerText = 
    '' + questions?.[index].numb + '. ' + questions?.[index].question;

    for (let i = 0; i < allOptions?.length; i++){
        allOptions[i].classList.remove('correct');
        allOptions[i].classList.remove('wrong');
        allOptions[i].innerText = questions?.[index].options?.[i];
        allOptions[i]?.addEventListener('click', optionClickHandler);
    }
    currentQuestionIndicator.innerText = questions?.[index].numb;
    totalNoOfQuestions.innerText = questions?.length;
};

//function to handle timer
const handleTiming = (time) => {
    clearInterval(timeLineInterval);
    timeLineTitle.innerText = "Time Left";
    timeLine.innerText = time;
    let timeValue = time + 1;
    timeLineInterval = setInterval(() => {
        timeValue--;
        if(timeValue < 10){
            timeLine.innerText = '0' + timeValue;
        }
        else
        {
            timeLine.innerText = timeValue;
        }
        if(timeValue === 0){
            timeLineTitle.innerText = "Time Off";
            clearInterval(timeLineInterval);
            nextBtn.classList.add('activeNextBtn');
            for (let i = 0; i < allOptions?.length; i++){
                const correctAnswer = questions?.[currentQuestionIndex]?.answer;
                if(allOptions[i].innerText === correctAnswer){
                    allOptions[i].classList.add('correct');
                    allOptions[i].insertAdjacentHTML('beforeend', tickIcon);  
                }
            }
        }
    }, 1000);
};

//function to handle progress bar
const handleProgressBar = (time) => {
    // progressBar.style.width = '0%';
    // clearInterval(progressBarInterval);
    let currentPercentage = 0;
     progressBarInterval = setInterval(() => {
        currentPercentage += (1 / time);
        progressBar.style.width = currentPercentage + '%';
        if(currentPercentage >= 100){
            clearInterval(progressBarInterval);   
        }
    }, 10);
};

//option Icons
const tickIcon = `<div class="icon"><i class="fa-regular fa-circle-check"></i></div>`;
const crossIcon = `<div><i class="fa-regular fa-circle-xmark"></i></div>`;

//function to handle when user selects an options
const optionClickHandler = (e) => {
    optionsListContainer.classList.add('disabled');
    clearInterval(timeLineInterval);
    clearInterval(progressBarInterval);
    const userAnswer = e.target.innerText;
    const correctAnswer = questions?.[currentQuestionIndex]?.answer;
    if(userAnswer === correctAnswer){
        //correct answer
        userScore++;
        e.target.classList.add('correct');
        e.target.insertAdjacentHTML('beforeend', tickIcon);
    }
    else{
        //wrong answer
        e.target.classList.add('wrong');
        e.target.insertAdjacentHTML('beforeend', crossIcon);
        for (let i = 0; i < allOptions?.length; i++){
            if(allOptions[i].innerText === correctAnswer){
                allOptions[i].classList.add('correct');
                allOptions[i].insertAdjacentHTML('beforeend', tickIcon);  
            }
        }
    }
    nextBtn.classList.add('activeNextBtn');
};

//function to display result
const dispalyResult = () => {
    score.innerText = userScore;
    totalScore.innerText = questions?.length;
};