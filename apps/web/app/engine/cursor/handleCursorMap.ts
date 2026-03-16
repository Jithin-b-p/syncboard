import { ResizeHandles } from '../utils/getResizeHandles';

import { CursorType } from './cursor.types';

export const handleCursorMap: Record<ResizeHandles, CursorType> = {
  nw: 'nw-resize',
  n: 'n-resize',
  ne: 'ne-resize',
  e: 'e-resize',
  se: 'se-resize',
  s: 's-resize',
  sw: 'sw-resize',
  w: 'w-resize',
};
