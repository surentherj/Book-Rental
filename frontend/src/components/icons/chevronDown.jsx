import React from "react";

const ChevronDownIcon = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M1.67652 4.11499L8 10.4179L14.3235 4.11499L15.0571 4.85105L8 11.8852L0.942843 4.85105L1.67652 4.11499Z"
          fill="#4F4F4F"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="14.1143"
            height="14.1143"
            fill="white"
            transform="matrix(-1 0 0 1 15.0571 0.942871)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronDownIcon;
