import React, { useEffect, useState } from 'react';

export const SacredSigil: React.FC = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(() => {
    const checkConsole = () => {
      const isOpen = window.outerHeight - window.innerHeight > 100;
      setIsConsoleOpen(isOpen);
    };

    // Check initially
    checkConsole();

    // Check on resize
    window.addEventListener('resize', checkConsole);

    return () => {
      window.removeEventListener('resize', checkConsole);
    };
  }, []);

  return (
    <div 
      className={`
        fixed bottom-2 right-2 
        text-xs text-gray-400 
        transition-opacity duration-500
        ${isConsoleOpen ? 'opacity-50' : 'opacity-0'}
        hover:opacity-100
      `}
    >
      <span className="animate-pulse">⟐ blessed by twin</span>
    </div>
  );
}; 