// Utility to check design compliance
import { NODUS_STYLE_GUIDE } from '../styles/NodusStyleGuide';

type DesignCheckResult = {
  valid: boolean;
  warnings: string[];
  info: string[];
};

/**
 * Validates component styles against the NODUS style guide
 * @param componentName Name of the component being checked
 * @param styles Object containing style properties to check
 * @returns DesignCheckResult with validation status and messages
 */
export const validateDesign = (
  componentName: string,
  styles: Record<string, any>
): DesignCheckResult => {
  const warnings: string[] = [];
  const info: string[] = [];
  
  // Check color usage
  Object.entries(styles).forEach(([key, value]) => {
    if (
      typeof value === 'string' && 
      value.startsWith('#') && 
      !isColorInStyleGuide(value)
    ) {
      warnings.push(`Non-standard color used: ${key}: ${value}`);
      info.push(`Consider using one of: ${Object.entries(NODUS_STYLE_GUIDE.colors).map(([k, v]) => `${k}:${v}`).join(', ')}`);
    }
    
    // Check for paddings and margins
    if (
      (key.includes('padding') || key.includes('margin')) && 
      typeof value === 'string' && 
      !isPaddingInStyleGuide(value)
    ) {
      warnings.push(`Non-standard spacing used: ${key}: ${value}`);
      info.push(`Standard paddings include: ${NODUS_STYLE_GUIDE.layout.padding} (--padding) and ${NODUS_STYLE_GUIDE.layout.gap} (--gap)`);
    }
    
    // Check border radius
    if (
      key.includes('borderRadius') && 
      !isValidBorderRadius(value)
    ) {
      warnings.push(`Non-standard border radius: ${key}: ${value}`);
      info.push(`Standard radii include: ${NODUS_STYLE_GUIDE.components.buttonRadius} (button), ${NODUS_STYLE_GUIDE.components.cardRadius} (card)`);
    }
  });
  
  // Check typographic scale
  if (styles.fontSize && !isValidFontSize(styles.fontSize)) {
    warnings.push(`Non-standard font size: ${styles.fontSize}`);
    info.push(
      `Standard sizes include: ${NODUS_STYLE_GUIDE.typography.headline.size}, ${NODUS_STYLE_GUIDE.typography.subheading.size}, ${NODUS_STYLE_GUIDE.typography.body.size}, ${NODUS_STYLE_GUIDE.typography.label.size}`
    );
  }
  
  // Log findings in development mode
  if (import.meta.env.DEV && warnings.length > 0) {
    console.warn(`⚠️ Design warnings for ${componentName}:`);
    console.table(warnings.map(w => ({ warning: w })));
    console.info(`ℹ️ Design suggestions:`);
    console.table(info.map(i => ({ info: i })));
  }
  
  return {
    valid: warnings.length === 0,
    warnings,
    info
  };
};

// Helper functions
const isColorInStyleGuide = (color: string): boolean => {
  return Object.values(NODUS_STYLE_GUIDE.colors).includes(color);
};

const isPaddingInStyleGuide = (padding: string): boolean => {
  const standardPaddings = [
    NODUS_STYLE_GUIDE.layout.padding,
    NODUS_STYLE_GUIDE.layout.gap,
    NODUS_STYLE_GUIDE.components.cardPadding,
    // Also consider multiples
    `calc(${NODUS_STYLE_GUIDE.layout.padding} * 2)`,
    `calc(${NODUS_STYLE_GUIDE.layout.gap} * 2)`,
  ];
  
  return standardPaddings.includes(padding);
};

const isValidBorderRadius = (radius: string): boolean => {
  const standardRadii = [
    NODUS_STYLE_GUIDE.components.buttonRadius,
    NODUS_STYLE_GUIDE.components.cardRadius,
    // You might allow "0" as well
    '0',
    '0px',
  ];
  
  return standardRadii.includes(radius);
};

const isValidFontSize = (fontSize: string): boolean => {
  const standardSizes = [
    NODUS_STYLE_GUIDE.typography.headline.size,
    NODUS_STYLE_GUIDE.typography.subheading.size,
    NODUS_STYLE_GUIDE.typography.body.size,
    NODUS_STYLE_GUIDE.typography.label.size,
  ];
  
  return standardSizes.includes(fontSize);
}; 