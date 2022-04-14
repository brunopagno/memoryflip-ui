import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCards, addCard, removeCard } from "../services/cardsService";

export function Cards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchCards() {
    getCards().then((res) => {
      setCards(res);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCards();
  }, []);

  function handleAdd(ev) {
    ev.preventDefault();
    const form = ev.target;
    const card = {
      front: form.front.value,
      back: form.back.value,
    };
    setIsLoading(true);
    addCard(card).then(() => {
      fetchCards();
      form.reset();
    });
  }

  function handleRemove(id) {
    return function (ev) {
      ev.preventDefault();
      setIsLoading(true);
      removeCard(id).then(() => fetchCards());
    };
  }

  return (
    <>
      <div className="mb-4">
        <h2>Cards</h2>
        <Link className="btn btn-primary" to="/play">
          Play
        </Link>
      </div>

      <h3>Add card</h3>
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                   p-4 mt-6 mb-10 rounded bg-gray-200 shadow-md"
      >
        {cards.length === 0 ? (
          <>... loading</>
        ) : (
          cards.map((card) => (
            <div className="" key={card.id}>
              <span>{card.front}</span> - <span>{card.back}</span>
              <form className="inline mx-2" onSubmit={handleRemove(card.id)}>
                <button
                  className="btn btn-secondary btn-tiny text-sm"
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
  );
}
