export const layout = {
  // Breakpoints
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },

  // Container Widths
  container: {
    mobile: '100%',
    tablet: '100%',
    desktop: '1200px',
    largeDesktop: '1400px',
  },

  // Margins
  margins: {
    mobile: '16px',
    tablet: '32px',
    desktop: '32px',
    largeDesktop: '48px',
  },

  // Spacing Scale (8px increments)
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    xxl: '3rem',   // 48px
    xxxl: '4rem',  // 64px
  },

  // Grid System
  grid: {
    columns: 12,
    gap: '1.5rem', // 24px
  },
};

// Media Query Mixins
export const media = {
  mobile: `@media (min-width: ${layout.breakpoints.mobile})`,
  tablet: `@media (min-width: ${layout.breakpoints.tablet})`,
  desktop: `@media (min-width: ${layout.breakpoints.desktop})`,
  largeDesktop: `@media (min-width: ${layout.breakpoints.largeDesktop})`,
};

// Container Mixin
export const container = `
  width: 100%;
  margin: 0 auto;
  padding: 0 ${layout.margins.mobile};

  ${media.tablet} {
    padding: 0 ${layout.margins.tablet};
  }

  ${media.desktop} {
    max-width: ${layout.container.desktop};
    padding: 0 ${layout.margins.desktop};
  }

  ${media.largeDesktop} {
    max-width: ${layout.container.largeDesktop};
    padding: 0 ${layout.margins.largeDesktop};
  }
`;

// Grid Mixins
export const grid = {
  container: `
    display: grid;
    grid-template-columns: repeat(${layout.grid.columns}, 1fr);
    gap: ${layout.grid.gap};
  `,
  column: (span: number) => `
    grid-column: span ${span};
  `,
  offset: (offset: number) => `
    grid-column-start: ${offset + 1};
  `,
}; 