// export function totalScore() {
//     // return 'highScore'
// }
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "In which part of your body would you find the cruciate ligament?",
        choice1: "neck",
        choice2: "eye",
        choice3: "knee",
        choice4: "teeth",
        answer: 3,
    },
    {
        question: "What is the largest continent in size?",
        choice1: 'Asia',
        choice2: "Africa",
        choice3: "Europe",
        choice4: "North America",
        answer: 1,
    },

    {
        question: "Which famous inventor invented the telephone?",
        choice1: "Thomas Edison",
        choice2: 'Benjamen Franklin ',
        choice3: "Alexandra Graham Bell",
        choice4: "Nikola Tesla",
        answer: 3,
    },
    {
        question: "What element is denoted by the chemical symbol Sn in the periodic table?",
        choice1: "zinc",
        choice2: "lead",
        choice3: "iron",
        choice4: "tin",
        answer: 4,
    },
    {
        question: "In which Italian city can you find the Colosseum?",
        choice1: "Venice",
        choice2: "Rome",
        choice3: "Naples",
        choice4: "Milan",
        answer: 2,
    },
    {
        question: "In the TV show New Girl, which actress plays Jessica Day?",
        choice1: "Zooey Deschanel",
        choice2: "Kaley Cuoco",
        choice3: "Jennifer Aniston",
        choice4: "Alyson Hannigan",
        answer: 1,
    },
    {
        question: "Who invented Facebook?",
        choice1: 'Zukerbergi Mark',
        choice2: "Elon Musk",
        choice3: "Dell",
        choice4: "Mark Zukerberg",
        answer: 4,
    },

    {
        question: "Whats the largest state in Nigeria",
        choice1: "Lagos",
        choice2: 'Port-harcourt ',
        choice3: "Kano",
        choice4: "Oyo",
        answer: 3,
    }
];


// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = -1;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

    choices.forEach((choice) => {
        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
            }


            selectedChoice.parentElement.classList.add(classToApply)
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)

                getNewQuestion();
            }, 1000)

        })

    })



}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    let totalScore = score;
};
startGame();