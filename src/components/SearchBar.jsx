import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Search Here..." />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;
