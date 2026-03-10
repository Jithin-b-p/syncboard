import { BoardElement } from '../models/element.types';

export interface BoardState {
  width: number;
  height: number;
  elements: BoardElement[];
}

export function rendererBoard(ctx: CanvasRenderingContext2D, state: BoardState) {
  const { width, height, elements } = state;

  ctx.clearRect(0, 0, width, height);
  elements.forEach((el) => {
    switch (el.type) {
      case 'rectangle':
        renderRectangle(ctx, el);
        break;
    }
  });
}

function renderRectangle(ctx: CanvasRenderingContext2D, element: BoardElement) {
  if (element.type !== 'rectangle') return;

  ctx.fillStyle = '#2563eb';
  ctx.fillRect(element.x, element.y, element.width, element.height);
}
