import { CursorType } from './cursor.types';

let currentCursor: string | null = null;

export function setCursor(canvas: HTMLCanvasElement, cursor: CursorType) {
  if (cursor === currentCursor) return;

  canvas.style.cursor = cursor;
  currentCursor = cursor;
}

export function resetCursor(canvas: HTMLCanvasElement) {
  setCursor(canvas, 'crosshair');
}
