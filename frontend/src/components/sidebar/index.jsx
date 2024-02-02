import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import HomeIcon from "../icons/home";
import MenuToggle from "../icons/menuToggle";
import MenuToggled from "../icons/menuToggled";
import RamcoTrackLogo from "../icons/rTrackLogo";

const SideBar = () => {
  const history = useHistory();
  const [collapse, setCollapse] = useState(false);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    setSelected(history.location.pathname);
    history.listen(() => {
      setSelected(history.location.pathname);
    });
  }, [history]);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const changePage = (value) => {
    history.push(value);
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    if (collapse) {
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setCollapse(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [wrapperRef, collapse]);

  return (
    <>
      <div
        className="mb-toggle icon-wrap icon-s"
        onClick={() => {
          toggleCollapse();
        }}
        title="Toggle Menu"
      >
        <MenuToggle />
      </div>

      <div
        className={`sidebar pos-left ${collapse ? "" : "collapsed"}`}
        role="navigation"
        aria-label="Sidebar navigation"
        ref={wrapperRef}
      >
        <ul>
          <li
            className={`${!collapse ? "" : "toggled"}`}
            onClick={() => {
              toggleCollapse();
            }}
            title="Toggle Menu"
          >
            <div className="icon-wrap icon-s">
              {collapse ? <MenuToggled /> : <MenuToggle />}
            </div>{" "}
            <span className="logo-brand">
              <RamcoTrackLogo />
            </span>
          </li>
        </ul>

        <ul>
          <li
            title="Home"
            onClick={() => {
              if (collapse) toggleCollapse();
              changePage("/");
            }}
            className={selected === "/" ? "active" : undefined}
          >
            <div className="icon-wrap icon-s">
              <HomeIcon />
            </div>
            <span>Book List</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
