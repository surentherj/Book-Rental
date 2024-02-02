import React from "react";

const PauseIcon = (props) => {
  return (
    <svg
      fill="white"
      flexshrink="0"
      userselect="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M 6 2 H 4 v 10 h 2 V 12 Z M 10 2 h -2 V 12 h 2 z" />
    </svg>
  );
};

export default PauseIcon;
