import { RectangleElement } from '../models/element.types';

export function renderElements(ctx: CanvasRenderingContext2D, elements: RectangleElement[]) {
  elements.forEach((el) => {
    if (el.type === 'rectangle') {
      ctx.strokeStyle = 'black';

      ctx.strokeRect(el.x, el.y, el.width, el.height);
    }
  });
}
