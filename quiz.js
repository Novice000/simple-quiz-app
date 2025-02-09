import questions from "./questions.js";

// Listens for the DOM to finish loading before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.querySelector(".question-container");
    const question = document.querySelector(".question");
    const choices = document.querySelector(".choices");
    const scoreMessage = document.querySelector(".score-message");
    const startButton = document.querySelector(".start-button");
    const nextButton = document.querySelector(".next-button");
    const questionCount = document.querySelector(".question-count");
    const inputContainer = document.querySelector(".input-container");
    const choicesContainer = document.querySelector(".choices");
    
    const initialContent = document.querySelector(".main-container").innerHTML;
    
    // initializers for variables and array to contain questions asked
    let number_of_questions = 0;
    let answeredQuestions = [];
    let score = 0;
    
    // Creates a button for each choice in a question
    function createChoiceButton(choice) {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice-button");
        // Listens for a choice button to be clicked and marks it as active and deactivates the previously active button
        button.addEventListener("click", (e) => {
            const activeButton = document.querySelector(".active");
            if (activeButton) {
                activeButton.classList.remove("active");
            }
            e.target.classList.add("active");
        });
        return button;
    }

    // Shows the next question and updates the question count
    function showQuestion() {
        let questionIndex;
        // Picks a random question that hasn't been asked yet
        do {
            questionIndex = Math.floor(Math.random() * questions.length);
        } while (answeredQuestions.includes(questionIndex));
        inputContainer.innerHTML = "";
        inputContainer.style.display = "none";
        questionCount.textContent = `Question ${answeredQuestions.length + 1} of ${number_of_questions}`;
        answeredQuestions.push(questionIndex);
        console.log(questionIndex)
        const currentQuestion = questions[questionIndex];
        console.log(currentQuestion)
        question.textContent = currentQuestion.question;
        choices.innerHTML = "";
        currentQuestion.choices.forEach((choice) => {
            const button = createChoiceButton(choice);
            choices.appendChild(button);
        });
    }

    // Starts the quiz by hiding the input and start button, and showing the first question
    function startQuiz() {
        choicesContainer.style.display = "flex";
        // checks if the question input is below the length of the questions array and returns the length otherwise
        number_of_questions = document.querySelector("#number-of-questions").value <= questions.length - 1 ? document.querySelector("#number-of-questions").value: questions.length - 1 ;
        questionContainer.style.display = "block";
        startButton.style.display = "none";
        nextButton.style.display = "block";
        showQuestion();
    }

    // Checks the user's answer and updates the score
    function checkAnswer() {
        let activeButton = document.querySelector(".active");
        const answer = activeButton ? activeButton.textContent : "";
        const currentQuestion = answeredQuestions[answeredQuestions.length - 1];
        if (answer === questions[currentQuestion].correctAnswer) {
            score++;
        } else {
            console.log("incorrect")
        }
        console.log(score)
    }
    
    // Shows the next question or the final score
    function nextQuestion() {
        if (answeredQuestions.length < number_of_questions) {
            checkAnswer();
            showQuestion();
        } else {
            checkAnswer();
            questionContainer.style.display = "none";
            nextButton.style.display = "none";
            scoreMessage.innerHTML += `Your score: ${score} out of ${number_of_questions}`;
            if (score >= number_of_questions / 2) {
                scoreMessage.style.color = "green";
            } else {
                scoreMessage.style.color = "red";
            }
            const restartButton = document.querySelector(".restart-button");
            restartButton.style.display = "block";
        }
    }
    
    console.log("DOM loaded")
    // Listens for the start button to be clicked and starts the quiz
    startButton.addEventListener("click", startQuiz);
    // Listens for the next button to be clicked and shows the next question or the final score
    nextButton.addEventListener("click", nextQuestion)
});

