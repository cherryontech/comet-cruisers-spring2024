import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaveButton = ({ saveEntry, disabled }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    saveEntry();
    // Redirect to the main page after saving
    navigate('/');
  };

  return (
    <button
      type="button"
      name="save"
      id="save"
      className="btn btn-primary"
      onClick={handleSave}
      disabled={disabled}>
      Save
    </button>
  );
};

export default SaveButton;
