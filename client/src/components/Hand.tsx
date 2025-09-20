import './Hand.css';
import { Card } from '../cards/types';
import CardView from './CardView';

interface HandProps {
  cards: Card[];
  energy: number;
  onPlay: (cardId: string) => void;
  onDiscard: (cardId: string) => void;
}

export function Hand({ cards, energy, onPlay, onDiscard }: HandProps) {
  if (cards.length === 0) {
    return <p className="hand-empty">Your hand is empty.</p>;
  }

  return (
    <div className="hand">
      {cards.map((card) => (
        <CardView
          key={card.id}
          card={card}
          canPlay={energy >= card.cost}
          onPlay={() => onPlay(card.id)}
          onDiscard={() => onDiscard(card.id)}
        />
      ))}
    </div>
  );
}

export default Hand;
