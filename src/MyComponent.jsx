import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyComponent() {
  const [value, setValue] = useState('');
  var toolbarOptions = [['bold', 'italic'], ['link', 'image']];
  const module = {
    toolbar: toolbarOptions,
  };

  return <ReactQuill modules {...module} theme="snow" value={value} onChange={setValue} />;
}

export default MyComponent;