import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { avatarString } from "../../utils/namedFilterUtils";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppUsers } from "../../redux/actions/auth";

const Tooltip = ({ item, itemList, itemLength, email }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { user, allusers } = useSelector((state) => ({
    user: state?.auth?.user,
    allusers: state?.auth?.allusers || [],
  }));

  useEffect(() => {
    if (user && (allusers?.length == 0 || !allusers)) {
      dispatch(getAllAppUsers());
    }
  }, [user]);

  return (
    <div
      className={`r-avatar r-avatar-rounded r-avatar-s `}
      id={`popper_wrapper`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      data-tip
      data-for="happyFace"
    >
      <span>{!itemList && avatarString(item).toUpperCase()}</span>
      <span>{itemList && `+${itemLength}`}</span>
      {active && typeof item != Array && !itemList && (
        <ReactTooltip
          id={`happyFace`}
          className="avatar-tooltip"
          place="bottom,top"
          type="light"
        >
          {email && email !== "No Data"
            ? allusers?.find((x) => x.id === email)?.email
            : allusers?.find((x) => x.name === item)?.email || item}
        </ReactTooltip>
      )}
      {itemList && active && (
        <ReactTooltip
          id={`happyFace`}
          className="avatar-tooltip"
          place="bottom,top"
          type="light"
        >
          {itemList.map((it) => (
            <p>{it}</p>
          ))}
        </ReactTooltip>
      )}
    </div>
  );
};

export default Tooltip;
