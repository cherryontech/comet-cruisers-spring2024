import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../js/Button.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FreeJournal = () => {
  const fillerFunc = () => {
    console.log('button test');
  };

  const clearFunc = () => {
    console.log('Clearing the entry button');
    setValue('');
  };

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Updates the title as the user types
  };
  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = ['mirza', 'roboto'];
  ReactQuill.Quill.register(Font, true);

  return (
    <div
      className="journal-entry"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-3xl font-bold underline" style={{ textAlign: 'center' }}>
        Free Flowing Journal
      </h1>
      <h2 className="text-1xl font-bold" style={{ textAlign: 'center' }}>
        Let your words flow!
      </h2>

      <div
        style={{
          backgroundColor: '#F6EFDE',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '1000px',
          padding: '20px',
          margin: '20px auto' // This will center the div and maintain 20px margin from top and bottom
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
      <Button type="button" name="clear" text="Clear" class="btn btn-primary" onclick={clearFunc} />
      <Button type="button" name="save" text="Save" class="btn btn-primary" onclick={fillerFunc} />
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default FreeJournal;
