import React from 'react';

import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => {
  return (
    <main>
      <header>This is the temporary home page</header>
      <br />
      <Popup trigger={<button>ChooseJournal</button>} modal nested>
        {(close) => (
          <div className="modal">
            <div className="content">Choose</div>
            <div>
              <button onClick={() => close()}>X</button>
            </div>
            <button>
              <Link to="/free-journal">FreeJournal</Link>
            </button>
            <br />
            <button>
              <Link to="/prompt-journal">PromptJournal</Link>
            </button>
          </div>
        )}
      </Popup>
      <br />
      <br />
      <footer>This is a temp footer</footer>
    </main>
  );
};

export default Home;
