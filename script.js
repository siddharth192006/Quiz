// Quiz Questions Database
const quizDB = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            answer: "Leonardo da Vinci"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
            answer: "Oxygen"
        }
    ],
    science: [
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            answer: "H2O"
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: "Carbon Dioxide"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Quartz"],
            answer: "Diamond"
        },
        {
            question: "Which scientist developed the theory of relativity?",
            options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
            answer: "Albert Einstein"
        },
        {
            question: "What is the unit of electrical resistance?",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            answer: "Ohm"
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            answer: "1945"
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],
            answer: "George Washington"
        },
        {
            question: "Which ancient civilization built the pyramids?",
            options: ["Greeks", "Romans", "Egyptians", "Mayans"],
            answer: "Egyptians"
        },
        {
            question: "When was the Declaration of Independence signed?",
            options: ["1774", "1776", "1781", "1787"],
            answer: "1776"
        },
        {
            question: "Who discovered America in 1492?",
            options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "James Cook"],
            answer: "Christopher Columbus"
        }
    ],
    sports: [
        {
            question: "Which country won the 2022 FIFA World Cup?",
            options: ["France", "Brazil", "Argentina", "Germany"],
            answer: "Argentina"
        },
        {
            question: "How many players are on a baseball team?",
            options: ["7", "9", "11", "13"],
            answer: "9"
        },
        {
            question: "Which sport uses a shuttlecock?",
            options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
            answer: "Badminton"
        },
        {
            question: "Who holds the record for most Olympic gold medals?",
            options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Larisa Latynina"],
            answer: "Michael Phelps"
        },
        {
            question: "In which year were the first modern Olympics held?",
            options: ["1886", "1896", "1906", "1916"],
            answer: "1896"
        }
    ]
};

// DOM Elements
const categoryScreen = document.getElementById('category-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const reviewScreen = document.getElementById('review-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const currentQElement = document.getElementById('current-q');
const totalQElement = document.getElementById('total-q');
const progressFill = document.querySelector('.progress-fill');
const timerElement = document.getElementById('time');
const scorePercentElement = document.getElementById('score-percent');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');
const timeTakenElement = document.getElementById('time-taken');
const replayBtn = document.getElementById('replay-btn');
const reviewBtn = document.getElementById('review-btn');
const homeBtn = document.getElementById('home-btn');
const reviewList = document.getElementById('review-list');
const categoryCards = document.querySelectorAll('.category-card');

// Quiz Variables
let currentCategory = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let quizStartTime;
let selectedOption = null;
let userAnswers = [];

// Initialize Quiz
function initQuiz() {
    categoryScreen.style.display = 'block';
    questionScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    totalQElement.textContent = '10';
}

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    questions = [...quizDB[category]];
    totalQElement.textContent = questions.length;
    categoryScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    loadQuestion();
    quizStartTime = new Date();
}

// Load Question
function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQElement.textContent = currentQuestionIndex + 1;
    progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Reset State
function resetState() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    selectedOption = null;
    nextBtn.disabled = true;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Start Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// Handle Timeout
function handleTimeout() {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct');
        }
    });
    
    userAnswers.push({
        question: currentQuestion.question,
        userAnswer: null,
        correctAnswer: currentQuestion.answer,
        isCorrect: false,
        timeTaken: 30 - timeLeft
    });
    
    nextBtn.disabled = false;
}

// Select Option
function selectOption(selectedButton, selectedAnswer) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct');
        }
    });
    
    if (selectedAnswer === currentQuestion.answer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }
    
    selectedOption = selectedAnswer;
    nextBtn.disabled = false;
    
    userAnswers.push({
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: selectedAnswer === currentQuestion.answer,
        timeTaken: 30 - timeLeft
    });
}

// Show Results
function showResults() {
    const totalTime = Math.floor((new Date() - quizStartTime) / 1000);
    const percentage = Math.round((score / questions.length) * 100);
    
    questionScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    scorePercentElement.textContent = percentage;
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
    correctCountElement.textContent = score;
    wrongCountElement.textContent = questions.length - score;
    timeTakenElement.textContent = totalTime;
}

// Show Review
function showReview() {
    resultScreen.style.display = 'none';
    reviewScreen.style.display = 'block';
    reviewList.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        
        const questionElement = document.createElement('div');
        questionElement.classList.add('review-question');
        questionElement.textContent = `${index + 1}. ${answer.question}`;
        
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer-feedback');
        answerElement.classList.add(answer.isCorrect ? 'answer-correct' : 'answer-wrong');
        
        const icon = document.createElement('i');
        icon.classList.add('fas', answer.isCorrect ? 'fa-check' : 'fa-times');
        
        const answerText = document.createElement('span');
        answerText.textContent = answer.isCorrect 
            ? `Your answer: ${answer.userAnswer} (Correct)`
            : `Your answer: ${answer.userAnswer || 'No answer'} | Correct answer: ${answer.correctAnswer}`;
        
        answerElement.appendChild(icon);
        answerElement.appendChild(answerText);
        
        reviewItem.appendChild(questionElement);
        reviewItem.appendChild(answerElement);
        reviewList.appendChild(reviewItem);
    });
}

// Event Listeners
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        startQuiz(card.dataset.category);
    });
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

replayBtn.addEventListener('click', () => {
    startQuiz(currentCategory);
});

reviewBtn.addEventListener('click', showReview);

homeBtn.addEventListener('click', initQuiz);

// Initialize the quiz
initQuiz();