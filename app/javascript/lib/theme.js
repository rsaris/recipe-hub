import cookie from 'cookie_js';

export const COOKIE_KEY = 'theme';

export const COOKIE_VALUE_DARK = 'dark';
export const COOKIE_VALUE_LIGHT = 'light';

export function getTheme() {
  return cookie.get(COOKIE_KEY) || COOKIE_VALUE_LIGHT;
}

export function setBodyTheme() {
  document.getElementsByTagName('body')[0].dataset.theme = getTheme();
}

export function toggleTheme() {
  cookie.set(
    COOKIE_KEY,
    getTheme() === COOKIE_VALUE_LIGHT ? COOKIE_VALUE_DARK : COOKIE_VALUE_LIGHT,
    { expires: 365, path: '/' },
  );
  setBodyTheme();
}
