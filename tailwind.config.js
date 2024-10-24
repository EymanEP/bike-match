/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      filters: {
        white: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
      },
      fontFamily: {
        'bricolage-grotesque': ['Bricolage Grotesque', 'sans-serif'],
        'squada-one': ['Squada One', 'sans-serif'],
      },
      textShadow: {
        'none': 'none',
        'sm': '1px 1px 0 rgba(0, 0, 0, 0.1)',
        'DEFAULT': '2px 2px 0 rgba(0, 0, 0, 0.2)',
        'lg': '3px 3px 0 rgba(0, 0, 0, 0.3)',
        'xl': '4px 4px 0 rgba(0, 0, 0, 0.4)',
        '2xl': '5px 5px 0 rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    require('tailwindcss-filters'),
    function ({addUtilities}) {
      const shadows = {
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.text-shadow-sm': {
          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          textShadow: '2px 2px 0 rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 0 rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 0 rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-2xl': {
          textShadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        },
      };
      addUtilities(shadows);
    }
  ],
}
