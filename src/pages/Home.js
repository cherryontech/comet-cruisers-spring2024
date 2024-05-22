import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Todo from '../js/Todo';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css';
import DisplayJournal from '../js/displayEntries.js';

const Home = () => {
  const [randomMessage, setRandomMessage] = useState('Talk to me! Click me for a surprise.');
  const messages = [
    'You are a shining star!',
    'Keep up the great work!',
    'Believe in yourself!',
    'You can achieve anything!',
    'Stay positive and happy!'
  ];

  const handleClick = () => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setRandomMessage(randomMsg);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Title</h1>
      <header>This is the temporary home page</header>
      <Todo />
      <br />
      <Popup trigger={<button>New Entry</button>} modal nested>
        {(close) => (
          <div className="modal">
            <div className="content">Choose</div>
            <div>
              <button onClick={() => close()}>
                <IoMdClose />
              </button>
            </div>
            <button>
              <Link to="/free-journal">Free Write</Link>
            </button>
            <br />
            <button>
              <Link to="/prompt-journal">Random Prompt</Link>
            </button>
          </div>
        )}
      </Popup>
      <br />
      <br />
      <div>
        <DisplayJournal />
      </div>
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
      <footer>This is a temp footer</footer>
      <div className="textbox">{randomMessage}</div>
    </main>
  );
};

export default Home;
