import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Todo from '../js/Todo';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css';
import DisplayJournal from '../js/displayEntries.js';
import logo from '../assets/Logo-Sun.png';
import light_bulb from '../assets/LightBulb.svg';
import pencil from '../assets/Pencil.svg';
import GenerateMessage from '../js/botPrompt.js';
import Tutorial from '../js/Tutorial.js';

const Home = () => {
  const displayMascot = () => {
    return <GenerateMessage />;
  };

  return (
    <main>
      <div>
        <header className="header">
          <img src={logo} alt="Logo" className="m-auto w-48" />
        </header>
      </div>
      <Tutorial />
      <div className="dashboard-grid">
        <div className="col-span-3">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <header>Take a look at your scrapbook.</header>
        </div>
        <Todo />
        <div className="display-journal">
          <DisplayJournal />
          <div className="btn-container">
            <Popup
              contentStyle={{ backgroundColor: '#F6EFDE', borderColor: '#E36527' }}
              trigger={
                <button className="tutorial-new-entry btn btn-primary hover">New Entry</button>
              }
              modal
              nested>
              {(close) => (
                <div className="modal p-4">
                  <div className="content flex flex-row">
                    <div className="flex-col">
                      <h1 className="text-xl">How would you like to journal today?</h1>
                      <p>Pick your journaling activity for today.</p>
                    </div>
                    <button className="grow" onClick={() => close()}>
                      <IoMdClose className="float-right" />
                    </button>
                  </div>
                  <div className="flex flex-row center gap-3 mt-4">
                    <button className="flex popup-btn hover justify-center">
                      <div className="flex flex-col gap-y-3">
                        <img src={pencil} alt="Free Write Icon" className="w-32 h-32" />
                        <Link to="/free-journal">Free Write</Link>
                      </div>
                    </button>
                    <button className="flex popup-btn hover justify-center">
                      <div className="flex flex-col gap-y-3">
                        <img src={light_bulb} alt="Prompt Icon" className="w-32 h-32" />
                        <Link to="/prompt-journal">Random Prompt</Link>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
      {displayMascot()}
      <footer>Comet Cruisers Spring 2024</footer>
    </main>
  );
};
export default Home;
