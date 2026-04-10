/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indian: {
          saffron: "#F97316",
          white: "#FFFFFF",
          green: "#059669",
          navy: "#1E1B4B",
          accent: "#D97706",
          offwhite: "#FAF9F6",
          saffron_soft: "rgba(249, 115, 22, 0.15)",
          indigo_soft: "rgba(30, 27, 75, 0.1)",
          green_soft: "rgba(16, 185, 129, 0.1)",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      animation: {
        'scroll-infinite': 'scroll-infinite 40s linear infinite',
      },
      keyframes: {
        'scroll-infinite': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
