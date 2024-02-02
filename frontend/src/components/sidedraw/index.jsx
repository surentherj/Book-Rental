// IMPORT PACKAGES
import React from "react";
import ReactDOM from "react-dom";

// IMPORT CONTAINER
import SidedrawContainer from "./sidedrawContainer";

const Sidedraw = (props) => {
  return ReactDOM.createPortal(
    <SidedrawContainer {...props} />,
    document.querySelector("#side-draw")
  );
};

export default Sidedraw;
