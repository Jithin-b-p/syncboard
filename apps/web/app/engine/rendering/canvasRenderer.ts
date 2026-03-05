export interface BoardState {
  width: number;
  height: number;
}

export function rendererBoard(ctx: CanvasRenderingContext2D, state: BoardState) {
  const { width, height } = state;

  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#2563eb';

  ctx.fillRect(width / 2 - 100, height / 2 - 60, 200, 120);
}
