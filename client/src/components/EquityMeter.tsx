import React from 'react';

interface EquityMeterProps {
  currentValue: number;
  growthPercentage: number;
  tier: string;
  nextTier: string;
  progress: number;
}

export default function EquityMeter({
  currentValue,
  growthPercentage,
  tier,
  nextTier,
  progress,
}: EquityMeterProps) {
  return (
    <div className="bg-sky-canvas p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-empire-blue font-heading font-bold text-lg">
            My Equity
          </span>
          <span className="ml-2 text-growth-green font-medium">
            ${currentValue.toLocaleString()}
          </span>
        </div>
        <span className={`text-sm font-medium ${
          growthPercentage >= 0 ? 'text-growth-green' : 'text-red-500'
        }`}>
          {growthPercentage >= 0 ? '+' : ''}{growthPercentage}% this month
        </span>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{tier}</span>
          <span>{nextTier}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-growth-green transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Progress to {nextTier}
        </span>
        <span className="font-medium text-empire-blue">
          {progress}%
        </span>
      </div>
    </div>
  );
} 