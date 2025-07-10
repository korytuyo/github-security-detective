import React, { useState } from 'react';
import Game from './components/Game'; // Ensure Game is in components folder
import './App.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {!gameStarted ? (
        <header className="App-header">
          <h1>GitHub Security Detective</h1>
          <p>Test your GitHub Advanced Security knowledge!</p>
          <button className="start-button" onClick={() => setGameStarted(true)}>
            Start Game
          </button>
        </header>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;