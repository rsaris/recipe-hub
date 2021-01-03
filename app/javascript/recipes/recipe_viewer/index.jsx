import React from 'react';
import propTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './recipe_viewer.scss';

export default function RecipeViewer({ recipe }) {
  return (
    <ReactMarkdown className="RecipeViewer">
      {recipe.content}
    </ReactMarkdown>
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
