import './App.css';
import Hand from './components/Hand';
import { starterDeck } from './cards/sampleCards';
import { useGameState } from './state/useGameState';

function App() {
  const { state, startTurn, endTurn, playCard, discardCard, drawCards } = useGameState(starterDeck);
  const { player, enemy, deck, log, turn } = state;

  const enemyIntentDescription =
    enemy.intent.type === 'attack'
      ? `Attacking for ${enemy.intent.value}`
      : `Defending for ${enemy.intent.value}`;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Deck Builder Prototype</h1>
        <span className="turn-indicator">Turn {turn}</span>
      </header>

      <section className="board">
        <div className="panel player-panel">
          <h2>Player</h2>
          <p>
            Health: {player.health} / {player.maxHealth}
          </p>
          <p>
            Energy: {player.energy} / {player.maxEnergy}
          </p>
          <p>Block: {player.block}</p>
        </div>
        <div className="panel enemy-panel">
          <h2>Enemy</h2>
          <p>
            Health: {enemy.health} / {enemy.maxHealth}
          </p>
          <p>Block: {enemy.block}</p>
          <p>Intent: {enemyIntentDescription}</p>
        </div>
        <div className="panel deck-panel">
          <h2>Deck</h2>
          <p>Draw pile: {deck.drawPile.length}</p>
          <p>Discard pile: {deck.discardPile.length}</p>
        </div>
      </section>

      <section className="controls">
        <button type="button" onClick={() => drawCards(1)}>
          Draw 1
        </button>
        <button type="button" onClick={startTurn}>
          Start Turn
        </button>
        <button type="button" onClick={endTurn}>
          End Turn
        </button>
      </section>

      <section className="hand-section">
        <h2>Hand</h2>
        <Hand cards={deck.hand} energy={player.energy} onPlay={playCard} onDiscard={discardCard} />
      </section>

      <section className="log-section">
        <h2>Combat Log</h2>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
