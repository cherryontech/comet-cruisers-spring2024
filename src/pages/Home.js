import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Todo from '../js/Todo';
import { IoMdClose } from 'react-icons/io';
import 'reactjs-popup/dist/index.css';
import DisplayJournal from '../js/displayEntries.js';

const Home = () => {
  return (
    <main>
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
              trigger={<button className="btn btn-primary">New Entry</button>}
              modal
              nested>
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
          </div>
        </div>
      </div>
      <footer>This is a temp footer</footer>
    </main>
  );
};

export default Home;
