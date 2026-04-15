/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A2238',
          light: '#243251',
          dark: '#111827',
          deeper: '#0D1525',
        },
        orange: {
          accent: '#CC5500',
          light: '#E06620',
          hover: '#B34A00',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          light: '#FDF3E7',
          dark: '#EDD5B0',
        },
        glass: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D1525 0%, #1A2238 50%, #243251 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26,34,56,0.9) 0%, rgba(13,21,37,0.95) 100%)',
        'orange-glow': 'radial-gradient(ellipse at center, rgba(204,85,0,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.1)',
        'orange-glow': '0 0 30px rgba(204,85,0,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(204,85,0,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(204,85,0,0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
