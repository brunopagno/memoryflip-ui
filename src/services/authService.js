import { postRequest, deleteRequest } from "./baseService";

export function isLoggedIn() {
  return document.cookie.includes("login_ok=true");
}

export async function login(email, password) {
  const response = await postRequest("/session", { email, password });
  if (response.ok) {
    return;
  }
  throw new Error("Failed login");
}

export async function logout() {
  const response = await deleteRequest(`/session`, {});
  if (response.ok) {
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
    return;
  }
  throw new Error("Failed register");
}
