'use client';

import { useEffect, useRef } from 'react';
import { renderBoard } from '../app/engine/rendering/canvasRenderer';
import { useBoardStore } from '../app/engine/store/board.store';
import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
} from '../app/engine/interactions/pointerHandlers';
import { setCursor } from '../app/engine/cursor/cursorManager';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const elements = useBoardStore((state) => state.elements);
  const selectionBox = useBoardStore((state) => state.selectionBox);
  const selectedElementIds = useBoardStore((state) => state.selectedElementIds);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rec = parent.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rec.width * dpr;
      canvas.height = rec.height * dpr;

      canvas.style.width = `${rec.width}px`;
      canvas.style.height = `${rec.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderBoard(ctx, {
        width: rec.width,
        height: rec.height,
        elements,
        selectedElementIds,
        selectionBox,
      });
    };

    canvasResize();

    window.addEventListener('resize', canvasResize);

    return () => window.removeEventListener('resize', canvasResize);
  }, [elements, selectedElementIds, selectionBox]);
  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        onPointerDown={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          handlePointerDown(canvas, e.nativeEvent);
        }}
        onPointerMove={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          setCursor(canvas, 'move');
          handlePointerMove(canvas, e.nativeEvent);
        }}
        onPointerUp={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          handlePointerUp(canvas, e.nativeEvent);
        }}
      />
    </div>
  );
}
