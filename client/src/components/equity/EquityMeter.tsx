import React, { useEffect, useState } from 'react';
import { SparklesIcon, StarIcon } from '@heroicons/react/24/solid';
import { useDemoData } from '../../context/DemoDataContext';

// Placeholder for a confetti library/function
const showConfetti = (message: string) => {
  console.log(`🎉 Confetti! ${message}`);
  // Integrate with react-confetti or similar here
};

const tierColors: { [key: string]: string } = {
  Bronze: 'text-yellow-700 bg-yellow-100 border-yellow-300',
  Silver: 'text-gray-700 bg-gray-200 border-gray-400',
  Gold: 'text-yellow-500 bg-yellow-50 border-yellow-200',
  Platinum: 'text-blue-700 bg-blue-100 border-blue-300',
  Diamond: 'text-indigo-700 bg-indigo-100 border-indigo-300',
  // Add more tiers as needed
};

const tierIcons: { [key: string]: React.ElementType } = {
  Bronze: StarIcon, // Example, choose appropriate icons
  Silver: StarIcon,
  Gold: StarIcon,
  Platinum: SparklesIcon,
  Diamond: SparklesIcon,
};

export default function EquityMeter() {
  const { currentUserData } = useDemoData();
  const [animate, setAnimate] = useState(false);

  const equity = currentUserData?.equity;

  useEffect(() => {
    // Trigger animation on load/data change
    if (equity) {
      setAnimate(true);
      // Optional: Trigger confetti if a specific tier was just reached (needs more logic)
      // const justReachedTier = localStorage.getItem('justReachedTier');
      // if (justReachedTier === equity.tier) {
      //   showConfetti(`Reached ${equity.tier} Tier!`);
      //   localStorage.removeItem('justReachedTier');
      // }

      const timer = setTimeout(() => setAnimate(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [equity]);

  if (!equity) {
    return <div className="text-sm text-gray-500">Loading Equity...</div>;
  }

  const { currentValue, growthPercentage, tier, nextTier, progressToNextTier } = equity;
  const TierIcon = tierIcons[tier] || StarIcon;
  const tierColorClass = tierColors[tier] || tierColors.Bronze;

  const progress = Math.min(progressToNextTier || 0, 100); // Ensure progress is 0-100

  return (
    <div className={`bg-white p-4 rounded-lg shadow border ${tierColorClass} border-opacity-50 overflow-hidden`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-heading font-semibold text-empireBlue flex items-center">
          <TierIcon className={`h-5 w-5 mr-2 ${tierColorClass.split(' ')[0]}`}/>
          Equity Status
        </h3>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${tierColorClass}`}>
          {tier} Tier
        </span>
      </div>

      <div className={`text-center my-4 transition-transform duration-500 ease-out ${animate ? 'scale-110' : 'scale-100'}`}>
        <p className="text-3xl font-bold font-heading text-empireBlue">
          ${currentValue.toLocaleString()}
        </p>
        {growthPercentage !== undefined && (
          <p className={`text-sm font-medium ${growthPercentage >= 0 ? 'text-growthGreen' : 'text-red-600'}`}>
            {growthPercentage >= 0 ? '▲' : '▼'} {Math.abs(growthPercentage)}% Growth
          </p>
        )}
      </div>

      {nextTier && progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span>Progress to {nextTier}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div
              className="bg-growthGreen h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
} 