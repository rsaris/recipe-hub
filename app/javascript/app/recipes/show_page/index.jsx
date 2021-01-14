import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Button, ButtonLink, buttonThemes } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes';

import RecipeViewer from '../recipe_viewer';

import './show_page.scss';

export default function ShowPage() {
  const [recipe, setRecipe] = useState(undefined);
  const [permissions, setPermissions] = useState(undefined);
  const { recipeId } = useParams();

  const { httpDelete, httpGet } = useHttp();
  const { history } = useHistory();

  async function handleDestroyClick() {
    if (window.confirm('Delete this recipe? This can not be undone.')) {
      await httpDelete(routes.api_recipe_path(recipeId));
      history.push(routes.recipesPath());
    }
  }

  useEffect(() => {
    async function loadRecipe() {
      const response = await httpGet(
        routes.api_recipe_path(
          recipeId,
          { include_permissions: true },
        ),
        { includeMeta: true },
      );

      if (response) {
        setRecipe(response.data);
        setPermissions(response.meta.permissions[recipeId]);
      }
    }

    loadRecipe();

    return () => setRecipe(undefined);
  }, [recipeId]);

  if (recipe === undefined) { return 'Loading ...'; }

  return (
    <Page className="ShowPage">
      <h1 className="ShowPage__title">
        {recipe.title}
        {' '}
        {permissions && (
          <Fragment>
            {permissions.edit && (
              <ButtonLink
                theme={buttonThemes.TEXT}
                title="Edit recipe"
                to={routes.editRecipePath(recipe.id)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonLink>
            )}
            {permissions.destroy && (
              <Button
                theme={buttonThemes.TEXT}
                title="Destroy recipe"
                onClick={handleDestroyClick}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </Fragment>
        )}
      </h1>
      <RecipeViewer recipe={recipe} />
    </Page>
  );
}
