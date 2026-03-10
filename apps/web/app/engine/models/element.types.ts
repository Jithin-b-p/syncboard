export type ElementType = 'rectangle';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  createdAt: number;
  updatedAt: number;
}

export interface RectangleElement extends BaseElement {
  type: 'rectangle';
  width: number;
  height: number;
}

export type BoardElement = RectangleElement;
