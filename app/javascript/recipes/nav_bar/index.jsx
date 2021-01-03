import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  Button,
  ButtonLink,
  buttonSizes,
  buttonThemes,
} from 'common/button';

import routes from 'lib/routes';
import { toggleTheme } from 'lib/theme';

import './nav_bar.scss';

function handleDarkModeOnClick() {
  toggleTheme();
}

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
        <Button
          size={buttonSizes.XL}
          theme={buttonThemes.TEXT}
          title="Toggle dark mode"
          onClick={handleDarkModeOnClick}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
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
