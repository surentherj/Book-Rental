import React from "react";

const Switch = (props) => {
  const { checked, onChangeEventHandler, name } = props;

  const switchInputProps = {
    type: "checkbox",
    name,
    checked,
    onChange: onChangeEventHandler,
  };

  return (
    <>
      <label className="switch default mb-0">
        <input {...switchInputProps} />
        <span className="switch_slider"></span>
      </label>
    </>
  );
};

export default Switch;
