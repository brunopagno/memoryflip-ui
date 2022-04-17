import { SESSION_TOKEN_KEY, currentToken } from "./tokenService";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "GET";

  return await fetch(targetUrl, {
    method,
    ...fetchParams(),
  });
}

export async function postRequest(url, data) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "POST";

  return await fetch(targetUrl, {
    method,
    ...fetchParams(),
    body: JSON.stringify(data),
  });
}

export async function deleteRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "DELETE";

  return await fetch(targetUrl, {
    method,
    ...fetchParams(),
  });
}

// private

function fetchParams() {
  const params = {
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = currentToken();
  if (token) {
    params.headers[SESSION_TOKEN_KEY] = token;
  }

  return params;
}
