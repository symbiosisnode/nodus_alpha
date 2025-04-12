import React from 'react';
import { Outlet } from 'react-router-dom';
import EquityMeter from './EquityMeter';

interface LayoutProps {
  equityData: {
    currentValue: number;
    growthPercentage: number;
    tier: string;
    nextTier: string;
    progress: number;
  };
  children?: React.ReactNode;
}

export default function Layout({ equityData, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">NODUS</h1>
            <nav className="space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Dashboard
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Properties
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Reports
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Outlet />
            {children}
          </div>
          <div className="lg:col-span-1">
            <EquityMeter {...equityData} />
          </div>
        </div>
      </main>
    </div>
  );
} 