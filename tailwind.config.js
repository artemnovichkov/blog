const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
            'code::before': false,
            'code::after': false,
            color: theme("colors.black"),
            'p,a,h1,h2,h3,h4': {
              color: theme("colors.black"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.white"),
            'p,a,h1,h2,h3,h4': {
              color: theme("colors.white"),
            },
          },
        },
      })
    },
  },
  variants: {
    typography: ['dark']
  },
  plugins: [
    require("tailwindcss-dark-mode"),
    require('@tailwindcss/typography')
  ],
}
