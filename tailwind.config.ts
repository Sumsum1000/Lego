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
      border: {
        DEFAULT: '1px'  
      },
      borderColor: {
        DEFAULT: '#28d6fc'  
      },
      fontFamily: {
        LuckiestGuy: ['Luckiest Guy', 'cursive'],
        KirangHaerang: ['Kirang Haerang', 'system-ui'],
       },
    },
  },
  plugins: [],
};
export default config;
