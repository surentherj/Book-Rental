import React from "react";
import Tooltip from "./Tooltip";

const StackedAvatar = ({ avatarsList = [], email = "" }) => {
  return (
    <>
      <div className="stackedAvatars  ">
        {avatarsList.length < 5 &&
          avatarsList.map((item) => <Tooltip item={item} email={email} />)}
        {avatarsList.length > 4 &&
          avatarsList
            .slice(0, 3)
            .map((item) => <Tooltip item={item} email={email} />)}
        {avatarsList.length > 4 && (
          <Tooltip
            email={email}
            itemList={avatarsList.slice(3)}
            itemLength={avatarsList.length - 3}
          />
        )}
      </div>
    </>
  );
};

export default StackedAvatar;
