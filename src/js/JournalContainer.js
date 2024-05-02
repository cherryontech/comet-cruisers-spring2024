import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import GeneratePrompt from './Prompt.js';
import SaveButton from '../js/saveButton.js';
import ClearButton from '../js/clearButton.js';
import SwitchJournalType from './PromptButtons.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GenerateSubHeader = () => {
  const subHeaders = [
    'Let your words flow!',
    'Scribble you heart out.',
    'Let us write something today!'
  ];

  const curSubhead = Math.floor(Math.random() * subHeaders.length);

  return (
    <div>
      <p className="prompt">Free Write</p>
      <p className="subheading">{subHeaders[curSubhead]}</p>
    </div>
  );
};

const JournalTextEntry = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // This registers the fonts only once when the component mounts
    const Font = ReactQuill.Quill.import('formats/font');
    Font.whitelist = ['mirza', 'roboto'];
    ReactQuill.Quill.register(Font, true);
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Updates the title as the user types
  };

  const clearButton = () => {
    console.log('Clearing the entry button');
    setValue('');
  };

  const saveEntry = () => {
    if (!value.trim()) {
      // If `value` (text box) is empty or contains only whitespace, don't save and alert the user.
      alert('Cannot save an empty entry.');
      return; // Exit the function early to prevent saving an empty entry.
    }
    const journalEntry = {
      title: title,
      content: value
    };
    localStorage.setItem('journalEntry', JSON.stringify(journalEntry));
    alert('Entry saved!');
  };

  return (
    <>
      <div className="text-entry">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Title of this Journal Entry..."
          className="title-input"
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <div className="btn-container">
          <SwitchJournalType />
          <ClearButton clearButton={clearButton} />
          <SaveButton saveEntry={saveEntry} />
        </div>
      </div>
    </>
  );
};

const JournalContainer = () => {
  let journalType = window.location.pathname;

  const displayPrompt = () => {
    switch (journalType) {
      case '/prompt-journal':
        return <GeneratePrompt />;
      case '/free-journal':
        return <GenerateSubHeader />;
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-entry">
        {displayPrompt()}
        <Popup trigger={<button>Go back</button>} modal nested>
          <div className="modal">
            <h1>Unsaved Changes</h1>
            <p>Looks like you didn&apos;t save.</p>
            <br />
            <div className="btn-container">
              <button className="btn btn-secondary" onClick={() => close()}>
                Cancel
              </button>
              <button className="btn btn-tertiary">
                <Link to="/">Discard</Link>
              </button>
            </div>
          </div>
        </Popup>
        <JournalTextEntry />
      </div>
    </div>
  );
};

export default JournalContainer;
