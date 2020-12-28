import React from 'react';
import propTypes from 'prop-types';

import './page.scss';

const Page = ({ children, className }) => (
  <div className={`Page ${className}`}>
    {children}
  </div>
);

Page.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
};

Page.defaultProps = {
  children: undefined,
  className: undefined,
};

export default Page;
