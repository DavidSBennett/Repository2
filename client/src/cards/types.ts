export type CardEffectType = 'damage' | 'block' | 'draw';

export interface CardEffect {
  type: CardEffectType;
  value: number;
}

export interface Card {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: CardEffect[];
}
