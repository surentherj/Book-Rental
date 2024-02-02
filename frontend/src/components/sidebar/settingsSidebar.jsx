import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PRIVILEGES } from "../../constants";

const SettingsSidebar = (props) => {
  const path = { props };
  const [collapse, setCollapse] = useState(false);
  const [selected, setSelected] = useState(path);
  const history = useHistory();

  const { user } = useSelector((state) => ({
    user: state?.auth?.user,
  }));
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    setSelected(history.location.pathname);
    history.listen(() => {
      setSelected(history.location.pathname);
    });
  }, [history]);

  const changePage = (value) => {
    history.push(value);
  };

  const { privileges = {} } = user || {};

  return (
    <>
      <div className={`settings-left`}>
        <div className="settings-head">
          <h3 className="font-m grey1 font-bold">Settings</h3>
        </div>
        <div className="settings-body">
          <ul>
            {PRIVILEGES.MODIFY_ALL in privileges && (
              <>
                <li
                  title="Statuses"
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/settings");
                  }}
                  className={selected === "/settings" ? "active" : ""}
                >
                  <span>Statuses</span>
                </li>
                <li
                  title="Custom Fields"
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/customFields");
                  }}
                  className={selected === "/customFields" ? "active" : ""}
                >
                  <span>Custom Fields</span>
                </li>
                <li
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/screens");
                  }}
                  title="Screens"
                  className={selected === "/screens" ? "active" : ""}
                >
                  <span>Screens</span>
                </li>
                <li
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/workflows");
                  }}
                  title="Workflows"
                  className={selected === "/workflows" ? "active" : ""}
                >
                  <span>Workflows</span>
                </li>
                <li
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/calenders");
                  }}
                  title="calenders"
                  className={selected === "/calenders" ? "active" : ""}
                >
                  <span>Calenders</span>
                </li>
                <li
                  title="SLA"
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/slas");
                  }}
                  className={selected === "/slas" ? "active" : ""}
                >
                  <span>SLA</span>
                </li>
                <li
                  onClick={() => {
                    if (collapse) toggleCollapse();
                    changePage("/projectSetting");
                  }}
                  title="Projects"
                  className={selected === "/projectSetting" ? "active" : ""}
                >
                  <span>Projects</span>
                </li>
              </>
            )}
            {PRIVILEGES.MODIFY_GROUPS in privileges && (
              <li
                title="Groups"
                onClick={() => {
                  if (collapse) toggleCollapse();
                  changePage("/groups");
                }}
                className={selected === "/groups" ? "active" : ""}
              >
                <span>Groups</span>
              </li>
            )}
            {PRIVILEGES.MODIFY_ROLES in privileges && (
              <li
                onClick={() => {
                  if (collapse) toggleCollapse();
                  changePage("/roles");
                }}
                title="Roles"
                className={selected === "/roles" ? "active" : ""}
              >
                <span>Roles</span>
              </li>
            )}
            {PRIVILEGES.MODIFY_USERS in privileges && (
              <li
                onClick={() => {
                  if (collapse) toggleCollapse();
                  changePage("/users");
                }}
                title="Users"
                className={selected === "/users" ? "active" : ""}
              >
                <span>Users</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;
