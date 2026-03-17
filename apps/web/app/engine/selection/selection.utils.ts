import { BoardElement } from '../models/element.types';
import { SelectionBox } from './selection.types';

export function getElementInsideSelection(
  elements: BoardElement[],
  box: SelectionBox,
): Set<string> {
  const selected = new Set<string>();

  const left = box.x;
  const right = box.x + box.width;
  const top = box.y;
  const bottom = box.y + box.height;

  elements.forEach((el) => {
    const elLeft = el.x;
    const elRight = el.x + el.width;
    const elTop = el.y;
    const elBottom = el.y + el.height;

    const intersects = elRight > left && elLeft < right && elBottom > top && elTop < bottom;

    if (intersects) {
      selected.add(el.id);
    }
  });

  return selected;
}
