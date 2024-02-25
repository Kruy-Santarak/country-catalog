/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          light: "#ff98d8",
          default: "#ff1584",
          dark: "#df005e",
        },
        secondary: {
          light: "#60a5fa",
          default: "#257eeb",
          dark: "#1e5faf",
        },
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.33%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
