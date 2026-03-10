import { RectangleElement } from '../models/element.types';

const HANDLE_SIZE = 6;

export function renderResizeHandles(ctx: CanvasRenderingContext2D, element: RectangleElement) {
  const handles: [number, number][] = [
    [element.x, element.y],
    [element.x + element.width, element.y],
    [element.x, element.y + element.height],
    [element.x + element.width, element.y + element.height],
  ];

  ctx.fillStyle = 'white';
  ctx.strokeStyle = '#3b82f6';

  handles.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.rect(x - HANDLE_SIZE / 2, y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
  });

  ctx.fill();
  ctx.stroke();
}
