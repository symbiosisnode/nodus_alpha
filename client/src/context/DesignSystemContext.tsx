import React, { createContext, useContext, ReactNode } from 'react';

interface DesignSystemContextType {
  colors: {
    primary: {
      equityGold: string;
      equitySilver: string;
      equityBronze: string;
    };
    secondary: {
      success: string;
      warning: string;
      error: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    caption: string;
  };
}

const defaultDesignSystem: DesignSystemContextType = {
  colors: {
    primary: {
      equityGold: '#FFD700',
      equitySilver: '#C0C0C0',
      equityBronze: '#CD7F32',
    },
    secondary: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    body: '1rem',
    caption: '0.875rem',
  },
};

const DesignSystemContext = createContext<DesignSystemContextType>(defaultDesignSystem);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({ children }) => {
  return (
    <DesignSystemContext.Provider value={defaultDesignSystem}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}; 