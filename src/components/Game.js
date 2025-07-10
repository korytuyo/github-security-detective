import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of GitHub Advanced Security?",
      options: [
        "Version control management",
        "Find and fix security vulnerabilities",
        "Project management",
        "Code deployment"
      ],
      correct: 1,
      explanation: "GitHub Advanced Security helps find and fix security vulnerabilities in your code."
    },
    {
      id: 2,
      question: "Which tool performs static analysis in GitHub Advanced Security?",
      options: [
        "GitHub Actions",
        "CodeQL",
        "Git hooks",
        "Pull requests"
      ],
      correct: 1,
      explanation: "CodeQL is the semantic code analysis engine that powers security scanning."
    },
    {
      id: 3,
      question: "What does Secret Scanning detect?",
      options: [
        "Code quality issues",
        "Exposed credentials and tokens",
        "Performance problems",
        "Syntax errors"
      ],
      correct: 1,
      explanation: "Secret Scanning detects tokens, private keys, and other secrets accidentally committed to your repository."
    },
    {
      id: 4,
      question: "What file format is used for custom CodeQL queries?",
      options: [
        ".yaml",
        ".json",
        ".ql",
        ".xml"
      ],
      correct: 2,
      explanation: "CodeQL queries are written in .ql files using the CodeQL query language."
    },
    {
      id: 5,
      question: "Which severity levels are available for security alerts?",
      options: [
        "Low, Medium, High",
        "Info, Warning, Error, Critical",
        "Low, Medium, High, Critical",
        "Minor, Major, Critical"
      ],
      correct: 2,
      explanation: "GitHub security alerts use Low, Medium, High, and Critical severity levels."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer('');
      setTimeLeft(30);
    } else {
      alert(`Game Over! Your score: ${score}/${questions.length * 10}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer('');
    setTimeLeft(30);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>GitHub Security Detective</h2>
        <div className="stats">
          <span className="score">Score: {score}</span>
          <span className="timer">Time: {timeLeft}s</span>
          <span className="progress">Question {currentQuestion + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="question-section">
        <h3>{questions[currentQuestion].question}</h3>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                showResult && index === questions[currentQuestion].correct ? 'correct' : ''
              } ${
                showResult && selectedAnswer === index && index !== questions[currentQuestion].correct ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="explanation">
            <p>{questions[currentQuestion].explanation}</p>
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;