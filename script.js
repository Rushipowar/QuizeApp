const questions = [
    {
        id: 1,
        question: "What is 2 + 2 ?",
        answer: [
            { text: "4", correct: true },
            { text: "3", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        id: 2,
        question: "What is 1 + 1 ?",
        answer: [
            { text: "4", correct: false },
            { text: "3", correct: false },
            { text: "2", correct: true },
            { text: "6", correct: false }
        ]
    },
    {
        id: 3,
        question: "Who is the captain of MI?",
        answer: [
            { text: "Sachin", correct: false },
            { text: "Dhoni", correct: false },
            { text: "Rohit", correct: true },
            { text: "Hardik", correct: false }
        ]
    },
    // Add more questions as needed
    {
        id: 4,
        question: "What is the capital of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        id: 5,
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        id: 12,
        question: "Which is the largest ocean on Earth?",
        answer: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        id: 7,
        question: "What is the chemical symbol for water?",
        answer: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "H2", correct: false }
        ]
    },
    {
        id: 8,
        question: "Which country won the 2018 FIFA World Cup?",
        answer: [
            { text: "Brazil", correct: false },
            { text: "France", correct: true },
            { text: "Germany", correct: false },
            { text: "Argentina", correct: false }
        ]
    },
    {
        id: 11,
        question: "What is the smallest country in the world?",
        answer: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    },
    {
        id: 10,
        question: "Which element has the atomic number 1?",
        answer: [
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Helium", correct: false },
            { text: "Carbon", correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function showQuestion(questionIndex) {
    const questionElement = document.getElementById("question-text");
    const answerList = document.getElementById("answer-list");
    const questionCount = document.getElementById("question-count");

    const question = questions[questionIndex];
    
    questionElement.textContent = question.question;
    questionCount.textContent = `Question ${questionIndex + 1}/${questions.length}`;
    
    answerList.innerHTML = ""; // Clear previous answers
    answered = false; // Reset answered flag for each question
    
    question.answer.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" data-correct="${answer.correct}">${answer.text}</a>`;
        li.addEventListener("click", (e) => {
            e.preventDefault();
            if (answered) return; // Prevent clicking multiple times

            answered = true; // Mark question as answered

            if (answer.correct) {
                li.style.backgroundColor = "green";
                score++;
                document.getElementById("score").textContent = `Score: ${score}`;
            } else {
                li.style.backgroundColor = "red";
            }

            // Disable other answer options after one is clicked
            Array.from(answerList.children).forEach(item => {
                item.querySelector('a').style.pointerEvents = 'none';
                if (item.querySelector('a').dataset.correct === "true" && !answer.correct) {
                    item.style.backgroundColor = "green"; // Highlight correct answer if wrong answer selected
                }
            });
        });
        answerList.appendChild(li);
    });

    // Enable or disable the Previous button based on the current question index
    document.getElementById("prev-button").disabled = questionIndex === 0;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showResult() {
    const questionElement = document.getElementById("question-text");
    const answerList = document.getElementById("answer-list");
    const questionCount = document.getElementById("question-count");

    questionElement.textContent = `Quiz completed! Your score is ${score}/${questions.length}`;
    answerList.innerHTML = ""; // Clear answers
    questionCount.textContent = ""; // Clear question count

    // Hide Next and Previous buttons
    document.getElementById("next-button").style.display = "none";
    document.getElementById("prev-button").style.display = "none";

    // Show Restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", restartQuiz);
    document.querySelector(".next-button").appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("prev-button").style.display = "inline-block";
    document.querySelector(".next-button button").remove(); // Remove the Restart button
    showQuestion(currentQuestionIndex);
}

document.getElementById("next-button").addEventListener("click", nextQuestion);
document.getElementById("prev-button").addEventListener("click", prevQuestion);

// Show the first question
showQuestion(currentQuestionIndex);


