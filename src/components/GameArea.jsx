import React, { useState, useEffect } from 'react';
import './GameArea.css';
import LaureateImage from './LaureateImage';

const GameArea = ({ prizes }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
    const [inputAnswerId, setInputAnswerId] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // Function to generate a new question
    const generateQuestion = () => {
        if (!prizes.length) return;

        if (questionCount >= 10) {
            setGameOver(true);
            return;
        }

        // 1. Pick a random prize
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

        // 2. Pick a correct answer (laureate)
        const correctLaureate = randomPrize.laureates[0];

        // 3. Pick 3 distractors
        const distractors = [];
        while (distractors.length < 3) {
            const p = prizes[Math.floor(Math.random() * prizes.length)];
            // Try to avoid same prize
            if (p.year === randomPrize.year && p.category === randomPrize.category) continue;
            const l = p.laureates?.[0];
            if (l && l.id !== correctLaureate.id && !distractors.find(d => d.id === l.id)) {
                distractors.push(l);
            }
        }

        // 4. Shuffle options
        const allOptions = [correctLaureate, ...distractors].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            category: randomPrize.category,
            year: randomPrize.year,
            correctAnswer: correctLaureate
        });
        setOptions(allOptions);
        setFeedback(null);
        setInputAnswerId(null);
    };

    // Init game when prizes change
    useEffect(() => {
        if (prizes.length > 0) {
            setScore(0);
            setQuestionCount(0);
            setGameOver(false);
            generateQuestion();
        } else {
            setCurrentQuestion(null);
        }
    }, [prizes]);

    const handleAnswer = (laureate) => {
        if (feedback) return; // Prevent double clicking

        setInputAnswerId(laureate.id);
        const isCorrect = laureate.id === currentQuestion.correctAnswer.id;

        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }

        // Speak the name
        speakName(currentQuestion.correctAnswer.firstname + ' ' + currentQuestion.correctAnswer.surname);

        // Next question after delay
        setTimeout(() => {
            setQuestionCount(c => c + 1);
            generateQuestion();
        }, 3000); // Longer delay to hear name
    };

    const speakName = (name) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(name);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleRestart = () => {
        setScore(0);
        setQuestionCount(0);
        setGameOver(false);
        generateQuestion();
    };

    if (!prizes.length) {
        return <div className="game-area message">No prizes found for these settings. Try adjusting the filters.</div>;
    }

    if (gameOver) {
        return (
            <div className="game-area game-over">
                <h2>Game Over!</h2>
                <p className="final-score">You scored {score} out of 10</p>
                <button className="restart-btn" onClick={handleRestart}>Play Again</button>
            </div>
        );
    }

    if (!currentQuestion) return <div className="game-area">Loading...</div>;

    return (
        <div className="game-area">
            <div className="stats">
                <span>Score: {score} / 10</span>
                <span className="round-counter">Round: {questionCount + 1}</span>
            </div>

            <div className="question-card">
                <h3>{currentQuestion.year} {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)} Prize</h3>

                {feedback && (
                    <div className="laureate-reveal">
                        <LaureateImage
                            firstName={currentQuestion.correctAnswer.firstname}
                            surname={currentQuestion.correctAnswer.surname}
                        />
                    </div>
                )}

                <div className="options-grid">
                    {options.map(laureate => (
                        <button
                            key={laureate.id}
                            className={`option-btn ${feedback === 'correct' && laureate.id === currentQuestion.correctAnswer.id ? 'correct' : ''} ${feedback === 'incorrect' && laureate.id === inputAnswerId ? 'incorrect' : ''}`}
                            onClick={() => handleAnswer(laureate)}
                            disabled={!!feedback}
                        >
                            {laureate.firstname} {laureate.surname}
                        </button>
                    ))}
                </div>

                {feedback && (
                    <div className={`feedback ${feedback}`}>
                        {feedback === 'correct' ? 'Correct!' : `Wrong! It was ${currentQuestion.correctAnswer.firstname} ${currentQuestion.correctAnswer.surname}`}
                        <button className="speak-btn" onClick={() => speakName(currentQuestion.correctAnswer.firstname + ' ' + currentQuestion.correctAnswer.surname)}>
                            🔊
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameArea;
