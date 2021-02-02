import React from 'react';
import propTypes from 'prop-types';

import Input from 'common/input';

export default function SearchForm({ onSearchChange }) {
  return (
    <div className="SearchForm">
      <Input autoFocus onChange={onSearchChange} />
    </div>
  );
}

SearchForm.propTypes = {
  onSearchChange: propTypes.func.isRequired,
};
