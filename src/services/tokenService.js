export const SESSION_TOKEN_KEY = "X-Session-Token";

export function currentToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY);
}

export async function saveToken(response) {
  const result = await response.json();
  localStorage.setItem(SESSION_TOKEN_KEY, result.token);
}

export function deleteToken() {
  localStorage.removeItem(SESSION_TOKEN_KEY);
}
