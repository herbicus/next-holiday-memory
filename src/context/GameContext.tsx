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
  matchedIndices?: number[];
}

const GameContext = createContext<GameContextState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [secondSelection, setSecondSelection] = useState<number | null>(null);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [matchesFound, setMatchesFound] = useState<MatchPair[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (matchesFound.length === winningMatches.length) {
      setGameIsOver(true);
    }
  }, [matchesFound]);

  const selectCard = (index: number) => {
    if (isAnimating || firstSelection === index || secondSelection === index)
      return;

    const nextSelection =
      firstSelection === null ? setFirstSelection : setSecondSelection;

    nextSelection(index);

    if (firstSelection !== null) {
      setIsAnimating(true);

      const matchPair = winningMatches.find(
        (pair) => pair.includes(firstSelection) && pair.includes(index)
      );
      const isCurrentSelectionMatch = !!matchPair;

      if (isCurrentSelectionMatch && matchPair) {
        // Add matched pair indices to the matchedIndices state
        setMatchedIndices((prev) => [...prev, matchPair[0], matchPair[1]]);
      } else {
      }
      if (isCurrentSelectionMatch) {
        setMatchesFound((prev) => [...prev, matchPair]);
        setIsMatch(true);
        // Set timeout duration based on matched card's duration
        const matchedCardDuration = cardList[firstSelection].duration;
        setIsAnimating(false);
        setFirstSelection(null);
        setSecondSelection(null);
      } else {
        setIsMatch(false);
        // Reset selections after a short delay if not a match
        setTimeout(() => {
          setIsAnimating(false);
          setFirstSelection(null);
          setSecondSelection(null);
        }, 800); // Default delay for non-matching selection
      }
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
