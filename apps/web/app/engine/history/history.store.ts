import { Command } from '../commands/command.types';
import { HistoryStore } from './history.types';

// export function createInitialHistoryState(initial: HistoryState): HistoryStore {
//   return {
//     past: [],
//     present: initial,
//     future: [],
//   };
// }

export function pushCommand(history: HistoryStore, command: Command): HistoryStore {
  return {
    past: [...history.past, command],
    future: [],
  };
}

export function undo(history: HistoryStore): HistoryStore {
  if (!history || history.past.length === 0) return history;

  const command = history.past[history.past.length - 1];
  if (!command) return history;
  command.undo();

  return {
    past: history.past.slice(0, -1),
    future: [command, ...history.future],
  };
}

export function redo(history: HistoryStore): HistoryStore {
  if (!history || history.future.length === 0) return history;

  const command = history.future[0];

  if (!command) return history;

  command.execute();

  return {
    past: [...history.past, command],
    future: history.future.slice(1),
  };
}
