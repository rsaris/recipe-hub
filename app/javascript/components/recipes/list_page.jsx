import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

import useHttp from 'components/hooks/use_http';

import routes from 'lib/routes.js.erb';

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
    <div className="page">
      <h1>Recipes</h1>
      {
        recipes.map((recipe) => (
          <ReactMarkdown key={recipe.id}>
            {recipe.content}
          </ReactMarkdown>
        ))
      }
    </div>
  );
}
