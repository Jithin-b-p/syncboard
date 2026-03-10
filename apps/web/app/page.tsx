'use client';

import Canvas from '../components/Canvas';
import { toolRegistry } from './engine/tools/toolRegistry';

export default function BoardPage() {
  return (
    <main className="h-screen w-screen flex flex-col bg-neutral-950 text-white">
      <div className="h-14 border-b border-neutral-800 flex items-center px-4">
        <h1 className="text-sm font-medium tracking-wide">SyncBoard</h1>
        <div className="p-2 bg-gray-100 flex gap-2">
          <button
            onClick={() => toolRegistry.setActiveTool('selection')}
            className="px-3 py-1 bg-sky-600 border"
          >
            Select
          </button>

          <button
            onClick={() => toolRegistry.setActiveTool('rectangle')}
            className="px-3 py-1 bg-sky-600 border"
          >
            Rectangle
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        <Canvas />
      </div>
    </main>
  );
}
