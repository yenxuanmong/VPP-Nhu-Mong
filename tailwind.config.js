/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F52FF',
          dark: '#0A3FCC',
          light: '#3B7AFF',
        },
        secondary: '#2563EB',
        accent: '#F97316',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(15, 82, 255, 0.08)',
        card: '0 8px 32px rgba(15, 82, 255, 0.12)',
        lift: '0 12px 40px rgba(15, 82, 255, 0.18)',
      },
      animation: {
        'brand-slide': 'brandSlide 25s linear infinite',
      },
      keyframes: {
        brandSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
