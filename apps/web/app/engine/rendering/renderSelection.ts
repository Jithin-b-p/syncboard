import { RectangleElement } from '../models/element.types';

export function renderSelectionOutline(ctx: CanvasRenderingContext2D, element: RectangleElement) {
  ctx.save();

  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#3b82f6';

  ctx.strokeRect(element.x, element.y, element.width, element.height);

  ctx.restore();
}
