import { Command } from '../commands/command.types';
import { BoardElement } from '../models/element.types';

export interface HistoryState {
  elements: BoardElement[];
  selectedElementsIds: Set<string>;
}

export interface HistoryStore {
  past: Command[];
  future: Command[];
}
