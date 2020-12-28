import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, buttonSizes, buttonThemes } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes.js.erb';

import './new_page.scss';

export default function NewPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { push } = useHistory();

  const { httpPost } = useHttp();

  async function handleSubmit(event) {
    event.preventDefault();
    await httpPost(
      routes.api_recipes_path(),
      { data: { attributes: { title, content } } },
    );
    push('/recipes');
  }

  return (
    <Page className="NewPage">
      <form className="NewPage__form" onSubmit={handleSubmit}>
        <input
          className="NewPage__title"
          placeholder="New recipe"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <textarea
          className="NewPage__content"
          placeholder="Enter your recipe!"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <Button
          disabled={!title || !content}
          size={buttonSizes.XL}
          theme={buttonThemes.DARK}
          type="submit"
        >
          Create recipe
        </Button>
      </form>
    </Page>
  );
}
