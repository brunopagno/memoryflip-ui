import {
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
} from "./baseService";

export async function getCollections() {
  const response = await getRequest("/collections");
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed get collections");
}

export async function addCollection(collection = { name: "new collection" }) {
  const response = await postRequest("/collections", collection);
  if (response.ok) {
    return;
  }
  throw new Error("Failed add collection");
}

export async function updateCollection(id, collection) {
  const response = await patchRequest(`/collections/${id}`, collection);
  if (response.ok) {
    return;
  }
  throw new Error("Failed update collection");
}

export async function removeCollection(id) {
  const response = await deleteRequest(`/collections/${id}`);
  if (response.ok) {
    return;
  }
  throw new Error("Failed remove collection");
}
