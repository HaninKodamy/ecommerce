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
    // Pass the search term to the parent component for handling the search
    onSearch(searchTerm);
  };

  const handleIconClick = () => {
    // Handle the click event here
    // You can perform a search action or other functionality
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
