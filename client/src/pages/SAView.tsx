import React from 'react';
import { BuildingOfficeIcon, ShareIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useDemoData } from '../context/DemoDataContext';
import { NetworkValueGraph } from '../components/NetworkValueGraph';
import { EquityDashboardCard } from '../components/EquityDashboardCard';
import MilestoneTracker from '../components/dashboard/MilestoneTracker';

// Mock data for NetworkValueGraph
const mockNetworkData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [25000, 35000, 45000, 55000, 65000, 75000],
  sources: ['Property Sales', 'Commission Growth', 'Market Share', 'Client Base', 'Network Value', 'Total Value']
};

// Mock milestones data
const mockMilestones = [
  { id: '1', name: 'Property Sales Target', completed: false, progress: 70 },
  { id: '2', name: 'Client Acquisition', completed: false, progress: 55 },
  { id: '3', name: 'Commission Growth', completed: false, progress: 80 }
];

// Mock icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  BuildingOfficeIcon,
  ShareIcon,
  UserGroupIcon,
};

export default function SAView() {
  const { currentUserData, loading } = useDemoData();

  if (loading || !currentUserData || currentUserData.role !== 'SA') {
    return <div className="p-4">Loading SA Data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          SA Starter Hub
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Network Value Graph */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Value Growth
            </h2>
            <div className="h-[300px]">
              <NetworkValueGraph data={mockNetworkData} />
            </div>
          </div>

          {/* Property Bundles */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Property Bundles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-empireBlue mb-2" />
                <h3 className="font-medium text-gray-900">Downtown Portfolio</h3>
                <p className="text-sm text-gray-500">5 properties, $2.5M value</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-empireBlue mb-2" />
                <h3 className="font-medium text-gray-900">Suburban Collection</h3>
                <p className="text-sm text-gray-500">3 properties, $1.8M value</p>
              </div>
            </div>
          </div>

          {/* Commission Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Commission Tracker
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Earned this month</span>
                <span className="text-lg font-semibold text-empireBlue">
                  ${currentUserData.commission?.earnedThisMonth?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Year to date</span>
                <span className="text-lg font-semibold text-empireBlue">
                  ${(currentUserData.commission?.earnedThisMonth || 0 * 6).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Equity Dashboard Card */}
          <EquityDashboardCard 
            equityPercentage={45}
            totalValue={currentUserData.equity?.currentValue || 0}
            growthRate={0.75}
            achievements={1}
          />

          {/* Milestone Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Milestone Progress
            </h2>
            <MilestoneTracker milestones={mockMilestones} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-empireBlue hover:bg-empireBlue/90">
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Portfolio
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-auroraOrange hover:bg-auroraOrange/90">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Connect with GP
              </button>
            </div>
          </div>

          {/* EmpireBot Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-auroraOrange">
            <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
            <p className="text-sm text-gray-600 mt-2">
              {currentUserData.aiNudge || 'Focus on high-value properties in the downtown area. Current conversion rate is 40%.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 