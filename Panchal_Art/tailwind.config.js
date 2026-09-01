/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Warm Architectural Charcoal & Slate Palette
        slate: {
          950: '#12161F', // Deepest Warm Dark
          900: '#161B26', // Main Warm Obsidian Dark Canvas
          850: '#1E2433', // Elevated Dark Surface / Card Base
          800: '#2A3245', // Dark Border & Hairline Neutral
          700: '#4A5260', // Subdued Dark Accent / Mid Neutral
          600: '#6B7280', // Warm Slate Gray Text
          500: '#8E95A2',
          400: '#9CA3AF',
          300: '#CBD5E1',
          200: '#E5E2DC', // Soft Hairline Border Light
          100: '#F2EFEA', // Soft Linen Stone Surface
          50:  '#FAF8F5'  // Architectural Warm Ivory Canvas
        },

        // Surface Shortcuts
        ivory: '#FAF8F5',
        stone: '#F2EFEA',
        obsidian: '#161B26',
        'card-dark': '#1E2433',

        // Muted Metallic Champagne Gold Accent Tokens
        gold: {
          DEFAULT: '#C8A962',
          500: '#C8A962',
          400: '#D1B46A',
          600: '#B8974F',
          light: 'rgba(200, 169, 98, 0.08)',
          border: 'rgba(200, 169, 98, 0.25)',
          dark: '#9E803A'
        },

        primary: {
          DEFAULT: '#C8A962',
          hover: '#D1B46A',
          dark: '#B8974F',
          contrast: '#161B26',
          light: 'rgba(200, 169, 98, 0.08)'
        },

        // Restrained Status Emerald
        emerald: {
          500: '#059669',
          600: '#047857',
          light: 'rgba(5, 150, 105, 0.08)'
        },

        // Typography Color Tokens
        'text-dark': '#F3F1EC',   // Soft Ivory on Dark
        'text-light': '#1E2430',  // Deep Slate Charcoal on Light
        'text-muted': '#6B7280'   // Muted Slate Gray
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '20': '80px',
        '28': '112px'
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px'
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(30, 36, 48, 0.03), 0 1px 2px -1px rgba(30, 36, 48, 0.02)',
        'soft': '0 4px 14px -2px rgba(30, 36, 48, 0.05)',
        'card': '0 6px 24px -4px rgba(18, 22, 31, 0.45)',
        'medium': '0 12px 24px -4px rgba(30, 36, 48, 0.06)',
        'gold-glow': '0 0 20px -4px rgba(200, 169, 98, 0.20)'
      },
      transitionTimingFunction: {
        'financial': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    },
  },
  plugins: [],
};
