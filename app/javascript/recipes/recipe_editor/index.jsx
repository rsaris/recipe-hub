import React from 'react';
import propTypes from 'prop-types';

import { Button, buttonSizes, buttonThemes } from 'common/button';

import './recipe_editor.scss';

export default function RecipeEditor({
  buttonText,
  content,
  title,
  onContentChange,
  onSave,
  onTitleChange,
}) {
  return (
    <form className="RecipeEditor" onSubmit={onSave}>
      <input
        className="RecipeEditor__title"
        placeholder="Recipe title"
        value={title}
        onChange={onTitleChange}
      />
      <textarea
        className="RecipeEditor__content"
        placeholder="Enter your recipe!"
        value={content}
        onChange={onContentChange}
      />
      <Button
        className="RecipeEditor__submit"
        disabled={!title || !content}
        size={buttonSizes.XL}
        theme={buttonThemes.DARK}
        type="submit"
      >
        {buttonText}
      </Button>
    </form>
  )
}

RecipeEditor.propTypes = {
  buttonText: propTypes.string,
  content: propTypes.string,
  title: propTypes.string,
  onContentChange: propTypes.func,
  onSave: propTypes.func,
  onTitleChange: propTypes.func,
};

RecipeEditor.defaultProps = {
  buttonText: 'Save recipe',
  content: undefined,
  title: undefined,
  onContentChange: undefined,
  onSave: undefined,
  onTitleChange: undefined,
};
