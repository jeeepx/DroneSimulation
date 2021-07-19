const choices = document.querySelectorAll(".choice")
const choicesElement = document.querySelectorAll(".choice-text")

// const choiceOne = document.getElementById("1");
// const choiceTwo = document.getElementById("2");
// const choiceThree = document.getElementById("3");
// const choiceFour = document.getElementById("4");
const submit = document.getElementById("submit");
const next = document.getElementById("next");

const questionElement = document.querySelector(".question-text");


let selectedChoice;
let noAskedQuestion = 0;
let correctChoice;
let userScore = 0;

for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', storedSelected);
}

submit.addEventListener('click', postCheckAnswer);
next.addEventListener('click', generateNewQuestion);

function postCheckAnswer() {
    checkAnswer();
    changeSubmitToNext();
}

function changeSubmitToNext() {
    submit.classList.add("hide");
    next.classList.remove("hide");

}

function generateNewQuestion() {
    //clear bg color bring back submit
    resetStates();
    //new question 
    generateQuestion(1);
    // if run out of question display score
}

function resetStates() {
    next.classList.add("hide");
    submit.classList.remove("hide");
    choices[selectedChoice - 1].classList.remove("wrong");
    choices[selectedChoice - 1].classList.remove("correct");
    choices[correctChoice].classList.remove("correct");

}

function storedSelected(event) {
    selectedChoice = parseInt(event.target.id);
    if (selectedChoice !== 1 || selectedChoice !== 2 || selectedChoice !== 3 || selectedChoice !== 4) {
        console.log(event.target)
        selectedChoice = (event.target).closest("button").id;
    }
    console.log(selectedChoice);
}

function checkAnswer(event) {

}

const question = [{
        question: 'What are the purpose of drone propellers?',
        answer: [{
                text: 'Netatorque',
                correct: true
            },
            {
                text: 'Lalalala',
                correct: false
            },
            {
                text: 'Babababa',
                correct: false
            },
            {
                text: 'Nananana',
                correct: false
            }
        ]
    },
    {
        question: 'Second question',
        answer: [{
                text: '2.1',
                correct: true
            },
            {
                text: '2.2',
                correct: false
            },
            {
                text: '2.3',
                correct: false
            },
            {
                text: '2.4',
                correct: false
            },
        ]
    }
]

generateQuestion(0);

function generateQuestion(questionNo) {
    questionElement.innerHTML = question[questionNo].question;
    for (let i = 0; i < 4; i++) {
        choicesElement[i].innerHTML = question[questionNo].answer[i].text;
        if (question[questionNo].answer[i].correct) {
            correctChoice = i;
        }
    }
    noAskedQuestion++;
}

console.log(question[0].answer[0].correct)

function checkAnswer() {
    if (question[0].answer[selectedChoice - 1].correct) {
        choices[selectedChoice - 1].classList.add("correct");
        userScore++;
    } else {
        console.log('wrong');
        choices[selectedChoice - 1].classList.add("wrong");
        choices[correctChoice].classList.add("correct");
    }
}