"use client";

import type { Card } from "@/data/cards";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { cards as cardList } from "@/data/cards";

type MatchPair = [number, number];

const winningMatches: MatchPair[] = [
  [0, 10], // TERMINATOR matches
  [1, 5], // EXORCIST matches
  [2, 9], // MISSION IMPOSSIBLE matches
  [3, 15], // KILL BILL matches
  [4, 14], // PINK PANTHER matches
  [6, 13], // JURASSIC PARK matches
  [7, 12], // DEATH STAR matches
  [8, 11], // MATRIX matches
];

type GameState = "intro" | "playing" | "ended";

interface GameContextState {
  cards: Card[];
  firstSelection: number | null;
  secondSelection: number | null;
  isMatch: boolean;
  isAnimating: boolean;
  gameIsOver: boolean;
  selectCard: (index: number) => void;
  resetSelections: () => void;
  matchedIndices?: number[];
  currentAnimationCard: number | null;
  showAnimation: boolean;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  imageLoadProgress: number;
  imagesLoaded: boolean;
}

const GameContext = createContext<GameContextState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [secondSelection, setSecondSelection] = useState<number | null>(null);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [matchesFound, setMatchesFound] = useState<MatchPair[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [currentAnimationCard, setCurrentAnimationCard] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [imageLoadProgress, setImageLoadProgress] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Derive gameIsOver from matchesFound instead of using useEffect
  const gameIsOver = matchesFound.length === winningMatches.length;

  // Preload all images
  useEffect(() => {
    const imageUrls: string[] = [];
    
    // Collect all image URLs from cards
    cardList.forEach((card) => {
      imageUrls.push(card.playCard);
      imageUrls.push(card.animated);
      imageUrls.push(card.matched);
    });
    
    // Also add the card back image
    imageUrls.push("/img/cards.png");

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const progress = (loadedCount / totalImages) * 100;
          setImageLoadProgress(progress);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          const progress = (loadedCount / totalImages) * 100;
          setImageLoadProgress(progress);
          resolve(); // Continue even if some images fail
        };
        img.src = url;
      });
    };

    // Load all images
    Promise.all(imageUrls.map(loadImage)).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const selectCard = (index: number) => {
    // Prevent selection if animating, showing animation, already selected, or already matched
    if (
      isAnimating ||
      showAnimation ||
      firstSelection === index ||
      secondSelection === index ||
      matchedIndices.includes(index)
    )
      return;

    // If no first selection, set it and return
    if (firstSelection === null) {
      setFirstSelection(index);
      return;
    }

    // If we have a first selection, this is the second card
    // Prevent selecting the same card twice
    if (firstSelection === index) {
      return;
    }

    // Set second selection and check for match
    setSecondSelection(index);
    setIsAnimating(true);

    const matchPair = winningMatches.find(
      (pair) => pair.includes(firstSelection) && pair.includes(index)
    );
    const isCurrentSelectionMatch = !!matchPair;

    if (isCurrentSelectionMatch && matchPair) {
      // Don't add to matchedIndices yet - we'll do that after animation starts
      // This keeps cards in their "revealed" state during the match animation
      setMatchesFound((prev) => [...prev, matchPair]);
      setIsMatch(true);
      
      // Delay match animation slightly to let flip sound play
      // This gives the card flip sound time to play before the match animation starts
      setTimeout(() => {
        // Trigger animation - use the first card of the pair for animation
        const animationCardIndex = matchPair[0];
        setCurrentAnimationCard(animationCardIndex);
        setShowAnimation(true);
        
        // Delay resetting selections so cards stay flipped/revealed during animation
        // Also delay showing the matched state (end image) until 1 second after animation starts
        setTimeout(() => {
          // Show matched state first - this ensures cards stay flipped and show matched image
          setMatchedIndices((prev) => [...prev, matchPair[0], matchPair[1]]);
          // Then reset selections - cards will stay flipped because isMatched is now true
          setFirstSelection(null);
          setSecondSelection(null);
        }, 1000); // 1 second after match animation starts
        
        // Hide animation after duration
        const matchedCard = cardList[animationCardIndex];
        const isLastMatch = matchesFound.length + 1 === winningMatches.length;
        
        setTimeout(() => {
          setShowAnimation(false);
          // Small delay before clearing animation card to allow crossfade
          setTimeout(() => {
            setCurrentAnimationCard(null);
            setIsAnimating(false);
            
            // If this was the last match, transition to end screen after animation
            if (isLastMatch) {
              setTimeout(() => {
                setGameState("ended");
              }, 500); // Small delay after crossfade completes
            }
          }, 500); // Crossfade duration
        }, matchedCard.duration);
      }, 300); // Delay to let flip sound play (300ms should be enough for the flip sound)
    } else {
      setIsMatch(false);
      // Reset selections after a short delay if not a match
      setTimeout(() => {
        setIsAnimating(false);
        setFirstSelection(null);
        setSecondSelection(null);
      }, 800); // Default delay for non-matching selection
    }
  };

  const resetSelections = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    setIsMatch(false);
  };

  const contextValue: GameContextState = {
    cards: cardList,
    firstSelection,
    secondSelection,
    isMatch,
    isAnimating,
    gameIsOver,
    selectCard,
    resetSelections,
    matchedIndices,
    currentAnimationCard,
    showAnimation,
    gameState,
    setGameState,
    imageLoadProgress,
    imagesLoaded,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
