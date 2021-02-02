import { useCallback, useEffect, useState } from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import useHttp from './use_http';

const DEFAULT_DEBOUNCE_TIME = 500;

export default function useDebouncedSearch(
  path,
  searchTerm,
  searchKey = 'search',
  debounceTime = DEFAULT_DEBOUNCE_TIME,
) {
  const { httpGet, loading } = useHttp();
  const [results, setResults] = useState([]);

  const search = useCallback(
    async (searchTermParam) => {
      // TODO Find a better way to do this?
      let searchPath;
      if (path.indexOf('?') >= 0) {
        searchPath = `${path}&${searchKey}=${searchTermParam}`;
      } else {
        searchPath = `${path}?${searchKey}=${searchTermParam}`;
      }
      const response = await httpGet(searchPath);
      if (response) { setResults(response); }
    },
    [httpGet, path, searchKey],
  );
  const debouncedSearch = useCallback(
    AwesomeDebouncePromise(search, debounceTime),
    [search, debounceTime],
  );
  useEffect(
    () => {
      debouncedSearch(searchTerm);
    },
    [debouncedSearch, searchTerm],
  );

  return {
    loading,
    results,
  };
}
