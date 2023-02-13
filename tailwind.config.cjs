/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontSize: {
      xxs: 12,
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xlg: 24,
      "xlg-2x": 32,
    },
    colors: {
      transparent: "transparent",
      black: "#0F0E0C",
      white: "#fff",
      gray: {
        800: "#707780",
        600: "#37474F",
        400: "#827E7E",
        100: "#F0F0F0",
      },
      red: {
        800: "#D50000",
      },
      blue: {
        600: "#4C6FBF",
        300: "#7B96D4",
        100: "#B1C9EB",
      },
      green: {
        800: "#008000",
      },
      cyan: {
        500: "#4D8A9C",
        400: "#98e1fb",
      },
    },
    extend: {
      fontFamily: {
        sans: "Open Sans, sans-serif",
      },
    },
  },
  plugins: [],
};
