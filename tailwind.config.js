/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#61cf98',
        'primary': '#46ae7a',
        'secondary': '#9e3067',
        'secondary-light': '#b74b81',
      },
    },
  },
  plugins: [],
}