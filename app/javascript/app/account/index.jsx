import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'lib/routes';

import AccountPage from './account_page';

export default function RecipeRouter() {
  return (
    <Switch>
      <Route
        exact
        path={routes.accountPath()}
      >
        <AccountPage />
      </Route>
    </Switch>
  );
}
