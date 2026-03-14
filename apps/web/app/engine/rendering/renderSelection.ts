import { BoardElement } from '../models/element.types';

export function renderSelectionOutline(ctx: CanvasRenderingContext2D, element: BoardElement) {
  ctx.save();

  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#2f6';

  ctx.strokeRect(element.x, element.y, element.width, element.height);

  ctx.restore();
}
