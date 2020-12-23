const statuses = {
  UNKNOWN: -1,
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

async function callFetch(path, request) {
  const response = await fetch(path, request);

  if (response.status === statuses.NO_CONTENT) { return null; }

  if (response.ok) { return response.json(); }

  throw response.statusText;
}

function getCSRFParam() {
  return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

function buildRequest(method, body) {
  return {
    body: JSON.stringify(body),
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHTTPRequest',
      'X-CSRF-Token': getCSRFToken(),
    },
    method,
  };
}

function httpDelete(path, body) {
  return callFetch(path, buildRequest('DELETE', body));
}

function httpGet(path) {
  return callFetch(path, buildRequest('GET'));
}

function httpPatch(path, body) {
  return callFetch(path, buildRequest('PATCH', body));
}

function httpPost(path, body) {
  return callFetch(path, buildRequest('POST', body));
}

function httpPut(path, body) {
  return callFetch(path, buildRequest('PUT', body));
}

export {
  getCSRFParam,
  getCSRFToken,
  buildRequest,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  httpPut,
};
