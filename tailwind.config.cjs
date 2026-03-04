/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: "#101218",
        accent: "#d9b36c",
        accentSoft: "#e7c892",
        textPrimary: "#f5f3ee",
        textMuted: "#b1a79a"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.55)"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    }
  },
  plugins: []
};
