import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        card: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
