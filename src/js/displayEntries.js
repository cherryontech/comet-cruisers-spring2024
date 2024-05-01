import React, { useState, useEffect } from 'react';

//since we are using local storage, the most recent journal entry is shown
const DisplayJournal = () => {
  const [journalEntry, setJournalEntry] = useState({ title: '', content: '' });
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

  return (
    <div style={containerStyles}>
      <h1> Journal Entry: </h1>
      <h1 style={titleStyles}>{journalEntry.title}</h1>
      <div style={contentStyles} dangerouslySetInnerHTML={{ __html: journalEntry.content }} />
    </div>
  );
};

export default DisplayJournal;
