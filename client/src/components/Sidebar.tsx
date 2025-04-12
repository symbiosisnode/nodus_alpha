import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext'; // Needed for role-specific links if desired
// Import icons (example)
import {
  ChartPieIcon, // Dashboard
  CurrencyDollarIcon, // My Equity
  UsersIcon, // Team Overview / Network
  GiftIcon, // Referrals
  TrophyIcon, // Milestones
  Cog6ToothIcon, // Settings
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { currentUserData } = useDemoData();
  const role = currentUserData?.role || 'SA'; // Default role

  // Define navigation items with icons and links
  const navItems = [
    // Use role to determine actual dashboard link
    { name: 'Dashboard', href: `/${role.toLowerCase()}`, icon: ChartPieIcon },
    { name: 'My Equity', href: '/equity', icon: CurrencyDollarIcon }, // Placeholder link
    { name: 'Network/Team', href: '/network', icon: UsersIcon }, // Combined for simplicity
    { name: 'Referrals', href: '/referrals', icon: GiftIcon },
    { name: 'Milestones', href: '/milestones', icon: TrophyIcon }, // Placeholder link
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    // Using styles consistent with DashboardLayout's original sidebar
    <div className="flex flex-col flex-grow bg-empireBlue pt-5 pb-4 overflow-y-auto w-64 h-full">
      <div className="flex items-center flex-shrink-0 px-4">
        <span className="text-2xl font-heading font-bold text-white">NODUS</span>
      </div>
      <nav className="mt-5 flex-1 flex flex-col divide-y divide-empireBlue/30 overflow-y-auto" aria-label="Sidebar">
        <div className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end // Use 'end' prop for exact matching on dashboard links
              className={({ isActive }) =>
                `${isActive ? 'bg-empireBlue/80 text-white' : 'text-blue-100 hover:text-white hover:bg-empireBlue/60'}
                 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md transition-colors duration-150`
              }
            >
              <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-blue-200" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      {/* Add profile section back if needed, potentially from DashboardLayout */}
    </div>
  );
};

export default Sidebar; 