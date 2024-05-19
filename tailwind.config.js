/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlack: "#141414",
        alebaster: "#EDE7D9",
        myGray: "#A49694",
      },
    },
  },
  plugins: [],
}
