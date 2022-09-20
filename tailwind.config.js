/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        'outfit': ["'Outfit'", 'sans-serif'],
      },
      colors: {
        "primary": "#1C1B4E",
        "primary-purple": "#6154E7",
        "primary-orange": "#FB923C",
        "primary-green": "#36B37E",
        "primary-stroke": "#E2E4E8",
        "body": "#445169",
        "secondary": "#6A7486",
        "error": "#FF0000",
      },
      screens: {
        mdMax: {
          max: '992px'
        },
        smMax: {
          max: '649px',
        },
        xs: {
          max: '374px'
        },
        xsMax: {
          max: '399px'
        },
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
