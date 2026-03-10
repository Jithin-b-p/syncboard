import { RectangleElement } from '../models/element.types';
import { useBoardStore } from '../store/board.store';
import { Tool, ToolPointerEvent } from './tool.types';

let currentElementId: string | null = null;
let startX = 0;
let startY = 0;

export const rectangleTool: Tool = {
  onPointerDown(event: ToolPointerEvent) {
    const { addElement } = useBoardStore.getState();

    startX = event.x;
    startY = event.y;

    currentElementId = crypto.randomUUID();

    const element: RectangleElement = {
      id: currentElementId,
      type: 'rectangle',
      x: startX,
      y: startY,
      width: 0,
      height: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addElement(element);
  },

  onPointerUp() {
    currentElementId = null;
  },

  onPointerMove(event: ToolPointerEvent) {
    if (!currentElementId) return;

    const { updateElement } = useBoardStore.getState();
    const width = event.x - startX;
    const height = event.y - startY;

    updateElement(currentElementId, { width, height, updatedAt: Date.now() });
  },
};
