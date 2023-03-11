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
      height: {
        app: 'var(--app-height)',
      },
      minHeight: {
        app: 'var(--app-height)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      gridTemplateRows: {
        'sketch-m': 'min-content auto',
        sketch: 'auto min-content ',
        home: 'repeat(3, minmax(0, 1fr)) min-content',
        'home-m': 'min-content 1fr',
      },
    },
  },
  plugins: [],
};
