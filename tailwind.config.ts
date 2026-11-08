import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ivory: "#f5f2ec", bronze: "#9c7957", charcoal: "#252522" }, fontFamily: { sans: ["Arial", "sans-serif"], serif: ["Georgia", "serif"] } } },
  plugins: [],
};
export default config;
