import React from 'react';

const IconWithNumber = ({ number }) => {
  return (
    <div className="icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="#0073e6" />
        <text x="50" y="50" textAnchor="middle" alignmentBaseline="central" fill="white" fontSize="60">
          {number}
        </text>
      </svg>
    </div>
  );
};

export default IconWithNumber;
