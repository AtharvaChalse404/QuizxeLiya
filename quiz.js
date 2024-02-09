const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    // Variable to store the HTML output
    let output = '';

    // For each question, create an HTML block
    questions.forEach((currentQuestion, questionNumber) => {
        // Store the list of answer choices
        const answers = [];

        // For each available answer choice, create an HTML radio button
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // Add this question and its answers to the output
        output += `<div class="question">${currentQuestion.question}</div>
                   <div class="answers">${answers.join('')}</div>`;
    });

    // Combine output into HTML and display it
    quizContainer.innerHTML = output;
}

function showResults() {
    // Check if all questions are answered
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let allAnswered = true;

    answerContainers.forEach(container => {
        const selectedOption = container.querySelector('input[type="radio"]:checked');
        if (!selectedOption) {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Please answer all questions before submitting.");
        return;
    }

    // Collect answers from the quiz and calculate results
    const numQuestions = questions.length;
    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selectedOption = answerContainer.querySelector('input[type="radio"]:checked').value;

        if (selectedOption === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainer.style.color = 'lightgreen';
        } else {
            answerContainer.style.color = 'red';
        }
    });

    // Show the number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${numQuestions}`;
}

// Display quiz immediately when the page loads
buildQuiz();

// Event listener for the submit button
submitButton.addEventListener('click', showResults);
