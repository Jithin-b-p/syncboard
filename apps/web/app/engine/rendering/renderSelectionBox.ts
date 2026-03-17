import { SelectionBox } from '../selection/selection.types';

export function renderSelectionBox(ctx: CanvasRenderingContext2D, box: SelectionBox) {
  ctx.save();

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);

  ctx.strokeRect(box.x, box.y, box.width, box.height);

  ctx.restore();
}
