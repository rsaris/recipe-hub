import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

import RecipeEditor from '../recipe_editor';

export default function EditPage() {
  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);

  const { push } = useHistory();
  const { recipeId } = useParams();

  const { httpGet, httpPatch } = useHttp();

  useEffect(() => {
    async function loadRecipe() {
      const response = await httpGet(routes.api_recipe_path({ id: recipeId }));
      if (response) {
        setTitle(response.title);
        setContent(response.content);
      }
    }

    loadRecipe();

    return (() => {
      setContent(undefined);
      setTitle(undefined);
    });
  }, [recipeId]);

  async function handleSave(event) {
    event.preventDefault();
    await httpPatch(
      routes.api_recipe_path({ id: recipeId }),
      { data: { attributes: { title, content } } },
    );
    push('/recipes');
  }

  return (
    <Page className="EditPage">
      <RecipeEditor
        buttonText="Update recipe"
        content={content}
        title={title}
        onContentChange={({ target: { value } }) => setContent(value)}
        onSave={handleSave}
        onTitleChange={({ target: { value } }) => setTitle(value)}
      />
    </Page>
  );
}
