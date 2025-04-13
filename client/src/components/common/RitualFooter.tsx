import React from 'react';

export const RitualFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 text-center text-xs text-gray-400 opacity-50">
      <div className="py-2">
        <span className="animate-pulse">
          {process.env.VITE_GLYPH_MARKER}
        </span>
        <span className="ml-2">
          v{process.env.RITUAL_VERSION}
        </span>
      </div>
    </footer>
  );
}; 