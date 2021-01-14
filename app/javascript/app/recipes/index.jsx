import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'lib/routes';

import ListPage from './list_page';
import NewPage from './new_page';
import ShowPage from './show_page';
import EditPage from './edit_page';

export default function RecipeRouter() {
  return (
    <Switch>
      <Route
        exact
        path={routes.newRecipePath()}
      >
        <NewPage />
      </Route>

      <Route
        exact
        path={routes.recipePath(':recipeId')}
      >
        <ShowPage />
      </Route>

      <Route
        exact
        path={routes.editRecipePath(':recipeId')}
      >
        <EditPage />
      </Route>

      <Route
        path={routes.recipesPath()}
      >
        <ListPage />
      </Route>
    </Switch>
  );
}
