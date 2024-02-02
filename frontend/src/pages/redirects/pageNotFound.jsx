// IMPORT PACKAGES
import React from "react";
import "./error.scss";
const PageNotFound = ({ content }) => {
  return (
    <div
      id="pageNotFound"
      className={`loader-wrapper ${content ? "full-content" : "full-page"}`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col" align="center">
            <div className="emoji mb-two-s">&#x2639;</div>
            <div className="error-content">
              <h2>You can't view this project/issue</h2>
              <h5>
                It may have been deleted or you don't have permission to view
                it.
              </h5>
            </div>
            {!content && (
              <div
                className="btn btn-medium btn-primary"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Back To Home
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
