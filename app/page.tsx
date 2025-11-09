"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useGame } from "@/context/GameContext";

import GameCard from "@/components/GameCard";
import IntroScreen from "@/components/IntroScreen";
import EndScreen from "@/components/EndScreen";

import Header from "@/components/Header";

export default function Home() {
  const {
    cards,
    firstSelection,
    secondSelection,
    matchedIndices = [],
    selectCard,
    gameState,
    setGameState,
    imageLoadProgress,
    imagesLoaded,
    currentAnimationCard,
    showAnimation,
  } = useGame();

  const animationOverlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const flipSoundRef = useRef<HTMLAudioElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const introScreenRef = useRef<HTMLDivElement>(null);
  const endScreenRef = useRef<HTMLDivElement>(null);
  const prevFirstSelection = useRef<number | null>(null);
  const prevSecondSelection = useRef<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedCards = useRef<boolean>(false);

  // Handle intro to game transition (triggered by CTA button click)
  const handleStartGame = () => {
    if (
      imagesLoaded &&
      gameState === "intro" &&
      gameBoardRef.current &&
      introScreenRef.current
    ) {
      // Ensure game board is visible but transparent
      gsap.set(gameBoardRef.current, { opacity: 0, zIndex: 40 });

      const tl = gsap.timeline();

      // Crossfade: fade out intro and fade in game board simultaneously
      tl.to(introScreenRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Hide intro screen after fade
          gsap.set(introScreenRef.current, { zIndex: -1 });
        },
      })
        .to(
          gameBoardRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            zIndex: 10,
          },
          "-=0.8" // Start at the same time for true crossfade
        )
        .call(() => {
          setGameState("playing");
        });
    }
  };

  // Play flip sound when a card is selected
  useEffect(() => {
    // Play flip sound when first card is selected
    if (
      firstSelection !== null &&
      prevFirstSelection.current === null &&
      flipSoundRef.current
    ) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch((error) => {
        console.error("Error playing flip sound:", error);
      });
    }

    // Play flip sound when second card is selected
    if (
      secondSelection !== null &&
      prevSecondSelection.current === null &&
      flipSoundRef.current
    ) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch((error) => {
        console.error("Error playing flip sound:", error);
      });
    }

    // Play flip sound when cards flip back (no match)
    if (
      firstSelection === null &&
      secondSelection === null &&
      (prevFirstSelection.current !== null ||
        prevSecondSelection.current !== null) &&
      !showAnimation &&
      flipSoundRef.current
    ) {
      // Small delay to sync with card flip animation
      setTimeout(() => {
        if (flipSoundRef.current) {
          flipSoundRef.current.currentTime = 0;
          flipSoundRef.current.play().catch((error) => {
            console.error("Error playing flip sound:", error);
          });
        }
      }, 100);
    }

    // Update previous values
    prevFirstSelection.current = firstSelection;
    prevSecondSelection.current = secondSelection;
  }, [firstSelection, secondSelection, showAnimation]);

  // Handle animation overlay visibility and audio playback
  useGSAP(
    () => {
      if (
        showAnimation &&
        currentAnimationCard !== null &&
        animationOverlayRef.current
      ) {
        const card = cards[currentAnimationCard];

        // Play audio
        if (card.audio && audioRef.current) {
          audioRef.current.src = card.audio;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }

        // Fade in animation overlay
        gsap.fromTo(
          animationOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.inOut" }
        );
      } else if (!showAnimation && animationOverlayRef.current) {
        // Fade out animation overlay
        gsap.to(animationOverlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });

        // Stop audio
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    },
    { dependencies: [showAnimation, currentAnimationCard, cards] }
  );

  // Vegas-style card distribution animation
  useGSAP(
    () => {
      if (
        gameState === "playing" &&
        cardRefs.current.length > 0 &&
        !hasAnimatedCards.current
      ) {
        // Immediately hide all cards before animation
        const validCardRefs = cardRefs.current.filter(
          (ref): ref is HTMLDivElement => ref !== null
        );

        // Set initial opacity to 0 immediately to hide cards
        validCardRefs.forEach((cardRef) => {
          gsap.set(cardRef, { opacity: 0 });
        });

        // Use requestAnimationFrame to ensure DOM is fully laid out
        requestAnimationFrame(() => {
          if (validCardRefs.length === 0) return;

          // Get the grid container to calculate center position
          const gridContainer = validCardRefs[0]?.parentElement;
          if (!gridContainer) return;

          const containerRect = gridContainer.getBoundingClientRect();
          const centerX = containerRect.width / 2;
          const centerY = containerRect.height / 2;

          // Set initial state: cards start from center with rotation and scale
          validCardRefs.forEach((cardRef) => {
            const cardRect = cardRef.getBoundingClientRect();
            const cardCenterX =
              cardRect.left - containerRect.left + cardRect.width / 2;
            const cardCenterY =
              cardRect.top - containerRect.top + cardRect.height / 2;

            // Calculate offset from center
            const offsetX = centerX - cardCenterX;
            const offsetY = centerY - cardCenterY;

            // Set initial position (centered, scaled down, rotated)
            gsap.set(cardRef, {
              x: offsetX,
              y: offsetY,
              rotation: gsap.utils.random(-180, 180), // Random rotation for each card
              scale: 0,
              opacity: 0, // Keep opacity 0
            });
          });

          // Animate cards to their final positions with stagger
          gsap.to(validCardRefs, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)", // Bouncy ease for card dealing effect
            stagger: {
              amount: 1.2, // Total stagger duration
              from: "random", // Random order for more dynamic effect
            },
            onComplete: () => {
              hasAnimatedCards.current = true;
            },
          });
        });
      }
    },
    { dependencies: [gameState, cards] }
  );

  // Handle game to end screen transition
  useGSAP(
    () => {
      if (
        gameState === "ended" &&
        gameBoardRef.current &&
        endScreenRef.current
      ) {
        // Ensure end screen is visible but transparent
        gsap.set(endScreenRef.current, { opacity: 0, zIndex: 50 });

        const tl = gsap.timeline();

        // Crossfade: fade out game board and fade in end screen simultaneously
        tl.to(gameBoardRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            // Hide game board after fade
            gsap.set(gameBoardRef.current, { zIndex: -1 });
          },
        }).to(
          endScreenRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            zIndex: 50,
          },
          "-=0.8" // Start at the same time for true crossfade
        );
      }
    },
    { dependencies: [gameState] }
  );

  const handleRestart = () => {
    // Reset animation flag
    hasAnimatedCards.current = false;
    // Reset game state
    window.location.reload(); // Simple restart - could be more elegant with state reset
  };

  const animationCard =
    currentAnimationCard !== null ? cards[currentAnimationCard] : null;

  return (
    <div className="flex min-h-screen items-center font-sans relative">
      {/* Audio element for playing match sounds */}
      <audio ref={audioRef} preload="auto" />
      {/* Audio element for card flip sounds */}
      <audio ref={flipSoundRef} preload="auto" src="/audio/flip.mp3" />

      {/* Intro Screen - Always render but control visibility */}
      <div
        ref={introScreenRef}
        className="fixed inset-0 z-50"
        style={{
          opacity: gameState === "intro" ? 1 : 0,
          pointerEvents: gameState === "intro" ? "auto" : "none",
        }}
      >
        <IntroScreen progress={imageLoadProgress} onStart={handleStartGame} />
      </div>

      {/* Game Board - Always render but control visibility */}
      <main
        ref={gameBoardRef}
        className="min-h-screen w-full relative py-4 flex flex-col"
        style={{
          opacity: gameState === "playing" ? 1 : 0,
          pointerEvents: gameState === "playing" ? "auto" : "none",
        }}
      >
        <Header />

        <div className="grid grid-cols-4 w-full max-w-[1120px] mx-auto gap-4 lg:gap-6 relative px-4">
          {cards.map((card, index) => {
            const isFlipped =
              firstSelection === index || secondSelection === index;
            const isMatched = matchedIndices.includes(index);

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ opacity: 0 }}
              >
                <GameCard
                  playCard={card.playCard}
                  matched={card.matched}
                  isFlipped={isFlipped}
                  isMatched={isMatched}
                  onClick={() => selectCard(index)}
                />
              </div>
            );
          })}

          {/* Animation Overlay */}
          {/* <div
            className={`fixed z-40 inset-0 w-full h-full pointer-events-none transition-opacity duration-500 bg-gray-100 ${
              showAnimation && animationCard ? "opacity-80" : "opacity-0"
            }`}
          >
            <Image
              src="/img/bg_temp.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              fill
              priority
              role="presentation"
            />
          </div> */}

          {/* Animation Overlay */}
          {showAnimation && animationCard && (
            <div
              ref={animationOverlayRef}
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <Image
                src={animationCard.animated}
                alt="Match Animation"
                width={1090}
                height={710}
                className="absolute inset-0 w-full h-full object-cover"
                unoptimized // GIFs may need this
              />
            </div>
          )}
        </div>
      </main>

      {/* End Screen - Always render but control visibility */}
      <div
        ref={endScreenRef}
        className="fixed inset-0 z-50"
        style={{
          opacity: gameState === "ended" ? 1 : 0,
          pointerEvents: gameState === "ended" ? "auto" : "none",
        }}
      >
        <EndScreen onRestart={handleRestart} visible={gameState === "ended"} />
      </div>
    </div>
  );
}
