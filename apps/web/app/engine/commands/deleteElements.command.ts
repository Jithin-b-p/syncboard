import { BoardElement } from '../models/element.types';
import { useBoardStore } from '../store/board.store';
import { Command } from './command.types';

export class DeleteElementsCommand implements Command {
  private previousElements: BoardElement[];
  private newElements: BoardElement[];

  constructor(elements: BoardElement[], selectedIds: Set<string>) {
    this.previousElements = elements.map((el) => ({ ...el }));
    this.newElements = elements.filter((el) => !selectedIds.has(el.id));
  }
  execute() {
    useBoardStore.setState({ elements: this.newElements, selectedElementIds: new Set() });
  }
  undo() {
    useBoardStore.setState({ elements: this.previousElements });
  }
}
