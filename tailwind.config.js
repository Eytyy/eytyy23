/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#fff6e2',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
    },
    extend: {
      gridTemplateRows: {
        sketch: 'min-content auto',
        home: 'repeat(3, minmax(0, 1fr)) min-content',
      },
    },
  },
  plugins: [],
};
