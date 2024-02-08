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

interface GameContextState {
  cards: Card[];
  firstSelection: number | null;
  secondSelection: number | null;
  isMatch: boolean;
  isAnimating: boolean;
  gameIsOver: boolean;
  selectCard: (index: number) => void;
  resetSelections: () => void;
}

const GameContext = createContext<GameContextState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>(cardList);
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [secondSelection, setSecondSelection] = useState<number | null>(null);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [matchesFound, setMatchesFound] = useState<MatchPair[]>([]);

  useEffect(() => {
    // Check if the game is over by comparing the length of matchesFound with winningMatches
    if (matchesFound.length === winningMatches.length) {
      setGameIsOver(true);
    }
  }, [matchesFound]);

  const selectCard = (index: number) => {
    if (isAnimating || firstSelection === index || secondSelection === index)
      return;

    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      setSecondSelection(index);
      setIsAnimating(true); // Prevent further selections during animation

      // Simulate card flip animation delay
      setTimeout(() => {
        const match = winningMatches.some(
          (pair) =>
            pair.includes(firstSelection) &&
            pair.includes(index) &&
            !matchesFound.includes(pair)
        );

        if (match) {
          setMatchesFound((prev) => [...prev, [firstSelection, index]]);
          setIsMatch(true);
        } else {
          setIsMatch(false);
        }

        setIsAnimating(false); // Allow selections again
        setFirstSelection(null);
        setSecondSelection(null);
      }, 1000); // Animation duration
    }
  };

  const resetSelections = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    setIsMatch(false);
  };

  const contextValue: GameContextState = {
    cards,
    firstSelection,
    secondSelection,
    isMatch,
    isAnimating,
    gameIsOver,
    selectCard,
    resetSelections,
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
