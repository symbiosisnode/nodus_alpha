// File: src/styles/NodusStyleGuide.ts

export const NODUS_STYLE_GUIDE = {
  layout: {
    gridColumns: 12,
    maxWidth: '1200px',
    sidebarWidth: '240px',
    padding: '24px',
    gap: '16px'
  },
  colors: {
    primary: '#C0FF59',
    background: '#F9FAFB',
    foreground: '#141518',
    card: '#FFFFFF',
    accentPositive: '#A3E635',
    accentNegative: '#F87171',
    subtleText: '#6B7280',
    strongText: '#1F2937',
    border: '#E5E7EB'
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    headline: { size: '24px', weight: 600 },
    subheading: { size: '18px', weight: 500 },
    body: { size: '14px', weight: 400 },
    label: { size: '12px', weight: 500 },
  },
  components: {
    cardRadius: '12px',
    cardPadding: '20px',
    buttonRadius: '8px',
    shadow: '0 4px 16px rgba(0,0,0,0.05)',
  },
  uxPrinciples: [
    "Clarity over complexity.",
    "Use clear hierarchy and grouping.",
    "Minimize visual clutter.",
    "Make key metrics immediately visible.",
    "Use color intentionally (not decoratively).",
    "Prioritize readability and spacing.",
    "Ensure responsive behavior across devices.",
    "Guide with visual weight and layout balance.",
    "Highlight changes (up/down arrows, deltas).",
    "Show progress and state clearly (loading, error)."
  ],
  references: {
    source: 'DEFI LAB UI 2025',
    uxArticle: 'https://uxplanet.org/10-rules-for-better-dashboard-design-ef68189d734c',
    verified: true,
    commitGuard: true
  }
}; 