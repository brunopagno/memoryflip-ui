import { useEffect, useState } from "react";
import {
  getCollections,
  addCollection,
  removeCollection,
  updateCollection,
} from "../services/collectionsService";
import { Collection } from "../components/Collection";

export function Me() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchCollections() {
    getCollections().then((res) => {
      setCollections(res);
      setIsLoading(false);
    });
  }

  function handleAdd(ev) {
    ev.preventDefault();
    setIsLoading(true);
    addCollection().then(() => fetchCollections());
  }

  function handleRemove(id) {
    return function (ev) {
      ev.preventDefault();
      setIsLoading(true);
      removeCollection(id)
        .then(() => fetchCollections())
        .catch((err) => {
          setError(`Could not remove collection: ${err.message}`);
          setIsLoading(false);
        });
    };
  }

  function handleUpdate(id, collection) {
    setIsLoading(true);
    updateCollection(id, collection).then(() => fetchCollections());
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCollections();
  }, []);

  return (
    <>
      {collections.length === 0 ? (
        <>... loading</>
      ) : (
        <>
          {error && (
            <div className="p-2 border-2 border-red-200 rounded">{error}</div>
          )}
          <form onSubmit={handleAdd}>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              New collection
            </button>
          </form>
          {collections.map((collection) => (
            <Collection
              key={collection.id}
              collection={collection}
              onUpdate={handleUpdate}
              onRemove={handleRemove(collection.id)}
              disabled={isLoading}
            />
          ))}
        </>
      )}
    </>
  );
}
