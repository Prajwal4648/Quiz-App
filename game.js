const questionElement = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the capital of France?",
        choice1: "Berlin",
        choice2: "Madrid",
        choice3: "Paris",
        choice4: "Lisbon",
        answer: 3,
    },
    {
        question: "Which planet is known as the Red Planet?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Saturn",
        answer: 2,
    },
    {
        question: "What is the largest ocean on Earth?",
        choice1: "Atlantic Ocean",
        choice2: "Indian Ocean",
        choice3: "Arctic Ocean",
        choice4: "Pacific Ocean",
        answer: 4,
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choice1: "Harper Lee",
        choice2: "Mark Twain",
        choice3: "Ernest Hemingway",
        choice4: "F. Scott Fitzgerald",
        answer: 1,
    },
    {
        question: "What is the smallest prime number?",
        choice1: "0",
        choice2: "1",
        choice3: "2",
        choice4: "3",
        answer: 3,
    }
];

const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = () => {
    score++;
    scoreText.innerText = `Score: ${score}`;
};

startGame();