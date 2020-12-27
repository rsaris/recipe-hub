import React, { useEffect, useState, Fragment } from 'react';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

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
      <h1>Recipes <Link to="/recipes/new">+</Link></h1>
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
