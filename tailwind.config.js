/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      spacing: {
        '125' :"29rem",
        '126': '30rem',
        '127': '31rem',
        '128': '32rem',
        "129" : '61rem'
      }
    },
  },
  plugins: [],
}

