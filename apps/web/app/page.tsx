'use client';

import Canvas from '../components/Canvas';

export default function BoardPage() {
  return (
    <main className="h-screen w-screen flex flex-col bg-neutral-950 text-white">
      <div className="h-14 border-b border-neutral-800 flex items-center px-4">
        <h1 className="text-sm font-medium tracking-wide">SyncBoard</h1>
      </div>
      <div className="flex-1 relative">
        <Canvas />
      </div>
    </main>
  );
}
