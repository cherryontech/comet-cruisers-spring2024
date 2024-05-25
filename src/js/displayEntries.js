import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import blue_book from '../assets/BlueBook.svg';
import paper from '../assets/Paper.svg';

//since we are using local storage, the most recent journal entry is shown
const DisplayJournal = () => {
  const initialState = JSON.parse(localStorage.getItem('journalEntry'));
  const [journalEntry, setJournalEntry] = useState(initialState);
  const [displayPage, setDisplayPage] = useState(0);
  const displayEntry = journalEntry?.slice(
    displayPage,
    journalEntry.length >= 3 ? displayPage + 3 : journalEntry.length
  );

  useEffect(() => {
    const savedEntry = localStorage.getItem('journalEntry');
    if (savedEntry) {
      setJournalEntry(JSON.parse(savedEntry));
    }
  }, []);

  // Adding some basic styles for the container and journal content
  const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    margin: 'auto'
  };

  const displayJournalIcon = (type) => {
    switch (type) {
      case '/prompt-journal':
        return <img src={paper} alt="Paper" className="w-1/4 h-1/4 float-left" />;
      case '/free-journal':
        return <img src={blue_book} alt="Blue Book" className="w-1/4 h-1/4 float-left" />;
    }
  };

  const deleteEntry = (id) => {
    const index = journalEntry.findIndex((obj) => obj.journal_id == id);
    journalEntry.splice(index, 1);
    localStorage.setItem('journalEntry', JSON.stringify(journalEntry));
    setJournalEntry(JSON.parse(localStorage.getItem('journalEntry')));
  };

  return journalEntry == null || journalEntry.length < 1 ? (
    <div className="text-center p-4">No entries detected.</div>
  ) : (
    <>
      {displayEntry.map((entry) => (
        <div key={entry.journal_id}>
          <div style={containerStyles} className="space-x-3 p-4">
            {displayJournalIcon(entry.type)}
            <div className="grow max-w-prose overflow-x-scroll">
              <p className="text-xs">{entry.date}</p>
              <h1 className="font-bold text-lg">{entry.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: entry.content }} />
            </div>
            <div className="flex flex-col items-end">
              <button>
                <Link to={`${entry.type}/${entry.journal_id}`}>Edit</Link>
              </button>
              <button onClick={() => deleteEntry(entry.journal_id)}>Delete</button>
            </div>
          </div>
          <hr className="border-gray-600 w-3/4 m-auto" />
        </div>
      ))}
      <div className="flex flex-row space-x-3 p-4">
        <button
          onClick={() => setDisplayPage(displayPage - 3)}
          className={displayPage <= 0 ? 'hidden' : 'block'}>
          <GrFormPrevious className="w-6 h-6" />
        </button>
        <button
          onClick={() => setDisplayPage(displayPage + 3)}
          className={displayPage + 3 >= journalEntry.length ? 'hidden' : 'block'}>
          <GrFormNext className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default DisplayJournal;
