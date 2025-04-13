/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // NODUS DESIGN SYSTEM v1.0 Palette
        primary: '#C0FF59',      // --primary (Accent)
        secondary: '#141518',    // --secondary (Sidebar bg, dark areas)
        surface: '#F9FAFB',      // --surface (Main background)
        card: '#FFFFFF',         // --card (Cards, containers)
        'text-main': '#1F2937',   // --text-main (Headlines & bold text)
        'text-subtle': '#6B7280', // --text-subtle (Labels, captions)
        'line-soft': '#E5E7EB',  // --line-soft (Dividers)
        'green-up': '#A3E635',   // --green-up (Positive change)
        'red-down': '#F87171',   // --red-down (Negative change)

        // Optional: Keep existing colors if still needed elsewhere, or remove them.
        // empireBlue: "#2E4053",
        // growthGreen: "#34C759",
        // auroraOrange: "#FF9500",
        // skyCanvas: "#F7F9FC", // Similar to 'surface'
        // emerald: "#008751",
        // sunlitYellow: "#F7DC6F",
      },
      fontFamily: {
        // Set default sans-serif to Inter as per guide
        sans: ['Inter', 'sans-serif'],
        // Remove previous specific families if Inter is the only one needed
        // heading: ['Inter', 'sans-serif'], // Use sans
        // body: ['Inter', 'sans-serif'],    // Use sans
        // quote: ['Poppins', 'sans-serif'], // Remove if not used
      },
      fontSize: {
        // Define sizes based on the guide (rem values based on 16px browser default)
        'label-ui': ['0.75rem', { lineHeight: '1.4' }],  // 12px
        'body': ['0.875rem', { lineHeight: '1.6' }],   // 14px
        'subheading': ['1.125rem', { lineHeight: '1.5' }], // 18px
        'headline': ['1.5rem', { lineHeight: '1.4' }],  // 24px
        // Keep or remove previous sizes as needed
        xs: '0.75rem',    // 12px (same as label-ui)
        sm: '0.875rem',   // 14px (same as body)
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px (same as subheading)
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px (same as headline)
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
      },
      spacing: {
        // Define spacing based on 8px unit
        px: '1px',
        0: '0',
        1: '0.5rem',     // 8px
        2: '1rem',       // 16px
        3: '1.5rem',     // 24px (Gutter / Padding)
        4: '2rem',       // 32px
        5: '2.5rem',     // 40px
        6: '3rem',       // 48px
        8: '4rem',       // 64px
        10: '5rem',      // 80px
        12: '6rem',      // 96px
        16: '8rem',      // 128px
        20: '10rem',     // 160px
        24: '12rem',     // 192px
        // Sidebar Width
        60: '15rem',     // 240px
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',  // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem',  // 6px (Badge radius)
        lg: '0.5rem',    // 8px (Button radius)
        xl: '0.75rem',   // 12px (Card radius)
        '2xl': '1rem',   // 16px
        full: '9999px',
      },
      boxShadow: {
        // Define card shadow from guide
        card: '0 4px 16px rgba(0,0,0,0.03)',
        // Keep others or remove if not needed
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // Keep animations, keyframes, zIndex unless specified otherwise
      animation: {
        'badge-unlock': 'pop 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      zIndex: {
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
      },
    },
  },
  plugins: [],
} 