import { HistoryState, HistoryStore } from './history.types';

export function createInitialHistoryState(initial: HistoryState): HistoryStore {
  return {
    past: [],
    present: initial,
    future: [],
  };
}

export function pushToHistory(history: HistoryStore, newPresent: HistoryState): HistoryStore {
  return {
    past: [...history.past, history.present],
    present: newPresent,
    future: [],
  };
}
