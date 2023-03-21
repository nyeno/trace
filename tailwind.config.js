/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/comps/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          cornflower: "#635fc7",
          icyBlue: "#a8a4ff",
          current: "currentColor",
          white: "#ffffff",
          almostWhite: "#f4f7fd",
          orangish: "#ea5555",
          pinkish: "#ff9898",
          grayishBlue: "#828fa3",
          bluishWhite: "rgb(228 235 250)",
          veryBlack: "#000112",
          darkBlack: "#20212c",
          lighterBlack: "#2b2c37",
          blackishGray: "#3e3f4e",
        },
    },
  },
  plugins: [],
};
