import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F3EEE3",
        cream: "#F3EEE3",
        paper: "#FFFFFF",
        burntOrange: "#D9541E",
        charcoal: "#111111",
        darkCanvas: "#171614",
        darkSurface: "#24211E",
        warmCream: "#F3EEE3",
        secondaryText: "#C9C0B3",
        border: "#49443D",
        background: "var(--theme-background)",
        foreground: "var(--theme-foreground)",
        muted: {
          DEFAULT: "var(--theme-muted)",
          foreground: "var(--theme-muted-foreground)",
        },
      },
      boxShadow: { raised: "var(--shadow-raised)" },
      fontFamily: { sans: ["Arial", "sans-serif"], serif: ["Georgia", "serif"] },
    },
  },
  plugins: [],
};
export default config;
