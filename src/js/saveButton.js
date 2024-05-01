import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaveButton = ({ saveEntry }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    saveEntry();
    // Redirect to the main page after saving
    navigate('/');
  };

  return (
    <button type="button" name="save" className="btn btn-primary" onClick={handleSave}>
      Save
    </button>
  );
};

export default SaveButton;
