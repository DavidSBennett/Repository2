import { Card } from '../cards/types';

export type EnemyIntent =
  | { type: 'attack'; value: number }
  | { type: 'defend'; value: number };

export interface PlayerState {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  block: number;
}

export interface EnemyState {
  health: number;
  maxHealth: number;
  block: number;
  intent: EnemyIntent;
}

export interface DeckState {
  drawPile: Card[];
  discardPile: Card[];
  hand: Card[];
}

export interface GameState {
  turn: number;
  player: PlayerState;
  enemy: EnemyState;
  deck: DeckState;
  log: string[];
}

export type GameAction =
  | { type: 'startTurn' }
  | { type: 'endTurn' }
  | { type: 'playCard'; cardId: string }
  | { type: 'discardCard'; cardId: string }
  | { type: 'draw'; amount?: number };
