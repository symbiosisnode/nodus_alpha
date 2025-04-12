// /src/components/TopNav.tsx
import React from 'react';
import { useDemoData } from '../context/DemoDataContext'; // Import context hook
import { BellIcon } from '@heroicons/react/24/outline'; // Example icon

const TopNav = () => {
  // Get user data from context to display name
  const { currentUserData } = useDemoData();
  const userName = currentUserData?.name || 'User'; // Use name from context or default

  // Placeholder title - this might need to be dynamic based on the route
  const pageTitle = "Dashboard";

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
      {/* Page Title (Can be made dynamic later) */}
      <h1 className="text-xl font-semibold font-heading text-empireBlue">{pageTitle}</h1>

      {/* Right-side elements (User greeting, Notifications) */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-600 hidden sm:block">Welcome back, {userName} 👋</span>
        <button type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-empireBlue">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {/* Add notification count indicator later */}
        </button>
        {/* Optional: Add Profile Dropdown */}
      </div>
    </header>
  );
}
export default TopNav; 