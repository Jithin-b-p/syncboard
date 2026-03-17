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
  selectedElementIds: Set<string>;
  selectionBox: SelectionBox | null;
}

export function renderBoard(ctx: CanvasRenderingContext2D, state: BoardState) {
  const { width, height, elements, selectedElementIds, selectionBox } = state;

  ctx.clearRect(0, 0, width, height);

  renderElements(ctx, elements);

  elements.forEach((el) => {
    if (selectedElementIds.has(el.id)) {
      renderSelectionOutline(ctx, el);
    }
  });

  const primaryId = Array.from(selectedElementIds)[0];

  if (primaryId) {
    const primaryElement = elements.find((el) => el.id === primaryId);

    if (primaryElement && primaryElement.type === 'rectangle') {
      renderResizeHandles(ctx, primaryElement);
    }
  }

  if (selectionBox) {
    renderSelectionBox(ctx, selectionBox);
  }
}
