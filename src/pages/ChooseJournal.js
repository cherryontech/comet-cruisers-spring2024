import React from 'react';
import { Link } from 'react-router-dom';

const ChooseJournal = () => {
  return (
    <div>
      <header className="text-3xl font-bold underline">
        This is the temporary choose journal page
      </header>
      <button>
        <Link to="/free-journal">FreeJournal</Link>
      </button>
      <br />
      <button>
        <Link to="/prompt-journal">PromptJournal</Link>
      </button>
    </div>
  );
};

export default ChooseJournal;
