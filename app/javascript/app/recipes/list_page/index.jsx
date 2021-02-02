import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink, buttonThemes } from 'common/button';
import Page from 'common/page';

import useDebouncedSearch from 'hooks/use_debounced_search';

import routes from 'lib/routes';

import RecipeListing from './recipe_listing';
import SearchForm from './search_form';

import './list_page.scss';

export default function ListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { results: recipes } = useDebouncedSearch(
    routes.api_recipes_path(),
    searchTerm,
  );

  function handleSearchChange({ target: { value } }) {
    setSearchTerm(value);
  }

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
      <SearchForm onSearchChange={handleSearchChange} />
      <ul className="ListPage__listings">
        {recipes.map((recipe) => (<RecipeListing key={recipe.id} recipe={recipe} />))}
      </ul>
    </Page>
  );
}
