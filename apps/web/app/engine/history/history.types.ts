import { BoardElement } from '../models/element.types';

export interface HistoryState {
  elements: BoardElement[];
  selectedElementsIds: Set<string>;
}

export interface HistoryStore {
  past: HistoryState[];
  present: HistoryState;
  future: HistoryState[];
}
