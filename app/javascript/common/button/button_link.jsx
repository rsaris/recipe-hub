import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  buildClassName,
  buttonDefaultProps,
  buttonPropTypes,
} from './classes';

import './button.scss';

export default function ButtonLink({
  children,
  className,
  size,
  theme,
  ...linkProps
}) {
  return (
    <Link className={buildClassName(className, size, theme)} {...linkProps}>
      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  className: propTypes.string,
  ...buttonPropTypes,
};

ButtonLink.defaultProps = {
  className: undefined,
  ...buttonDefaultProps,
};
