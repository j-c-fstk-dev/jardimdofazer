/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: '#faf7f2',
        'scrapbook-dark': '#5a4a42',
        'tan': '#d4a574',
        'brown': '#8b7355',
      },
      fontFamily: {
        handwriting: ['Caveat', 'cursive'],
        comfortaa: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
