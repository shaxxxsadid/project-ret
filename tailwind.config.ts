import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      darkMode: "class",
      colors: {
        background: "var(--background)",
        backgroundHeaderSearch: "#392C26",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
