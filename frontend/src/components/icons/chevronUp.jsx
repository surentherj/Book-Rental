import React from "react";

const ChevronUpIcon = (props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M16.2963 13.4829L9.00002 6.21037L1.70373 13.4829L0.857178 12.6336L9.00002 4.51728L17.1429 12.6336L16.2963 13.4829Z"
          fill="#4F4F4F"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="16.2857"
            height="16.2857"
            fill="white"
            transform="matrix(1 0 0 -1 0.857178 17.1428)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronUpIcon;
