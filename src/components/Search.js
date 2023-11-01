import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    props.onSearch(searchText);
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSearch}>
      <input
        className="form-control"
        placeholder="Поиск"
        value={searchText}
        onChange={handleInputChange}
      />
      <button type="submit" className="btn btn-primary">
        Найти
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
