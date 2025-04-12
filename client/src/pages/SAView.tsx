import React from 'react';
import { BuildingOfficeIcon, ShareIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Example icons
import EquityMeter from '../components/equity/EquityMeter'; // Import the component
import { useDemoData } from '../context/DemoDataContext'; // Import context hook

// Remove the explicit data prop type
// interface SAProps { ... }

// Mock icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  BuildingOfficeIcon,
  ShareIcon,
  UserGroupIcon,
};

export default function SAView() {
  // Get data from context
  const { currentUserData, loading } = useDemoData();

  // Handle loading state
  if (loading || !currentUserData || currentUserData.role !== 'SA') {
    return <div className="p-4">Loading SA Data...</div>; // Simple placeholder
  }

  return (
    <div className="min-h-screen bg-skyCanvas p-4 sm:p-6 lg:p-8">
      {/* TODO: Add Global Nav/Sidebar/Footer Layout */}
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          SA Starter Hub
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Bundles, Commission) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Property Bundles</h2>
            {/* Placeholder for Bundle Cards component */}
            <p className="text-gray-500">Bundle cards go here...</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Commission Tracker</h2>
            <p className="text-gray-500">Earned this month: ${currentUserData.commission?.earnedThisMonth?.toLocaleString() || '0'}</p>
            {/* Placeholder for Commission details/history */}
          </div>
        </div>

        {/* Right Column (Equity, Quick Actions) */}
        <div className="space-y-6">
          {/* Equity Meter Component */}
          <EquityMeter />

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Quick Actions</h2>
            {/* Placeholder for Quick Actions component */}
            <p className="text-gray-500">Action buttons here...</p>
          </div>
           <div className="bg-white p-4 rounded-lg shadow border border-dashed border-auroraOrange">
            <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
            <p className="text-sm text-gray-600 mt-1">{currentUserData.aiNudge || 'Keep up the great work!'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 