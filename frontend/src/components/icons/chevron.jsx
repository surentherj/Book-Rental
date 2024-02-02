import React from "react";

const ChevronIcon = (props) => {
  const { status = "close" } = props;
  const open = {
    transform: "rotate(180deg)",
    transformOrigin: "50% 50%",
  };
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7.5" transform="rotate(-180 8 8)" fill="white" stroke="#C9CDD6" />
      <path
        d="M8 5L12.3301 9.5H3.66987L8 5Z"
        fill="#5C677D"
        style={status !== "open" ? open : null}
      />
    </svg>
  );
};

export default ChevronIcon;
