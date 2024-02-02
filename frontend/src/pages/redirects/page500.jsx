import React from "react";

import "./error.scss";

const Page500 = ({ content }) => {
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
              <h2>500</h2>
              <h5>Internal Server Error</h5>
              <p>
                Please try again later or contact your administrator if the
                problem persists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page500;
