import React from "react";
import "./searchbar.css"

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Groups"
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input" // Added class for styling
      />
    </div>
  );
}

export default SearchBar;
