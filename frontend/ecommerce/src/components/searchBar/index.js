import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import './index.css'

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleIconClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
      </form>
      <div className="search-icon" onClick={handleIconClick}>
        <FaSearch />
      </div>
    </div>
  );
  
}

export default Search;
