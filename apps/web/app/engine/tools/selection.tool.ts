import { MoveElementsCommand } from '../commands/moveElements.command';
import { DRAG_THRESHOLD } from '../constants/editor.constants';
import { getElementInsideSelection } from '../selection/selection.utils';
import { createSelectionBox } from '../selection/selectionBox.utils';
import { useBoardStore } from '../store/board.store';
import { hitTest } from '../utils/hitTest';
import { hitTestHandles } from '../utils/hitTestHandles';
import { resizeRectangle } from '../utils/resizeRectangle';
import { Tool, ToolPointerEvent } from './tool.types';

let dragging = false;
let dragOffsets = new Map<string, { offsetX: number; offsetY: number }>();

let selecting = false;
let selectionStartX = 0;
let selectionStartY = 0;

let pendingSelection = false;

export const selectionTool: Tool = {
  onPointerDown(event: ToolPointerEvent) {
    const {
      elements,
      selectedElementIds,
      selectElement,
      setIsResizing,
      setActiveResizeHandle,
      clearSelection,
    } = useBoardStore.getState();

    const selectedIds = Array.from(selectedElementIds);

    const activeId = selectedIds[0];

    if (activeId) {
      const activeElement = elements.find((el) => el.id === activeId);

      if (activeElement) {
        const handle = hitTestHandles(activeElement, event.x, event.y);

        if (handle) {
          setActiveResizeHandle(handle);
          setIsResizing(true);
          dragging = false;
          return;
        }
      }
    }

    const element = hitTest(elements, event);

    if (element) {
      const isAlreadySelected = selectedElementIds.has(element.id);

      if (!isAlreadySelected) selectElement(element.id);
      dragOffsets.clear();
      const selectedIds = isAlreadySelected ? Array.from(selectedElementIds) : [element.id];

      selectedIds.forEach((id) => {
        const el = elements.find((el) => el.id === id);
        if (!el) return;

        dragOffsets.set(id, { offsetX: event.x - el.x, offsetY: event.y - el.y });
      });
      dragging = true;
      selecting = false;
      pendingSelection = false;
      return;
    }
    pendingSelection = true;
    selecting = false;
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
    dragOffsets.clear();
  },
  onPointerMove(event: ToolPointerEvent) {
    const {
      selectedElementIds,
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

    const selectedIds = Array.from(selectedElementIds);
    const primaryId = selectedIds[0];
    if (isResizing && activeResizeHandle && primaryId) {
      const element = elements.find((el) => el.id === primaryId);
      if (!element) return;

      const updated = resizeRectangle(element, activeResizeHandle, event.x, event.y);
      updateElement(primaryId, { ...updated, updatedAt: Date.now() });

      return;
    }

    if (!dragging || selectedElementIds.size === 0) return;

    const updatedElements = elements.map((el) => {
      if (!selectedElementIds.has(el.id)) return el;
      const offSet = dragOffsets.get(el.id);

      if (!offSet) return el;
      return {
        ...el,
        x: event.x - offSet.offsetX,
        y: event.y - offSet.offsetY,
        updatedAt: Date.now(),
      };
    });

    const command = new MoveElementsCommand(updatedElements);
    useBoardStore.getState().executeCommand(command);
  },
};
