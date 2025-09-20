import './CardView.css';
import { Card } from '../cards/types';

interface CardViewProps {
  card: Card;
  canPlay: boolean;
  onPlay: () => void;
  onDiscard: () => void;
}

export function CardView({ card, canPlay, onPlay, onDiscard }: CardViewProps) {
  return (
    <div className="card">
      <div className="card-cost">{card.cost}</div>
      <h3 className="card-name">{card.name}</h3>
      <p className="card-description">{card.description}</p>
      <div className="card-actions">
        <button type="button" onClick={onPlay} disabled={!canPlay}>
          Play
        </button>
        <button type="button" onClick={onDiscard}>
          Discard
        </button>
      </div>
    </div>
  );
}

export default CardView;
