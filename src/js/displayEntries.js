import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import blue_book from '../assets/BlueBook.svg';
import paper from '../assets/Paper.svg';
//import glass from '../assets/magnifyingglass.svg'; // darker
import glass from '../assets/magnifyingglass.png'; //lighter but less weird looking

//since we are using local storage, the most recent journal entry is shown
const DisplayJournal = () => {
  const initialState = JSON.parse(localStorage.getItem('journalEntry'));
  const [journalEntry, setJournalEntry] = useState(initialState);
  const [displayPage, setDisplayPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 3;

  useEffect(() => {
    const savedEntry = localStorage.getItem('journalEntry');
    if (savedEntry) {
      setJournalEntry(JSON.parse(savedEntry));
    }
  }, []);

  const deleteEntry = (id) => {
    const updatedEntries = journalEntry.filter((entry) => entry.journal_id !== id);
    localStorage.setItem('journalEntry', JSON.stringify(updatedEntries));
    setJournalEntry(updatedEntries);
  };

  const filteredEntries =
    searchTerm.length == 0
      ? journalEntry
      : journalEntry.filter((entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const displayEntries = filteredEntries.slice(
    displayPage,
    filteredEntries.length >= entriesPerPage ? displayPage + entriesPerPage : filteredEntries.length
  );

  return (
    <>
      <div className="search-container">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <img
            src={glass}
            alt="Magnifying Glass"
            style={{ position: 'absolute', left: '10px', height: '18px', width: '20px' }}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full my-4"
            style={{ paddingLeft: '40px' }} // Make space for the image
          />
        </div>
      </div>
      <div className="card">
        {displayEntries.length < 1 ? (
          <div className="text-center p-4">No entries found.</div>
        ) : (
          displayEntries.map((entry, index) => (
            <React.Fragment key={entry.journal_id}>
              <div
                className="space-x-3 p-4"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                  marginTop: '20px'
                }}>
                <img
                  src={entry.type === '/prompt-journal' ? paper : blue_book}
                  alt="Journal Icon"
                  className="w-1/4 h-1/4 float-left"
                />
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
              {index !== displayEntries.length - 1 && (
                <hr className="border-gray-600 w-3/4 m-auto" />
              )}
            </React.Fragment>
          ))
        )}
        {filteredEntries.length > entriesPerPage && (
          <div className="flex flex-row space-x-3 p-4">
            <button
              onClick={() => setDisplayPage(displayPage - entriesPerPage)}
              className={displayPage <= 0 ? 'hidden' : 'block'}
              disabled={displayPage <= 0}>
              <GrFormPrevious className="w-6 h-6" />
            </button>
            <button
              onClick={() => setDisplayPage(displayPage + entriesPerPage)}
              className={
                displayPage + entriesPerPage >= filteredEntries.length ? 'hidden' : 'block'
              }
              disabled={displayPage + entriesPerPage >= filteredEntries.length}>
              <GrFormNext className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayJournal;
