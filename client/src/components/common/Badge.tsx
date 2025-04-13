import React, { useState, useEffect } from 'react';
import { NODUS_STYLE_GUIDE } from '../../styles/NodusStyleGuide';
import { useDesignGuard } from '../../hooks/useDesignGuard';

export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum';
export type BadgeStatus = 'locked' | 'unlocked' | 'new';

interface BadgeProps {
  id: string;
  name: string;
  description: string;
  level: BadgeLevel;
  status: BadgeStatus;
  progress?: number; // 0-100
  icon?: React.ReactNode;
  onUnlock?: (id: string) => void;
}

const Badge: React.FC<BadgeProps> = ({
  id,
  name,
  description,
  level,
  status,
  progress = 100,
  icon,
  onUnlock,
}) => {
  const [isAnimating, setIsAnimating] = useState(status === 'new');
  
  // Check design compliance with NODUS Style Guide
  useDesignGuard('Badge', {
    badgeRadius: NODUS_STYLE_GUIDE.components.buttonRadius, // 8px
    primaryColor: NODUS_STYLE_GUIDE.colors.primary,
    textSize: NODUS_STYLE_GUIDE.typography.label.size,
  });
  
  // Levels mapped to colors
  const levelColors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  };
  
  // Handle animation when new badge is unlocked
  useEffect(() => {
    if (status === 'new') {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onUnlock) onUnlock(id);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [status, id, onUnlock]);
  
  return (
    <div 
      className={`relative flex flex-col items-center ${
        isAnimating ? 'animate-badge-unlock' : ''
      }`}
    >
      {/* Badge Icon Container */}
      <div 
        className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-2 relative
          ${status === 'locked' ? 'opacity-40 grayscale' : 'shadow-card'}
        `}
        style={{ 
          backgroundColor: status !== 'locked' ? levelColors[level] : '#808080',
          border: `2px solid ${status === 'new' ? 'var(--primary)' : 'transparent'}`
        }}
      >
        {/* Icon or Default Badge Content */}
        {icon || (
          <span className="text-2xl font-semibold text-white">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        
        {/* Locked Indicator */}
        {status === 'locked' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        )}
        
        {/* Progress Indicator (if not 100%) */}
        {status !== 'locked' && progress < 100 && (
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"
          >
            <circle
              className="text-white opacity-20"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
            <circle
              className="text-white"
              strokeWidth="4"
              strokeDasharray={289.27}
              strokeDashoffset={289.27 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
          </svg>
        )}
      </div>
      
      {/* Badge Text */}
      <span 
        className="font-medium text-sm text-strong-text"
        style={{ 
          color: status === 'locked' ? 'var(--subtle-text)' : 'var(--strong-text)' 
        }}
      >
        {name}
      </span>
      
      {/* Badge Description */}
      <p 
        className="text-xs text-center text-subtle mt-1"
        style={{ maxWidth: '120px' }}
      >
        {description}
      </p>
      
      {/* New Badge Indicator */}
      {status === 'new' && (
        <span 
          className="absolute -top-1 -right-1 bg-primary text-xs px-2 py-0.5 rounded-full text-foreground font-medium"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--foreground)' }}
        >
          NEW
        </span>
      )}
    </div>
  );
};

export default Badge; 