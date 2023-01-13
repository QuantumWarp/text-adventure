import React, { useEffect, useState } from 'react';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import ImageContainer from './components/ImageContainer';
import { Game, GameInterface } from 'text-adventure';

function App() {
  const [gameInterface, setGameInterface]  = useState<GameInterface>();

  const newGame = () => {
    const gi = new GameInterface();
    const game = new Game(gi);
    setGameInterface(gi);
    game.run();
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

          <ImageContainer />
        </>
      )}
    </div>
  );
}

export default App;
