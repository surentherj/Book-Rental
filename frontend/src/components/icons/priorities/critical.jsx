import React from "react";

const CriticalIcon = (props) => {
  return (
    <svg
      fill="currentColor"
      flexshrink="0"
      userselect="none"
      {...props}
    >
      <path
        d="M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM4 7c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1H4z"
        fill="#ff5630"
      />
    </svg>
  );
};

export default CriticalIcon;
