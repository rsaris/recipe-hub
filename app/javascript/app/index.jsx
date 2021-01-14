import React, { Fragment } from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import routes from 'lib/routes';

import NavBar from './nav_bar';

import AccountRouter from './account';
import RecipeRouter from './recipes';

import './app.scss';

export default function RecipesApp() {
  return (
    <Fragment>
      <NavBar />
      <div className="App__content">
        <Switch>
          <Route path={routes.accountPath()}>
            <AccountRouter />
          </Route>

          <Route path={routes.recipesPath()}>
            <RecipeRouter />
          </Route>

          <Route>
            <Redirect to={routes.recipesPath()} />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}
