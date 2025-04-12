import React from 'react';
import EquityMeter from '../components/equity/EquityMeter';
import SANetworkTree from '../components/dashboard/SANetworkTree';
import MilestoneTracker from '../components/dashboard/MilestoneTracker';
import ReferralTools from '../components/dashboard/ReferralTools';
import { useDemoData } from '../context/DemoDataContext';

// Remove the explicit data prop type
// interface GPProps { ... }

export default function GPView() {
  const { currentUserData, loading } = useDemoData();

  if (loading || !currentUserData || currentUserData.role !== 'GP') {
    return <div className="p-4">Loading GP Data...</div>;
  }

  return (
    <div className="min-h-screen bg-skyCanvas p-4 sm:p-6 lg:p-8">
      {/* TODO: Add Global Nav/Sidebar/Footer Layout */}
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-empireBlue">
          GP Growth Studio
        </h1>
        <p className="text-lg text-gray-600">Welcome, {currentUserData.name}</p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Network, Milestones) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">SA Network</h2>
            <SANetworkTree networkData={currentUserData.saNetwork || { directCount: 0, totalCount: 0, recentGrowth: 0 }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Milestone Tracker</h2>
            <MilestoneTracker milestones={currentUserData.milestones || []} />
          </div>
        </div>

        {/* Right Column (Equity, Referrals, Tools) */}
        <div className="space-y-6">
           {/* Equity Meter Component */}
          <EquityMeter />

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold font-heading text-empireBlue mb-3">Referral Tools</h2>
            <ReferralTools referralData={currentUserData.referral || { code: '', link: '', conversions: 0 }} />
          </div>
           <div className="bg-white p-4 rounded-lg shadow border border-dashed border-auroraOrange">
            <h3 className="text-lg font-semibold text-empireBlue">EmpireBot Suggests...</h3>
            <p className="text-sm text-gray-600 mt-1">Reach out to high-potential SA leads identified in your network.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 