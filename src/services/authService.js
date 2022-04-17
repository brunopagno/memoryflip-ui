import { postRequest, deleteRequest } from "./baseService";
import { SESSION_TOKEN_KEY, saveToken, deleteToken } from "./tokenService";

export function isLoggedIn() {
  return localStorage.getItem(SESSION_TOKEN_KEY) !== null;
}

export async function login(email, password) {
  const response = await postRequest("/session", { email, password });
  if (response.ok) {
    await saveToken(response);
    return;
  }
  throw new Error("Failed login");
}

export async function logout() {
  const response = await deleteRequest(`/session`, {});
  if (response.ok) {
    deleteToken();
    return;
  }
  throw new Error("Failed logout");
}

export async function register(email, password, passwordConfirmation) {
  const response = await postRequest("/users", {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

  if (response.ok) {
    await saveToken(response);
    return;
  }
  throw new Error("Failed sign up");
}
