import { useEffect, useState } from "react";
import { PlayCard } from "../components/PlayCard";
import { getCards } from "../services/cardsService";

export function Play() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCards("sort=random").then((res) => {
      setCurrentIndex(0);
      setCards(res);
      setIsLoading(false);
    });
  }, []);

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
        <PlayCard
          front={cards[currentIndex].front}
          back={cards[currentIndex].back}
          next={handleNext}
        />
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
