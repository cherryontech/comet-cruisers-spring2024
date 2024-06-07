import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Todo from '../js/Todo';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css';
import DisplayJournal from '../js/displayEntries.js';
import logo from '../assets/Logo-Sun.png';
import GenerateMessage from '../js/botPrompt.js';
import Tutorial from '../js/Tutorial';

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
                    Choose
                    <button className="grow" onClick={() => close()}>
                      <IoMdClose className="float-right" />
                    </button>
                  </div>
                  <div className="flex flex-row gap-3 mt-4">
                    <button className="flex-1">
                      <Link to="/free-journal">Free Write</Link>
                    </button>
                    <button className="flex-1">
                      <Link to="/prompt-journal">Random Prompt</Link>
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
