/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We extend the theme with your custom cyber colors so you can use 'text-accent' in Tailwind
        accent: '#00ff9d',
        'accent-glow': 'rgba(0, 255, 157, 0.2)',
        'bg-dark': '#050505',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}