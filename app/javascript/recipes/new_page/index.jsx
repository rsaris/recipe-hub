import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

import RecipeEditor from '../recipe_editor';

export default function NewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { push } = useHistory();

  const { httpPost } = useHttp();

  async function handleSave(event) {
    event.preventDefault();
    await httpPost(
      routes.api_recipes_path(),
      { data: { attributes: { title, content } } },
    );
    push('/recipes');
  }

  return (
    <Page className="NewPage">
      <RecipeEditor
        buttonText="Create recipe"
        content={content}
        title={title}
        onContentChange={({ target: { value } }) => setContent(value)}
        onSave={handleSave}
        onTitleChange={({ target: { value } }) => setTitle(value)}
      />
    </Page>
  );
}
