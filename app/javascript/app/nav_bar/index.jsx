import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

import {
  ButtonLink,
  buttonSizes,
  buttonThemes,
} from 'common/button';

import routes from 'lib/routes';

import './nav_bar.scss';

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="NavBar__left">
        <ButtonLink
          size={buttonSizes.XL_NO_PADDING}
          theme={buttonThemes.TEXT}
          title="View all recipes"
          to={routes.recipesPath()}
        >
          <FontAwesomeIcon icon={faHome} />
        </ButtonLink>
      </div>
      <div className="NavBar__right">
        <ButtonLink
          size={buttonSizes.XL}
          theme={buttonThemes.TEXT}
          title="Account page"
          to={routes.accountPath()}
        >
          <FontAwesomeIcon icon={faUser} />
        </ButtonLink>
        <ButtonLink
          size={buttonSizes.XL_NO_PADDING}
          theme={buttonThemes.TEXT}
          title="Create new recipe"
          to={routes.newRecipePath()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </ButtonLink>
      </div>
    </div>
  );
}
