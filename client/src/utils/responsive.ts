// Utility function to check if the current viewport is mobile
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

// Utility function to check if the current viewport is tablet
export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

// Utility function to check if the current viewport is desktop
export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

// Debug utility to log viewport changes
export const logViewportChanges = (): (() => void) => {
  const logViewport = () => {
    console.log('Viewport Debug:', {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile(),
      isTablet: isTablet(),
      isDesktop: isDesktop(),
      devicePixelRatio: window.devicePixelRatio
    });
  };

  // Log initial viewport
  logViewport();

  // Log on resize
  window.addEventListener('resize', logViewport);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', logViewport);
  };
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;

// Media query strings for use in CSS-in-JS
export const MEDIA_QUERIES = {
  mobile: `@media (max-width: ${BREAKPOINTS.mobile - 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.tablet}px)`
} as const; 