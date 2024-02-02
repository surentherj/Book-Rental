import React from "react";

const HighIcon = (props) => {
  return (
    <svg
      fill="currentColor"
      flexshrink="0"
      userselect="none"
      {...props}
    >
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-46.25" y1="65.1105" x2="-46.25" y2="64.1105" gradientTransform="matrix(12 0 0 -13.1121 563 854.7415)">
        <stop offset="0" stopColor="#ff5630" />
        <stop offset="1" stopColor="#ff8f73" />
      </linearGradient>
      <path d="M2.5 4l5-2.9c.3-.2.7-.2 1 0l5 2.9c.3.2.5.5.5.9v8.2c0 .6-.4 1-1 1-.2 0-.4 0-.5-.1L8 11.4 3.5 14c-.5.3-1.1.1-1.4-.4-.1-.1-.1-.3-.1-.5V4.9c0-.4.2-.7.5-.9z" fill="url(#a)" />
    </svg>
  );
};

export default HighIcon;
