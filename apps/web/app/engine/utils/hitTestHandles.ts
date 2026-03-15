import { BoardElement } from '../models/element.types';
import { getResizeHandles, ResizeHandles } from './getResizeHandles';

const HANDLE_SIZE = 8;

export function hitTestHandles(
  element: BoardElement,
  pointerX: number,
  pointerY: number,
): ResizeHandles | null {
  const handles = getResizeHandles(element);

  for (const handle of handles) {
    const left = handle.x - HANDLE_SIZE / 2;
    const top = handle.y - HANDLE_SIZE / 2;
    const right = handle.x + HANDLE_SIZE / 2;
    const bottom = handle.y + HANDLE_SIZE / 2;

    const inside = pointerX >= left && pointerX <= right && pointerY >= top && pointerY <= bottom;

    if (inside) {
      return handle.type;
    }
  }

  return null;
}
