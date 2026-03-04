'use client';

export default function BoardPage() {
  return (
    <main className="h-screen w-screen flex flex-col bg-neutral-950 text-white">
      {/* Toolbar Placeholder */}
      <div className="h-14 border-b border-neutral-800 flex items-center px-4">
        <h1 className="text-sm font-medium tracking-wide">SyncBoard</h1>
      </div>

      {/* Canvas Area Placeholder */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
          Canvas will mount here
        </div>
      </div>
    </main>
  );
}
