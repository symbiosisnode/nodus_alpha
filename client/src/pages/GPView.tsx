import React from 'react';
import { useDemoData } from '../context/DemoDataContext';
import { NetworkValueGraph } from '../components/NetworkValueGraph';
import { EquityDashboardCard } from '../components/EquityDashboardCard';
import SANetworkTree from '../components/dashboard/SANetworkTree';
import MilestoneTracker from '../components/dashboard/MilestoneTracker';
import ReferralTools from '../components/dashboard/ReferralTools';

// Mock data for NetworkValueGraph
const mockNetworkData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [50000, 75000, 100000, 125000, 150000, 175000],
  sources: ['SA Growth', 'Network Expansion', 'Market Penetration', 'Value Creation', 'Network Effect', 'Total Value']
};

// Mock milestones data
const mockMilestones = [
  { id: '1', name: 'SA Network Growth', completed: false, progress: 65 },
  { id: '2', name: 'Market Penetration', completed: false, progress: 45 },
  { id: '3', name: 'Value Creation', completed: false, progress: 80 }
];

export default function GPView() {
  const { currentUserData, loading } = useDemoData();

  if (loading || !currentUserData || currentUserData.role !== 'GP') {
    return <div className="p-4">Loading GP Data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          GP Growth Studio
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Network Value Graph */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Network Value Growth
            </h2>
            <div className="h-[300px]">
              <NetworkValueGraph data={mockNetworkData} />
            </div>
          </div>

          {/* SA Network Tree */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              SA Network
            </h2>
            <SANetworkTree networkData={currentUserData.saNetwork || { directCount: 0, totalCount: 0, recentGrowth: 0 }} />
          </div>

          {/* Milestone Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Milestone Progress
            </h2>
            <MilestoneTracker milestones={mockMilestones} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Equity Dashboard Card */}
          <EquityDashboardCard 
            equityPercentage={60}
            totalValue={currentUserData.equity?.currentValue || 0}
            growthRate={0.85}
            achievements={2}
          />

          {/* Referral Tools */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Referral Tools
            </h2>
            <ReferralTools referralData={currentUserData.referral || { code: '', link: '', conversions: 0 }} />
          </div>

          {/* EmpireBot Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-auroraOrange">
            <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
            <p className="text-sm text-gray-600 mt-2">
              Reach out to high-potential SA leads identified in your network. Current conversion rate is 35%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 