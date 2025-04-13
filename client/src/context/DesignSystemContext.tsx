import React, { createContext, useContext, ReactNode } from 'react';
import { NODUS_STYLE_GUIDE } from '../styles/NodusStyleGuide';
import { designSystem } from '../styles/design-system';
import { useDesignGuard } from '../hooks/useDesignGuard';
import '../styles/global.css'; // Import global CSS with variables

// Expanded type to include all NODUS_STYLE_GUIDE properties
interface DesignSystemContextType {
  colors: {
    primary: string;
    background: string;
    foreground: string;
    card: string;
    accentPositive: string;
    accentNegative: string;
    subtleText: string;
    strongText: string;
    border: string;
    // Legacy structure kept for backward compatibility
    primary_legacy: {
      equityGold: string;
      equitySilver: string;
      equityBronze: string;
    };
    secondary_legacy: {
      success: string;
      warning: string;
      error: string;
    };
  };
  spacing: {
    padding: string;
    gap: string;
    // Legacy structure kept for backward compatibility
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    headline: { size: string; weight: number };
    subheading: { size: string; weight: number };
    body: { size: string; weight: number };
    label: { size: string; weight: number };
    // Legacy structure kept for backward compatibility
    h1: string;
    h2: string;
    h3: string;
    caption: string;
  };
  components: {
    cardRadius: string;
    cardPadding: string;
    buttonRadius: string;
    shadow: string;
  };
  layout: {
    gridColumns: number;
    maxWidth: string;
    sidebarWidth: string;
    padding: string;
    gap: string;
  };
  uxPrinciples: string[];
  // Functions
  checkDesign: (componentName: string, proposedStyles: any) => boolean;
}

// Create default context using NODUS_STYLE_GUIDE
const defaultDesignSystem: DesignSystemContextType = {
  ...NODUS_STYLE_GUIDE, // Spread all values from NODUS_STYLE_GUIDE
  colors: {
    ...NODUS_STYLE_GUIDE.colors,
    // Legacy structures for backward compatibility
    primary_legacy: {
      equityGold: '#FFD700',
      equitySilver: '#C0C0C0',
      equityBronze: '#CD7F32',
    },
    secondary_legacy: {
      success: NODUS_STYLE_GUIDE.colors.accentPositive,
      warning: '#FFC107',
      error: NODUS_STYLE_GUIDE.colors.accentNegative,
    },
  },
  spacing: {
    ...NODUS_STYLE_GUIDE.layout,
    // Legacy structures for backward compatibility
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    ...NODUS_STYLE_GUIDE.typography,
    // Legacy structures for backward compatibility
    h1: NODUS_STYLE_GUIDE.typography.headline.size,
    h2: NODUS_STYLE_GUIDE.typography.subheading.size,
    h3: NODUS_STYLE_GUIDE.typography.subheading.size,
    caption: NODUS_STYLE_GUIDE.typography.label.size,
  },
  // Function for checking designs
  checkDesign: (componentName: string, proposedStyles: any) => {
    return useDesignGuard(componentName, proposedStyles);
  }
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