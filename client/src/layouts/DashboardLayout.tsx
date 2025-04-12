import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar'; // Corrected path
import TopNav from '../components/TopNav';   // Corrected path

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-skyCanvas overflow-hidden">
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main column */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation for Desktop (and Mobile trigger) */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          {/* Mobile Sidebar Trigger */}
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-empireBlue lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Top Nav Content (rendered via component) */}
          <div className="flex-1">
            <TopNav />
          </div>
        </div>

        {/* Mobile sidebar */}
        {/* Use Headless UI Dialog/Transition for better a11y later */}
        {sidebarOpen && (
            <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
                 {/* Backdrop */}
                 <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
                 {/* Sidebar Panel */}
                 <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white pt-5 pb-4">
                    {/* Close Button */}
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    {/* Mobile Sidebar Content (Use Sidebar Component) */}
                    {/* We might need to pass close handler to Sidebar links */}
                    <Sidebar />
                 </div>
                 <div className="flex-shrink-0 w-14" aria-hidden="true"></div>{/* Force sidebar to shrink to fit close icon */}
            </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Content rendered here */}
              <Outlet />
            </div>
          </div>
           {/* Optional Footer */}
           <footer className="bg-white border-t border-gray-200 mt-auto px-4 py-3 sm:px-6 md:px-8">
                <p className="text-center text-sm text-gray-500 font-quote">
                    NODUS: Own the Revolution. Not Just a Job.
                </p>
           </footer>
        </main>
      </div>
    </div>
  );
} 