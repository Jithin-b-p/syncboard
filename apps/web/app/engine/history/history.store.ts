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

export function undo(history: HistoryStore): HistoryStore {
  if (!history || history.past.length === 0) return history;

  const previous = history.past[history.past.length - 1];

  if (!previous) return history;

  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redo(history: HistoryStore): HistoryStore {
  if (!history || history.future.length === 0) return history;

  const future = history.future[0];

  if (!future) return history;

  return {
    past: [...history.past, history.present],
    present: future,
    future: history.future.slice(1),
  };
}
