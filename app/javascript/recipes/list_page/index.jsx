import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink, buttonThemes } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes';

import RecipeListing from './recipe_listing';

import './list_page.scss';

export default function ListPage() {
  const [recipes, setRecipes] = useState([]);

  const { httpGet } = useHttp();

  useEffect(() => {
    async function loadRecipes() {
      const response = await httpGet(routes.api_recipes_path());
      if (response) {
        setRecipes(response);
      }
    }

    loadRecipes();
  }, []);

  return (
    <Page className="ListPage">
      <h1 className="ListPage__header">
        Recipes
        <ButtonLink
          theme={buttonThemes.TEXT}
          title="Create new recipe"
          to={routes.newRecipePath()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </ButtonLink>
      </h1>
      <ul className="ListPage__listings">
        {recipes.map((recipe) => (<RecipeListing key={recipe.id} recipe={recipe} />))}
      </ul>
    </Page>
  );
}
