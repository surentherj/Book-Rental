import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DownArrowIconBlack from "../icons/downArrowIconBlack";

import { useSelector } from "react-redux";
import RamcoTrackLogo from "../icons/rTrackLogo";

const Navbar = ({ logout }) => {
  const dropdown = useRef();
  const marqueeRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const { user } = useSelector((state) => ({
    user: state?.auth?.user,
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setSideDraw(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop();
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  };
  return (
    <>
      <nav className="navbar justify-content-between" aria-label="Top Nav">
        <Link to="/" className="navbar-brand" aria-label="Logo Link">
          <RamcoTrackLogo />
        </Link>
        <div className="right-navbar right">
          <ul className="top-nav">
            <li>
              <div className="avatar avatar-rounded avatar-s">
                <span title="Username">
                  {localStorage.name ? localStorage.name[0].toUpperCase() : "U"}
                </span>
              </div>
              <div
                className="icon-wrap icon-s relative"
                onClick={() => setCollapse(!collapse)}
              >
                <DownArrowIconBlack />
                {collapse && (
                  <div className="dropdown-wrapper bottom-right">
                    <div className="user-profile-wrapper">
                      <div className="flex-center-start">
                        <div
                          className="avatar avatar-rounded avatar-l"
                          style={{ cursor: "default" }}
                        >
                          <span>
                            {localStorage.name
                              ? localStorage.name[0].toUpperCase()
                              : "U"}
                          </span>
                        </div>
                        <div className="user-info">
                          <h6 className="mb-one-s">{localStorage.name}</h6>
                          <div className="flex-center-space-between">
                            <p>{localStorage.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="divider" />
                      <div
                        className="btn btn-primary btn-small"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <marquee
          bgcolor="#e1f0ff"
          direction="left"
          style={{ position: "sticky" }}
          behavior="scroll"
          ref={marqueeRef}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: "<h5>Welcome To Online Book Rental Library</h5>",
            }}
          ></span>
        </marquee>
      </div>
    </>
  );
};

export default Navbar;
