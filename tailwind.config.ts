import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#16324F",
        cobalt: "#2450A8",
        signal: "#F26B1D",
        steel: "#8A94A6",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "system-ui", "sans-serif"],
        body: ["'Instrument Sans Variable'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
