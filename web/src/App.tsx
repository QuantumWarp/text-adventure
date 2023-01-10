import React from 'react';
import './App.css';
import TerminalContainer from './components/TerminalContainer';
import ImageContainer from './components/ImageContainer';

function App() {
  return (
    <div className="app">
      <h1>Text Adventure</h1>

      <TerminalContainer />

      <ImageContainer />
    </div>
  );
}

export default App;
