/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        intro: "url('/intro-bg.svg')",
      },
      keyframes: {
        zoomInDown: {
          "0%": {
            "animation-timing-function": "cubic-bezier(.55,.055,.675,.19)",
            opacity: 0,
            transform: "scale3d(.1,.1,.1) translate3d(0,-500px,0)",
          },
          "60%": {
            "animation-timing-function": "cubic-bezier(.175,.885,.32,1)",
            opacity: 1,
            transform: "scale3d(.475,.475,.475) translate3d(0,60px,0)",
          },
        },
        delayFadeIn: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "intro-logo": "zoomInDown 1.5s linear",
        "intro-content": "delayFadeIn 3s ease-in",
      },
    },
    fontFamily: {
      sans: ["Source Sans Pro", "system-ui", "sans-serif"],
      serif: ["Source Serif Pro", "ui-serif", "serif"],
    },
  },
  plugins: [],
};
