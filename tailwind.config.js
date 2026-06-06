/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0F2C",
        accent: "#FFD700", // Gold
        accentGold: "#F5C518",
        secondaryAccent: "#1E90FF", // Electric Blue
        darkBg: "#050B18",
        glassBg: "rgba(10, 15, 44, 0.4)",
        glassBorder: "rgba(255, 215, 0, 0.1)",
        glassBorderBlue: "rgba(30, 144, 255, 0.15)",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(255, 215, 0, 0.15)',
        'gold-glow-hover': '0 0 25px rgba(255, 215, 0, 0.35)',
        'blue-glow': '0 0 15px rgba(30, 144, 255, 0.2)',
        'blue-glow-hover': '0 0 25px rgba(30, 144, 255, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
