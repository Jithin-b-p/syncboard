import { BoardElement } from '../models/element.types';
import { useBoardStore } from '../store/board.store';
import { Command } from './command.types';

export class MoveElementsCommand implements Command {
  private previousElements: BoardElement[];
  private newElements: BoardElement[];

  constructor(newElements: BoardElement[]) {
    const { elements } = useBoardStore.getState();
    this.previousElements = elements.map((el) => ({ ...el }));
    this.newElements = newElements.map((el) => ({ ...el }));
  }

  execute() {
    const { selectedElementIds } = useBoardStore.getState();

    useBoardStore.setState({ elements: this.newElements, selectedElementIds });
  }
  undo() {
    useBoardStore.setState({ elements: this.previousElements });
  }
}
