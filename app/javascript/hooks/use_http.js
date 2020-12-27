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
  return async (path, body) => {
    setLoading(true);
    const response = await httpMethod(path, body);
    setLoading(false);
    return store.sync(response);
  };
}

export default function useHttp() {
  const [loading, setLoading] = useState(false);

  const store = useMemo(() => new JsonApiDataStore(), []);

  const httpDelete = useCallback(createHttpMethod(setLoading, rawHttpDelete, store), [store]);
  const httpGet = useCallback(createHttpMethod(setLoading, rawHttpGet, store), [store]);
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
