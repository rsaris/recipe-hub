import React from 'react';
import propTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './recipe_viewer.scss';

export default function RecipeViewer({ recipe }) {
  return (
    <div className="RecipeViewer">
      <h1 className="RecipeViewer__title">{recipe.title}</h1>

      <ReactMarkdown>
        {recipe.content}
      </ReactMarkdown>
    </div>
  );
}

RecipeViewer.propTypes = {
  recipe: propTypes.shape({
    content: propTypes.string,
    title: propTypes.string,
  }),
};

RecipeViewer.defaultProps = {
  recipe: {},
};
