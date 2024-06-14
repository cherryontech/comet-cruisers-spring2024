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
  return (
    <main>
      <div>
        <header className="header">
          <nav className="fixed bg-[#FFD3B3] rounded-lg lg:hidden">
            <a href="#todo" className="m-3 hover:text-custom-teal-base hover:underline">
              To Do
            </a>
            <a href="#journal" className="m-3 hover:text-custom-teal-base hover:underline">
              Journal
            </a>
          </nav>
          <img src={logo} alt="Logo" className="m-auto w-48" />
        </header>
      </div>
      <Tutorial />
      <div className="lg:dashboard-grid">
        <div className="col-span-3 my-3 mx-5">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <header>Take a look at your scrapbook.</header>
        </div>
        <Todo />
        <div className="display-journal">
          <DisplayJournal />
          <div className="flex justify-end">
            <Popup
              contentStyle={{
                backgroundColor: '#F6EFDE',
                borderColor: '#E36527',
                minWidth: '300px'
              }}
              trigger={
                <button className="tutorial-new-entry btn btn-primary hover mr-5">New Entry</button>
              }
              modal
              nested>
              {(close) => (
                <div className="modal p-4">
                  <div className="content flex flex-row justify-between items-start">
                    <h1 className="text-xl font-semibold">How would you like to journal today?</h1>
                    <button className="grow" onClick={() => close()}>
                      <IoMdClose className="float-right" />
                    </button>
                  </div>
                  <p>Pick your journaling activity for today.</p>
                  <div className="flex flex-row center gap-3 mt-4">
                    <Link to="/free-journal" className="flex flex-1">
                      <button className="popup-btn hover">
                        <img src={pencil} alt="Free Write Icon" className="w-32 h-32" />
                        Free Write
                      </button>
                    </Link>
                    <Link to="/prompt-journal" className="flex flex-1">
                      <button className="popup-btn hover">
                        <img src={light_bulb} alt="Prompt Icon" className="w-32 h-32" />
                        Random Prompt
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
      <GenerateMessage id="mascot-container" />
      <footer className="lg:flex inset-x-0 bottom-0 justify-center mx-2">
        Comet Cruisers @ Cherry On Tech Spring 2024
      </footer>
    </main>
  );
};
export default Home;
