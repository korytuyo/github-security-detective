import React, { useState, useEffect, useRef } from 'react';
import './Game.css';
import { jeopardyQuestions } from '../data/questions';
import { SoundManager } from '../utils/SoundManager';

const Game = ({ soundEnabled, setSoundEnabled }) => {
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);
  const [dailyDoubles, setDailyDoubles] = useState(new Set());
  const [showDailyDouble, setShowDailyDouble] = useState(false);
  const [showWagerModal, setShowWagerModal] = useState(false);
  const [wagerAmount, setWagerAmount] = useState(0);
  const [isDailyDouble, setIsDailyDouble] = useState(false);
  
  const soundManagerRef = useRef(new SoundManager());
  const timerRef = useRef(null);

  useEffect(() => {
    // Initialize daily doubles
    const doubles = new Set();
    for (let i = 0; i < 2; i++) {
      const category = Math.floor(Math.random() * 6);
      const value = Math.floor(Math.random() * 5);
      doubles.add(`${category}-${value}`);
    }
    setDailyDoubles(doubles);
    
    // Play theme music
    if (soundEnabled) {
      soundManagerRef.current.playThemeMusic();
    }
  }, []);

  useEffect(() => {
    soundManagerRef.current.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (showModal && currentQuestion) {
      setTimeLeft(30);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [showModal, currentQuestion]);

  const handleTimeout = () => {
    clearInterval(timerRef.current);
    soundManagerRef.current.playIncorrectSound();
    setShowAnswer(true);
    setSelectedAnswer('timeout');
    setTimeout(() => closeQuestion(), 4000);
  };

  const selectQuestion = (categoryIndex, valueIndex) => {
    const questionId = `${categoryIndex}-${valueIndex}`;
    if (answeredQuestions.has(questionId)) return;
    
    soundManagerRef.current.playSelectSound();
    
    const question = jeopardyQuestions[categoryIndex].questions[valueIndex];
    const value = (valueIndex + 1) * 200;
    
    setCurrentQuestion(question);
    setCurrentValue(value);
    
    // Check for daily double
    if (dailyDoubles.has(questionId)) {
      setIsDailyDouble(true);
      setShowDailyDouble(true);
      soundManagerRef.current.playDailyDoubleSound();
      
      setTimeout(() => {
        setShowDailyDouble(false);
        setShowWagerModal(true);
        // Set default wager to current question value
        setWagerAmount(Math.min(value, Math.max(1000, score)));
      }, 2000);
    } else {
      setIsDailyDouble(false);
      setShowModal(true);
    }
  };

  const handleWagerSubmit = () => {
    // Ensure wager is in $100 increments
    const finalWager = Math.round(wagerAmount / 100) * 100;
    setCurrentValue(finalWager);
    setShowWagerModal(false);
    setShowModal(true);
  };

  const handleAnswer = (answer) => {
    clearInterval(timerRef.current);
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === currentQuestion.correctResponse) {
      setScore(score + currentValue);
      soundManagerRef.current.playCorrectSound();
    } else {
      setScore(score - currentValue);
      soundManagerRef.current.playIncorrectSound();
    }
    
    setTimeout(() => closeQuestion(), 4000);
  };

  const closeQuestion = () => {
    const categoryIndex = jeopardyQuestions.findIndex(cat => 
      cat.questions.includes(currentQuestion)
    );
    const valueIndex = jeopardyQuestions[categoryIndex].questions.indexOf(currentQuestion);
    
    setAnsweredQuestions(prev => new Set([...prev, `${categoryIndex}-${valueIndex}`]));
    setShowModal(false);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setCurrentQuestion(null);
    
    // Check if game is complete
    if (answeredQuestions.size + 1 >= 30) {
      setGameComplete(true);
      if (score > 10000) {
        soundManagerRef.current.playThemeMusic();
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnsweredQuestions(new Set());
    setCurrentQuestion(null);
    setCurrentValue(0);
    setShowModal(false);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setGameComplete(false);
    setShowWagerModal(false);
    setWagerAmount(0);
    setIsDailyDouble(false);
    
    // Reset daily doubles
    const doubles = new Set();
    for (let i = 0; i < 2; i++) {
      const category = Math.floor(Math.random() * 6);
      const value = Math.floor(Math.random() * 5);
      doubles.add(`${category}-${value}`);
    }
    setDailyDoubles(doubles);
    
    soundManagerRef.current.playThemeMusic();
  };

  return (
    <div className="game-container">
      <div className="sound-toggle" onClick={() => setSoundEnabled(!soundEnabled)}>
        {soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF'}
      </div>
      
      <div className="header">
        <h1 className="title">GITHUB ADVANCED SECURITY JEOPARDY</h1>
        <div className="score-display">Score: ${score}</div>
      </div>
      
      <div className="board">
        {/* Categories */}
        {jeopardyQuestions.map((category, index) => (
          <div key={`cat-${index}`} className="category">
            {category.category}
          </div>
        ))}
        
        {/* Questions */}
        {[0, 1, 2, 3, 4].map(valueIndex => (
          jeopardyQuestions.map((category, catIndex) => {
            const questionId = `${catIndex}-${valueIndex}`;
            const isAnswered = answeredQuestions.has(questionId);
            
            return (
              <div
                key={questionId}
                className={`question-cell ${isAnswered ? 'answered' : ''}`}
                onClick={() => !isAnswered && selectQuestion(catIndex, valueIndex)}
              >
                ${(valueIndex + 1) * 200}
              </div>
            );
          })
        ))}
      </div>
      
      <div className="controls">
        <button className="control-btn" onClick={resetGame}>NEW GAME</button>
      </div>
      
      {/* Wager Modal for Daily Double */}
      {showWagerModal && (
        <div className="question-modal">
          <div className="wager-content">
            <h2 className="wager-title">DAILY DOUBLE!</h2>
            <p className="wager-subtitle">How much would you like to wager?</p>
            <p className="current-score">Current Score: ${score}</p>
            <p className="wager-limits">
              You can wager up to ${Math.max(1000, score)} in $100 increments
            </p>
            <div className="wager-input-container">
              <button 
                className="wager-adjust"
                onClick={() => setWagerAmount(Math.max(100, wagerAmount - 100))}
              >
                -$100
              </button>
              <input
                type="number"
                className="wager-input"
                value={wagerAmount}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setWagerAmount(Math.min(Math.max(100, val), Math.max(1000, score)));
                }}
                step="100"
                min="100"
                max={Math.max(1000, score)}
              />
              <button 
                className="wager-adjust"
                onClick={() => setWagerAmount(Math.min(Math.max(1000, score), wagerAmount + 100))}
              >
                +$100
              </button>
            </div>
            <div className="wager-quick-buttons">
              <button 
                className="wager-quick"
                onClick={() => setWagerAmount(Math.min(1000, score))}
              >
                Min ($100)
              </button>
              <button 
                className="wager-quick"
                onClick={() => setWagerAmount(Math.round(score / 2 / 100) * 100)}
              >
                Half Score
              </button>
              <button 
                className="wager-quick"
                onClick={() => setWagerAmount(Math.max(1000, score))}
              >
                All In!
              </button>
            </div>
            <button className="control-btn" onClick={handleWagerSubmit}>
              Make Wager: ${Math.round(wagerAmount / 100) * 100}
            </button>
          </div>
        </div>
      )}
      
      {/* Question Modal */}
      {showModal && currentQuestion && (
        <div className="question-modal">
          <div className="question-content">
            {showDailyDouble && (
              <div className="daily-double">DAILY DOUBLE!</div>
            )}
            <div className="timer">{timeLeft}</div>
            <div className="question-text">{currentQuestion.clue}</div>
            {isDailyDouble && currentQuestion.image && (
              <div className="question-image">
                <img src={currentQuestion.image} alt="Daily Double visual" />
              </div>
            )}
            
            {!showAnswer ? (
              <div className="answer-options">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="answer-options">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`answer-btn ${
                        option === currentQuestion.correctResponse ? 'correct' : 
                        option === selectedAnswer ? 'incorrect' : ''
                      }`}
                      disabled
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="explanation">
                  <strong>Correct Response:</strong> {currentQuestion.correctResponse}
                  <br /><br />
                  {currentQuestion.explanation}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="final-score">
          <div className="final-score-content">
            <h2 className="final-score-title">GAME COMPLETE!</h2>
            <p className="final-score-text">Final Score: ${score}</p>
            <button className="control-btn" onClick={resetGame}>PLAY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;