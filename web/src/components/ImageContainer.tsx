import React, { useState } from 'react';
import { GameInterface } from '../core';
import './ImageContainer.css';

function ImageContainer(props: { gameInterface: GameInterface }) {
  const [imageName, setImageName] = useState('');

  props.gameInterface.onGameEvent.subscribe((event) => {
    const imagePath = `images/${event}.jpeg`;
    const img = new Image();
    img.onload = () => setImageName(imagePath);
    img.src = imagePath;
  });

  return (
    <img
      className="image-container"
      src={imageName}
      alt={imageName}
    ></img>
  );
}

export default ImageContainer;
