import { useReducer } from 'react';
import { Card } from '../cards/types';
import { createInitialState, gameReducer } from './gameState';
import { GameState } from './types';

export interface GameControls {
  state: GameState;
  startTurn: () => void;
  endTurn: () => void;
  playCard: (cardId: string) => void;
  discardCard: (cardId: string) => void;
  drawCards: (amount?: number) => void;
}

export function useGameState(initialDeck: Card[]): GameControls {
  const [state, dispatch] = useReducer(gameReducer, initialDeck, createInitialState);

  return {
    state,
    startTurn: () => dispatch({ type: 'startTurn' }),
    endTurn: () => dispatch({ type: 'endTurn' }),
    playCard: (cardId: string) => dispatch({ type: 'playCard', cardId }),
    discardCard: (cardId: string) => dispatch({ type: 'discardCard', cardId }),
    drawCards: (amount?: number) => dispatch({ type: 'draw', amount }),
  };
}
