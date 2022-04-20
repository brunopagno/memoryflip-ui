import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCards, addCard, removeCard } from "../services/cardsService";

export function Collection({ collection, onUpdate, onRemove, disabled }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [collectionName, setCollectionName] = useState(collection.name);

  function fetchCards(id) {
    getCards(id).then((res) => {
      setCards(res);
      setIsLoading(false);
    });
  }

  function handleAdd(ev) {
    ev.preventDefault();
    const form = ev.target;
    const card = {
      front: form.front.value,
      back: form.back.value,
      collection_id: collection.id,
    };
    setIsLoading(true);
    addCard(card).then(() => {
      fetchCards(collection.id);
      form.reset();
    });
  }

  function handleRemove(id) {
    return function (ev) {
      ev.preventDefault();
      setIsLoading(true);
      removeCard(id).then(() => fetchCards(collection.id));
    };
  }

  function handleCollectionNameChange(ev) {
    setCollectionName(ev.target.value);
  }

  function handleCollectionNameSubmit(ev) {
    ev.preventDefault();
    onUpdate(collection.id, collectionName);
  }

  useEffect(() => {
    if (isExpanded) {
      setIsLoading(true);
      fetchCards(collection.id);
    }
  }, [collection.id, isExpanded]);

  return (
    <div
      className="my-2 p-4 rounded bg-gray-200 shadow-md 
                  border-indigo-100 border-t-2 border-b-2 border-l-2 border-r-2"
    >
      <div>
        {isExpanded ? (
          <form className="inline mx-2" onSubmit={handleCollectionNameSubmit}>
            <input
              type="text"
              value={collectionName}
              onChange={handleCollectionNameChange}
            />
            <button className="btn btn-tiny">Save</button>
          </form>
        ) : (
          <span>{collectionName}</span>
        )}

        <form className="inline mx-2" onSubmit={onRemove}>
          <button className="btn btn-secondary btn-tiny" type="submit" disabled={disabled}>
            ×
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-between">
        <Link className="btn btn-primary" to={`/play/${collection.id}`}>
          Play
        </Link>

        <a
          className="text-right link"
          href="#"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          expand
        </a>
      </div>

      {isExpanded && (
        <>
          <div className="my-4 border-t-2 border-indigo-200"></div>
          <div>
            <div>
              <form className="max-w-xl" onSubmit={handleAdd}>
                <label>
                  Front:
                  <input
                    className="form-field"
                    name="front"
                    type="text"
                    disabled={isLoading}
                  />
                </label>
                <label>
                  Back:
                  <input
                    className="form-field"
                    name="back"
                    type="text"
                    disabled={isLoading}
                  />
                </label>
                <button
                  className="btn btn-secondary"
                  type="submit"
                  disabled={isLoading}
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {cards.length === 0 ? (
              <>... loading</>
            ) : (
              cards.map((card) => (
                <div key={card.id}>
                  <span>{card.front}</span> - <span>{card.back}</span>
                  <form
                    className="inline mx-2"
                    onSubmit={handleRemove(card.id)}
                  >
                    <button
                      className="btn btn-secondary btn-tiny"
                      type="submit"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}