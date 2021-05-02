const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sea: '#0fa9e6',
        fuchsia: colors.fuchsia,
        beer: '#BF8B3F',
        ice: '#ABC3C7',
        pink: '#FFE1E1'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}