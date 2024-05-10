import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
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
  let journalType = window.location.pathname;
  let storedJournalEntries = JSON.parse(localStorage.getItem('journalEntry'));
  let journalEntries = storedJournalEntries;
  let default_entries = [];

  if (!storedJournalEntries) {
    // if there is no stored info save default into local storage
    localStorage.setItem('journalEntry', JSON.stringify(default_entries));
    // set default to current journal entries
    journalEntries = default_entries;
  }

  const { id } = useParams(); // extract the id parameter from URL

  const findJournalEntry = (journal_id) => {
    let journalIndex = journalEntries.findIndex((x) => x.journal_id === journal_id);
    return journalEntries[journalIndex];
  };

  const [value, setValue] = useState(id == undefined ? '' : findJournalEntry(id).content); //content of journal entry
  const [title, setTitle] = useState(id == undefined ? '' : findJournalEntry(id).title); //title of journal entry

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
    let entries = [...journalEntries];
    let timestamp = Date(Date.now());

    const journalEntry = {
      journal_id: id == undefined ? uuidv4() : findJournalEntry(id).journal_id,
      prompt: document.getElementsByClassName('prompt')[0].innerHTML,
      title: title,
      content: value,
      date: timestamp,
      type: id == undefined ? journalType : findJournalEntry(id).type
    };

    const spliceIndex = () => {
      entries.splice(entries.indexOf(id), 1);
      entries.push(journalEntry);
    };

    id == undefined ? entries.push(journalEntry) : spliceIndex();

    localStorage.setItem('journalEntry', JSON.stringify(entries));
  };

  const displayPrompt = () => {
    switch (journalType) {
      case '/prompt-journal':
        return <GeneratePrompt />;
      case '/free-journal':
        return <GenerateSubHeader />;
      default:
        return <p className="prompt">{findJournalEntry(id).prompt}</p>;
    }
  };

  return (
    <>
      {displayPrompt()}
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
          <SaveButton saveEntry={saveEntry} disabled={!value || !title} />
        </div>
      </div>
    </>
  );
};

const JournalContainer = () => {
  return (
    <div className="journal-container">
      <div className="journal-entry">
        <Popup trigger={<button>Go back</button>} modal nested>
          {(close) => (
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
          )}
        </Popup>
        <JournalTextEntry />
      </div>
    </div>
  );
};

export default JournalContainer;
