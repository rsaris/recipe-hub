import classnames from 'classnames';
import propTypes from 'prop-types';

export const buttonSizes = {
  SM: 'small',
  MD: 'medium',
  LG: 'large',
  XL: 'x-large',
};

export const buttonThemes = {
  DARK: 'dark',
  PRIMARY: 'primary',
};

export const buttonPropTypes = {
  size: propTypes.oneOf(Object.values(buttonSizes)),
  theme: propTypes.oneOf(Object.values(buttonThemes)),
};

export const buttonDefaultProps = {
  size: buttonSizes.MD,
  theme: buttonThemes.PRIMARY,
};

export function buildClassName(className, size, theme) {
  return classnames(
    'Button', {
      [`${className}`]: className,
      [`Button--${size}`]: size,
      [`Button--${theme}`]: theme,
    },
  );
}
