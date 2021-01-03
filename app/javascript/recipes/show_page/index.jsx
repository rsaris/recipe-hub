import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink, buttonThemes } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes';

import RecipeViewer from '../recipe_viewer';

import './show_page.scss';

export default function ShowPage() {
  const [recipe, setRecipe] = useState(undefined);
  const { recipeId } = useParams();

  const { httpGet } = useHttp();

  useEffect(() => {
    async function loadRecipe() {
      const response = await httpGet(routes.api_recipe_path({ id: recipeId }));
      if (response) {
        setRecipe(response);
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
        <ButtonLink
          theme={buttonThemes.TEXT}
          title="Edit recipe"
          to={routes.editRecipePath(recipe.id)}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </ButtonLink>
      </h1>
      <RecipeViewer recipe={recipe} />
    </Page>
  );
}
