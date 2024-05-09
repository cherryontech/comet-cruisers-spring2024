import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//since we are using local storage, the most recent journal entry is shown
const DisplayJournal = () => {
  const initialState = JSON.parse(localStorage.getItem('journalEntry'));
  const [journalEntry, setJournalEntry] = useState(initialState);
  const titleStyles = {
    fontWeight: 'bold',
    fontSize: '20px'
  };
  useEffect(() => {
    const savedEntry = localStorage.getItem('journalEntry');
    if (savedEntry) {
      setJournalEntry(JSON.parse(savedEntry));
    }
  }, []);

  // Adding some basic styles for the container and journal content
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    backgroundColor: '#F6EFDE',
    margin: 'auto'
  };

  const contentStyles = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
    marginTop: '10px'
  };

  return journalEntry == null || journalEntry.length < 1 ? (
    <div>No entries detected.</div>
  ) : (
    <>
      {journalEntry.map((entry) => (
        <div key={entry.journal_id} style={containerStyles}>
          <h1> Journal Entry: </h1>
          <h1 style={titleStyles}>{entry.title}</h1>
          <p>{entry.date}</p>
          <div style={contentStyles} dangerouslySetInnerHTML={{ __html: entry.content }} />
          <button>
            <Link to={`${entry.type}/${entry.journal_id}`}>Edit</Link>
          </button>
        </div>
      ))}
    </>
  );
};

export default DisplayJournal;
