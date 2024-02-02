import React from "react";

const NewRequirementIcon = (props) => {
  return (
    <svg
      fill="currentColor"
      flexshrink="0"
      userselect="none"
      {...props}
    >
      <path
        d="M0 1.777C0 .796.796 0 1.777 0h12.446C15.204 0 16 .796 16 1.777v12.446c0 .981-.796 1.777-1.777 1.777H1.777A1.778 1.778 0 0 1 0 14.223V1.777z"
        fill="#8993A4"
      />
      <path
        d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default NewRequirementIcon;
