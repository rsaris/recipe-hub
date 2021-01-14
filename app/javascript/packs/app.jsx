import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from 'app';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.createElement('div');
  appElement.classList.add('App');

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.body.appendChild(appElement),
  );
});
