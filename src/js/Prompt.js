import React, { useState } from 'react';

const prompts = [
  'What made you feel special today?',
  'Something that made me happy today is...',
  'Reflect on a recent accomplishment / milestone and how it has impacted you.',
  'Write a message to your future self about your hopes, dreams, and intentions.',
  'Who or what could support you the most right now?',
  'Make a list of things, people, and activities that make you happy.',
  'What or who is causing the most stress / anxiety right now?',
  'What are you feeling right now? Take some time to reflect on your current emotions.',
  'Why do you feel lost while struggling to move forward?',
  'What would you do if you had more energy each day?'
];

const GeneratePrompt = () => {
  const [curPrompt, setCurPrompt] = useState(0);

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * prompts.length);
    setCurPrompt(randomNumber);
  };

  return (
    <div>
      <h1>{prompts[curPrompt]}</h1>
      <button type="button" onClick={handleClick}>
        Randomize Prompt
      </button>
    </div>
  );
};

export default GeneratePrompt;
