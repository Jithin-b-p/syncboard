import { toolRegistry } from '../tools/toolRegistry';
import { detectHoverTarget } from './detectHoverTarget';

export function getCanvasCoordinates(canvas: HTMLCanvasElement, event: PointerEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

export function handlePointerDown(canvas: HTMLCanvasElement, event: PointerEvent) {
  const tool = toolRegistry.getActiveTool();

  const point = getCanvasCoordinates(canvas, event);

  tool.onPointerDown(point);
}

export function handlePointerUp(canvas: HTMLCanvasElement, event: PointerEvent) {
  const tool = toolRegistry.getActiveTool();

  const point = getCanvasCoordinates(canvas, event);

  tool.onPointerUp(point);
}

export function handlePointerMove(canvas: HTMLCanvasElement, event: PointerEvent) {
  const tool = toolRegistry.getActiveTool();

  const point = getCanvasCoordinates(canvas, event);

  const hoverTarget = detectHoverTarget(point.x, point.y);

  tool.onPointerMove(point);
}
