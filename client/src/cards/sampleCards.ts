import { Card } from './types';

export const starterDeck: Card[] = [
  {
    id: 'strike-1',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    effects: [{ type: 'damage', value: 6 }],
  },
  {
    id: 'strike-2',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    effects: [{ type: 'damage', value: 6 }],
  },
  {
    id: 'strike-3',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    effects: [{ type: 'damage', value: 6 }],
  },
  {
    id: 'strike-4',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    effects: [{ type: 'damage', value: 6 }],
  },
  {
    id: 'strike-5',
    name: 'Strike',
    description: 'Deal 6 damage.',
    cost: 1,
    effects: [{ type: 'damage', value: 6 }],
  },
  {
    id: 'defend-1',
    name: 'Defend',
    description: 'Gain 5 block.',
    cost: 1,
    effects: [{ type: 'block', value: 5 }],
  },
  {
    id: 'defend-2',
    name: 'Defend',
    description: 'Gain 5 block.',
    cost: 1,
    effects: [{ type: 'block', value: 5 }],
  },
  {
    id: 'defend-3',
    name: 'Defend',
    description: 'Gain 5 block.',
    cost: 1,
    effects: [{ type: 'block', value: 5 }],
  },
  {
    id: 'focus',
    name: 'Focus',
    description: 'Draw 2 cards.',
    cost: 1,
    effects: [{ type: 'draw', value: 2 }],
  },
  {
    id: 'heavy-blow',
    name: 'Heavy Blow',
    description: 'Deal 12 damage.',
    cost: 2,
    effects: [{ type: 'damage', value: 12 }],
  },
];
