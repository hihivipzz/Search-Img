import React, { useState } from 'react';
import './SearchBar.css';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm hình ảnh"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
    </div>
  );
};

export default SearchBar;