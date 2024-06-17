import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { GoLightBulb } from 'react-icons/go';
import { TbWriting } from 'react-icons/tb';

const SwitchJournalType = ({ changes }) => {
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
        return (
          <div className="flex hover p-1">
            Switch to Free Write
            <TbWriting className="w-5 h-5" />
          </div>
        );
      case '/free-journal':
        return (
          <div className="flex hover p-1">
            Switch to Prompt
            <GoLightBulb className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <>
      {changes ? (
        <Popup
          contentStyle={{ backgroundColor: '#F6EFDE', borderColor: '#E36527', minWidth: '300px' }}
          trigger={
            <button className="flex text-custom-teal-dark" title="switch journal type">
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
                <div className="btn-wrapper">
                  <button
                    className="btn btn-secondary hover testing btn-pop-up-warning"
                    onClick={() => close()}>
                    Cancel
                  </button>
                </div>

                <Link to={switchTo} className="link-wrapper">
                  <button className="btn btn-tertiary hover btn-pop-up-warning">Switch!</button>
                </Link>
              </div>
            </div>
          )}
        </Popup>
      ) : (
        <Link to={switchTo} className="flex flex-1">
          {displayIcon()}
        </Link>
      )}
    </>
  );
};

export default SwitchJournalType;
