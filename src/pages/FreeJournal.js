import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SaveButton from '../js/saveButton.js';
import ClearButton from '../js/clearButton.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FreeJournal = () => {
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
    <div
      className="journal-entry"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br></br>
      <h1 className="text-3xl font-bold underline" style={{ textAlign: 'center' }}>
        Free Flowing Journal
      </h1>
      <h2 className="text-1xl font-bold" style={{ textAlign: 'center' }}>
        Let your words flow!
      </h2>

      <div
        className="text-entry"
        style={{
          backgroundColor: '#F6EFDE',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '300px',
          padding: '20px',
          margin: '20px auto'
        }}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Title of this Journal Entry..."
          className="title-input"
          style={{
            width: '100%',
            padding: '5px',
            fontSize: '20px',
            margin: '10px 0',
            display: 'block',
            backgroundColor: '#F6EFDE'
          }}
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>

      <SaveButton saveEntry={saveEntry} />
      <ClearButton clearButton={clearButton} />
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default FreeJournal;
