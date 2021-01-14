import React, { useEffect, useState } from 'react';

import { Button } from 'common/button';
import Page from 'common/page';

import useHttp from 'hooks/use_http';

import routes from 'lib/routes';
import { toggleTheme } from 'lib/theme';

import './account_page.scss';

function handleToggleDarkModeClick() {
  toggleTheme();
}

export default function AccountPage() {
  const [user, setUser] = useState(undefined);
  const { httpDelete, httpGet } = useHttp();

  async function handleLogOutClick() {
    await httpDelete(routes.api_session_path());
    window.location = routes.root_path(); // Don't use React Router here so we check auth again
  }

  useEffect(() => {
    async function loadUser() {
      const response = await httpGet(routes.api_user_path('current'));
      if (response) {
        setUser(response);
      }
    }

    loadUser();
  }, []);

  if (user === undefined) { return 'Loading...'; }

  return (
    <Page className="AccountPage">
      <h1>Your account</h1>
      <div className="AccountPage__actions">
        <Button onClick={handleToggleDarkModeClick}>
          Toggle dark mode
        </Button>

        <Button onClick={handleLogOutClick}>
          Log out
        </Button>
      </div>
    </Page>
  );
}
