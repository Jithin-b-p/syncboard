import { BoardElement } from '../models/element.types';
import { SelectionBox } from '../selection/selection.types';
import { useBoardStore } from '../store/board.store';
import { renderElements } from './renderElements';
import { renderResizeHandles } from './renderHandles';
import { renderSelectionOutline } from './renderSelection';
import { renderSelectionBox } from './renderSelectionBox';

export interface BoardState {
  width: number;
  height: number;
  elements: BoardElement[];
  selectedElementId: string | null;
}

export function renderBoard(ctx: CanvasRenderingContext2D, state: BoardState) {
  const { width, height, elements, selectedElementId } = state;
  const { selectionBox, selectedElementIds } = useBoardStore.getState();

  ctx.clearRect(0, 0, width, height);

  renderElements(ctx, elements, selectedElementIds);

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (selectedElement && selectedElement.type === 'rectangle') {
    renderSelectionOutline(ctx, selectedElement);
    renderResizeHandles(ctx, selectedElement);
  }

  if (selectionBox) {
    console.log(selectionBox);
    renderSelectionBox(ctx, selectionBox);
  }
}
