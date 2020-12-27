import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ListPage from './list_page';
import NewPage from './new_page';

import './recipes_app.scss';

export default function RecipesApp() {
  return (
    <Switch>
      <Route
        exact
        path="/recipes"
        component={ListPage}
      />

      <Route
        exact
        path="/recipes/new"
        component={NewPage}
      />
    </Switch>
  );
}
