'use client';

import { useEffect, useRef } from 'react';
import { rendererBoard } from '../app/engine/rendering/canvasRenderer';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

      rendererBoard(ctx, { width: rec.width, height: rec.height });
    };

    canvasResize();

    window.addEventListener('resize', canvasResize);

    return () => window.removeEventListener('resize', canvasResize);
  });
  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
    </div>
  );
}
