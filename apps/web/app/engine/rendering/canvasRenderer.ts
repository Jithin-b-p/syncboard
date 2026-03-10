import { BoardElement } from '../models/element.types';
import { renderElements } from './renderElements';
import { renderResizeHandles } from './renderHandles';
import { renderSelectionOutline } from './renderSelection';

export interface BoardState {
  width: number;
  height: number;
  elements: BoardElement[];
  selectedElementId?: string;
}

export function renderBoard(ctx: CanvasRenderingContext2D, state: BoardState) {
  const { width, height, elements, selectedElementId } = state;

  ctx.clearRect(0, 0, width, height);

  renderElements(ctx, elements);

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (selectedElement && selectedElement.type === 'rectangle') {
    renderSelectionOutline(ctx, selectedElement);
    renderResizeHandles(ctx, selectedElement);
  }
}
