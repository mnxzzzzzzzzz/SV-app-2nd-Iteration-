/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'sv-navy': '#0A0F1E',
        'sv-azure': '#2962FF',
        'sv-cyan': '#00F0FF',
        'sv-gold': '#FFD700',
        'sv-violet': '#7B2CBF',
        'sv-text-main': '#FFFFFF',
        'sv-text-muted': '#A0A4B8',
        'sv-glass-bg': 'rgba(255,255,255,0.03)',
        'sv-glass-border': 'rgba(255,255,255,0.1)',
        'sv-glass-highlight': 'rgba(255,255,255,0.06)',
        'destructive': '#EF4444',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        'sv-sm': '8px',
        'sv-md': '12px',
        'sv-lg': '16px',
        'sv-xl': '20px',
      },
    },
  },
  plugins: [],
};
