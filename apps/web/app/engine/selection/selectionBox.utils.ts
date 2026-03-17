import { SelectionBox } from './selection.types';

export function createSelectionBox(
  startX: number,
  startY: number,
  currentX: number,
  currentY: number,
): SelectionBox {
  const x = Math.min(startX, currentX);
  const y = Math.min(startY, currentY);

  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);

  return { x, y, width, height };
}
