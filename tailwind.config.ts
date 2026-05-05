import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C4A265",
          light: "#E6C181",
          dark: "#755A24",
          muted: "rgba(196,162,101,0.2)",
        },
        dark: {
          bg: "#131313",
          surface: "#1F2020",
          "surface-high": "#2A2A2A",
          "surface-highest": "#353535",
          elevated: "#393939",
          border: "#4D463A",
        },
        light: {
          bg: "#FAF7F2",
          surface: "#F6F3F2",
          "surface-high": "#F0EDED",
          "surface-highest": "#EAE7E7",
          border: "#D1C5B5",
        },
        ivory: "#FAF7F2",
        charcoal: "#1B1C1C",
      },
      fontFamily: {
        serif: ["Noto Serif", "Georgia", "serif"],
        sans: ["Manrope", "Inter", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(48px,5vw,80px)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "300" }],
        "headline-xl": ["clamp(36px,3.5vw,56px)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "headline-lg": ["clamp(28px,2.5vw,40px)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "headline-md": ["clamp(22px,2vw,28px)", { lineHeight: "1.3" }],
        "headline-sm": ["clamp(18px,1.5vw,22px)", { lineHeight: "1.4" }],
        "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      spacing: {
        "section": "128px",
        "section-sm": "80px",
      },
      maxWidth: {
        "container": "1440px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
        "shimmer": "shimmer 2s infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(196,162,101,0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(196,162,101,0)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C4A265 0%, #E6C181 50%, #C4A265 100%)",
        "dark-gradient": "linear-gradient(180deg, #131313 0%, #1F2020 100%)",
        "hero-dark": "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #0D0D0D 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
