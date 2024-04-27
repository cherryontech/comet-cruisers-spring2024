import React from 'react';
import { Link } from 'react-router-dom';
import GeneratePrompt from '../js/Prompt.js';
import Button from '../js/Button.js';

const PromptJournal = () => {
  const fillerFunc = () => {
    console.log('button test');
  };

  return (
    <div className="journal-entry">
      <GeneratePrompt />
      <Link to="/">go back</Link>
      <Button type="button" name="save" text="Save" class="btn btn-primary" onclick={fillerFunc} />
    </div>
  );
};

export default PromptJournal;
