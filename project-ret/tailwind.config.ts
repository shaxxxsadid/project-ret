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
        'backgroundGradient': 'from-black via-[#392C26] to-[#F24F1C]',
        backgroundHeaderSearch: "#392C26",
        foreground: "var(--foreground)",
      },
      transitionProperty: {
        'defaultTransition': 'transition-all duration-300 ease-in-out cubic-bezier(.42,.97,.52,1.49)',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
} satisfies Config;
