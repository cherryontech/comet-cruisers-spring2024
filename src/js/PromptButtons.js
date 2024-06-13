import React from 'react';
import { Link } from 'react-router-dom';
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
        return <TbWriting className="text-3xl" />;
      case '/free-journal':
        return <GoLightBulb className="text-3xl" />;
    }
  };

  return (
    <button className="switch-btn" title="switch journal type">
      <Link to={switchTo}> {displayIcon()} </Link>
    </button>
  );
};

export default SwitchJournalType;
