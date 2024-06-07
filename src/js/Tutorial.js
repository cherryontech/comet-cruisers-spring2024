import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const TUTORIAL_STEPS = [
  {
    target: 'body',
    placement: 'center',
    title: 'Your Step By Step Guide To SeaScribe',
    content:
      'Hi there! We’re excited to see you here. This is your safe space to find peace amidst the chaos. Let’s get started on your journey to well-being. Whether you want to journal your thoughts or manage your tasks, Seascribe is here to support you every step of the way.'
  },
  {
    target: 'body',
    placement: 'center',
    title: 'Dashboard',
    content:
      'This is where your brain unburdens. Your feelings, your thoughts or your tasks. One space for all. Let’s zoom in and explore more.'
  },
  {
    target: '.tutorial-journal',
    placement: 'left',
    title: 'Journal',
    content:
      'Here is Journaling section of the SeaScribe. Here you have two options, you can either freely write down your thoughts or use a prompt and let it guide your reflections.'
  },
  {
    target: '.tutorial-new-entry',
    placement: 'left',
    content:
      'You can click on the “New Entry” button and select either "Free Write" or "Random Prompt".'
  },
  {
    target: '.search-input',
    placement: 'top',
    title: 'Search',
    content: 'Want to revisit a old memory? Just add in the title of the entry and viola!'
  },
  {
    target: '.tutorial-edit',
    placement: 'left',
    content:
      'Update your entries anytime to reflect on your growth. Just go to "Edit" button on the entry you want to edit.'
  },
  {
    target: '.tutorial-delete',
    placement: 'left',
    content: 'You can also delete your entry by pressing the "Delete" button.'
  },
  {
    target: '.list-wrapper',
    placement: 'right',
    title: 'To Do List',
    content:
      'Here you will find your to-do list. You can add many lists and organize them by dragging and dropping.'
  },
  {
    target: '.list-wrapper',
    placement: 'right',
    title: 'Organize ',
    content:
      'Divide tasks into different lists, such as “Work”, “Personal”, or “Shopping”, your call! Just go to "Enter List Name" and start typing.'
  },
  {
    target: '.task-wrapper',
    placement: 'right',
    title: 'Add Tasks',
    content:
      'Take your cursor to the "Enter Task Name" and start writing! You can also organize the individual tasks within their own list by dragging and dropping.'
  },
  {
    target: '.tutorial-expand',
    placement: 'right',
    content: 'Click on the "expand" button to see the tasks in the list!'
  },
  {
    target: '.tutorial-add-task',
    placement: 'right',
    content: 'You can also add additional tasks using this button!'
  },
  {
    target: '.tutorial-expand',
    placement: 'right',
    content:
      'Under your list name, you can tuck away the tasks within the list using "Collapse". You know, just to rain check it! Whenever you are ready to get to them, select "Expand".'
  },
  {
    target: '.tutorial-star',
    placement: 'top-left',
    content:
      'Your Star Bud always has some wisdom for you. Just click on him, and he might say something that makes your day a little brighter.'
  },
  {
    target: 'body',
    placement: 'center',
    content:
      'Seascribe is your safe haven. We hope you enjoy your time here and find peace and productivity along the way. Welcome aboard, and happy writing!'
  }
];

const Tutorial = () => {
  const initialState = JSON.parse(localStorage.getItem('tutorialPassed'));
  const [run, setRun] = useState(initialState);

  useEffect(() => {
    const curState = localStorage.getItem('tutorialPassed');
    if (curState === null || curState === undefined) {
      setRun(true);
    }
  }, []);

  const handleCallback = (data) => {
    const status = data.status;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('tutorialPassed', false);
    }
  };

  return (
    <>
      <Joyride
        callback={handleCallback}
        run={run}
        steps={TUTORIAL_STEPS}
        continuous={true}
        showSkipButton={true}
        hideBackButton={true}
        hideCloseButton={true}
        disableOverlay={true}
        spotlightClicks={true}
        locale={{
          last: 'End tutorial',
          skip: 'Skip tutorial'
        }}
        styles={{
          buttonNext: {
            background: '#0E8992'
          }
        }}
      />
    </>
  );
};

export default Tutorial;
