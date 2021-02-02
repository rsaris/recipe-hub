import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import './input.scss';

export default function Input({ className, ...inputProps }) {
  return (
    <input
      className={classnames('Input', { [`${className}`]: className })}
      {...inputProps}
    />
  );
}

Input.propTypes = {
  className: propTypes.string,
};

Input.defaultProps = {
  className: undefined,
};
