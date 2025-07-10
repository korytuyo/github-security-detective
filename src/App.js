import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="start-screen">
          <div className="start-content">
            <h1 className="start-title">GITHUB ADVANCED SECURITY</h1>
            <h2 className="subtitle">JEOPARDY!</h2>
            <button className="control-btn" onClick={startGame}>
              START GAME
            </button>
          </div>
        </div>
      ) : (
        <Game soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      )}
    </div>
  );
}

export default App;