/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple-dark':'#8424e4',
        'custom-purple-light':'#a054ec',
        'custom-orange':'#f86c64',
        'custom-orange-disabled':'#FAA39E',
      },
      fontFamily: {
        customFont: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}