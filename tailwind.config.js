/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#FFF',
      blue: '#00F',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
      accent: 'var(--accent)',
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      height: {
        app: 'var(--app-height)',
        project: 'calc(var(--app-height) - var(--header-height))',
      },
      minHeight: {
        app: 'var(--app-height)',
      },
      maxHeight: {
        project: 'calc(var(--app-height) - var(--header-height))',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      gridTemplateRows: {
        'sketch-m': 'min-content auto',
        sketch: 'auto min-content ',

        home: 'repeat(3, minmax(0, 1fr)) min-content',
        'home-m': 'min-content 1fr',

        blog: '1fr',
        'blog-m': 'min-content 1fr min-content',
      },
    },
  },
  plugins: [],
};
