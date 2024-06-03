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
      boxShadow: {
        xx: "2px 2px 0px #33322E",
        "3xl": "6px 6px 0px #33322E",
      },
      colors: {
        "yellow-light": "#F9F3E5",
        "yellow-dark": "#F4D799",
        "peach-dark": "#F6A89E",
        "peach-light": "#FFF0EE",
        "aqua-light": "#D0F4F0",
        "aqua-dark": "#8CD4CB",
        grey: "878787",
      },
    },
  },
  plugins: [],
};
export default config;
