import React, { useState } from 'react';
import { GameInterface } from '../core';
import './ImageContainer.css';

function ImageContainer(props: { gameInterface: GameInterface }) {
  const [imageName, setImageName] = useState('');

  props.gameInterface.onGameEvent.subscribe(({ event, outcome }) => {
    const name = event.name.replace(/\s/g, '-') + (outcome ? `-${outcome.name.replace(/\s/g, '-')}` : '');
    setImageName(`images/${name.toLowerCase()}.jpeg`);
  })

  return (
    <div className="image-container">
      <img src={imageName} alt={imageName}></img>
    </div>
  );
}

export default ImageContainer;
