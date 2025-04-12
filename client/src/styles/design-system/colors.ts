export const colors = {
  // Primary Palette
  primary: {
    empireBlue: '#1A5F7A',
    equityGold: '#F2B705',
    growthGreen: '#27AE60',
    territoryTeal: '#16A085',
    networkPurple: '#8E44AD',
  },

  // Neutral Palette
  neutral: {
    charcoal: '#34495E',
    slate: '#7F8C8D',
    mist: '#ECF0F1',
    snow: '#FFFFFF',
    midnight: '#2C3E50',
  },

  // Status Colors
  status: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
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
  mto: colors.primary.empireBlue,
  gp: colors.primary.equityGold,
  sa: colors.primary.territoryTeal,
  propertyOwner: colors.primary.networkPurple,
};

// Performance-based color variations
export const performanceColors = {
  excellent: colors.status.success,
  good: colors.primary.growthGreen,
  fair: colors.status.warning,
  poor: colors.status.error,
};

// Territory density color variations
export const territoryDensityColors = {
  high: colors.primary.empireBlue,
  medium: colors.primary.territoryTeal,
  low: colors.neutral.slate,
}; 