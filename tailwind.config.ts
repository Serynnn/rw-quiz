import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    fontFamily: { 
      'segoue': ['Segoe UI', ...defaultTheme.fontFamily.sans],
      'roboto': ['Roboto', ...defaultTheme.fontFamily.sans],
      'rodondo': ['Rodondo']
    },
  },
  plugins: [],
}

