import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { v4 as uuidv4 } from 'uuid';
import { IoMdArrowBack } from 'react-icons/io';
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

  const [curSubhead, setCurSubHead] = useState(Math.floor(Math.random() * subHeaders.length));

  const location = useLocation();
  // only changes the sub header when page changes
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * subHeaders.length);
    setCurSubHead(randomNumber);
  }, [location]);

  return (
    <div>
      <p className="prompt">Free Write</p>
      <p className="subheading">{subHeaders[curSubhead]}</p>
    </div>
  );
};

const JournalTextEntry = ({ hasChanges, setHasChanges }) => {
  let journalType = window.location.pathname;
  let storedJournalEntries = JSON.parse(localStorage.getItem('journalEntry'));
  let journalEntries = storedJournalEntries ? storedJournalEntries : [];

  const { id } = useParams(); // extract the id parameter from URL

  const findJournalEntry = (journal_id) => {
    let journalIndex = journalEntries.findIndex((x) => x.journal_id === journal_id);
    return journalEntries[journalIndex];
  };

  const [value, setValue] = useState(id == undefined ? '' : findJournalEntry(id).content); //content of journal entry
  const [title, setTitle] = useState(id == undefined ? '' : findJournalEntry(id).title); //title of journal entry

  // compares content and title from the saved entries and marks if there are changes
  // if there are no changes the pop up does not appear
  const initValue = id ? findJournalEntry(id).content : '';
  const initTitle = id ? findJournalEntry(id).title : '';
  useEffect(() => {
    if (value != initValue || title != initTitle) setHasChanges(true);
    else setHasChanges(false);
  }, [value, title]);

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
    let curDate = Date(Date.now()).split(' ');
    let timestamp = curDate[1] + ' ' + curDate[2];

    const journalEntry = {
      journal_id: id == undefined ? uuidv4() : findJournalEntry(id).journal_id,
      prompt: document.getElementsByClassName('prompt')[0].innerHTML,
      title: title,
      content: value,
      date: timestamp,
      type: id == undefined ? journalType : findJournalEntry(id).type
    };

    const spliceIndex = () => {
      const index = entries.findIndex((x) => x.journal_id === id);
      entries.splice(index, 1);
      entries.unshift(journalEntry);
    };

    id == undefined ? entries.unshift(journalEntry) : spliceIndex();

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
      <div className="card text-entry">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Title of this Journal Entry..."
          className="title-input"
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <div className="btn-container">
          <SwitchJournalType changes={hasChanges} />
          <div className="space-x-2.5">
            <ClearButton clearButton={clearButton} />
            <SaveButton saveEntry={saveEntry} disabled={!value || !title} />
          </div>
        </div>
      </div>
    </>
  );
};

const JournalContainer = () => {
  const [hasChangesState, setHasChanges] = useState(false);
  return (
    <div className="journal-container">
      <div className="journal-entry">
        {hasChangesState ? (
          <Popup
            contentStyle={{ backgroundColor: '#F6EFDE', borderColor: '#E36527' }}
            trigger={
              <button title="go back">
                <IoMdArrowBack className="absolute top-3 start-3 w-10 h-10 hover" />
              </button>
            }
            modal
            nested>
            {(close) => (
              <div className="modal p-4">
                <h1 className="text-2xl font-semibold">Unsaved Changes</h1>
                <p>Looks like you didn&apos;t save.</p>
                <div className="flex flex-row justify-center gap-5 pt-4">
                  <button className="btn btn-secondary hover flex-1" onClick={() => close()}>
                    Cancel
                  </button>
                  <Link to="/" className="flex flex-1">
                    <button className="btn btn-tertiary hover flex-1">Discard</button>
                  </Link>
                </div>
              </div>
            )}
          </Popup>
        ) : (
          <Link to="/">
            <button title="go back">
              <IoMdArrowBack className="absolute top-3 start-3 w-10 h-10 hover" />
            </button>
          </Link>
        )}

        <JournalTextEntry hasChanges={hasChangesState} setHasChanges={setHasChanges} />
      </div>
    </div>
  );
};

export default JournalContainer;
