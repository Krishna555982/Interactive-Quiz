        const startBtn = document.querySelector('.start-btn');
        const popupInfo = document.querySelector('.popup-info');
        const exitBtn = document.querySelector('.exit-btn');
        const continueBtn = document.querySelector('.continue-btn');
        const main = document.querySelector('.main');
        const quizSection = document.querySelector('.quiz-section');
        const quizBox = document.querySelector('.quiz-box');
        const resultBox = document.querySelector('.result-box');
        const nextBtn = document.querySelector('.next-btn');
        const tryAgainBtn = document.querySelector('.tryAgain-btn');
        const goHomeBtn = document.querySelector('.goHome-btn');

        const optionList = document.querySelector('.option-list');
        const questionText = document.querySelector('.question-text');
        const questionTotal = document.querySelector('.question-total');
        const headerScore = document.querySelector('.header-score');

        let questionCount = 0;
        let score = 0;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        startBtn.onclick = () => {
            popupInfo.classList.add('active');
            main.classList.add('active');
        };

        exitBtn.onclick = () => {
            popupInfo.classList.remove('active');
            main.classList.remove('active');
        };

        continueBtn.onclick = () => {
            shuffleArray(questions);
            quizSection.classList.add('active');
            popupInfo.classList.remove('active');
            main.classList.remove('active');
            quizBox.classList.add('active');
            questionCount = 0;
            score = 0;
            showQuestion(questionCount);
            updateQuestionCounter();
            headerScore.textContent = `score: ${score} / ${questions.length}`;
        };

        function showQuestion(index) {
            let currentQ = questions[index];
            let shuffledOptions = [...currentQ.options];
            shuffleArray(shuffledOptions);

            questionText.innerHTML = `<span>${currentQ.question}</span>`;
            optionList.innerHTML = shuffledOptions.map(opt =>
                `<div class="option"><span>${opt}</span></div>`
            ).join('');

            const options = optionList.querySelectorAll('.option');
            options.forEach(option => {
                option.onclick = () => optionSelected(option, currentQ.answer);
            });
        }

        function optionSelected(answerEl, correctAnswer) {
            let userAnswer = answerEl.textContent;
            let allOptions = optionList.children;

            if (userAnswer === correctAnswer) {
                answerEl.classList.add('correct');
                score++;
                headerScore.textContent = `score: ${score} / ${questions.length}`;
            } else {
                answerEl.classList.add('incorrect');
                for (let option of allOptions) {
                    if (option.textContent === correctAnswer) {
                        option.classList.add('correct');
                    }
                }
            }

            for (let option of allOptions) {
                option.classList.add('disabled');
            }

            nextBtn.classList.add('active');
        }

        nextBtn.onclick = () => {
            if (questionCount < questions.length - 1) {
                questionCount++;
                showQuestion(questionCount);
                updateQuestionCounter();
                nextBtn.classList.remove('active');
            } else {
                showResultBox();
            }
        };

        tryAgainBtn.onclick = () => {
            resultBox.classList.remove('active');
            quizBox.classList.add('active');
            questionCount = 0;
            score = 0;
            shuffleArray(questions);
            showQuestion(questionCount);
            updateQuestionCounter();
            headerScore.textContent = `score: ${score} / ${questions.length}`;
            nextBtn.classList.remove('active');
        };

        goHomeBtn.onclick = () => {
            window.location.reload();
        };

        function updateQuestionCounter() {
            questionTotal.textContent = `${questionCount + 1} of ${questions.length} Questions`;
        }

        function showResultBox() {
            quizBox.classList.remove('active');
            resultBox.classList.add('active');

            const scoreText = document.querySelector('.score-text');
            scoreText.textContent = `Your Score ${score} out of ${questions.length}`;

            const circularProgress = document.querySelector('.circular-progress');
            const progressValue = document.querySelector('.progress-value');
            let progressStartValue = 0;
            let progressEndValue = Math.round((score / questions.length) * 100);
            let speed = 20;

            let progress = setInterval(() => {
                progressValue.textContent = `${progressStartValue}%`;
                circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

                if (progressStartValue >= progressEndValue) {
                    clearInterval(progress);
                }
                progressStartValue++;
            }, speed);
        }