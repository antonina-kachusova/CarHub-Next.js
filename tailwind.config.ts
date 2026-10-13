/** @type {import('tailwindcss').Config} */
module.exports = {
  // Вказуємо шляхи до файлів, де Tailwind повинен шукати класи для JIT компіляції
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Використовуємо режим Just-In-Time (JIT)
  mode: "jit",
  // Розділ для налаштувань теми
  theme: {
    // Розділ для додавання або перевизначення стандартних значень
    extend: {
      // Додавання нового шрифту "Inter"
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      // Додавання або перевизначення кольорів
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      // Додавання зображень для фону
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  // Додаткові плагіни для Tailwind
  plugins: [],
};

