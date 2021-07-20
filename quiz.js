const choices = document.querySelectorAll(".choice");
const choicesElement = document.querySelectorAll(".choice-text");
const submit = document.getElementById("submit");
const next = document.getElementById("next");
const summary = document.querySelector(".summary");
const score = document.querySelector(".score");
const totalQuestion = document.querySelector(".total-qs");

const retry = document.getElementById("retry");
const chill = document.getElementById("chill");
const outerBox = document.querySelector(".outer-box");

const questionElement = document.querySelector(".question-text");
let selectedChoice = 0;
let noAskedQuestion = 0;
let correctChoice;
let userScore = 0;
let answerSuccess = 0;
let questionOrder = [];
let questionOrderIndex = 0;

//know lenght create array to be shuffle
//generate shuffle array
//run question according to the order
//when run out dont go to next

function shuffle(array) { //shuffle array stackover flow
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}


document.addEventListener('click', (event) => {
    if (!(event.target).classList.contains('keep')) {
        console.log(selectedChoice);
        selectedChoice = 0;
    }
});

for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', storedSelected);
}

submit.addEventListener('click', postCheckAnswer);
next.addEventListener('click', generateNewQuestion);
retry.addEventListener('click', () => {
    summary.classList.add("hide");
    outerBox.classList.remove("blur");
    init();
});
chill.addEventListener('click', () => {
    summary.classList.add("hide")
    outerBox.classList.remove("blur");

});

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
    if (questionOrderIndex < question.length) {
        generateQuestion(questionOrder[questionOrderIndex]);
    } else {
        // if run out of question display score
        score.innerHTML = userScore;
        totalQuestion.innerHTML = question.length;
        summary.classList.remove("hide");
        outerBox.classList.add("blur");

    }
}

function resetStates() {
    next.classList.add("hide");
    submit.classList.remove("hide");
    choices[selectedChoice - 1].classList.remove("wrong");
    choices[selectedChoice - 1].classList.remove("correct");
    choices[correctChoice].classList.remove("correct");
    selectedChoice = 0;
    answerSuccess = 0;

}

function storedSelected(event) {
    selectedChoice = parseInt(event.target.id);
    if (selectedChoice !== 1 || selectedChoice !== 2 || selectedChoice !== 3 || selectedChoice !== 4) {
        console.log(event.target)
        selectedChoice = (event.target).closest("button").id;
    }
    console.log(selectedChoice);
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

function init() {
    selectedChoice = 0;
    noAskedQuestion = 0;
    userScore = 0;
    answerSuccess = 0;
    questionOrder = [];
    questionOrderIndex = 0
    for (let i = 0; i < question.length; i++) {
        questionOrder.push(i);
    }
    shuffle(questionOrder);
    console.log(shuffle(questionOrder));
    generateQuestion(questionOrder[questionOrderIndex]);
}
init();

function generateQuestion(questionNo) {
    console.log(questionNo)
    questionElement.innerHTML = questionOrderIndex+1 +". "+ question[questionNo].question;
    for (let i = 0; i < 4; i++) {
        choicesElement[i].innerHTML = question[questionNo].answer[i].text;
        if (question[questionNo].answer[i].correct) {
            correctChoice = i;
        }
    }
    questionOrderIndex++;
}

// console.log(question[0].answer[0].correct)

function checkAnswer() {
    console.log(selectedChoice)

    if (selectedChoice === 0) {
        console.log('not selected')
        return;
    }

    if (question[0].answer[selectedChoice - 1].correct) {
        choices[selectedChoice - 1].classList.add("correct");
        userScore++;
        answerSuccess = 1;
    } else {
        console.log('wrong');
        choices[selectedChoice - 1].classList.add("wrong");
        choices[correctChoice].classList.add("correct");
        answerSuccess = 1;

    }
}