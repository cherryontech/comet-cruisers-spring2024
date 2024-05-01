import React from 'react';

const ClearButton = ({ clearButton }) => {
  const handleClear = () => {
    clearButton();
  };

  return (
    <button type="button" name="clear" className="btn btn-secondary" onClick={handleClear}>
      Clear
    </button>
  );
};

export default ClearButton;
