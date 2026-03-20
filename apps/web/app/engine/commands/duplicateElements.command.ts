import { BoardElement } from '../models/element.types';
import { useBoardStore } from '../store/board.store';
import { Command } from './command.types';

export class DuplicateElementsCommand implements Command {
  private previousElements: BoardElement[];
  private newElements: BoardElement[];
  constructor(elements: BoardElement[], selectedIds: Set<string>) {
    this.previousElements = elements.map((el) => ({ ...el }));

    const duplicates = elements
      .filter((el) => selectedIds.has(el.id))
      .map((el) => ({
        ...el,
        id: crypto.randomUUID(),
        x: el.x + 20,
        y: el.y + 20,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));

    this.newElements = [...elements, ...duplicates];
  }

  execute() {
    const newIds = new Set(this.newElements.slice(this.previousElements.length).map((el) => el.id));
    useBoardStore.setState({ elements: this.newElements, selectedElementIds: newIds });
  }
  undo() {
    useBoardStore.setState({ elements: this.previousElements });
  }
}
