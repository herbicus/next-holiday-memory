import React from "react";
import { useGame } from "@/context/GameContext"; // Adjust the import path as necessary
import GameCard from "@/components/GameCard/GameCard";
import { cards } from "@/data/cards";

const Home: React.FC = () => {
  const { selectCard, firstSelection, secondSelection, isAnimating } =
    useGame();

  // Determine if a card is flipped based on the current selections
  const isFlipped = (index: number) => {
    return index === firstSelection || index === secondSelection;
  };

  // Determine if a card is matched (additional logic needed based on your implementation)
  const isMatched = (index: number) => {
    // Placeholder: Implement your logic to determine if the card has been matched.
    // This requires maintaining an array of matched indices or a similar approach in your GameContext.
    return false;
  };

  // Handle click on a card
  const handleCardClick = (index: number) => {
    if (!isAnimating) {
      selectCard(index);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-8">
      <section className="w-full max-w-6xl mx-auto grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <GameCard
            key={index}
            playCard={card.playCard}
            matched={card.matched}
            isFlipped={isFlipped(index)}
            isMatched={isMatched(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
