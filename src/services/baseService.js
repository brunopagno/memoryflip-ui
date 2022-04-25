import { SESSION_TOKEN_KEY, currentToken, deleteToken } from "./tokenService";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "GET";

  return await handleFetch(targetUrl, method);
}

export async function postRequest(url, data) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "POST";

  return await handleFetch(targetUrl, method, JSON.stringify(data));
}

export async function patchRequest(url, data) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "PATCH";

  return await handleFetch(targetUrl, method, JSON.stringify(data));
}

export async function deleteRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "DELETE";

  return await handleFetch(targetUrl, method);
}

// private

async function handleFetch(url, method, body = null) {
  const result = await fetch(url, { method, ...fetchParams(), body });
  if (result.status === 401) {
    const body = await result.json();
    if (body.error === "token_expired") {
      deleteToken();
      window.location.reload();
    }
  }
  return result;
}

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
