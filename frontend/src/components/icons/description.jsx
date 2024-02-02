import React from "react";

const DescriptionIcon = (props) => {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.10039 5.1V0H6.00039C3.80039 2.2 2.60039 3.5 0.400391 5.6V5.7H5.50039C5.80039 5.7 6.10039 5.4 6.10039 5.1Z"
        fill="#5C677D"
      />
      <path
        d="M19.6004 7.9V1.7C19.6004 0.8 18.8004 0 17.9004 0H7.10039V5.1C7.10039 6 6.40039 6.7 5.50039 6.7H0.400391V22.3C0.400391 23.2 1.20039 24 2.10039 24H18.0004C18.9004 24 19.7004 23.2 19.7004 22.3V20.9V19.9V17.1V7.9H19.6004Z"
        fill="#5C677D"
      />
    </svg>
  );
};

export default DescriptionIcon;
