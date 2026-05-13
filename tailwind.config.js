/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-inter)',  'sans-serif'],
      },
      colors: {
        'club-red': '#E21E26',
      },
    },
  },
  plugins: [],
}
