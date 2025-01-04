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
        DEFAULT: '1px'  // This sets the default border width
      },
      borderColor: {
        DEFAULT: '#28d6fc'  // This is the hex code for red-500
      },
      fontFamily: {
        LuckiestGuy: ['Luckiest Guy', 'cursive'],
        KirangHaerang: ['Kirang Haerang', 'system-ui'],
       },
      //  screens: {
      //   portrait: { raw: '(orientation: portrait)' },
      //   landscape: { raw: '(orientation: landscape)' },
      // },
    },
  },
  plugins: [],
};
export default config;
