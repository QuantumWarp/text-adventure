import React, { useEffect, useState } from 'react';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import ImageContainer from './components/ImageContainer';
import { Game } from 'text-adventure';

function App() {
  const [currentGame, setCurrentGame]  = useState<Game>();

  const newGame = () => {
    const game = new Game();
    setCurrentGame(game);
    game.run();
  };

  useEffect(() => { newGame(); }, []);

  return (
    <div className="app">
      <h1>Text Adventure</h1>

      {currentGame && (
        <>
          <TerminalContainer
            game={currentGame}
          />

          <ImageContainer />
        </>
      )}
    </div>
  );
}

export default App;
