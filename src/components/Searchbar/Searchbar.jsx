import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [searchedName, setSearchedName] = useState(() => '');

  const handleInputChangeName = event => {
    const { value } = event.currentTarget;
    setSearchedName(value.trim().toLowerCase());
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (searchedName === '') {
      toast.error('Search field should not be empty!');
      return;
    }
    onSubmit(searchedName);
    form.reset();
    reset();
  };

  const reset = () => {
    setSearchedName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <BsSearch className={css.SearchFormButtonIcon} />
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChangeName}
        ></input>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};
