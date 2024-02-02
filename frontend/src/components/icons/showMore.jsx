import React from "react";

const ShowMore = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="7.5" fill="white" stroke="#C9CDD6" />
      <path d="M8 11L3.66987 6.5H12.3301L8 11Z" fill="#5C677D" />
    </svg>
  );
};

export default ShowMore;
