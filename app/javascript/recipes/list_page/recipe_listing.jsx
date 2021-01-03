import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink, buttonSizes, buttonThemes } from 'common/button';

import routes from 'lib/routes';

export default function RecipeListing({ recipe }) {
  return (
    <li className="RecipeListing" key={recipe.id}>
      {recipe.title}
      {' '}
      <ButtonLink
        size={buttonSizes.MD_NO_PADDING}
        theme={buttonThemes.TEXT}
        to={routes.recipePath(recipe.id)}
      >
        <FontAwesomeIcon icon={faEye} />
      </ButtonLink>
      {' '}
      <ButtonLink
        size={buttonSizes.MD_NO_PADDING}
        theme={buttonThemes.TEXT}
        to={routes.editRecipePath(recipe.id)}
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </ButtonLink>
    </li>
  );
}

RecipeListing.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
  }).isRequired,
};
