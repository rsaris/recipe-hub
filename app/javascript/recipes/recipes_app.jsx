import React from 'react';

import { Route, Switch } from 'react-router-dom';

import EditPage from './edit_page';
import ListPage from './list_page';
import NewPage from './new_page';

import './recipes_app.scss';

export default function RecipesApp() {
  return (
    <Switch>
      <Route
        exact
        path="/recipes"
      >
        <ListPage />
      </Route>

      <Route
        exact
        path="/recipes/new"
      >
        <NewPage />
      </Route>

      <Route
        exact
        path="/recipes/:recipeId/edit"
      >
        <EditPage />
      </Route>
    </Switch>
  );
}
