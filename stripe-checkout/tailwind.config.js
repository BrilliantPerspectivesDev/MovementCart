/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F8F4F1',
        sand: '#E3DDC9',
        ochre: '#DD8D00',
        moss: '#3E5E17',
        celadon: '#74A78E',
        charcoal: '#222222',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-fade-1': 'gradientFade1 20s ease-in-out infinite',
        'gradient-fade-2': 'gradientFade2 20s ease-in-out infinite',
        'gradient-fade-3': 'gradientFade3 20s ease-in-out infinite',
        'gradient-fade-4': 'gradientFade4 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%, 100%': { opacity: 0 },
          '25%, 75%': { opacity: 1 },
        },
        gradientFade1: {
          '0%, 100%': { opacity: '0' },
          '10%, 40%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        gradientFade2: {
          '0%, 30%': { opacity: '0' },
          '40%, 70%': { opacity: '1' },
          '80%, 100%': { opacity: '0' },
        },
        gradientFade3: {
          '0%, 50%': { opacity: '0' },
          '60%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        gradientFade4: {
          '0%, 70%': { opacity: '0' },
          '80%, 95%': { opacity: '1' },
          '5%, 20%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 