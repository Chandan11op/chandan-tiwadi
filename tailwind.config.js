/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712",
        accent: "#3b82f6", // Electric Blue
        accentPurple: "#8b5cf6", // Purple Accent
        secondaryAccent: "#8b5cf6", // Violet/Purple
        darkBg: "#030712",
        cardBg: "#0b0f19",
        glassBg: "rgba(11, 15, 25, 0.6)",
        glassBorder: "rgba(99, 102, 241, 0.08)",
        glassBorderBlue: "rgba(59, 130, 246, 0.15)",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'blue-glow': '0 0 15px rgba(59, 130, 246, 0.2)',
        'blue-glow-hover': '0 0 25px rgba(59, 130, 246, 0.45)',
        'purple-glow': '0 0 15px rgba(139, 92, 246, 0.2)',
        'purple-glow-hover': '0 0 25px rgba(139, 92, 246, 0.45)',
        'card-glow': '0 4px 30px rgba(0, 0, 0, 0.4)',
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
