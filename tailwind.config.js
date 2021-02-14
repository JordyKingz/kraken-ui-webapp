const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [
    // ...
  ]
}
