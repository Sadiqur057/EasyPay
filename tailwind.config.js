/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'c-primary': '#21aa74',
        'c-secondary': '#29a0d8',
        'c-text': '#706f6f',
      }
    },
  },
  plugins: [],
}

