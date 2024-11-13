import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleReset = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-container mb-4 text-center">
      <form onSubmit={handleSearch} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Cari film..."
          className="form-control w-50"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary ms-2">
          Cari
        </button>
      </form>
      {query && (
        <button onClick={handleReset} className="btn btn-secondary mt-2">
          Reset
        </button>
      )}
    </div>
  );
};

export default Search;
