import { DRAG_THRESHOLD } from '../constants/editor.constants';
import { getElementInsideSelection } from '../selection/selection.utils';
import { createSelectionBox } from '../selection/selectionBox.utils';
import { useBoardStore } from '../store/board.store';
import { hitTest } from '../utils/hitTest';
import { hitTestHandles } from '../utils/hitTestHandles';
import { resizeRectangle } from '../utils/resizeRectangle';
import { Tool, ToolPointerEvent } from './tool.types';

let dragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

let selecting = false;
let selectionStartX = 0;
let selectionStartY = 0;

let pendingSelection = false;

export const selectionTool: Tool = {
  onPointerDown(event: ToolPointerEvent) {
    const {
      elements,
      selectedElement,
      selectedElementId,
      setIsResizing,
      setActiveResizeHandle,
      clearSelection,
    } = useBoardStore.getState();

    const activeElement = elements.find((el) => el.id === selectedElementId);

    if (activeElement) {
      const handle = hitTestHandles(activeElement, event.x, event.y);

      if (handle) {
        setActiveResizeHandle(handle);
        setIsResizing(true);
        dragging = false;
        return;
      }
    }
    const element = hitTest(elements, event);

    if (element) {
      selectedElement(element.id);
      dragOffsetX = event.x - element.x;
      dragOffsetY = event.y - element.y;

      dragging = true;
      selecting = false;
      return;
    }
    pendingSelection = true;

    selectionStartX = event.x;
    selectionStartY = event.y;

    clearSelection();
  },
  onPointerUp() {
    const { setIsResizing, setActiveResizeHandle, setSelectionBox } = useBoardStore.getState();
    setIsResizing(false);
    setActiveResizeHandle(null);
    setSelectionBox(null);
    pendingSelection = false;
    selecting = false;
    dragging = false;
  },
  onPointerMove(event: ToolPointerEvent) {
    const {
      selectedElementId,
      elements,
      isResizing,
      activeResizeHandle,
      updateElement,
      setSelectionBox,
      setSelectedElements,
    } = useBoardStore.getState();

    if (pendingSelection) {
      const dx = event.x - selectionStartX;
      const dy = event.y - selectionStartY;

      const distance = Math.hypot(dx, dy);

      if (distance > DRAG_THRESHOLD) {
        selecting = true;
        pendingSelection = false;
      } else {
        return;
      }
    }

    if (selecting) {
      const box = createSelectionBox(selectionStartX, selectionStartY, event.x, event.y);
      setSelectionBox(box);
      const selected = getElementInsideSelection(elements, box);

      setSelectedElements(selected);
      return;
    }

    if (!selecting && isResizing && activeResizeHandle) {
      const element = elements.find((el) => el.id === selectedElementId);
      if (!element) return;

      const updated = resizeRectangle(element, activeResizeHandle, event.x, event.y);

      updateElement(selectedElementId, { ...updated, updatedAt: Date.now() });
      return;
    }

    if (!selecting) return;
    if (!dragging || !selectedElementId) return;

    const element = elements.find((el) => el.id === selectedElementId);
    if (!element) return;

    const newX = event.x - dragOffsetX;
    const newY = event.y - dragOffsetY;

    updateElement(selectedElementId, { x: newX, y: newY, updatedAt: Date.now() });
  },
};
