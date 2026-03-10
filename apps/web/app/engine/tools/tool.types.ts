export interface ToolPointerEvent {
  x: number;
  y: number;
}

export interface Tool {
  onPointerDown(event: ToolPointerEvent): void;
  onPointerUp(event: ToolPointerEvent): void;
  onPointerMove(event: ToolPointerEvent): void;
}
