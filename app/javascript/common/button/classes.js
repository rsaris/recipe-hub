import classnames from 'classnames';
import propTypes from 'prop-types';

export const buttonSizes = {
  SM: 'small',
  SM_NO_PADDING: 'small-no-padding',
  MD: 'medium',
  MD_NO_PADDING: 'medium-no-padding',
  LG: 'large',
  LG_NO_PADDING: 'large-no-padding',
  XL: 'x-large',
  XL_NO_PADDING: 'x-large-no-padding',
  NONE: 'none',
};

export const buttonThemes = {
  DARK: 'dark',
  PRIMARY: 'primary',
  TEXT: 'text',
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
