import { useCallback, useMemo, useState } from 'react';

import { JsonApiDataStore } from 'jsonapi-datastore';

import {
  httpDelete as rawHttpDelete,
  httpGet as rawHttpGet,
  httpPatch as rawHttpPatch,
  httpPost as rawHttpPost,
  httpPut as rawHttpPut,
} from 'lib/http';

function createHttpMethod(setLoading, httpMethod, store) {
  return async (path, body, { includeMeta = false } = {}) => {
    setLoading(true);
    const response = await httpMethod(path, body);
    setLoading(false);

    if (!response) { return null; }

    if (includeMeta) {
      return store.syncWithMeta(response);
    }

    return store.sync(response);
  };
}

export default function useHttp() {
  const [loading, setLoading] = useState(false);

  const store = useMemo(() => new JsonApiDataStore(), []);

  // Special case GET since it has no body
  const httpGet = useCallback(async (path, { includeMeta = false } = {}) => {
    setLoading(true);
    const response = await rawHttpGet(path);
    setLoading(false);

    if (!response) { return null; }

    if (includeMeta) {
      return store.syncWithMeta(response);
    }

    return store.sync(response);
  }, [store]);

  const httpDelete = useCallback(createHttpMethod(setLoading, rawHttpDelete, store), [store]);
  const httpPatch = useCallback(createHttpMethod(setLoading, rawHttpPatch, store), [store]);
  const httpPost = useCallback(createHttpMethod(setLoading, rawHttpPost, store), [store]);
  const httpPut = useCallback(createHttpMethod(setLoading, rawHttpPut, store), [store]);

  return {
    loading,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost,
    httpPut,
    store,
  };
}
