/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          blue: '#0095F6',
          purple: '#C13584',
          pink: '#E1306C',
          orange: '#F77737',
          yellow: '#FCAF45',
        },
      },
    },
  },
  plugins: [],
} 