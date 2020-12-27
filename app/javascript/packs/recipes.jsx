import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RecipesApp from 'recipes';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.createElement('div')
  appElement.classList.add('RecipesApp');

  ReactDOM.render(
    <BrowserRouter>
      <RecipesApp />
    </BrowserRouter>,
    document.body.appendChild(appElement),
  );
});
