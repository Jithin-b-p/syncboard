import { useBoardStore } from '../store/board.store';
import { hitTest } from '../utils/hitTest';
import { hitTestHandles } from '../utils/hitTestHandles';
import { HoverTarget } from './hover.types';

export function detectHoverTarget(x: number, y: number): HoverTarget {
  const { selectedElementId, elements } = useBoardStore.getState();

  if (selectedElementId) {
    const element = elements.find((el) => el.id === selectedElementId);

    if (element) {
      const handle = hitTestHandles(element, x, y);

      if (handle) {
        return { type: 'handle', elementId: element.id, handle };
      }
    }
  }

  const element = hitTest(elements, { x, y });

  if (element) {
    return { type: 'element', elementId: element.id };
  }

  return { type: 'canvas' };
}
