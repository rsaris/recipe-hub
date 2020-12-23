import ReactDOM from 'react-dom';
import React from 'react';

import { ListPage } from 'components/recipes';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListPage />,
    document.body.appendChild(document.createElement('div')),
  );
});
