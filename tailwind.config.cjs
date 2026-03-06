/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#faf8f5",
        surface: "#ffffff",
        accent: "#b8860b",
        accentSoft: "#c9a227",
        textPrimary: "#1c1917",
        textMuted: "#57534e"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.08)",
        "soft-hover": "0 24px 48px rgba(0,0,0,0.12)",
        "accent-glow": "0 0 24px rgba(184,134,11,0.25)"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    }
  },
  plugins: []
};
