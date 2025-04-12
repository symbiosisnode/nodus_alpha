import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import types from context ONLY if needed, otherwise rely on context value
// import { BaseUserData, Role } from '../context/DemoDataContext';

// Import specific dashboard VIEW components
import MTOView from './MTOView';
import GPView from './GPView';
import SAView from './SAView';

// Import the context hook
import { useDemoData } from '../context/DemoDataContext';

// Type definitions (can be moved to a types file)
interface MTOPropsData { /* ... */ } // Define as before
interface GPPropsData { /* ... */ } // Define as before
interface SAPropsData { /* ... */ } // Define as before
// --- Detailed definitions for casting --- 
interface MTOPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    territory: { name: string; mapImage: string; [key: string]: any };
    [key: string]: any;
}
interface GPPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    saNetwork: { totalCount: number; [key: string]: any };
    [key: string]: any;
}
interface SAPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    commission: { earnedThisMonth: number; [key: string]: any };
    aiNudge: string;
    [key: string]: any;
}

export default function Dashboard() {
  // Get state from context
  const { loading, currentUserData } = useDemoData();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-skyCanvas">
        <p className="text-empireBlue text-lg font-semibold animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  if (!currentUserData) {
    // Redirect to login if context failed to load data
    console.error("No user data in context, redirecting to login.");
    useEffect(() => { navigate('/login'); }, [navigate]); // Navigate on render
    return (
      <div className="min-h-screen flex items-center justify-center bg-skyCanvas">
        <p className="text-red-600 text-lg font-semibold">Error loading user data.</p>
      </div>
    );
  }

  // Render the appropriate dashboard based on the role from context data
  switch (currentUserData.role) {
    case 'MTO':
      return <MTOView />;
    case 'GP':
      return <GPView />;
    case 'SA':
      return <SAView />;
    default:
      console.error("Invalid user role found in context data:", currentUserData.role);
      useEffect(() => { navigate('/login'); }, [navigate]); // Navigate on render
      return null;
  }
}

// Removed the Stats and RecentActivity components that were incorrectly placed here