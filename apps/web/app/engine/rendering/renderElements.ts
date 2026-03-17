import { BoardElement } from '../models/element.types';

export function renderElements(ctx: CanvasRenderingContext2D, elements: BoardElement[]) {
  elements.forEach((el) => {
    switch (el.type) {
      case 'rectangle':
        renderRectangle(ctx, el);
        break;
    }
  });
}

export function renderRectangle(ctx: CanvasRenderingContext2D, element: BoardElement) {
  if (element.type !== 'rectangle') return;

  ctx.fillStyle = '#2563eb';
  ctx.fillRect(element.x, element.y, element.width, element.height);
}
