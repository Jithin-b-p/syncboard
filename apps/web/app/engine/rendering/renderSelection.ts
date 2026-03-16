import { BoardElement } from '../models/element.types';

export function renderSelectionOutline(ctx: CanvasRenderingContext2D, element: BoardElement) {
  ctx.save();

  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(element.x + 0.5, element.y + 0.5, element.width, element.height);

  ctx.restore();
}
