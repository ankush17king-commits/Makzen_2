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
        diwali: {
          gold: "#FFD700",
          amber: "#FFB703",
          marigold: "#FB8500",
          maroon: "#7B1113",
          ruby: "#9A1B28",
          glow: "rgba(255, 183, 3, 0.4)",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(39, 35, 31, 0.08)",
        pouch: "0 40px 80px -20px rgba(39, 35, 31, 0.35)",
        diya: "0 0 25px 4px rgba(251, 133, 0, 0.45)",
        "diya-lg": "0 0 45px 12px rgba(255, 183, 3, 0.55)",
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
        flameFlicker: {
          "0%, 100%": {
            transform: "scaleY(1) scaleX(1) rotate(0deg)",
            filter: "drop-shadow(0 0 6px #FFB703) drop-shadow(0 0 14px #E88912)",
          },
          "25%": {
            transform: "scaleY(1.08) scaleX(0.94) rotate(-1.5deg)",
            filter: "drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 18px #FB8500)",
          },
          "50%": {
            transform: "scaleY(0.95) scaleX(1.04) rotate(1deg)",
            filter: "drop-shadow(0 0 5px #FFB703) drop-shadow(0 0 12px #E88912)",
          },
          "75%": {
            transform: "scaleY(1.06) scaleX(0.96) rotate(-0.5deg)",
            filter: "drop-shadow(0 0 9px #FFEAA7) drop-shadow(0 0 20px #FB8500)",
          },
        },
        diyaGlow: {
          "0%, 100%": { opacity: "0.65", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
        toranSway: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0) translateY(0)" },
          "50%": { opacity: "1", transform: "scale(1) translateY(-20px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        popIn: "popIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        flame: "flameFlicker 1.8s ease-in-out infinite",
        "flame-fast": "flameFlicker 1.1s ease-in-out infinite",
        diyaGlow: "diyaGlow 2.5s ease-in-out infinite",
        toranSway: "toranSway 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        sparkle: "sparkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
