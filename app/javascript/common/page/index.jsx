import React from 'react';
import propTypes from 'prop-types';

import './page.scss';

const Page = ({ children, className }) => (
  <div className={`Page ${className}`}>
    {children}
  </div>
);

Page.propTypes = {
  className: propTypes.string,
};

Page.defaultProps = {
  className: undefined,
};

export default Page;
