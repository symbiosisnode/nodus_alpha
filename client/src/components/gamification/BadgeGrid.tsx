import React, { useState } from 'react';
import Badge, { BadgeLevel, BadgeStatus } from '../common/Badge';
import { useDesignGuard } from '../../hooks/useDesignGuard';
import { NODUS_STYLE_GUIDE } from '../../styles/NodusStyleGuide';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  level: BadgeLevel;
  status: BadgeStatus;
  progress?: number;
  icon?: React.ReactNode;
}

interface BadgeGridProps {
  badges: BadgeData[];
  title?: string;
  subTitle?: string;
  onBadgeUnlock?: (id: string) => void;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  title = 'Your Badges',
  subTitle = 'Complete actions to unlock more badges and level up',
  onBadgeUnlock,
}) => {
  const [badgeState, setBadgeState] = useState<Record<string, BadgeData>>(
    badges.reduce((acc, badge) => ({ ...acc, [badge.id]: badge }), {})
  );
  
  // Check design compliance with NODUS Style Guide
  useDesignGuard('BadgeGrid', {
    cardRadius: NODUS_STYLE_GUIDE.components.cardRadius, // 12px
    cardPadding: NODUS_STYLE_GUIDE.components.cardPadding, // 20px
    gap: NODUS_STYLE_GUIDE.layout.gap, // 16px
  });
  
  // Handle badge unlock event
  const handleBadgeUnlock = (id: string) => {
    // Update the badge status from 'new' to 'unlocked'
    if (badgeState[id].status === 'new') {
      setBadgeState(prev => ({
        ...prev,
        [id]: { ...prev[id], status: 'unlocked' }
      }));
    }
    
    // Call external handler if provided
    if (onBadgeUnlock) {
      onBadgeUnlock(id);
    }
  };
  
  // Calculate statistics
  const totalBadges = badges.length;
  const unlockedBadges = badges.filter(b => b.status === 'unlocked' || b.status === 'new').length;
  const unlockedPercentage = Math.round((unlockedBadges / totalBadges) * 100);
  
  return (
    <div className="w-full bg-card rounded-xl p-6 shadow-card">
      {/* Header */}
      <div className="border-b border-line-soft pb-4 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-strong-text mb-1">{title}</h2>
            <p className="text-sm text-subtle">{subTitle}</p>
          </div>
          
          {/* Progress Stats */}
          <div className="mt-4 md:mt-0 bg-background rounded-lg p-3 flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-foreground font-semibold">
              {unlockedPercentage}%
            </div>
            <div>
              <p className="text-sm font-medium text-strong-text">
                {unlockedBadges} of {totalBadges} Unlocked
              </p>
              <div className="w-36 h-1.5 bg-line-soft rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ 
                    width: `${unlockedPercentage}%`,
                    backgroundColor: 'var(--primary)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Object.values(badgeState).map((badge) => (
          <Badge
            key={badge.id}
            {...badge}
            onUnlock={handleBadgeUnlock}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {badges.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-subtle"
            >
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <h3 className="font-medium text-strong-text mb-1">No Badges Yet</h3>
          <p className="text-sm text-subtle">
            Complete actions to earn your first badge
          </p>
        </div>
      )}
    </div>
  );
};

export default BadgeGrid; 