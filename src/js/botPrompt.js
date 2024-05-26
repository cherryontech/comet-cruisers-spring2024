import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import star from '../assets/star_mascot.svg';

const messages = [
  'Why did the computer go to bed? It needed to crash.',
  'What did one plate say to another plate? Tonight, dinner is on me.',
  'You are a shining star!',
  'Keep up the great work!',
  'Believe in yourself!',
  'You can achieve anything!',
  'Stay positive and happy!',
  'Give yourself the time and opportunity to heal!',
  'Show yourself love and compassion!',
  'Today, you choose to love yourself just as you are.',
  'You are worthy of good things!',
  'With every challenge, you will understand yourself better!',
  'Every opportunity provides a chance to learn and grow!',
  'What kind of sandals do frogs wear? Open-toad.',
  'Why did the cookie go to the doctor? It was feeling crumby.',
  'How many tickles does it take to make an octopus laugh? Ten-tickles.',
  'What did the blanket say to the bed? I’ve got you covered.',
  'How do birds learn to fly? They wing it.',
  'What happens when ice cream gets angry? It has a meltdown.',
  'What do you call spaghetti in disguise? An impasta.',
  'Why didn’t the sun go to college? It already had a million degrees.',
  'The world is a better place because you are in it.',
  'Embrace your imperfections. They make you unique!'
];

const GenerateMessage = () => {
  const [randomMessage, setRandomMessage] = useState('Talk to me! Click me for a surpirse!');

  const handleClick = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setRandomMessage(randomMsg);
  };

  return (
    <div className="container">
      <div className="interactive-container">
        <button onClick={handleClick} style={{ border: 'none', background: 'none', padding: '0' }}>
          <img src={star} alt="Starfish" className="button" style={{ cursor: 'pointer' }} />
        </button>
      </div>
      <div className="textbox">{randomMessage}</div>
    </div>
  );
};

export default GenerateMessage;
