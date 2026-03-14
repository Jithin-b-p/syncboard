import { RectangleElement } from '../models/element.types';
import { getResizeHandles } from '../utils/getResizeHandles';

const HANDLE_SIZE = 6;

export function renderResizeHandles(ctx: CanvasRenderingContext2D, element: RectangleElement) {
  const handles = getResizeHandles(element);

  ctx.fillStyle = 'white';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1;

  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.rect(handle.x - HANDLE_SIZE / 2, handle.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
    ctx.fill();
    ctx.stroke();
  });
}
