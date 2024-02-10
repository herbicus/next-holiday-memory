import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import { useGame } from "@/context/GameContext"; // Adjust the import path as necessary
import GameCard from "@/components/GameCard/GameCard";
import { cards } from "@/data/cards";

import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";

const HomePage: React.FC = () => {
  const {
    selectCard,
    firstSelection,
    secondSelection,
    isAnimating,
    matchedIndices = [],
  } = useGame();

  const [currentMatchedGif, setCurrentMatchedGif] = useState<string | null>(
    null
  );
  const matchedGifRef = useRef<HTMLDivElement>(null);

  const isFlipped = (index: number) =>
    index === firstSelection || index === secondSelection;

  const handleCardClick = (index: number) => !isAnimating && selectCard(index);

  useEffect(() => {
    if (matchedIndices.length && matchedIndices.length % 2 === 0) {
      // Ensure we work with pairs
      // Assuming the match detection logic correctly updates matchedIndices
      const [firstMatchIdx, secondMatchIdx] = matchedIndices.slice(-2);
      const matchedCard = cards[firstMatchIdx]; // Assuming both cards have the same animation
      console.log("matchedCard, ", matchedCard);
      if (matchedCard && matchedCard.animated) {
        setCurrentMatchedGif(matchedCard.animated);

        // Immediately show the GIF overlay
        gsap.set(matchedGifRef.current, { autoAlpha: 1 });

        // Hide the GIF after its duration
        setTimeout(() => {
          gsap.set(matchedGifRef.current, { autoAlpha: 0 });
          // Optionally reset currentMatchedGif to ensure it can trigger again
          setCurrentMatchedGif(null);
        }, matchedCard.duration);
      }
    }
  }, [matchedIndices]); // Dependency on matchedIndices ensures this effect runs when matches update

  return (
    <Main meta={<Meta />}>
      <section className="flex min-h-screen flex-col items-center justify-between py-24">
        <div className="relative w-full max-w-[1090px] mx-auto grid grid-cols-4">
          {cards.map((card, index) => (
            <GameCard
              key={index}
              playCard={card.playCard}
              matched={card.matched}
              isFlipped={isFlipped(index)}
              isMatched={matchedIndices?.includes(index) || false}
              onClick={() => handleCardClick(index)}
            />
          ))}

          <div
            ref={matchedGifRef}
            className="absolute inset-0 z-50 opacity-0 pointer-events-none"
          >
            <Image
              src={currentMatchedGif || "/img/cards.png"}
              alt="Matched Animation"
              width={1090}
              height={710}
            />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default HomePage;
