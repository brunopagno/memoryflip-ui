import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCard } from "../components/PlayCard";
import { getCards } from "../services/cardsService";

export function Play() {
  const urlParams = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCards(urlParams.id, "sort=random")
      .then((res) => {
        setCurrentIndex(0);
        setCards(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [urlParams.id]);

  function handleNext() {
    setCurrentIndex((currentIndex + 1) % cards.length);
  }

  return (
    <>
      <div className="absolute top-16 right-2">
        {currentIndex + 1} / {cards.length}
      </div>
      {isLoading ? (
        <>... loading</>
      ) : (
        <>
          {error ? (
            <div className="viewport flex justify-center">
              <div
                className="self-center mb-4 font-virgil bg-inherit border-b-2 border-red-100 text-red-900
                           w-full text-center focus:outline-none"
              >
                {error}
              </div>
            </div>
          ) : (
            <PlayCard
              front={cards[currentIndex].front}
              back={cards[currentIndex].back}
              next={handleNext}
            />
          )}
        </>
      )}
      <div className="text-xs">
        Font used in this page:{" "}
        <a className="link" href="https://github.com/excalidraw/virgil">
          Virgil
        </a>
      </div>
    </>
  );
}
