import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js';

import RecipeViewer from '../recipe_viewer';

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

  if (recipe === undefined) { return 'Loading ...' }

  return (
    <Page>
      <RecipeViewer recipe={recipe} />
    </Page>
  );
}
