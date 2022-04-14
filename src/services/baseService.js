const BASE_URL = `http://${process.env.REACT_APP_API_BASE_URL}`;

const FETCH_PARAMS = {
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function getRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "GET";

  return await fetch(targetUrl, {
    method,
    ...FETCH_PARAMS,
  });
}

export async function postRequest(url, data) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "POST";

  return await fetch(targetUrl, {
    method,
    ...FETCH_PARAMS,
    body: JSON.stringify(data),
  });
}

export async function deleteRequest(url) {
  const targetUrl = `${BASE_URL}${url}`;
  const method = "DELETE";

  return await fetch(targetUrl, {
    method,
    ...FETCH_PARAMS,
  });
}
