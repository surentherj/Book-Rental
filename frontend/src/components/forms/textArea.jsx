// IMPORT PACKAGES
import React, { useRef, useState, useEffect } from "react";
import { useTracking } from "react-tracking";

// IMPORT TRACKING EVENTS
import { TEXT_AREA_FOCUS } from "../../tracking/actions";

const FormTextArea = (props) => {
  const {
    id,
    type,
    rows,
    labelText,
    isRequired,
    name,
    value,
    // onChange,
    warnText,
    readOnly,
    onKeyDown,
    iseditable,
    className,
    ...other
  } = props;
  const { trackEvent } = useTracking({ label: labelText });

  // Text area height
  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
  }, [value]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  // BLUR AND FOCUS STATE
  const [blur, setBlur] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  // ERROR AND SUCCESS TOGGLE
  const errorToggle = !focus && !value && warnText && (blur || isRequired);
  const successToggle = !focus && value && blur;

  // FORM INPUT CLASSES
  const formTextAreaClassName = `form-control material size-m ${
    errorToggle ? "error" : ""
  } ${successToggle ? "success" : ""} ${readOnly ? "read-only" : ""}`;

  // FORM TEXT AREA PROPS
  const FormTextAreaProps = {
    type,
    id,
    rows,
    className: formTextAreaClassName,
    name,
    value,
    onChange: onChangeHandler,
    ...other,
  };

  // FORM TEXT AREA LABEL
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

  // FORM WARN TEXT
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

  // FORM TEXT AREA
  const textarea = (
    <textarea
      {...FormTextAreaProps}
      ref={textAreaRef}
      onKeyDown={onKeyDown}
      style={{
        height: textAreaHeight,
        overflow: "hidden",
      }}
      onBlur={() => {
        setBlur(true);
        setFocus(false);
      }}
      onFocus={() => setFocus(true)}
      onMouseDown={() => {
        trackEvent({
          action: TEXT_AREA_FOCUS,
        });
      }}
    />
  );

  return (
    <>
      <div
        className={`form-group material ${className ? className : ""} ${
          focus || blur || value ? " open" : ""
        }`}
        style={{
          minHeight: parentHeight,
        }}
      >
        {label}
        {textarea}
        {warn}
      </div>
    </>
  );
};

export default FormTextArea;
