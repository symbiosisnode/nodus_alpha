export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Avenir Next', system-ui, sans-serif",
    secondary: "'SF Pro Text', system-ui, sans-serif",
    monospace: "'SF Mono', monospace",
  },

  // Type Scale
  fontSize: {
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
    body: {
      mobile: '1rem', // 16px
      desktop: '1.5rem', // 24px
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

  // Line Heights
  lineHeight: {
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
    body: {
      mobile: '1.5rem',
      desktop: '2rem',
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

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
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