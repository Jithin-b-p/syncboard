'use client';

import { useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
    </div>
  );
}
