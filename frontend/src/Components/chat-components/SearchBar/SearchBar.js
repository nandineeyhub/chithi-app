import React from "react";

const SearchBar = () => {
  return (
    <form action="" className="content-sidebar-form">
      <input
        type="search"
        className="content-sidebar-input"
        placeholder="Search..."
      />
      <button type="submit" className="content-sidebar-submit">
        <i className="fa fa-search" />
      </button>
    </form>
  );
};

export default SearchBar;
