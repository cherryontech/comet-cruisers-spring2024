import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import blue_book from '../assets/BlueBook.svg';
import paper from '../assets/Paper.svg';
//import glass from '../assets/magnifyingglass.svg'; // darker
//import glass from '../assets/magnifyingglass.png'; //lighter but less weird looking

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
    if (confirm('Are you sure you want to delete this record?')) {
      const updatedEntries = journalEntry.filter((entry) => entry.journal_id !== id);
      localStorage.setItem('journalEntry', JSON.stringify(updatedEntries));
      setJournalEntry(updatedEntries);
    }
  };

  const filteredEntries =
    searchTerm.length == 0
      ? journalEntry
      : journalEntry?.filter((entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // set displayPage to 0 change only when the search term is updated
  useEffect(() => {
    setDisplayPage(0);
  }, [searchTerm]);

  const displayEntries = filteredEntries?.slice(
    displayPage,
    filteredEntries.length >= entriesPerPage ? displayPage + entriesPerPage : filteredEntries.length
  );

  return (
    <div className="display-entries p-2">
      <div className="header-container lg:flex lg:flex-row">
        <div className="journal-banner bg-custom-burnt-orange text-white text-center max-w-[200px] min-h-[40px] text-2xl p-2 m-5">
          Journal
        </div>
        <div className="search-container flex flex-row items-center justify-end grow">
          <FaMagnifyingGlass className="text-gray-400 m-2 absolute" />
          <input
            type="text"
            placeholder="Search Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input rounded-3xl w-4/5 p-2"
          />
        </div>
      </div>
      <div className="tutorial-journal card">
        {displayEntries == null || displayEntries.length < 1 ? (
          <div className="text-center p-4">No entries found.</div>
        ) : (
          displayEntries.map((entry, index) => (
            <React.Fragment key={entry.journal_id}>
              <div className="flex flex-row items-center justify-center space-x-3 w-full p-4 m-auto mt-5">
                <img
                  src={entry.type === '/prompt-journal' ? paper : blue_book}
                  alt="Journal Icon"
                  className="w-1/6 h-1/6 float-left"
                />
                <div className="grow min-w-0 text-ellipsis">
                  <p className="text-xs">{entry.date}</p>
                  <h1 className="font-normal text-3xl truncate">{entry.title}</h1>
                  <div
                    className="content-text"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <button className="tutorial-edit hover">
                    <Link to={`${entry.type}/${entry.journal_id}`}>Edit</Link>
                  </button>
                  <button
                    className="tutorial-delete hover"
                    onClick={() => deleteEntry(entry.journal_id)}>
                    Delete
                  </button>
                </div>
              </div>
              {index !== displayEntries.length - 1 && (
                <hr className="border-gray-600 w-3/4 m-auto" />
              )}
            </React.Fragment>
          ))
        )}
        {filteredEntries?.length > entriesPerPage && (
          <div className="flex flex-row space-x-3 p-4">
            <button
              onClick={() => setDisplayPage(displayPage - entriesPerPage)}
              className={displayPage <= 0 ? 'hidden' : 'block'}
              disabled={displayPage <= 0}>
              <GrFormPrevious className="w-6 h-6" />
            </button>
            <div id="page-number"> {displayPage / entriesPerPage + 1}</div>
            <button
              onClick={() => setDisplayPage(displayPage + entriesPerPage)}
              className={
                displayPage + entriesPerPage >= filteredEntries?.length ? 'hidden' : 'block'
              }
              disabled={displayPage + entriesPerPage >= filteredEntries?.length}>
              <GrFormNext className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayJournal;
