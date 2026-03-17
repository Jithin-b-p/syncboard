import { useBoardStore } from '../store/board.store';
import { hitTest } from '../utils/hitTest';
import { hitTestHandles } from '../utils/hitTestHandles';
import { HoverTarget } from './hover.types';

export function detectHoverTarget(x: number, y: number): HoverTarget {
  const { selectedElementIds, elements } = useBoardStore.getState();

  for (const id of selectedElementIds) {
    const element = elements.find((el) => el.id === id);
    if (!element) continue;

    const handle = hitTestHandles(element, x, y);
    if (handle) {
      return { type: 'handle', elementId: element.id, handle };
    }
  }

  for (const id of selectedElementIds) {
    const element = elements.find((el) => el.id === id);

    if (!element) continue;
    const hit = hitTest([element], { x, y });

    if (hit) {
      return {
        type: 'element',
        elementId: element.id,
        isSelected: true,
      };
    }
  }

  const element = hitTest(elements, { x, y });

  if (element) {
    return {
      type: 'element',
      elementId: element.id,
      isSelected: false,
    };
  }

  return { type: 'canvas' };
}
