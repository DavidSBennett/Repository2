# Deck Builder Prototype

This Vite + React + TypeScript project hosts an early browser prototype for a card-based deck builder. The initial implementation focuses on core combat state, including player/enemy stats, deck management, and a hand interface for playing or discarding cards.

## Available Scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check and bundle the project for production.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint on the source files.

Install dependencies before running the scripts:

```bash
npm install
```

## Project Structure

- `src/cards` – card definitions and reusable card typings.
- `src/state` – state machine, reducer, and React hook for game flow.
- `src/components` – UI components such as card and hand renderers.
- `src/App.tsx` – high-level layout that wires together controls, board, and combat log.

The current gameplay loop supports drawing a starting hand, playing cards with energy costs, discarding, ending turns, and responding to simple enemy intents.
