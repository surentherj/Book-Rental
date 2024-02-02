// IMPORT PACKAGES
import React from "react";

// IMPORT ICONS
import SearchIcon from "../icons/search";
import SearchCancelIcon from "../icons/cancelSearch";

const SearchInput = (props) => {
  const {
    id,
    name,
    searchString,
    onChangeSearch,
    onEnterSearch,
    onCancelSearch,
    size,
    placeholder = "Search"
  } = props;

  return (
    <div className="form-group pointer">
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={searchString || ""}
        onChange={onChangeSearch}
        onKeyUp={(event) => {
          onEnterSearch(event);
        }}
        aria-label="Search"
        className={`form-control size-${size === "medium" ? "m" : "s"}`}
      />
      <div className="form-icon">
        <div className={`icon-wrap icon-${size === "medium" ? "m" : "s"}`}>
          {searchString ? (
            <SearchCancelIcon
              onClick={() => {
                onCancelSearch();
              }}
            />
          ) : (
              <SearchIcon />
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
