import React, { useEffect, useState, Fragment } from 'react';

import ReactMarkdown from 'react-markdown';

import { ButtonLink } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

import './list_page.scss';

function renderRecipe(recipe) {
  return `# ${recipe.title}\n${recipe.content}`;
}

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
        <ButtonLink to="/recipes/new">+</ButtonLink>
      </h1>
      {
        recipes.map((recipe) => (
          <Fragment key={recipe.id}>
            <ReactMarkdown>
              {renderRecipe(recipe)}
            </ReactMarkdown>
            <hr />
          </Fragment>
        ))
      }
    </Page>
  );
}
