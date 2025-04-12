import React from 'react';
import EquityMeter from '../components/equity/EquityMeter';
import GPLeaderboard from '../components/dashboard/GPLeaderboard';
import { useDemoData } from '../context/DemoDataContext';

export default function MTOView() {
  const { currentUserData, loading } = useDemoData();

  if (loading || !currentUserData || currentUserData.role !== 'MTO') {
    return <div className="p-4">Loading MTO Data...</div>;
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          MTO Command Center
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
             <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Territory Overview: {currentUserData.territory?.name}</h2>
             <img src={currentUserData.territory?.mapImage} alt={`${currentUserData.territory?.name || 'Territory'} Map`} className="w-full h-64 object-cover rounded bg-gray-200 text-gray-500 flex items-center justify-center" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
             <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">GP Leaderboard</h2>
             <GPLeaderboard leaderboardData={currentUserData.leaderboard || []} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <EquityMeter />
          <div className="bg-white p-4 rounded-lg shadow">
             <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">AI Insights</h2>
             {currentUserData.aiInsights && currentUserData.aiInsights.length > 0 ? (
                <ul className="space-y-2">
                    {currentUserData.aiInsights.map((insight: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 bg-skyCanvas/50 p-2 rounded">
                           - {insight}
                        </li>
                    ))}
                </ul>
             ) : (
                <p className="text-gray-500 italic">No insights available.</p>
             )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-dashed border-auroraOrange">
             <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
             <p className="text-sm text-gray-600 mt-1">Focus on SA activation in the West Sector this week.</p>
          </div>
        </div>
      </div>
    </>
  );
} 