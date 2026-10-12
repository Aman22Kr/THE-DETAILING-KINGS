/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E31E24",
          "red-dark": "#B81419",
          "red-glow": "rgba(227, 30, 36, 0.35)",
          gold: "#F7941D",
          "gold-hover": "#D97B0D",
          black: "#0A0B0E",
          dark: "#12141A",
          surface: "#181A22",
          border: "#262936",
          gray: "#9AA0A6",
          light: "#F5F6F8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Impact', 'sans-serif']
      },
      boxShadow: {
        'red-glow': '0 0 25px rgba(227, 30, 36, 0.4)',
        'gold-glow': '0 0 25px rgba(247, 148, 29, 0.3)',
        'card-hover': '0 10px 30px -10px rgba(227, 30, 36, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'carbon-pattern': "radial-gradient(#262936 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
