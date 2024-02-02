// IMPORT PACKAGES
import React from "react";
import "./error.scss";

const Page404 = ({ content }) => {
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
              <h2>404 Error</h2>
              <h5>Oops! You&apos;re lost</h5>
              <p>
                The page you are looking for was moved or doesn&apos;t exists.
              </p>
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

export default Page404;
