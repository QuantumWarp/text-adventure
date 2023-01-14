import React, { useEffect, useState } from 'react';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import ImageContainer from './components/ImageContainer';
import { Game, GameInterface } from './core';

function App() {
  const [gameInterface, setGameInterface]  = useState<GameInterface>();

  const newGame = () => {
    const gi = new GameInterface();
    const game = new Game(gi);
    setGameInterface(gi);
    setTimeout(() => game.run(), 1000);
  };

  useEffect(() => { newGame(); }, []);

  return (
    <div className="app">
      <h1>Text Adventure</h1>

      {gameInterface && (
        <>
          <TerminalContainer
            gameInterface={gameInterface}
          />

          <ImageContainer
            gameInterface={gameInterface}
          />
        </>
      )}
    </div>
  );
}

export default App;
