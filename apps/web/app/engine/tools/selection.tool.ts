import { useBoardStore } from '../store/board.store';
import { hitTest } from '../utils/hitTest';
import { hitTestHandles } from '../utils/hitTestHandles';
import { resizeRectangle } from '../utils/resizeRectangle';
import { Tool, ToolPointerEvent } from './tool.types';

let dragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

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

    if (!element) {
      clearSelection();
      dragging = false;
      return;
    }
    selectedElement(element.id);

    dragOffsetX = event.x - element.x;
    dragOffsetY = event.y - element.y;

    dragging = true;
  },
  onPointerUp() {
    const { setIsResizing, setActiveResizeHandle } = useBoardStore.getState();
    setIsResizing(false);
    setActiveResizeHandle(null);
    dragging = false;
  },
  onPointerMove(event: ToolPointerEvent) {
    const { selectedElementId, elements, isResizing, activeResizeHandle, updateElement } =
      useBoardStore.getState();

    if (!selectedElementId) return;

    const element = elements.find((el) => el.id === selectedElementId);

    if (!element) return;

    if (isResizing && activeResizeHandle) {
      const updated = resizeRectangle(element, activeResizeHandle, event.x, event.y);

      updateElement(selectedElementId, { ...updated, updatedAt: Date.now() });
      return;
    }

    if (!dragging) return;
    const newX = event.x - dragOffsetX;
    const newY = event.y - dragOffsetY;

    updateElement(selectedElementId, { x: newX, y: newY, updatedAt: Date.now() });
  },
};
