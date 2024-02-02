import React from 'react';

// Loader
// full-content for content loader and full-page for full page loader
const Loader = (props) => {
  const { mode = 'full-content', text } = props;
  return (
    <div
      className={`loader-wrapper ${
        mode === 'full' ? 'full-page' : 'full-content'
      }`}
    >
      <div className='rloader mb-four-s' />
      <h1>{text}</h1>
    </div>
  );
};

export default Loader;
