import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div>
        <header>
            This is the temporary home page
        </header>
        <button>
            <Link  to="/choose-journal">
            ChooseJournal
            </Link>
        </button>
    </div>
  );
};

export default Home;
