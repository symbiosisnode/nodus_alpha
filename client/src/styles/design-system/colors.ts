import { NODUS_STYLE_GUIDE } from '../NodusStyleGuide';

export const colors = {
  // Primary Palette aligned with NODUS_STYLE_GUIDE
  primary: {
    main: NODUS_STYLE_GUIDE.colors.primary, // '#C0FF59'
    foreground: NODUS_STYLE_GUIDE.colors.foreground, // '#141518'
    background: NODUS_STYLE_GUIDE.colors.background, // '#F9FAFB'
    card: NODUS_STYLE_GUIDE.colors.card, // '#FFFFFF'
    // Legacy colors - kept for backward compatibility
    empireBlue: '#1A5F7A',
    equityGold: '#F2B705',
    growthGreen: '#27AE60',
    territoryTeal: '#16A085',
    networkPurple: '#8E44AD',
  },

  // Neutral Palette aligned with NODUS_STYLE_GUIDE
  neutral: {
    border: NODUS_STYLE_GUIDE.colors.border, // '#E5E7EB'
    textStrong: NODUS_STYLE_GUIDE.colors.strongText, // '#1F2937'
    textSubtle: NODUS_STYLE_GUIDE.colors.subtleText, // '#6B7280'
    // Legacy colors - kept for backward compatibility
    charcoal: '#34495E',
    slate: '#7F8C8D',
    mist: '#ECF0F1',
    snow: '#FFFFFF',
    midnight: '#2C3E50',
  },

  // Status Colors aligned with NODUS_STYLE_GUIDE
  status: {
    success: NODUS_STYLE_GUIDE.colors.accentPositive, // '#A3E635'
    error: NODUS_STYLE_GUIDE.colors.accentNegative, // '#F87171' 
    // Legacy colors - kept for backward compatibility
    warning: '#F39C12',
    info: '#3498DB',
  },
};

// Color intensity variations based on context
export const getColorIntensity = (baseColor: string, intensity: number) => {
  // Implementation for color intensity variations
  return baseColor; // Placeholder - implement actual color manipulation
};

// Role-based color variations
export const roleColors = {
  mto: colors.primary.main, // Updated to use main primary color
  gp: colors.primary.equityGold,
  sa: colors.primary.territoryTeal,
  propertyOwner: colors.primary.networkPurple,
};

// Performance-based color variations
export const performanceColors = {
  excellent: colors.status.success,
  good: colors.primary.main, // Updated to use main primary color
  fair: colors.status.warning,
  poor: colors.status.error,
};

// Territory density color variations
export const territoryDensityColors = {
  high: colors.primary.main, // Updated to use main primary color
  medium: colors.primary.foreground, // Updated to use foreground color
  low: colors.neutral.textSubtle, // Updated to use subtle text color
}; 