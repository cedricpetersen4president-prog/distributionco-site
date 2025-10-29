/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{njk,js}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        "brand-blue": "#0D1B2A",
        "brand-gold": "#B5A384",
        "brand-gold-dark": "#A18F6D",
      },
    },
  },
  plugins: [],
};
