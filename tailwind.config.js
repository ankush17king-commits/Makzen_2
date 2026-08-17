/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#E88912",
        "deep-orange": "#C9650A",
        cream: "#FFF8EC",
        forest: "#174A35",
        "forest-light": "#1F5C42",
        beige: "#F5EBDD",
        charcoal: "#27231F",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(39, 35, 31, 0.08)",
        pouch: "0 40px 80px -20px rgba(39, 35, 31, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(6deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(-8deg)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.9) translateY(10px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        popIn: "popIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
}
