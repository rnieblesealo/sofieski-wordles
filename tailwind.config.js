export default {
  // NOTE: specifies where to locate classnames
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // WARN: careful with spaces in patternmatch!
  ],
  theme: {
    extend: {
      fontFamily: {
        funnel: ["Funnel Sans", "sans-serif"],
        tiny5: ["Tiny5", "sans-serif"],
        cuba: ["Playwrite CU", "serif"]
      }
    },
  },
  plugins: [],
}
