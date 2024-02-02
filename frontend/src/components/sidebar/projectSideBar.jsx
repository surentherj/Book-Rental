import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProjectSidebar = (props) => {
  const path = { props };
  const [collapse, setCollapse] = useState(false);
  const [selected, setSelected] = useState(path);
  const history = useHistory();
  const { projects } = useSelector((state) => ({
    projects: state?.setting?.projects,
  }));

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    if (history.location.pathname === "/projectSetting") {
      setSelected(props.path);
    } else {
      setSelected(history.location.pathname);
    }
    history.listen(() => {
      setSelected(history.location.pathname);
    });
  }, [history]);

  const changePage = (value) => {
    history.push(value);
  };

  return (
    <>
      <div className={`settings-left no-bg`}>
        <ul>
          {projects &&
            projects.map((item) => (
              <li
                title={item.name}
                onClick={() => {
                  if (collapse) toggleCollapse();
                  changePage(`/projectSetting/${item.name}`);
                }}
                className={
                  selected === `/projectSetting/${item.name}` ? "active" : ""
                }
              >
                <span>{item.name}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectSidebar;
