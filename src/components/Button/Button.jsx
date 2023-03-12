import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <div className={css.ButtonOverlay}>
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
