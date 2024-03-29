import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:
      {
        "primary": "#F27D41",
        "secondary": "#333233",
        "accent": "#fefefe",
        "neutral": "#6b7280",
        "error": "#f44336",
        "success": "#4caf50",
        "validate": "#3b82f6",
        
      }
    },
  },
  plugins: [],
};
export default config;
