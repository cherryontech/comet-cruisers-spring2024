import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';

const messages = [
  'Why did the computer go to bed? It needed to crash.',
  'What did one plate say to another plate? Tonight, dinner is on me.',
  'You are a shining star!',
  'Keep up the great work!',
  'Believe in yourself!',
  'You can achieve anything!',
  'Stay positive and happy!',
  'test',
  'more quotes here',
  'yanka was here!'
];

const GenerateMessage = () => {
  const [randomMessage, setRandomMessage] = useState('Talk to me! Click me for a surpirse');

  const handleClick = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setRandomMessage(randomMsg);
  };

  return (
    <div>
      <div className="interactive-container">
        <button onClick={handleClick} style={{ border: 'none', background: 'none', padding: '0' }}>
          <img
            src="public/starfish_img.png"
            alt="Starfish"
            className="button"
            style={{ cursor: 'pointer' }}
          />
        </button>
      </div>
      <div className="textbox">{randomMessage}</div>
    </div>
  );
};

export default GenerateMessage;
