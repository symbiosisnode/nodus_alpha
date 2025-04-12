import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import mock data directly (assuming they are in src/mock)
import mtoData from '../mock/mto.json';
import gpData from '../mock/gp.json';
import saData from '../mock/sa.json';
import badgesData from '../mock/badges.json';

// --- Define Types Directly Here ---
export type Role = 'MTO' | 'GP' | 'SA';

export interface BaseUserData {
  userId: string;
  role: Role;
  name: string;
  equity: { [key: string]: any };
  notifications: any[];
  [key: string]: any;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Changed from iconUrl to match badges.json
  tier: string;
  points: number; // Added points based on badges.json
}
// --- End Type Definitions ---

interface DemoDataContextType {
  loading: boolean;
  isAlphaDemo: boolean;
  mtoProfile: BaseUserData | null;
  gpProfile: BaseUserData | null;
  saProfile: BaseUserData | null;
  badges: Badge[];
  currentUserData: BaseUserData | null;
  setCurrentUserRole: (role: Role) => void;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

interface DemoDataProviderProps {
  children: ReactNode;
}

export const DemoDataProvider: React.FC<DemoDataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setUserRole] = useState<Role>(() => {
    return (localStorage.getItem('nodus_user_role') as Role) || 'SA';
  });
  const [currentUserData, setCurrentUserData] = useState<BaseUserData | null>(null);

  // Load all data initially
  const allData = {
    mto: mtoData as BaseUserData,
    gp: gpData as BaseUserData,
    sa: saData as BaseUserData,
    // Ensure badges are correctly typed based on definition above
    badges: (badgesData.badges || []) as Badge[],
  };

  useEffect(() => {
    const initializeDemo = () => {
      setLoading(true);
      localStorage.setItem('nodus_user_role', currentUserRole);
      switch (currentUserRole) {
        case 'MTO': setCurrentUserData(allData.mto); break;
        case 'GP': setCurrentUserData(allData.gp); break;
        case 'SA': setCurrentUserData(allData.sa); break;
        default: setCurrentUserData(allData.sa);
      }

      setTimeout(() => {
        setLoading(false);
        console.log("🔥 NODUS Alpha Demo Mode Enabled!");
        if (allData.badges.length > 0) {
          console.log('🏆 Badges loaded!');
        }
      }, 800);
    };

    initializeDemo();

  }, [currentUserRole]);

  const setCurrentUserRoleHandler = (role: Role) => {
    setUserRole(role);
  };

  const value = {
    loading,
    isAlphaDemo: true,
    mtoProfile: allData.mto,
    gpProfile: allData.gp,
    saProfile: allData.sa,
    badges: allData.badges,
    currentUserData,
    setCurrentUserRole: setCurrentUserRoleHandler,
  };

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
};

export const useDemoData = () => {
  const context = useContext(DemoDataContext);
  if (context === undefined) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}; 