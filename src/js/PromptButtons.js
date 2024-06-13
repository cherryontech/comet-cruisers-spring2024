import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { GoLightBulb } from 'react-icons/go';
import { TbWriting } from 'react-icons/tb';

const SwitchJournalType = () => {
  let journalType = window.location.pathname;
  let switchTo = '';
  //types are '/free-journal' and '/prompt-journal

  switch (journalType) {
    case '/prompt-journal':
      switchTo = '/free-journal';
      break;
    case '/free-journal':
      switchTo = '/prompt-journal';
      break;
    default:
      switchTo = '/';
      break;
  }

  const displayIcon = () => {
    switch (journalType) {
      case '/prompt-journal':
        return <TbWriting />;
      case '/free-journal':
        return <GoLightBulb />;
    }
  };

  return (
    <Popup
      contentStyle={{ backgroundColor: '#F6EFDE', borderColor: '#E36527' }}
      trigger={
        <button className="switch-btn" title="switch journal type">
          {displayIcon()}
        </button>
      }
      modal
      nested>
      {(close) => (
        <div className="modal p-4">
          <h1 className="text-2xl font-semibold">Unsaved Changes</h1>
          <p>Are you sure you want to change journal types?</p>
          <div className="flex flex-row justify-center gap-5 pt-4">
            <button className="btn btn-secondary hover flex-1" onClick={() => close()}>
              Cancel
            </button>
            <Link to={switchTo} className="flex flex-1">
              <button className="btn btn-tertiary hover flex-1">Switch!</button>
            </Link>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default SwitchJournalType;
