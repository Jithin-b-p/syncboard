import { BoardElement } from '../models/element.types';

interface Point {
  x: number;
  y: number;
}

function hitTestRectangle(point: Point, element: BoardElement): boolean {
  if (element.type !== 'rectangle') return false;

  return (
    point.x >= element.x &&
    point.x <= element.x + element.width &&
    point.y >= element.y &&
    point.y <= element.y + element.height
  );
}

export function hitTest(elements: BoardElement[], point: Point): BoardElement | null {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    if (!element) continue;

    if (hitTestRectangle(point, element)) {
      return element;
    }
  }

  return null;
}
