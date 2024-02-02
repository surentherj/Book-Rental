// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./error.scss";

const Page401 = ({ content }) => {
  return (
    <div
      id="pageNotFound"
      className={`loader-wrapper ${content ? "full-content" : "full-page"}`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col" align="center">
            <div className="error-content">
              <div className="emoji mb-two-s">&#x26A0;</div>
              <div className="error-content">
                <h2>401</h2>
                <h5>Unauthorized Error</h5>
                <p>Sorry, your request could not be processed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page401;
