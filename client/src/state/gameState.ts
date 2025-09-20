import { Card } from '../cards/types';
import { DeckState, EnemyIntent, EnemyState, GameAction, GameState, PlayerState } from './types';

const HAND_SIZE = 5;

function shuffle(cards: Card[]): Card[] {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createPlayer(): PlayerState {
  return {
    health: 80,
    maxHealth: 80,
    energy: 3,
    maxEnergy: 3,
    block: 0,
  };
}

function createEnemy(): EnemyState {
  return {
    health: 60,
    maxHealth: 60,
    block: 0,
    intent: { type: 'attack', value: 8 },
  };
}

function drawCards(deck: DeckState, count: number) {
  let drawPile = [...deck.drawPile];
  let discardPile = [...deck.discardPile];
  const hand = [...deck.hand];
  const drawn: Card[] = [];
  const log: string[] = [];

  for (let i = 0; i < count; i += 1) {
    if (drawPile.length === 0) {
      if (discardPile.length === 0) {
        if (drawn.length === 0) {
          log.push('No cards left to draw.');
        }
        break;
      }
      drawPile = shuffle(discardPile);
      discardPile = [];
      log.push('Shuffled discard pile into draw pile.');
    }
    const card = drawPile.shift();
    if (!card) {
      break;
    }
    hand.push(card);
    drawn.push(card);
    log.push(`Drew ${card.name}.`);
  }

  return {
    deck: {
      drawPile,
      discardPile,
      hand,
    },
    drawn,
    log,
  };
}

function applyDamageToEnemy(enemy: EnemyState, amount: number) {
  const blocked = Math.min(enemy.block, amount);
  const remaining = amount - blocked;
  const block = enemy.block - blocked;
  const health = Math.max(0, enemy.health - remaining);
  return {
    enemy: { ...enemy, block, health },
    blocked,
    damageDealt: remaining,
  };
}

function applyDamageToPlayer(player: PlayerState, amount: number) {
  const blocked = Math.min(player.block, amount);
  const remaining = amount - blocked;
  const block = player.block - blocked;
  const health = Math.max(0, player.health - remaining);
  return {
    player: { ...player, block, health },
    blocked,
    damageTaken: remaining,
  };
}

function generateEnemyIntent(): EnemyIntent {
  const roll = Math.random();
  if (roll < 0.6) {
    const damage = 6 + Math.floor(Math.random() * 6);
    return { type: 'attack', value: damage };
  }
  const block = 5 + Math.floor(Math.random() * 4);
  return { type: 'defend', value: block };
}

export function createInitialState(deckCards: Card[]): GameState {
  const shuffled = shuffle(deckCards);
  const initialDeck: DeckState = {
    drawPile: shuffled,
    discardPile: [],
    hand: [],
  };
  const drawResult = drawCards(initialDeck, HAND_SIZE);
  return {
    turn: 1,
    player: createPlayer(),
    enemy: createEnemy(),
    deck: drawResult.deck,
    log: ['Battle begins.', ...drawResult.log],
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'startTurn': {
      const turn = state.turn + 1;
      const player: PlayerState = {
        ...state.player,
        energy: state.player.maxEnergy,
        block: 0,
      };
      const drawCount = Math.max(0, HAND_SIZE - state.deck.hand.length);
      const drawResult = drawCards({ ...state.deck, hand: [...state.deck.hand] }, drawCount);
      return {
        ...state,
        turn,
        player,
        deck: drawResult.deck,
        log: [...state.log, `Turn ${turn} started.`, ...drawResult.log],
      };
    }
    case 'endTurn': {
      const discardPile = [...state.deck.discardPile, ...state.deck.hand];
      let deck: DeckState = {
        drawPile: [...state.deck.drawPile],
        discardPile,
        hand: [],
      };
      const log: string[] = [...state.log, 'Ended turn.'];
      let player = { ...state.player, energy: 0 };
      let enemy = { ...state.enemy };

      if (enemy.intent.type === 'attack') {
        const attack = enemy.intent.value;
        const { player: updatedPlayer, blocked, damageTaken } = applyDamageToPlayer(player, attack);
        player = { ...updatedPlayer, block: 0 };
        log.push(`Enemy attacked for ${attack}. Blocked ${blocked}, took ${damageTaken}.`);
      } else if (enemy.intent.type === 'defend') {
        enemy = { ...enemy, block: enemy.block + enemy.intent.value };
        log.push(`Enemy gained ${enemy.intent.value} block.`);
        player = { ...player, block: 0 };
      }

      enemy = { ...enemy, intent: generateEnemyIntent() };

      return {
        ...state,
        player,
        enemy,
        deck,
        log,
      };
    }
    case 'playCard': {
      const cardIndex = state.deck.hand.findIndex((card) => card.id === action.cardId);
      if (cardIndex === -1) {
        return state;
      }
      const card = state.deck.hand[cardIndex];
      if (state.player.energy < card.cost) {
        return {
          ...state,
          log: [...state.log, `Not enough energy to play ${card.name}.`],
        };
      }

      let player = { ...state.player, energy: state.player.energy - card.cost };
      let enemy = { ...state.enemy };
      let deck: DeckState = {
        drawPile: [...state.deck.drawPile],
        discardPile: [...state.deck.discardPile, card],
        hand: state.deck.hand.filter((c) => c.id !== card.id),
      };
      const log = [...state.log, `Played ${card.name}.`];

      card.effects.forEach((effect) => {
        switch (effect.type) {
          case 'damage': {
            const { enemy: updatedEnemy, blocked, damageDealt } = applyDamageToEnemy(enemy, effect.value);
            enemy = updatedEnemy;
            log.push(
              `\u2022 ${card.name} dealt ${damageDealt} damage${
                blocked > 0 ? ` (blocked ${blocked}).` : '.'
              }`,
            );
            break;
          }
          case 'block': {
            player = { ...player, block: player.block + effect.value };
            log.push(`\u2022 ${card.name} granted ${effect.value} block.`);
            break;
          }
          case 'draw': {
            const drawResult = drawCards(deck, effect.value);
            deck = drawResult.deck;
            log.push(...drawResult.log.map((entry) => `\u2022 ${entry}`));
            break;
          }
          default:
            break;
        }
      });

      return {
        ...state,
        player,
        enemy,
        deck,
        log,
      };
    }
    case 'discardCard': {
      const cardIndex = state.deck.hand.findIndex((card) => card.id === action.cardId);
      if (cardIndex === -1) {
        return state;
      }
      const card = state.deck.hand[cardIndex];
      const deck: DeckState = {
        drawPile: [...state.deck.drawPile],
        discardPile: [...state.deck.discardPile, card],
        hand: state.deck.hand.filter((c) => c.id !== card.id),
      };
      return {
        ...state,
        deck,
        log: [...state.log, `Discarded ${card.name}.`],
      };
    }
    case 'draw': {
      const amount = action.amount ?? 1;
      const drawResult = drawCards(state.deck, amount);
      return {
        ...state,
        deck: drawResult.deck,
        log: [...state.log, ...drawResult.log],
      };
    }
    default:
      return state;
  }
}
