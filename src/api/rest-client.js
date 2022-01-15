import qs from 'qs';

export const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

function buildUrl(uri, query) {
  let url;

  if (/^https?:\/\//.test(uri)) {
    url = uri;
  } else {
    url = baseUrl + `/${uri}`.replace(/\/{2,}/g, '/');
  }

  let queryString = stringify(query);

  if (typeof queryString === 'string' && queryString.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
  }

  return url;
}

function buildFetchOptions(method, query, body, headers = {}) {
  method = method.toUpperCase();
  headers = typeof headers === 'object' && headers !== null ? headers : {};

  let options = {
    mode: 'cors',
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf8',
      ...headers
    },
    credentials: 'same-origin',
    cache: 'default'
  };

  if (['POST', 'PUT'].indexOf(method) !== -1) {
    if (body instanceof FormData) {
      options.body = body;
    } else if (typeof body === 'object' && body !== null) {
      options.body = JSON.stringify(body);
      options.headers['Accept'] = 'application/json';
      options.headers['Content-Type'] = 'application/json; charset=UTF-8';
    } else if (typeof body === 'string') {
      options.body = body;
    }
  }

  return options;
}

function stringify(from) {
  if (from === null || from === undefined) {
    return null;
  }

  if (from instanceof FormData) {
    return null;
  }

  if (typeof from === 'string') {
    return from;
  }

  if (typeof from === 'object') {
    return qs.stringify(from);
  }

  return null;
}

export default class RestClient {
  request(method, uri, query = null, body = null, headers = {}) {
    let options = buildFetchOptions(method, query, body, headers);
    let url = buildUrl(uri, query);

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            response.json()
              .then(json => {
                reject({
                  response,
                  json,
                  message: json.message || response.statusText
                });
              })
              .catch(() => {
                reject({
                  response,
                  json: null,
                  message: response.statusText
                });
              });

            return;
          }

          response.json()
            .then(resolve)
            .catch(() => {
              reject({
                response,
                json: null,
                message: 'Response not in json format'
              });
            });
        })
        .catch((error) => {
          console.error(error);

          reject({
            response: null,
            json: null,
            message: 'Request failed'
          });
        });
    });
  }

  httpGET(uri, query = null, headers = {}) {
    return this.request('GET', uri, query, null, headers);
  }

  httpPOST(uri, query = null, body = null, headers = {}) {
    return this.request('POST', uri, query, body, headers);
  }

  httpPUT(uri, query = null, body = null, headers = {}) {
    return this.request('PUT', uri, query, body, headers);
  }

  httpDELETE(uri, query, headers = {}) {
    return this.request('DELETE', uri, query, null, headers);
  }
}
