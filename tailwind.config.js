/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'heading': ['Cinzel', 'serif'],
      },
      colors: {
        'van-teal': '#407584',
        'van-teal-deep': '#1A3843',
        'van-teal-mid': '#407584',
        'manjari-mustard': '#CCA842',
        'manjari-gold': '#E5B74B',
        'van-teal-dark': '#1A3843',
        'van-teal-light': '#5bc0de',
        'manjari-dark': '#b8941f',
        'manjari-light': '#E5B74B',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
