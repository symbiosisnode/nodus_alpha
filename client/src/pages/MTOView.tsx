import React from 'react';
import { useDemoData } from '../context/DemoDataContext';
import { TerritoryVisualization } from '../components/TerritoryVisualization';
import { NetworkValueGraph } from '../components/NetworkValueGraph';
import { EquityDashboardCard } from '../components/EquityDashboardCard';
import GPLeaderboard from '../components/dashboard/GPLeaderboard';
import MilestoneTracker from '../components/dashboard/MilestoneTracker';

// Mock data for NetworkValueGraph
const mockNetworkData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [100000, 150000, 200000, 250000, 300000, 350000],
  sources: ['SA Growth', 'GP Expansion', 'MTO Activation', 'Market Growth', 'Network Effect', 'Total Value']
};

// Mock milestones data
const mockMilestones = [
  { id: '1', name: 'Territory Activation', completed: false, progress: 75 },
  { id: '2', name: 'SA Recruitment', completed: false, progress: 60 },
  { id: '3', name: 'GP Onboarding', completed: false, progress: 85 }
];

export default function MTOView() {
  const { currentUserData, loading } = useDemoData();

  if (loading || !currentUserData || currentUserData.role !== 'MTO') {
    return <div className="p-4">Loading MTO Data...</div>;
  }

  // Mock territory data for visualization
  const mockTerritory = {
    id: 'territory-1',
    name: currentUserData.territory?.name || 'Downtown District',
    coordinates: [
      [
        [-122.4194, 37.7749],
        [-122.4194, 37.7849],
        [-122.4094, 37.7849],
        [-122.4094, 37.7749],
        [-122.4194, 37.7749]
      ]
    ],
    properties: {
      density: 0.85,
      performance: 0.92,
      owner: currentUserData.name
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          MTO Command Center
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Territory Visualization */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Territory Overview: {mockTerritory.name}
            </h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <TerritoryVisualization 
                territories={[mockTerritory]}
                onTerritoryClick={(territory) => console.log('Territory clicked:', territory)}
              />
            </div>
          </div>

          {/* Network Value Graph */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Network Value Growth
            </h2>
            <div className="h-[300px]">
              <NetworkValueGraph data={mockNetworkData} />
            </div>
          </div>

          {/* GP Leaderboard */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              GP Leaderboard
            </h2>
            <GPLeaderboard leaderboardData={currentUserData.leaderboard || []} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Equity Dashboard Card */}
          <EquityDashboardCard 
            equityPercentage={75}
            totalValue={currentUserData.equity?.currentValue || 0}
            growthRate={0.92}
            achievements={3}
          />

          {/* Milestone Tracker */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              Milestone Progress
            </h2>
            <MilestoneTracker milestones={mockMilestones} />
          </div>

          {/* AI Insights */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-4">
              AI Insights
            </h2>
            {currentUserData.aiInsights && currentUserData.aiInsights.length > 0 ? (
              <ul className="space-y-3">
                {currentUserData.aiInsights.map((insight: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 bg-skyCanvas/50 p-3 rounded-lg">
                    {insight}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No insights available.</p>
            )}
          </div>

          {/* EmpireBot Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-auroraOrange">
            <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
            <p className="text-sm text-gray-600 mt-2">
              Focus on SA activation in the West Sector this week. Current activation rate is 65%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 