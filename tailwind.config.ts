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
    extend: {
      animation:{
        'border-pulse': 'border-pulse 2s infinite'
      },
      keyframes:{
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(209, 213, 219, 1)' },
          '50%': { borderColor: 'rgba(209, 213, 219, 0)' },
        }
      },
    },
    fontFamily: { 
      'segoue': ['Segoe UI', ...defaultTheme.fontFamily.sans],
      'roboto': ['Roboto', ...defaultTheme.fontFamily.sans],
      'rodondo': ['Rodondo']
    },
  },
  plugins: [],
}

