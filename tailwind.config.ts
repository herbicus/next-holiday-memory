import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#393b39",
        secondary: "#cd4828",
      },
      fontFamily: {
        sans: ["'Inter', sans-serif", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      transitionTimingFunction: {
        "in-quint": "cubic-bezier(.755,.05,.855,.06)",
        "out-quint": "cubic-bezier(.23,1,.32,1)",
        "in-out-quint": "cubic-bezier(.23,1,.32,1)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
