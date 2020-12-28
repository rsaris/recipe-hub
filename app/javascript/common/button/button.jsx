import React from 'react';
import propTypes from 'prop-types';

import {
  buildClassName,
  buttonDefaultProps,
  buttonPropTypes,
} from './classes';

import './button.scss';

export default function Button({
  children,
  className,
  size,
  theme,
  ...buttonProps
}) {
  /* eslint-disable react/button-has-type */
  return (
    <button
      className={buildClassName(className, size, theme)}
      {...buttonProps}
    >
      {children}
    </button>
  );
  /* eslint-enable react/button-has-type */
}

Button.propTypes = {
  className: propTypes.string,
  ...buttonPropTypes,
};

Button.defaultProps = {
  className: undefined,
  ...buttonDefaultProps,
};
