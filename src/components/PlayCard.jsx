import { useState, useEffect, useRef } from "react";

export function PlayCard({ front, back, next }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  function handleNext() {
    if (isFlipped) {
      next();
      setIsFlipped(false);
    } else {
      setIsFlipped(true);
    }
  }

  function handleMouseDown(e) {
    e.preventDefault();
    if (e.button === 0) {
      handleNext();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowRight" || e.key === " ") {
      handleNext();
    }
  }

  let className =
    "self-center mb-4 text-6xl font-virgil bg-inherit border-b-2 w-full text-center focus:outline-none";
  className += isFlipped ? " flip" : " unflip";

  return (
    <div className="viewport flex justify-center" onMouseDown={handleMouseDown}>
      <input
        ref={input}
        onKeyDown={handleKeyDown}
        className={className}
        value={isFlipped ? back : front}
        readOnly
      />
    </div>
  );
}
