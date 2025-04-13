import { NODUS_STYLE_GUIDE } from '../NodusStyleGuide';

export const typography = {
  // Font Families aligned with NODUS_STYLE_GUIDE
  fontFamily: {
    primary: NODUS_STYLE_GUIDE.typography.fontFamily, // 'Inter', sans-serif
    secondary: NODUS_STYLE_GUIDE.typography.fontFamily, // 'Inter', sans-serif
    monospace: "'SF Mono', monospace", // Keep monospace for code/technical content
  },

  // Type Scale aligned with NODUS_STYLE_GUIDE
  fontSize: {
    // New NODUS_STYLE_GUIDE font sizes
    headline: {
      mobile: NODUS_STYLE_GUIDE.typography.headline.size, // '24px'
      desktop: NODUS_STYLE_GUIDE.typography.headline.size, // '24px'
    },
    subheading: {
      mobile: NODUS_STYLE_GUIDE.typography.subheading.size, // '18px'
      desktop: NODUS_STYLE_GUIDE.typography.subheading.size, // '18px'
    },
    body: {
      mobile: NODUS_STYLE_GUIDE.typography.body.size, // '14px'
      desktop: NODUS_STYLE_GUIDE.typography.body.size, // '14px'
    },
    label: {
      mobile: NODUS_STYLE_GUIDE.typography.label.size, // '12px'
      desktop: NODUS_STYLE_GUIDE.typography.label.size, // '12px'
    },

    // Legacy types - kept for backward compatibility
    display: {
      mobile: '2.375rem', // 38px
      desktop: '2.875rem', // 46px
    },
    h1: {
      mobile: '1.875rem', // 30px
      desktop: '2.375rem', // 38px
    },
    h2: {
      mobile: '1.5rem', // 24px
      desktop: '2rem', // 32px
    },
    h3: {
      mobile: '1.25rem', // 20px
      desktop: '1.75rem', // 28px
    },
    bodyLarge: {
      mobile: '1.125rem', // 18px
      desktop: '1.625rem', // 26px
    },
    small: {
      mobile: '0.875rem', // 14px
      desktop: '1.25rem', // 20px
    },
    micro: {
      mobile: '0.75rem', // 12px
      desktop: '1.125rem', // 18px
    },
  },

  // Line Heights - Standard multipliers based on font size
  lineHeight: {
    // New NODUS_STYLE_GUIDE line heights
    headline: {
      mobile: 'calc(1.4 * 24px)', // ~34px
      desktop: 'calc(1.4 * 24px)', // ~34px
    },
    subheading: {
      mobile: 'calc(1.5 * 18px)', // ~27px
      desktop: 'calc(1.5 * 18px)', // ~27px
    },
    body: {
      mobile: 'calc(1.6 * 14px)', // ~22px
      desktop: 'calc(1.6 * 14px)', // ~22px
    },
    label: {
      mobile: 'calc(1.4 * 12px)', // ~17px
      desktop: 'calc(1.4 * 12px)', // ~17px
    },

    // Legacy line heights - kept for backward compatibility
    display: {
      mobile: '2.875rem',
      desktop: '3.5rem',
    },
    h1: {
      mobile: '2.375rem',
      desktop: '3rem',
    },
    h2: {
      mobile: '2rem',
      desktop: '2.5rem',
    },
    h3: {
      mobile: '1.75rem',
      desktop: '2.25rem',
    },
    bodyLarge: {
      mobile: '1.625rem',
      desktop: '2.25rem',
    },
    small: {
      mobile: '1.25rem',
      desktop: '1.75rem',
    },
    micro: {
      mobile: '1.125rem',
      desktop: '1.5rem',
    },
  },

  // Font Weights aligned with NODUS_STYLE_GUIDE
  fontWeight: {
    regular: NODUS_STYLE_GUIDE.typography.body.weight, // 400
    medium: NODUS_STYLE_GUIDE.typography.subheading.weight, // 500
    semiBold: NODUS_STYLE_GUIDE.typography.headline.weight, // 600
  },
};

// Responsive typography mixin
export const responsiveTypography = (size: keyof typeof typography.fontSize) => `
  font-size: ${typography.fontSize[size].mobile};
  line-height: ${typography.lineHeight[size].mobile};

  @media (min-width: 1024px) {
    font-size: ${typography.fontSize[size].desktop};
    line-height: ${typography.lineHeight[size].desktop};
  }
`; 