import { RectangleElement } from '../models/element.types';
import { ResizeHandles } from './getResizeHandles';

const MIN_SIZE = 10;

export function resizeRectangle(
  element: RectangleElement,
  handle: ResizeHandles,
  pointerX: number,
  pointerY: number,
): RectangleElement {
  const right = element.x + element.width;
  const bottom = element.y + element.height;

  let { x, y, width, height } = element;

  switch (handle) {
    case 'se':
      width = pointerX - x;
      height = pointerY - y;
      break;

    case 'nw':
      x = pointerX;
      y = pointerY;
      width = right - pointerX;
      height = bottom - pointerY;
      break;

    case 'ne':
      y = pointerY;
      width = pointerX - x;
      height = bottom - pointerY;
      break;

    case 'sw':
      x = pointerX;
      width = right - pointerX;
      height = pointerY - y;
      break;

    case 'e':
      width = pointerX - x;
      break;

    case 'w':
      x = pointerX;
      width = right - pointerX;
      break;

    case 'n':
      y = pointerY;
      height = bottom - pointerY;
      break;

    case 's':
      height = pointerY - y;
      break;
  }

  width = Math.max(MIN_SIZE, width);
  height = Math.max(MIN_SIZE, height);

  return { ...element, x, y, width, height };
}
