import React, { useEffect, forwardRef, useRef } from "react";
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
  ({ playCard, matched, isFlipped, isMatched, onClick }, ref: any) => {
    const frontside = useRef<HTMLDivElement>(null);
    const backside = useRef<HTMLDivElement>(null);

    useEffect(() => {
      gsap.set([backside.current, frontside.current], {
        backfaceVisibility: "hidden",
      });
    }, []);

    // Animate the card flip
    useEffect(() => {
      const timeline = gsap.timeline();

      if (isFlipped || isMatched) {
        timeline
          .to(frontside.current, {
            ease: "power4.out",
            duration: 0.8,
            rotationY: 0,
          })
          .to(
            backside.current,
            { ease: "power4.out", duration: 0.8, rotationY: 180 },
            0
          );
      } else {
        timeline
          .to(frontside.current, {
            ease: "power4.out",
            duration: 0.6,
            rotationY: -180,
          })
          .to(
            backside.current,
            {
              ease: "power4.out",
              duration: 0.6,
              rotationY: 0,
            },
            0
          );
      }

      // If the card is matched, set the frontside opacity to full (show the matched state)
      if (isMatched) {
        gsap.set(frontside.current, { autoAlpha: 1 });
        gsap.set(backside.current, { autoAlpha: 0 });
      }


    }, [isFlipped, isMatched]);

    return (
      <div
        ref={ref}
        className="relative w-[260px] h-[165px] my-[7px] mx-2.5"
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <div ref={backside} className="absolute inset-0">
          <Image
            src="/img/cards.png"
            alt="Card Backside"
            width={260}
            height={165}
            className="object-cover"
            priority
          />
        </div>
        <div ref={frontside} className="absolute inset-0">
          <Image
            src={isMatched ? matched : playCard}
            alt="Card Frontside"
            width={260}
            height={165}
            className="object-cover"
          />
        </div>
      </div>
    );
  }
);

GameCard.displayName = "GameCard";

export default GameCard;
