// IMPORT PACKAGES
import React from "react";

const FormInput = (props) => {
  const {
    id,
    type,
    labelText,
    isRequired,
    name,
    value,
    displayValue = true,
    onChange,
    warnText,
    readOnly,
    className,
    icon,
    onKeyDown,
    iseditable,
    ...other
  } = props;

  // BLUR AND FOCUS STATE
  const [blur, setBlur] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  // ERROR AND SUCCESS TOGGLE
  const errorToggle = !focus && !value && warnText && (blur || isRequired);
  const successToggle = !focus && value && blur;

  // FORM INPUT CLASSES
  const formInputClassName = `form-control material size-m ${
    errorToggle ? " error" : ""
  }${successToggle ? " success" : ""}${readOnly ? " disabled" : ""}`;

  // FORM INPUT PROPS
  const FormInputProps = {
    type,
    id,
    className: formInputClassName,
    name,
    onChange,
    ...other,
  };

  if (displayValue) {
    FormInputProps.value = value;
  }

  // FORM INPUT LABEL
  const label = labelText ? (
    <label
      htmlFor={id}
      className={`control-label material${errorToggle ? " error" : ""}${
        successToggle ? " success" : ""
      }${!focus && !value ? " cursor-text" : ""}`}
    >
      {labelText}
    </label>
  ) : null;

  // FORM INPUT WARN TEXT
  const warn =
    (iseditable || !value) && warnText ? (
      <span
        className={`input-caption${
          !focus && (blur || isRequired) ? " error" : ""
        }`}
      >
        {warnText}
      </span>
    ) : null;

  // FORM INPUT
  const input = (
    <input
      {...FormInputProps}
      onKeyDown={onKeyDown}
      onBlur={() => {
        setBlur(true);
        setFocus(false);
      }}
      onFocus={() => {
        setFocus(true);
      }}
      onKeyPress={(event) => {
        event.key === "Enter" && event.preventDefault();
      }}
    />
  );

  return (
    <>
      <div
        className={`form-group material ${className ? className : ""} ${
          focus || blur || value ? " open" : ""
        }`}
      >
        {label}
        {icon ? icon : <></>}
        {input}
        {warn}
      </div>
    </>
  );
};

export default FormInput;
