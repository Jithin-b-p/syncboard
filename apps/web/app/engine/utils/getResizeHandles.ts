import { BoardElement } from '../models/element.types';

export type ResizeHandles = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

export interface Handle {
  type: ResizeHandles;
  x: number;
  y: number;
}

export function getResizeHandles(element: BoardElement): Handle[] {
  const { x, y, width, height } = element;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return [
    { type: 'nw', x, y },
    { type: 'n', x: centerX, y },
    { type: 'ne', x: x + width, y },
    { type: 'e', x: x + width, y: centerY },
    { type: 'se', x: x + width, y: y + height },
    { type: 's', x: centerX, y: y + height },
    { type: 'sw', x, y: y + height },
    { type: 'w', x, y: centerY },
  ];
}
