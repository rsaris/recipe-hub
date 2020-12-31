import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

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
        <ButtonLink to="/recipes/new">
          <FontAwesomeIcon icon={faPlus} />
        </ButtonLink>
      </h1>
      <ul>
        {
          recipes.map((recipe) => (
            <li className="ListPage__listing" key={recipe.id}>
              {recipe.title}
              {' '}
              <Link to={`/recipes/${recipe.id}/edit`}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
            </li>
          ))
        }
      </ul>
    </Page>
  );
}
