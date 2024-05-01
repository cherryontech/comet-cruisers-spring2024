import React, { useState } from 'react';
import { FaShuffle } from 'react-icons/fa6';

const prompts = [
  'What made you feel special today?',
  'Something that made me happy today is...',
  'Reflect on a recent accomplishment, no matter how small, and celebrate it.',
  'Write a message to your future self about your hopes, dreams, and intentions.',
  'Who or what could support you the most right now?',
  'Make a list of things, people, and activities that make you happy.',
  'What or who is causing the most stress / anxiety right now?',
  'What are you feeling right now? Take some time to reflect on your current emotions.',
  'Write a letter to yourself expressing kindness and encouragement.',
  'What would you do if you had more energy each day?',
  'List things you are grateful for, even the tiniest ones.',
  'What small moments brought me joy today?',
  'Describe your ideal self-care routine.',
  'Describe a peaceful place where you feel completely at ease.',
  'Write about a person or pet who brings you comfort and joy.',
  'List three things that went well today, no matter how small.',
  'Reflect on a past challenge and how it shaped you positively.',
  'Describe a favorite memory that brings you happiness.',
  'What positive affirmations resonate with you right now?',
  'Write about a time when you felt supported and understood.',
  'Reflect on a time when you overcame self-doubt.',
  'Write a gratitude letter to someone who has supported you.',
  'Describe a place in nature where you feel rejuvenated.',
  'Write about a dream or goal that excites you.',
  'Reflect on a time when you received unexpected support.',
  'List activities that bring you a sense of calm and peace.',
  'Think of three quirky hobbies or interests that make you smile. How can you infuse a bit of that playful spirit into your daily grind?',
  'If your inner critic were a character in a sitcom, what would they sound like? Write a scene where you lovingly roast them into silence.',
  'Imagine your to-do list as a garden. Which tasks are the vibrant blooms that bring you joy, and which are the pesky weeds sucking your energy?',
  'Close your eyes and envision a fluffy cloud floating by. What message does it have for you about finding peace amidst the chaos?'
];

const GeneratePrompt = () => {
  const [curPrompt, setCurPrompt] = useState(Math.floor(Math.random() * prompts.length));

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * prompts.length);
    setCurPrompt(randomNumber);
  };

  return (
    <div>
      <div className="prompt-container">
        <p className="prompt">{prompts[curPrompt]}</p>
        <button type="button" onClick={handleClick}>
          <FaShuffle className="shuffle icon" />
        </button>
      </div>
      <p className="subheading">Let&apos;s respond to today&apos;s prompt.</p>
    </div>
  );
};

export default GeneratePrompt;
