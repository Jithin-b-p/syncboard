import { BoardElement } from '../models/element.types';
import { useBoardStore } from '../store/board.store';
import { Command } from './command.types';

export class MoveByKeyCommand implements Command {
  private previousElements: BoardElement[];
  private newElements: BoardElement[];

  constructor(dx: number, dy: number) {
    const { elements, selectedElementIds } = useBoardStore.getState();

    this.previousElements = elements.map((el) => ({ ...el }));
    this.newElements = elements.map((el) => {
      if (!selectedElementIds.has(el.id)) return el;

      return {
        ...el,
        x: el.x + dx,
        y: el.y + dy,
        updatedAt: Date.now(),
      };
    });
  }
  execute() {
    useBoardStore.setState({ elements: this.newElements });
  }
  undo() {
    useBoardStore.setState({ elements: this.previousElements });
  }
}
