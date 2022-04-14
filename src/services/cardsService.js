import { getRequest, postRequest, deleteRequest } from "./baseService";

export async function getCards(querystring) {
  const response = await getRequest(`/cards?${querystring}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed get cards");
}

export async function addCard(card) {
  const response = await postRequest("/cards", card);
  if (response.ok) {
    return;
  }
  throw new Error("Failed add card");
}

export async function removeCard(id) {
  const response = await deleteRequest(`/cards/${id}`);
  if (response.ok) {
    return;
  }
  throw new Error("Failed remove card");
}
