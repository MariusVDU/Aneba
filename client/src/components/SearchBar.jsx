import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Trigger search as user types (debounced in real app)
    setTimeout(() => onSearch(value), 300);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for games, gift cards..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
