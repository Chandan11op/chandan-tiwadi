/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000", // Pure Black
        darkBg: "#000000", // Pure Black
        pureBlack: "#000000",
        pureWhite: "#FFFFFF",
        cobalt: {
          DEFAULT: "#2C3480", // Brand Cobalt Blue
          light: "#3E49A8",
          dark: "#1A1F52",
          subtle: "rgba(44, 52, 128, 0.15)",
          glow: "rgba(44, 52, 128, 0.45)",
          rim: "rgba(62, 73, 168, 0.6)",
        },
        // Backward-compatible semantic aliases mapped directly to the cobalt palette
        accent: "#2C3480",
        accentLight: "#3E49A8",
        accentPurple: "#2C3480",
        secondaryAccent: "#3E49A8",
        cardBg: "#04050A",
        glassBg: "rgba(4, 5, 10, 0.75)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
        glassBorderCobalt: "rgba(44, 52, 128, 0.35)",
        glassBorderCobaltGlow: "rgba(62, 73, 168, 0.6)",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'cobalt-glow': '0 0 25px rgba(44, 52, 128, 0.35)',
        'cobalt-glow-lg': '0 0 50px rgba(44, 52, 128, 0.5)',
        'cobalt-glow-hover': '0 0 35px rgba(62, 73, 168, 0.65)',
        'cobalt-rim': '0 0 40px rgba(44, 52, 128, 0.45), inset 0 0 20px rgba(44, 52, 128, 0.2)',
        // Backward compatibility mappings
        'blue-glow': '0 0 25px rgba(44, 52, 128, 0.35)',
        'blue-glow-hover': '0 0 35px rgba(62, 73, 168, 0.65)',
        'purple-glow': '0 0 25px rgba(44, 52, 128, 0.35)',
        'purple-glow-hover': '0 0 35px rgba(62, 73, 168, 0.65)',
        'card-glow': '0 8px 32px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'smoke-slow': 'smokeFloat 14s ease-in-out infinite alternate',
        'smoke-reverse': 'smokeFloatReverse 18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        smokeFloat: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate(15px, -18px) scale(1.08)', opacity: '0.55' },
          '100%': { transform: 'translate(-12px, 10px) scale(0.96)', opacity: '0.35' },
        },
        smokeFloatReverse: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translate(-20px, 15px) scale(1.12)', opacity: '0.5' },
          '100%': { transform: 'translate(10px, -12px) scale(0.92)', opacity: '0.3' },
        }
      }
    },
  },
  plugins: [],
}
