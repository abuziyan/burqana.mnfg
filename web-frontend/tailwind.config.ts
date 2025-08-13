
import type { Config } from 'tailwindcss'
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#1d4ed8', 700: '#1d4ed8', 800: '#1e40af' } },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.07)' }
    },
  },
  plugins: [],
} satisfies Config
