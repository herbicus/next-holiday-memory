import React, { useEffect, forwardRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface GameCardProps {
  playCard: string;
  matched: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ playCard, matched, isFlipped, isMatched, onClick }, ref) => {
    // Use a function to determine the image URL
    const getImageUrl = () => {
      if (isMatched) return matched;
      if (isFlipped) return playCard;
      return "/img/cards.png";
    };

    const imageUrl = getImageUrl();

    // Trigger the flip animation when isFlipped or isMatched changes
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        gsap.to(ref.current, {
          rotationY: isFlipped || isMatched ? 180 : 0,
          ease: "back.out(1.7)",
          duration: 0.8,
        });
      }
    }, [isFlipped, isMatched, ref]);

    const handleClick = () => {
      if (!isMatched) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className="relative w-[260px] h-[165px]"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <Image
          src={imageUrl}
          alt={isFlipped ? "Card Frontside" : "Card Backside"}
          className="object-cover absolute w-full h-full"
          layout="fill"
          priority
        />
      </div>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;

// import React from "react";
// import Image from "next/image";

// interface GameCardProps {
//   playCard: string;
//   matched: string;
//   isFlipped: boolean;
//   isMatched: boolean;
//   onClick: () => void; // This function would be passed down from the parent component
// }

// const GameCard: React.FC<GameCardProps> = ({
//   playCard,
//   matched,
//   isFlipped,
//   isMatched,
//   onClick,
// }) => {
//   // Determine which image to display
//   const imageUrl = isMatched
//     ? matched
//     : isFlipped
//       ? playCard
//       : "/img/cards.png";

//   // TODO: instead of "flipClass", we want to use GSAP.to() and flip the <figure>
//   // flipping only if the cards haven't matched. When two cards are matched, they never
//   // flip or can be interacted with
//   const flipClass = isFlipped ? "flip-class" : "";

//   return (
//     <figure className="relative" onClick={onClick} role="button">
//       <Image
//         src={imageUrl}
//         alt={isFlipped ? "Card Frontside" : "Card Backside"}
//         className={`${isMatched ? "matched-class" : ""}`}
//         width={260}
//         height={165}
//         priority
//       />
//       <figcaption className="sr-only">
//         {isFlipped ? "Card Frontside" : "Card Backside"}
//       </figcaption>
//     </figure>
//   );
// };

// export default GameCard;
