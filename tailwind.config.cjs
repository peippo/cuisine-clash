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
        loadingCard1: {
          "15%": {
            transform: "translateX(100px) rotate(15deg)",
          },
          "30%": {
            transform: "translateX(-20px) rotate(-5deg)",
          },
          "50%": {
            transform: "translateX(-20px) rotate(-5deg)",
            "z-index": 10,
          },
          "65%": {
            transform: "translateX(-10px)",
            "z-index": 20,
          },
          "80%": {
            transform: "translateX(-10px)",
          },
        },
        loadingCard2: {
          "15%": {
            transform: "translateX(0)",
          },
          "30%": {
            transform: "translateX(10px)",
            "z-index": 30,
          },
          "50%": {
            transform: "translateX(100px) rotate(15deg)",
          },
          "65%": {
            transform: "translateX(-10px) rotate(-5deg)",
          },
          "80%": {
            transform: "translateX(-10px) rotate(-5deg)",
            "z-index": 10,
          },
        },
        loadingCard3: {
          "0%": {
            transform: "rotate(-5deg)",
            "z-index": 0,
          },
          "15%": {
            transform: "translateX(0) rotate(-5deg)",
          },
          "30%": {
            transform: "translateX(10px)",
            "z-index": 20,
          },
          "50%": {
            transform: "translateX(10px)",
          },
          "65%": {
            transform: "translateX(20px)",
            "z-index": 30,
          },
          "80%": {
            transform: "translateX(120px) rotate(15deg)",
          },
          "100%": {
            transform: "rotate(-5deg)",
          },
        },
      },
      animation: {
        "intro-logo": "zoomInDown 1.5s linear",
        "intro-content": "delayFadeIn 3s ease-in",
        "loading-card-1": "loadingCard1 3s ease-in-out infinite",
        "loading-card-2": "loadingCard2 3s ease-in-out infinite",
        "loading-card-3": "loadingCard3 3s ease-in-out infinite",
      },
      colors: {
        legendary: "#1e1702",
        "legendary-light": "#312205",
        epic: "#0f000f",
        "epic-light": "#1e001e",
      },
    },
    fontFamily: {
      sans: ["Source Sans Pro", "system-ui", "sans-serif"],
      serif: ["Source Serif Pro", "ui-serif", "serif"],
    },
  },
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
  ],
  plugins: [],
};
