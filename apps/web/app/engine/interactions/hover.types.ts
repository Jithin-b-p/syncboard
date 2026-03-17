import { ResizeHandles } from '../utils/getResizeHandles';

export type HoverTarget =
  | { type: 'canvas' }
  | { type: 'element'; elementId: string; isSelected: boolean }
  | { type: 'handle'; elementId: string; handle: ResizeHandles };
