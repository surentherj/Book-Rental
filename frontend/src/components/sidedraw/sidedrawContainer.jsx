// IMPORT PACKAGES
import React, { useEffect, useRef } from "react";

// IMPORT ICONS
import CloseIcon from "../icons/closeIcon";

const SidedrawContainer = (props) => {
  const dropdown = useRef();
  const { size, title, setOverlay, contentComponent, footerClass } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.getElementById("root").style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = "unset";
      document.getElementById("root").style.pointerEvents = "auto";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOverlay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`sidedraw-wrapper sidedraw-${size}`} >
      <div className="sidedraw-title">
        <h4>{title}</h4>
        <div
          className="icon-wrap hover icon-s"
          onClick={() => {
            setOverlay(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <hr className="hr-custom" />

      <div className={`sidedraw-content ${footerClass || ""}`}>{contentComponent}</div>
    </div>
  );
};

export default SidedrawContainer;
