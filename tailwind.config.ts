import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{tsx,ts,css}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        header: ["var(--font-header)"],
      },
      colors: {
        "tilli-blue": "#325EF6",
        "tilli-l-blue": "#00B1FF",
        "tilli-d-blue": "#0E1B36",
        tilli: {
          50: "#EBF0FE",
          100: "#D8E0FD",
          200: "#ACBDFB",
          300: "#859EFA",
          400: "#597BF8",
          500: "#325EF6",
          600: "#0A38E1",
          700: "#072BAB",
          800: "#051C70",
          900: "#030F3B",
          950: "#01071D",
        },
        billi: {
          50: "#E5F7FF",
          100: "#CCF0FF",
          200: "#99E0FF",
          300: "#66D1FF",
          400: "#33C2FF",
          500: "#00B1FF",
          600: "#008FCC",
          700: "#006B99",
          800: "#004766",
          900: "#002433",
          950: "#001219",
        },
        dilli: {
          50: "#DBE3F6",
          100: "#BACAED",
          200: "#7193DA",
          300: "#3260C2",
          400: "#213E7E",
          500: "#0E1B36",
          600: "#0C162D",
          700: "#081020",
          800: "#050A14",
          900: "#03060C",
          950: "#010204",
        },
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwind-children"),
  ],
} satisfies Config;
